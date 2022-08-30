import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import { env } from "node:process";

const isProduction = env.NODE_ENV === "production";

const base = isProduction ? "/svelte-context-enhanced" : "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter(),

		alias: {
			"#src": "src",
		},

		prerender: {
			default: true,
		},

		paths: {
			base,
		},
	},
};

export default config;
