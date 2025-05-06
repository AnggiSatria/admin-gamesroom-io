'use client';

import React from 'react';
import InputStates from '../form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import useHooksAddGenre from '@/shared/ui/hooks/genre/AddGenre';

export default function AddGenres() {
  const { form: formAddGenre, onSubmit: onSubmitAddGenre } = useHooksAddGenre();

  return (
    <div className="grid grid-cols-1 gap-6">
      <form
        className="space-y-6"
        onSubmit={formAddGenre.handleSubmit(onSubmitAddGenre)}
      >
        <InputStates selectedPages="Add Genre" form={formAddGenre} />
        <Button type="submit" className="w-full">
          Add Genre
        </Button>
      </form>
    </div>
  );
}
