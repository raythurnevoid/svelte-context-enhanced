import { getContext, setContext } from "./svelte-typed-context.js";
import type { ContextKey } from "./svelte-typed-context.js";

export function createContext<T>() {
	const key: ContextKey<T> = {};

	function setContextValue(context: T): T {
		setContext(key, context);
		return context as T;
	}

	function getContextValue() {
		return getContext(key);
	}

	return [setContextValue, getContextValue] as const;
}
