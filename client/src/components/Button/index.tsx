import React from 'react';

import styles from './Button.module.css';

type TProps = {
  children: React.ReactNode;
  style: 'primary' | 'secondary';
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<TProps> = ({ children, onClick, style = 'primary', type = 'button' }) => {
  return (
    <button type={type} className={`${styles.button} ${styles[style]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
