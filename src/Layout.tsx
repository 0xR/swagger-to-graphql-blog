import React, { ReactNode } from 'react';
import './App.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <h1>PetStore</h1>
    {children}
  </>
);
