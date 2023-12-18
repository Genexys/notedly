import { useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';

import Button from '../../components/Button';
import Field from '../../components/Field';
import Form from '../../components/Form';

const SIGN_UP_MUTATION = gql`
  mutation signUp($newUser: newUserInput) {
    signUp(newUser: $newUser)
  }
`;

const SignUpForm: React.FC = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: (data) => {
      console.log(data, 'completed');
    },
  });
  console.log('🚀 ~ file: index.tsx:26 ~ error:', error);
  console.log('🚀 ~ file: index.tsx:26 ~ loading:', loading);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    console.log('🚀 ~ file: index.tsx:39 ~ handleSubmit ~ values.username:', values.username);

    signUp({
      variables: {
        newUser: {
          email: values.email,
          password: values.password,
          username: values.username,
        },
      },
    });
  };

  return (
    <Form>
      <Field
        id="username-signup"
        label="Username"
        type="text"
        name="username"
        value={values.username}
        onChange={(e) => setValues({ ...values, username: e.target.value })}
      />
      <Field
        id="email-signup"
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      <Field
        id="password-signup"
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
      />
      <Button type="submit" style="primary" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
