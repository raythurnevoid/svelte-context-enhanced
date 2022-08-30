<svelte:options immutable={true} />

<script lang="ts">
	import "#src/app.scss";
	import "#src/styles/smui/smui.css";
	import { Layout } from "$lib/layout/index";
	import { onMount } from "svelte";
	import { base } from "$app/paths";

	onMount(() => {
		setTimeout(() => {
			window.document.firstElementChild?.classList.add("smooth-scroll");
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<Layout>
	<slot />
</Layout>

<style lang="scss" global>
	html.smooth-scroll {
		scroll-behavior: smooth;
	}
</style>
