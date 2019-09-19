import React, { useState } from 'react';
import './App.css';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { FindPets, FindPets_findPetsByStatus } from './__generated__/FindPets';
import {
  PetDetails,
  PetDetails_getPetById,
  PetDetailsVariables,
} from './__generated__/PetDetails';

const PetDetailsQuery = gql`
  query PetDetails($petId: String!) {
    getPetById(petId: $petId) {
      name
      tags {
        name
      }
      photoUrls
    }
  }
`;

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

function petDetailsToString({ name, tags, photoUrls }: PetDetails_getPetById) {
  return JSON.stringify(
    {
      name,
      tags: tags && tags.map(({ name }) => name),
      photoUrls,
    },
    null,
    2,
  );
}

interface PetItemProps {
  pet: FindPets_findPetsByStatus;
}

const PetItem = ({ pet: { id, category, status } }: PetItemProps) => {
  const [open, setOpen] = useState<boolean>(false);
  if (!id) {
    throw new Error(`Pet should have an id got: "${id}"`);
  }
  const { loading, error, data } = useQuery<PetDetails, PetDetailsVariables>(
    PetDetailsQuery,
    {
      variables: {
        petId: id.toString(),
      },
      skip: !open,
    },
  );
  return (
    <li>
      <button
        onClick={e => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {id} ({status})
        {category && category.name && ` category: ${category.name}`}
      </button>
      {open &&
        (loading ? (
          <p>Loading pet details...</p>
        ) : error ? (
          <p>Error loading pets: {error.message}</p>
        ) : data ? (
          <pre>{petDetailsToString(data.getPetById)}</pre>
        ) : (
          <p>Expected data, got {JSON.stringify(data)}</p>
        ))}
    </li>
  );
};

function petIdIsSafe({ id }: FindPets_findPetsByStatus) {
  if (!id) {
    throw new Error(`Pet should have an id got: "${id}"`);
  }
  let numberId = Number(id);
  return (
    Number.MIN_SAFE_INTEGER <= numberId && numberId <= Number.MAX_SAFE_INTEGER
  );
}

interface PetListProps {
  pets: FindPets_findPetsByStatus[];
}

const PetList = ({ pets }: PetListProps) => (
  <ul>
    {pets.filter(petIdIsSafe).map((pet, i) => (
      <PetItem key={i} pet={pet} />
    ))}
  </ul>
);

export const PetStorePage = () => {
  const { loading, error, data } = useQuery<FindPets, undefined>(PetsQuery);
  return loading ? (
    <>Loading pets...</>
  ) : error ? (
    <>Error loading pets: {error.message}</>
  ) : data ? (
    <PetList pets={data.findPetsByStatus} />
  ) : (
    <>Expected error, loading or data</>
  );
};
