<svelte:options immutable={true} />

<script lang="ts">
	import { MDCRipple } from '@material/ripple';
	import { onMount } from 'svelte';
	import './Button.scss';

	export let label: string;
	export let href: string | undefined = undefined;

	let buttonEl: HTMLElement;
	let buttonElTag: 'button' | 'a' = href ? 'a' : 'button';

	onMount(() => {
		const buttonRipple = new MDCRipple(buttonEl);

		return () => {
			buttonRipple.destroy();
		};
	});
</script>

<div class="Button mdc-touch-target-wrapper">
	<svelte:element
		this={buttonElTag}
		bind:this={buttonEl}
		class="mdc-button mdc-button--touch mdc-button--raised"
		{href}
	>
		<span class="mdc-button__ripple" />
		<span class="mdc-button__touch" />
		<span class="mdc-button__label">{label}</span>
	</svelte:element>
</div>
