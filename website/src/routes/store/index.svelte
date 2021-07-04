<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getFileContent } from "../../utils";

	export const load: Load = async function ({ fetch }) {
		async function getTypingsSource() {
			return await getFileContent(
				fetch,
				"node_modules/@raythurnevoid/svelte-context-enhanced/store.d.ts"
			);
		}

		async function getExampleSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/store/StoreExample.svelte"
			);
		}

		async function getExampleChildSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/store/StoreExampleChild.svelte"
			);
		}

		async function getExampleContextSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/store/StoreExampleContext.ts"
			);
		}

		return {
			props: {
				typingsSource: await getTypingsSource(),
				exampleSource: await getExampleSource(),
				exampleChildSource: await getExampleChildSource(),
				exampleContextSource: await getExampleContextSource(),
			},
		};
	};
</script>

<script lang="ts">
	import {
		PageTitle,
		SectionTitle,
		ExampleContainer,
	} from "#src/components/main/index";
	import { Code, FileSourceSnippet } from "#src/components/main/Code/index";
	import { PageContent, Footer } from "#src/layout/index";
	import { StoreExample } from "#src/components/examples/store/index";
	import { base } from "$app/paths";

	export let exampleSource: string;
	export let exampleChildSource: string;
	export let exampleContextSource: string;
	export let typingsSource: string;
</script>

<main>
	<PageContent>
		<PageTitle>Context Store</PageTitle>
		<p>
			With <code>createContextStore</code> and
			<code>createContextWritableStore</code> you can can take advantage of typings
			when using Svelte's store as context value.
		</p>

		<FileSourceSnippet fileName="BasicExample.svelte" source={exampleSource} />

		<FileSourceSnippet
			fileName="BasicExampleChild.svelte"
			source={exampleChildSource}
		/>

		<FileSourceSnippet
			fileName="BasicExampleContext.ts"
			source={exampleContextSource}
		/>

		<SectionTitle>Result</SectionTitle>
		<ExampleContainer>
			<StoreExample />
		</ExampleContainer>

		<SectionTitle>API</SectionTitle>
		<p>
			Both <code>createContextStore</code> and
			<code>createContextWritableStore</code> are proxies to Svelte's
			<code>readable</code>
			and <code>writable</code> stores, because of that they share the same API.
		</p>
		<p>
			<Code lang="ts" source={typingsSource} />
		</p>
	</PageContent>
</main>
<Footer
	prev={{ label: "BASIC USAGE", href: `${base}basic` }}
	next={{ label: "ADVANCED USAGE", href: `${base}/advanced` }}
/>
