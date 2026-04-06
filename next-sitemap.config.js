/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.onlineweightlossclinic.co.uk",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500", "/api/*"],
};
