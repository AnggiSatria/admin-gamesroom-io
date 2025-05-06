import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { IRequestPostGenre } from '@/shared/lib/helpers/client/services/interfaces/genre.interfaces';
import { useCreateGenre } from '@/shared/lib/helpers/client/services/genre';
import { useRouter } from 'next/navigation';

export default function useHooksAddGenre() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useCreateGenre();

  const onSubmit = async (e: IRequestPostGenre) => {
    try {
      setLoading(true);

      const response = await mutations.mutateAsync(e);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response && response?.data
            ? response && response?.data?.data?.message
            : 'Success Create Genre'
        );
        router.push(`/list-genre`);
      }
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);

      toast.error(
        error && error?.response
          ? error && error?.response?.data?.message
          : 'Network Error, Please Check Again!'
      );
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
}
