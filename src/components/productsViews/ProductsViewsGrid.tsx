'use client';

import Image from 'next/image';
import Typography from '@/components/typography/Typography';
import { Star } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSearchProducts } from '@/hooks/apis/useSearchProducts';
import Spinner from '@/components/spinner/Spinner';
import NoDataToLoad from '@/components/productsViews/noDataToLoad/NoDataToLoad';

interface ProductsViewsGridProps {
  products: Api.Products;
  q: string;
  sortBy: string;
  order: '' | 'asc' | 'desc';
}

export default function ProductsViewsGrid({ products, q, sortBy, order }: ProductsViewsGridProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchProducts({
    q,
    sortBy,
    order,
    initialData: products,
  });
  const { ref } = useIntersectionObserver(() => fetchNextPage());
  const targetProducts = data.pages.flatMap((page) => {
    return page.products;
  });

  return (
    <section>
      <div className="grid grid-cols-4 gap-1 max-md:grid-cols-2">
        {targetProducts.map((product) => (
          <div key={product.id} className="flex flex-col shadow-md rounded-lg my-4 p-4 bg-white">
            <div className="flex justify-center">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                objectFit="cover"
                className="w-full max-w-[300px]"
              />
            </div>
            <div className="p-2 flex-1 min-w-[0px]">
              <Typography as="h2" className="font-semibold text-[18px] max-md:text-[16px]">
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
      </div>
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
