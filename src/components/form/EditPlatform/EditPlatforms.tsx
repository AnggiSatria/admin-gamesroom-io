'use client';

import React, { useEffect } from 'react';
import InputStates from '../form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import useHooksEditPlatform from '@/shared/ui/hooks/platform/EditPlatform';
import { Toaster } from 'sonner';
import { useReadPlatformById } from '@/shared/lib/helpers/client/services/platforms';

export default function EditPlatforms({ id }: { id: string }) {
  const { form: formEditPlatform, onSubmit: onSubmitEditPlatform } =
    useHooksEditPlatform({ id });

  const activeFilter = {
    search: '',
    page: '',
  };

  const { data: dataPlatformById } = useReadPlatformById(activeFilter, id);

  const platformById = dataPlatformById && dataPlatformById?.data;

  useEffect(() => {
    if (platformById) {
      formEditPlatform.setValue(`id`, platformById?.id);
      formEditPlatform.setValue(`name`, platformById?.name);
      formEditPlatform.setValue(`type`, platformById?.type);
    }
  }, [platformById, formEditPlatform]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Toaster />
      <form
        className="space-y-6"
        onSubmit={formEditPlatform.handleSubmit(onSubmitEditPlatform)}
      >
        <InputStates selectedPages="Edit Platform" form={formEditPlatform} />
        <Button type="submit" className="w-full">
          Edit Platform
        </Button>
      </form>
    </div>
  );
}
