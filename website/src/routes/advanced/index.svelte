<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getFileContent } from "../../utils";

	export const load: Load = async function ({ fetch }) {
		async function getTypingsSource() {
			return await getFileContent(
				fetch,
				"node_modules/@raythurnevoid/svelte-context-enhanced/svelte-typed-context.d.ts"
			);
		}

		async function getExampleSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/advanced/AdvancedExample.svelte"
			);
		}

		async function getExampleChildSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/advanced/AdvancedExampleChild.svelte"
			);
		}

		async function getExampleContextSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/advanced/AdvancedExampleContext.ts"
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
	import { AdvancedExample } from "#src/components/examples/advanced/index";
	import { base } from "$app/paths";

	export let exampleSource: string;
	export let exampleChildSource: string;
	export let exampleContextSource: string;
	export let typingsSource: string;
</script>

<main>
	<PageContent>
		<PageTitle>Advanced Usage</PageTitle>
		<p>
			You can create your own context typings and implementations using the
			basic key interface <code>{`ContextKey<T>`}</code> and the functions
			<code>{`setContext`}</code>
			and <code>{`getContext`}</code>.
		</p>

		<FileSourceSnippet
			fileName="AdvancedExample.svelte"
			source={exampleSource}
		/>

		<FileSourceSnippet
			fileName="AdvancedExampleChild.svelte"
			source={exampleChildSource}
		/>

		<FileSourceSnippet
			fileName="AdvancedExampleContext.ts"
			source={exampleContextSource}
		/>

		<SectionTitle>Result</SectionTitle>
		<ExampleContainer>
			<AdvancedExample />
		</ExampleContainer>

		<SectionTitle>API</SectionTitle>
		<p>
			<code>createContext</code> takes no arguments but wants you to set it's generic
			type in order to type the given context setter and getter.
		</p>
		<p>
			<Code lang="ts" source={typingsSource} />
		</p>
	</PageContent>
</main>
<Footer prev={{ label: "CONTEXT STORE", href: `${base}/store` }} />
