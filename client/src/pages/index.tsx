import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Error from './Error';
import Favorites from './Favorites';
import Home from './Home';
import Layout from './Layout/Layout';
import MyNotes from './MyNotes';
import NotePage from './Note';

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="my-notes" element={<MyNotes />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="note/:id" element={<NotePage />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default Pages;
