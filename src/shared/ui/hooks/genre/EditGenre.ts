import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { IRequestPutGenre } from '@/shared/lib/helpers/client/services/interfaces/genre.interfaces';
import { useEditGenre } from '@/shared/lib/helpers/client/services/genre';
import { useRouter } from 'next/navigation';

export default function useHooksEditGenre({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(1, 'Name is required'),
  });

  const form = useForm({
    defaultValues: {
      id: id,
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useEditGenre(id);

  const onSubmit = async (e: IRequestPutGenre) => {
    try {
      setLoading(true);

      const response = await mutations.mutateAsync(e);

      if (response?.status === 200) {
        toast.success(
          response && response?.data
            ? response && response?.data?.data?.message
            : 'Success Edit Genre'
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
