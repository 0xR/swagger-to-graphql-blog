import React, { ReactNode, useEffect, useState } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';
import { createSchema } from './schema';
import SchemaLink from 'apollo-link-schema';
import { GraphQLSchema } from 'graphql';
import gql from 'graphql-tag';
import { useQuery, ApolloProvider } from '@apollo/react-hooks';
import { FindPets } from './__generated__/FindPets';

function createApolloClient(schema: GraphQLSchema) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({
      schema,
    }),
  });
}

type AppState =
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

const PetsQuery = gql`
  query FindPets {
    findPetsByStatus(status: ["available", "pending"]) {
      id
      category {
        name
      }
      status
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery<FindPets, undefined>(PetsQuery);
  return loading ? (
    <>Loading pets...</>
  ) : error ? (
    <>Error loading pets {error}</>
  ) : data ? (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  ) : (
    <>Expected error, loading or data</>
  );
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <h1>PetStore</h1>
    {children}
  </>
);

interface ApolloSetupProps {
  children: ReactNode;
}

const ApolloSetup = ({ children }: ApolloSetupProps) => {
  const [state, setState] = useState<AppState>({
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

const App = () => (
  <Layout>
    <ApolloSetup>
      <Home />
    </ApolloSetup>
  </Layout>
);

export default App;
