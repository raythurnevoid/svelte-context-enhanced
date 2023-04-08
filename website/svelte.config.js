import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter({
			precompress: true
		}),

		alias: {
			'~@fontsource': '../node_modules/@fontsource'
		},

		paths: {
			base: '/svelte-context-enhanced',
			relative: false
		}
	}
};

export default config;
