import { Injectable } from '@nestjs/common';
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
}
