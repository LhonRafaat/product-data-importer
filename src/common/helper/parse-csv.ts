import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { join } from 'path';
import { TProduct } from '../../modules/products/models/product.model';
import { ProductCsv } from '../../modules/products/models/product.csv.model';
export const parseCsv = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const products = {};
    fs.createReadStream(join(process.cwd(), 'test-data/images40.txt'))
      .pipe(csvParser({ separator: '\t' })) // Specify tab as the separator
      .on('data', (data: ProductCsv) => {
        const productId = data.ProductID;

        // Initialize if not already present
        if (!products[productId]) {
          products[productId] = [];
        }

        // Push the row data to the corresponding ProductID
        products[productId].push(data);
      })
      .on('end', () => {
        resolve(products);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
