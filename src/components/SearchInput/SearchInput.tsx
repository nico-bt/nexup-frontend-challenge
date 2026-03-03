import React from 'react';
import styles from './styles.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search by name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Reset btn */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className={styles.resetBtn}
          >
            ✖️
          </button>
        )}
      </div>
    </div>
  );
};
