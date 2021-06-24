<script lang="ts">
	import Prism from "svelte-prism";
	import "prismjs/components/prism-typescript.js";
	import { CodeStyles } from ".";

	export let source: string;
	export let lang: "svelte" | "ts" = "svelte";
</script>

<Prism language={lang} {source} />

<CodeStyles />
