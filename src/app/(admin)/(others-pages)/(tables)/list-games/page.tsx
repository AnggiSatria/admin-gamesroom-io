// app/(your-path)/list-games/page.tsx
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import BasicTableOne from '@/components/tables/BasicTableOne';
import PaginationWrapper from '@/components/tables/PaginationWrapper';
import axios from 'axios';
import { Metadata } from 'next';
import { headers } from 'next/headers';

type tParams = Promise<{ page: string }>;

export const metadata: Metadata = {
  title: 'List Games',
  description: 'List Games',
};

export default async function ListGames({
  searchParams,
}: {
  searchParams: tParams;
}) {
  const resolvedParams = await searchParams; // tunggu promise-nya selesai
  const page = parseInt(
    typeof resolvedParams.page === 'string' ? resolvedParams.page : '1'
  );
  const limit = 10;

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseURL = `${protocol}://${host}`;

  const res = await axios.get(
    `${baseURL}/api/v1/games?page=${page}&limit=${limit}`
  );
  const games = res.data;

  const listTH = ['title', 'description', 'genre', 'platform', 'action'];

  return (
    <div>
      <PageBreadcrumb pageTitle="List Games" />
      <div className="space-y-6">
        <ComponentCard title="Games">
          <BasicTableOne
            listTH={listTH}
            tableData={games?.data}
            selectedPages="games"
          />
          <PaginationWrapper
            currentPage={games?.currentPage}
            totalPages={games?.totalPages}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
