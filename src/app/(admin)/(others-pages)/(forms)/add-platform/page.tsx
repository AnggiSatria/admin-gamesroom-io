import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import InputStates from '@/components/form/form-elements/InputStates';
import Button from '@/components/ui/button/Button';
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
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <InputStates selectedPages="Add Platform" />
          <Button className="w-full">Add Platform</Button>
        </div>
      </div>
    </div>
  );
}
