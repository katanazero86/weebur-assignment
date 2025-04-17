import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/api';

export const useSearchProducts = ({
  q,
  sortBy,
  order,
  initialData,
}: {
  q: string;
  sortBy: string;
  order: string;
  initialData: Api.Products;
}) => {
  return useInfiniteQuery({
    queryKey: ['searchProducts', q, sortBy, order],
    queryFn: async ({ pageParam = 1 }) => {
      return api.productApi.findProducts(pageParam, 20, q, sortBy, order);
    },
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total;
      const loaded = allPages.reduce((sum, page) => sum + page.products.length, 0);
      return loaded < total ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
