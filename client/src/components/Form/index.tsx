import React, { ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
};

const Form: React.FC<FormProps> = ({ children }) => {
  return <form>{children}</form>;
};

export default Form;
