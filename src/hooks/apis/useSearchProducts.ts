import { useInfiniteQuery } from '@tanstack/react-query';

const findProducts = async ({
  page = 1,
  limit = 20,
  q = '',
  sortBy = '',
  order = '',
}: {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  order?: string;
}): Promise<Api.Products> => {
  const skip = (page - 1) * limit;
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('skip', String(skip));
  if (q) params.set('q', q);
  if (sortBy) {
    params.set('sortBy', sortBy);
    params.set('order', order);
  }

  const res = await fetch(`https://dummyjson.com/products/search?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

  return res.json();
};

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
      return findProducts({ page: pageParam, q, sortBy, order });
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
