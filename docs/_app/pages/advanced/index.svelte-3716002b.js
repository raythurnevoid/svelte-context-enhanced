import { S as SvelteComponent, i as init, s as safe_not_equal, t as text, g as claim_text, f as insert, a1 as noop, d as detach, aq as getContext, j as create_component, m as claim_component, o as mount_component, v as transition_in, r as transition_out, w as destroy_component, ar as setContext, e as element, k as space, c as claim_element, a as children, n as claim_space, O as append } from "../../chunks/vendor-4b28337c.js";
import { g as getFileContent, P as PageContent, F as Footer, a as PageTitle, S as SectionTitle, b as Code } from "../../chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js";
import { F as FileSourceSnippet, E as ExampleContainer } from "../../chunks/FileSourceSnippet-7212f7d4.js";
/* empty css                                                          */import { b as base } from "../../chunks/paths-45dac81d.js";
import "../../chunks/preload-helper-bd1b951a.js";
const contextKey = {};
function create_fragment$2(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[0]);
    },
    l(nodes) {
      t = claim_text(nodes, ctx[0]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function instance$2($$self) {
  const value = getContext(contextKey);
  return [value];
}
class AdvancedExampleChild extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
  }
}
function create_fragment$1(ctx) {
  let advancedexamplechild;
  let current;
  advancedexamplechild = new AdvancedExampleChild({});
  return {
    c() {
      create_component(advancedexamplechild.$$.fragment);
    },
    l(nodes) {
      claim_component(advancedexamplechild.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(advancedexamplechild, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(advancedexamplechild.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(advancedexamplechild.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(advancedexamplechild, detaching);
    }
  };
}
function instance$1($$self) {
  setContext(contextKey, "value");
  return [];
}
class AdvancedExample extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_default_slot_4(ctx) {
  let t;
  return {
    c() {
      t = text("Advanced Usage");
    },
    l(nodes) {
      t = claim_text(nodes, "Advanced Usage");
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
  let advancedexample;
  let current;
  advancedexample = new AdvancedExample({});
  return {
    c() {
      create_component(advancedexample.$$.fragment);
    },
    l(nodes) {
      claim_component(advancedexample.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(advancedexample, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(advancedexample.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(advancedexample.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(advancedexample, detaching);
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
  let t2_value = `ContextKey<T>`;
  let t2;
  let t3;
  let code1;
  let t4_value = `setContext`;
  let t4;
  let t5;
  let code2;
  let t6_value = `getContext`;
  let t6;
  let t7;
  let t8;
  let filesourcesnippet0;
  let t9;
  let filesourcesnippet1;
  let t10;
  let filesourcesnippet2;
  let t11;
  let sectiontitle0;
  let t12;
  let examplecontainer;
  let t13;
  let sectiontitle1;
  let t14;
  let p1;
  let code3;
  let t15;
  let t16;
  let t17;
  let p2;
  let code4;
  let current;
  pagetitle = new PageTitle({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  filesourcesnippet0 = new FileSourceSnippet({
    props: {
      fileName: "AdvancedExample.svelte",
      source: ctx[0]
    }
  });
  filesourcesnippet1 = new FileSourceSnippet({
    props: {
      fileName: "AdvancedExampleChild.svelte",
      source: ctx[1]
    }
  });
  filesourcesnippet2 = new FileSourceSnippet({
    props: {
      fileName: "AdvancedExampleContext.ts",
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
  code4 = new Code({
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
      t1 = text("You can create your own context typings and implementations using the\r\n			basic key interface ");
      code0 = element("code");
      t2 = text(t2_value);
      t3 = text(" and the functions\r\n			");
      code1 = element("code");
      t4 = text(t4_value);
      t5 = text("\r\n			and ");
      code2 = element("code");
      t6 = text(t6_value);
      t7 = text(".");
      t8 = space();
      create_component(filesourcesnippet0.$$.fragment);
      t9 = space();
      create_component(filesourcesnippet1.$$.fragment);
      t10 = space();
      create_component(filesourcesnippet2.$$.fragment);
      t11 = space();
      create_component(sectiontitle0.$$.fragment);
      t12 = space();
      create_component(examplecontainer.$$.fragment);
      t13 = space();
      create_component(sectiontitle1.$$.fragment);
      t14 = space();
      p1 = element("p");
      code3 = element("code");
      t15 = text("createContext");
      t16 = text(" takes no arguments but wants you to set it's generic\r\n			type in order to type the given context setter and getter.");
      t17 = space();
      p2 = element("p");
      create_component(code4.$$.fragment);
    },
    l(nodes) {
      claim_component(pagetitle.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, "You can create your own context typings and implementations using the\r\n			basic key interface ");
      code0 = claim_element(p0_nodes, "CODE", {});
      var code0_nodes = children(code0);
      t2 = claim_text(code0_nodes, t2_value);
      code0_nodes.forEach(detach);
      t3 = claim_text(p0_nodes, " and the functions\r\n			");
      code1 = claim_element(p0_nodes, "CODE", {});
      var code1_nodes = children(code1);
      t4 = claim_text(code1_nodes, t4_value);
      code1_nodes.forEach(detach);
      t5 = claim_text(p0_nodes, "\r\n			and ");
      code2 = claim_element(p0_nodes, "CODE", {});
      var code2_nodes = children(code2);
      t6 = claim_text(code2_nodes, t6_value);
      code2_nodes.forEach(detach);
      t7 = claim_text(p0_nodes, ".");
      p0_nodes.forEach(detach);
      t8 = claim_space(nodes);
      claim_component(filesourcesnippet0.$$.fragment, nodes);
      t9 = claim_space(nodes);
      claim_component(filesourcesnippet1.$$.fragment, nodes);
      t10 = claim_space(nodes);
      claim_component(filesourcesnippet2.$$.fragment, nodes);
      t11 = claim_space(nodes);
      claim_component(sectiontitle0.$$.fragment, nodes);
      t12 = claim_space(nodes);
      claim_component(examplecontainer.$$.fragment, nodes);
      t13 = claim_space(nodes);
      claim_component(sectiontitle1.$$.fragment, nodes);
      t14 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      code3 = claim_element(p1_nodes, "CODE", {});
      var code3_nodes = children(code3);
      t15 = claim_text(code3_nodes, "createContext");
      code3_nodes.forEach(detach);
      t16 = claim_text(p1_nodes, " takes no arguments but wants you to set it's generic\r\n			type in order to type the given context setter and getter.");
      p1_nodes.forEach(detach);
      t17 = claim_space(nodes);
      p2 = claim_element(nodes, "P", {});
      var p2_nodes = children(p2);
      claim_component(code4.$$.fragment, p2_nodes);
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
      append(p0, code2);
      append(code2, t6);
      append(p0, t7);
      insert(target, t8, anchor);
      mount_component(filesourcesnippet0, target, anchor);
      insert(target, t9, anchor);
      mount_component(filesourcesnippet1, target, anchor);
      insert(target, t10, anchor);
      mount_component(filesourcesnippet2, target, anchor);
      insert(target, t11, anchor);
      mount_component(sectiontitle0, target, anchor);
      insert(target, t12, anchor);
      mount_component(examplecontainer, target, anchor);
      insert(target, t13, anchor);
      mount_component(sectiontitle1, target, anchor);
      insert(target, t14, anchor);
      insert(target, p1, anchor);
      append(p1, code3);
      append(code3, t15);
      append(p1, t16);
      insert(target, t17, anchor);
      insert(target, p2, anchor);
      mount_component(code4, p2, null);
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
      const code4_changes = {};
      if (dirty & 8)
        code4_changes.source = ctx2[3];
      code4.$set(code4_changes);
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
      transition_in(code4.$$.fragment, local);
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
      transition_out(code4.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagetitle, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(p0);
      if (detaching)
        detach(t8);
      destroy_component(filesourcesnippet0, detaching);
      if (detaching)
        detach(t9);
      destroy_component(filesourcesnippet1, detaching);
      if (detaching)
        detach(t10);
      destroy_component(filesourcesnippet2, detaching);
      if (detaching)
        detach(t11);
      destroy_component(sectiontitle0, detaching);
      if (detaching)
        detach(t12);
      destroy_component(examplecontainer, detaching);
      if (detaching)
        detach(t13);
      destroy_component(sectiontitle1, detaching);
      if (detaching)
        detach(t14);
      if (detaching)
        detach(p1);
      if (detaching)
        detach(t17);
      if (detaching)
        detach(p2);
      destroy_component(code4);
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
        label: "CONTEXT STORE",
        href: `${base}/store`
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
        return yield getFileContent(fetch, "node_modules/@raythurnevoid/svelte-context-enhanced/svelte-typed-context.d.ts");
      });
    }
    function getExampleSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/advanced/AdvancedExample.svelte");
      });
    }
    function getExampleChildSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/advanced/AdvancedExampleChild.svelte");
      });
    }
    function getExampleContextSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/advanced/AdvancedExampleContext.ts");
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
class Advanced extends SvelteComponent {
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
export default Advanced;
export { load };
//# sourceMappingURL=index.svelte-3716002b.js.map
