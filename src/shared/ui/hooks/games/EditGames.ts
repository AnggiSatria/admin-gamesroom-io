'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEditGame } from '@/shared/lib/helpers/client/services/games';
import { IResponseGetGameById } from '@/shared/lib/helpers/client/services/interfaces/games.interfaces';
import { useRouter } from 'next/navigation';

export default function useHooksEditGame(
  game: IResponseGetGameById | undefined
) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const MAX_FILE_SIZE = 1000000; // 1MB
  const ACCEPTED_IMAGE_TYPES = [
    'image/png',
    'image/jpeg',
    'image/svg+xml',
    'image/webp',
  ];

  const formSchema = z.object({
    id: z.string().min(1, 'title is required'),
    title: z.string().min(1, 'title is required'),
    description: z.string().min(1, 'description is required'),
    gameUrl: z.string().min(1, 'Game URL is required'),
    genreId: z.string().min(1, 'Genre is required'),
    platformId: z.string().min(1, 'Platform is required'),
    coverImage: z
      .any()
      .refine(
        (file) =>
          file instanceof File &&
          file.size <= MAX_FILE_SIZE &&
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        {
          message: 'Invalid file type or size',
        }
      ),
    screenshots: z
      .any()
      .refine(
        (file) =>
          file instanceof File &&
          file.size <= MAX_FILE_SIZE &&
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        {
          message: 'Invalid file type or size',
        }
      ),
  });

  type TEditGameForm = z.infer<typeof formSchema>;

  const form = useForm<TEditGameForm>({
    defaultValues: {
      id: game?.id,
      title: game?.title,
      description: game?.description,
      gameUrl: game?.gameUrl,
      genreId: game?.genre?.id,
      platformId: game?.platform?.id,
      coverImage: '',
      screenshots: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useEditGame(game?.id || '');

  const onSubmit = async (data: TEditGameForm) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.set('id', game?.id || '');
      formData.set('title', data?.title);
      formData.set('description', data?.description);
      formData.set('gameUrl', data?.gameUrl);
      formData.set('genreId', game?.genre?.id || '');
      formData.set('platformId', game?.platform?.id || '');
      formData.set('coverImage', data?.coverImage);
      formData.set('screenshots', data?.screenshots);

      const response = await mutations.mutateAsync(formData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response && response?.data
            ? response && response?.data?.data?.message
            : 'Success Edit Games'
        );
        router.push(`/list-games`);
      }

      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ?? 'Network Error, Please Check Again!'
      );
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
}
