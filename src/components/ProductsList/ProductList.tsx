import React from 'react';
import { Product } from '../../models/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './styles.module.css';

type Props = {
  productList: Product[];
};

export const ProductList: React.FC<Props> = ({ productList }) => {
  return (
    <div className={styles.gridContainer}>
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
