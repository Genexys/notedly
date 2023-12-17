import { ApolloError, useQuery } from '@apollo/client';
import React, { createContext, useContext, useMemo } from 'react';

import { GET_NOTES } from '../queries/getNotes';

export type DataNotes = {
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

export type FetchMoreArgs = {
  cursor: string | undefined;
};

type TDataNotes = {
  data: DataNotes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  fetchMore: ({
    variables: { cursor },
    updateQuery,
  }: {
    variables: FetchMoreArgs;
    updateQuery: (
      prev: DataNotes,
      { fetchMoreResult }: { fetchMoreResult: DataNotes },
    ) => DataNotes;
  }) => void;
};

type TNotesProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<TDataNotes | null>(null);

const NotesProvider: React.FC<TNotesProviderProps> = ({ children }) => {
  const { data, loading, error, fetchMore } = useQuery<DataNotes>(GET_NOTES);

  const value = useMemo(() => {
    return {
      data,
      loading,
      error,
      fetchMore,
    };
  }, [data, loading, error, fetchMore]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useNotesContext = () => {
  return useContext(Context) as TDataNotes;
};

export default NotesProvider;
