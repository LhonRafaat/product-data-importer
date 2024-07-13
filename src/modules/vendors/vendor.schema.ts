import { Schema } from 'mongoose';
import { TVendor } from './models/vendor.model';

export const Vendor = new Schema<TVendor>(
  {
    manufacturerId: { type: String, required: true, unique: true },
    manufacturerName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
