<script lang="ts">
	import { Layout } from "$lib/layout/index";
	import { onMount } from "svelte";
	import "@fontsource/roboto/300.css";
	import "@fontsource/roboto/400.css";
	import "@fontsource/material-icons";
	import "#src/app.scss";
	import "#src/styles/smui.css";

	onMount(() => {
		setTimeout(() => {
			window.document.firstElementChild?.classList.add("smooth-scroll");
		});
	});
</script>

<Layout>
	<slot />
</Layout>

<style lang="scss" global>
	html.smooth-scroll {
		scroll-behavior: smooth;
	}
</style>
