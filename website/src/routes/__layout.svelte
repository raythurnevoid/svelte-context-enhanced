<script lang="ts">
	import { Layout } from "../layout/index";
	import "../app.css";
	import { onMount } from "svelte";

	onMount(() => {
		setTimeout(() => {
			window.document.firstElementChild.classList.add("smooth-scroll");
		});
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono"
	/>
</svelte:head>

<Layout>
	<slot />
</Layout>

<!-- <slot /> -->
<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/theme/styles.scss";

	html.smooth-scroll {
		scroll-behavior: smooth;
	}
</style>
