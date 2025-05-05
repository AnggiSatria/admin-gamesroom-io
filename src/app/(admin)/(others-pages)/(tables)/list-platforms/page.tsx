// app/(your-path)/list-games/page.tsx
import ComponentCard from '@/components/common/ComponentCard';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import BasicTableOne from '@/components/tables/BasicTableOne';
import axios from 'axios';
import { Metadata } from 'next';
import { headers } from 'next/headers';

type tParams = Promise<{ page: string }>;

export const metadata: Metadata = {
  title: 'List Platforms',
  description: 'List Platforms',
};

export default async function ListPlatforms({
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
    `${baseURL}/api/v1/platforms?page=${page}&limit=${limit}`
  );
  const platform = res.data;

  const listTH = ['id', 'name', 'action'];

  return (
    <div>
      <PageBreadcrumb pageTitle="List Platforms" />
      <div className="space-y-6">
        <ComponentCard title="Platforms">
          <BasicTableOne
            listTH={listTH}
            tableData={platform}
            selectedPages="platforms"
          />
        </ComponentCard>
      </div>
    </div>
  );
}
