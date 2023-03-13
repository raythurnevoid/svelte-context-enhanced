<script lang="ts">
	import { getContext } from './Example.svelte';

	const value = getContext();
</script>

{$value}
