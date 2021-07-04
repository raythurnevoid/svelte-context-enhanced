import { readFile } from "fs/promises";
import { cwd } from "process";
import { resolve } from "path";
import type { RequestHandler } from "@sveltejs/kit";
import { Buffer } from "buffer";

export const get: RequestHandler = async function ({ params }) {
	const base64Path = decodeURIComponent(params.encodedBase64Path);
	const path = Buffer.from(base64Path, "base64").toString();
	const content = await readFile(resolve(cwd(), path), "utf8");

	return {
		body: content,
	};
};
