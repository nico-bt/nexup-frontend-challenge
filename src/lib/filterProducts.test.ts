import { filterProducts } from './filterProducts';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';
import { Product } from '../models/Product';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Apple',
    category: ProductCategory.Fruit,
    status: ProductStatus.Active,
    price: 1.2,
    stock: 80,
  },
  {
    id: 2,
    name: 'Banana',
    category: ProductCategory.Fruit,
    status: ProductStatus.Inactive,
    price: 0.9,
    stock: 0,
  },
  {
    id: 3,
    name: 'Carrot',
    category: ProductCategory.Vegetables,
    status: ProductStatus.Active,
    price: 0.7,
    stock: 200,
  },
];

const mockSearch = { empty: '', carrot: 'carr' };

describe('filterProducts', () => {
  it('returns all products when no filters are applied', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: 'All',
        status: 'All',
        inStock: false,
      },
      mockSearch.empty,
    );
    expect(result).toHaveLength(3);
  });

  it('filters by category', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: ProductCategory.Fruit,
        status: 'All',
        inStock: false,
      },
      mockSearch.empty,
    );
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.category === ProductCategory.Fruit)).toBe(
      true,
    );
  });

  it('filters by status', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: 'All',
        status: ProductStatus.Active,
        inStock: false,
      },
      mockSearch.empty,
    );
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.status === ProductStatus.Active)).toBe(true);
  });

  it('filters by inStock', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: 'All',
        status: 'All',
        inStock: true,
      },
      mockSearch.empty,
    );
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.stock > 0)).toBe(true);
  });

  it('combines multiple filters', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: ProductCategory.Fruit,
        status: ProductStatus.Active,
        inStock: true,
      },
      mockSearch.empty,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Apple');
  });

  it('filters by search term', () => {
    const result = filterProducts(
      mockProducts,
      {
        category: 'All',
        status: 'All',
        inStock: false,
      },
      mockSearch.carrot,
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Carrot');
  });
});
