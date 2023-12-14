import React from 'react';

import styles from './header.module.css';
import Logo from '../../../assets/images/logo-color-no-bg.svg';
const Header = () => {
  return (
    <header className={styles.header}>
      <img width={150} height={150} src={Logo} className={styles.logo} alt="title" />
    </header>
  );
};

export default Header;
