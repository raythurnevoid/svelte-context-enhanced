import{_ as a}from"./preload-helper-aa6bc0ce.js";import{b as r}from"./paths-6cd3a76e.js";async function d(o,e){let t;if(typeof window<"u")t=window.btoa(e),t=encodeURIComponent(t);else{const{Buffer:n}=await a(()=>import("./index-6c6b100b.js").then(i=>i.i),[],import.meta.url);t=n.from(e,"utf-8").toString("base64")}return await(await o(`${r}/api/get-file-content.${encodeURIComponent(t)}`)).text()}export{d as g};
