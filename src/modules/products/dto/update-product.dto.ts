import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { TProduct } from '../models/product.model';

export class UpdateProductDto extends PartialType(TProduct) {}
