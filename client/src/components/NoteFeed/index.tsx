import React from 'react';
import { Link } from 'react-router-dom';

import styles from './noteFeed.module.css';
import { TNotes } from '../../context/notesContext';
import Note from '../Note';

type TProps = {
  notes: TNotes | undefined;
};

const NoteFeed: React.FC<TProps> = (notes) => {
  return (
    <div className={styles.noteFeed}>
      {notes.notes?.map((note) => (
        <div key={note.id}>
          <Note
            // title={note.title}
            author={note.author.username}
            createdAt={note.createdAt}
            content={note.content}
            favoriteCount={note.favoriteCount}
            link={<Link to={`/note/${note.id}`}>View</Link>}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteFeed;
