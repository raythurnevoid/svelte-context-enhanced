<svelte:options immutable={true} />

<script lang="ts">
	import './TopAppBar.scss';
	import { base } from '$app/paths';
	import GitHubLink from '../github-link/GitHubLink.svelte';
	import { MDCTopAppBar } from '@material/top-app-bar';
	import { onMount } from 'svelte';

	let el: HTMLElement;

	onMount(() => {
		const topAppBar = new MDCTopAppBar(el);

		return () => {
			topAppBar.destroy();
		};
	});
</script>

<div class="TopAppBar">
	<header bind:this={el} class=" mdc-top-app-bar mdc-top-app-bar--fixed">
		<div class="mdc-top-app-bar__row">
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
				<a class="TopAppBar__title mdc-top-app-bar__title" href="{base}/"> Svelte Typed Context </a>
			</section>
			<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
				<GitHubLink />
			</section>
		</div>
	</header>
</div>

<style lang="scss">
	.TopAppBar {
		display: contents;

		@media (prefers-color-scheme: dark) {
			:global(.mdc-top-app-bar--fixed-scrolled) {
				box-shadow: 0px 2px 4px -1px rgba(199, 0, 0, 0.4), 0px 4px 5px 0px rgba(199, 0, 0, 0.34),
					0px 1px 10px 0px rgba(199, 0, 0, 0.32);
			}
		}
	}

	.mdc-top-app-bar {
		position: sticky;
		inset-block-start: 0;
		z-index: 1;
	}

	.TopAppBar__title {
		line-height: 64px;
		margin: 0;
		text-decoration: none;
		color: inherit;
		padding-inline: 20px;

		&:focus-visible {
			outline: none;
			text-decoration: underline;
		}
	}
</style>
