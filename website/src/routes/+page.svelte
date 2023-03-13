<svelte:options immutable={true} />

<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CodeSnippet from '$lib/components/code-snippet/CodeSnippet.svelte';
	import ExampleResultPanel from '$lib/components/example-result-panel/ExampleResultPanel.svelte';
	import type { PageData } from './$types.js';
	import Example from '$lib/components/examples/basic/Example.svelte';
	import PageFooterLinks from '$lib/components/layout/PageFooterLinks.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import ShellSnippet from '../lib/components/shell-snippet/ShellSnippet.svelte';
	import { base } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>Svelte Context Enhanced</title>
</svelte:head>

<Page>
	<section>
		<h1>Installation</h1>
		<ShellSnippet>npm i -D @raythurnevoid/svelte-context-enhanced</ShellSnippet>
	</section>
	<section>
		<h1>Usage</h1>
		<p>With <code>createContext</code> function you can create typed context setter and getter.</p>
		<CodeSnippet source={data.snippets['Example.svelte']} fileName="Example.svelte" />
		<CodeSnippet source={data.snippets['ExampleChild.svelte']} fileName="ExampleChild.svelte" />
		<h2>Result</h2>
		<ExampleResultPanel>
			<Example />
		</ExampleResultPanel>
	</section>
	<PageFooterLinks>
		<Button label="NEXT: TYPED KEY" href="{base}/typed-key" />
	</PageFooterLinks>
</Page>
