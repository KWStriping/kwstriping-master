const excludedPaths = ['/cart', '/checkout', '/account/*'];

export default {
  siteUrl: process.env.BASE_URL,
  generateRobotsTxt: true,
  exclude: excludedPaths + ['/sitemap.xml'],
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
