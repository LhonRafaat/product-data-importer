import { Module } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor } from './vendor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Vendor', schema: Vendor }])],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService], // exporting the service to use it in product module
})
export class VendorsModule {}
