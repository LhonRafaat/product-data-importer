import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

// using classes for types mostly so I can use decorators

class Variant {
  @ApiProperty()
  id: string;
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  available: boolean;
  @ApiProperty()
  cost: number;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  manufacturerItemCode: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  packaging: string;
  @ApiProperty()
  sku: string;
  @ApiProperty()
  images: Image[];
  @ApiProperty()
  itemCode: string;
}

class Image {
  @ApiProperty()
  fileName: string;
  @ApiProperty()
  cdnLink: string;
  @ApiProperty()
  i: number;
  @ApiProperty()
  alt: string;
}

class Option {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  values: [
    {
      id: string;
      value: string;
    },
  ];
}

export class TProduct {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  vendorId: ObjectId;

  @ApiProperty()
  storefrontPriceVisibility: string;

  @ApiProperty({ isArray: true, type: () => Variant })
  variants: Variant[];

  @ApiProperty({ isArray: true, type: () => Option })
  options: Option[];

  @ApiProperty()
  availability: string;

  @ApiProperty()
  isDeleted: boolean;

  @ApiProperty()
  deletedAt: Date;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export enum ProductOptions {
  packaging = 'packaging',
  description = 'description',
}

export enum Currencies {
  USD = 'USD',
}
