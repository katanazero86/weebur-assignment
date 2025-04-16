'use client';

import { useActionState, useEffect, useState } from 'react';
import { productsSearchAction, ProductsSearchActionState } from '@/actions/productsSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/forms/button/Button';
import InputText from '@/components/forms/inputText/InputText';
import Select from '@/components/forms/select/Select';

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

  const handleQChange = (targetValue: string) => {
    setFormObj({
      ...formObj,
      q: targetValue,
    });
  };

  const handleSortByChange = (targetValue: string) => {
    setFormObj({
      ...formObj,
      sortBy: targetValue,
    });
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
      <div className="flex-grow flex items-center gap-2 max-md:mb-2">
        <div className="basis-6/12">
          <InputText name="q" placeholder="검색어를 입력해주세요." onChange={handleQChange} value={formObj.q} />
        </div>
        <div className="basis-6/12">
          <Select
            name="sortBy"
            initOptions={[
              { label: '정렬 방식 선택', value: '', disabled: true },
              { label: '별점 높은순', value: 'rating' },
              { label: '후기 많은순', value: 'reviews' },
            ]}
            onChange={handleSortByChange}
            value={formObj.sortBy}
          />
        </div>
      </div>
      <div className="basis-2/12 max-md:basis-12/12">
        <Button type="submit" disabled={isPending}>
          검색
        </Button>
      </div>
    </form>
  );
}
