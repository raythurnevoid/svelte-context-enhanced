<script lang="ts">
	import { IconButton, Icon } from "@svelte-material-ui-test/core/icon-button";

	export let el: HTMLElement;

	function execCopy() {
		const range = document.createRange();
		range.selectNode(el);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
		document.execCommand("copy");
		window.getSelection().removeAllRanges();
	}
</script>

<div class="copy-button-wrapper">
	<IconButton class="copy-button" on:click={execCopy}>
		<Icon>content_copy</Icon>
	</IconButton>
</div>

<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/icon-button/mixins.scss" as icon-button;

	:local(.copy-button-wrapper) {
		position: absolute;
		top: 0.3em;
		right: 0;

		.copy-button {
			color: #ffdfdf;
		}
	}
</style>
