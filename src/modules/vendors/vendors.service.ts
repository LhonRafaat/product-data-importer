import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TVendor } from './models/vendor.model';
import { Model } from 'mongoose';

@Injectable()
export class VendorsService {
  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<TVendor>,
  ) {}
  async create(createVendorDto: CreateVendorDto): Promise<TVendor> {
    return await this.vendorModel.create(createVendorDto);
  }

  findOneByManufacturerId(manufacturerId: string): Promise<TVendor> {
    return this.vendorModel.findOne({ manufacturerId });
  }

  async findOne(id: string): Promise<TVendor> {
    const vendor = await this.vendorModel.findById(id);

    if (!vendor) throw new NotFoundException('Vendor not found');

    return vendor;
  }
}
