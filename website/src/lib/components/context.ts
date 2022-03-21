import { createContext } from "@raythurnevoid/svelte-context-enhanced";

export const [setContext, getContext] = createContext<string>();

// import { setContext as $setContext, getContext as $getContext } from "svelte";

// export const [setContext, getContext] = createContext();

// function createContext<T>() {
// 	const key = "key";

// 	function setContextValue(context: T): T {
// 		$setContext(key, context);
// 		return context as T;
// 	}

// 	function getContextValue() {
// 		return $getContext(key);
// 	}

// 	return [setContextValue, getContextValue] as const;
// }
