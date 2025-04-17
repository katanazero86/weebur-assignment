export const productApi = {
  async findProducts(page = 1, limit = 20, q = '', sortBy = '', order = ''): Promise<Api.Products> {
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
  },
};
