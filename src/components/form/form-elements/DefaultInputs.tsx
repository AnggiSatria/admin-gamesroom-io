'use client';
import React from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import Input from '../input/InputField';
import Select from '../Select';
import { ChevronDownIcon } from '../../../icons';
import { useReadGenres } from '@/shared/lib/helpers/client/services/genre';
import { IResponseGenreList } from '@/shared/lib/helpers/client/services/interfaces/genre.interfaces';
import { useReadPlatforms } from '@/shared/lib/helpers/client/services/platforms';
import { IResponseGetPlatformList } from '@/shared/lib/helpers/client/services/interfaces/platform.interfaces';
import { IResponseGetGameById } from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import { Controller } from 'react-hook-form';

export default function DefaultInputs({
  selectedPages,
  form,
}: {
  selectedPages: string;
  game: IResponseGetGameById | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}) {
  const activeFilter = {
    search: '',
    page: '',
  };

  const { data: dataAllGenre } = useReadGenres(activeFilter);
  const { data: dataAllPlatform } = useReadPlatforms(activeFilter);

  const genres = dataAllGenre && dataAllGenre?.data;
  const optionGenre = genres?.map((res: IResponseGenreList) => {
    return {
      value: res?.id,
      label: res?.name,
    };
  });
  const platforms = dataAllPlatform && dataAllPlatform?.data;
  const optionPlatform = platforms?.map((res: IResponseGetPlatformList) => {
    return {
      value: res?.id,
      label: res?.name,
    };
  });

  return (
    <ComponentCard title={`Form ${selectedPages}`}>
      <div className="space-y-6">
        <div>
          <Label>Title</Label>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Enter a title game..."
                {...field}
                hint={form?.formState?.errors?.title?.message}
              />
            )}
          />
        </div>
        <div>
          <Label>Genre</Label>
          <div className="relative">
            <Controller
              name="genreId"
              control={form.control}
              render={({ field }) => (
                <Select
                  options={optionGenre}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select a genre"
                  className="dark:bg-dark-900"
                />
              )}
            />

            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Platform</Label>
          <div className="relative">
            <Controller
              name="platformId"
              control={form.control}
              render={({ field }) => (
                <Select
                  options={optionPlatform}
                  value={field.value}
                  onChange={(val) => field.onChange(val)}
                  placeholder="Select a platform"
                  className="dark:bg-dark-900"
                />
              )}
            />

            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Game URL</Label>
          <Controller
            name="gameUrl"
            control={form.control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Ex...."
                {...field}
                hint={form?.formState?.errors?.gameUrl?.message}
              />
            )}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
