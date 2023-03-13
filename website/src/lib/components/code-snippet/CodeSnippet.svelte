<svelte:options immutable={true} />

<script lang="ts">
	import Code from './Code.svelte';

	export let source: Code['$$prop_def']['source'];
	export let fileName: string;
</script>

<div class="CodeSnippet">
	<code class="CodeSnippet__filename">{fileName}</code>
	<Code {source} />
</div>

<style>
	.CodeSnippet {
		margin-block: 1em;
	}

	.CodeSnippet__filename {
		background: var(--color--code-snippet-background);
		color: #fff1a3;
		padding: 0.8em 1em 0.2em;
		display: inline-block;
		font-size: 1em;
		border-radius: 8px 8px 0 0;
	}
</style>
