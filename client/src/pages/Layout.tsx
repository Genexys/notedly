import React from 'react';
import { Outlet } from 'react-router-dom';

import Aside from '../components/Aside';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

const Layout = () => {
  return (
    <div>
      <Header />
      <Aside>
        <Navigation />
      </Aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
