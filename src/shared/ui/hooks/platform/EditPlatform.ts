import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEditPlatform } from '@/shared/lib/helpers/client/services/platforms';
import { IRequestPutPlatform } from '@/shared/lib/helpers/client/services/interfaces/platform.interfaces';

export default function useHooksEditPlatform({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    id: z.string().min(1, 'ID is required'),
    name: z.string().min(1, 'Name is required'),
    type: z.string().min(1, 'Type is required'),
  });

  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      type: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useEditPlatform(id);

  const onSubmit = async (e: { name: string; type: string }) => {
    if (e.type !== 'Download' && e.type !== 'Url') {
      toast.error('Invalid platform type');
      return;
    }

    const payload: IRequestPutPlatform = {
      id: id,
      name: e.name,
      type: e.type,
    };

    try {
      setLoading(true);
      const response = await mutations.mutateAsync(payload);
      setLoading(false);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          response?.data?.data?.message ?? 'Success Updated Platform'
        );
        router.push(`/list-platforms`);
      }
    } catch (err) {
      console.log(err);
      toast.error('Update failed');
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
