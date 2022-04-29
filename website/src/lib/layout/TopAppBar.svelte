<svelte:options immutable={true} />

<script lang="ts">
	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
	} from "@smui/top-app-bar";
	import type { TopAppBarComponentDev } from "@smui/top-app-bar";
	import { Div } from "@smui/common/elements";

	import IconButton from "@smui/icon-button";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let showMenuBtn: boolean = false;

	let topAppBar: TopAppBarComponentDev;
</script>

<div class="TopAppBar">
	<TopAppBar bind:this={topAppBar} variant="standard">
		<Row>
			<Section>
				{#if showMenuBtn}
					<IconButton
						class="material-icons"
						on:click={() => dispatch("navButtonClick")}>menu</IconButton
					>
				{/if}
				<Title>Svelte Typed Context</Title>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar} component={Div}>
		<slot />
	</AutoAdjust>
</div>

<style lang="scss">
	@use "@material/top-app-bar/mixins.scss" as top-app-bar;
	@use "@material/elevation/index.scss" as elevation;

	.TopAppBar {
		:global {
			.mdc-top-app-bar {
				@include elevation.elevation(4);
				@include top-app-bar.ink-color(white);
			}
		}
	}
</style>
