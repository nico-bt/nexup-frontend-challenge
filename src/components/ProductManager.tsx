import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from './ProductsList/ProductList';
import { Product } from '../models/Product';
import { getProductList } from '../api/products';
import { Filters } from './Filters/Filters';
import { useDebouncedValue } from '../hooks/useDebounce';
import { SearchInput } from './SearchInput/SearchInput';
import { filterProducts, FiltersType } from '../lib/filterProducts';

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

  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedValue(searchInput, 400);

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

  const filteredProducts = useMemo(
    () => filterProducts(products, filters, debouncedSearch),
    [products, filters, debouncedSearch],
  );

  if (isLoading) return <p className="loading">Loading...</p>;

  if (error) return <p>{error}</p>;

  if (products.length === 0) return <p>No items</p>;

  return (
    <div>
      <SearchInput value={searchInput} onChange={setSearchInput} />
      <Filters selectedFilters={filters} onChangeFilters={setFilters} />
      <ProductList productList={filteredProducts} />
    </div>
  );
};
