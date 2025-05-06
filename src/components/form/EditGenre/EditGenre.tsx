'use client';

import React, { useEffect } from 'react';
import InputStates from '../form-elements/InputStates';
import Button from '@/components/ui/button/Button';
import useHooksEditGenre from '@/shared/ui/hooks/genre/EditGenre';
import { useReadGenreById } from '@/shared/lib/helpers/client/services/genre';

export default function EditGenres({ id }: { id: string }) {
  const { form: formEditGenre, onSubmit: onSubmitEditGenre } =
    useHooksEditGenre({
      id,
    });

  const activeFilter = {
    search: '',
    page: '',
  };

  const { data: dataGenreById } = useReadGenreById(activeFilter, id);

  const genreById = dataGenreById && dataGenreById?.data;

  useEffect(() => {
    if (genreById) {
      formEditGenre.setValue(`id`, genreById?.id);
      formEditGenre.setValue(`name`, genreById?.name);
    }
  }, [genreById, formEditGenre]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <form
        className="space-y-6"
        onSubmit={formEditGenre.handleSubmit(onSubmitEditGenre)}
      >
        <InputStates selectedPages="Add Genre" form={formEditGenre} />
        <Button type="submit" className="w-full">
          Edit Genre
        </Button>
      </form>
    </div>
  );
}
