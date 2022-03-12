/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
