import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import { createSchema } from './schema';
import { ApolloProvider } from '@apollo/react-hooks';
import { GraphQLSchema } from 'graphql';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import SchemaLink from 'apollo-link-schema';

function createApolloClient(schema: GraphQLSchema) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({
      schema,
    }),
  });
}

type ApolloSetupState =
  | {
      type: 'loading';
    }
  | {
      type: 'error';
      message: string;
    }
  | {
      type: 'resolved';
      client: ReturnType<typeof createApolloClient>;
    };

interface ApolloSetupProps {
  children: ReactNode;
}

export const ApolloSetup = ({ children }: ApolloSetupProps) => {
  const [state, setState] = useState<ApolloSetupState>({
    type: 'loading',
  });

  useEffect(() => {
    async function fetchSchema() {
      try {
        const schema = await createSchema(
          'https://petstore.swagger.io/v2/swagger.json',
        );
        setState({
          type: 'resolved',
          client: createApolloClient(schema),
        });
      } catch (e) {
        setState({
          type: 'error',
          message: e.message,
        });
      }
    }
    fetchSchema();
  }, []);

  switch (state.type) {
    case 'error':
      return <>Error {state.message}</>;
    case 'loading':
      return <>Loading schema...</>;
    case 'resolved':
      return <ApolloProvider client={state.client}>{children}</ApolloProvider>;
    default:
      return (
        <>Expected a different state than "{JSON.stringify(state, null, 2)}"</>
      );
  }
};
