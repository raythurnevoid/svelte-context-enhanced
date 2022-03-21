<script lang="ts">
	import Prism from "svelte-prism";
	import "prismjs/components/prism-typescript.js";
	import "prismjs/components/prism-bash.js";
	import { CodeStyles, CopyButton } from ".";

	export let source: string;
	export let lang: "svelte" | "ts" | "shell" = "svelte";

	let codeEl: HTMLDivElement;
</script>

<div class="shell-snippet-wrapper">
	<div bind:this={codeEl}>
		<Prism language={lang} {source} />
	</div>
	<div class="code-commands">
		<CopyButton el={codeEl} />
	</div>
</div>

<CodeStyles />

<style lang="scss">
	.shell-snippet-wrapper {
		position: relative;
	}

	.code-commands {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
