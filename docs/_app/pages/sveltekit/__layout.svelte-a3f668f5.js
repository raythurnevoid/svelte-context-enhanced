import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, k as space, a9 as svg_element, t as text, c as claim_element, a as children, d as detach, n as claim_space, g as claim_text, b as attr, aa as toggle_class, f as insert, O as append, a1 as noop, U as component_subscribe, G as create_slot, j as create_component, m as claim_component, o as mount_component, H as update_slot, v as transition_in, r as transition_out, w as destroy_component } from "../../chunks/vendor-4b28337c.js";
import { p as page } from "../../chunks/stores-acb2cdbf.js";
/* empty css                         */var logo = "/svelte-context-enhanced/_app/assets/svelte-logo.87df40b8.svg";
var index_svelte_svelte_type_style_lang = "header.svelte-1twf6mk.svelte-1twf6mk{display:flex;justify-content:space-between}.corner.svelte-1twf6mk.svelte-1twf6mk{width:3em;height:3em}.corner.svelte-1twf6mk a.svelte-1twf6mk{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-1twf6mk img.svelte-1twf6mk{width:2em;height:2em;object-fit:contain}nav.svelte-1twf6mk.svelte-1twf6mk{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1twf6mk.svelte-1twf6mk{width:2em;height:3em;display:block}path.svelte-1twf6mk.svelte-1twf6mk{fill:var(--background)}ul.svelte-1twf6mk.svelte-1twf6mk{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1twf6mk.svelte-1twf6mk{position:relative;height:100%}li.active.svelte-1twf6mk.svelte-1twf6mk::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-1twf6mk a.svelte-1twf6mk{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:10%;text-decoration:none;transition:color 0.2s linear}a.svelte-1twf6mk.svelte-1twf6mk:hover{color:var(--accent-color)}";
function create_fragment$1(ctx) {
  let header;
  let div0;
  let a0;
  let img;
  let img_src_value;
  let t0;
  let nav;
  let svg0;
  let path0;
  let t1;
  let ul;
  let li0;
  let a1;
  let t2;
  let t3;
  let li1;
  let a2;
  let t4;
  let t5;
  let li2;
  let a3;
  let t6;
  let t7;
  let svg1;
  let path1;
  let t8;
  let div1;
  return {
    c() {
      header = element("header");
      div0 = element("div");
      a0 = element("a");
      img = element("img");
      t0 = space();
      nav = element("nav");
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t1 = space();
      ul = element("ul");
      li0 = element("li");
      a1 = element("a");
      t2 = text("Home");
      t3 = space();
      li1 = element("li");
      a2 = element("a");
      t4 = text("About");
      t5 = space();
      li2 = element("li");
      a3 = element("a");
      t6 = text("Todos");
      t7 = space();
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      t8 = space();
      div1 = element("div");
      this.h();
    },
    l(nodes) {
      header = claim_element(nodes, "HEADER", { class: true });
      var header_nodes = children(header);
      div0 = claim_element(header_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      a0 = claim_element(div0_nodes, "A", { href: true, class: true });
      var a0_nodes = children(a0);
      img = claim_element(a0_nodes, "IMG", { src: true, alt: true, class: true });
      a0_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t0 = claim_space(header_nodes);
      nav = claim_element(header_nodes, "NAV", { class: true });
      var nav_nodes = children(nav);
      svg0 = claim_element(nav_nodes, "svg", {
        viewBox: true,
        "aria-hidden": true,
        class: true
      }, 1);
      var svg0_nodes = children(svg0);
      path0 = claim_element(svg0_nodes, "path", { d: true, class: true }, 1);
      children(path0).forEach(detach);
      svg0_nodes.forEach(detach);
      t1 = claim_space(nav_nodes);
      ul = claim_element(nav_nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      li0 = claim_element(ul_nodes, "LI", { class: true });
      var li0_nodes = children(li0);
      a1 = claim_element(li0_nodes, "A", {
        "sveltekit:prefetch": true,
        href: true,
        class: true
      });
      var a1_nodes = children(a1);
      t2 = claim_text(a1_nodes, "Home");
      a1_nodes.forEach(detach);
      li0_nodes.forEach(detach);
      t3 = claim_space(ul_nodes);
      li1 = claim_element(ul_nodes, "LI", { class: true });
      var li1_nodes = children(li1);
      a2 = claim_element(li1_nodes, "A", {
        "sveltekit:prefetch": true,
        href: true,
        class: true
      });
      var a2_nodes = children(a2);
      t4 = claim_text(a2_nodes, "About");
      a2_nodes.forEach(detach);
      li1_nodes.forEach(detach);
      t5 = claim_space(ul_nodes);
      li2 = claim_element(ul_nodes, "LI", { class: true });
      var li2_nodes = children(li2);
      a3 = claim_element(li2_nodes, "A", {
        "sveltekit:prefetch": true,
        href: true,
        class: true
      });
      var a3_nodes = children(a3);
      t6 = claim_text(a3_nodes, "Todos");
      a3_nodes.forEach(detach);
      li2_nodes.forEach(detach);
      ul_nodes.forEach(detach);
      t7 = claim_space(nav_nodes);
      svg1 = claim_element(nav_nodes, "svg", {
        viewBox: true,
        "aria-hidden": true,
        class: true
      }, 1);
      var svg1_nodes = children(svg1);
      path1 = claim_element(svg1_nodes, "path", { d: true, class: true }, 1);
      children(path1).forEach(detach);
      svg1_nodes.forEach(detach);
      nav_nodes.forEach(detach);
      t8 = claim_space(header_nodes);
      div1 = claim_element(header_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div1_nodes.forEach(detach);
      header_nodes.forEach(detach);
      this.h();
    },
    h() {
      if (img.src !== (img_src_value = logo))
        attr(img, "src", img_src_value);
      attr(img, "alt", "SvelteKit");
      attr(img, "class", "svelte-1twf6mk");
      attr(a0, "href", "https://kit.svelte.dev");
      attr(a0, "class", "svelte-1twf6mk");
      attr(div0, "class", "corner svelte-1twf6mk");
      attr(path0, "d", "M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z");
      attr(path0, "class", "svelte-1twf6mk");
      attr(svg0, "viewBox", "0 0 2 3");
      attr(svg0, "aria-hidden", "true");
      attr(svg0, "class", "svelte-1twf6mk");
      attr(a1, "sveltekit:prefetch", "");
      attr(a1, "href", "/sveltekit");
      attr(a1, "class", "svelte-1twf6mk");
      attr(li0, "class", "svelte-1twf6mk");
      toggle_class(li0, "active", ctx[0].path === "/sveltekit");
      attr(a2, "sveltekit:prefetch", "");
      attr(a2, "href", "/sveltekit/about");
      attr(a2, "class", "svelte-1twf6mk");
      attr(li1, "class", "svelte-1twf6mk");
      toggle_class(li1, "active", ctx[0].path === "/sveltekit/about");
      attr(a3, "sveltekit:prefetch", "");
      attr(a3, "href", "/sveltekit/todos");
      attr(a3, "class", "svelte-1twf6mk");
      attr(li2, "class", "svelte-1twf6mk");
      toggle_class(li2, "active", ctx[0].path === "/sveltekit/todos");
      attr(ul, "class", "svelte-1twf6mk");
      attr(path1, "d", "M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z");
      attr(path1, "class", "svelte-1twf6mk");
      attr(svg1, "viewBox", "0 0 2 3");
      attr(svg1, "aria-hidden", "true");
      attr(svg1, "class", "svelte-1twf6mk");
      attr(nav, "class", "svelte-1twf6mk");
      attr(div1, "class", "corner svelte-1twf6mk");
      attr(header, "class", "svelte-1twf6mk");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      append(header, div0);
      append(div0, a0);
      append(a0, img);
      append(header, t0);
      append(header, nav);
      append(nav, svg0);
      append(svg0, path0);
      append(nav, t1);
      append(nav, ul);
      append(ul, li0);
      append(li0, a1);
      append(a1, t2);
      append(ul, t3);
      append(ul, li1);
      append(li1, a2);
      append(a2, t4);
      append(ul, t5);
      append(ul, li2);
      append(li2, a3);
      append(a3, t6);
      append(nav, t7);
      append(nav, svg1);
      append(svg1, path1);
      append(header, t8);
      append(header, div1);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        toggle_class(li0, "active", ctx2[0].path === "/sveltekit");
      }
      if (dirty & 1) {
        toggle_class(li1, "active", ctx2[0].path === "/sveltekit/about");
      }
      if (dirty & 1) {
        toggle_class(li2, "active", ctx2[0].path === "/sveltekit/todos");
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(header);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $page;
  component_subscribe($$self, page, ($$value) => $$invalidate(0, $page = $$value));
  return [$page];
}
class Header extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
var __layout_svelte_svelte_type_style_lang = "main.svelte-1izrdc8.svelte-1izrdc8{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:1024px;margin:0 auto;box-sizing:border-box}footer.svelte-1izrdc8.svelte-1izrdc8{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px}footer.svelte-1izrdc8 a.svelte-1izrdc8{font-weight:bold}@media(min-width: 480px){footer.svelte-1izrdc8.svelte-1izrdc8{padding:40px 0}}";
function create_fragment(ctx) {
  let header;
  let t0;
  let main;
  let t1;
  let footer;
  let p;
  let t2;
  let a;
  let t3;
  let t4;
  let current;
  header = new Header({});
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], null);
  return {
    c() {
      create_component(header.$$.fragment);
      t0 = space();
      main = element("main");
      if (default_slot)
        default_slot.c();
      t1 = space();
      footer = element("footer");
      p = element("p");
      t2 = text("visit ");
      a = element("a");
      t3 = text("kit.svelte.dev");
      t4 = text(" to learn SvelteKit");
      this.h();
    },
    l(nodes) {
      claim_component(header.$$.fragment, nodes);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      if (default_slot)
        default_slot.l(main_nodes);
      main_nodes.forEach(detach);
      t1 = claim_space(nodes);
      footer = claim_element(nodes, "FOOTER", { class: true });
      var footer_nodes = children(footer);
      p = claim_element(footer_nodes, "P", {});
      var p_nodes = children(p);
      t2 = claim_text(p_nodes, "visit ");
      a = claim_element(p_nodes, "A", { href: true, class: true });
      var a_nodes = children(a);
      t3 = claim_text(a_nodes, "kit.svelte.dev");
      a_nodes.forEach(detach);
      t4 = claim_text(p_nodes, " to learn SvelteKit");
      p_nodes.forEach(detach);
      footer_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(main, "class", "svelte-1izrdc8");
      attr(a, "href", "https://kit.svelte.dev");
      attr(a, "class", "svelte-1izrdc8");
      attr(footer, "class", "svelte-1izrdc8");
    },
    m(target, anchor) {
      mount_component(header, target, anchor);
      insert(target, t0, anchor);
      insert(target, main, anchor);
      if (default_slot) {
        default_slot.m(main, null);
      }
      insert(target, t1, anchor);
      insert(target, footer, anchor);
      append(footer, p);
      append(p, t2);
      append(p, a);
      append(a, t3);
      append(p, t4);
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
      transition_in(header.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(header.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      destroy_component(header, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(main);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(footer);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class _layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export default _layout;
//# sourceMappingURL=__layout.svelte-a3f668f5.js.map
