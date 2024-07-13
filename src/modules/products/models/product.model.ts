import { ApiProperty } from '@nestjs/swagger';

export class TProduct {
  name: string;
  type: string;
  shortDescription: string;
  description: string;
  vendorId: string;
  manufacturerId: string;
  storefrontPriceVisibility: string;
  variants: [
    {
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
      images: [
        {
          fileName: string;
          cdnLink: string;
          i: number;
          alt: string;
        },
      ];
      itemCode: string;
    },
  ];
  options: [
    {
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
    },
  ];
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
}
