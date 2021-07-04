import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, a9 as svg_element, k as space, t as text, c as claim_element, a as children, d as detach, n as claim_space, g as claim_text, b as attr, ab as set_style, f as insert, O as append, ac as listen, h as set_data, a1 as noop, ad as run_all, ae as spring, U as component_subscribe, j as create_component, $ as query_selector_all, m as claim_component, o as mount_component, v as transition_in, r as transition_out, w as destroy_component } from "../../chunks/vendor-4b28337c.js";
var index_svelte_svelte_type_style_lang$1 = ".counter.svelte-ltn89m.svelte-ltn89m{display:flex;border-top:1px solid rgba(0, 0, 0, 0.1);border-bottom:1px solid rgba(0, 0, 0, 0.1);margin:1rem 0}.counter.svelte-ltn89m button.svelte-ltn89m{width:2em;padding:0;display:flex;align-items:center;justify-content:center;border:0;background-color:transparent;color:var(--text-color);font-size:2rem}.counter.svelte-ltn89m button.svelte-ltn89m:hover{background-color:var(--secondary-color)}svg.svelte-ltn89m.svelte-ltn89m{width:25%;height:25%}path.svelte-ltn89m.svelte-ltn89m{vector-effect:non-scaling-stroke;stroke-width:2px;stroke:var(--text-color)}.counter-viewport.svelte-ltn89m.svelte-ltn89m{width:8em;height:4em;overflow:hidden;text-align:center;position:relative}.counter-viewport.svelte-ltn89m strong.svelte-ltn89m{position:absolute;display:block;width:100%;height:100%;font-weight:400;color:var(--accent-color);font-size:4rem;display:flex;align-items:center;justify-content:center}.counter-digits.svelte-ltn89m.svelte-ltn89m{position:absolute;width:100%;height:100%}";
function create_fragment$1(ctx) {
  let div2;
  let button0;
  let svg0;
  let path0;
  let t0;
  let div1;
  let div0;
  let strong0;
  let t1_value = Math.floor(ctx[1] + 1) + "";
  let t1;
  let t2;
  let strong1;
  let t3_value = Math.floor(ctx[1]) + "";
  let t3;
  let t4;
  let button1;
  let svg1;
  let path1;
  let mounted;
  let dispose;
  return {
    c() {
      div2 = element("div");
      button0 = element("button");
      svg0 = svg_element("svg");
      path0 = svg_element("path");
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      strong0 = element("strong");
      t1 = text(t1_value);
      t2 = space();
      strong1 = element("strong");
      t3 = text(t3_value);
      t4 = space();
      button1 = element("button");
      svg1 = svg_element("svg");
      path1 = svg_element("path");
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      button0 = claim_element(div2_nodes, "BUTTON", { "aria-label": true, class: true });
      var button0_nodes = children(button0);
      svg0 = claim_element(button0_nodes, "svg", {
        "aria-hidden": true,
        viewBox: true,
        class: true
      }, 1);
      var svg0_nodes = children(svg0);
      path0 = claim_element(svg0_nodes, "path", { d: true, class: true }, 1);
      children(path0).forEach(detach);
      svg0_nodes.forEach(detach);
      button0_nodes.forEach(detach);
      t0 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true, style: true });
      var div0_nodes = children(div0);
      strong0 = claim_element(div0_nodes, "STRONG", {
        style: true,
        "aria-hidden": true,
        class: true
      });
      var strong0_nodes = children(strong0);
      t1 = claim_text(strong0_nodes, t1_value);
      strong0_nodes.forEach(detach);
      t2 = claim_space(div0_nodes);
      strong1 = claim_element(div0_nodes, "STRONG", { class: true });
      var strong1_nodes = children(strong1);
      t3 = claim_text(strong1_nodes, t3_value);
      strong1_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t4 = claim_space(div2_nodes);
      button1 = claim_element(div2_nodes, "BUTTON", { "aria-label": true, class: true });
      var button1_nodes = children(button1);
      svg1 = claim_element(button1_nodes, "svg", {
        "aria-hidden": true,
        viewBox: true,
        class: true
      }, 1);
      var svg1_nodes = children(svg1);
      path1 = claim_element(svg1_nodes, "path", { d: true, class: true }, 1);
      children(path1).forEach(detach);
      svg1_nodes.forEach(detach);
      button1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(path0, "d", "M0,0.5 L1,0.5");
      attr(path0, "class", "svelte-ltn89m");
      attr(svg0, "aria-hidden", "true");
      attr(svg0, "viewBox", "0 0 1 1");
      attr(svg0, "class", "svelte-ltn89m");
      attr(button0, "aria-label", "Decrease the counter by one");
      attr(button0, "class", "svelte-ltn89m");
      set_style(strong0, "top", "-100%");
      attr(strong0, "aria-hidden", "true");
      attr(strong0, "class", "svelte-ltn89m");
      attr(strong1, "class", "svelte-ltn89m");
      attr(div0, "class", "counter-digits svelte-ltn89m");
      set_style(div0, "transform", "translate(0, " + 100 * ctx[2] + "%)");
      attr(div1, "class", "counter-viewport svelte-ltn89m");
      attr(path1, "d", "M0,0.5 L1,0.5 M0.5,0 L0.5,1");
      attr(path1, "class", "svelte-ltn89m");
      attr(svg1, "aria-hidden", "true");
      attr(svg1, "viewBox", "0 0 1 1");
      attr(svg1, "class", "svelte-ltn89m");
      attr(button1, "aria-label", "Increase the counter by one");
      attr(button1, "class", "svelte-ltn89m");
      attr(div2, "class", "counter svelte-ltn89m");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, button0);
      append(button0, svg0);
      append(svg0, path0);
      append(div2, t0);
      append(div2, div1);
      append(div1, div0);
      append(div0, strong0);
      append(strong0, t1);
      append(div0, t2);
      append(div0, strong1);
      append(strong1, t3);
      append(div2, t4);
      append(div2, button1);
      append(button1, svg1);
      append(svg1, path1);
      if (!mounted) {
        dispose = [
          listen(button0, "click", ctx[4]),
          listen(button1, "click", ctx[5])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2 && t1_value !== (t1_value = Math.floor(ctx2[1] + 1) + ""))
        set_data(t1, t1_value);
      if (dirty & 2 && t3_value !== (t3_value = Math.floor(ctx2[1]) + ""))
        set_data(t3, t3_value);
      if (dirty & 4) {
        set_style(div0, "transform", "translate(0, " + 100 * ctx2[2] + "%)");
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div2);
      mounted = false;
      run_all(dispose);
    }
  };
}
function modulo(n, m) {
  return (n % m + m) % m;
}
function instance($$self, $$props, $$invalidate) {
  let offset;
  let $displayed_count;
  let count = 0;
  const displayed_count = spring();
  component_subscribe($$self, displayed_count, (value) => $$invalidate(1, $displayed_count = value));
  const click_handler = () => $$invalidate(0, count -= 1);
  const click_handler_1 = () => $$invalidate(0, count += 1);
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      displayed_count.set(count);
    }
    if ($$self.$$.dirty & 2) {
      $$invalidate(2, offset = modulo($displayed_count, 1));
    }
  };
  return [
    count,
    $displayed_count,
    offset,
    displayed_count,
    click_handler,
    click_handler_1
  ];
}
class Counter extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
var index_svelte_svelte_type_style_lang = "section.svelte-mjk9ig.svelte-mjk9ig{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1}h1.svelte-mjk9ig.svelte-mjk9ig{width:100%}.welcome.svelte-mjk9ig.svelte-mjk9ig{position:relative;width:100%;height:0;padding:0 0 calc(100% * 495 / 2048) 0}.welcome.svelte-mjk9ig img.svelte-mjk9ig{position:absolute;width:100%;height:100%;top:0;display:block}";
function create_fragment(ctx) {
  let t0;
  let section;
  let h1;
  let div;
  let picture;
  let source;
  let t1;
  let img;
  let img_src_value;
  let t2;
  let br;
  let t3;
  let t4;
  let h2;
  let t5;
  let strong;
  let t6;
  let t7;
  let counter;
  let current;
  counter = new Counter({});
  return {
    c() {
      t0 = space();
      section = element("section");
      h1 = element("h1");
      div = element("div");
      picture = element("picture");
      source = element("source");
      t1 = space();
      img = element("img");
      t2 = text("\r\n\r\n		to your new");
      br = element("br");
      t3 = text("SvelteKit app");
      t4 = space();
      h2 = element("h2");
      t5 = text("try editing ");
      strong = element("strong");
      t6 = text("src/routes/index.svelte");
      t7 = space();
      create_component(counter.$$.fragment);
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1anpopb"]', document.head);
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      h1 = claim_element(section_nodes, "H1", { class: true });
      var h1_nodes = children(h1);
      div = claim_element(h1_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      picture = claim_element(div_nodes, "PICTURE", {});
      var picture_nodes = children(picture);
      source = claim_element(picture_nodes, "SOURCE", { srcset: true, type: true });
      t1 = claim_space(picture_nodes);
      img = claim_element(picture_nodes, "IMG", { src: true, alt: true, class: true });
      picture_nodes.forEach(detach);
      div_nodes.forEach(detach);
      t2 = claim_text(h1_nodes, "\r\n\r\n		to your new");
      br = claim_element(h1_nodes, "BR", {});
      t3 = claim_text(h1_nodes, "SvelteKit app");
      h1_nodes.forEach(detach);
      t4 = claim_space(section_nodes);
      h2 = claim_element(section_nodes, "H2", {});
      var h2_nodes = children(h2);
      t5 = claim_text(h2_nodes, "try editing ");
      strong = claim_element(h2_nodes, "STRONG", {});
      var strong_nodes = children(strong);
      t6 = claim_text(strong_nodes, "src/routes/index.svelte");
      strong_nodes.forEach(detach);
      h2_nodes.forEach(detach);
      t7 = claim_space(section_nodes);
      claim_component(counter.$$.fragment, section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Home";
      attr(source, "srcset", "/svelte-welcome.webp");
      attr(source, "type", "image/webp");
      if (img.src !== (img_src_value = "/svelte-welcome.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Welcome");
      attr(img, "class", "svelte-mjk9ig");
      attr(div, "class", "welcome svelte-mjk9ig");
      attr(h1, "class", "svelte-mjk9ig");
      attr(section, "class", "svelte-mjk9ig");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, section, anchor);
      append(section, h1);
      append(h1, div);
      append(div, picture);
      append(picture, source);
      append(picture, t1);
      append(picture, img);
      append(h1, t2);
      append(h1, br);
      append(h1, t3);
      append(section, t4);
      append(section, h2);
      append(h2, t5);
      append(h2, strong);
      append(strong, t6);
      append(section, t7);
      mount_component(counter, section, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(counter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(counter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(section);
      destroy_component(counter);
    }
  };
}
const prerender = true;
class Sveltekit extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export default Sveltekit;
export { prerender };
//# sourceMappingURL=index.svelte-49a30693.js.map
