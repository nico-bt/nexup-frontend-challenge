import React from 'react';
import {
  CategoryFilterType,
  ProductCategory,
} from '../../models/ProductCategory';
import { ProductStatus, StatusFilterType } from '../../models/ProductStatus';
import styles from './styles.module.css';

type ProductFilters = {
  category: CategoryFilterType;
  status: StatusFilterType;
  inStock: boolean;
};

type Props = {
  selectedFilters: ProductFilters;
  onChangeFilters: (filters: ProductFilters) => void;
};

export const Filters = ({ selectedFilters, onChangeFilters }: Props) => {
  const categories = Object.values(ProductCategory);
  const statuses = Object.values(ProductStatus);

  return (
    <div className={styles.container}>
      <h2>Filter by</h2>

      <div className={styles.filters}>
        <div>
          <span>Category: </span>
          <select
            value={selectedFilters.category}
            onChange={(e) =>
              onChangeFilters({
                ...selectedFilters,
                category: e.target.value as CategoryFilterType,
              })
            }
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span>Status: </span>
          <select
            value={selectedFilters.status}
            onChange={(e) =>
              onChangeFilters({
                ...selectedFilters,
                status: e.target.value as StatusFilterType,
              })
            }
          >
            <option value="All">All</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.flexCenter}>
            <input
              type="checkbox"
              checked={selectedFilters.inStock}
              onChange={(e) =>
                onChangeFilters({
                  ...selectedFilters,
                  inStock: e.target.checked,
                })
              }
            />
            <span> In stock only</span>
          </label>
        </div>
      </div>
    </div>
  );
};
