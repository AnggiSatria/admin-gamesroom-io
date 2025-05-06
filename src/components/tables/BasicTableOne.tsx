'use client';

import React, { useState } from 'react';
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
import { Modal } from '../ui/modal';
import { useDeletedGame } from '@/shared/lib/helpers/client/services/games';
import { useDeletedGenre } from '@/shared/lib/helpers/client/services/genre';
import { useDeletedPlatform } from '@/shared/lib/helpers/client/services/platforms';
import { toast } from 'sonner';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [placement, setPlacement] = useState('');

  const { mutations: mutationsDeleteGame } = useDeletedGame();
  const { mutations: mutationsDeleteGenre } = useDeletedGenre();
  const { mutations: mutationsDeletePlatform } = useDeletedPlatform();

  const handleDelete = async () => {
    switch (placement) {
      case 'Game':
        return mutationsDeleteGame
          .mutateAsync(id)
          .then((res) => {
            setIsModalOpen(false);
            toast.success(
              res && res?.data
                ? res && res?.data?.data?.message
                : 'Success Deleted Games'
            );
            router.refresh();
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ??
                'Network Error, Please Check Again!'
            );
          });
      case 'Genre':
        return mutationsDeleteGenre
          .mutateAsync(id)
          .then((res) => {
            setIsModalOpen(false);
            toast.success(
              res && res?.data
                ? res && res?.data?.data?.message
                : 'Success Deleted Games'
            );
            router.refresh();
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ??
                'Network Error, Please Check Again!'
            );
          });
      case 'Platform':
        return mutationsDeletePlatform
          .mutateAsync(id)
          .then((res) => {
            setIsModalOpen(false);
            toast.success(
              res && res?.data
                ? res && res?.data?.data?.message
                : 'Success Deleted Games'
            );
            router.refresh();
          })
          .catch((err) => {
            toast.error(
              err?.response?.data?.message ??
                'Network Error, Please Check Again!'
            );
          });
    }

    console.log('Item deleted');
    setIsModalOpen(false); // Tutup modal setelah delete
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="mx-auto max-w-sm p-6 text-center"
        showCloseButton={false}
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
          Are you sure want to delete?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </Modal>
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
                        <TableCell className="px-5 py-4">
                          {game?.title}
                        </TableCell>
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
                            onClick={() =>
                              router.push(`/edit-game/${game?.id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setIsModalOpen(true);
                              setId(game?.id);
                              setPlacement('Game');
                            }}
                            className="bg-red-500 hover:bg-red-300"
                          >
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
                        <TableCell className="px-4 py-3">
                          {genre?.name}
                        </TableCell>
                        <TableCell className="flex gap-2 px-4 py-3">
                          <Button
                            onClick={() =>
                              router.push(`/edit-genre/${genre?.id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setIsModalOpen(true);
                              setId(genre?.id);
                              setPlacement('Genre');
                            }}
                            className="bg-red-500 hover:bg-red-300"
                          >
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
                        <TableCell className="px-4 py-3">
                          {platform?.type}
                        </TableCell>
                        <TableCell className="flex gap-2 px-4 py-3">
                          <Button
                            onClick={() =>
                              router.push(`/edit-platform/${platform?.id}`)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => {
                              setIsModalOpen(true);
                              setId(platform?.id);
                              setPlacement('Platform');
                            }}
                            className="bg-red-500 hover:bg-red-300"
                          >
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
    </>
  );
}
