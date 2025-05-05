import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import InputStates from '@/components/form/form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Edit Platform',
  description: 'Form Edit Platform',
};

export default function EditPlatform() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Form Edit Platform" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <InputStates selectedPages="Edit Platform" />
          <Button className="w-full">Edit Platform</Button>
        </div>
      </div>
    </div>
  );
}
