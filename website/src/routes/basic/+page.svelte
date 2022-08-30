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
	import { BasicExample } from "$lib/components/examples/basic/index";
	import { base } from "$app/paths";

	export let data: PageData;
</script>

<ModulePage>
	<PageContent>
		<PageTitle id="usage">Basic Usage</PageTitle>
		<p>
			With <code>createContext</code> function you can create typed context setter
			and getter.
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
			<BasicExample />
		</ExampleContainer>

		<SectionTitle id="api">API</SectionTitle>
		<p>
			<code>createContext</code> takes no arguments but wants you to set it's generic
			type in order to type the given context setter and getter.
		</p>
		<p>
			<Code lang="ts" source={data.typingsSource} />
		</p>
		<Footer
			prev={{ label: "MAIN PAGE", href: base }}
			next={{ label: "CONTEXT STORE", href: `${base}/store` }}
		/>
	</PageContent>
	<PageContentsNav items={[["usage", "Usage"], "result", "api"]} />
</ModulePage>
