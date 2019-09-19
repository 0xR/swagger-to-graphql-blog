import React from 'react';
import './App.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FindPets } from './__generated__/FindPets';

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

export const PetStorePage = () => {
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
