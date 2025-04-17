import { cookies } from 'next/headers';
import Typography from '@/components/typography/Typography';
import ProductsViewsGrid from '@/components/productsViews/ProductsViewsGrid';
import ProductsViewsList from '@/components/productsViews/ProductsViewsList';
import ProductsSearchForm from '@/components/productsSearchForm/ProductsSearchForm';
import { api } from '@/api';

interface IndexProps {
  searchParams?: Promise<{
    q: string;
    sortBy: string;
    order: 'asc' | 'desc';
  }>;
}

export default async function Index({ searchParams }: IndexProps) {
  const params = await searchParams;
  const q = params?.q ?? '';
  const sortBy = params?.sortBy ?? '';
  const order = params?.order ?? '';

  const myCookie = await cookies();
  const targetView = myCookie.get('my-cookie');
  let products;
  try {
    products = await api.productApi.findProducts(1, 20, q, sortBy, order);
  } catch (e) {
    console.error('findProducts', e);
  }

  if (!products)
    return (
      <main className="font-[family-name:var(--font-noto-sans-kr)] h-full">
        <Typography as="h1" className="flex justify-center text-3xl items-center mt-30">
          API 요청에 실패했습니다. 잠시 후 다시 시도해주세요.
        </Typography>
      </main>
    );

  return (
    <main className="font-[family-name:var(--font-noto-sans-kr)] h-full">
      <ProductsSearchForm />
      {products.products.length === 0 && (
        <Typography as="h1" className="flex justify-center text-3xl items-center mt-30">
          일치하는 결과가 없습니다.
        </Typography>
      )}
      {products.products.length > 0 && (
        <>
          {!targetView ? (
            <ProductsViewsList products={products} q={q} sortBy={sortBy} order={order} />
          ) : targetView.value === 'list' ? (
            <ProductsViewsList products={products} q={q} sortBy={sortBy} order={order} />
          ) : (
            <ProductsViewsGrid products={products} q={q} sortBy={sortBy} order={order} />
          )}
        </>
      )}
    </main>
  );
}
