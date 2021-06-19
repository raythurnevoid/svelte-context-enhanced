import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			includePaths: [
				resolve("src"),
				resolve("node_modules"),
				resolve("src/styles"),
			],
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
		vite: {
			plugins: [tsconfigPaths(), viteCommonjs()],
			server: {
				force: true,
			},
			ssr: {
				noExternal: [
					"@raythurnevoid/svelte-hooks",
					"@raythurnevoid/svelte-group-components",
					"@svelte-material-ui-test/core",
				],
			},
		},
	},
};

export default config;
