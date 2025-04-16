'use client';

import { useActionState, useEffect, useState } from 'react';
import { productsSearchAction, ProductsSearchActionState } from '@/actions/productsSearch';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductsSearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const sortBy = searchParams.get('sortBy') ?? '';

  const router = useRouter();

  const initialState: ProductsSearchActionState = {
    q,
    sortBy,
  };
  const [state, formAction, isPending] = useActionState(productsSearchAction, initialState);

  const [formObj, setFormObj] = useState(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormObj({ ...formObj, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFormObj({
      q: state.q,
      sortBy: state.sortBy,
    });
  }, [state.q, state.sortBy]);

  useEffect(() => {
    if (state.redirectUrl) {
      router.push(state.redirectUrl);
      delete state.redirectUrl;
    }
  }, [router, state.redirectUrl]);

  return (
    <form className="flex flex-wrap gap-1 border-b border-gray-200 p-4" action={formAction}>
      <div className="flex-grow flex items-center gap-2 mb-2">
        <input
          className="flex-1 w-full p-3 outline-none rounded border border-gray-300 h-[50px]"
          type="text"
          name="q"
          placeholder="검색어를 입력해주세요."
          autoFocus={true}
          onChange={handleChange}
          value={formObj.q}
        />
        <select
          className="flex-1 p-3 border border-gray-200 h-[50px] outline-none cursor-pointer"
          name="sortBy"
          onChange={handleChange}
          value={formObj.sortBy}
        >
          <option disabled value="">
            정렬 방식 선택
          </option>
          <option value="rating">별점 높은순</option>
          <option value="reviews">후기 많은순</option>
        </select>
      </div>
      <button
        disabled={isPending}
        className="border-indigo-600 border bg-indigo-600 rounded text-white px-4 py-2 cursor-pointer hover:bg-indigo-700 hover:border-indigo-700 h-[50px] w-[100px] max-md:w-full"
        type="submit"
      >
        검색
      </button>
    </form>
  );
}
