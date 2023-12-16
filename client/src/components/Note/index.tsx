import React from 'react';
import Markdown from 'react-markdown';

type TProps = {
  // title: string;
  author: string;
  createdAt: string;
  content: string;
  favoriteCount: number;
};

const Note: React.FC<TProps> = ({ author, createdAt, content, favoriteCount }) => {
  return (
    <article>
      <header>
        {/* <h2>{title}</h2> */}
        <p>{author}</p>
        <p>{createdAt}</p>
      </header>

      <Markdown>{content}</Markdown>

      <footer>
        <p>{favoriteCount}</p>
      </footer>
    </article>
  );
};

export default Note;
