import { S as SvelteComponent, i as init, s as safe_not_equal, a4 as Button_1, j as create_component, k as space, t as text, m as claim_component, n as claim_space, g as claim_text, o as mount_component, f as insert, h as set_data, v as transition_in, r as transition_out, w as destroy_component, d as detach, U as component_subscribe } from "../../chunks/vendor-4b28337c.js";
import { p as page } from "../../chunks/stores-acb2cdbf.js";
function create_default_slot(ctx) {
  let t;
  return {
    c() {
      t = text("Test");
    },
    l(nodes) {
      t = claim_text(nodes, "Test");
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
function create_fragment(ctx) {
  let button;
  let t0;
  let t1_value = ctx[0].path + "";
  let t1;
  let current;
  button = new Button_1({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(button.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
      t0 = claim_space(nodes);
      t1 = claim_text(nodes, t1_value);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const button_changes = {};
      if (dirty & 2) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
      if ((!current || dirty & 1) && t1_value !== (t1_value = ctx2[0].path + ""))
        set_data(t1, t1_value);
    },
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(button, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  return [$page];
}
class Sub extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export default Sub;
//# sourceMappingURL=index.svelte-4ad2a81c.js.map
