import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-netlify";

const config = {
  kit: {
    // currently the adapter does not take any options
    adapter: adapter(),

    target: "#svelte",

    prerender: {
      crawl: true,
      enabled: true,
      onError: "continue",
      entries: ["*"],
    },

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/variables.scss" as *;',
          },
        },
      },
    },
  },
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [
    mdsvex(mdsvexConfig),
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    }),
  ],
};

export default config;
