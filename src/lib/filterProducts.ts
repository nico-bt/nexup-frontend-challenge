import { Product } from '../models/Product';
import { CategoryFilterType } from '../models/ProductCategory';
import { StatusFilterType } from '../models/ProductStatus';

export type FiltersType = {
  category: CategoryFilterType;
  status: StatusFilterType;
  inStock: boolean;
};

export const filterProducts = (
  products: Product[],
  filters: FiltersType,
  debouncedSearch: string,
): Product[] => {
  return products.filter((product) => {
    if (filters.category !== 'All' && product.category !== filters.category) {
      return false;
    }

    if (filters.status !== 'All' && product.status !== filters.status) {
      return false;
    }

    if (filters.inStock && product.stock === 0) {
      return false;
    }

    // search (debounced)
    if (debouncedSearch.trim() !== '') {
      const search = debouncedSearch.toLowerCase();
      const matches = product.name.toLowerCase().includes(search);
      if (!matches) return false;
    }

    return true;
  });
};
