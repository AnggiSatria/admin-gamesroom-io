import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import InputStates from '@/components/form/form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Add Genre',
  description: 'Form Add Genre',
};

export default function AddGenre() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Add Genre" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <InputStates selectedPages="Add Genre" />
          <Button className="w-full">Add Genre</Button>
        </div>
      </div>
    </div>
  );
}
