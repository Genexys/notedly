import { format } from 'date-fns';
import React from 'react';
import Markdown from 'react-markdown';

import styles from './note.module.css';
import HeartIcon from '../../../assets/images/heart_icon.svg';

type TProps = {
  // title: string;
  author: string;
  createdAt: number;
  content: string;
  favoriteCount: number;
  link?: React.ReactNode;
};

const Note: React.FC<TProps> = ({ author, createdAt, content, favoriteCount, link }) => {
  const formattedDate = format(new Date(createdAt), 'MMMM do, yyyy H:mm:ss');

  return (
    <article className={styles.note}>
      <header className={styles.header}>
        {/* <h2>{title}</h2> */}
        <p className={styles.author}>{author}</p>
        <p className={styles.date}>{formattedDate}</p>
      </header>

      <main className={styles.content}>
        <Markdown>{content}</Markdown>
      </main>

      <footer className={styles.footer}>
        {link && <span className={styles.link}>{link}</span>}
        <span className={styles.favorites}>
          <img width={20} height={20} src={HeartIcon} alt="" />
          <span>{favoriteCount}</span>
        </span>
      </footer>
    </article>
  );
};

export default Note;
