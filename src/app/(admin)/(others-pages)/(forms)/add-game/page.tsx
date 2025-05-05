import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import DefaultInputs from '@/components/form/form-elements/DefaultInputs';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileInputExample from '@/components/form/form-elements/FileInputExample';
import TextAreaInput from '@/components/form/form-elements/TextAreaInput';
import Button from '@/components/ui/button/Button';
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
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <DefaultInputs selectedPages="Add Game" game={undefined} />
          <TextAreaInput />
          <FileInputExample />
          <DropzoneComponent />
          <Button className="w-full">Add Game</Button>
        </div>
      </div>
    </div>
  );
}
