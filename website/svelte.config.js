import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { fileURLToPath } from "node:url";
import { env } from "node:process";

function isProduction() {
	return env.NODE_ENV === "production";
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const scssIncludePaths = [
	resolve(__dirname),
	resolve(__dirname, "src"),
	resolve(__dirname, "node_modules"),
	resolve(__dirname, "src/styles"),
];

const base = isProduction() ? "/svelte-context-enhanced" : "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;',
				includePaths: scssIncludePaths,
			},

			postcss: true,
		}),
	],
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ["PATCH", "DELETE"],
		},

		paths: {
			base,
		},

		prerender: {
			default: true,
		},

		vite: {
			plugins: [tsconfigPaths(), viteCommonjs()],

			server: {
				force: true,
			},

			optimizeDeps: {
				exclude: ["svelte", "svelte/internal", "svelte/store"],
			},

			resolve: {
				alias: [{ find: /^#src\/(.+)$/, replacement: "/src/$1" }],
			},

			ssr: {
				noExternal: [
					"@raythurnevoid/svelte-context-enhanced",
					"@raythurnevoid/svelte-group-components",
					"@raythurnevoid/svelte-hooks",
					"@svelte-material-ui-test/core",
					"svelte-prism",
				],
			},

			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "src/variables.scss" as *;',
					},
				},
			},

			inlineStyleThreshold: 1024,
		},
	},
};

export default config;
