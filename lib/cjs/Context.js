"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const svelte_1 = require("svelte");
function createContext() {
    const CONTEXT_ID = {};
    function setContextValue(context = {}) {
        svelte_1.setContext(CONTEXT_ID, context);
        return context;
    }
    function getContextValue() {
        return svelte_1.getContext(CONTEXT_ID);
    }
    return [setContextValue, getContextValue];
}
exports.createContext = createContext;
//# sourceMappingURL=Context.js.map