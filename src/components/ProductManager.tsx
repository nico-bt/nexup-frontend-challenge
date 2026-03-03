import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from './ProductsList/ProductList';
import { Product } from '../models/Product';
import { getProductList } from '../api/products';
import { CategoryFilterType } from '../models/ProductCategory';
import { Filters } from './Filters/Filters';
import { StatusFilterType } from '../models/ProductStatus';

type FiltersType = {
  category: CategoryFilterType;
  status: StatusFilterType;
  inStock: boolean;
};

const initialFilters: FiltersType = {
  category: 'All',
  status: 'All',
  inStock: false,
};

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersType>(initialFilters);

  useEffect(() => {
    const getProducts = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getProductList();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = useMemo(() => {
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

      return true;
    });
  }, [products, filters]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (products.length === 0) return <p>No items</p>;

  return (
    <div>
      <Filters selectedFilters={filters} onChangeFilters={setFilters} />
      <ProductList productList={filteredProducts} />
    </div>
  );
};
