import { S as SvelteComponent, i as init, s as safe_not_equal, G as create_slot, e as element, c as claim_element, a as children, d as detach, b as attr, f as insert, H as update_slot, v as transition_in, r as transition_out, t as text, k as space, j as create_component, g as claim_text, n as claim_space, m as claim_component, O as append, o as mount_component, h as set_data, w as destroy_component } from "./vendor-4b28337c.js";
import { b as Code } from "./CopyButton.svelte_svelte&type=style&lang-65d2a598.js";
function create_fragment$1(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "svelte-uzctd");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[0], !current ? -1 : dirty, null, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class ExampleContainer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let div;
  let code0;
  let t0;
  let t1;
  let code1;
  let current;
  code1 = new Code({
    props: {
      lang: ctx[0],
      source: ctx[1]
    }
  });
  return {
    c() {
      div = element("div");
      code0 = element("code");
      t0 = text(ctx[2]);
      t1 = space();
      create_component(code1.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      code0 = claim_element(div_nodes, "CODE", { class: true });
      var code0_nodes = children(code0);
      t0 = claim_text(code0_nodes, ctx[2]);
      code0_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      claim_component(code1.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(code0, "class", "svelte-ihxb8l");
      attr(div, "class", "svelte-ihxb8l");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, code0);
      append(code0, t0);
      append(div, t1);
      mount_component(code1, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & 4)
        set_data(t0, ctx2[2]);
      const code1_changes = {};
      if (dirty & 1)
        code1_changes.lang = ctx2[0];
      if (dirty & 2)
        code1_changes.source = ctx2[1];
      code1.$set(code1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(code1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(code1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(code1);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { lang = void 0 } = $$props;
  let { source } = $$props;
  let { fileName } = $$props;
  if (!lang) {
    const inferredLang = fileName.match(/\.(\w+$)/)[1];
    if (inferredLang === "ts" || inferredLang === "svelte") {
      lang = inferredLang;
    }
  }
  $$self.$$set = ($$props2) => {
    if ("lang" in $$props2)
      $$invalidate(0, lang = $$props2.lang);
    if ("source" in $$props2)
      $$invalidate(1, source = $$props2.source);
    if ("fileName" in $$props2)
      $$invalidate(2, fileName = $$props2.fileName);
  };
  return [lang, source, fileName];
}
class FileSourceSnippet extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { lang: 0, source: 1, fileName: 2 });
  }
}
export { ExampleContainer as E, FileSourceSnippet as F };
//# sourceMappingURL=FileSourceSnippet-7212f7d4.js.map
