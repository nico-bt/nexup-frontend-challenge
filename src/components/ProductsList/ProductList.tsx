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
      {productList.length === 0 ? (
        <p className={styles.noItems}>No items</p>
      ) : (
        productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};
