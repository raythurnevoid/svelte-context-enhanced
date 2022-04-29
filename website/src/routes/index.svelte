<svelte:options immutable={true} />

<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getFileContent } from "../utils";

	export const load: Load = async function ({ fetch }) {
		async function getHowToUseSource() {
			return await getFileContent(
				fetch,
				"src/lib/components/examples/basic/BasicExampleContext.ts"
			);
		}

		return {
			props: {
				howToUseSource: await getHowToUseSource(),
			},
		};
	};
</script>

<script lang="ts">
	import { PageTitle, SectionTitle, Code } from "$lib/components/main/index";
	import { PageContent, Footer, ModulePage } from "$lib/layout/index";
	import { base } from "$app/paths";

	export let howToUseSource: string;
</script>

<ModulePage>
	<PageContent>
		<PageTitle>Svelte Typed Context</PageTitle>
		<p>
			The problem with Svelte's out of the box context system is the missing of
			typings support for values. <br /><br /> This library wants to address this
			feature.
		</p>

		<SectionTitle>How to use</SectionTitle>
		<Code lang="ts" source={howToUseSource} />

		<SectionTitle>Installation</SectionTitle>
		<Code lang="shell" source="npm i @raythurnevoid/svelte-context-enhanced" />
		<Footer next={{ label: "BASIC USAGE", href: `${base}/basic` }} />
	</PageContent>
</ModulePage>
