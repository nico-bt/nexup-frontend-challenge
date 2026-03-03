import React, { useEffect, useMemo, useState } from 'react';
import { ProductList } from './ProductsList/ProductList';
import { Product } from '../models/Product';
import { getProductList } from '../api/products';
import { CategoryFilterType } from '../models/ProductCategory';
import { CategoryFilter } from './CategoryFilter';

export const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState<CategoryFilterType>('All');

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
    if (category === 'All') return products;

    return products.filter((product) => product.category === category);
  }, [products, category]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  if (products.length === 0) return <p>No items</p>;

  return (
    <div>
      <CategoryFilter
        selectedCategory={category}
        onChangeCategory={setCategory}
      />
      <ProductList productList={filteredProducts} />
    </div>
  );
};
