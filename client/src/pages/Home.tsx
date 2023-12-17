import React from 'react';

import NoteFeed from '../components/NoteFeed';
import { DataNotes, useNotesContext } from '../context/notesContext';

const Home = () => {
  const { data, loading, error, fetchMore } = useNotesContext();
  const notes = data?.noteFeed?.notes;

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const fetchMoreNotes = () => {
    fetchMore({
      variables: {
        cursor: data?.noteFeed?.cursor,
      },
      updateQuery: (prev: DataNotes, { fetchMoreResult }: { fetchMoreResult: DataNotes }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          noteFeed: {
            ...fetchMoreResult.noteFeed,
            notes: [...prev.noteFeed.notes, ...fetchMoreResult.noteFeed.notes],
          },
        };
      },
    });
  };

  return (
    <>
      <NoteFeed notes={notes} />
      {data?.noteFeed?.hasNextPage && (
        <button type="button" onClick={fetchMoreNotes}>
          Load more
        </button>
      )}
    </>
  );
};

export default Home;
