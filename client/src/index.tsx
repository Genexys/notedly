import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import NotesProvider from './context/notesContext';

const client = new ApolloClient({
  uri: import.meta.env.VITE_URI_SERVER,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <NotesProvider>
          <App />
        </NotesProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
