import type { PageLoad } from "./$types";
import { getFileContent } from "../../utils";

export const load: PageLoad = async function (event) {
	async function getTypingsSource() {
		return await getFileContent(
			event.fetch,
			"node_modules/@raythurnevoid/svelte-context-enhanced/basic.d.ts"
		);
	}

	async function getExampleSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/basic/BasicExample.svelte"
		);
	}

	async function getExampleChildSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/basic/BasicExampleChild.svelte"
		);
	}

	async function getExampleContextSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/basic/BasicExampleContext.ts"
		);
	}

	return {
		typingsSource: await getTypingsSource(),
		exampleSource: await getExampleSource(),
		exampleChildSource: await getExampleChildSource(),
		exampleContextSource: await getExampleContextSource(),
	};
};
