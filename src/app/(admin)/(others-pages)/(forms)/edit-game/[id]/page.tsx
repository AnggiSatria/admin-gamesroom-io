import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import DefaultInputs from '@/components/form/form-elements/DefaultInputs';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import FileInputExample from '@/components/form/form-elements/FileInputExample';
import TextAreaInput from '@/components/form/form-elements/TextAreaInput';
import Button from '@/components/ui/button/Button';
import { IResponseGetGameById } from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import { Metadata } from 'next';
import React from 'react';

type tParams = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: 'Edit Game',
  description: 'edit game',
};

export default async function EditGame({ params }: { params: tParams }) {
  const { id } = await params;

  const gameRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/game/${id}`,
    {
      cache: 'no-store',
    }
  );
  const game: IResponseGetGameById = await gameRes.json();

  console.log(game);

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Game" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <DefaultInputs game={game} selectedPages="Edit Game" />
          <TextAreaInput />
          <FileInputExample />
          <DropzoneComponent />
          <Button className="w-full">Edit Game</Button>
        </div>
      </div>
    </div>
  );
}
