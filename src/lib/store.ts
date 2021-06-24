import { readable, writable } from "svelte/store";
import type { Writable, Readable } from "svelte/store";
import { getContext, setContext } from "./svelte-typed-context.js";
import type { ContextKey } from "./svelte-typed-context.js";

export function createContextWritableStore<T>() {
	const key: ContextKey<Writable<T>> = {};

	const setContextValue = new Proxy(writable, {
		apply(target, _thisArg, args: Parameters<typeof writable>) {
			const context$ = target(...args);
			setContext(key, context$);
			return context$;
		},
	});

	function getContextValue(): Writable<T> {
		return getContext(key);
	}

	return [setContextValue, getContextValue] as const;
}

export function createContextStore<T>() {
	const key: ContextKey<Readable<T>> = {};

	const setContextValue = new Proxy(readable, {
		apply(target, _thisArg, args: Parameters<typeof readable>) {
			const context$ = target(...args);
			setContext(key, context$);
			return context$;
		},
	});

	function getContextValue(): Readable<T> {
		return getContext(key);
	}

	return [setContextValue, getContextValue] as const;
}
