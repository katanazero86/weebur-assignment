import { cookies } from 'next/headers';
import Typography from '@/components/typography/Typography';
import ProductsViewsGrid from '@/components/productsViews/ProductsViewsGrid';
import ProductsViewsList from '@/components/productsViews/ProductsViewsList';

const findProducts = async (page = 1, limit = 20): Promise<Api.Products> => {
  try {
    const skip = (page - 1) * limit;
    const q = `limit=${limit}&skip=${skip}`;
    const res = await fetch(`https://dummyjson.com/products?${q}`);
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

export default async function Index() {
  const myCookie = await cookies();
  const targetView = myCookie.get('my-cookie');
  let products;
  try {
    products = await findProducts();
  } catch (e) {
    console.error('findProducts', e);
  }

  if (!products)
    return (
      <main className="font-[family-name:var(--font-noto-sans-kr)] h-full">
        <Typography as="h1" className="flex justify-around text-3xl items-center h-full">
          API 요청에 실패했습니다. 잠시 후 다시 시도해주세요.
        </Typography>
      </main>
    );

  return (
    <main className="font-[family-name:var(--font-noto-sans-kr)]">
      {!targetView ? (
        <ProductsViewsList products={products} />
      ) : targetView.value === 'list' ? (
        <ProductsViewsList products={products} />
      ) : (
        <ProductsViewsGrid products={products} />
      )}
    </main>
  );
}
