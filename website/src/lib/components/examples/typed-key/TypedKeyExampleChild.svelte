<script lang="ts">
	import { getContext } from '@raythurnevoid/svelte-context-enhanced';
	import { contextKey } from './TypedKeyExample.svelte';

	const value = getContext(contextKey); // inferred type is string
</script>

{value}
