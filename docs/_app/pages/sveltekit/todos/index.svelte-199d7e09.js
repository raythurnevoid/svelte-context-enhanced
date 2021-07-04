import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, k as space, c as claim_element, a as children, n as claim_space, d as detach, b as attr, aa as toggle_class, f as insert, O as append, af as action_destroyer, ag as is_function, ah as fix_position, ai as add_transform, aj as create_animation, ak as add_render_callback, al as create_bidirectional_transition, ad as run_all, t as text, $ as query_selector_all, g as claim_text, am as update_keyed_each, u as check_outros, v as transition_in, r as transition_out, an as flip, ao as scale, B as group_outros, ap as fix_and_outro_and_destroy_block, a1 as noop } from "../../../chunks/vendor-4b28337c.js";
function enhance(form, {
  pending,
  error,
  result
}) {
  let current_token;
  async function handle_submit(e) {
    const token = current_token = {};
    e.preventDefault();
    const body = new FormData(form);
    if (pending)
      pending(body, form);
    try {
      const res = await fetch(form.action, {
        method: form.method,
        headers: {
          accept: "application/json"
        },
        body
      });
      if (token !== current_token)
        return;
      if (res.ok) {
        result(res, form);
      } else if (error) {
        error(res, null, form);
      } else {
        console.error(await res.text());
      }
    } catch (e2) {
      if (error) {
        error(null, e2, form);
      } else {
        throw e2;
      }
    }
  }
  form.addEventListener("submit", handle_submit);
  return {
    destroy() {
      form.removeEventListener("submit", handle_submit);
    }
  };
}
var index_svelte_svelte_type_style_lang = `.todos.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{width:100%;max-width:var(--column-width);margin:var(--column-margin-top) auto 0 auto;line-height:1}.new.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{margin:0 0 0.5rem 0}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid transparent}input.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus-visible{box-shadow:inset 1px 1px 6px rgba(0, 0, 0, 0.1);border:1px solid #ff3e00 !important;outline:none}.new.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{font-size:28px;width:100%;padding:0.5em 1em 0.3em 1em;box-sizing:border-box;background:rgba(255, 255, 255, 0.05);border-radius:8px;text-align:center}.todo.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{display:grid;grid-template-columns:2rem 1fr 2rem;grid-gap:0.5rem;align-items:center;margin:0 0 0.5rem 0;padding:0.5rem;background-color:white;border-radius:8px;filter:drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.1));transform:translate(-1px, -1px);transition:filter 0.2s, transform 0.2s}.done.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{transform:none;opacity:0.4;filter:drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))}form.text.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:relative;display:flex;align-items:center;flex:1}.todo.svelte-dmxqmd input.svelte-dmxqmd.svelte-dmxqmd{flex:1;padding:0.5em 2em 0.5em 0.8em;border-radius:3px}.todo.svelte-dmxqmd button.svelte-dmxqmd.svelte-dmxqmd{width:2em;height:2em;border:none;background-color:transparent;background-position:50% 50%;background-repeat:no-repeat}button.toggle.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{border:1px solid rgba(0, 0, 0, 0.2);border-radius:50%;box-sizing:border-box;background-size:1em auto}.done.svelte-dmxqmd .toggle.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");opacity:0.2}.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:hover,.delete.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd{position:absolute;right:0;opacity:0;background-image:url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A")}.todo.svelte-dmxqmd input.svelte-dmxqmd:focus+.save.svelte-dmxqmd,.save.svelte-dmxqmd.svelte-dmxqmd.svelte-dmxqmd:focus{transition:opacity 0.2s;opacity:1}`;
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i];
  child_ctx[7] = list;
  child_ctx[8] = i;
  return child_ctx;
}
function create_each_block(key_1, ctx) {
  let div;
  let form0;
  let input0;
  let input0_value_value;
  let t0;
  let button0;
  let button0_aria_label_value;
  let form0_action_value;
  let enhance_action;
  let t1;
  let form1;
  let input1;
  let input1_value_value;
  let t2;
  let button1;
  let form1_action_value;
  let t3;
  let form2;
  let button2;
  let form2_action_value;
  let enhance_action_2;
  let t4;
  let div_transition;
  let rect;
  let stop_animation = noop;
  let current;
  let mounted;
  let dispose;
  function enhance_function_1(...args) {
    return ctx[3](ctx[6], ctx[7], ctx[8], ...args);
  }
  function enhance_function_2() {
    return ctx[4](ctx[6]);
  }
  return {
    key: key_1,
    first: null,
    c() {
      div = element("div");
      form0 = element("form");
      input0 = element("input");
      t0 = space();
      button0 = element("button");
      t1 = space();
      form1 = element("form");
      input1 = element("input");
      t2 = space();
      button1 = element("button");
      t3 = space();
      form2 = element("form");
      button2 = element("button");
      t4 = space();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      form0 = claim_element(div_nodes, "FORM", { action: true, method: true });
      var form0_nodes = children(form0);
      input0 = claim_element(form0_nodes, "INPUT", { type: true, name: true, class: true });
      t0 = claim_space(form0_nodes);
      button0 = claim_element(form0_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button0).forEach(detach);
      form0_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      form1 = claim_element(div_nodes, "FORM", { class: true, action: true, method: true });
      var form1_nodes = children(form1);
      input1 = claim_element(form1_nodes, "INPUT", {
        "aria-label": true,
        type: true,
        name: true,
        class: true
      });
      t2 = claim_space(form1_nodes);
      button1 = claim_element(form1_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button1).forEach(detach);
      form1_nodes.forEach(detach);
      t3 = claim_space(div_nodes);
      form2 = claim_element(div_nodes, "FORM", { action: true, method: true });
      var form2_nodes = children(form2);
      button2 = claim_element(form2_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button2).forEach(detach);
      form2_nodes.forEach(detach);
      t4 = claim_space(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input0, "type", "hidden");
      attr(input0, "name", "done");
      input0.value = input0_value_value = ctx[6].done ? "" : "true";
      attr(input0, "class", "svelte-dmxqmd");
      attr(button0, "class", "toggle svelte-dmxqmd");
      attr(button0, "aria-label", button0_aria_label_value = "Mark todo as " + (ctx[6].done ? "not done" : "done"));
      attr(form0, "action", form0_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=patch");
      attr(form0, "method", "post");
      attr(input1, "aria-label", "Edit todo");
      attr(input1, "type", "text");
      attr(input1, "name", "text");
      input1.value = input1_value_value = ctx[6].text;
      attr(input1, "class", "svelte-dmxqmd");
      attr(button1, "class", "save svelte-dmxqmd");
      attr(button1, "aria-label", "Save todo");
      attr(form1, "class", "text svelte-dmxqmd");
      attr(form1, "action", form1_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=patch");
      attr(form1, "method", "post");
      attr(button2, "class", "delete svelte-dmxqmd");
      attr(button2, "aria-label", "Delete todo");
      attr(form2, "action", form2_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=delete");
      attr(form2, "method", "post");
      attr(div, "class", "todo svelte-dmxqmd");
      toggle_class(div, "done", ctx[6].done);
      this.first = div;
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, form0);
      append(form0, input0);
      append(form0, t0);
      append(form0, button0);
      append(div, t1);
      append(div, form1);
      append(form1, input1);
      append(form1, t2);
      append(form1, button1);
      append(div, t3);
      append(div, form2);
      append(form2, button2);
      append(div, t4);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(enhance_action = enhance.call(null, form0, {
            pending: enhance_function_1,
            result: ctx[1]
          })),
          action_destroyer(enhance.call(null, form1, { result: ctx[1] })),
          action_destroyer(enhance_action_2 = enhance.call(null, form2, { result: enhance_function_2 }))
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & 1 && input0_value_value !== (input0_value_value = ctx[6].done ? "" : "true")) {
        input0.value = input0_value_value;
      }
      if (!current || dirty & 1 && button0_aria_label_value !== (button0_aria_label_value = "Mark todo as " + (ctx[6].done ? "not done" : "done"))) {
        attr(button0, "aria-label", button0_aria_label_value);
      }
      if (!current || dirty & 1 && form0_action_value !== (form0_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=patch")) {
        attr(form0, "action", form0_action_value);
      }
      if (enhance_action && is_function(enhance_action.update) && dirty & 1)
        enhance_action.update.call(null, {
          pending: enhance_function_1,
          result: ctx[1]
        });
      if (!current || dirty & 1 && input1_value_value !== (input1_value_value = ctx[6].text) && input1.value !== input1_value_value) {
        input1.value = input1_value_value;
      }
      if (!current || dirty & 1 && form1_action_value !== (form1_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=patch")) {
        attr(form1, "action", form1_action_value);
      }
      if (!current || dirty & 1 && form2_action_value !== (form2_action_value = "/sveltekit/todos/" + ctx[6].uid + ".json?_method=delete")) {
        attr(form2, "action", form2_action_value);
      }
      if (enhance_action_2 && is_function(enhance_action_2.update) && dirty & 1)
        enhance_action_2.update.call(null, { result: enhance_function_2 });
      if (dirty & 1) {
        toggle_class(div, "done", ctx[6].done);
      }
    },
    r() {
      rect = div.getBoundingClientRect();
    },
    f() {
      fix_position(div);
      stop_animation();
      add_transform(div, rect);
    },
    a() {
      stop_animation();
      stop_animation = create_animation(div, rect, flip, { duration: 200 });
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, scale, { start: 0.7 }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, scale, { start: 0.7 }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment(ctx) {
  let t0;
  let div;
  let h1;
  let t1;
  let t2;
  let form;
  let input;
  let enhance_action;
  let t3;
  let each_blocks = [];
  let each_1_lookup = new Map();
  let current;
  let mounted;
  let dispose;
  let each_value = ctx[0];
  const get_key = (ctx2) => ctx2[6].uid;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      t0 = space();
      div = element("div");
      h1 = element("h1");
      t1 = text("Todos");
      t2 = space();
      form = element("form");
      input = element("input");
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-181o7gf"]', document.head);
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Todos");
      h1_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      form = claim_element(div_nodes, "FORM", { class: true, action: true, method: true });
      var form_nodes = children(form);
      input = claim_element(form_nodes, "INPUT", {
        name: true,
        "aria-label": true,
        placeholder: true,
        class: true
      });
      form_nodes.forEach(detach);
      t3 = claim_space(div_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Todos";
      attr(input, "name", "text");
      attr(input, "aria-label", "Add todo");
      attr(input, "placeholder", "+ tap to add a todo");
      attr(input, "class", "svelte-dmxqmd");
      attr(form, "class", "new svelte-dmxqmd");
      attr(form, "action", "/sveltekit/todos.json");
      attr(form, "method", "post");
      attr(div, "class", "todos svelte-dmxqmd");
    },
    m(target, anchor) {
      insert(target, t0, anchor);
      insert(target, div, anchor);
      append(div, h1);
      append(h1, t1);
      append(div, t2);
      append(div, form);
      append(form, input);
      append(div, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = action_destroyer(enhance_action = enhance.call(null, form, { result: ctx[2] }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (enhance_action && is_function(enhance_action.update) && dirty & 1)
        enhance_action.update.call(null, { result: ctx2[2] });
      if (dirty & 3) {
        each_value = ctx2[0];
        group_outros();
        for (let i = 0; i < each_blocks.length; i += 1)
          each_blocks[i].r();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, fix_and_outro_and_destroy_block, create_each_block, null, get_each_context);
        for (let i = 0; i < each_blocks.length; i += 1)
          each_blocks[i].a();
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
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      mounted = false;
      dispose();
    }
  };
}
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const load = ({ fetch: fetch2 }) => __awaiter(void 0, void 0, void 0, function* () {
  const res = yield fetch2("/sveltekit/todos.json");
  if (res.ok) {
    const todos = yield res.json();
    return { props: { todos } };
  }
  const { message } = yield res.json();
  return { error: new Error(message) };
});
function instance($$self, $$props, $$invalidate) {
  var __awaiter2 = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  let { todos } = $$props;
  function patch(res) {
    return __awaiter2(this, void 0, void 0, function* () {
      const todo = yield res.json();
      $$invalidate(0, todos = todos.map((t) => {
        if (t.uid === todo.uid)
          return todo;
        return t;
      }));
    });
  }
  const enhance_function = async (res, form) => {
    const created = await res.json();
    $$invalidate(0, todos = [...todos, created]);
    form.reset();
  };
  const enhance_function_1 = (todo, each_value, todo_index, data) => {
    $$invalidate(0, each_value[todo_index].done = !!data.get("done"), todos);
  };
  const enhance_function_2 = (todo) => {
    $$invalidate(0, todos = todos.filter((t) => t.uid !== todo.uid));
  };
  $$self.$$set = ($$props2) => {
    if ("todos" in $$props2)
      $$invalidate(0, todos = $$props2.todos);
  };
  return [todos, patch, enhance_function, enhance_function_1, enhance_function_2];
}
class Todos extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { todos: 0 });
  }
}
export default Todos;
export { load };
//# sourceMappingURL=index.svelte-199d7e09.js.map
