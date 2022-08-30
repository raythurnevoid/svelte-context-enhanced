import { readFile } from "fs/promises";
import { cwd } from "process";
import { resolve } from "path";
import type { RequestHandler } from "./$types";
import { Buffer } from "buffer";

export const GET: RequestHandler = async function (event) {
	const base64Path = decodeURIComponent(event.params.encodedBase64Path);
	const path = Buffer.from(base64Path, "base64").toString();
	const content = await readFile(resolve(cwd(), path), "utf8");

	return new Response(content, {
		headers: { "Content-Type": "text/plain" },
	});
};
