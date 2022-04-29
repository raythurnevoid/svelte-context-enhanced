<svelte:options immutable={true} />

<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { TopAppBar, Drawer } from ".";
	import { AppContent, Scrim } from "@smui/drawer";

	let open: boolean = true;
	let dismissible: boolean = false;

	let tabletMedia: MediaQueryList;
	onMount(() => {
		tabletMedia = window.matchMedia("(max-width: 960px)");
		tabletMedia.addEventListener("change", handleTabletMediaChange);
		handleTabletMediaChange();
	});

	onDestroy(() => {
		tabletMedia?.removeEventListener("change", handleTabletMediaChange);
	});

	function handleTabletMediaChange() {
		if (tabletMedia.matches) {
			dismissible = true;
		} else {
			dismissible = false;
		}
	}
</script>

<div class="Layout">
	<Drawer {dismissible} bind:open />
	{#if dismissible}<Scrim />{/if}
	<AppContent class="Layout__app-content">
		<TopAppBar
			showMenuBtn={dismissible}
			on:navButtonClick={() => (open = true)}
		>
			<slot />
		</TopAppBar>
	</AppContent>
</div>
