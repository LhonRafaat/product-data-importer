import { Schema } from 'mongoose';
import { TProduct } from './models/product.model';

export const Product = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    vendorId: { type: Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    storefrontPriceVisibility: { type: String },
    variants: [
      {
        id: { type: String, required: true },
        available: { type: Boolean, required: true },

        cost: { type: Number, required: true },
        currency: { type: String, required: true },
        depth: { type: Number },
        height: { type: Number },
        width: { type: Number },
        manufacturerItemCode: { type: String },
        manufacturerItemId: { type: String },
        volume: { type: Number },
        volumeUom: { type: String },
        weight: { type: Number },
        weightUom: { type: String },
        optionName: { type: String },
        optionsPath: { type: String },
        optionItemsPath: { type: String },
        sku: { type: String, required: true },
        active: { type: Boolean, required: true },
        images: [
          {
            fileName: { type: String },
            cdnLink: { type: String },
            i: { type: Number },
            alt: { type: String },
          },
        ],
        itemCode: { type: String },
      },
    ],
    options: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        values: [
          {
            id: { type: String, required: true },
            value: { type: String },
          },
        ],
      },
    ],
    availability: { type: String },
    isFragile: { type: Boolean, default: false },
    published: { type: String },
    isTaxable: { type: Boolean, default: true },
    images: [
      {
        fileName: { type: String },
        cdnLink: { type: String },
        i: { type: Number },
        alt: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);
