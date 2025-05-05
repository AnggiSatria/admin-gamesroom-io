'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';
import Button from '../ui/button/Button';
import {
  IResponseGetGames,
  IResponseGetGamesList,
} from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import {
  IResponseGenreList,
  IResponseGetGenres,
} from '@/shared/lib/helpers/client/services/interfaces/genre.interfaces';
import {
  IResponseGetPlatformList,
  IResponseGetPlatforms,
} from '@/shared/lib/helpers/client/services/interfaces/platform.interfaces';
import { useRouter } from 'next/navigation';

// Define the union type for selected page
type SelectedPage = 'games' | 'genre' | 'platforms';

// Mapping of table data type per selected page
type TableDataMap = {
  games: IResponseGetGames; // IResponseGetGames is an array of IResponseGetGamesList
  genre: IResponseGetGenres; // IResponseGetGenres is an array of IResponseGenreList
  platforms: IResponseGetPlatforms; // IResponseGetPlatforms is an array of IResponseGetPlatformList
};

type Props<T extends SelectedPage> = {
  listTH: string[];
  selectedPages: T;
  tableData: TableDataMap[T];
};

export default function BasicTableOne<T extends SelectedPage>({
  listTH,
  selectedPages,
  tableData,
}: Props<T>) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {listTH?.map((head, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {selectedPages === 'games' &&
                (tableData as IResponseGetGames)?.map(
                  (game: IResponseGetGamesList) => (
                    <TableRow key={game?.id}>
                      <TableCell className="px-5 py-4">{game?.title}</TableCell>
                      <TableCell className="px-4 py-3">
                        {game?.description}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {game?.platform?.name}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {game?.genre?.name}
                      </TableCell>
                      <TableCell className="flex gap-2 px-4 py-3">
                        <Button
                          onClick={() => router.push(`/edit-game/${game?.id}`)}
                        >
                          Edit
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-300">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}

              {selectedPages === 'genre' &&
                (tableData as IResponseGetGenres)?.map(
                  (genre: IResponseGenreList) => (
                    <TableRow key={genre?.id}>
                      <TableCell className="px-5 py-4">{genre?.id}</TableCell>
                      <TableCell className="px-4 py-3">{genre?.name}</TableCell>
                      <TableCell className="flex gap-2 px-4 py-3">
                        <Button
                          onClick={() =>
                            router.push(`/edit-genre/${genre?.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-300">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}

              {selectedPages === 'platforms' &&
                (tableData as IResponseGetPlatforms)?.map(
                  (platform: IResponseGetPlatformList) => (
                    <TableRow key={platform?.id}>
                      <TableCell className="px-5 py-4">
                        {platform?.id}
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {platform?.name}
                      </TableCell>
                      <TableCell className="flex gap-2 px-4 py-3">
                        <Button
                          onClick={() =>
                            router.push(`/edit-platform/${platform?.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-300">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
