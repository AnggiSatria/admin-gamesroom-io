'use client';

import React from 'react';
import InputStates from '../form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import useHooksAddPlatform from '@/shared/ui/hooks/platform/AddPlatform';
import { Toaster } from 'sonner';

export default function AddPlatforms() {
  const { form: formAddPlatform, onSubmit: onSubmitAddPlatform } =
    useHooksAddPlatform();

  return (
    <div className="grid grid-cols-1 gap-6">
      <Toaster />
      <form
        className="space-y-6"
        onSubmit={formAddPlatform.handleSubmit(onSubmitAddPlatform)}
      >
        <InputStates selectedPages="Add Platform" form={formAddPlatform} />
        <Button type="submit" className="w-full">
          Add Platform
        </Button>
      </form>
    </div>
  );
}
