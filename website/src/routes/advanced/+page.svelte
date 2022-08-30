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
	import { AdvancedExample } from "$lib/components/examples/advanced/index";
	import { base } from "$app/paths";

	export let data: PageData;
</script>

<ModulePage>
	<PageContent>
		<PageTitle id="usage">Advanced Usage</PageTitle>
		<p>
			You can create your own context typings and implementations using the
			basic key interface <code>{`ContextKey<T>`}</code> and the functions
			<code>{`setContext`}</code>
			and <code>{`getContext`}</code>.
		</p>

		<FileSourceSnippet
			fileName="AdvancedExample.svelte"
			source={data.exampleSource}
		/>

		<FileSourceSnippet
			fileName="AdvancedExampleChild.svelte"
			source={data.exampleChildSource}
		/>

		<FileSourceSnippet
			fileName="AdvancedExampleContext.ts"
			source={data.exampleContextSource}
		/>

		<SectionTitle id="result">Result</SectionTitle>
		<ExampleContainer>
			<AdvancedExample />
		</ExampleContainer>

		<SectionTitle id="api">API</SectionTitle>
		<p>
			<code>createContext</code> takes no arguments but wants you to set it's generic
			type in order to type the given context setter and getter.
		</p>
		<p>
			<Code lang="ts" source={data.typingsSource} />
		</p>
		<Footer prev={{ label: "CONTEXT STORE", href: `${base}/store` }} />
	</PageContent>
	<PageContentsNav items={[["usage", "Usage"], "result", "api"]} />
</ModulePage>
