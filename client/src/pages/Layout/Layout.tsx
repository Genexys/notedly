import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layout.module.css';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Aside>
        <Navigation />
      </Aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
