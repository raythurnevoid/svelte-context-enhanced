<script lang="ts" context="module">
	import type { ContextKey } from '@raythurnevoid/svelte-context-enhanced';

	export const contextKey: ContextKey<string> = {};
</script>

<script lang="ts">
	import AdvancedExampleChild from './TypedKeyExampleChild.svelte';
	import { setContext } from '@raythurnevoid/svelte-context-enhanced';

	setContext(contextKey, 'value with typed key');
	// setContext(contextKey, 123); // This will fail type checking
</script>

<AdvancedExampleChild />
