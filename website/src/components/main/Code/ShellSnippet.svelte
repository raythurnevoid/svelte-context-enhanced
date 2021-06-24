<script lang="ts">
	import Prism from "svelte-prism";
	import "prismjs/components/prism-bash.js";
	import { CodeStyles, CopyButton } from ".";

	export let source: string;

	let snippetEl: HTMLDivElement;
</script>

<div class="shell-snippet-wrapper">
	<div bind:this={snippetEl}>
		<Prism language="shell" {source} />
	</div>
	<div class="snippet-commands">
		<CopyButton el={snippetEl} />
	</div>
</div>

<CodeStyles />

<style lang="scss" global>
	@use "smui-theme.scss";
	@use "@material/icon-button/mixins.scss" as icon-button;

	:local(.shell-snippet-wrapper) {
		position: relative;
	}

	:local(.snippet-commands) {
		position: absolute;
		top: 0;
		right: 0;

		.command {
			@include icon-button.ink-color(primary);
		}
	}
</style>
