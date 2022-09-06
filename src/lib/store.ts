import { readable, writable, derived } from "svelte/store";
import type { Writable, Readable, StartStopNotifier } from "svelte/store";
import { getContext, setContext } from "./svelte-typed-context.js";
import type { ContextKey } from "./svelte-typed-context.js";

export function createContextWritableStore<T>(key: ContextKey<Writable<T>>) {
	function setContextValue(value?: T, start?: StartStopNotifier<T>) {
		const context$ = writable(value, start);
		setContext(key, context$);
		return context$;
	}

	function getContextValue(): Writable<T> {
		return getContext(key);
	}

	return [setContextValue, getContextValue] as const;
}

export function createContextDerivedStore<T>(key: ContextKey<Readable<T>>) {
	const setContextValue = new Proxy(derived, {
		apply(target, _thisArg, args: Parameters<typeof derived>) {
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

export function createContextStore<T>(key: ContextKey<Readable<T>>) {
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
