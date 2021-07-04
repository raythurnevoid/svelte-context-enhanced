import { S as SvelteComponent, i as init, s as safe_not_equal, k as space, e as element, t as text, $ as query_selector_all, d as detach, n as claim_space, c as claim_element, a as children, g as claim_text, b as attr, f as insert, O as append, a1 as noop } from "../../chunks/vendor-4b28337c.js";
const browser = true;
const dev = false;
var about_svelte_svelte_type_style_lang = ".content.svelte-cf77e8{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto}";
function create_fragment(ctx) {
  let t0;
  let div;
  let h1;
  let t1;
  let t2;
  let p0;
  let t3;
  let a0;
  let t4;
  let t5;
  let t6;
  let pre;
  let t7;
  let t8;
  let p1;
  let t9;
  let t10;
  let p2;
  let t11;
  let a1;
  let t12;
  let t13;
  return {
    c() {
      t0 = space();
      div = element("div");
      h1 = element("h1");
      t1 = text("About this app");
      t2 = space();
      p0 = element("p");
      t3 = text("This is a ");
      a0 = element("a");
      t4 = text("SvelteKit");
      t5 = text(" app. You can make your own by typing the\r\n		following into your command line and following the prompts:");
      t6 = space();
      pre = element("pre");
      t7 = text("npm init svelte@next");
      t8 = space();
      p1 = element("p");
      t9 = text("The page you're looking at is purely static HTML, with no client-side interactivity needed.\r\n		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\r\n		the devtools network panel and reloading.");
      t10 = space();
      p2 = element("p");
      t11 = text("The ");
      a1 = element("a");
      t12 = text("TODOs");
      t13 = text(" page illustrates SvelteKit's data loading and form handling. Try using\r\n		it with JavaScript disabled!");
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-1ine71f"]', document.head);
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "About this app");
      h1_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "This is a ");
      a0 = claim_element(p0_nodes, "A", { href: true });
      var a0_nodes = children(a0);
      t4 = claim_text(a0_nodes, "SvelteKit");
      a0_nodes.forEach(detach);
      t5 = claim_text(p0_nodes, " app. You can make your own by typing the\r\n		following into your command line and following the prompts:");
      p0_nodes.forEach(detach);
      t6 = claim_space(div_nodes);
      pre = claim_element(div_nodes, "PRE", {});
      var pre_nodes = children(pre);
      t7 = claim_text(pre_nodes, "npm init svelte@next");
      pre_nodes.forEach(detach);
      t8 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      t9 = claim_text(p1_nodes, "The page you're looking at is purely static HTML, with no client-side interactivity needed.\r\n		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening\r\n		the devtools network panel and reloading.");
      p1_nodes.forEach(detach);
      t10 = claim_space(div_nodes);
      p2 = claim_element(div_nodes, "P", {});
      var p2_nodes = children(p2);
      t11 = claim_text(p2_nodes, "The ");
      a1 = claim_element(p2_nodes, "A", { href: true });
      var a1_nodes = children(a1);
      t12 = claim_text(a1_nodes, "TODOs");
      a1_nodes.forEach(detach);
      t13 = claim_text(p2_nodes, " page illustrates SvelteKit's data loading and form handling. Try using\r\n		it with JavaScript disabled!");
      p2_nodes.forEach(detach);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "About";
      attr(a0, "href", "https://kit.svelte.dev");
      attr(a1, "href", "./todos");
      attr(div, "class", "content svelte-cf77e8");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, div, anchor);
      append(div, h1);
      append(h1, t1);
      append(div, t2);
      append(div, p0);
      append(p0, t3);
      append(p0, a0);
      append(a0, t4);
      append(p0, t5);
      append(div, t6);
      append(div, pre);
      append(pre, t7);
      append(div, t8);
      append(div, p1);
      append(p1, t9);
      append(div, t10);
      append(div, p2);
      append(p2, t11);
      append(p2, a1);
      append(a1, t12);
      append(p2, t13);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
    }
  };
}
const hydrate = dev;
const router = browser;
const prerender = true;
class About extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export default About;
export { hydrate, prerender, router };
//# sourceMappingURL=about.svelte-bef4e7ae.js.map
