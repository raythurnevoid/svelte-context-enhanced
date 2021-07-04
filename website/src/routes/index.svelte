<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import { getFileContent } from "../utils";

	export const load: Load = async function ({ fetch }) {
		async function getHowToUseSource() {
			return await getFileContent(
				fetch,
				"src/components/examples/basic/BasicExampleContext.ts"
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
	import {
		PageTitle,
		ShellSnippet,
		SectionTitle,
		Code,
	} from "#src/components/main/index";
	import { PageContent, Footer } from "#src/layout/index";
	import { base } from "$app/paths";

	export let howToUseSource: string;
</script>

<main>
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
		<ShellSnippet source="npm i @raythurnevoid/svelte-context-enhanced" />
	</PageContent>
</main>
<Footer next={{ label: "BASIC USAGE", href: `${base}/basic` }} />
