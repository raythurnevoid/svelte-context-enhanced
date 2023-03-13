<script lang="ts" context="module">
	import { createContext } from '@raythurnevoid/svelte-context-enhanced';
	import type { Writable } from 'svelte/store';

	export const [setContext, getContext] = createContext<Writable<string>>();
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import Child from './ExampleChild.svelte';

	setContext(writable('value'));
</script>

<Child />
