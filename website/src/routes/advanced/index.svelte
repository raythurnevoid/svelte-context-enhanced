<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async function ({ fetch }) {
		async function getTypingsSource() {
			const res = await fetch(
				`/api/get-file-content?path=node_modules/@raythurnevoid/svelte-context-enhanced/svelte-typed-context.d.ts`
			);

			return await res.text();
		}

		async function getExampleSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/advanced/AdvancedExample.svelte`
			);

			return await res.text();
		}

		async function getExampleChildSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/advanced/AdvancedExampleChild.svelte`
			);

			return await res.text();
		}

		async function getExampleContextSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/advanced/AdvancedExampleContext.ts`
			);

			return await res.text();
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
