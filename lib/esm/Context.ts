import { getContext, setContext } from "svelte";

export function createContext<T>() {
  const CONTEXT_ID = {};

  function setContextValue(context: Partial<T> = {}): T {
		setContext(CONTEXT_ID, context);
		return context as T;
  }

  function getContextValue(): Readonly<T> {
    return getContext(CONTEXT_ID);
  }

  return [setContextValue, getContextValue] as [
    SetContext<T>,
    GetContext<T>
  ];
}

export type SetContext<T> = (context?: Partial<T>) => T;
export type GetContext<T> = () => Readonly<T>;
