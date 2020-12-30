"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextStore = void 0;
const svelte_1 = require("svelte");
const store_1 = require("svelte/store");
function createContextStore() {
    const CONTEXT_ID = {};
    function setContextValue(context = {}) {
        const context$ = store_1.writable(context);
        svelte_1.setContext(CONTEXT_ID, context$);
        return context$;
    }
    function getContextValue() {
        return svelte_1.getContext(CONTEXT_ID);
    }
    return [setContextValue, getContextValue];
}
exports.createContextStore = createContextStore;
//# sourceMappingURL=ContextStore.js.map