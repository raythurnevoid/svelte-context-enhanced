import { base } from "$app/paths";

export function requestIdleCallback(
	cb: () => void | Promise<void>,
	options?: { timeout: number }
) {
	if (typeof window !== "undefined" && "requestIdleCallback" in window) {
		(window as any).requestIdleCallback(cb, options);
	} else {
		setTimeout(cb);
	}
}

export async function getFileContent(
	fetch: typeof window["fetch"],
	src: string
) {
	let base64Path: string;
	if (typeof window !== "undefined") {
		base64Path = window.btoa(src);
		base64Path = encodeURIComponent(base64Path);
	} else {
		const { Buffer } = await import("buffer");
		base64Path = Buffer.from(src, "utf-8").toString("base64");
	}

	const res = await fetch(
		`${base}/api/get-file-content.${encodeURIComponent(base64Path)}`
	);
	return await res.text();
}
