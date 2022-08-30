<svelte:options immutable={true} />

<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { TopAppBar, Drawer } from ".";
	import { AppContent, Scrim } from "@smui/drawer";

	let open: boolean = false;
	let dismissible: boolean = false;

	let loaded: boolean = false;
	let dismissibleDrawerMedia: MediaQueryList;
	onMount(() => {
		dismissibleDrawerMedia = window.matchMedia("(min-width: 1280px)");
		dismissibleDrawerMedia.addEventListener("change", handleTabletMediaChange);
		handleTabletMediaChange();

		window.requestIdleCallback(() => {
			loaded = true;
		});
	});

	onDestroy(() => {
		dismissibleDrawerMedia?.removeEventListener(
			"change",
			handleTabletMediaChange
		);
	});

	function handleTabletMediaChange() {
		if (dismissibleDrawerMedia.matches) {
			dismissible = false;
		} else {
			dismissible = true;
		}
	}
</script>

<div class="Layout" class:loaded>
	<Drawer {dismissible} bind:open />
	<AppContent class="Layout__app-content">
		<TopAppBar on:navButtonClick={() => (open = true)}>
			<slot />
		</TopAppBar>
	</AppContent>
</div>

<style lang="scss">
	@use "src/styles/breakpoints.scss";

	.Layout {
		:global {
			&:not(.loaded) {
				.Drawer {
					display: none;

					@media screen and (min-width: breakpoints.$desktop-lg) {
						display: block;
					}
				}
			}

			.Layout__app-content {
				margin-left: 0;

				@media screen and (min-width: breakpoints.$desktop-lg) {
					margin-left: 256px;
				}
			}
		}
	}
</style>
