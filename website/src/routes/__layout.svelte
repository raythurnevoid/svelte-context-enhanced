<script lang="ts">
	import { Layout } from "../layout";
	import "../app.css";
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
</style>
