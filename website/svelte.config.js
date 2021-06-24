import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import { fileURLToPath } from "url";
import { env } from "process";

function isProduction() {
	return env.NODE_ENV === "production";
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const scssIncludePaths = [
	resolve(__dirname, "src"),
	resolve(__dirname, "node_modules"),
	resolve(__dirname, "src/styles"),
];

const base = isProduction() ? "/svelte-context-enhanced" : "";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: scssIncludePaths,
		},
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		adapter: adapter({
			// default options are shown
			pages: "build",
			assets: "build",
			fallback: null,
		}),
		ssr: isProduction(),
		paths: {
			base,
		},
		router: !isProduction(),
		vite: {
			base,
			plugins: [tsconfigPaths(), viteCommonjs()],
			server: {
				force: true,
			},
			optimizeDeps: {
				exclude: [
					"/node_modules/svelte/index.mjs",
					"/node_modules/svelte/internal/index.mjs",
					"/node_modules/svelte/store/index.mjs",
				],
			},
			resolve: {
				alias: [{ find: /^#src\/(.+)/, replacement: "src/$1" }],
				// alias: [{ find: /^#src\/(.+)\.js$/, replacement: "src/$1" }], breaks vite
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
		},
	},
};

export default config;
