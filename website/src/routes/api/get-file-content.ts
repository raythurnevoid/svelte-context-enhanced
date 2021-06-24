import { readFile } from "fs/promises";
import { cwd } from "process";
import { resolve } from "path";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async function ({ query }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const path = query.get("path");
	const content = await readFile(resolve(cwd(), path), "utf8");

	return {
		body: content,
	};
};
