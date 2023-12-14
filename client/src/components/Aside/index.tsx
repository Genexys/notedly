import React from 'react';

import styles from './aside.module.css';

type TProps = {
  children: React.ReactNode;
};

const Aside: React.FC<TProps> = ({ children }) => {
  return <aside className={styles.aside}>{children}</aside>;
};

export default Aside;
