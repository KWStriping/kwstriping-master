'use client';

import { RichText } from '@tempo/ui/components/inputs/RichText';
import type { PageFragment } from '@tempo/api/generated/graphql';
import NotFound from '@kwstriping/components/NotFound';

export interface pathParams {
  channel: string;
  locale: string;
  slug: string;
}

function PagePage({ page }: { page: PageFragment }) {
  console.log('>>>PAGE>>>', page);
  if (!page?.id) return <NotFound />;

  const content = page.content;

  return (
    <main className="container pt-8 px-8">
      {content && <RichText jsonStringData={content} />}
    </main>
  );
}

export default PagePage;
