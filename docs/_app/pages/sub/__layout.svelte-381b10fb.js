import { S as SvelteComponent, i as init, s as safe_not_equal, G as create_slot, t as text, k as space, g as claim_text, n as claim_space, f as insert, h as set_data, H as update_slot, v as transition_in, r as transition_out, d as detach, U as component_subscribe } from "../../chunks/vendor-4b28337c.js";
import { p as page } from "../../chunks/stores-acb2cdbf.js";
function create_fragment(ctx) {
  let t0_value = ctx[0].path + "";
  let t0;
  let t1;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  return {
    c() {
      t0 = text(t0_value);
      t1 = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if ((!current || dirty & 1) && t0_value !== (t0_value = ctx2[0].path + ""))
        set_data(t0, t0_value);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 2)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[1], !current ? -1 : dirty, null, null);
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
        detach(t0);
      if (detaching)
        detach(t1);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [$page, $$scope, slots];
}
class _layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export default _layout;
//# sourceMappingURL=__layout.svelte-381b10fb.js.map
