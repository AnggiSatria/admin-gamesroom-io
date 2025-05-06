'use client';
import { IResponseGetGameById } from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import React from 'react';
import DefaultInputs from '../form-elements/DefaultInputs';
import TextAreaInput from '../form-elements/TextAreaInput';
import FileInputExample from '../form-elements/FileInputExample';
import DropzoneComponent from '../form-elements/DropZone';
import Button from '@/components/ui/button/Button';
import useHooksCreateGame from '@/shared/ui/hooks/games/Addgames';
import { Toaster } from 'sonner';

export default function AddGameComponent({
  game,
}: {
  game: IResponseGetGameById | undefined;
}) {
  const { form: formAddGame, onSubmit: onSubmitAddGame } = useHooksCreateGame();

  return (
    <div className="grid grid-cols-1 gap-6">
      <Toaster />
      <form
        className="space-y-6"
        onSubmit={formAddGame.handleSubmit(onSubmitAddGame)}
      >
        <DefaultInputs
          game={game}
          selectedPages="Add Game"
          form={formAddGame}
        />
        <TextAreaInput form={formAddGame} />
        <FileInputExample form={formAddGame} />
        <DropzoneComponent name="screenshots" control={formAddGame.control} />
        <Button type="submit" className="w-full">
          Add Game
        </Button>
      </form>
    </div>
  );
}
