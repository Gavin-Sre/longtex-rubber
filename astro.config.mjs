// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Base path: use BASE_PATH when set (e.g. in GitHub Actions for Pages), otherwise "/" for local dev
const base = process.env.BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
  site: "https://gavin-sre.github.io/longtex-rubber",
  base,
  trailingSlash: "always",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "th", "zh"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  // Any URL without a locale prefix falls back to the English version.
  redirects: {
    "/": "/en/",
    "/about/": "/en/about/",
    "/products/": "/en/products/",
    "/reference/": "/en/reference/",
  },

  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          th: "th",
          zh: "zh-CN",
        },
      },
      filter: (page) => !/\/longtex-rubber\/?$|gavin-sre\.github\.io\/?$/.test(page),
      serialize(item) {
        if (/\/(en|th|zh)\/?$/.test(item.url)) item.priority = 1.0;
        if (item.url.includes("/products")) item.priority = 0.9;
        if (item.url.includes("/reference")) item.priority = 0.8;
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
