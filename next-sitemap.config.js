import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const excludedPaths = ['/cart', '/checkout', '/account/*'];

export default {
  siteUrl: process.env.BASE_URL || 'https://kwstriping.com',
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
