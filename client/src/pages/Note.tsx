import React from 'react';
import { useParams } from 'react-router-dom';

import Note from '../components/Note';
import { useNotesContext } from '../context/notesContext';

const NotePage: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useNotesContext();

  const note = data?.noteFeed?.notes.find((note) => {
    return note.id === id;
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {note && (
        <Note
          author={note.author.username}
          createdAt={note.createdAt}
          content={note.content}
          favoriteCount={note.favoriteCount}
        />
      )}
    </div>
  );
};

export default NotePage;
