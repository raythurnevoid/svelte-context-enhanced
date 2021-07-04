var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, c as claim_element, a as children, d as detach, b as attr, f as insert, t as text, g as claim_text, h as set_data, j as create_component, k as space, l as empty, m as claim_component, n as claim_space, o as mount_component, p as get_spread_update, q as get_spread_object, r as transition_out, u as check_outros, v as transition_in, w as destroy_component, x as setContext, y as afterUpdate, z as onMount, A as assign, B as group_outros, C as writable } from "./chunks/vendor-4b28337c.js";
import { _ as __vitePreload } from "./chunks/preload-helper-bd1b951a.js";
import { s as set_paths } from "./chunks/paths-45dac81d.js";
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}";
function create_if_block_2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[2] || {}];
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 4 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[2] || {})]) : {};
      if (dirty & 1049) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[3] || {}];
  var switch_value = ctx[0][2];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 8 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[3] || {})]) : {};
      if (dirty & 1041) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_4(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[4] || {}];
  var switch_value = ctx[0][3];
  function switch_props(ctx2) {
    let switch_instance_props = {};
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props());
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = dirty & 16 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[4] || {})]) : {};
      if (switch_value !== (switch_value = ctx2[0][3])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props());
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0][3] && create_if_block_4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0][3]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_default_slot_1(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0][2] && create_if_block_3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0][2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_default_slot(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0][1] && create_if_block_2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0][1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let if_block = ctx[6] && create_if_block_1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        id: true,
        "aria-live": true,
        "aria-atomic": true,
        class: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", "svelte-announcer");
      attr(div, "aria-live", "assertive");
      attr(div, "aria-atomic", "true");
      attr(div, "class", "svelte-1j55zn5");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (ctx2[6]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[7]);
    },
    l(nodes) {
      t = claim_text(nodes, ctx[7]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 128)
        set_data(t, ctx2[7]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let switch_instance;
  let t;
  let if_block_anchor;
  let current;
  const switch_instance_spread_levels = [ctx[1] || {}];
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  let if_block = ctx[5] && create_if_block(ctx);
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      t = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, t, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & 2 ? get_spread_update(switch_instance_spread_levels, [get_spread_object(ctx2[1] || {})]) : {};
      if (dirty & 1053) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, t.parentNode, t);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
      if (ctx2[5]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (switch_instance)
        destroy_component(switch_instance, detaching);
      if (detaching)
        detach(t);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  let { props_3 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        $$invalidate(6, navigated = true);
        $$invalidate(7, title = document.title || "untitled page");
      }
    });
    $$invalidate(5, mounted = true);
    return unsubscribe;
  });
  $$self.$$set = ($$props2) => {
    if ("stores" in $$props2)
      $$invalidate(8, stores = $$props2.stores);
    if ("page" in $$props2)
      $$invalidate(9, page = $$props2.page);
    if ("components" in $$props2)
      $$invalidate(0, components = $$props2.components);
    if ("props_0" in $$props2)
      $$invalidate(1, props_0 = $$props2.props_0);
    if ("props_1" in $$props2)
      $$invalidate(2, props_1 = $$props2.props_1);
    if ("props_2" in $$props2)
      $$invalidate(3, props_2 = $$props2.props_2);
    if ("props_3" in $$props2)
      $$invalidate(4, props_3 = $$props2.props_3);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 768) {
      stores.page.set(page);
    }
  };
  return [
    components,
    props_0,
    props_1,
    props_2,
    props_3,
    mounted,
    navigated,
    title,
    stores,
    page
  ];
}
class Root extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      stores: 8,
      page: 9,
      components: 0,
      props_0: 1,
      props_1: 2,
      props_2: 3,
      props_3: 4
    });
  }
}
const c = [
  () => __vitePreload(() => import("./pages/__layout.svelte-0e1690a9.js"), true ? ["/svelte-context-enhanced/_app/pages/__layout.svelte-0e1690a9.js","/svelte-context-enhanced/_app/assets/Footer.svelte_svelte&type=style&lang-a160e28b.css","/svelte-context-enhanced/_app/assets/app-cd57c324.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js","/svelte-context-enhanced/_app/chunks/paths-45dac81d.js"] : void 0),
  () => __vitePreload(() => import("./error.svelte-e26badd8.js"), true ? ["/svelte-context-enhanced/_app/error.svelte-e26badd8.js","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css"] : void 0),
  () => __vitePreload(() => import("./pages/index.svelte-c3b14ad1.js"), true ? ["/svelte-context-enhanced/_app/pages/index.svelte-c3b14ad1.js","/svelte-context-enhanced/_app/assets/Footer.svelte_svelte&type=style&lang-a160e28b.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js","/svelte-context-enhanced/_app/assets/CopyButton.svelte_svelte&type=style&lang-025c2866.css","/svelte-context-enhanced/_app/chunks/preload-helper-bd1b951a.js","/svelte-context-enhanced/_app/chunks/paths-45dac81d.js"] : void 0),
  () => __vitePreload(() => import("./pages/sveltekit/__layout.svelte-a3f668f5.js"), true ? ["/svelte-context-enhanced/_app/pages/sveltekit/__layout.svelte-a3f668f5.js","/svelte-context-enhanced/_app/assets/pages/sveltekit/__layout.svelte-eafd252c.css","/svelte-context-enhanced/_app/assets/app-cd57c324.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js"] : void 0),
  () => __vitePreload(() => import("./pages/sveltekit/index.svelte-49a30693.js"), true ? ["/svelte-context-enhanced/_app/pages/sveltekit/index.svelte-49a30693.js","/svelte-context-enhanced/_app/assets/pages/sveltekit/index.svelte-03c8b949.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css"] : void 0),
  () => __vitePreload(() => import("./pages/sveltekit/about.svelte-bef4e7ae.js"), true ? ["/svelte-context-enhanced/_app/pages/sveltekit/about.svelte-bef4e7ae.js","/svelte-context-enhanced/_app/assets/pages/sveltekit/about.svelte-26f24176.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css"] : void 0),
  () => __vitePreload(() => import("./pages/sveltekit/todos/index.svelte-199d7e09.js"), true ? ["/svelte-context-enhanced/_app/pages/sveltekit/todos/index.svelte-199d7e09.js","/svelte-context-enhanced/_app/assets/pages/sveltekit/todos/index.svelte-ce6d2a07.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css"] : void 0),
  () => __vitePreload(() => import("./pages/advanced/index.svelte-3716002b.js"), true ? ["/svelte-context-enhanced/_app/pages/advanced/index.svelte-3716002b.js","/svelte-context-enhanced/_app/assets/Footer.svelte_svelte&type=style&lang-a160e28b.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js","/svelte-context-enhanced/_app/assets/CopyButton.svelte_svelte&type=style&lang-025c2866.css","/svelte-context-enhanced/_app/chunks/preload-helper-bd1b951a.js","/svelte-context-enhanced/_app/chunks/paths-45dac81d.js","/svelte-context-enhanced/_app/chunks/FileSourceSnippet-7212f7d4.js"] : void 0),
  () => __vitePreload(() => import("./pages/about.svelte-45105894.js"), true ? ["/svelte-context-enhanced/_app/pages/about.svelte-45105894.js","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js"] : void 0),
  () => __vitePreload(() => import("./pages/basic/index.svelte-7f22a686.js"), true ? ["/svelte-context-enhanced/_app/pages/basic/index.svelte-7f22a686.js","/svelte-context-enhanced/_app/assets/Footer.svelte_svelte&type=style&lang-a160e28b.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js","/svelte-context-enhanced/_app/assets/CopyButton.svelte_svelte&type=style&lang-025c2866.css","/svelte-context-enhanced/_app/chunks/preload-helper-bd1b951a.js","/svelte-context-enhanced/_app/chunks/paths-45dac81d.js","/svelte-context-enhanced/_app/chunks/FileSourceSnippet-7212f7d4.js"] : void 0),
  () => __vitePreload(() => import("./pages/store/index.svelte-6717f495.js"), true ? ["/svelte-context-enhanced/_app/pages/store/index.svelte-6717f495.js","/svelte-context-enhanced/_app/assets/Footer.svelte_svelte&type=style&lang-a160e28b.css","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/CopyButton.svelte_svelte&type=style&lang-65d2a598.js","/svelte-context-enhanced/_app/assets/CopyButton.svelte_svelte&type=style&lang-025c2866.css","/svelte-context-enhanced/_app/chunks/preload-helper-bd1b951a.js","/svelte-context-enhanced/_app/chunks/paths-45dac81d.js","/svelte-context-enhanced/_app/chunks/FileSourceSnippet-7212f7d4.js"] : void 0),
  () => __vitePreload(() => import("./pages/sub/__layout.svelte-381b10fb.js"), true ? ["/svelte-context-enhanced/_app/pages/sub/__layout.svelte-381b10fb.js","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js"] : void 0),
  () => __vitePreload(() => import("./pages/sub/index.svelte-4ad2a81c.js"), true ? ["/svelte-context-enhanced/_app/pages/sub/index.svelte-4ad2a81c.js","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js"] : void 0),
  () => __vitePreload(() => import("./pages/sub/about.svelte-690b3f19.js"), true ? ["/svelte-context-enhanced/_app/pages/sub/about.svelte-690b3f19.js","/svelte-context-enhanced/_app/chunks/vendor-4b28337c.js","/svelte-context-enhanced/_app/assets/vendor-d7dcea53.css","/svelte-context-enhanced/_app/chunks/stores-acb2cdbf.js"] : void 0)
];
const routes = [
  [/^\/$/, [c[0], c[2]], [c[1]]],
  [/^\/test\.svelte$/],
  [/^\/sveltekit\/?$/, [c[0], c[3], c[4]], [c[1]]],
  [/^\/sveltekit\/about\/?$/, [c[0], c[3], c[5]], [c[1]]],
  [/^\/sveltekit\/todos\.json$/],
  [/^\/sveltekit\/todos\/?$/, [c[0], c[3], c[6]], [c[1]]],
  [/^\/sveltekit\/todos\/([^/]+?)\.json$/],
  [/^\/advanced\/?$/, [c[0], c[7]], [c[1]]],
  [/^\/about\/?$/, [c[0], c[8]], [c[1]]],
  [/^\/basic\/?$/, [c[0], c[9]], [c[1]]],
  [/^\/store\/?$/, [c[0], c[10]], [c[1]]],
  [/^\/api\/get-file-content\.([^/]+?)$/],
  [/^\/sub\/?$/, [c[0], c[11], c[12]], [c[1]]],
  [/^\/sub\/about\/?$/, [c[0], c[11], c[13]], [c[1]]]
];
const fallback = [c[0](), c[1]()];
function get_base_uri(doc) {
  let baseURI = doc.baseURI;
  if (!baseURI) {
    const baseTags = doc.getElementsByTagName("base");
    baseURI = baseTags.length ? baseTags[0].href : doc.URL;
  }
  return baseURI;
}
function scroll_state() {
  return {
    x: pageXOffset,
    y: pageYOffset
  };
}
function find_anchor(node) {
  while (node && node.nodeName.toUpperCase() !== "A")
    node = node.parentNode;
  return node;
}
class Router {
  constructor({ base, routes: routes2, trailing_slash }) {
    this.base = base;
    this.routes = routes2;
    this.trailing_slash = trailing_slash;
  }
  init(renderer) {
    this.renderer = renderer;
    renderer.router = this;
    this.enabled = true;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    addEventListener("beforeunload", () => {
      history.scrollRestoration = "auto";
    });
    addEventListener("load", () => {
      history.scrollRestoration = "manual";
    });
    let scroll_timer;
    addEventListener("scroll", () => {
      clearTimeout(scroll_timer);
      scroll_timer = setTimeout(() => {
        const new_state = __spreadProps(__spreadValues({}, history.state || {}), {
          "sveltekit:scroll": scroll_state()
        });
        history.replaceState(new_state, document.title, window.location.href);
      }, 50);
    });
    const trigger_prefetch = (event) => {
      const a = find_anchor(event.target);
      if (a && a.href && a.hasAttribute("sveltekit:prefetch")) {
        this.prefetch(new URL(a.href));
      }
    };
    let mousemove_timeout;
    const handle_mousemove = (event) => {
      clearTimeout(mousemove_timeout);
      mousemove_timeout = setTimeout(() => {
        trigger_prefetch(event);
      }, 20);
    };
    addEventListener("touchstart", trigger_prefetch);
    addEventListener("mousemove", handle_mousemove);
    addEventListener("click", (event) => {
      var _a;
      if (!this.enabled)
        return;
      if (event.button || event.which !== 1)
        return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (event.defaultPrevented)
        return;
      const a = find_anchor(event.target);
      if (!a)
        return;
      if (!a.href)
        return;
      const svg = typeof a.href === "object" && a.href.constructor.name === "SVGAnimatedString";
      const href = String(svg ? a.href.baseVal : a.href);
      if (href === location.href) {
        if (!location.hash)
          event.preventDefault();
        return;
      }
      const rel = (_a = a.getAttribute("rel")) == null ? void 0 : _a.split(/\s+/);
      if (a.hasAttribute("download") || rel && rel.includes("external")) {
        return;
      }
      if (svg ? a.target.baseVal : a.target)
        return;
      const url = new URL(href);
      if (!this.owns(url))
        return;
      const noscroll = a.hasAttribute("sveltekit:noscroll");
      history.pushState({}, "", url.href);
      this._navigate(url, noscroll ? scroll_state() : null, false, [], url.hash);
      event.preventDefault();
    });
    addEventListener("popstate", (event) => {
      if (event.state && this.enabled) {
        const url = new URL(location.href);
        this._navigate(url, event.state["sveltekit:scroll"], false, []);
      }
    });
    document.body.setAttribute("tabindex", "-1");
    history.replaceState(history.state || {}, "", location.href);
  }
  owns(url) {
    return url.origin === location.origin && url.pathname.startsWith(this.base);
  }
  parse(url) {
    if (this.owns(url)) {
      const path = decodeURIComponent(url.pathname.slice(this.base.length) || "/");
      const routes2 = this.routes.filter(([pattern]) => pattern.test(path));
      const query = new URLSearchParams(url.search);
      const id = `${path}?${query}`;
      return { id, routes: routes2, path, query };
    }
  }
  async goto(href, { noscroll = false, replaceState = false, keepfocus = false, state = {} } = {}, chain) {
    const url = new URL(href, get_base_uri(document));
    if (this.enabled && this.owns(url)) {
      history[replaceState ? "replaceState" : "pushState"](state, "", href);
      return this._navigate(url, noscroll ? scroll_state() : null, keepfocus, chain, url.hash);
    }
    location.href = url.href;
    return new Promise(() => {
    });
  }
  enable() {
    this.enabled = true;
  }
  disable() {
    this.enabled = false;
  }
  async prefetch(url) {
    const info = this.parse(url);
    if (!info) {
      throw new Error("Attempted to prefetch a URL that does not belong to this app");
    }
    return this.renderer.load(info);
  }
  async _navigate(url, scroll, keepfocus, chain, hash2) {
    const info = this.parse(url);
    if (!info) {
      throw new Error("Attempted to navigate to a URL that does not belong to this app");
    }
    if (info.path !== "/") {
      const has_trailing_slash = info.path.endsWith("/");
      const incorrect = has_trailing_slash && this.trailing_slash === "never" || !has_trailing_slash && this.trailing_slash === "always" && !info.path.split("/").pop().includes(".");
      if (incorrect) {
        info.path = has_trailing_slash ? info.path.slice(0, -1) : info.path + "/";
        history.replaceState({}, "", `${this.base}${info.path}${location.search}`);
      }
    }
    this.renderer.notify({
      path: info.path,
      query: info.query
    });
    await this.renderer.update(info, chain, false);
    if (!keepfocus) {
      document.body.focus();
    }
    const deep_linked = hash2 && document.getElementById(hash2.slice(1));
    if (scroll) {
      scrollTo(scroll.x, scroll.y);
    } else if (deep_linked) {
      scrollTo(0, deep_linked.getBoundingClientRect().top + scrollY);
    } else {
      scrollTo(0, 0);
    }
  }
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
function normalize(loaded) {
  if (loaded.error) {
    const error = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error };
    }
    return { status, error };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function page_store(value) {
  const store = writable(value);
  let ready = true;
  function notify() {
    ready = true;
    store.update((val) => val);
  }
  function set(new_value) {
    ready = false;
    store.set(new_value);
  }
  function subscribe(run) {
    let old_value;
    return store.subscribe((new_value) => {
      if (old_value === void 0 || ready && new_value !== old_value) {
        run(old_value = new_value);
      }
    });
  }
  return { notify, set, subscribe };
}
function initial_fetch(resource, opts) {
  const url = typeof resource === "string" ? resource : resource.url;
  let selector = `script[data-type="svelte-data"][data-url="${url}"]`;
  if (opts && typeof opts.body === "string") {
    selector += `[data-body="${hash(opts.body)}"]`;
  }
  const script = document.querySelector(selector);
  if (script) {
    const _a = JSON.parse(script.textContent), { body } = _a, init2 = __objRest(_a, ["body"]);
    return Promise.resolve(new Response(body, init2));
  }
  return fetch(resource, opts);
}
class Renderer {
  constructor({ Root: Root2, fallback: fallback2, target, session, host }) {
    this.Root = Root2;
    this.fallback = fallback2;
    this.host = host;
    this.router = null;
    this.target = target;
    this.started = false;
    this.session_id = 1;
    this.invalid = new Set();
    this.invalidating = null;
    this.current = {
      page: null,
      session_id: null,
      branch: []
    };
    this.cache = new Map();
    this.loading = {
      id: null,
      promise: null
    };
    this.stores = {
      page: page_store({}),
      navigating: writable(null),
      session: writable(session)
    };
    this.$session = null;
    this.root = null;
    let ready = false;
    this.stores.session.subscribe(async (value) => {
      this.$session = value;
      if (!ready || !this.router)
        return;
      this.session_id += 1;
      const info = this.router.parse(new URL(location.href));
      this.update(info, [], true);
    });
    ready = true;
  }
  async start({ status, error, nodes, page }) {
    const branch = [];
    let context = {};
    let result;
    let new_status;
    let new_error;
    try {
      for (let i = 0; i < nodes.length; i += 1) {
        const is_leaf = i === nodes.length - 1;
        const node = await this._load_node({
          module: await nodes[i],
          page,
          context,
          status: is_leaf && status,
          error: is_leaf && error
        });
        branch.push(node);
        if (node && node.loaded) {
          if (node.loaded.error) {
            if (error)
              throw node.loaded.error;
            new_status = node.loaded.status;
            new_error = node.loaded.error;
          } else if (node.loaded.context) {
            context = __spreadValues(__spreadValues({}, context), node.loaded.context);
          }
        }
      }
      result = await this._get_navigation_result_from_branch({ page, branch });
    } catch (e) {
      if (error)
        throw e;
      new_status = 500;
      new_error = e;
    }
    if (new_error) {
      result = await this._load_error({
        status: new_status,
        error: new_error,
        path: page.path,
        query: page.query
      });
    }
    if (result.redirect) {
      location.href = new URL(result.redirect, location.href).href;
      return;
    }
    this._init(result);
  }
  notify({ path, query }) {
    dispatchEvent(new CustomEvent("sveltekit:navigation-start"));
    if (this.started) {
      this.stores.navigating.set({
        from: {
          path: this.current.page.path,
          query: this.current.page.query
        },
        to: {
          path,
          query
        }
      });
    }
  }
  async update(info, chain, no_cache) {
    const token = this.token = {};
    let navigation_result = await this._get_navigation_result(info, no_cache);
    if (token !== this.token)
      return;
    this.invalid.clear();
    if (navigation_result.redirect) {
      if (chain.length > 10 || chain.includes(info.path)) {
        navigation_result = await this._load_error({
          status: 500,
          error: new Error("Redirect loop"),
          path: info.path,
          query: info.query
        });
      } else {
        if (this.router) {
          this.router.goto(navigation_result.redirect, { replaceState: true }, [
            ...chain,
            info.path
          ]);
        } else {
          location.href = new URL(navigation_result.redirect, location.href).href;
        }
        return;
      }
    }
    if (navigation_result.reload) {
      location.reload();
    } else if (this.started) {
      this.current = navigation_result.state;
      this.root.$set(navigation_result.props);
      this.stores.navigating.set(null);
      await 0;
    } else {
      this._init(navigation_result);
    }
    dispatchEvent(new CustomEvent("sveltekit:navigation-end"));
    this.loading.promise = null;
    this.loading.id = null;
    const leaf_node = navigation_result.state.branch[navigation_result.state.branch.length - 1];
    if (leaf_node && leaf_node.module.router === false) {
      this.router.disable();
    } else {
      this.router.enable();
    }
  }
  load(info) {
    this.loading.promise = this._get_navigation_result(info, false);
    this.loading.id = info.id;
    return this.loading.promise;
  }
  invalidate(href) {
    this.invalid.add(href);
    if (!this.invalidating) {
      this.invalidating = Promise.resolve().then(async () => {
        const info = this.router.parse(new URL(location.href));
        await this.update(info, [], true);
        this.invalidating = null;
      });
    }
    return this.invalidating;
  }
  _init(result) {
    this.current = result.state;
    const style = document.querySelector("style[data-svelte]");
    if (style)
      style.remove();
    this.root = new this.Root({
      target: this.target,
      props: __spreadValues({
        stores: this.stores
      }, result.props),
      hydrate: true
    });
    this.started = true;
  }
  async _get_navigation_result(info, no_cache) {
    if (this.loading.id === info.id) {
      return this.loading.promise;
    }
    for (let i = 0; i < info.routes.length; i += 1) {
      const route = info.routes[i];
      if (route.length === 1) {
        return { reload: true };
      }
      let j = i + 1;
      while (j < info.routes.length) {
        const next = info.routes[j];
        if (next[0].toString() === route[0].toString()) {
          if (next.length !== 1)
            next[1].forEach((loader) => loader());
          j += 1;
        } else {
          break;
        }
      }
      const result = await this._load({
        route,
        path: info.path,
        query: info.query
      }, no_cache);
      if (result)
        return result;
    }
    return await this._load_error({
      status: 404,
      error: new Error(`Not found: ${info.path}`),
      path: info.path,
      query: info.query
    });
  }
  async _get_navigation_result_from_branch({ page, branch }) {
    const filtered = branch.filter(Boolean);
    const result = {
      state: {
        page,
        branch,
        session_id: this.session_id
      },
      props: {
        components: filtered.map((node) => node.module.default)
      }
    };
    for (let i = 0; i < filtered.length; i += 1) {
      if (filtered[i].loaded)
        result.props[`props_${i}`] = await filtered[i].loaded.props;
    }
    if (!this.current.page || page.path !== this.current.page.path || page.query.toString() !== this.current.page.query.toString()) {
      result.props.page = page;
    }
    const leaf = filtered[filtered.length - 1];
    const maxage = leaf.loaded && leaf.loaded.maxage;
    if (maxage) {
      const key = `${page.path}?${page.query}`;
      let ready = false;
      const clear = () => {
        if (this.cache.get(key) === result) {
          this.cache.delete(key);
        }
        unsubscribe();
        clearTimeout(timeout);
      };
      const timeout = setTimeout(clear, maxage * 1e3);
      const unsubscribe = this.stores.session.subscribe(() => {
        if (ready)
          clear();
      });
      ready = true;
      this.cache.set(key, result);
    }
    return result;
  }
  async _load_node({ status, error, module, page, context }) {
    const node = {
      module,
      uses: {
        params: new Set(),
        path: false,
        query: false,
        session: false,
        context: false,
        dependencies: []
      },
      loaded: null,
      context
    };
    const params = {};
    for (const key in page.params) {
      Object.defineProperty(params, key, {
        get() {
          node.uses.params.add(key);
          return page.params[key];
        },
        enumerable: true
      });
    }
    const session = this.$session;
    if (module.load) {
      const { started } = this;
      const load_input = {
        page: {
          host: page.host,
          params,
          get path() {
            node.uses.path = true;
            return page.path;
          },
          get query() {
            node.uses.query = true;
            return page.query;
          }
        },
        get session() {
          node.uses.session = true;
          return session;
        },
        get context() {
          node.uses.context = true;
          return __spreadValues({}, context);
        },
        fetch(resource, info) {
          const url = typeof resource === "string" ? resource : resource.url;
          const { href } = new URL(url, new URL(page.path, document.baseURI));
          node.uses.dependencies.push(href);
          return started ? fetch(resource, info) : initial_fetch(resource, info);
        }
      };
      if (error) {
        load_input.status = status;
        load_input.error = error;
      }
      const loaded = await module.load.call(null, load_input);
      if (!loaded)
        return;
      node.loaded = normalize(loaded);
      if (node.loaded.context)
        node.context = node.loaded.context;
    }
    return node;
  }
  async _load({ route, path, query }, no_cache) {
    const key = `${path}?${query}`;
    if (!no_cache && this.cache.has(key)) {
      return this.cache.get(key);
    }
    const [pattern, a, b, get_params] = route;
    const params = get_params ? get_params(pattern.exec(path)) : {};
    const changed = this.current.page && {
      path: path !== this.current.page.path,
      params: Object.keys(params).filter((key2) => this.current.page.params[key2] !== params[key2]),
      query: query.toString() !== this.current.page.query.toString(),
      session: this.session_id !== this.current.session_id
    };
    const page = { host: this.host, path, query, params };
    const branch = [];
    let context = {};
    let context_changed = false;
    let status = 200;
    let error = null;
    a.forEach((loader) => loader());
    load:
      for (let i = 0; i < a.length; i += 1) {
        let node;
        try {
          if (!a[i])
            continue;
          const module = await a[i]();
          const previous = this.current.branch[i];
          const changed_since_last_render = !previous || module !== previous.module || changed.path && previous.uses.path || changed.params.some((param) => previous.uses.params.has(param)) || changed.query && previous.uses.query || changed.session && previous.uses.session || previous.uses.dependencies.some((dep) => this.invalid.has(dep)) || context_changed && previous.uses.context;
          if (changed_since_last_render) {
            node = await this._load_node({
              module,
              page,
              context
            });
            const is_leaf = i === a.length - 1;
            if (node && node.loaded) {
              if (node.loaded.error) {
                status = node.loaded.status;
                error = node.loaded.error;
              }
              if (node.loaded.redirect) {
                return {
                  redirect: node.loaded.redirect
                };
              }
              if (node.loaded.context) {
                context_changed = true;
              }
            } else if (is_leaf && module.load) {
              return;
            }
          } else {
            node = previous;
          }
        } catch (e) {
          status = 500;
          error = e;
        }
        if (error) {
          while (i--) {
            if (b[i]) {
              let error_loaded;
              let node_loaded;
              let j = i;
              while (!(node_loaded = branch[j])) {
                j -= 1;
              }
              try {
                error_loaded = await this._load_node({
                  status,
                  error,
                  module: await b[i](),
                  page,
                  context: node_loaded.context
                });
                if (error_loaded.loaded.error) {
                  continue;
                }
                branch.push(error_loaded);
                break load;
              } catch (e) {
                continue;
              }
            }
          }
          return await this._load_error({
            status,
            error,
            path,
            query
          });
        } else {
          if (node && node.loaded && node.loaded.context) {
            context = __spreadValues(__spreadValues({}, context), node.loaded.context);
          }
          branch.push(node);
        }
      }
    return await this._get_navigation_result_from_branch({ page, branch });
  }
  async _load_error({ status, error, path, query }) {
    const page = {
      host: this.host,
      path,
      query,
      params: {}
    };
    const node = await this._load_node({
      module: await this.fallback[0],
      page,
      context: {}
    });
    const branch = [
      node,
      await this._load_node({
        status,
        error,
        module: await this.fallback[1],
        page,
        context: node && node.loaded && node.loaded.context
      })
    ];
    return await this._get_navigation_result_from_branch({ page, branch });
  }
}
async function start({ paths, target, session, host, route, spa, trailing_slash, hydrate }) {
  const router = route && new Router({
    base: paths.base,
    routes,
    trailing_slash
  });
  const renderer = new Renderer({
    Root,
    fallback,
    target,
    session,
    host
  });
  set_paths(paths);
  if (hydrate)
    await renderer.start(hydrate);
  if (route)
    router.init(renderer);
  if (spa)
    router.goto(location.href, { replaceState: true }, []);
  dispatchEvent(new CustomEvent("sveltekit:start"));
}
export { start };
//# sourceMappingURL=start-7f1f5dd8.js.map
