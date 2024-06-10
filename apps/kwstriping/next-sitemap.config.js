const excludedPaths = ['/cart', '/checkout', '/account/*'];

module.exports = {
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
