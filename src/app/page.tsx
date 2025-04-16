import { cookies } from 'next/headers';
import Typography from '@/components/typography/Typography';
import ProductsViewsGrid from '@/components/productsViews/ProductsViewsGrid';
import ProductsViewsList from '@/components/productsViews/ProductsViewsList';
import ProductsSearchForm from '@/components/productsSearchForm/ProductsSearchForm';

const findProducts = async (page = 1, limit = 20, q = '', sortBy = '', order = ''): Promise<Api.Products> => {
  try {
    const skip = (page - 1) * limit;
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    params.set('skip', String(skip));
    if (q !== '') {
      params.set('q', String(q));
    }
    if (sortBy !== '') {
      params.set('sortBy', String(sortBy));
      params.set('order', order);
    }

    const res = await fetch(`https://dummyjson.com/products/search?${params.toString()}`, {});
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error('findProducts Failed', {
        cause: `findProducts Failed: ${res.status}/${res.statusText}/${q}`,
      });
    }
  } catch (e) {
    throw e;
  }
};

interface IndexProps {
  searchParams?: {
    q: string;
    sortBy: string;
    order: 'asc' | 'desc';
  };
}

export default async function Index({ searchParams }: IndexProps) {
  const q = searchParams?.q ?? '';
  const sortBy = searchParams?.sortBy ?? '';
  const order = searchParams?.order ?? '';

  const myCookie = await cookies();
  const targetView = myCookie.get('my-cookie');
  let products;
  try {
    products = await findProducts(1, 20, q, sortBy, order);
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
            <ProductsViewsGrid products={products} />
          )}
        </>
      )}
    </main>
  );
}
