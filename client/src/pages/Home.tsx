import React from 'react';

import NoteFeed from '../components/NoteFeed';
import { useNotesContext } from '../context/notesContext';

const Home = () => {
  const { data, loading, error } = useNotesContext();
  const notes = data?.noteFeed?.notes;

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <NoteFeed notes={notes} />
    </div>
  );
};

export default Home;
