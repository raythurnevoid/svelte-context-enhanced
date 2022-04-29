<svelte:options immutable={true} />

<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { TopAppBar, Drawer } from ".";
	import { AppContent, Scrim } from "@smui/drawer";

	let open: boolean = false;
	let dismissible: boolean = false;

	let loaded: boolean = false;
	let tabletMedia: MediaQueryList;
	onMount(() => {
		tabletMedia = window.matchMedia("(max-width: 960px)");
		tabletMedia.addEventListener("change", handleTabletMediaChange);
		handleTabletMediaChange();

		window.requestIdleCallback(() => {
			loaded = true;
		});
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

<div class="Layout" class:loaded>
	<Drawer {dismissible} bind:open />
	{#if dismissible}<Scrim />{/if}
	<AppContent class="Layout__app-content">
		<TopAppBar on:navButtonClick={() => (open = true)}>
			<slot />
		</TopAppBar>
	</AppContent>
</div>

<style lang="scss">
	.Layout {
		:global {
			&:not(.loaded) {
				.Drawer {
					@media screen and (max-width: 960px) {
						display: none;
					}
				}

				.Layout__app-content {
					@media screen and (max-width: 960px) {
						margin-left: 0 !important;
					}
				}
			}

			.Layout__app-content {
				@media screen and (min-width: #{960px + 1}) {
					margin-left: 256px;
				}
			}
		}
	}
</style>
