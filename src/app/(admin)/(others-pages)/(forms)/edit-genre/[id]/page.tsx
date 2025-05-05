import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import InputStates from '@/components/form/form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit Genre',
  description: 'Form Edit Genre',
};

export default function EditGenre() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Genre" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <InputStates selectedPages="Edit Genre" />
          <Button className="w-full">Edit Genre</Button>
        </div>
      </div>
    </div>
  );
}
