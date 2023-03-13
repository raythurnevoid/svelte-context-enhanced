import type { PageServerLoad } from './$types.js';
import typedKeyExampleSvelteSrc from '$lib/components/examples/typed-key/TypedKeyExample.svelte?raw';
import typedKeyExampleChildSvelteSrc from '$lib/components/examples/typed-key/TypedKeyExampleChild.svelte?raw';
import { highlight } from '$lib/server/prism.js';

export const load: PageServerLoad = () => {
	const typedKeyExampleSvelteHighlightedSrc = highlight(typedKeyExampleSvelteSrc);
	const typedKeyExampleChildSvelteHighlightedSrc = highlight(typedKeyExampleChildSvelteSrc);

	return {
		snippets: {
			'TypedKeyExample.svelte': typedKeyExampleSvelteHighlightedSrc,
			'TypedKeyExampleChild.svelte': typedKeyExampleChildSvelteHighlightedSrc
		}
	};
};
