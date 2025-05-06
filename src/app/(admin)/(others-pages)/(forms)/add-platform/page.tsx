import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import AddPlatforms from '@/components/form/AddPlatform/AddPlatforms';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add Platform',
  description: 'Form Add Platform',
};

export default function AddPlatform() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Add Platform" />
      <AddPlatforms />
    </div>
  );
}
