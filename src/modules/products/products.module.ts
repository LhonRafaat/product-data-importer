import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { VendorsModule } from '../vendors/vendors.module';
import { GPT4Client } from '../../common/gpt-client';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: Product,
      },
    ]),

    VendorsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, GPT4Client],
})
export class ProductsModule {}
