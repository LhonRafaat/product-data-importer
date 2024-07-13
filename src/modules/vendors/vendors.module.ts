import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor } from './vendor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vendor', schema: Vendor }])],
  controllers: [VendorsController],
  providers: [VendorsService],
})
export class VendorsModule {}
