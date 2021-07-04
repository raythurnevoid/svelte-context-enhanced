import { S as SvelteComponent, i as init, s as safe_not_equal, a2 as Prism, e as element, j as create_component, k as space, c as claim_element, a as children, m as claim_component, d as detach, n as claim_space, b as attr, f as insert, O as append, o as mount_component, v as transition_in, r as transition_out, w as destroy_component, K as binding_callbacks, a3 as IconButton_1, J as Icon, t as text, g as claim_text } from "../chunks/vendor-4b28337c.js";
import { C as CodeStyles, g as getFileContent, P as PageContent, F as Footer, a as PageTitle, S as SectionTitle, b as Code } from "../chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js";
/* empty css                                                       */import { b as base } from "../chunks/paths-45dac81d.js";
import "../chunks/preload-helper-bd1b951a.js";
function create_fragment$2(ctx) {
  let div2;
  let div0;
  let prism;
  let t0;
  let div1;
  let copybutton;
  let t1;
  let codestyles;
  let current;
  prism = new Prism({
    props: {
      language: "shell",
      source: ctx[0]
    }
  });
  copybutton = new CopyButton({ props: { el: ctx[1] } });
  codestyles = new CodeStyles({});
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      create_component(prism.$$.fragment);
      t0 = space();
      div1 = element("div");
      create_component(copybutton.$$.fragment);
      t1 = space();
      create_component(codestyles.$$.fragment);
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {});
      var div0_nodes = children(div0);
      claim_component(prism.$$.fragment, div0_nodes);
      div0_nodes.forEach(detach);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      claim_component(copybutton.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t1 = claim_space(nodes);
      claim_component(codestyles.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(div1, "class", "snippet-commands svelte-safw0");
      attr(div2, "class", "shell-snippet-wrapper svelte-safw0");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      mount_component(prism, div0, null);
      ctx[2](div0);
      append(div2, t0);
      append(div2, div1);
      mount_component(copybutton, div1, null);
      insert(target, t1, anchor);
      mount_component(codestyles, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const prism_changes = {};
      if (dirty & 1)
        prism_changes.source = ctx2[0];
      prism.$set(prism_changes);
      const copybutton_changes = {};
      if (dirty & 2)
        copybutton_changes.el = ctx2[1];
      copybutton.$set(copybutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(prism.$$.fragment, local);
      transition_in(copybutton.$$.fragment, local);
      transition_in(codestyles.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(prism.$$.fragment, local);
      transition_out(copybutton.$$.fragment, local);
      transition_out(codestyles.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      destroy_component(prism);
      ctx[2](null);
      destroy_component(copybutton);
      if (detaching)
        detach(t1);
      destroy_component(codestyles, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { source } = $$props;
  let snippetEl;
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      snippetEl = $$value;
      $$invalidate(1, snippetEl);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("source" in $$props2)
      $$invalidate(0, source = $$props2.source);
  };
  return [source, snippetEl, div0_binding];
}
class ShellSnippet extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { source: 0 });
  }
}
function create_default_slot_1$1(ctx) {
  let t;
  return {
    c() {
      t = text("content_copy");
    },
    l(nodes) {
      t = claim_text(nodes, "content_copy");
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
function create_default_slot$1(ctx) {
  let icon;
  let current;
  icon = new Icon({
    props: {
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(icon.$$.fragment);
    },
    l(nodes) {
      claim_component(icon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(icon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const icon_changes = {};
      if (dirty & 4) {
        icon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      icon.$set(icon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(icon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(icon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(icon, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let iconbutton;
  let current;
  iconbutton = new IconButton_1({
    props: {
      class: "copy-button",
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  iconbutton.$on("click", ctx[0]);
  return {
    c() {
      div = element("div");
      create_component(iconbutton.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(iconbutton.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "copy-button-wrapper svelte-c1j887");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(iconbutton, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const iconbutton_changes = {};
      if (dirty & 4) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(iconbutton);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { el } = $$props;
  function execCopy() {
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }
  $$self.$$set = ($$props2) => {
    if ("el" in $$props2)
      $$invalidate(1, el = $$props2.el);
  };
  return [execCopy, el];
}
class CopyButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { el: 1 });
  }
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("Svelte Typed Context");
    },
    l(nodes) {
      t = claim_text(nodes, "Svelte Typed Context");
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
  let t;
  return {
    c() {
      t = text("How to use");
    },
    l(nodes) {
      t = claim_text(nodes, "How to use");
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
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("Installation");
    },
    l(nodes) {
      t = claim_text(nodes, "Installation");
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
  let p;
  let t1;
  let br0;
  let br1;
  let t2;
  let t3;
  let sectiontitle0;
  let t4;
  let code;
  let t5;
  let sectiontitle1;
  let t6;
  let shellsnippet;
  let current;
  pagetitle = new PageTitle({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  sectiontitle0 = new SectionTitle({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  code = new Code({
    props: {
      lang: "ts",
      source: ctx[0]
    }
  });
  sectiontitle1 = new SectionTitle({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  shellsnippet = new ShellSnippet({
    props: {
      source: "npm i @raythurnevoid/svelte-context-enhanced"
    }
  });
  return {
    c() {
      create_component(pagetitle.$$.fragment);
      t0 = space();
      p = element("p");
      t1 = text("The problem with Svelte's out of the box context system is the missing of\r\n			typings support for values. ");
      br0 = element("br");
      br1 = element("br");
      t2 = text(" This library wants to address this\r\n			feature.");
      t3 = space();
      create_component(sectiontitle0.$$.fragment);
      t4 = space();
      create_component(code.$$.fragment);
      t5 = space();
      create_component(sectiontitle1.$$.fragment);
      t6 = space();
      create_component(shellsnippet.$$.fragment);
    },
    l(nodes) {
      claim_component(pagetitle.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, "The problem with Svelte's out of the box context system is the missing of\r\n			typings support for values. ");
      br0 = claim_element(p_nodes, "BR", {});
      br1 = claim_element(p_nodes, "BR", {});
      t2 = claim_text(p_nodes, " This library wants to address this\r\n			feature.");
      p_nodes.forEach(detach);
      t3 = claim_space(nodes);
      claim_component(sectiontitle0.$$.fragment, nodes);
      t4 = claim_space(nodes);
      claim_component(code.$$.fragment, nodes);
      t5 = claim_space(nodes);
      claim_component(sectiontitle1.$$.fragment, nodes);
      t6 = claim_space(nodes);
      claim_component(shellsnippet.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(pagetitle, target, anchor);
      insert(target, t0, anchor);
      insert(target, p, anchor);
      append(p, t1);
      append(p, br0);
      append(p, br1);
      append(p, t2);
      insert(target, t3, anchor);
      mount_component(sectiontitle0, target, anchor);
      insert(target, t4, anchor);
      mount_component(code, target, anchor);
      insert(target, t5, anchor);
      mount_component(sectiontitle1, target, anchor);
      insert(target, t6, anchor);
      mount_component(shellsnippet, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const pagetitle_changes = {};
      if (dirty & 2) {
        pagetitle_changes.$$scope = { dirty, ctx: ctx2 };
      }
      pagetitle.$set(pagetitle_changes);
      const sectiontitle0_changes = {};
      if (dirty & 2) {
        sectiontitle0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sectiontitle0.$set(sectiontitle0_changes);
      const code_changes = {};
      if (dirty & 1)
        code_changes.source = ctx2[0];
      code.$set(code_changes);
      const sectiontitle1_changes = {};
      if (dirty & 2) {
        sectiontitle1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      sectiontitle1.$set(sectiontitle1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(pagetitle.$$.fragment, local);
      transition_in(sectiontitle0.$$.fragment, local);
      transition_in(code.$$.fragment, local);
      transition_in(sectiontitle1.$$.fragment, local);
      transition_in(shellsnippet.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(pagetitle.$$.fragment, local);
      transition_out(sectiontitle0.$$.fragment, local);
      transition_out(code.$$.fragment, local);
      transition_out(sectiontitle1.$$.fragment, local);
      transition_out(shellsnippet.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(pagetitle, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(p);
      if (detaching)
        detach(t3);
      destroy_component(sectiontitle0, detaching);
      if (detaching)
        detach(t4);
      destroy_component(code, detaching);
      if (detaching)
        detach(t5);
      destroy_component(sectiontitle1, detaching);
      if (detaching)
        detach(t6);
      destroy_component(shellsnippet, detaching);
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
      next: {
        label: "BASIC USAGE",
        href: `${base}/basic`
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
      if (dirty & 3) {
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
    function getHowToUseSource() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield getFileContent(fetch, "src/components/examples/basic/BasicExampleContext.ts");
      });
    }
    return {
      props: {
        howToUseSource: yield getHowToUseSource()
      }
    };
  });
};
function instance($$self, $$props, $$invalidate) {
  let { howToUseSource } = $$props;
  $$self.$$set = ($$props2) => {
    if ("howToUseSource" in $$props2)
      $$invalidate(0, howToUseSource = $$props2.howToUseSource);
  };
  return [howToUseSource];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { howToUseSource: 0 });
  }
}
export default Routes;
export { load };
//# sourceMappingURL=index.svelte-c3b14ad1.js.map
