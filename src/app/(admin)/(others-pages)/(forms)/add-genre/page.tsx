import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AddGenres from '@/components/form/AddGenre/AddGenre';
import { Metadata } from 'next';
import React from 'react';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Add Genre',
  description: 'Form Add Genre',
};

export default function AddGenre() {
  return (
    <div>
      <Toaster />
      <PageBreadcrumb pageTitle="Form Add Genre" />
      <AddGenres />
    </div>
  );
}
