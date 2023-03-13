import type { PageServerLoad } from './$types.js';
import exampleSvelteSrc from '$lib/components/examples/basic/Example.svelte?raw';
import exampleChildSvelteSrc from '$lib/components/examples/basic/ExampleChild.svelte?raw';
import { highlight } from '$lib/server/prism.js';

export const load: PageServerLoad = () => {
	const exampleSvelteHighlightedSrc = highlight(exampleSvelteSrc);
	const ExampleChildSvelteHighlightedSrc = highlight(exampleChildSvelteSrc);

	return {
		snippets: {
			'Example.svelte': exampleSvelteHighlightedSrc,
			'ExampleChild.svelte': ExampleChildSvelteHighlightedSrc
		}
	};
};
