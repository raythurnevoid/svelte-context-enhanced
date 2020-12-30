import { getContext, setContext } from "svelte";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export function createContextStore<T>() {
  const CONTEXT_ID = {};

  function setContextValue(context: Partial<T> = {}): Writable<T> {
    const context$ = writable(context);
    setContext(CONTEXT_ID, context$);
    return context$ as Writable<T>;
  }

  function getContextValue(): Writable<Readonly<T>> {
    return getContext(CONTEXT_ID);
  }

  return [setContextValue, getContextValue] as [
    SetContextStore<T>,
    GetContextStore<T>
  ];
}

export type SetContextStore<T> = (context?: Partial<T>) => Writable<T>;
export type GetContextStore<T> = () => Writable<Readonly<T>>;