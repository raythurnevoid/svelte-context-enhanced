/**
 * Credits: https://github.com/KamenKolev/svelte-typed-context
 */

import {
	getContext as svelteGetContext,
	setContext as svelteSetContext,
} from "svelte";

/**
 * Provided as key to getContext and setContext in order to enable strict typing
 */
export interface ContextKey<T = unknown> {}

type getContext = <T>(key: ContextKey<T>) => undefined | T;
type setContext = <T>(key: ContextKey<T>, context: T) => void;

export const getContext = svelteGetContext as getContext;
export const setContext = svelteSetContext as setContext;
