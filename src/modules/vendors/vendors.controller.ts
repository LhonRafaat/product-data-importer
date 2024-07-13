import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TVendor } from './models/vendor.model';

@ApiTags('Vendors')
@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  @ApiOkResponse({
    type: TVendor,
  })
  async create(@Body() createVendorDto: CreateVendorDto): Promise<TVendor> {
    return await this.vendorsService.create(createVendorDto);
  }

  @Get('/manufacturer/:id')
  @ApiOkResponse({
    type: TVendor,
  })
  async findOneByManufacturerId(
    @Param('manufacturerId') manufacturerId: string,
  ): Promise<TVendor> {
    return await this.vendorsService.findOneByManufacturerId(manufacturerId);
  }

  @Get(':id')
  @ApiOkResponse({
    type: TVendor,
  })
  async findOne(@Param('id') id: string): Promise<TVendor> {
    return await this.vendorsService.findOne(id);
  }
}
