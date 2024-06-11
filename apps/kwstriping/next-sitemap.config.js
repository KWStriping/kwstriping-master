const excludedPaths = ['/cart', '/checkout', '/account/*'];

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  exclude: excludedPaths + ['/sitemap.xml'],
  output: 'standalone',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: excludedPaths,
      },
    ],
  },
};
