const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "account": {
    "orders": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/account/orders/[id]' as const, query: { id }, hash: url?.hash, path: `/account/orders/${id}${buildSuffix(url)}` })
      }),
      $url: (url?: { hash?: string }) => ({ pathname: '/account/orders' as const, hash: url?.hash, path: `/account/orders${buildSuffix(url)}` })
    },
  },
  "auth": {
    "signin": {
      $url: (url?: { hash?: string }) => ({ pathname: '/auth/signin' as const, hash: url?.hash, path: `/auth/signin${buildSuffix(url)}` })
    }
  },
  "cart": {
    $url: (url?: { hash?: string }) => ({ pathname: '/cart' as const, hash: url?.hash, path: `/cart${buildSuffix(url)}` })
  },
  "catalog": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/catalog/[slug]' as const, query: { slug }, hash: url?.hash, path: `/catalog/${slug}${buildSuffix(url)}` })
    })
  },
  "checkout": {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/checkout/[id]' as const, query: { id }, hash: url?.hash, path: `/checkout/${id}${buildSuffix(url)}` })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/checkout' as const, hash: url?.hash, path: `/checkout${buildSuffix(url)}` })
  },
  "collection": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/collection/[slug]' as const, query: { slug }, hash: url?.hash, path: `/collection/${slug}${buildSuffix(url)}` })
    })
  },
  "contact": {
    $url: (url?: { hash?: string }) => ({ pathname: '/contact' as const, hash: url?.hash, path: `/contact${buildSuffix(url)}` })
  },
  "gallery": {
    $url: (url?: { hash?: string }) => ({ pathname: '/gallery' as const, hash: url?.hash, path: `/gallery${buildSuffix(url)}` })
  },
  "order": {
    $url: (url?: { hash?: string }) => ({ pathname: '/order' as const, hash: url?.hash, path: `/order${buildSuffix(url)}` })
  },
  "pages": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/pages/[slug]' as const, query: { slug }, hash: url?.hash, path: `/pages/${slug}${buildSuffix(url)}` })
    })
  },
  "privacy": {
    $url: (url?: { hash?: string }) => ({ pathname: '/privacy' as const, hash: url?.hash, path: `/privacy${buildSuffix(url)}` })
  },
  "products": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/products/[slug]' as const, query: { slug }, hash: url?.hash, path: `/products/${slug}${buildSuffix(url)}` })
    })
  },
  "search": {
    $url: (url?: { hash?: string }) => ({ pathname: '/search' as const, hash: url?.hash, path: `/search${buildSuffix(url)}` })
  },
  "terms": {
    $url: (url?: { hash?: string }) => ({ pathname: '/terms' as const, hash: url?.hash, path: `/terms${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;
