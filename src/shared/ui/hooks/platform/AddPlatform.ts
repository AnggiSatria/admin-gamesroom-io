import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCreatePlatform } from '@/shared/lib/helpers/client/services/platforms';
import { IRequestPostPlatform } from '@/shared/lib/helpers/client/services/interfaces/platform.interfaces';

export default function useHooksAddPlatform() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
  });

  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useCreatePlatform();

  const onSubmit = async (e: { name: string; type: string }) => {
    // Validasi atau casting ke IRequestPostPlatform
    if (e.type !== 'Download' && e.type !== 'Url') {
      toast.error('Invalid type selected');
      return;
    }

    const payload: IRequestPostPlatform = {
      name: e.name,
      type: e.type,
    };

    try {
      setLoading(true);
      const response = await mutations.mutateAsync(payload);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response?.data?.data?.message ?? 'Success Create Platform'
        );
        router.push(`/list-platforms`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? 'Network Error, Please Check Again!'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit,
    loading,
  };
}
