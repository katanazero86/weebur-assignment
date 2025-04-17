import { productApi } from '@/api/product';

const api = {
  productApi: productApi,
} as const;

export { api };
