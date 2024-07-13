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
        packaging: { type: String },
        description: { type: String },
        manufacturerItemCode: { type: String },
        sku: { type: String, required: true },
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
