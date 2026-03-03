import React from 'react';
import { Product } from '../../models/Product';
import styles from './styles.module.css';
import { ProductStatus } from '../../models/ProductStatus';

type CardProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ProductCard: React.FC<CardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      {product.status === ProductStatus.Inactive && (
        <div className={styles.inactiveOverlay}>
          <p>Inactive</p>
        </div>
      )}

      <h3 className={styles.title}>{product.name}</h3>

      <p className={styles.category}>{product.category}</p>

      <p className={styles.price}>{currencyFormatter.format(product.price)}</p>

      <p
        className={styles.stock}
        style={
          product.stock > 0
            ? { backgroundColor: 'rgb(204, 249, 204)' }
            : { backgroundColor: 'rgb(249, 204, 204)' }
        }
      >
        {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of stock'}
      </p>
    </div>
  );
};
