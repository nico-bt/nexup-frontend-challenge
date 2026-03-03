import React from 'react';
import { CategoryFilterType, ProductCategory } from '../models/ProductCategory';

type Props = {
  selectedCategory: CategoryFilterType;
  onChangeCategory: (category: CategoryFilterType) => void;
};

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  onChangeCategory,
}) => {
  const categories = Object.values(ProductCategory);

  return (
    <div>
      <div>
        <span>Filter by: </span>
        <select
          value={selectedCategory}
          onChange={(e) =>
            onChangeCategory(e.target.value as CategoryFilterType)
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
    </div>
  );
};
