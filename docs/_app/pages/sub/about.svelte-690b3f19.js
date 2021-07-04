import { S as SvelteComponent, i as init, s as safe_not_equal, t as text, g as claim_text, f as insert, h as set_data, a1 as noop, d as detach, U as component_subscribe } from "../../chunks/vendor-4b28337c.js";
import { p as page } from "../../chunks/stores-acb2cdbf.js";
function create_fragment(ctx) {
  let t_value = ctx[0].path + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1 && t_value !== (t_value = ctx2[0].path + ""))
        set_data(t, t_value);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  return [$page];
}
class About extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export default About;
//# sourceMappingURL=about.svelte-690b3f19.js.map
