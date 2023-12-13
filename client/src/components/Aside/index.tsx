import React from 'react';

type TProps = {
  children: React.ReactNode;
};

const Aside: React.FC<TProps> = ({ children }) => {
  return <aside>{children}</aside>;
};

export default Aside;
