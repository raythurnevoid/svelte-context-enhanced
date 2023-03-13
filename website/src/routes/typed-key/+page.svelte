<svelte:options immutable={true} />

<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import CodeSnippet from '$lib/components/code-snippet/CodeSnippet.svelte';
	import ExampleResultPanel from '$lib/components/example-result-panel/ExampleResultPanel.svelte';
	import type { PageData } from './$types.js';
	import TypedKeyExample from '$lib/components/examples/typed-key/TypedKeyExample.svelte';
	import PageFooterLinks from '$lib/components/layout/PageFooterLinks.svelte';
	import Page from '$lib/components/layout/Page.svelte';
	import { base } from '$app/paths';

	export let data: PageData;
</script>

<svelte:head>
	<title>Svelte Context Enhanced | Typed Key</title>
</svelte:head>

<Page>
	<h1>Typed Key</h1>
	<p>
		With the typed <code>ContextKey</code> you can keep the default svelte's API while keeping type checking
	</p>
	<h2>Usage</h2>
	<p>
		Use <code>ContextKey</code> with the <code>setContext</code> and <code>getContext</code>
		methods provided by <code>svelte-context-enhanced</code>.
	</p>
	<CodeSnippet source={data.snippets['TypedKeyExample.svelte']} fileName="TypedKeyExample.svelte" />
	<CodeSnippet
		source={data.snippets['TypedKeyExampleChild.svelte']}
		fileName="TypedKeyExampleChild.svelte"
	/>
	<h2>Result</h2>
	<ExampleResultPanel>
		<TypedKeyExample />
	</ExampleResultPanel>
	<PageFooterLinks>
		<Button label="MAIN PAGE" href="{base}/" />
	</PageFooterLinks>
</Page>
