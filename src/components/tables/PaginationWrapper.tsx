// components/tables/PaginationWrapper.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from './Pagination';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationWrapper({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
}
