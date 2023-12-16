import React from 'react';

import { TNotes } from '../../context/notesContext';
import Note from '../Note';

type TProps = {
  notes: TNotes;
};

const NoteFeed: React.FC<TProps> = (notes) => {
  return (
    <div>
      {notes.notes?.map((note) => (
        <div key={note.id}>
          <Note
            // title={note.title}
            author={note.author.username}
            createdAt={note.createdAt}
            content={note.content}
            favoriteCount={note.favoriteCount}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteFeed;
