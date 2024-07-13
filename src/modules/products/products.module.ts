import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: Product,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
