import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import EditGameComponent from '@/components/form/EditGame/EditGame';
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

  return (
    <div>
      <PageBreadcrumb pageTitle="Edit Game" />
      <EditGameComponent game={game} />
    </div>
  );
}
