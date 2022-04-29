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
				alias: [
					{
						find: /^@svelte-material-design\/(.+)/,
						replacement: "@svelte-material-ui-test/core/packages/$1",
					},
				],
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
