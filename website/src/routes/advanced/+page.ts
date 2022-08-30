import type { PageLoad } from "./$types";
import { getFileContent } from "../../utils";

export const load: PageLoad = async function (event) {
	async function getTypingsSource() {
		return await getFileContent(
			event.fetch,
			"node_modules/@raythurnevoid/svelte-context-enhanced/svelte-typed-context.d.ts"
		);
	}

	async function getExampleSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/advanced/AdvancedExample.svelte"
		);
	}

	async function getExampleChildSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/advanced/AdvancedExampleChild.svelte"
		);
	}

	async function getExampleContextSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/advanced/AdvancedExampleContext.ts"
		);
	}

	return {
		typingsSource: await getTypingsSource(),
		exampleSource: await getExampleSource(),
		exampleChildSource: await getExampleChildSource(),
		exampleContextSource: await getExampleContextSource(),
	};
};
