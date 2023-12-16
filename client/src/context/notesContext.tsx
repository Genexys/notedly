import { ApolloError, useQuery } from '@apollo/client';
import React, { createContext, useContext, useMemo } from 'react';

import { GET_NOTES } from '../queries/getNotes';

type DataNotes = {
  noteFeed: {
    cursor: string;
    hasNextPage: boolean;
    notes: TNotes;
    __typename: string;
  };
};

type TNote = {
  id: string;
  createdAt: number;
  content: string;
  favoriteCount: number;
  author: {
    username: string;
  };
};

export type TNotes = TNote[];

type TDataNotes = {
  data: DataNotes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

type TNotesProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<TDataNotes | null>(null);

const NotesProvider: React.FC<TNotesProviderProps> = ({ children }) => {
  const { data, loading, error } = useQuery<DataNotes>(GET_NOTES);

  const value = useMemo(() => {
    return {
      data,
      loading,
      error,
    };
  }, [data, loading, error]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useNotesContext = () => {
  return useContext(Context) as TDataNotes;
};

export default NotesProvider;
