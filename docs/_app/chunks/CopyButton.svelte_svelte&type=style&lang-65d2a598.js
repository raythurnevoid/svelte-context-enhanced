import { S as SvelteComponent, i as init, s as safe_not_equal, G as create_slot, e as element, c as claim_element, a as children, d as detach, b as attr, f as insert, H as update_slot, v as transition_in, r as transition_out, j as create_component, m as claim_component, o as mount_component, w as destroy_component, k as space, n as claim_space, O as append, B as group_outros, u as check_outros, a4 as Button_1, a5 as LeadingIcon, a6 as Label, a7 as TrailingIcon, t as text, g as claim_text, h as set_data, a8 as Typography, a2 as Prism$1 } from "./vendor-4b28337c.js";
/* empty css                                               */import { _ as __vitePreload } from "./preload-helper-bd1b951a.js";
import { b as base } from "./paths-45dac81d.js";
function create_fragment$4(ctx) {
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
      attr(div, "class", "svelte-gjwjdd");
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
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class PageContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {});
  }
}
function create_if_block_1(ctx) {
  let button;
  let current;
  button = new Button_1({
    props: {
      variant: "outlined",
      href: ctx[0].href,
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 1)
        button_changes.href = ctx2[0].href;
      if (dirty & 5) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
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
    }
  };
}
function create_default_slot_5(ctx) {
  let t;
  return {
    c() {
      t = text("arrow_back");
    },
    l(nodes) {
      t = claim_text(nodes, "arrow_back");
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
function create_default_slot_4(ctx) {
  let t_value = ctx[0].label + "";
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
      if (dirty & 1 && t_value !== (t_value = ctx2[0].label + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_3(ctx) {
  let leadingicon;
  let t;
  let label;
  let current;
  leadingicon = new LeadingIcon({
    props: {
      $$slots: { default: [create_default_slot_5] },
      $$scope: { ctx }
    }
  });
  label = new Label({
    props: {
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(leadingicon.$$.fragment);
      t = space();
      create_component(label.$$.fragment);
    },
    l(nodes) {
      claim_component(leadingicon.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(label.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(leadingicon, target, anchor);
      insert(target, t, anchor);
      mount_component(label, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const leadingicon_changes = {};
      if (dirty & 4) {
        leadingicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      leadingicon.$set(leadingicon_changes);
      const label_changes = {};
      if (dirty & 5) {
        label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      label.$set(label_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(leadingicon.$$.fragment, local);
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(leadingicon.$$.fragment, local);
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(leadingicon, detaching);
      if (detaching)
        detach(t);
      destroy_component(label, detaching);
    }
  };
}
function create_if_block(ctx) {
  let button;
  let current;
  button = new Button_1({
    props: {
      variant: "raised",
      href: ctx[1].href,
      $$slots: { default: [create_default_slot$2] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(button.$$.fragment);
    },
    l(nodes) {
      claim_component(button.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(button, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const button_changes = {};
      if (dirty & 2)
        button_changes.href = ctx2[1].href;
      if (dirty & 6) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      button.$set(button_changes);
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
    }
  };
}
function create_default_slot_2(ctx) {
  let t_value = ctx[1].label + "";
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
      if (dirty & 2 && t_value !== (t_value = ctx2[1].label + ""))
        set_data(t, t_value);
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
      t = text("arrow_forward");
    },
    l(nodes) {
      t = claim_text(nodes, "arrow_forward");
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
function create_default_slot$2(ctx) {
  let label;
  let t;
  let trailingicon;
  let current;
  label = new Label({
    props: {
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  trailingicon = new TrailingIcon({
    props: {
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(label.$$.fragment);
      t = space();
      create_component(trailingicon.$$.fragment);
    },
    l(nodes) {
      claim_component(label.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(trailingicon.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(label, target, anchor);
      insert(target, t, anchor);
      mount_component(trailingicon, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const label_changes = {};
      if (dirty & 6) {
        label_changes.$$scope = { dirty, ctx: ctx2 };
      }
      label.$set(label_changes);
      const trailingicon_changes = {};
      if (dirty & 4) {
        trailingicon_changes.$$scope = { dirty, ctx: ctx2 };
      }
      trailingicon.$set(trailingicon_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(label.$$.fragment, local);
      transition_in(trailingicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(label.$$.fragment, local);
      transition_out(trailingicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(label, detaching);
      if (detaching)
        detach(t);
      destroy_component(trailingicon, detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let footer;
  let div2;
  let div0;
  let t;
  let div1;
  let current;
  let if_block0 = ctx[0] && create_if_block_1(ctx);
  let if_block1 = ctx[1] && create_if_block(ctx);
  return {
    c() {
      footer = element("footer");
      div2 = element("div");
      div0 = element("div");
      if (if_block0)
        if_block0.c();
      t = space();
      div1 = element("div");
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      footer = claim_element(nodes, "FOOTER", { class: true });
      var footer_nodes = children(footer);
      div2 = claim_element(footer_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", {});
      var div0_nodes = children(div0);
      if (if_block0)
        if_block0.l(div0_nodes);
      div0_nodes.forEach(detach);
      t = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {});
      var div1_nodes = children(div1);
      if (if_block1)
        if_block1.l(div1_nodes);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      footer_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div2, "class", "content svelte-zamp0f");
      attr(footer, "class", "svelte-zamp0f");
    },
    m(target, anchor) {
      insert(target, footer, anchor);
      append(footer, div2);
      append(div2, div0);
      if (if_block0)
        if_block0.m(div0, null);
      append(div2, t);
      append(div2, div1);
      if (if_block1)
        if_block1.m(div1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div0, null);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[1]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(footer);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { prev = void 0 } = $$props;
  let { next = void 0 } = $$props;
  $$self.$$set = ($$props2) => {
    if ("prev" in $$props2)
      $$invalidate(0, prev = $$props2.prev);
    if ("next" in $$props2)
      $$invalidate(1, next = $$props2.next);
  };
  return [prev, next];
}
class Footer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { prev: 0, next: 1 });
  }
}
async function getFileContent(fetch, src) {
  let base64Path;
  if (typeof window !== "undefined") {
    base64Path = window.btoa(src);
    base64Path = encodeURIComponent(base64Path);
  } else {
    const { Buffer } = await __vitePreload(() => import("./__vite-browser-external-58e73a3c.js"), true ? void 0 : void 0);
    base64Path = Buffer.from(src, "utf-8").toString("base64");
  }
  const res = await fetch(`${base}/api/get-file-content.${encodeURIComponent(base64Path)}`);
  return await res.text();
}
var PageTitle_svelte_svelte_type_style_lang = ".page-title.svelte-dce1tr>*{margin-block-start:0em}";
function create_default_slot$1(ctx) {
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
function create_fragment$2(ctx) {
  let div;
  let typography;
  let current;
  typography = new Typography({
    props: {
      variant: "headline1",
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(typography.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(typography.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "page-title svelte-dce1tr");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(typography, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const typography_changes = {};
      if (dirty & 2) {
        typography_changes.$$scope = { dirty, ctx: ctx2 };
      }
      typography.$set(typography_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(typography.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(typography.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(typography);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [slots, $$scope];
}
class PageTitle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {});
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
function create_fragment$1(ctx) {
  let div;
  let typography;
  let current;
  typography = new Typography({
    props: {
      variant: "headline2",
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      div = element("div");
      create_component(typography.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      claim_component(typography.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "page-title");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(typography, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const typography_changes = {};
      if (dirty & 2) {
        typography_changes.$$scope = { dirty, ctx: ctx2 };
      }
      typography.$set(typography_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(typography.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(typography.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(typography);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [slots, $$scope];
}
class SectionTitle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
var ExampleContainer_svelte_svelte_type_style_lang = "div.svelte-uzctd{border:1px solid rgb(0 0 0 / 12%);padding:1em}";
function create_fragment(ctx) {
  let prism;
  let t;
  let codestyles;
  let current;
  prism = new Prism$1({
    props: {
      language: ctx[1],
      source: ctx[0]
    }
  });
  codestyles = new CodeStyles({});
  return {
    c() {
      create_component(prism.$$.fragment);
      t = space();
      create_component(codestyles.$$.fragment);
    },
    l(nodes) {
      claim_component(prism.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(codestyles.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(prism, target, anchor);
      insert(target, t, anchor);
      mount_component(codestyles, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const prism_changes = {};
      if (dirty & 2)
        prism_changes.language = ctx2[1];
      if (dirty & 1)
        prism_changes.source = ctx2[0];
      prism.$set(prism_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(prism.$$.fragment, local);
      transition_in(codestyles.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(prism.$$.fragment, local);
      transition_out(codestyles.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(prism, detaching);
      if (detaching)
        detach(t);
      destroy_component(codestyles, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { source } = $$props;
  let { lang = "svelte" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("source" in $$props2)
      $$invalidate(0, source = $$props2.source);
    if ("lang" in $$props2)
      $$invalidate(1, lang = $$props2.lang);
  };
  return [source, lang];
}
class Code extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { source: 0, lang: 1 });
  }
}
(function(Prism2) {
  var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: true,
    alias: "punctuation",
    inside: null
  };
  var insideString = {
    "bash": commandAfterHeredoc,
    "environment": {
      pattern: RegExp("\\$" + envVars),
      alias: "constant"
    },
    "variable": [
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: true,
        inside: {
          "variable": [
            {
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: true
            },
            /^\$\(\(/
          ],
          "number": /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          "operator": /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          "punctuation": /\(\(?|\)\)?|,|;/
        }
      },
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: true,
        inside: {
          "variable": /^\$\(|^`|\)$|`$/
        }
      },
      {
        pattern: /\$\{[^}]+\}/,
        greedy: true,
        inside: {
          "operator": /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          "punctuation": /[\[\]]/,
          "environment": {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    "entity": /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
  };
  Prism2.languages.bash = {
    "shebang": {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    "comment": {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    "function-name": [
      {
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: "function"
      },
      {
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: true
    },
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: {
        "environment": {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
          lookbehind: true,
          alias: "constant"
        }
      },
      alias: "variable",
      lookbehind: true
    },
    "string": [
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: true,
        greedy: true,
        inside: {
          "bash": commandAfterHeredoc
        }
      },
      {
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      {
        pattern: /(^|[^$\\])'[^']*'/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: true,
        inside: {
          "entity": insideString.entity
        }
      }
    ],
    "environment": {
      pattern: RegExp("\\$?" + envVars),
      alias: "constant"
    },
    "variable": insideString.variable,
    "function": {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "keyword": {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "builtin": {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: true,
      alias: "class-name"
    },
    "boolean": {
      pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    "operator": {
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    "punctuation": /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    "number": {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  commandAfterHeredoc.inside = Prism2.languages.bash;
  var toBeCopied = [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ];
  var inside = insideString.variable[1].inside;
  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism2.languages.bash[toBeCopied[i]];
  }
  Prism2.languages.shell = Prism2.languages.bash;
})(Prism);
var ShellSnippet_svelte_svelte_type_style_lang = ".shell-snippet-wrapper.svelte-safw0{position:relative}.snippet-commands.svelte-safw0{position:absolute;top:0;right:0}.snippet-commands.svelte-safw0 .command{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.snippet-commands.svelte-safw0 .command::before,.snippet-commands.svelte-safw0 .command::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}.snippet-commands.svelte-safw0 .command:hover::before,.snippet-commands.svelte-safw0 .command.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.snippet-commands.svelte-safw0 .command.mdc-ripple-upgraded--background-focused::before,.snippet-commands.svelte-safw0 .command:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.snippet-commands.svelte-safw0 .command:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.snippet-commands.svelte-safw0 .command:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.snippet-commands.svelte-safw0 .command.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}";
var FileSourceSnippet_svelte_svelte_type_style_lang = "div.svelte-ihxb8l{margin-block:1em}code.svelte-ihxb8l{background:#2d2d2d;color:#fff1a3;padding:0.8em 1em 0.2em;display:inline-block;font-size:1em}";
var CodeStyles_svelte_svelte_type_style_lang = `/**
 * prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/chriskempson/tomorrow-theme
 * @author Rose Pritchard
 */

code[class*="language-"],
pre[class*="language-"] {
	color: #ccc;
	background: none;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 1em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;

}

/* Code blocks */

pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background: #2d2d2d;
}

/* Inline code */

:not(pre) > code[class*="language-"] {
	padding: .1em;
	border-radius: .3em;
	white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #999;
}

.token.punctuation {
	color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
	color: #e2777a;
}

.token.function-name {
	color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
	color: #f08d49;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
	color: #f8c555;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
	color: #cc99cd;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
	color: #7ec699;
}

.token.operator,
.token.entity,
.token.url {
	color: #67cdcc;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.inserted {
	color: green;
}

pre[class*="language-"]{margin:0;color:#d4d4d4;flex:1;tab-size:2ch}`;
class CodeStyles extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
}
var CopyButton_svelte_svelte_type_style_lang = ".copy-button-wrapper.svelte-c1j887{position:absolute;top:0.3em;right:0}.copy-button-wrapper.svelte-c1j887 .copy-button{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.copy-button-wrapper.svelte-c1j887 .copy-button::before,.copy-button-wrapper.svelte-c1j887 .copy-button::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}.copy-button-wrapper.svelte-c1j887 .copy-button:hover::before,.copy-button-wrapper.svelte-c1j887 .copy-button.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.copy-button-wrapper.svelte-c1j887 .copy-button.mdc-ripple-upgraded--background-focused::before,.copy-button-wrapper.svelte-c1j887 .copy-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.copy-button-wrapper.svelte-c1j887 .copy-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.copy-button-wrapper.svelte-c1j887 .copy-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.copy-button-wrapper.svelte-c1j887 .copy-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}";
export { CodeStyles as C, Footer as F, PageContent as P, SectionTitle as S, PageTitle as a, Code as b, getFileContent as g };
//# sourceMappingURL=CopyButton.svelte_svelte&type=style&lang-65d2a598.js.map
