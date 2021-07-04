import { S as SvelteComponent, i as init, D as not_equal, T as TopAppBar_1$1, e as element, j as create_component, c as claim_element, a as children, m as claim_component, d as detach, b as attr, f as insert, o as mount_component, v as transition_in, r as transition_out, w as destroy_component, E as createEventDispatcher, F as Section, G as create_slot, H as update_slot, I as Title, k as space, n as claim_space, B as group_outros, u as check_outros, N as NavigationIcon, J as Icon, t as text, g as claim_text, K as binding_callbacks, L as bind, M as AppContent, O as append, P as add_flush_callback, z as onMount, Q as onDestroy, R as Drawer, U as component_subscribe, V as Content, W as NavList, l as empty, X as destroy_each, Y as NavItem, Z as Content$1, _ as PrimaryText, h as set_data, s as safe_not_equal, $ as query_selector_all } from "../chunks/vendor-4b28337c.js";
/* empty css                                                       */import { p as page } from "../chunks/stores-acb2cdbf.js";
import { b as base } from "../chunks/paths-45dac81d.js";
/* empty css                      */const get_default_slot_changes = (dirty) => ({ class: dirty & 32 });
const get_default_slot_context = (ctx) => ({
  slot: "content",
  class: ctx[5]
});
function create_if_block(ctx) {
  let navigationicon;
  let current;
  navigationicon = new NavigationIcon({
    props: {
      $$slots: { default: [create_default_slot_3$1] },
      $$scope: { ctx }
    }
  });
  navigationicon.$on("click", ctx[3]);
  return {
    c() {
      create_component(navigationicon.$$.fragment);
    },
    l(nodes) {
      claim_component(navigationicon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(navigationicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navigationicon_changes = {};
      if (dirty & 16) {
        navigationicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      navigationicon.$set(navigationicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navigationicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navigationicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navigationicon, detaching);
    }
  };
}
function create_default_slot_4$1(ctx) {
  let t;
  return {
    c() {
      t = text("menu");
    },
    l(nodes) {
      t = claim_text(nodes, "menu");
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
function create_default_slot_3$1(ctx) {
  let icon;
  let current;
  icon = new Icon({
    props: {
      $$slots: { default: [create_default_slot_4$1] },
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
      if (dirty & 16) {
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
function create_default_slot_2$1(ctx) {
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
function create_default_slot_1$2(ctx) {
  let t;
  let title;
  let current;
  let if_block = ctx[0] && create_if_block(ctx);
  title = new Title({
    props: {
      $$slots: { default: [create_default_slot_2$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      create_component(title.$$.fragment);
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      claim_component(title.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(title, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const title_changes = {};
      if (dirty & 16) {
        title_changes.$$scope = { dirty, ctx: ctx2 };
      }
      title.$set(title_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(title.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(title.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      destroy_component(title, detaching);
    }
  };
}
function create_default_slot$3(ctx) {
  let section;
  let current;
  section = new Section({
    props: {
      $$slots: { default: [create_default_slot_1$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(section.$$.fragment);
    },
    l(nodes) {
      claim_component(section.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(section, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const section_changes = {};
      if (dirty & 17) {
        section_changes.$$scope = { dirty, ctx: ctx2 };
      }
      section.$set(section_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(section.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(section.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(section, detaching);
    }
  };
}
function create_content_slot(ctx) {
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[4], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 48)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[4], !current ? -1 : dirty, get_default_slot_changes, get_default_slot_context);
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
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let div;
  let topappbar;
  let current;
  topappbar = new TopAppBar_1$1({
    props: {
      class: "top-app-bar",
      $$slots: {
        content: [
          create_content_slot,
          ({ contentClass }) => ({ 5: contentClass }),
          ({ contentClass }) => contentClass ? 32 : 0
        ],
        default: [
          create_default_slot$3,
          ({ contentClass }) => ({ 5: contentClass }),
          ({ contentClass }) => contentClass ? 32 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(topappbar.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(topappbar.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "svelte-wmpop3");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(topappbar, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const topappbar_changes = {};
      if (dirty & 49) {
        topappbar_changes.$$scope = { dirty, ctx: ctx2 };
      }
      topappbar.$set(topappbar_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(topappbar.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(topappbar.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(topappbar);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch = createEventDispatcher();
  let { showMenuBtn = false } = $$props;
  const click_handler = () => dispatch("navButtonClick");
  $$self.$$set = ($$props2) => {
    if ("showMenuBtn" in $$props2)
      $$invalidate(0, showMenuBtn = $$props2.showMenuBtn);
    if ("$$scope" in $$props2)
      $$invalidate(4, $$scope = $$props2.$$scope);
  };
  return [showMenuBtn, dispatch, slots, click_handler, $$scope];
}
class TopAppBar_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, not_equal, { showMenuBtn: 0 });
  }
}
function create_default_slot_1$1(ctx) {
  let main;
  let main_class_value;
  let current;
  const default_slot_template = ctx[2].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  return {
    c() {
      main = element("main");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      if (default_slot)
        default_slot.l(main_nodes);
      main_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(main, "class", main_class_value = ctx[8]);
    },
    m(target, anchor) {
      insert(target, main, anchor);
      if (default_slot) {
        default_slot.m(main, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      if (!current || dirty & 256 && main_class_value !== (main_class_value = ctx2[8])) {
        attr(main, "class", main_class_value);
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
        detach(main);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot$2(ctx) {
  let topappbar;
  let current;
  topappbar = new TopAppBar_1({
    props: {
      showMenuBtn: ctx[1],
      $$slots: {
        default: [
          create_default_slot_1$1,
          ({ class: contentClass }) => ({ 8: contentClass }),
          ({ class: contentClass }) => contentClass ? 256 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  topappbar.$on("navButtonClick", ctx[4]);
  return {
    c() {
      create_component(topappbar.$$.fragment);
    },
    l(nodes) {
      claim_component(topappbar.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(topappbar, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const topappbar_changes = {};
      if (dirty & 2)
        topappbar_changes.showMenuBtn = ctx2[1];
      if (dirty & 288) {
        topappbar_changes.$$scope = { dirty, ctx: ctx2 };
      }
      topappbar.$set(topappbar_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(topappbar.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(topappbar.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(topappbar, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let drawer;
  let updating_open;
  let t;
  let appcontent;
  let current;
  function drawer_open_binding(value) {
    ctx[3](value);
  }
  let drawer_props = { dismissible: ctx[1] };
  if (ctx[0] !== void 0) {
    drawer_props.open = ctx[0];
  }
  drawer = new Drawer_1({ props: drawer_props });
  binding_callbacks.push(() => bind(drawer, "open", drawer_open_binding));
  appcontent = new AppContent({
    props: {
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(drawer.$$.fragment);
      t = space();
      create_component(appcontent.$$.fragment);
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      claim_component(drawer.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      claim_component(appcontent.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(drawer, div, null);
      append(div, t);
      mount_component(appcontent, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const drawer_changes = {};
      if (dirty & 2)
        drawer_changes.dismissible = ctx2[1];
      if (!updating_open && dirty & 1) {
        updating_open = true;
        drawer_changes.open = ctx2[0];
        add_flush_callback(() => updating_open = false);
      }
      drawer.$set(drawer_changes);
      const appcontent_changes = {};
      if (dirty & 35) {
        appcontent_changes.$$scope = { dirty, ctx: ctx2 };
      }
      appcontent.$set(appcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(drawer.$$.fragment, local);
      transition_in(appcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(drawer.$$.fragment, local);
      transition_out(appcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(drawer);
      destroy_component(appcontent);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let open = true;
  let dismissible = false;
  let tabletMedia;
  onMount(() => {
    tabletMedia = window.matchMedia("(max-width: 960px)");
    tabletMedia.addEventListener("change", handleTabletMediaChange);
    handleTabletMediaChange();
  });
  onDestroy(() => {
    tabletMedia === null || tabletMedia === void 0 ? void 0 : tabletMedia.removeEventListener("change", handleTabletMediaChange);
  });
  function handleTabletMediaChange() {
    if (tabletMedia.matches) {
      $$invalidate(1, dismissible = true);
    } else {
      $$invalidate(1, dismissible = false);
    }
  }
  function drawer_open_binding(value) {
    open = value;
    $$invalidate(0, open);
  }
  const navButtonClick_handler = () => $$invalidate(0, open = true);
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [open, dismissible, slots, drawer_open_binding, navButtonClick_handler, $$scope];
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, not_equal, {});
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}
function create_default_slot_5(ctx) {
  let t_value = ctx[5].label + "";
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
    p(ctx2, dirty) {
      if (dirty & 4 && t_value !== (t_value = ctx2[5].label + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_4(ctx) {
  let primarytext;
  let current;
  primarytext = new PrimaryText({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(primarytext.$$.fragment);
    },
    l(nodes) {
      claim_component(primarytext.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(primarytext, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const primarytext_changes = {};
      if (dirty & 260) {
        primarytext_changes.$$scope = { dirty, ctx: ctx2 };
      }
      primarytext.$set(primarytext_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(primarytext.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(primarytext.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(primarytext, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let navitemcontent;
  let t;
  let current;
  navitemcontent = new Content$1({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(navitemcontent.$$.fragment);
      t = space();
    },
    l(nodes) {
      claim_component(navitemcontent.$$.fragment, nodes);
      t = claim_space(nodes);
    },
    m(target, anchor) {
      mount_component(navitemcontent, target, anchor);
      insert(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navitemcontent_changes = {};
      if (dirty & 260) {
        navitemcontent_changes.$$scope = { dirty, ctx: ctx2 };
      }
      navitemcontent.$set(navitemcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navitemcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navitemcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navitemcontent, detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block(ctx) {
  let navitem;
  let current;
  navitem = new NavItem({
    props: {
      href: ctx[5].href,
      activated: ctx[5].activated,
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(navitem.$$.fragment);
    },
    l(nodes) {
      claim_component(navitem.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(navitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navitem_changes = {};
      if (dirty & 4)
        navitem_changes.href = ctx2[5].href;
      if (dirty & 4)
        navitem_changes.activated = ctx2[5].activated;
      if (dirty & 260) {
        navitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      navitem.$set(navitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navitem, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ctx[2];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 4) {
        each_value = ctx2[2];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_default_slot_1(ctx) {
  let navlist;
  let current;
  navlist = new NavList({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(navlist.$$.fragment);
    },
    l(nodes) {
      claim_component(navlist.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(navlist, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const navlist_changes = {};
      if (dirty & 260) {
        navlist_changes.$$scope = { dirty, ctx: ctx2 };
      }
      navlist.$set(navlist_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(navlist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(navlist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(navlist, detaching);
    }
  };
}
function create_default_slot$1(ctx) {
  let content;
  let current;
  content = new Content({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(content.$$.fragment);
    },
    l(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const content_changes = {};
      if (dirty & 260) {
        content_changes.$$scope = { dirty, ctx: ctx2 };
      }
      content.$set(content_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(content, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let drawer;
  let updating_open;
  let current;
  function drawer_open_binding(value) {
    ctx[4](value);
  }
  let drawer_props = {
    class: "svmd-site-drawer",
    variant: ctx[1] ? "modal" : "permanent",
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    drawer_props.open = ctx[0];
  }
  drawer = new Drawer({ props: drawer_props });
  binding_callbacks.push(() => bind(drawer, "open", drawer_open_binding));
  return {
    c() {
      create_component(drawer.$$.fragment);
    },
    l(nodes) {
      claim_component(drawer.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(drawer, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const drawer_changes = {};
      if (dirty & 2)
        drawer_changes.variant = ctx2[1] ? "modal" : "permanent";
      if (dirty & 260) {
        drawer_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_open && dirty & 1) {
        updating_open = true;
        drawer_changes.open = ctx2[0];
        add_flush_callback(() => updating_open = false);
      }
      drawer.$set(drawer_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(drawer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(drawer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(drawer, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let links;
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(3, $page = $$value));
  let { open = false } = $$props;
  let { dismissible = false } = $$props;
  function drawer_open_binding(value) {
    open = value;
    $$invalidate(0, open);
  }
  $$self.$$set = ($$props2) => {
    if ("open" in $$props2)
      $$invalidate(0, open = $$props2.open);
    if ("dismissible" in $$props2)
      $$invalidate(1, dismissible = $$props2.dismissible);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      $$invalidate(2, links = [
        { href: `${base}/`, label: "Main Page" },
        {
          href: `${base}/basic`,
          label: "Basic Usage"
        },
        {
          href: `${base}/store`,
          label: "Context Store"
        },
        {
          href: `${base}/advanced`,
          label: "Advanced Usage"
        }
      ].map((link) => {
        return Object.assign(Object.assign({}, link), {
          activated: base + $page.path === link.href
        });
      }));
    }
  };
  return [open, dismissible, links, $page, drawer_open_binding];
}
class Drawer_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, not_equal, { open: 0, dismissible: 1 });
  }
}
function create_default_slot(ctx) {
  let current;
  const default_slot_template = ctx[0].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[1], null);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
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
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_fragment(ctx) {
  let link0;
  let link1;
  let link2;
  let t;
  let layout;
  let current;
  layout = new Layout({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      link0 = element("link");
      link1 = element("link");
      link2 = element("link");
      t = space();
      create_component(layout.$$.fragment);
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-lptq74"]', document.head);
      link0 = claim_element(head_nodes, "LINK", { rel: true, href: true });
      link1 = claim_element(head_nodes, "LINK", { rel: true, href: true });
      link2 = claim_element(head_nodes, "LINK", { rel: true, href: true });
      head_nodes.forEach(detach);
      t = claim_space(nodes);
      claim_component(layout.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(link0, "rel", "stylesheet");
      attr(link0, "href", "https://fonts.googleapis.com/icon?family=Material+Icons");
      attr(link1, "rel", "stylesheet");
      attr(link1, "href", "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700");
      attr(link2, "rel", "stylesheet");
      attr(link2, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono");
    },
    m(target, anchor) {
      append(document.head, link0);
      append(document.head, link1);
      append(document.head, link2);
      insert(target, t, anchor);
      mount_component(layout, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const layout_changes = {};
      if (dirty & 2) {
        layout_changes.$$scope = { dirty, ctx: ctx2 };
      }
      layout.$set(layout_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(layout.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(layout.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      detach(link0);
      detach(link1);
      detach(link2);
      if (detaching)
        detach(t);
      destroy_component(layout, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [slots, $$scope];
}
class _layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export default _layout;
//# sourceMappingURL=__layout.svelte-0e1690a9.js.map
