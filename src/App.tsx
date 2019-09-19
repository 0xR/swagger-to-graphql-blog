import React from 'react';
import './App.css';
import { ApolloSetup } from './ApolloSetup';
import { Layout } from './Layout';
import { PetStorePage } from './PetStorePage';

const App = () => (
  <Layout>
    <ApolloSetup>
      <PetStorePage />
    </ApolloSetup>
  </Layout>
);

export default App;
