<svelte:options immutable={true} />

<script lang="ts">
	import { Code } from "./index";

	export let lang: Code["$$prop_def"]["lang"] = undefined;
	export let source: Code["$$prop_def"]["source"];
	export let fileName: string;

	if (!lang) {
		const inferredLang = fileName.match(/\.(\w+$)/)?.[1] as typeof lang;
		if (inferredLang === "ts" || inferredLang === "svelte") {
			lang = inferredLang;
		}
	}
</script>

<div>
	<code>{fileName}</code>
	<Code {lang} {source} />
</div>

<style>
	div {
		margin-block: 1em;
	}

	code {
		background: #2d2d2d;
		color: #fff1a3;
		padding: 0.8em 1em 0.2em;
		display: inline-block;
		font-size: 1em;
	}
</style>
