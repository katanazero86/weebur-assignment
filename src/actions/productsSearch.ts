'use server';

export interface ProductsSearchActionState {
  q: string;
  sortBy: string;
  redirectUrl?: string;
}

export const productsSearchAction = async (prevState: ProductsSearchActionState, formData: FormData) => {
  const q = formData.get('q') ?? '';
  const sortBy = formData.get('sortBy') ?? '';

  const params = new URLSearchParams();
  if (q !== '') {
    params.set('q', String(q));
  }
  if (sortBy !== '') {
    params.set('sortBy', String(sortBy));
    params.set('order', 'desc');
  }

  return {
    q: String(q),
    sortBy: String(sortBy),
    redirectUrl: `/?${params.toString()}`,
  };
};
