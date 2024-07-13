import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { parseCsv } from '../../common/helper/parse-csv';
import { ProductCsv } from './models/product.csv.model';
import { nanoid } from 'nanoid';
import { ProductOptions, TProduct } from './models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<TProduct>,
  ) {}
  async create(batchSize = 100) {
    const products = await parseCsv();
    const productsData = Object.keys(products).map((key, index: number) => {
      const productId = key;
      const prodcutVariants = products[key];

      return {
        productId,
        name: prodcutVariants[0].ProductName ?? 'not provided',
        availability: prodcutVariants[0].Availability,
        shortDescription: prodcutVariants[0].ProductDescription,
        isFragile: false,
        published: 'published',
        isTaxable: true,
        vendorId: 'VfoeB-qlPBfT4NslMUR_V0zT',
        manufacturerId: 'F9pUHdXiOpkY7qgohnGjxMv2',
        storefrontPriceVisibility: 'members-only',
        variants: prodcutVariants.map((el: ProductCsv, i: number) => {
          return {
            id: nanoid(),
            productId: key,
            itemId: el.ItemID,
            available: +el.QuantityOnHand > 0, // qunatity bigger than 0 means its available
            cost: 0,
            currency: 'USD',
            depth: 0,
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
            height: 0,
            width: 0,
            manufacturerItemCode: el.ManufacturerItemCode,
            manufacturerItemId: el.ManufacturerItemCode,
            volume: 0,
            volumeUom: '',
            weight: 0,
            weightUom: '',
            optionName: '',
            optionsPath: '',
            optionItemsPath: '',
            active: true,
            itemCode: el.ManufacturerItemCode,
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

    // Batch insertion so we dont overload memory
    for (let i = 0; i < productsData.length; i += batchSize) {
      const batch = productsData.slice(i, i + batchSize);
      await this.productModel.insertMany(batch);
    }

    return { msg: 'ok' };
  }

  async findAll() {
    const products = await parseCsv();

    return products[Object.keys(products)[0]];
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
