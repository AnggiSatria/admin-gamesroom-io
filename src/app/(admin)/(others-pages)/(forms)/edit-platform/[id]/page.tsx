import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import EditPlatforms from '@/components/form/EditPlatform/EditPlatforms';
import { Metadata } from 'next';
import React from 'react';

type tParams = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: 'Edit Platform',
  description: 'Form Edit Platform',
};

export default async function EditPlatform({ params }: { params: tParams }) {
  const { id } = await params;

  return (
    <div>
      <PageBreadcrumb pageTitle="Form Edit Platform" />
      <EditPlatforms id={id} />
    </div>
  );
}
