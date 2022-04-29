<svelte:options immutable={true} />

<script lang="ts">
	import IconButton, { Icon } from "@smui/icon-button";

	export let el: HTMLElement;

	function execCopy() {
		const range = document.createRange();
		range.selectNode(el);
		window.getSelection()?.removeAllRanges();
		window.getSelection()?.addRange(range);
		document.execCommand("copy");
		window.getSelection()?.removeAllRanges();
	}
</script>

<div class="copy-button-wrapper">
	<IconButton class="copy-button" on:click={execCopy}>
		<Icon class="material-icons">content_copy</Icon>
	</IconButton>
</div>

<style lang="scss">
	.copy-button-wrapper {
		position: absolute;
		top: 0.3em;
		right: 0;

		:global {
			.copy-button {
				color: #ffdfdf;
			}
		}
	}
</style>
