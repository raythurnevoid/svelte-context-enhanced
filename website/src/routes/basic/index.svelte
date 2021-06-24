<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async function ({ fetch }) {
		async function getTypingsSource() {
			const res = await fetch(
				`/api/get-file-content?path=node_modules/@raythurnevoid/svelte-context-enhanced/basic.d.ts`
			);

			return await res.text();
		}

		async function getExampleSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/basic/BasicExample.svelte`
			);

			return await res.text();
		}

		async function getExampleChildSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/basic/BasicExampleChild.svelte`
			);

			return await res.text();
		}

		async function getExampleContextSource() {
			const res = await fetch(
				`/api/get-file-content?path=src/components/examples/basic/BasicExampleContext.ts`
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
	import { BasicExample } from "#src/components/examples/basic/index";
	import { base } from "$app/paths";

	export let exampleSource: string;
	export let exampleChildSource: string;
	export let exampleContextSource: string;
	export let typingsSource: string;
</script>

<main>
	<PageContent>
		<PageTitle>Basic Usage</PageTitle>
		<p>
			With <code>createContext</code> function you can create typed context setter
			and getter.
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
			<BasicExample />
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
<Footer
	prev={{ label: "MAIN PAGE", href: base }}
	next={{ label: "CONTEXT STORE", href: `${base}/store` }}
/>
