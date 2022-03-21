<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getFileContent } from "../../utils";

	export const load: Load = async function ({ fetch }) {
		async function getTypingsSource() {
			return await getFileContent(
				fetch,
				"node_modules/@raythurnevoid/svelte-context-enhanced/basic.d.ts"
			);
		}

		async function getExampleSource() {
			return await getFileContent(
				fetch,
				"src/lib/components/examples/basic/BasicExample.svelte"
			);
		}

		async function getExampleChildSource() {
			return await getFileContent(
				fetch,
				"src/lib/components/examples/basic/BasicExampleChild.svelte"
			);
		}

		async function getExampleContextSource() {
			return await getFileContent(
				fetch,
				"src/lib/components/examples/basic/BasicExampleContext.ts"
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
	} from "$lib/components/main/index";
	import { Code, FileSourceSnippet } from "$lib/components/main/Code/index";
	import { PageContent, Footer, ModulePage } from "$lib/layout/index";
	import { PageContentsNav } from "$lib/layout/PageContentNav/index";
	import { BasicExample } from "$lib/components/examples/basic/index";
	import { base } from "$app/paths";

	export let exampleSource: string;
	export let exampleChildSource: string;
	export let exampleContextSource: string;
	export let typingsSource: string;
</script>

<ModulePage>
	<PageContent>
		<PageTitle id="usage">Basic Usage</PageTitle>
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

		<SectionTitle id="result">Result</SectionTitle>
		<ExampleContainer>
			<BasicExample />
		</ExampleContainer>

		<SectionTitle id="api">API</SectionTitle>
		<p>
			<code>createContext</code> takes no arguments but wants you to set it's generic
			type in order to type the given context setter and getter.
		</p>
		<p>
			<Code lang="ts" source={typingsSource} />
		</p>
		<Footer
			prev={{ label: "MAIN PAGE", href: base }}
			next={{ label: "CONTEXT STORE", href: `${base}/store` }}
		/>
	</PageContent>
	<PageContentsNav items={[["usage", "Usage"], "result", "api"]} />
</ModulePage>
