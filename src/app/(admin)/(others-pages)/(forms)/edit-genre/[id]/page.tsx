import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import EditGenres from '@/components/form/EditGenre/EditGenre';
import { Metadata } from 'next';
import React from 'react';

type tParams = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: 'Edit Genre',
  description: 'Form Edit Genre',
};

export default async function EditGenre({ params }: { params: tParams }) {
  const { id } = await params;
  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Genre" />
      <EditGenres id={id} />
    </div>
  );
}
