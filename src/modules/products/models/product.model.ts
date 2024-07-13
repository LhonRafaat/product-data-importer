import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class TProduct {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  vendorId: ObjectId;

  @ApiProperty()
  storefrontPriceVisibility: string;

  @ApiProperty({ isArray: true })
  variants: Variant[];

  @ApiProperty({ isArray: true })
  options: Option[];

  @ApiProperty()
  availability: string;

  @ApiProperty({ isArray: true })
  images: Image[];

  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}

export enum ProductOptions {
  packaging = 'packaging',
  description = 'description',
}

type Variant = {
  id: string;
  available: boolean;
  cost: number;
  currency: string;
  manufacturerItemCode: string;
  description: string;
  packaging: string;
  sku: string;
  images: Image[];
  itemCode: string;
};

type Image = {
  fileName: string;
  cdnLink: string;
  i: number;
  alt: string;
};

type Option = {
  id: string;
  name: string;
  values: [
    {
      id: string;
      value: string;
    },
  ];
};

export enum Currencies {
  USD = 'USD',
}
