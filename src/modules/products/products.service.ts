import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { parseCsv } from '../../common/helper/parse-csv';
import { ProductCsv } from './models/product.csv.model';
import { nanoid } from 'nanoid';
import { Currencies, ProductOptions, TProduct } from './models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VendorsService } from '../vendors/vendors.service';
import { TVendor } from '../vendors/models/vendor.model';
import { TUser } from '../users/user.model';
import { IQuery, IRequest, TResponse } from '../../common/helper/common-types';
import { GPT4Client } from '../../common/gpt-client';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<TProduct>,
    private readonly vendorService: VendorsService,
    private readonly GPTClient: GPT4Client,
  ) {}

  async create(batchSize = 100) {
    let vendor: TVendor;
    const products = await parseCsv();

    // assuming all products in the csv have same vendor

    const manufacturerId =
      products[Object.keys(products)[0]][0]?.ManufacturerID;

    const manufacturerName =
      products[Object.keys(products)[0]][0]?.ManufacturerName;

    vendor = await this.vendorService.findOneByManufacturerId(manufacturerId);

    if (!vendor) {
      vendor = await this.vendorService.create({
        manufacturerId,
        manufacturerName,
      });
    }

    const productsData = await this.parseProducts(products, vendor);

    let i = 0;

    for await (const product of productsData) {
      i++;
      const newDescription = await this.GPTClient.enhanceDescription(
        product.name,
        product.description,
      );

      product.description = newDescription;

      if (i === 9) break;
    }
    // Batch insertion so we dont overload memory
    for (let i = 0; i < productsData.length; i += batchSize) {
      const batch = productsData.slice(i, i + batchSize);
      await this.productModel.insertMany(batch);
    }

    return { message: 'ok' };
  }

  async parseProducts(
    products: ProductCsv,
    vendor: TVendor,
  ): Promise<Partial<TProduct>[]> {
    const productsData = Object.keys(products).map((key, index: number) => {
      const productId = key;
      const prodcutVariants = products[key];

      return {
        productId: [undefined, null, ''].includes(productId)
          ? 'not-provided'
          : productId, // some documents dont have a productId
        name: prodcutVariants[0].ProductName ?? 'not-provided',
        availability: prodcutVariants[0].Availability,
        description: prodcutVariants[0].ProductDescription,
        vendorId: vendor._id,
        storefrontPriceVisibility: 'members-only', // not sure what values this take
        variants: prodcutVariants.map((el: ProductCsv, i: number) => {
          return {
            id: nanoid(),
            itemId: [undefined, null, ''].includes(el.ItemID)
              ? 'not-provided'
              : el.ItemID,
            available: +el.QuantityOnHand > 0, // qunatity bigger than 0 means its available
            cost: parseFloat(el.UnitPrice) || 0,
            currency: Currencies.USD,
            sku: el.ManufacturerItemCode + el.ItemID,
            packaging: el.PKG,
            images: [
              {
                i,
                alt: prodcutVariants[0].ProductName,
                cdnLink: el.ItemImageURL,
                fileName: el.ImageFileName,
              },
            ],
            description: el.ItemDescription,
            manufacturerItemId: el.ManufacturerItemCode,
            itemCode: el.ItemID,
          };
        }),
        options: [
          {
            id: nanoid(),
            name: ProductOptions.description,
            values: prodcutVariants
              .filter((el) => el.ItemDescription)
              .map((el: ProductCsv, i: number) => {
                return {
                  id: nanoid(),
                  value: el.ItemDescription,
                };
              }),
          },
          {
            id: nanoid(),
            name: ProductOptions.packaging,
            values: prodcutVariants
              .filter((el) => el.PKG)
              .map((el: ProductCsv, i: number) => {
                return {
                  id: nanoid(),
                  value: el.PKG,
                };
              }),
          },
        ],
      };
    });

    return productsData;
  }

  async findAll(req: IRequest, query: IQuery): Promise<TResponse<TProduct>> {
    const products = this.productModel
      .find({
        ...req.searchObj,
        ...req.dateQr,
      })
      .sort({ [query.sort]: query.orderBy === 'desc' ? -1 : 1 })
      .populate('vendorId');

    const total = await products.clone().countDocuments();

    products.limit(+query.limit).skip(req.skip);

    const response: TResponse<TProduct> = {
      result: await products.exec(),
      count: total,
      limit: +query.limit,
      page: +query.page,
    };

    return response;
  }
  async findOne(id: string): Promise<TProduct> {
    const product = await this.productModel.findById(id);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<TProduct> {
    await this.findOne(id);

    return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
      runValidators: true,
      new: true,
    });
  }

  async remove(id: string, permenant: boolean): Promise<{ message: string }> {
    await this.findOne(id);

    if (permenant) await this.productModel.findByIdAndDelete(id);
    else {
      await this.productModel.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }
    return { message: `product with id #${id} removed` };
  }
}
