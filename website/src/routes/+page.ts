import type { PageLoad } from "./$types";
import { getFileContent } from "../utils";

export const load: PageLoad = async function (event) {
	async function getHowToUseSource() {
		return await getFileContent(
			event.fetch,
			"src/lib/components/examples/basic/BasicExampleContext.ts"
		);
	}

	return {
		howToUseSource: await getHowToUseSource(),
	};
};
