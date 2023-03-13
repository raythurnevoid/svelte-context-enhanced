<svelte:options immutable={true} />

<script lang="ts">
	import '../app.scss';
	import TopAppBar from '$lib/components/layout/top-app-bar/TopAppBar.svelte';
	import Snackbars from '$lib/components/snackbars/Snackbars.svelte';
	import type { LayoutData } from './$types.js';

	export let data: LayoutData;
</script>

<svelte:head>
	<meta name="description" content={data.meta.description} />
	<meta name="keywords" content={data.meta.keywords.join(', ')} />
</svelte:head>

<TopAppBar />
<slot />
<Snackbars />
