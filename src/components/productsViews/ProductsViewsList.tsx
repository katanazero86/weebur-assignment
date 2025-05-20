'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import Typography from '@/components/typography/Typography';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSearchProducts } from '@/hooks/apis/useSearchProducts';
import Spinner from '@/components/spinner/Spinner';
import NoDataToLoad from '@/components/productsViews/noDataToLoad/NoDataToLoad';

interface ProductsViewsListProps {
  products: Api.Products;
  q: string;
  sortBy: string;
  order: '' | 'asc' | 'desc';
}

export default function ProductsViewsList({ products, q, sortBy, order }: ProductsViewsListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, isError } = useSearchProducts({
    q,
    sortBy,
    order,
    initialData: products,
  });
  const { ref } = useIntersectionObserver<HTMLDivElement>(() => fetchNextPage());
  const targetProducts = data.pages.flatMap((page) => {
    return page.products;
  });

  if (isError) {
    console.error(error);
    return <Typography>에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.</Typography>;
  }

  return (
    <section>
      {targetProducts.map((product) => (
        <div key={product.id} className="flex shadow-md rounded-lg my-4 p-4 bg-white">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={300}
            height={300}
            className="w-full max-w-[300px] max-md:max-w-[150px] object-cover"
          />
          <div className="p-2 flex-1 min-w-[0px]">
            <Typography as="h2" className="font-semibold text-[18px]">
              [상품명] {product.title}
            </Typography>
            <Typography as="p" className="tracking-tighter border-l-3 border-gray-300 pl-3 py-1 mt-2 max-md:truncate">
              {product.description}
            </Typography>
            <div className="flex items-center gap-1 mt-2">
              <Star fill="#f0c848" strokeWidth={0} size={20} />{' '}
              <Typography as="p" className="text-gray-500 text-sm">
                {product.rating.toFixed(1)} / 5.0
              </Typography>
            </div>
            <Typography as="p" className="text-gray-500 text-sm mt-2">
              후기: {product.reviews.length}
            </Typography>
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
        </div>
      )}
      {!isFetchingNextPage && hasNextPage && <div ref={ref} className="h-[50px] w-full"></div>}
      {!hasNextPage && <NoDataToLoad />}
    </section>
  );
}
