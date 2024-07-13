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
  availability: string;
  isFragile: boolean;
  published: string;
  isTaxable: boolean;
  images: [
    {
      fileName: string;
      cdnLink: string;
      i: number;
      alt: string;
    },
  ];

  createdAt: string;
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
  depth: number;
  height: number;
  width: number;
  manufacturerItemCode: string;
  manufacturerItemId: string;
  description: string;
  packaging: string;
  volume: number;
  volumeUom: string;
  weight: number;
  weightUom: string;
  optionName: string;
  optionsPath: string;
  optionItemsPath: string;
  sku: string;
  active: boolean;
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
  dataField: string;
  values: [
    {
      id: string;
      name: string;
      value: string;
    },
  ];
};
