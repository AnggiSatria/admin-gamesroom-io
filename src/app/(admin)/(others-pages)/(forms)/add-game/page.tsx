import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AddGameComponent from '@/components/form/AddGame/AddGame';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add Game',
  description: 'adding game',
};

export default function AddGame() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Game" />
      <AddGameComponent game={undefined} />
    </div>
  );
}
