import React from 'react';

import styles from './field.module.css';

type TProps = {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date';
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Field: React.FC<TProps> = ({
  id,
  placeholder,
  label,
  name,
  value,
  onChange,
  type = 'text',
}) => {
  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Field;
