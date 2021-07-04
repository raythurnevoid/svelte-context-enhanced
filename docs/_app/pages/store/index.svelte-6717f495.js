import { at as createContextWritableStore, au as createContextStore, S as SvelteComponent, i as init, s as safe_not_equal, t as text, k as space, e as element, g as claim_text, n as claim_space, c as claim_element, a as children, d as detach, f as insert, O as append, ac as listen, h as set_data, a1 as noop, U as component_subscribe, av as set_store_value, j as create_component, m as claim_component, o as mount_component, v as transition_in, r as transition_out, w as destroy_component } from "../../chunks/vendor-4b28337c.js";
import { g as getFileContent, P as PageContent, F as Footer, a as PageTitle, S as SectionTitle, b as Code } from "../../chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js";
import { F as FileSourceSnippet, E as ExampleContainer } from "../../chunks/FileSourceSnippet-7212f7d4.js";
/* empty css                                                          */import { b as base } from "../../chunks/paths-45dac81d.js";
import "../../chunks/preload-helper-bd1b951a.js";
const [setCounterContext, getCounterContext] = createContextWritableStore();
const [setTimeContext, getTimeContext] = createContextStore();
function create_fragment$2(ctx) {
  let t0;
  let t1;
  let br;
  let t2;
  let button;
  let t3;
  let mounted;
  let dispose;
  return {
    c() {
      t0 = text(ctx[0]);
      t1 = space();
      br = element("br");
      t2 = space();
      button = element("button");
      t3 = text("add");
    },
    l(nodes) {
      t0 = claim_text(nodes, ctx[0]);
      t1 = claim_space(nodes);
      br = claim_element(nodes, "BR", {});
      t2 = claim_space(nodes);
      button = claim_element(nodes, "BUTTON", {});
      var button_nodes = children(button);
      t3 = claim_text(button_nodes, "add");
      button_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, br, anchor);
      insert(target, t2, anchor);
      insert(target, button, anchor);
      append(button, t3);
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(br);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let $time$;
  let $counter$;
  const counter$ = getCounterContext();
  component_subscribe($$self, counter$, (value) => $$invalidate(1, $counter$ = value));
  const time$ = getTimeContext();
  component_subscribe($$self, time$, (value) => $$invalidate(0, $time$ = value));
  const click_handler = () => set_store_value(counter$, $counter$++, $counter$);
  return [$time$, $counter$, counter$, time$, click_handler];
}
class StoreExampleChild extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
  }
}
function create_fragment$1(ctx) {
  let t0;
  let t1;
  let br0;
  let t2;
  let t3;
  let t4;
  let br1;
  let t5;
  let br2;
  let t6;
  let br3;
  let t7;
  let storeexamplechild;
  let current;
  storeexamplechild = new StoreExampleChild({});
  return {
    c() {
      t0 = text(ctx[0]);
      t1 = space();
      br0 = element("br");
      t2 = space();
      t3 = text(ctx[1]);
      t4 = space();
      br1 = element("br");
      t5 = space();
      br2 = element("br");
      t6 = text("\r\nChild:\r\n");
      br3 = element("br");
      t7 = space();
      create_component(storeexamplechild.$$.fragment);
    },
    l(nodes) {
      t0 = claim_text(nodes, ctx[0]);
      t1 = claim_space(nodes);
      br0 = claim_element(nodes, "BR", {});
      t2 = claim_space(nodes);
      t3 = claim_text(nodes, ctx[1]);
      t4 = claim_space(nodes);
      br1 = claim_element(nodes, "BR", {});
      t5 = claim_space(nodes);
      br2 = claim_element(nodes, "BR", {});
      t6 = claim_text(nodes, "\r\nChild:\r\n");
      br3 = claim_element(nodes, "BR", {});
      t7 = claim_space(nodes);
      claim_component(storeexamplechild.$$.fragment, nodes);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      insert(target, br0, anchor);
      insert(target, t2, anchor);
      insert(target, t3, anchor);
      insert(target, t4, anchor);
      insert(target, br1, anchor);
      insert(target, t5, anchor);
      insert(target, br2, anchor);
      insert(target, t6, anchor);
      insert(target, br3, anchor);
      insert(target, t7, anchor);
      mount_component(storeexamplechild, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & 1)
        set_data(t0, ctx2[0]);
      if (!current || dirty & 2)
        set_data(t3, ctx2[1]);
    },
    i(local) {
      if (current)
        return;
      transition_in(storeexamplechild.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(storeexamplechild.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(br0);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(br1);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(br2);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(br3);
      if (detaching)
        detach(t7);
      destroy_component(storeexamplechild, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $time$;
  let $counter$;
  const getCurrentTime = () => typeof window !== "undefined" && new Date().toLocaleTimeString(navigator.language, { timeStyle: "medium" });
  const time$ = setTimeContext(getCurrentTime(), (set) => {
    const interval = setInterval(() => set(getCurrentTime()), 1e3);
    return () => clearInterval(interval);
  });
  component_subscribe($$self, time$, (value) => $$invalidate(0, $time$ = value));
  const counter$ = setCounterContext(0);
  component_subscribe($$self, counter$, (value) => $$invalidate(1, $counter$ = value));
  return [$time$, $counter$, time$, counter$];
}
class StoreExample extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Context Store");
    },
    l(nodes) {
      t = claim_text(nodes, "Context Store");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Result");
    },
    l(nodes) {
      t = claim_text(nodes, "Result");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_2(ctx) {
  let storeexample;
  let current;
  storeexample = new StoreExample({});
  return {
    c() {
      create_component(storeexample.$$.fragment);
    },
    l(nodes) {
      claim_component(storeexample.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(storeexample, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(storeexample.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(storeexample.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(storeexample, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("API");
    },
    l(nodes) {
      t = claim_text(nodes, "API");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot(ctx) {
  let pagetitle;
  let t0;
  let p0;
  let t1;
  let code0;
  let t2;
  let t3;
  let code1;
  let t4;
  let t5;
  let t6;
  let filesourcesnippet0;
  let t7;
  let filesourcesnippet1;
  let t8;
  let filesourcesnippet2;
  let t9;
  let sectiontitle0;
  let t10;
  let examplecontainer;
  let t11;
  let sectiontitle1;
  let t12;
  let p1;
  let t13;
  let code2;
  let t14;
  let t15;
  let code3;
  let t16;
  let t17;
  let code4;
  let t18;
  let t19;
  let code5;
  let t20;
  let t21;
  let t22;
  let p2;
  let code6;
  let current;
  pagetitle = new PageTitle({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  filesourcesnippet0 = new FileSourceSnippet({
    props: {
      fileName: "BasicExample.svelte",
      source: ctx[0]
    }
  });
  filesourcesnippet1 = new FileSourceSnippet({
    props: {
      fileName: "BasicExampleChild.svelte",
      source: ctx[1]
    }
  });
  filesourcesnippet2 = new FileSourceSnippet({
    props: {
      fileName: "BasicExampleContext.ts",
      source: ctx[2]
    }
  });
  sectiontitle0 = new SectionTitle({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  examplecontainer = new ExampleContainer({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  sectiontitle1 = new SectionTitle({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  code6 = new Code({
    props: {
      lang: "ts",
      source: ctx[3]
    }
  });
  return {
    c() {
      create_component(pagetitle.$$.fragment);
      t0 = space();
      p0 = element("p");
      t1 = text("With ");
      code0 = element("code");
      t2 = text("createContextStore");
      t3 = text(" and\r\n			");
      code1 = element("code");
      t4 = text("createContextWritableStore");
      t5 = text(" you can can take advantage of typings\r\n			when using Svelte's store as context value.");
      t6 = space();
      create_component(filesourcesnippet0.$$.fragment);
      t7 = space();
      create_component(filesourcesnippet1.$$.fragment);
      t8 = space();
      create_component(filesourcesnippet2.$$.fragment);
      t9 = space();
      create_component(sectiontitle0.$$.fragment);
      t10 = space();
      create_component(examplecontainer.$$.fragment);
      t11 = space();
      create_component(sectiontitle1.$$.fragment);
      t12 = space();
      p1 = element("p");
      t13 = text("Both ");
      code2 = element("code");
      t14 = text("createContextStore");
      t15 = text(" and\r\n			");
      code3 = element("code");
      t16 = text("createContextWritableStore");
      t17 = text(" are proxies to Svelte's\r\n			");
      code4 = element("code");
      t18 = text("readable");
      t19 = text("\r\n			and ");
      code5 = element("code");
      t20 = text("writable");
      t21 = text(" stores, because of that they share the same API.");
      t22 = space();
      p2 = element("p");
      create_component(code6.$$.fragment);
    },
    l(nodes) {
      claim_component(pagetitle.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, "With ");
      code0 = claim_element(p0_nodes, "CODE", {});
      var code0_nodes = children(code0);
      t2 = claim_text(code0_nodes, "createContextStore");
      code0_nodes.forEach(detach);
      t3 = claim_text(p0_nodes, " and\r\n			");
      code1 = claim_element(p0_nodes, "CODE", {});
      var code1_nodes = children(code1);
      t4 = claim_text(code1_nodes, "createContextWritableStore");
      code1_nodes.forEach(detach);
      t5 = claim_text(p0_nodes, " you can can take advantage of typings\r\n			when using Svelte's store as context value.");
      p0_nodes.forEach(detach);
      t6 = claim_space(nodes);
      claim_component(filesourcesnippet0.$$.fragment, nodes);
      t7 = claim_space(nodes);
      claim_component(filesourcesnippet1.$$.fragment, nodes);
      t8 = claim_space(nodes);
      claim_component(filesourcesnippet2.$$.fragment, nodes);
      t9 = claim_space(nodes);
      claim_component(sectiontitle0.$$.fragment, nodes);
      t10 = claim_space(nodes);
      claim_component(examplecontainer.$$.fragment, nodes);
      t11 = claim_space(nodes);
      claim_component(sectiontitle1.$$.fragment, nodes);
      t12 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t13 = claim_text(p1_nodes, "Both ");
      code2 = claim_element(p1_nodes, "CODE", {});
      var code2_nodes = children(code2);
      t14 = claim_text(code2_nodes, "createContextStore");
      code2_nodes.forEach(detach);
      t15 = claim_text(p1_nodes, " and\r\n			");
      code3 = claim_element(p1_nodes, "CODE", {});
      var code3_nodes = children(code3);
      t16 = claim_text(code3_nodes, "createContextWritableStore");
      code3_nodes.forEach(detach);
      t17 = claim_text(p1_nodes, " are proxies to Svelte's\r\n			");
      code4 = claim_element(p1_nodes, "CODE", {});
      var code4_nodes = children(code4);
      t18 = claim_text(code4_nodes, "readable");
      code4_nodes.forEach(detach);
      t19 = claim_text(p1_nodes, "\r\n			and ");
      code5 = claim_element(p1_nodes, "CODE", {});
      var code5_nodes = children(code5);
      t20 = claim_text(code5_nodes, "writable");
      code5_nodes.forEach(detach);
      t21 = claim_text(p1_nodes, " stores, because of that they share the same API.");
      p1_nodes.forEach(detach);
      t22 = claim_space(nodes);
      p2 = claim_element(nodes, "P", {});
      var p2_nodes = children(p2);
      claim_component(code6.$$.fragment, p2_nodes);
      p2_nodes.forEach(detach);
    },
    m(target, anchor) {
      mount_component(pagetitle, target, anchor);
      insert(target, t0, anchor);
      insert(target, p0, anchor);
      append(p0, t1);
      append(p0, code0);
      append(code0, t2);
      append(p0, t3);
      append(p0, code1);
      append(code1, t4);
      append(p0, t5);
      insert(target, t6, anchor);
      mount_component(filesourcesnippet0, target, anchor);
      insert(target, t7, anchor);
      mount_component(filesourcesnippet1, target, anchor);
      insert(target, t8, anchor);
      mount_component(filesourcesnippet2, target, anchor);
      insert(target, t9, anchor);
      mount_component(sectiontitle0, target, anchor);
      insert(target, t10, anchor);
      mount_component(examplecontainer, target, anchor);
      insert(target, t11, anchor);
      mount_component(sectiontitle1, target, anchor);
      insert(target, t12, anchor);
      insert(target, p1, anchor);
      append(p1, t13);
      append(p1, code2);
      append(code2, t14);
      append(p1, t15);
      append(p1, code3);
      append(code3, t16);
      append(p1, t17);
      append(p1, code4);
      append(code4, t18);
      append(p1, t19);
      append(p1, code5);
      append(code5, t20);
      append(p1, t21);
      insert(target, t22, anchor);
      insert(target, p2, anchor);
      mount_component(code6, p2, null);
      current = true;
    },
    p(ctx2, dirty) {
      const pagetitle_changes = {};
      if (dirty & 16) {
        pagetitle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      pagetitle.$set(pagetitle_changes);
      const filesourcesnippet0_changes = {};
      if (dirty & 1)
        filesourcesnippet0_changes.source = ctx2[0];
      filesourcesnippet0.$set(filesourcesnippet0_changes);
      const filesourcesnippet1_changes = {};
      if (dirty & 2)
        filesourcesnippet1_changes.source = ctx2[1];
      filesourcesnippet1.$set(filesourcesnippet1_changes);
      const filesourcesnippet2_changes = {};
      if (dirty & 4)
        filesourcesnippet2_changes.source = ctx2[2];
      filesourcesnippet2.$set(filesourcesnippet2_changes);
      const sectiontitle0_changes = {};
      if (dirty & 16) {
        sectiontitle0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sectiontitle0.$set(sectiontitle0_changes);
      const examplecontainer_changes = {};
      if (dirty & 16) {
        examplecontainer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      examplecontainer.$set(examplecontainer_changes);
      const sectiontitle1_changes = {};
      if (dirty & 16) {
        sectiontitle1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sectiontitle1.$set(sectiontitle1_changes);
      const code6_changes = {};
      if (dirty & 8)
        code6_changes.source = ctx2[3];
      code6.$set(code6_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagetitle.$$.fragment, local);
      transition_in(filesourcesnippet0.$$.fragment, local);
      transition_in(filesourcesnippet1.$$.fragment, local);
      transition_in(filesourcesnippet2.$$.fragment, local);
      transition_in(sectiontitle0.$$.fragment, local);
      transition_in(examplecontainer.$$.fragment, local);
      transition_in(sectiontitle1.$$.fragment, local);
      transition_in(code6.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagetitle.$$.fragment, local);
      transition_out(filesourcesnippet0.$$.fragment, local);
      transition_out(filesourcesnippet1.$$.fragment, local);
      transition_out(filesourcesnippet2.$$.fragment, local);
      transition_out(sectiontitle0.$$.fragment, local);
      transition_out(examplecontainer.$$.fragment, local);
      transition_out(sectiontitle1.$$.fragment, local);
      transition_out(code6.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagetitle, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(p0);
      if (detaching)
        detach(t6);
      destroy_component(filesourcesnippet0, detaching);
      if (detaching)
        detach(t7);
      destroy_component(filesourcesnippet1, detaching);
      if (detaching)
        detach(t8);
      destroy_component(filesourcesnippet2, detaching);
      if (detaching)
        detach(t9);
      destroy_component(sectiontitle0, detaching);
      if (detaching)
        detach(t10);
      destroy_component(examplecontainer, detaching);
      if (detaching)
        detach(t11);
      destroy_component(sectiontitle1, detaching);
      if (detaching)
        detach(t12);
      if (detaching)
        detach(p1);
      if (detaching)
        detach(t22);
      if (detaching)
        detach(p2);
      destroy_component(code6);
    }
  };
}
function create_fragment(ctx) {
  let main;
  let pagecontent;
  let t;
  let footer;
  let current;
  pagecontent = new PageContent({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  footer = new Footer({
    props: {
      prev: {
        label: "BASIC USAGE",
        href: `${base}basic`
      },
      next: {
        label: "ADVANCED USAGE",
        href: `${base}/advanced`
      }
    }
  });
  return {
    c() {
      main = element("main");
      create_component(pagecontent.$$.fragment);
      t = space();
      create_component(footer.$$.fragment);
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", {});
      var main_nodes = children(main);
      claim_component(pagecontent.$$.fragment, main_nodes);
      main_nodes.forEach(detach);
      t = claim_space(nodes);
      claim_component(footer.$$.fragment, nodes);
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(pagecontent, main, null);
      insert(target, t, anchor);
      mount_component(footer, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const pagecontent_changes = {};
      if (dirty & 31) {
        pagecontent_changes.$$scope = { dirty, ctx: ctx2 };
      }
      pagecontent.$set(pagecontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagecontent.$$.fragment, local);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagecontent.$$.fragment, local);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(pagecontent);
      if (detaching)
        detach(t);
      destroy_component(footer, detaching);
    }
  };
}
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const load = function({ fetch }) {
  return __awaiter(this, void 0, void 0, function* () {
    function getTypingsSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "node_modules/@raythurnevoid/svelte-context-enhanced/store.d.ts");
      });
    }
    function getExampleSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/store/StoreExample.svelte");
      });
    }
    function getExampleChildSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/store/StoreExampleChild.svelte");
      });
    }
    function getExampleContextSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/store/StoreExampleContext.ts");
      });
    }
    return {
      props: {
        typingsSource: yield getTypingsSource(),
        exampleSource: yield getExampleSource(),
        exampleChildSource: yield getExampleChildSource(),
        exampleContextSource: yield getExampleContextSource()
      }
    };
  });
};
function instance($$self, $$props, $$invalidate) {
  let { exampleSource } = $$props;
  let { exampleChildSource } = $$props;
  let { exampleContextSource } = $$props;
  let { typingsSource } = $$props;
  $$self.$$set = ($$props2) => {
    if ("exampleSource" in $$props2)
      $$invalidate(0, exampleSource = $$props2.exampleSource);
    if ("exampleChildSource" in $$props2)
      $$invalidate(1, exampleChildSource = $$props2.exampleChildSource);
    if ("exampleContextSource" in $$props2)
      $$invalidate(2, exampleContextSource = $$props2.exampleContextSource);
    if ("typingsSource" in $$props2)
      $$invalidate(3, typingsSource = $$props2.typingsSource);
  };
  return [exampleSource, exampleChildSource, exampleContextSource, typingsSource];
}
class Store extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      exampleSource: 0,
      exampleChildSource: 1,
      exampleContextSource: 2,
      typingsSource: 3
    });
  }
}
export default Store;
export { load };
//# sourceMappingURL=index.svelte-6717f495.js.map
