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
export default function DefaultInputs({
  selectedPages,
  game,
}: {
  selectedPages: string;
  game: IResponseGetGameById | undefined;
}) {
  console.log(game);

  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value);
  };

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
          <Input type="text" placeholder="Enter a title game..." />
        </div>
        <div>
          <Label>Genre</Label>
          <div className="relative">
            <Select
              options={optionGenre}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Platform</Label>
          <div className="relative">
            <Select
              options={optionPlatform}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Game URL</Label>
          <Input type="text" placeholder="Ex...." />
        </div>
      </div>
    </ComponentCard>
  );
}
