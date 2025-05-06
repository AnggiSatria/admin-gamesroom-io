import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCreateGame } from '@/shared/lib/helpers/client/services/games';
import { useRouter } from 'next/navigation';

export default function useHooksCreateGame() {
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
      title: '',
      description: '',
      gameUrl: '',
      genreId: '',
      platformId: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useCreateGame();

  const onSubmit = async (data: TEditGameForm) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.set('title', data?.title);
      formData.set('description', data?.description);
      formData.set('gameUrl', data?.gameUrl);
      formData.set('genreId', data?.genreId || '');
      formData.set('platformId', data?.platformId || '');
      formData.set('coverImage', data?.coverImage);
      formData.set('screenshots', data?.screenshots);

      const response = await mutations.mutateAsync(formData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response && response?.data
            ? response && response?.data?.data?.message
            : 'Success Create Games'
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
