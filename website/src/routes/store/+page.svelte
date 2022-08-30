<svelte:options immutable={true} />

<script lang="ts">
	import type { PageData } from "./$types";
	import {
		PageTitle,
		SectionTitle,
		ExampleContainer,
	} from "$lib/components/main/index";
	import { Code, FileSourceSnippet } from "$lib/components/main/Code/index";
	import { PageContent, Footer, ModulePage } from "$lib/layout/index";
	import { PageContentsNav } from "$lib/layout/PageContentNav/index";
	import { StoreExample } from "$lib/components/examples/store/index";
	import { base } from "$app/paths";

	export let data: PageData;
</script>

<ModulePage>
	<PageContent>
		<PageTitle id="usage">Context Store</PageTitle>
		<p>
			With <code>createContextStore</code> and
			<code>createContextWritableStore</code> you can can take advantage of typings
			when using Svelte's store as context value.
		</p>

		<FileSourceSnippet
			fileName="BasicExample.svelte"
			source={data.exampleSource}
		/>

		<FileSourceSnippet
			fileName="BasicExampleChild.svelte"
			source={data.exampleChildSource}
		/>

		<FileSourceSnippet
			fileName="BasicExampleContext.ts"
			source={data.exampleContextSource}
		/>

		<SectionTitle id="result">Result</SectionTitle>
		<ExampleContainer>
			<StoreExample />
		</ExampleContainer>

		<SectionTitle id="api">API</SectionTitle>
		<p>
			Both <code>createContextStore</code> and
			<code>createContextWritableStore</code> are proxies to Svelte's
			<code>readable</code>
			and <code>writable</code> stores, because of that they share the same API.
		</p>
		<p>
			<Code lang="ts" source={data.typingsSource} />
		</p>
		<Footer
			prev={{ label: "BASIC USAGE", href: `${base}/basic` }}
			next={{ label: "ADVANCED USAGE", href: `${base}/advanced` }}
		/>
	</PageContent>
	<PageContentsNav items={[["usage", "Usage"], "result", "api"]} />
</ModulePage>
