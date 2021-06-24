<svelte:options immutable={true} />

<script lang="ts">
	import {
		TopAppBar,
		Section,
		Title,
		NavigationIcon,
		Icon,
	} from "@svelte-material-design/core/top-app-bar";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	export let showMenuBtn: boolean = false;
</script>

<div>
	<TopAppBar class={"top-app-bar"} let:contentClass>
		<Section>
			{#if showMenuBtn}
				<NavigationIcon on:click={() => dispatch("navButtonClick")}>
					<Icon>menu</Icon>
				</NavigationIcon>
			{/if}
			<Title>Svelte Typed Context</Title>
		</Section>
		<slot slot="content" class={contentClass} />
	</TopAppBar>
</div>

<style lang="scss" global>
	@use "@material/top-app-bar/mixins.scss" as top-app-bar;
	@use "@material/elevation/index.scss" as elevation;

	:local(div) {
		.top-app-bar {
			@include elevation.elevation(4);
			@include top-app-bar.ink-color(white);
		}
	}
</style>
