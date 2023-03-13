[Docs](https://raythurnevoid.github.io/svelte-context-enhanced/)

# Installation

```
npm i -D @raythurnevoid/svelte-context-enhanced
```

# Usage

```typescript
const [setContext, getContext] = createContext<string>();

// Parent.svelte
setContext('test');

// Child.svelte
const value = getContext();
```
