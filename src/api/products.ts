import { Product } from '../models/Product';

const API_URL = 'https://mock-back.vercel.app/api/products';

// Change the return type if necessary
export const getProductList = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.products;
};
