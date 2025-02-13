'use client';

import { ProductCollection } from '@tempo/ui/components/products/ProductCollection';
import { useQueryState } from 'next-usequerystate';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import Layout from '@kwstriping/app/client/Layout';
import * as m from '@paraglide/messages';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useQueryState('q');
  const [debouncedFilter, setDebouncedFilter] = useState({});

  useDebounce(
    () => {
      if (searchQuery) {
        setDebouncedFilter({ search: searchQuery });
      } else {
        setDebouncedFilter({});
      }
    },
    1000,
    [searchQuery]
  );

  return (
    <Layout>
      <main className="container w-full px-8 mt-5">
        <p className="font-semibold text-xl mb-5">{m.search_searchHeader() ?? 'Search'}</p>
        <input
          className="w-full md:w-96 mb-10 block border-gray-300 rounded-md shadow-sm text-md"
          type="text"
          value={searchQuery || ''}
          placeholder={'What are you looking for?'}
          onChange={(e) => setSearchQuery(e.target.value, { scroll: false, shallow: true })}
          data-testid="searchInput"
        />
        <ProductCollection filter={debouncedFilter} />
      </main>
    </Layout>
  );
}

export default SearchPage;
