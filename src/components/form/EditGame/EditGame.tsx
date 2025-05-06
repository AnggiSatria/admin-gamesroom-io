'use client';
import { IResponseGetGameById } from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import useHooksEditGame from '@/shared/ui/hooks/games/EditGames';
import React, { useEffect } from 'react';
import DefaultInputs from '../form-elements/DefaultInputs';
import TextAreaInput from '../form-elements/TextAreaInput';
import FileInputExample from '../form-elements/FileInputExample';
import DropzoneComponent from '../form-elements/DropZone';
import Button from '@/components/ui/button/Button';
import { Toaster } from 'sonner';

export default function EditGameComponent({
  game,
}: {
  game: IResponseGetGameById;
}) {
  const { form: formEditGame, onSubmit: onSubmitEditGame } =
    useHooksEditGame(game);

  useEffect(() => {
    formEditGame.setValue(`id`, game?.id);
    formEditGame.setValue(`title`, game?.title);
    formEditGame.setValue(`description`, game?.description);
    formEditGame.setValue(`gameUrl`, game?.gameUrl);
    formEditGame.setValue(`genreId`, game?.genre?.id);
    formEditGame.setValue(`platformId`, game?.platform?.id);
    // formEditGame.setValue(`coverImage`, undefined);
    // formEditGame.setValue(`screenshots`, undefined);
  }, [game, formEditGame]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Toaster />
      <form
        className="space-y-6"
        onSubmit={formEditGame.handleSubmit(onSubmitEditGame)}
      >
        <DefaultInputs
          game={game}
          selectedPages="Edit Game"
          form={formEditGame}
        />
        <TextAreaInput form={formEditGame} />
        <FileInputExample form={formEditGame} />
        <DropzoneComponent control={formEditGame.control} name="screenshots" />
        <Button type="submit" className="w-full">
          Edit Game
        </Button>
      </form>
    </div>
  );
}
