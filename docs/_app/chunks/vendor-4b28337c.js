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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _unbounded;
function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function not_equal(a, b) {
  return a != a ? b == b : a !== b;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
  const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props)
    if (k[0] !== "$")
      result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props)
    if (!keys.has(k) && k[0] !== "$")
      rest[k] = props[k];
  return rest;
}
function set_store_value(store, ret, value = ret) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
let is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  const children2 = target.childNodes;
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = upper_bound(1, longest + 1, (idx) => children2[m[idx]].claim_order, current) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    if (node !== target.actual_end_child) {
      target.insertBefore(node, target.actual_end_child);
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target) {
    target.appendChild(node);
  }
}
function insert(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append(target, node);
  } else if (node.parentNode !== target || anchor && node.nextSibling !== anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function set_svg_attributes(node, attributes) {
  for (const key in attributes) {
    attr(node, key, attributes[key]);
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
  if (nodes.claim_info === void 0) {
    nodes.claim_info = { last_index: 0, total_claimed: 0 };
  }
  const resultNode = (() => {
    for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
      const node = nodes[i];
      if (predicate(node)) {
        processNode(node);
        nodes.splice(i, 1);
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
      const node = nodes[i];
      if (predicate(node)) {
        processNode(node);
        nodes.splice(i, 1);
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        } else {
          nodes.claim_info.last_index--;
        }
        return node;
      }
    }
    return createNode();
  })();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element(nodes, name, attributes, svg) {
  return claim_node(nodes, (node) => node.nodeName === name, (node) => {
    const remove = [];
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove.push(attribute.name);
      }
    }
    remove.forEach((v) => node.removeAttribute(v));
  }, () => svg ? svg_element(name) : element(name));
}
function claim_text(nodes, data) {
  return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
    node.data = "" + data;
  }, () => text(data), true);
}
function claim_space(nodes) {
  return claim_text(nodes, " ");
}
function find_comment(nodes, text2, start) {
  for (let i = start; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (node.nodeType === 8 && node.textContent.trim() === text2) {
      return i;
    }
  }
  return nodes.length;
}
function claim_html_tag(nodes) {
  const start_index = find_comment(nodes, "HTML_TAG_START", 0);
  const end_index = find_comment(nodes, "HTML_TAG_END", start_index);
  if (start_index === end_index) {
    return new HtmlTag();
  }
  const html_tag_nodes = nodes.splice(start_index, end_index + 1);
  detach(html_tag_nodes[0]);
  detach(html_tag_nodes[html_tag_nodes.length - 1]);
  return new HtmlTag(html_tag_nodes.slice(1, html_tag_nodes.length - 1));
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  node.style.setProperty(key, value, important ? "important" : "");
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, false, false, detail);
  return e;
}
function query_selector_all(selector, parent = document.body) {
  return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
  constructor(claimed_nodes) {
    this.e = this.n = null;
    this.l = claimed_nodes;
  }
  m(html, target, anchor = null) {
    if (!this.e) {
      this.e = element(target.nodeName);
      this.t = target;
      if (this.l) {
        this.n = this.l;
      } else {
        this.h(html);
      }
    }
    this.i(anchor);
  }
  h(html) {
    this.e.innerHTML = html;
    this.n = Array.from(this.e.childNodes);
  }
  i(anchor) {
    for (let i = 0; i < this.n.length; i += 1) {
      insert(this.t, this.n[i], anchor);
    }
  }
  p(html) {
    this.d();
    this.h(html);
    this.i(this.a);
  }
  d() {
    this.n.forEach(detach);
  }
}
const active_docs = new Set();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--)
    hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = node.ownerDocument;
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element("style")).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1);
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active)
      clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active)
      return;
    active_docs.forEach((doc) => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;
      while (i--)
        stylesheet.deleteRule(i);
      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}
function create_animation(node, from, fn, params) {
  if (!from)
    return noop;
  const to = node.getBoundingClientRect();
  if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
    return noop;
  const {
    delay = 0,
    duration = 300,
    easing = identity,
    start: start_time = now() + delay,
    end = start_time + duration,
    tick: tick2 = noop,
    css
  } = fn(node, { from, to }, params);
  let running = true;
  let started = false;
  let name;
  function start() {
    if (css) {
      name = create_rule(node, 0, 1, duration, delay, easing, css);
    }
    if (!delay) {
      started = true;
    }
  }
  function stop() {
    if (css)
      delete_rule(node, name);
    running = false;
  }
  loop((now2) => {
    if (!started && now2 >= start_time) {
      started = true;
    }
    if (started && now2 >= end) {
      tick2(1, 0);
      stop();
    }
    if (!running) {
      return false;
    }
    if (started) {
      const p = now2 - start_time;
      const t = 0 + 1 * easing(p / duration);
      tick2(t, 1 - t);
    }
    return true;
  });
  start();
  tick2(0, 1);
  return stop;
}
function fix_position(node) {
  const style = getComputedStyle(node);
  if (style.position !== "absolute" && style.position !== "fixed") {
    const { width, height } = style;
    const a = node.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.width = width;
    node.style.height = height;
    add_transform(node, a);
  }
}
function add_transform(node, a) {
  const b = node.getBoundingClientRect();
  if (a.left !== b.left || a.top !== b.top) {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;
    node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
  }
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail);
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
    }
  };
}
function setContext$1(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext$1(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  function clear_animation() {
    if (animation_name)
      delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const { delay = 0, duration = 300, easing = identity, tick: tick2 = noop, css } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b)
        tick2(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick2(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r)
                  run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick2(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function fix_and_outro_and_destroy_block(block, lookup) {
  block.f();
  outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = new Map();
  const deltas = new Map();
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block(key, child_ctx);
      block.c();
    } else if (dynamic) {
      block.p(child_ctx, dirty);
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = new Set();
  const did_move = new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert2(new_blocks[n - 1]);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal2, props, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal: not_equal2,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options.context || []),
    callbacks: blank_object(),
    dirty,
    skip_bound: false
  };
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal2($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s = subscribers[i];
          s[1]();
          subscriber_queue.push(s, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || from);
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = function() {
  function MDCFoundation2(adapter) {
    if (adapter === void 0) {
      adapter = {};
    }
    this.adapter = adapter;
  }
  Object.defineProperty(MDCFoundation2, "cssClasses", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "strings", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "numbers", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCFoundation2, "defaultAdapter", {
    get: function() {
      return {};
    },
    enumerable: false,
    configurable: true
  });
  MDCFoundation2.prototype.init = function() {
  };
  MDCFoundation2.prototype.destroy = function() {
  };
  return MDCFoundation2;
}();
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCComponent = function() {
  function MDCComponent2(root, foundation) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    this.root = root;
    this.initialize.apply(this, __spreadArray([], __read(args)));
    this.foundation = foundation === void 0 ? this.getDefaultFoundation() : foundation;
    this.foundation.init();
    this.initialSyncWithDOM();
  }
  MDCComponent2.attachTo = function(root) {
    return new MDCComponent2(root, new MDCFoundation({}));
  };
  MDCComponent2.prototype.initialize = function() {
    var _args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      _args[_i] = arguments[_i];
    }
  };
  MDCComponent2.prototype.getDefaultFoundation = function() {
    throw new Error("Subclasses must override getDefaultFoundation to return a properly configured foundation class");
  };
  MDCComponent2.prototype.initialSyncWithDOM = function() {
  };
  MDCComponent2.prototype.destroy = function() {
    this.foundation.destroy();
  };
  MDCComponent2.prototype.listen = function(evtType, handler, options) {
    this.root.addEventListener(evtType, handler, options);
  };
  MDCComponent2.prototype.unlisten = function(evtType, handler, options) {
    this.root.removeEventListener(evtType, handler, options);
  };
  MDCComponent2.prototype.emit = function(evtType, evtData, shouldBubble) {
    if (shouldBubble === void 0) {
      shouldBubble = false;
    }
    var evt;
    if (typeof CustomEvent === "function") {
      evt = new CustomEvent(evtType, {
        bubbles: shouldBubble,
        detail: evtData
      });
    } else {
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }
    this.root.dispatchEvent(evt);
  };
  return MDCComponent2;
}();
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function applyPassive(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  return supportsPassiveOption(globalObj) ? { passive: true } : false;
}
function supportsPassiveOption(globalObj) {
  if (globalObj === void 0) {
    globalObj = window;
  }
  var passiveSupported = false;
  try {
    var options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    var handler = function() {
    };
    globalObj.document.addEventListener("test", handler, options);
    globalObj.document.removeEventListener("test", handler, options);
  } catch (err) {
    passiveSupported = false;
  }
  return passiveSupported;
}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function closest(element2, selector) {
  if (element2.closest) {
    return element2.closest(selector);
  }
  var el = element2;
  while (el) {
    if (matches(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
function matches(element2, selector) {
  var nativeMatches = element2.matches || element2.webkitMatchesSelector || element2.msMatchesSelector;
  return nativeMatches.call(element2, selector);
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$4 = {
  BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
  FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
  FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
  ROOT: "mdc-ripple-upgraded",
  UNBOUNDED: "mdc-ripple-upgraded--unbounded"
};
var strings$4 = {
  VAR_FG_SCALE: "--mdc-ripple-fg-scale",
  VAR_FG_SIZE: "--mdc-ripple-fg-size",
  VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
  VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
  VAR_LEFT: "--mdc-ripple-left",
  VAR_TOP: "--mdc-ripple-top"
};
var numbers$2 = {
  DEACTIVATION_TIMEOUT_MS: 225,
  FG_DEACTIVATION_MS: 150,
  INITIAL_ORIGIN_SCALE: 0.6,
  PADDING: 10,
  TAP_DELAY_MS: 300
};
var supportsCssVariables_;
function supportsCssVariables(windowObj, forceRefresh) {
  if (forceRefresh === void 0) {
    forceRefresh = false;
  }
  var CSS = windowObj.CSS;
  var supportsCssVars = supportsCssVariables_;
  if (typeof supportsCssVariables_ === "boolean" && !forceRefresh) {
    return supportsCssVariables_;
  }
  var supportsFunctionPresent = CSS && typeof CSS.supports === "function";
  if (!supportsFunctionPresent) {
    return false;
  }
  var explicitlySupportsCssVars = CSS.supports("--css-vars", "yes");
  var weAreFeatureDetectingSafari10plus = CSS.supports("(--css-vars: yes)") && CSS.supports("color", "#00000000");
  supportsCssVars = explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
  if (!forceRefresh) {
    supportsCssVariables_ = supportsCssVars;
  }
  return supportsCssVars;
}
function getNormalizedEventCoords(evt, pageOffset, clientRect) {
  if (!evt) {
    return { x: 0, y: 0 };
  }
  var x = pageOffset.x, y = pageOffset.y;
  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;
  var normalizedX;
  var normalizedY;
  if (evt.type === "touchstart") {
    var touchEvent = evt;
    normalizedX = touchEvent.changedTouches[0].pageX - documentX;
    normalizedY = touchEvent.changedTouches[0].pageY - documentY;
  } else {
    var mouseEvent = evt;
    normalizedX = mouseEvent.pageX - documentX;
    normalizedY = mouseEvent.pageY - documentY;
  }
  return { x: normalizedX, y: normalizedY };
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ACTIVATION_EVENT_TYPES = [
  "touchstart",
  "pointerdown",
  "mousedown",
  "keydown"
];
var POINTER_DEACTIVATION_EVENT_TYPES = [
  "touchend",
  "pointerup",
  "mouseup",
  "contextmenu"
];
var activatedTargets = [];
var MDCRippleFoundation = function(_super) {
  __extends(MDCRippleFoundation2, _super);
  function MDCRippleFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCRippleFoundation2.defaultAdapter), adapter)) || this;
    _this.activationAnimationHasEnded_ = false;
    _this.activationTimer_ = 0;
    _this.fgDeactivationRemovalTimer_ = 0;
    _this.fgScale_ = "0";
    _this.frame_ = { width: 0, height: 0 };
    _this.initialSize_ = 0;
    _this.layoutFrame_ = 0;
    _this.maxRadius_ = 0;
    _this.unboundedCoords_ = { left: 0, top: 0 };
    _this.activationState_ = _this.defaultActivationState_();
    _this.activationTimerCallback_ = function() {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };
    _this.activateHandler_ = function(e) {
      return _this.activate_(e);
    };
    _this.deactivateHandler_ = function() {
      return _this.deactivate_();
    };
    _this.focusHandler_ = function() {
      return _this.handleFocus();
    };
    _this.blurHandler_ = function() {
      return _this.handleBlur();
    };
    _this.resizeHandler_ = function() {
      return _this.layout();
    };
    return _this;
  }
  Object.defineProperty(MDCRippleFoundation2, "cssClasses", {
    get: function() {
      return cssClasses$4;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "strings", {
    get: function() {
      return strings$4;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "numbers", {
    get: function() {
      return numbers$2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCRippleFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        browserSupportsCssVars: function() {
          return true;
        },
        computeBoundingRect: function() {
          return { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
        },
        containsEventTarget: function() {
          return true;
        },
        deregisterDocumentInteractionHandler: function() {
          return void 0;
        },
        deregisterInteractionHandler: function() {
          return void 0;
        },
        deregisterResizeHandler: function() {
          return void 0;
        },
        getWindowPageOffset: function() {
          return { x: 0, y: 0 };
        },
        isSurfaceActive: function() {
          return true;
        },
        isSurfaceDisabled: function() {
          return true;
        },
        isUnbounded: function() {
          return true;
        },
        registerDocumentInteractionHandler: function() {
          return void 0;
        },
        registerInteractionHandler: function() {
          return void 0;
        },
        registerResizeHandler: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        updateCssVariable: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCRippleFoundation2.prototype.init = function() {
    var _this = this;
    var supportsPressRipple = this.supportsPressRipple_();
    this.registerRootHandlers_(supportsPressRipple);
    if (supportsPressRipple) {
      var _a2 = MDCRippleFoundation2.cssClasses, ROOT_1 = _a2.ROOT, UNBOUNDED_1 = _a2.UNBOUNDED;
      requestAnimationFrame(function() {
        _this.adapter.addClass(ROOT_1);
        if (_this.adapter.isUnbounded()) {
          _this.adapter.addClass(UNBOUNDED_1);
          _this.layoutInternal_();
        }
      });
    }
  };
  MDCRippleFoundation2.prototype.destroy = function() {
    var _this = this;
    if (this.supportsPressRipple_()) {
      if (this.activationTimer_) {
        clearTimeout(this.activationTimer_);
        this.activationTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_ACTIVATION);
      }
      if (this.fgDeactivationRemovalTimer_) {
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.fgDeactivationRemovalTimer_ = 0;
        this.adapter.removeClass(MDCRippleFoundation2.cssClasses.FG_DEACTIVATION);
      }
      var _a2 = MDCRippleFoundation2.cssClasses, ROOT_2 = _a2.ROOT, UNBOUNDED_2 = _a2.UNBOUNDED;
      requestAnimationFrame(function() {
        _this.adapter.removeClass(ROOT_2);
        _this.adapter.removeClass(UNBOUNDED_2);
        _this.removeCssVars_();
      });
    }
    this.deregisterRootHandlers_();
    this.deregisterDeactivationHandlers_();
  };
  MDCRippleFoundation2.prototype.activate = function(evt) {
    this.activate_(evt);
  };
  MDCRippleFoundation2.prototype.deactivate = function() {
    this.deactivate_();
  };
  MDCRippleFoundation2.prototype.layout = function() {
    var _this = this;
    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function() {
      _this.layoutInternal_();
      _this.layoutFrame_ = 0;
    });
  };
  MDCRippleFoundation2.prototype.setUnbounded = function(unbounded) {
    var UNBOUNDED = MDCRippleFoundation2.cssClasses.UNBOUNDED;
    if (unbounded) {
      this.adapter.addClass(UNBOUNDED);
    } else {
      this.adapter.removeClass(UNBOUNDED);
    }
  };
  MDCRippleFoundation2.prototype.handleFocus = function() {
    var _this = this;
    requestAnimationFrame(function() {
      return _this.adapter.addClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
    });
  };
  MDCRippleFoundation2.prototype.handleBlur = function() {
    var _this = this;
    requestAnimationFrame(function() {
      return _this.adapter.removeClass(MDCRippleFoundation2.cssClasses.BG_FOCUSED);
    });
  };
  MDCRippleFoundation2.prototype.supportsPressRipple_ = function() {
    return this.adapter.browserSupportsCssVars();
  };
  MDCRippleFoundation2.prototype.defaultActivationState_ = function() {
    return {
      activationEvent: void 0,
      hasDeactivationUXRun: false,
      isActivated: false,
      isProgrammatic: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false
    };
  };
  MDCRippleFoundation2.prototype.registerRootHandlers_ = function(supportsPressRipple) {
    var _this = this;
    if (supportsPressRipple) {
      ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
        _this.adapter.registerInteractionHandler(evtType, _this.activateHandler_);
      });
      if (this.adapter.isUnbounded()) {
        this.adapter.registerResizeHandler(this.resizeHandler_);
      }
    }
    this.adapter.registerInteractionHandler("focus", this.focusHandler_);
    this.adapter.registerInteractionHandler("blur", this.blurHandler_);
  };
  MDCRippleFoundation2.prototype.registerDeactivationHandlers_ = function(evt) {
    var _this = this;
    if (evt.type === "keydown") {
      this.adapter.registerInteractionHandler("keyup", this.deactivateHandler_);
    } else {
      POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
        _this.adapter.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
      });
    }
  };
  MDCRippleFoundation2.prototype.deregisterRootHandlers_ = function() {
    var _this = this;
    ACTIVATION_EVENT_TYPES.forEach(function(evtType) {
      _this.adapter.deregisterInteractionHandler(evtType, _this.activateHandler_);
    });
    this.adapter.deregisterInteractionHandler("focus", this.focusHandler_);
    this.adapter.deregisterInteractionHandler("blur", this.blurHandler_);
    if (this.adapter.isUnbounded()) {
      this.adapter.deregisterResizeHandler(this.resizeHandler_);
    }
  };
  MDCRippleFoundation2.prototype.deregisterDeactivationHandlers_ = function() {
    var _this = this;
    this.adapter.deregisterInteractionHandler("keyup", this.deactivateHandler_);
    POINTER_DEACTIVATION_EVENT_TYPES.forEach(function(evtType) {
      _this.adapter.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
    });
  };
  MDCRippleFoundation2.prototype.removeCssVars_ = function() {
    var _this = this;
    var rippleStrings = MDCRippleFoundation2.strings;
    var keys = Object.keys(rippleStrings);
    keys.forEach(function(key) {
      if (key.indexOf("VAR_") === 0) {
        _this.adapter.updateCssVariable(rippleStrings[key], null);
      }
    });
  };
  MDCRippleFoundation2.prototype.activate_ = function(evt) {
    var _this = this;
    if (this.adapter.isSurfaceDisabled()) {
      return;
    }
    var activationState = this.activationState_;
    if (activationState.isActivated) {
      return;
    }
    var previousActivationEvent = this.previousActivationEvent_;
    var isSameInteraction = previousActivationEvent && evt !== void 0 && previousActivationEvent.type !== evt.type;
    if (isSameInteraction) {
      return;
    }
    activationState.isActivated = true;
    activationState.isProgrammatic = evt === void 0;
    activationState.activationEvent = evt;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== void 0 && (evt.type === "mousedown" || evt.type === "touchstart" || evt.type === "pointerdown");
    var hasActivatedChild = evt !== void 0 && activatedTargets.length > 0 && activatedTargets.some(function(target) {
      return _this.adapter.containsEventTarget(target);
    });
    if (hasActivatedChild) {
      this.resetActivationState_();
      return;
    }
    if (evt !== void 0) {
      activatedTargets.push(evt.target);
      this.registerDeactivationHandlers_(evt);
    }
    activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
    if (activationState.wasElementMadeActive) {
      this.animateActivation_();
    }
    requestAnimationFrame(function() {
      activatedTargets = [];
      if (!activationState.wasElementMadeActive && evt !== void 0 && (evt.key === " " || evt.keyCode === 32)) {
        activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
        if (activationState.wasElementMadeActive) {
          _this.animateActivation_();
        }
      }
      if (!activationState.wasElementMadeActive) {
        _this.activationState_ = _this.defaultActivationState_();
      }
    });
  };
  MDCRippleFoundation2.prototype.checkElementMadeActive_ = function(evt) {
    return evt !== void 0 && evt.type === "keydown" ? this.adapter.isSurfaceActive() : true;
  };
  MDCRippleFoundation2.prototype.animateActivation_ = function() {
    var _this = this;
    var _a2 = MDCRippleFoundation2.strings, VAR_FG_TRANSLATE_START = _a2.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a2.VAR_FG_TRANSLATE_END;
    var _b2 = MDCRippleFoundation2.cssClasses, FG_DEACTIVATION = _b2.FG_DEACTIVATION, FG_ACTIVATION = _b2.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation2.numbers.DEACTIVATION_TIMEOUT_MS;
    this.layoutInternal_();
    var translateStart = "";
    var translateEnd = "";
    if (!this.adapter.isUnbounded()) {
      var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
      translateStart = startPoint.x + "px, " + startPoint.y + "px";
      translateEnd = endPoint.x + "px, " + endPoint.y + "px";
    }
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter.removeClass(FG_DEACTIVATION);
    this.adapter.computeBoundingRect();
    this.adapter.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function() {
      return _this.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };
  MDCRippleFoundation2.prototype.getFgTranslationCoordinates_ = function() {
    var _a2 = this.activationState_, activationEvent = _a2.activationEvent, wasActivatedByPointer = _a2.wasActivatedByPointer;
    var startPoint;
    if (wasActivatedByPointer) {
      startPoint = getNormalizedEventCoords(activationEvent, this.adapter.getWindowPageOffset(), this.adapter.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };
    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };
    return { startPoint, endPoint };
  };
  MDCRippleFoundation2.prototype.runDeactivationUXLogicIfReady_ = function() {
    var _this = this;
    var FG_DEACTIVATION = MDCRippleFoundation2.cssClasses.FG_DEACTIVATION;
    var _a2 = this.activationState_, hasDeactivationUXRun = _a2.hasDeactivationUXRun, isActivated = _a2.isActivated;
    var activationHasEnded = hasDeactivationUXRun || !isActivated;
    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function() {
        _this.adapter.removeClass(FG_DEACTIVATION);
      }, numbers$2.FG_DEACTIVATION_MS);
    }
  };
  MDCRippleFoundation2.prototype.rmBoundedActivationClasses_ = function() {
    var FG_ACTIVATION = MDCRippleFoundation2.cssClasses.FG_ACTIVATION;
    this.adapter.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter.computeBoundingRect();
  };
  MDCRippleFoundation2.prototype.resetActivationState_ = function() {
    var _this = this;
    this.previousActivationEvent_ = this.activationState_.activationEvent;
    this.activationState_ = this.defaultActivationState_();
    setTimeout(function() {
      return _this.previousActivationEvent_ = void 0;
    }, MDCRippleFoundation2.numbers.TAP_DELAY_MS);
  };
  MDCRippleFoundation2.prototype.deactivate_ = function() {
    var _this = this;
    var activationState = this.activationState_;
    if (!activationState.isActivated) {
      return;
    }
    var state = __assign({}, activationState);
    if (activationState.isProgrammatic) {
      requestAnimationFrame(function() {
        return _this.animateDeactivation_(state);
      });
      this.resetActivationState_();
    } else {
      this.deregisterDeactivationHandlers_();
      requestAnimationFrame(function() {
        _this.activationState_.hasDeactivationUXRun = true;
        _this.animateDeactivation_(state);
        _this.resetActivationState_();
      });
    }
  };
  MDCRippleFoundation2.prototype.animateDeactivation_ = function(_a2) {
    var wasActivatedByPointer = _a2.wasActivatedByPointer, wasElementMadeActive = _a2.wasElementMadeActive;
    if (wasActivatedByPointer || wasElementMadeActive) {
      this.runDeactivationUXLogicIfReady_();
    }
  };
  MDCRippleFoundation2.prototype.layoutInternal_ = function() {
    var _this = this;
    this.frame_ = this.adapter.computeBoundingRect();
    var maxDim = Math.max(this.frame_.height, this.frame_.width);
    var getBoundedRadius = function() {
      var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
      return hypotenuse + MDCRippleFoundation2.numbers.PADDING;
    };
    this.maxRadius_ = this.adapter.isUnbounded() ? maxDim : getBoundedRadius();
    var initialSize = Math.floor(maxDim * MDCRippleFoundation2.numbers.INITIAL_ORIGIN_SCALE);
    if (this.adapter.isUnbounded() && initialSize % 2 !== 0) {
      this.initialSize_ = initialSize - 1;
    } else {
      this.initialSize_ = initialSize;
    }
    this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
    this.updateLayoutCssVars_();
  };
  MDCRippleFoundation2.prototype.updateLayoutCssVars_ = function() {
    var _a2 = MDCRippleFoundation2.strings, VAR_FG_SIZE = _a2.VAR_FG_SIZE, VAR_LEFT = _a2.VAR_LEFT, VAR_TOP = _a2.VAR_TOP, VAR_FG_SCALE = _a2.VAR_FG_SCALE;
    this.adapter.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
    this.adapter.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
    if (this.adapter.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };
      this.adapter.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
      this.adapter.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
    }
  };
  return MDCRippleFoundation2;
}(MDCFoundation);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCRipple = function(_super) {
  __extends(MDCRipple2, _super);
  function MDCRipple2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.disabled = false;
    return _this;
  }
  MDCRipple2.attachTo = function(root, opts) {
    if (opts === void 0) {
      opts = { isUnbounded: void 0 };
    }
    var ripple = new MDCRipple2(root);
    if (opts.isUnbounded !== void 0) {
      ripple.unbounded = opts.isUnbounded;
    }
    return ripple;
  };
  MDCRipple2.createAdapter = function(instance2) {
    return {
      addClass: function(className) {
        return instance2.root.classList.add(className);
      },
      browserSupportsCssVars: function() {
        return supportsCssVariables(window);
      },
      computeBoundingRect: function() {
        return instance2.root.getBoundingClientRect();
      },
      containsEventTarget: function(target) {
        return instance2.root.contains(target);
      },
      deregisterDocumentInteractionHandler: function(evtType, handler) {
        return document.documentElement.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterInteractionHandler: function(evtType, handler) {
        return instance2.root.removeEventListener(evtType, handler, applyPassive());
      },
      deregisterResizeHandler: function(handler) {
        return window.removeEventListener("resize", handler);
      },
      getWindowPageOffset: function() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      },
      isSurfaceActive: function() {
        return matches(instance2.root, ":active");
      },
      isSurfaceDisabled: function() {
        return Boolean(instance2.disabled);
      },
      isUnbounded: function() {
        return Boolean(instance2.unbounded);
      },
      registerDocumentInteractionHandler: function(evtType, handler) {
        return document.documentElement.addEventListener(evtType, handler, applyPassive());
      },
      registerInteractionHandler: function(evtType, handler) {
        return instance2.root.addEventListener(evtType, handler, applyPassive());
      },
      registerResizeHandler: function(handler) {
        return window.addEventListener("resize", handler);
      },
      removeClass: function(className) {
        return instance2.root.classList.remove(className);
      },
      updateCssVariable: function(varName, value) {
        return instance2.root.style.setProperty(varName, value);
      }
    };
  };
  Object.defineProperty(MDCRipple2.prototype, "unbounded", {
    get: function() {
      return Boolean(this.unbounded_);
    },
    set: function(unbounded) {
      this.unbounded_ = Boolean(unbounded);
      this.setUnbounded_();
    },
    enumerable: false,
    configurable: true
  });
  MDCRipple2.prototype.activate = function() {
    this.foundation.activate();
  };
  MDCRipple2.prototype.deactivate = function() {
    this.foundation.deactivate();
  };
  MDCRipple2.prototype.layout = function() {
    this.foundation.layout();
  };
  MDCRipple2.prototype.getDefaultFoundation = function() {
    return new MDCRippleFoundation(MDCRipple2.createAdapter(this));
  };
  MDCRipple2.prototype.initialSyncWithDOM = function() {
    var root = this.root;
    this.unbounded = "mdcRippleIsUnbounded" in root.dataset;
  };
  MDCRipple2.prototype.setUnbounded_ = function() {
    this.foundation.setUnbounded(Boolean(this.unbounded_));
  };
  return MDCRipple2;
}(MDCComponent);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$3 = {
  FIXED_CLASS: "mdc-top-app-bar--fixed",
  FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
  SHORT_CLASS: "mdc-top-app-bar--short",
  SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
  SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item"
};
var numbers$1 = {
  DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
  MAX_TOP_APP_BAR_HEIGHT: 128
};
var strings$3 = {
  ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
  NAVIGATION_EVENT: "MDCTopAppBar:nav",
  NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
  ROOT_SELECTOR: ".mdc-top-app-bar",
  TITLE_SELECTOR: ".mdc-top-app-bar__title"
};
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBarBaseFoundation = function(_super) {
  __extends(MDCTopAppBarBaseFoundation2, _super);
  function MDCTopAppBarBaseFoundation2(adapter) {
    return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation2.defaultAdapter), adapter)) || this;
  }
  Object.defineProperty(MDCTopAppBarBaseFoundation2, "strings", {
    get: function() {
      return strings$3;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation2, "cssClasses", {
    get: function() {
      return cssClasses$3;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation2, "numbers", {
    get: function() {
      return numbers$1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCTopAppBarBaseFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return false;
        },
        setStyle: function() {
          return void 0;
        },
        getTopAppBarHeight: function() {
          return 0;
        },
        notifyNavigationIconClicked: function() {
          return void 0;
        },
        getViewportScrollY: function() {
          return 0;
        },
        getTotalActionItems: function() {
          return 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCTopAppBarBaseFoundation2.prototype.handleTargetScroll = function() {
  };
  MDCTopAppBarBaseFoundation2.prototype.handleWindowResize = function() {
  };
  MDCTopAppBarBaseFoundation2.prototype.handleNavigationClick = function() {
    this.adapter.notifyNavigationIconClicked();
  };
  return MDCTopAppBarBaseFoundation2;
}(MDCFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = function(_super) {
  __extends(MDCTopAppBarFoundation2, _super);
  function MDCTopAppBarFoundation2(adapter) {
    var _this = _super.call(this, adapter) || this;
    _this.wasDocked_ = true;
    _this.isDockedShowing_ = true;
    _this.currentAppBarOffsetTop_ = 0;
    _this.isCurrentlyBeingResized_ = false;
    _this.resizeThrottleId_ = INITIAL_VALUE;
    _this.resizeDebounceId_ = INITIAL_VALUE;
    _this.lastScrollPosition_ = _this.adapter.getViewportScrollY();
    _this.topAppBarHeight_ = _this.adapter.getTopAppBarHeight();
    return _this;
  }
  MDCTopAppBarFoundation2.prototype.destroy = function() {
    _super.prototype.destroy.call(this);
    this.adapter.setStyle("top", "");
  };
  MDCTopAppBarFoundation2.prototype.handleTargetScroll = function() {
    var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
    var diff = currentScrollPosition - this.lastScrollPosition_;
    this.lastScrollPosition_ = currentScrollPosition;
    if (!this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff;
      if (this.currentAppBarOffsetTop_ > 0) {
        this.currentAppBarOffsetTop_ = 0;
      } else if (Math.abs(this.currentAppBarOffsetTop_) > this.topAppBarHeight_) {
        this.currentAppBarOffsetTop_ = -this.topAppBarHeight_;
      }
      this.moveTopAppBar_();
    }
  };
  MDCTopAppBarFoundation2.prototype.handleWindowResize = function() {
    var _this = this;
    if (!this.resizeThrottleId_) {
      this.resizeThrottleId_ = setTimeout(function() {
        _this.resizeThrottleId_ = INITIAL_VALUE;
        _this.throttledResizeHandler_();
      }, numbers$1.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    }
    this.isCurrentlyBeingResized_ = true;
    if (this.resizeDebounceId_) {
      clearTimeout(this.resizeDebounceId_);
    }
    this.resizeDebounceId_ = setTimeout(function() {
      _this.handleTargetScroll();
      _this.isCurrentlyBeingResized_ = false;
      _this.resizeDebounceId_ = INITIAL_VALUE;
    }, numbers$1.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
  };
  MDCTopAppBarFoundation2.prototype.checkForUpdate_ = function() {
    var offscreenBoundaryTop = -this.topAppBarHeight_;
    var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0;
    var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop;
    var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
    if (partiallyShowing) {
      this.wasDocked_ = false;
    } else {
      if (!this.wasDocked_) {
        this.wasDocked_ = true;
        return true;
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen;
        return true;
      }
    }
    return partiallyShowing;
  };
  MDCTopAppBarFoundation2.prototype.moveTopAppBar_ = function() {
    if (this.checkForUpdate_()) {
      var offset = this.currentAppBarOffsetTop_;
      if (Math.abs(offset) >= this.topAppBarHeight_) {
        offset = -numbers$1.MAX_TOP_APP_BAR_HEIGHT;
      }
      this.adapter.setStyle("top", offset + "px");
    }
  };
  MDCTopAppBarFoundation2.prototype.throttledResizeHandler_ = function() {
    var currentHeight = this.adapter.getTopAppBarHeight();
    if (this.topAppBarHeight_ !== currentHeight) {
      this.wasDocked_ = false;
      this.currentAppBarOffsetTop_ -= this.topAppBarHeight_ - currentHeight;
      this.topAppBarHeight_ = currentHeight;
    }
    this.handleTargetScroll();
  };
  return MDCTopAppBarFoundation2;
}(MDCTopAppBarBaseFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFixedTopAppBarFoundation = function(_super) {
  __extends(MDCFixedTopAppBarFoundation2, _super);
  function MDCFixedTopAppBarFoundation2() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.wasScrolled_ = false;
    return _this;
  }
  MDCFixedTopAppBarFoundation2.prototype.handleTargetScroll = function() {
    var currentScroll = this.adapter.getViewportScrollY();
    if (currentScroll <= 0) {
      if (this.wasScrolled_) {
        this.adapter.removeClass(cssClasses$3.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = false;
      }
    } else {
      if (!this.wasScrolled_) {
        this.adapter.addClass(cssClasses$3.FIXED_SCROLLED_CLASS);
        this.wasScrolled_ = true;
      }
    }
  };
  return MDCFixedTopAppBarFoundation2;
}(MDCTopAppBarFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCShortTopAppBarFoundation = function(_super) {
  __extends(MDCShortTopAppBarFoundation2, _super);
  function MDCShortTopAppBarFoundation2(adapter) {
    var _this = _super.call(this, adapter) || this;
    _this.isCollapsed_ = false;
    _this.isAlwaysCollapsed_ = false;
    return _this;
  }
  Object.defineProperty(MDCShortTopAppBarFoundation2.prototype, "isCollapsed", {
    get: function() {
      return this.isCollapsed_;
    },
    enumerable: false,
    configurable: true
  });
  MDCShortTopAppBarFoundation2.prototype.init = function() {
    _super.prototype.init.call(this);
    if (this.adapter.getTotalActionItems() > 0) {
      this.adapter.addClass(cssClasses$3.SHORT_HAS_ACTION_ITEM_CLASS);
    }
    this.setAlwaysCollapsed(this.adapter.hasClass(cssClasses$3.SHORT_COLLAPSED_CLASS));
  };
  MDCShortTopAppBarFoundation2.prototype.setAlwaysCollapsed = function(value) {
    this.isAlwaysCollapsed_ = !!value;
    if (this.isAlwaysCollapsed_) {
      this.collapse_();
    } else {
      this.maybeCollapseBar_();
    }
  };
  MDCShortTopAppBarFoundation2.prototype.getAlwaysCollapsed = function() {
    return this.isAlwaysCollapsed_;
  };
  MDCShortTopAppBarFoundation2.prototype.handleTargetScroll = function() {
    this.maybeCollapseBar_();
  };
  MDCShortTopAppBarFoundation2.prototype.maybeCollapseBar_ = function() {
    if (this.isAlwaysCollapsed_) {
      return;
    }
    var currentScroll = this.adapter.getViewportScrollY();
    if (currentScroll <= 0) {
      if (this.isCollapsed_) {
        this.uncollapse_();
      }
    } else {
      if (!this.isCollapsed_) {
        this.collapse_();
      }
    }
  };
  MDCShortTopAppBarFoundation2.prototype.uncollapse_ = function() {
    this.adapter.removeClass(cssClasses$3.SHORT_COLLAPSED_CLASS);
    this.isCollapsed_ = false;
  };
  MDCShortTopAppBarFoundation2.prototype.collapse_ = function() {
    this.adapter.addClass(cssClasses$3.SHORT_COLLAPSED_CLASS);
    this.isCollapsed_ = true;
  };
  return MDCShortTopAppBarFoundation2;
}(MDCTopAppBarBaseFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBar = function(_super) {
  __extends(MDCTopAppBar2, _super);
  function MDCTopAppBar2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCTopAppBar2.attachTo = function(root) {
    return new MDCTopAppBar2(root);
  };
  MDCTopAppBar2.prototype.initialize = function(rippleFactory) {
    if (rippleFactory === void 0) {
      rippleFactory = function(el) {
        return MDCRipple.attachTo(el);
      };
    }
    this.navIcon_ = this.root.querySelector(strings$3.NAVIGATION_ICON_SELECTOR);
    var icons = [].slice.call(this.root.querySelectorAll(strings$3.ACTION_ITEM_SELECTOR));
    if (this.navIcon_) {
      icons.push(this.navIcon_);
    }
    this.iconRipples_ = icons.map(function(icon) {
      var ripple = rippleFactory(icon);
      ripple.unbounded = true;
      return ripple;
    });
    this.scrollTarget_ = window;
  };
  MDCTopAppBar2.prototype.initialSyncWithDOM = function() {
    this.handleNavigationClick_ = this.foundation.handleNavigationClick.bind(this.foundation);
    this.handleWindowResize_ = this.foundation.handleWindowResize.bind(this.foundation);
    this.handleTargetScroll_ = this.foundation.handleTargetScroll.bind(this.foundation);
    this.scrollTarget_.addEventListener("scroll", this.handleTargetScroll_);
    if (this.navIcon_) {
      this.navIcon_.addEventListener("click", this.handleNavigationClick_);
    }
    var isFixed = this.root.classList.contains(cssClasses$3.FIXED_CLASS);
    var isShort = this.root.classList.contains(cssClasses$3.SHORT_CLASS);
    if (!isShort && !isFixed) {
      window.addEventListener("resize", this.handleWindowResize_);
    }
  };
  MDCTopAppBar2.prototype.destroy = function() {
    this.iconRipples_.forEach(function(iconRipple) {
      return iconRipple.destroy();
    });
    this.scrollTarget_.removeEventListener("scroll", this.handleTargetScroll_);
    if (this.navIcon_) {
      this.navIcon_.removeEventListener("click", this.handleNavigationClick_);
    }
    var isFixed = this.root.classList.contains(cssClasses$3.FIXED_CLASS);
    var isShort = this.root.classList.contains(cssClasses$3.SHORT_CLASS);
    if (!isShort && !isFixed) {
      window.removeEventListener("resize", this.handleWindowResize_);
    }
    _super.prototype.destroy.call(this);
  };
  MDCTopAppBar2.prototype.setScrollTarget = function(target) {
    this.scrollTarget_.removeEventListener("scroll", this.handleTargetScroll_);
    this.scrollTarget_ = target;
    this.handleTargetScroll_ = this.foundation.handleTargetScroll.bind(this.foundation);
    this.scrollTarget_.addEventListener("scroll", this.handleTargetScroll_);
  };
  MDCTopAppBar2.prototype.getDefaultFoundation = function() {
    var _this = this;
    var adapter = {
      hasClass: function(className) {
        return _this.root.classList.contains(className);
      },
      addClass: function(className) {
        return _this.root.classList.add(className);
      },
      removeClass: function(className) {
        return _this.root.classList.remove(className);
      },
      setStyle: function(property, value) {
        return _this.root.style.setProperty(property, value);
      },
      getTopAppBarHeight: function() {
        return _this.root.clientHeight;
      },
      notifyNavigationIconClicked: function() {
        return _this.emit(strings$3.NAVIGATION_EVENT, {});
      },
      getViewportScrollY: function() {
        var win = _this.scrollTarget_;
        var el = _this.scrollTarget_;
        return win.pageYOffset !== void 0 ? win.pageYOffset : el.scrollTop;
      },
      getTotalActionItems: function() {
        return _this.root.querySelectorAll(strings$3.ACTION_ITEM_SELECTOR).length;
      }
    };
    var foundation;
    if (this.root.classList.contains(cssClasses$3.SHORT_CLASS)) {
      foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.root.classList.contains(cssClasses$3.FIXED_CLASS)) {
      foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      foundation = new MDCTopAppBarFoundation(adapter);
    }
    return foundation;
  };
  return MDCTopAppBar2;
}(MDCComponent);
function filterStrings(toFilter) {
  if (!toFilter)
    return void 0;
  const parsedArray = toFilter.map((item) => {
    if (Array.isArray(item))
      return item[0] ? item[1] : item[0] === void 0 ? void 0 : "";
    else
      return item;
  }).filter((item) => item || item === void 0);
  if (parsedArray.some((item) => item !== void 0)) {
    return parsedArray.filter((item) => item);
  } else {
    return [];
  }
}
function customList(toParse, opt) {
  var _a2, _b2, _c;
  let parsed;
  const parsedArray = filterStrings(toParse);
  if (parsedArray == null ? void 0 : parsedArray.length) {
    parsed = `${(_a2 = opt == null ? void 0 : opt.start) != null ? _a2 : ""}${parsedArray.join((_b2 = opt == null ? void 0 : opt.join) != null ? _b2 : "")}${(_c = opt == null ? void 0 : opt.end) != null ? _c : ""}`;
  } else {
    parsed = void 0;
  }
  return parsed;
}
function classList(toParse) {
  const parsed = customList(toParse, { join: " " });
  return parsed;
}
function instance$Q($$self, $$props, $$invalidate) {
  let { hook = null } = $$props;
  let { effect = false } = $$props;
  let { once = false } = $$props;
  let { when = true } = $$props;
  let { deps = void 0 } = $$props;
  let runDone = false;
  let memoDeps = { value: deps };
  let runDestroyer;
  let mounted = false;
  onMount(() => {
    $$invalidate(5, mounted = true);
  });
  onDestroy(() => {
    if (runDestroyer)
      runDestroyer();
  });
  function runHook() {
    if (once && !runDone || !once) {
      runDone = true;
      return hook();
    }
  }
  function depsChanged(_deps = deps) {
    return memoDeps.value !== deps || deps === void 0;
  }
  $$self.$$set = ($$props2) => {
    if ("hook" in $$props2)
      $$invalidate(0, hook = $$props2.hook);
    if ("effect" in $$props2)
      $$invalidate(1, effect = $$props2.effect);
    if ("once" in $$props2)
      $$invalidate(2, once = $$props2.once);
    if ("when" in $$props2)
      $$invalidate(3, when = $$props2.when);
    if ("deps" in $$props2)
      $$invalidate(4, deps = $$props2.deps);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 27) {
      if (when && hook && !effect && depsChanged(deps)) {
        runDestroyer = runHook();
      }
    }
    if ($$self.$$.dirty & 59) {
      if (when && hook && effect && mounted && depsChanged(deps)) {
        runDestroyer = runHook();
      }
    }
  };
  return [hook, effect, once, when, deps, mounted];
}
class Use extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$Q, null, safe_not_equal, {
      hook: 0,
      effect: 1,
      once: 2,
      when: 3,
      deps: 4
    });
  }
}
function create_fragment$P(ctx) {
  let use;
  let current;
  use = new Use({
    props: { effect: true, hook: ctx[6] }
  });
  return {
    c() {
      create_component(use.$$.fragment);
    },
    l(nodes) {
      claim_component(use.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(use, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const use_changes = {};
      if (dirty & 1)
        use_changes.hook = ctx2[6];
      use.$set(use_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(use.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(use.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(use, detaching);
    }
  };
}
let count$6 = 0;
function instance$P($$self, $$props, $$invalidate) {
  let { value } = $$props;
  let { onUpdate } = $$props;
  const id = `../../../../packages/common/hooks/UseState-${count$6++}`;
  let valueMemo;
  onMount(() => {
    valueMemo = { value };
  });
  function onValueUpdate(value2) {
    if (valueMemo === void 0)
      return;
    if (value2 !== valueMemo.value) {
      const currentValueMemo = valueMemo.value;
      onUpdate(valueMemo.value);
      if (currentValueMemo === valueMemo.value) {
        valueMemo.value = value2;
      }
    }
  }
  function setValue(newValue) {
    if (valueMemo)
      valueMemo.value = newValue;
    $$invalidate(0, value = newValue);
  }
  function getValue() {
    return value;
  }
  const func = () => onValueUpdate(value);
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
    if ("onUpdate" in $$props2)
      $$invalidate(2, onUpdate = $$props2.onUpdate);
  };
  return [value, onValueUpdate, onUpdate, id, setValue, getValue, func];
}
class UseState extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$P, create_fragment$P, not_equal, {
      value: 0,
      onUpdate: 2,
      id: 3,
      setValue: 4,
      getValue: 5
    });
  }
  get id() {
    return this.$$.ctx[3];
  }
  get setValue() {
    return this.$$.ctx[4];
  }
  get getValue() {
    return this.$$.ctx[5];
  }
}
const get_content_slot_changes$1 = (dirty) => ({
  contentClass: dirty & 512
});
const get_content_slot_context$1 = (ctx) => ({ contentClass: ctx[9] });
const get_default_slot_changes$8 = (dirty) => ({
  contentClass: dirty & 512
});
const get_default_slot_context$8 = (ctx) => ({ contentClass: ctx[9] });
function create_fragment$O(ctx) {
  let usestate0;
  let t0;
  let usestate1;
  let t1;
  let header;
  let div;
  let header_class_value;
  let t2;
  let current;
  usestate0 = new UseState({
    props: {
      value: [ctx[6], ctx[7], ctx[4]],
      onUpdate: ctx[10]
    }
  });
  usestate1 = new UseState({
    props: {
      value: ctx[8],
      onUpdate: ctx[11]
    }
  });
  const default_slot_template = ctx[15].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[14], get_default_slot_context$8);
  let header_levels = [
    { id: ctx[3] },
    {
      class: header_class_value = classList([
        ctx[1],
        "mdc-top-app-bar",
        [ctx[4] === "fixed", "mdc-top-app-bar--fixed"],
        [ctx[5] === "secondary", "svmd-top-app-bar--color--secondary"],
        [ctx[7], "mdc-top-app-bar--prominent"],
        [ctx[6], "mdc-top-app-bar--dense"]
      ])
    },
    { style: ctx[2] },
    ctx[12]
  ];
  let header_data = {};
  for (let i = 0; i < header_levels.length; i += 1) {
    header_data = assign(header_data, header_levels[i]);
  }
  const content_slot_template = ctx[15].content;
  const content_slot = create_slot(content_slot_template, ctx, ctx[14], get_content_slot_context$1);
  return {
    c() {
      create_component(usestate0.$$.fragment);
      t0 = space();
      create_component(usestate1.$$.fragment);
      t1 = space();
      header = element("header");
      div = element("div");
      if (default_slot)
        default_slot.c();
      t2 = space();
      if (content_slot)
        content_slot.c();
      this.h();
    },
    l(nodes) {
      claim_component(usestate0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(usestate1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      header = claim_element(nodes, "HEADER", { id: true, class: true, style: true });
      var header_nodes = children(header);
      div = claim_element(header_nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      header_nodes.forEach(detach);
      t2 = claim_space(nodes);
      if (content_slot)
        content_slot.l(nodes);
      this.h();
    },
    h() {
      attr(div, "class", "mdc-top-app-bar__row");
      set_attributes(header, header_data);
    },
    m(target, anchor) {
      mount_component(usestate0, target, anchor);
      insert(target, t0, anchor);
      mount_component(usestate1, target, anchor);
      insert(target, t1, anchor);
      insert(target, header, anchor);
      append(header, div);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[16](header);
      insert(target, t2, anchor);
      if (content_slot) {
        content_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const usestate0_changes = {};
      if (dirty & 208)
        usestate0_changes.value = [ctx2[6], ctx2[7], ctx2[4]];
      usestate0.$set(usestate0_changes);
      const usestate1_changes = {};
      if (dirty & 256)
        usestate1_changes.value = ctx2[8];
      usestate1.$set(usestate1_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16896)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[14], !current ? -1 : dirty, get_default_slot_changes$8, get_default_slot_context$8);
        }
      }
      set_attributes(header, header_data = get_spread_update(header_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 242 && header_class_value !== (header_class_value = classList([
          ctx2[1],
          "mdc-top-app-bar",
          [ctx2[4] === "fixed", "mdc-top-app-bar--fixed"],
          [ctx2[5] === "secondary", "svmd-top-app-bar--color--secondary"],
          [ctx2[7], "mdc-top-app-bar--prominent"],
          [ctx2[6], "mdc-top-app-bar--dense"]
        ]))) && { class: header_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 4096 && ctx2[12]
      ]));
      if (content_slot) {
        if (content_slot.p && (!current || dirty & 16896)) {
          update_slot(content_slot, content_slot_template, ctx2, ctx2[14], !current ? -1 : dirty, get_content_slot_changes$1, get_content_slot_context$1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(usestate0.$$.fragment, local);
      transition_in(usestate1.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(content_slot, local);
      current = true;
    },
    o(local) {
      transition_out(usestate0.$$.fragment, local);
      transition_out(usestate1.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(content_slot, local);
      current = false;
    },
    d(detaching) {
      destroy_component(usestate0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(usestate1, detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(header);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      if (detaching)
        detach(t2);
      if (content_slot)
        content_slot.d(detaching);
    }
  };
}
function instance$O($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "variant",
    "color",
    "dense",
    "prominent",
    "scrollTarget",
    "initialize"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { variant = "standard" } = $$props;
  let { color = "primary" } = $$props;
  let { dense = false } = $$props;
  let { prominent = false } = $$props;
  let { scrollTarget = void 0 } = $$props;
  const dispatch2 = createEventDispatcher();
  let topAppBar;
  let contentClass;
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    yield tick();
    initializeNotified();
  }));
  onDestroy(() => {
    topAppBar === null || topAppBar === void 0 ? void 0 : topAppBar.destroy();
  });
  function initializeNotified() {
    dispatch2("beforeInitialization");
    initialize();
    dispatch2("afterInitialization");
  }
  function initialize() {
    topAppBar === null || topAppBar === void 0 ? void 0 : topAppBar.destroy();
    topAppBar = new MDCTopAppBar(dom);
    topAppBar.listen("MDCTopAppBar:nav", () => {
      dispatch2("nav");
    });
    updateScrollTarget();
  }
  function updateScrollTarget() {
    topAppBar.setScrollTarget(scrollTarget !== null && scrollTarget !== void 0 ? scrollTarget : window);
  }
  function header_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("variant" in $$new_props)
      $$invalidate(4, variant = $$new_props.variant);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("dense" in $$new_props)
      $$invalidate(6, dense = $$new_props.dense);
    if ("prominent" in $$new_props)
      $$invalidate(7, prominent = $$new_props.prominent);
    if ("scrollTarget" in $$new_props)
      $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
    if ("$$scope" in $$new_props)
      $$invalidate(14, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 192) {
      if (prominent && dense) {
        $$invalidate(9, contentClass = "mdc-top-app-bar--dense-prominent-fixed-adjust");
      } else if (prominent) {
        $$invalidate(9, contentClass = "mdc-top-app-bar--prominent-fixed-adjust");
      } else if (dense) {
        $$invalidate(9, contentClass = "mdc-top-app-bar--dense-fixed-adjust");
      } else {
        $$invalidate(9, contentClass = "mdc-top-app-bar--fixed-adjust");
      }
    }
  };
  return [
    dom,
    className,
    style,
    id,
    variant,
    color,
    dense,
    prominent,
    scrollTarget,
    contentClass,
    initializeNotified,
    updateScrollTarget,
    $$restProps,
    initialize,
    $$scope,
    slots,
    header_binding
  ];
}
class TopAppBar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$O, create_fragment$O, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      variant: 4,
      color: 5,
      dense: 6,
      prominent: 7,
      scrollTarget: 8,
      initialize: 13
    });
  }
  get initialize() {
    return this.$$.ctx[13];
  }
}
var TopAppBar_svelte_svelte_type_style_lang = ".mdc-top-app-bar{background-color:#c7b300;background-color:var(--mdc-theme-primary, #c7b300);color:rgba(0, 0, 0, 0.87);display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#000;color:var(--mdc-theme-on-primary, #000)}.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-primary, #000))}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-surface--hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}[dir=rtl] .mdc-top-app-bar__title,.mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:24px;border-bottom-left-radius:0}[dir=rtl] .mdc-top-app-bar--short-collapsed,.mdc-top-app-bar--short-collapsed[dir=rtl]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-top-app-bar--short,.mdc-top-app-bar--short[dir=rtl]{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);width:56px;transition:width 300ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title,.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow 200ms linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);transition:box-shadow 200ms linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title,.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media(max-width: 599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width 200ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed{transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}.svmd-top-app-bar--color--secondary{background-color:#676778;background-color:var(--mdc-theme-secondary, #676778);color:white}";
const get_default_slot_changes$7 = (dirty) => ({
  contentClass: dirty & 16384
});
const get_default_slot_context$7 = (ctx) => ({ contentClass: ctx[14] });
const get_content_slot_changes = (dirty) => ({
  contentClass: dirty & 16384
});
const get_content_slot_context = (ctx) => ({
  slot: "content",
  contentClass: ctx[14]
});
function create_default_slot$j(ctx) {
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[13], get_default_slot_context$7);
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
        if (default_slot.p && (!current || dirty & 24576)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[13], !current ? -1 : dirty, get_default_slot_changes$7, get_default_slot_context$7);
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
function create_content_slot(ctx) {
  let current;
  const content_slot_template = ctx[10].content;
  const content_slot = create_slot(content_slot_template, ctx, ctx[13], get_content_slot_context);
  return {
    c() {
      if (content_slot)
        content_slot.c();
    },
    l(nodes) {
      if (content_slot)
        content_slot.l(nodes);
    },
    m(target, anchor) {
      if (content_slot) {
        content_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (content_slot) {
        if (content_slot.p && (!current || dirty & 24576)) {
          update_slot(content_slot, content_slot_template, ctx2, ctx2[13], !current ? -1 : dirty, get_content_slot_changes, get_content_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(content_slot, local);
      current = true;
    },
    o(local) {
      transition_out(content_slot, local);
      current = false;
    },
    d(detaching) {
      if (content_slot)
        content_slot.d(detaching);
    }
  };
}
function create_fragment$N(ctx) {
  let topappbar;
  let updating_dom;
  let current;
  const topappbar_spread_levels = [
    { $$restProps: ctx[9] },
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { variant: ctx[4] },
    { color: ctx[5] },
    { dense: ctx[6] },
    { prominent: ctx[7] },
    { scrollTarget: ctx[8] },
    ctx[9]
  ];
  function topappbar_dom_binding(value) {
    ctx[11](value);
  }
  let topappbar_props = {
    $$slots: {
      content: [
        create_content_slot,
        ({ contentClass }) => ({ 14: contentClass }),
        ({ contentClass }) => contentClass ? 16384 : 0
      ],
      default: [
        create_default_slot$j,
        ({ contentClass }) => ({ 14: contentClass }),
        ({ contentClass }) => contentClass ? 16384 : 0
      ]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < topappbar_spread_levels.length; i += 1) {
    topappbar_props = assign(topappbar_props, topappbar_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    topappbar_props.dom = ctx[0];
  }
  topappbar = new TopAppBar({ props: topappbar_props });
  binding_callbacks.push(() => bind(topappbar, "dom", topappbar_dom_binding));
  topappbar.$on("nav", ctx[12]);
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
    p(ctx2, [dirty]) {
      const topappbar_changes = dirty & 1022 ? get_spread_update(topappbar_spread_levels, [
        dirty & 512 && { $$restProps: ctx2[9] },
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { variant: ctx2[4] },
        dirty & 32 && { color: ctx2[5] },
        dirty & 64 && { dense: ctx2[6] },
        dirty & 128 && { prominent: ctx2[7] },
        dirty & 256 && { scrollTarget: ctx2[8] },
        dirty & 512 && get_spread_object(ctx2[9])
      ]) : {};
      if (dirty & 24576) {
        topappbar_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        topappbar_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
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
let count$5 = 0;
function instance$N($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "variant",
    "color",
    "dense",
    "prominent",
    "scrollTarget"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@svmd/top-app-bar/TopAppBar:${count$5++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { variant = "standard" } = $$props;
  let { color = "primary" } = $$props;
  let { dense = false } = $$props;
  let { prominent = false } = $$props;
  let { scrollTarget = void 0 } = $$props;
  function topappbar_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function nav_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("variant" in $$new_props)
      $$invalidate(4, variant = $$new_props.variant);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("dense" in $$new_props)
      $$invalidate(6, dense = $$new_props.dense);
    if ("prominent" in $$new_props)
      $$invalidate(7, prominent = $$new_props.prominent);
    if ("scrollTarget" in $$new_props)
      $$invalidate(8, scrollTarget = $$new_props.scrollTarget);
    if ("$$scope" in $$new_props)
      $$invalidate(13, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    variant,
    color,
    dense,
    prominent,
    scrollTarget,
    $$restProps,
    slots,
    topappbar_dom_binding,
    nav_handler,
    $$scope
  ];
}
class TopAppBar_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$N, create_fragment$N, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      variant: 4,
      color: 5,
      dense: 6,
      prominent: 7,
      scrollTarget: 8
    });
  }
}
function create_fragment$M(ctx) {
  let section;
  let section_class_value;
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  let section_levels = [
    { id: ctx[3] },
    {
      class: section_class_value = classList([
        ctx[1],
        "mdc-top-app-bar__section",
        [ctx[4] === "start", "mdc-top-app-bar__section--align-start"],
        [ctx[4] === "end", "mdc-top-app-bar__section--align-end"]
      ])
    },
    { style: ctx[2] },
    ctx[5]
  ];
  let section_data = {};
  for (let i = 0; i < section_levels.length; i += 1) {
    section_data = assign(section_data, section_levels[i]);
  }
  return {
    c() {
      section = element("section");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { id: true, class: true, style: true });
      var section_nodes = children(section);
      if (default_slot)
        default_slot.l(section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(section, section_data);
    },
    m(target, anchor) {
      insert(target, section, anchor);
      if (default_slot) {
        default_slot.m(section, null);
      }
      ctx[8](section);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[6], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(section, section_data = get_spread_update(section_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 18 && section_class_value !== (section_class_value = classList([
          ctx2[1],
          "mdc-top-app-bar__section",
          [ctx2[4] === "start", "mdc-top-app-bar__section--align-start"],
          [ctx2[4] === "end", "mdc-top-app-bar__section--align-end"]
        ]))) && { class: section_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 32 && ctx2[5]
      ]));
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
        detach(section);
      if (default_slot)
        default_slot.d(detaching);
      ctx[8](null);
    }
  };
}
function instance$M($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "align"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { align = "start" } = $$props;
  function section_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("align" in $$new_props)
      $$invalidate(4, align = $$new_props.align);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, align, $$restProps, $$scope, slots, section_binding];
}
class Section extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$M, create_fragment$M, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      align: 4
    });
  }
}
function create_fragment$L(ctx) {
  let a;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  let a_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { href: ctx[4] },
    ctx[5]
  ];
  let a_data = {};
  for (let i = 0; i < a_levels.length; i += 1) {
    a_data = assign(a_data, a_levels[i]);
  }
  return {
    c() {
      a = element("a");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      a = claim_element(nodes, "A", {
        id: true,
        class: true,
        style: true,
        href: true
      });
      var a_nodes = children(a);
      if (default_slot)
        default_slot.l(a_nodes);
      a_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(a, a_data);
    },
    m(target, anchor) {
      insert(target, a, anchor);
      if (default_slot) {
        default_slot.m(a, null);
      }
      ctx[15](a);
      current = true;
      if (!mounted) {
        dispose = [
          listen(a, "click", ctx[8]),
          listen(a, "mousedown", ctx[9]),
          listen(a, "mouseup", ctx[10]),
          listen(a, "keydown", ctx[11]),
          listen(a, "keyup", ctx[12]),
          listen(a, "focus", ctx[13]),
          listen(a, "blur", ctx[14])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[6], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(a, a_data = get_spread_update(a_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        (!current || dirty & 16) && { href: ctx2[4] },
        dirty & 32 && ctx2[5]
      ]));
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
        detach(a);
      if (default_slot)
        default_slot.d(detaching);
      ctx[15](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$L($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "href"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { href = void 0 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function a_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("href" in $$new_props)
      $$invalidate(4, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(6, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    href,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    a_binding
  ];
}
class A extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$L, create_fragment$L, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      href: 4
    });
  }
}
function create_fragment$K(ctx) {
  let button;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let button_levels = [
    ctx[4],
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] }
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { id: true, class: true, style: true });
      var button_nodes = children(button);
      if (default_slot)
        default_slot.l(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      ctx[16](button);
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "click", ctx[7]),
          listen(button, "mousedown", ctx[8]),
          listen(button, "mouseup", ctx[9]),
          listen(button, "keydown", ctx[10]),
          listen(button, "keyup", ctx[11]),
          listen(button, "focus", ctx[12]),
          listen(button, "blur", ctx[13]),
          listen(button, "focusin", ctx[14]),
          listen(button, "focusout", ctx[15])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [
        dirty & 16 && ctx2[4],
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] }
      ]));
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
        detach(button);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$K($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function button_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    button_binding
  ];
}
class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$K, create_fragment$K, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$J(ctx) {
  let li;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let li_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let li_data = {};
  for (let i = 0; i < li_levels.length; i += 1) {
    li_data = assign(li_data, li_levels[i]);
  }
  return {
    c() {
      li = element("li");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", { id: true, class: true, style: true });
      var li_nodes = children(li);
      if (default_slot)
        default_slot.l(li_nodes);
      li_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(li, li_data);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      if (default_slot) {
        default_slot.m(li, null);
      }
      ctx[14](li);
      current = true;
      if (!mounted) {
        dispose = [
          listen(li, "click", ctx[7]),
          listen(li, "mousedown", ctx[8]),
          listen(li, "mouseup", ctx[9]),
          listen(li, "keydown", ctx[10]),
          listen(li, "keyup", ctx[11]),
          listen(li, "focus", ctx[12]),
          listen(li, "blur", ctx[13])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(li, li_data = get_spread_update(li_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(li);
      if (default_slot)
        default_slot.d(detaching);
      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$J($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    li_binding
  ];
}
class Li extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$J, create_fragment$J, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$I(ctx) {
  let span;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let span_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { id: true, class: true, style: true });
      var span_nodes = children(span);
      if (default_slot)
        default_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if (default_slot) {
        default_slot.m(span, null);
      }
      ctx[16](span);
      current = true;
      if (!mounted) {
        dispose = [
          listen(span, "click", ctx[7]),
          listen(span, "mousedown", ctx[8]),
          listen(span, "mouseup", ctx[9]),
          listen(span, "keydown", ctx[10]),
          listen(span, "keyup", ctx[11]),
          listen(span, "focus", ctx[12]),
          listen(span, "blur", ctx[13]),
          listen(span, "focusin", ctx[14]),
          listen(span, "focusout", ctx[15])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(span);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$I($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = null } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    span_binding
  ];
}
class Span extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$I, create_fragment$I, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$H(ctx) {
  let ul;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let ul_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let ul_data = {};
  for (let i = 0; i < ul_levels.length; i += 1) {
    ul_data = assign(ul_data, ul_levels[i]);
  }
  return {
    c() {
      ul = element("ul");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      ul = claim_element(nodes, "UL", { id: true, class: true, style: true });
      var ul_nodes = children(ul);
      if (default_slot)
        default_slot.l(ul_nodes);
      ul_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(ul, ul_data);
    },
    m(target, anchor) {
      insert(target, ul, anchor);
      if (default_slot) {
        default_slot.m(ul, null);
      }
      ctx[16](ul);
      current = true;
      if (!mounted) {
        dispose = [
          listen(ul, "click", ctx[7]),
          listen(ul, "mousedown", ctx[8]),
          listen(ul, "mouseup", ctx[9]),
          listen(ul, "keydown", ctx[10]),
          listen(ul, "keyup", ctx[11]),
          listen(ul, "focusin", ctx[12]),
          listen(ul, "focusout", ctx[13]),
          listen(ul, "focus", ctx[14]),
          listen(ul, "blur", ctx[15])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(ul, ul_data = get_spread_update(ul_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(ul);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$H($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = null } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function ul_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    focus_handler,
    blur_handler,
    ul_binding
  ];
}
class Ul extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$H, create_fragment$H, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$G(ctx) {
  let h1;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h1_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h1_data = {};
  for (let i = 0; i < h1_levels.length; i += 1) {
    h1_data = assign(h1_data, h1_levels[i]);
  }
  return {
    c() {
      h1 = element("h1");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", { id: true, class: true, style: true });
      var h1_nodes = children(h1);
      if (default_slot)
        default_slot.l(h1_nodes);
      h1_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h1, h1_data);
    },
    m(target, anchor) {
      insert(target, h1, anchor);
      if (default_slot) {
        default_slot.m(h1, null);
      }
      ctx[7](h1);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h1, h1_data = get_spread_update(h1_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h1);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$G($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h1_binding];
}
class H1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$G, create_fragment$G, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$F(ctx) {
  let h2;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h2_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h2_data = {};
  for (let i = 0; i < h2_levels.length; i += 1) {
    h2_data = assign(h2_data, h2_levels[i]);
  }
  return {
    c() {
      h2 = element("h2");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h2 = claim_element(nodes, "H2", { id: true, class: true, style: true });
      var h2_nodes = children(h2);
      if (default_slot)
        default_slot.l(h2_nodes);
      h2_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h2, h2_data);
    },
    m(target, anchor) {
      insert(target, h2, anchor);
      if (default_slot) {
        default_slot.m(h2, null);
      }
      ctx[7](h2);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h2, h2_data = get_spread_update(h2_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h2);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$F($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h2_binding];
}
class H2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$F, create_fragment$F, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$E(ctx) {
  let h3;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h3_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h3_data = {};
  for (let i = 0; i < h3_levels.length; i += 1) {
    h3_data = assign(h3_data, h3_levels[i]);
  }
  return {
    c() {
      h3 = element("h3");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h3 = claim_element(nodes, "H3", { id: true, class: true, style: true });
      var h3_nodes = children(h3);
      if (default_slot)
        default_slot.l(h3_nodes);
      h3_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h3, h3_data);
    },
    m(target, anchor) {
      insert(target, h3, anchor);
      if (default_slot) {
        default_slot.m(h3, null);
      }
      ctx[7](h3);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h3, h3_data = get_spread_update(h3_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h3);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$E($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h3_binding];
}
class H3 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$E, create_fragment$E, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$D(ctx) {
  let h4;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h4_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h4_data = {};
  for (let i = 0; i < h4_levels.length; i += 1) {
    h4_data = assign(h4_data, h4_levels[i]);
  }
  return {
    c() {
      h4 = element("h4");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h4 = claim_element(nodes, "H4", { id: true, class: true, style: true });
      var h4_nodes = children(h4);
      if (default_slot)
        default_slot.l(h4_nodes);
      h4_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h4, h4_data);
    },
    m(target, anchor) {
      insert(target, h4, anchor);
      if (default_slot) {
        default_slot.m(h4, null);
      }
      ctx[7](h4);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h4, h4_data = get_spread_update(h4_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h4);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$D($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h4_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h4_binding];
}
class H4 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$D, create_fragment$D, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$C(ctx) {
  let h5;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h5_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h5_data = {};
  for (let i = 0; i < h5_levels.length; i += 1) {
    h5_data = assign(h5_data, h5_levels[i]);
  }
  return {
    c() {
      h5 = element("h5");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h5 = claim_element(nodes, "H5", { id: true, class: true, style: true });
      var h5_nodes = children(h5);
      if (default_slot)
        default_slot.l(h5_nodes);
      h5_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h5, h5_data);
    },
    m(target, anchor) {
      insert(target, h5, anchor);
      if (default_slot) {
        default_slot.m(h5, null);
      }
      ctx[7](h5);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h5, h5_data = get_spread_update(h5_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h5);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$C($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h5_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h5_binding];
}
class H5 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$C, create_fragment$C, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$B(ctx) {
  let h6;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let h6_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let h6_data = {};
  for (let i = 0; i < h6_levels.length; i += 1) {
    h6_data = assign(h6_data, h6_levels[i]);
  }
  return {
    c() {
      h6 = element("h6");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      h6 = claim_element(nodes, "H6", { id: true, class: true, style: true });
      var h6_nodes = children(h6);
      if (default_slot)
        default_slot.l(h6_nodes);
      h6_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(h6, h6_data);
    },
    m(target, anchor) {
      insert(target, h6, anchor);
      if (default_slot) {
        default_slot.m(h6, null);
      }
      ctx[7](h6);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(h6, h6_data = get_spread_update(h6_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(h6);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$B($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function h6_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, h6_binding];
}
class H6 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$B, create_fragment$B, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$A(ctx) {
  let p;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let p_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let p_data = {};
  for (let i = 0; i < p_levels.length; i += 1) {
    p_data = assign(p_data, p_levels[i]);
  }
  return {
    c() {
      p = element("p");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { id: true, class: true, style: true });
      var p_nodes = children(p);
      if (default_slot)
        default_slot.l(p_nodes);
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(p, p_data);
    },
    m(target, anchor) {
      insert(target, p, anchor);
      if (default_slot) {
        default_slot.m(p, null);
      }
      ctx[7](p);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(p, p_data = get_spread_update(p_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(p);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$A($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function p_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, p_binding];
}
class P extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$A, create_fragment$A, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$z(ctx) {
  let div;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let div_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[14](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(div, "click", ctx[7]),
          listen(div, "mousedown", ctx[8]),
          listen(div, "mouseup", ctx[9]),
          listen(div, "keydown", ctx[10]),
          listen(div, "keyup", ctx[11]),
          listen(div, "focus", ctx[12]),
          listen(div, "blur", ctx[13])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
      ctx[14](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$z($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    div_binding
  ];
}
class Div extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$z, create_fragment$z, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$y(ctx) {
  let img;
  let mounted;
  let dispose;
  let img_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { alt: ctx[4] },
    ctx[5]
  ];
  let img_data = {};
  for (let i = 0; i < img_levels.length; i += 1) {
    img_data = assign(img_data, img_levels[i]);
  }
  return {
    c() {
      img = element("img");
      this.h();
    },
    l(nodes) {
      img = claim_element(nodes, "IMG", {
        id: true,
        class: true,
        style: true,
        alt: true
      });
      this.h();
    },
    h() {
      set_attributes(img, img_data);
    },
    m(target, anchor) {
      insert(target, img, anchor);
      ctx[13](img);
      if (!mounted) {
        dispose = [
          listen(img, "click", ctx[6]),
          listen(img, "mousedown", ctx[7]),
          listen(img, "mouseup", ctx[8]),
          listen(img, "keydown", ctx[9]),
          listen(img, "keyup", ctx[10]),
          listen(img, "focus", ctx[11]),
          listen(img, "blur", ctx[12])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(img, img_data = get_spread_update(img_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { alt: ctx2[4] },
        dirty & 32 && ctx2[5]
      ]));
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      ctx[13](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$y($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "alt"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = null } = $$props;
  let { alt } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function img_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("alt" in $$new_props)
      $$invalidate(4, alt = $$new_props.alt);
  };
  return [
    dom,
    className,
    style,
    id,
    alt,
    $$restProps,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    img_binding
  ];
}
class Img extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$y, create_fragment$y, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      alt: 4
    });
  }
}
function create_fragment$x(ctx) {
  let i;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let i_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    ctx[4]
  ];
  let i_data = {};
  for (let i2 = 0; i2 < i_levels.length; i2 += 1) {
    i_data = assign(i_data, i_levels[i2]);
  }
  return {
    c() {
      i = element("i");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      i = claim_element(nodes, "I", { id: true, class: true, style: true });
      var i_nodes = children(i);
      if (default_slot)
        default_slot.l(i_nodes);
      i_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(i, i_data);
    },
    m(target, anchor) {
      insert(target, i, anchor);
      if (default_slot) {
        default_slot.m(i, null);
      }
      ctx[16](i);
      current = true;
      if (!mounted) {
        dispose = [
          listen(i, "click", ctx[7]),
          listen(i, "mousedown", ctx[8]),
          listen(i, "mouseup", ctx[9]),
          listen(i, "keydown", ctx[10]),
          listen(i, "keyup", ctx[11]),
          listen(i, "focusin", ctx[12]),
          listen(i, "focusout", ctx[13]),
          listen(i, "focus", ctx[14]),
          listen(i, "blur", ctx[15])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(i, i_data = get_spread_update(i_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(i);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$x($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = null } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function i_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    focus_handler,
    blur_handler,
    i_binding
  ];
}
class I extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$x, create_fragment$x, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$w(ctx) {
  let svg;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let svg_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { xmlns: "http://www.w3.org/2000/svg" },
    ctx[4]
  ];
  let svg_data = {};
  for (let i = 0; i < svg_levels.length; i += 1) {
    svg_data = assign(svg_data, svg_levels[i]);
  }
  return {
    c() {
      svg = svg_element("svg");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      svg = claim_element(nodes, "svg", {
        id: true,
        class: true,
        style: true,
        xmlns: true
      }, 1);
      var svg_nodes = children(svg);
      if (default_slot)
        default_slot.l(svg_nodes);
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_svg_attributes(svg, svg_data);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      if (default_slot) {
        default_slot.m(svg, null);
      }
      ctx[16](svg);
      current = true;
      if (!mounted) {
        dispose = [
          listen(svg, "click", ctx[7]),
          listen(svg, "mousedown", ctx[8]),
          listen(svg, "mouseup", ctx[9]),
          listen(svg, "keydown", ctx[10]),
          listen(svg, "keyup", ctx[11]),
          listen(svg, "focusin", ctx[12]),
          listen(svg, "focusout", ctx[13]),
          listen(svg, "focus", ctx[14]),
          listen(svg, "blur", ctx[15])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2) && { class: ctx2[1] },
        (!current || dirty & 4) && { style: ctx2[2] },
        { xmlns: "http://www.w3.org/2000/svg" },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(svg);
      if (default_slot)
        default_slot.d(detaching);
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$w($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = null } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function svg_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    $$restProps,
    $$scope,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    focus_handler,
    blur_handler,
    svg_binding
  ];
}
class Svg extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$w, create_fragment$w, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
const getContext = getContext$1;
const setContext = setContext$1;
function createContextWritableStore() {
  const key = {};
  const setContextValue = new Proxy(writable, {
    apply(target, _thisArg, args) {
      const context$ = target(...args);
      setContext(key, context$);
      return context$;
    }
  });
  function getContextValue() {
    return getContext(key);
  }
  return [setContextValue, getContextValue];
}
function createContextStore() {
  const key = {};
  const setContextValue = new Proxy(readable, {
    apply(target, _thisArg, args) {
      const context$ = target(...args);
      setContext(key, context$);
      return context$;
    }
  });
  function getContextValue() {
    return getContext(key);
  }
  return [setContextValue, getContextValue];
}
function createContext$1() {
  const key = {};
  function setContextValue(context) {
    setContext(key, context);
    return context;
  }
  function getContextValue() {
    return getContext(key);
  }
  return [setContextValue, getContextValue];
}
function create_default_slot$i(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
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
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[9], !current ? -1 : dirty, null, null);
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
function create_fragment$v(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([ctx[1], "mdc-top-app-bar__title"])
    },
    { style: ctx[2] },
    ctx[5]
  ];
  function switch_instance_dom_binding(value) {
    ctx[8](value);
  }
  var switch_value = ctx[4];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$i] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
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
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & 46 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && {
          class: classList([ctx2[1], "mdc-top-app-bar__title"])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 32 && get_spread_object(ctx2[5])
      ]) : {};
      if (dirty & 512) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[4])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
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
function instance$v($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "href"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let component = href ? A : Span;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("href" in $$new_props)
      $$invalidate(6, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    component,
    $$restProps,
    href,
    slots,
    switch_instance_dom_binding,
    $$scope
  ];
}
class Title extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$v, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      href: 6
    });
  }
}
class SMUIRipple {
  constructor(root, { classForward, keyboardEvents }) {
    __publicField(this, "root");
    __publicField(this, "active", false);
    __publicField(this, "ripple");
    __privateAdd(this, _unbounded, false);
    this.root = root;
    let classList2 = [];
    if (keyboardEvents) {
      this.root.addEventListener("keydown", (event) => {
        if (isSubmitKey(event))
          this.active = true;
      });
      this.root.addEventListener("keyup", (event) => {
        if (isSubmitKey(event))
          this.active = false;
      });
    }
    const adapter = __spreadProps(__spreadValues({}, MDCRipple.createAdapter(this)), {
      addClass: (className) => {
        const idx = classList2.indexOf(className);
        if (idx === -1) {
          this.root.classList.add(className);
          classList2.push(className);
          if (classForward) {
            classForward([...classList2]);
          }
        }
      },
      removeClass: (className) => {
        const idx = classList2.indexOf(className);
        if (idx !== -1) {
          this.root.classList.remove(className);
          classList2.splice(idx, 1);
          if (classForward) {
            classForward(classList2);
          }
        }
      }
    });
    if (keyboardEvents) {
      adapter.isSurfaceActive = () => this.active;
    }
    const foundation = new MDCRippleFoundation(adapter);
    this.ripple = new MDCRipple(this.root, foundation);
    this.root.addEventListener("focusout", () => {
      this.ripple.deactivate();
    });
  }
  get unbounded() {
    var _a2, _b2;
    return (_b2 = (_a2 = this.ripple) == null ? void 0 : _a2.unbounded) != null ? _b2 : __privateGet(this, _unbounded);
  }
  set unbounded(unbounded) {
    this.ripple.unbounded = unbounded;
    __privateSet(this, _unbounded, unbounded);
  }
  destroy() {
    var _a2;
    (_a2 = this.ripple) == null ? void 0 : _a2.destroy();
  }
}
_unbounded = new WeakMap();
function isSubmitKey(event) {
  const isEnter = event.key === "Enter";
  const isSpace = event.key === "Space";
  return isEnter || isSpace;
}
var Ripple_svelte_svelte_type_style_lang = '.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity;position:relative;outline:none;overflow:hidden}.mdc-ripple-surface::before,.mdc-ripple-surface::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-ripple-surface::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-ripple-surface::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-ripple-surface.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-ripple-surface::before,.mdc-ripple-surface::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-ripple-surface:hover::before,.mdc-ripple-surface.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface::before,.mdc-ripple-surface::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded],.mdc-ripple-upgraded--unbounded{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after,.mdc-ripple-upgraded--unbounded::before,.mdc-ripple-upgraded--unbounded::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::before,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after,.mdc-ripple-upgraded--unbounded.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-ripple-surface--primary::before,.mdc-ripple-surface--primary::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, #c7b300)}.mdc-ripple-surface--primary:hover::before,.mdc-ripple-surface--primary.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-ripple-surface--secondary::before,.mdc-ripple-surface--secondary::after{background-color:#676778;background-color:var(--mdc-ripple-color, #676778)}.mdc-ripple-surface--secondary:hover::before,.mdc-ripple-surface--secondary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-ripple-surface--secondary.mdc-ripple-upgraded--background-focused::before,.mdc-ripple-surface--secondary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-ripple-surface--secondary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-ripple-surface--secondary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-ripple-surface--secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}';
const get_default_slot_changes$6 = (dirty) => ({
  rippleClasses: dirty & 1
});
const get_default_slot_context$6 = (ctx) => ({ rippleClasses: ctx[0] });
function create_fragment$u(ctx) {
  let t;
  let usestate;
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], get_default_slot_context$6);
  usestate = new UseState({
    props: {
      value: ctx[1],
      onUpdate: ctx[2]
    }
  });
  return {
    c() {
      if (default_slot)
        default_slot.c();
      t = space();
      create_component(usestate.$$.fragment);
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
      t = claim_space(nodes);
      claim_component(usestate.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert(target, t, anchor);
      mount_component(usestate, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 513)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[9], !current ? -1 : dirty, get_default_slot_changes$6, get_default_slot_context$6);
        }
      }
      const usestate_changes = {};
      if (dirty & 2)
        usestate_changes.value = ctx2[1];
      usestate.$set(usestate_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(usestate.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(usestate.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t);
      destroy_component(usestate, detaching);
    }
  };
}
function instance$u($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { target } = $$props;
  let { unbounded = void 0 } = $$props;
  let { color = void 0 } = $$props;
  let { keyboardEvents = void 0 } = $$props;
  let { rippleClasses = "" } = $$props;
  let forwardedClasses = "";
  let ripple;
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    yield tick();
    initialize();
  }));
  onDestroy(() => {
    ripple === null || ripple === void 0 ? void 0 : ripple.destroy();
  });
  function classForward(classList2) {
    $$invalidate(7, forwardedClasses = classList2.join(" "));
  }
  function initialize() {
    ripple === null || ripple === void 0 ? void 0 : ripple.destroy();
    $$invalidate(8, ripple = null);
    if (target) {
      $$invalidate(8, ripple = new SMUIRipple(target, { classForward, keyboardEvents }));
    }
  }
  function reinitialize() {
    initialize();
  }
  $$self.$$set = ($$props2) => {
    if ("target" in $$props2)
      $$invalidate(1, target = $$props2.target);
    if ("unbounded" in $$props2)
      $$invalidate(3, unbounded = $$props2.unbounded);
    if ("color" in $$props2)
      $$invalidate(4, color = $$props2.color);
    if ("keyboardEvents" in $$props2)
      $$invalidate(5, keyboardEvents = $$props2.keyboardEvents);
    if ("rippleClasses" in $$props2)
      $$invalidate(0, rippleClasses = $$props2.rippleClasses);
    if ("$$scope" in $$props2)
      $$invalidate(9, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 144) {
      $$invalidate(0, rippleClasses = classList([
        "mdc-ripple-upgraded",
        [color, "mdc-ripple-surface"],
        [color === "primary", "mdc-ripple-surface--primary"],
        [color === "secondary", "mdc-ripple-surface--accent"],
        forwardedClasses
      ]));
    }
    if ($$self.$$.dirty & 264) {
      if (ripple) {
        $$invalidate(8, ripple.unbounded = unbounded, ripple);
      }
    }
  };
  return [
    rippleClasses,
    target,
    initialize,
    unbounded,
    color,
    keyboardEvents,
    reinitialize,
    forwardedClasses,
    ripple,
    $$scope,
    slots
  ];
}
class Ripple extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$u, not_equal, {
      target: 1,
      unbounded: 3,
      color: 4,
      keyboardEvents: 5,
      rippleClasses: 0,
      reinitialize: 6
    });
  }
  get reinitialize() {
    return this.$$.ctx[6];
  }
}
function create_default_slot_1$4(ctx) {
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
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
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[18], !current ? -1 : dirty, null, null);
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
function create_default_slot$h(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-icon-button",
        [ctx[5], `svmd-icon-button--color--${ctx[5]}`],
        [ctx[4], ctx[20]]
      ])
    },
    { style: ctx[2] },
    { disabled: ctx[7] },
    { href: ctx[6] },
    ctx[8]
  ];
  function switch_instance_dom_binding(value) {
    ctx[10](value);
  }
  var switch_value = ctx[6] ? A : Button;
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_1$4] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[11]);
    switch_instance.$on("mousedown", ctx[12]);
    switch_instance.$on("mouseup", ctx[13]);
    switch_instance.$on("keydown", ctx[14]);
    switch_instance.$on("keyup", ctx[15]);
    switch_instance.$on("focus", ctx[16]);
    switch_instance.$on("blur", ctx[17]);
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
      const switch_instance_changes = dirty & 1049086 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 1048626 && {
          class: classList([
            ctx2[1],
            "mdc-icon-button",
            [ctx2[5], `svmd-icon-button--color--${ctx2[5]}`],
            [ctx2[4], ctx2[20]]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 64 && { href: ctx2[6] },
        dirty & 256 && get_spread_object(ctx2[8])
      ]) : {};
      if (dirty & 262144) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[6] ? A : Button)) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[11]);
          switch_instance.$on("mousedown", ctx2[12]);
          switch_instance.$on("mouseup", ctx2[13]);
          switch_instance.$on("keydown", ctx2[14]);
          switch_instance.$on("keyup", ctx2[15]);
          switch_instance.$on("focus", ctx2[16]);
          switch_instance.$on("blur", ctx2[17]);
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
function create_fragment$t(ctx) {
  let ripple_1;
  let current;
  ripple_1 = new Ripple({
    props: {
      target: ctx[4] ? ctx[0] : void 0,
      unbounded: true,
      $$slots: {
        default: [
          create_default_slot$h,
          ({ rippleClasses }) => ({ 20: rippleClasses }),
          ({ rippleClasses }) => rippleClasses ? 1048576 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(ripple_1.$$.fragment);
    },
    l(nodes) {
      claim_component(ripple_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(ripple_1, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const ripple_1_changes = {};
      if (dirty & 17)
        ripple_1_changes.target = ctx2[4] ? ctx2[0] : void 0;
      if (dirty & 1311231) {
        ripple_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ripple_1.$set(ripple_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(ripple_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(ripple_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(ripple_1, detaching);
    }
  };
}
function instance$t($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "ripple", "color", "href", "disabled"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { disabled = false } = $$props;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("href" in $$new_props)
      $$invalidate(6, href = $$new_props.href);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 192)
      ;
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    href,
    disabled,
    $$restProps,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    $$scope
  ];
}
class IconButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$t, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      href: 6,
      disabled: 7
    });
  }
}
function create_default_slot$g(ctx) {
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[20], null);
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
        if (default_slot.p && (!current || dirty & 1048576)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[20], !current ? -1 : dirty, null, null);
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
function create_fragment$s(ctx) {
  let iconbutton;
  let updating_dom;
  let t;
  let iconbuttonstyles;
  let current;
  const iconbutton_spread_levels = [
    { id: ctx[3] },
    { class: classList([ctx[1]]) },
    { style: ctx[2] },
    { disabled: ctx[7] },
    { href: ctx[6] },
    { color: ctx[5] },
    { ripple: ctx[4] },
    ctx[8]
  ];
  function iconbutton_dom_binding(value) {
    ctx[10](value);
  }
  let iconbutton_props = {
    $$slots: { default: [create_default_slot$g] },
    $$scope: { ctx }
  };
  for (let i = 0; i < iconbutton_spread_levels.length; i += 1) {
    iconbutton_props = assign(iconbutton_props, iconbutton_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    iconbutton_props.dom = ctx[0];
  }
  iconbutton = new IconButton({ props: iconbutton_props });
  binding_callbacks.push(() => bind(iconbutton, "dom", iconbutton_dom_binding));
  iconbutton.$on("click", ctx[11]);
  iconbutton.$on("mousedown", ctx[12]);
  iconbutton.$on("mouseup", ctx[13]);
  iconbutton.$on("keydown", ctx[14]);
  iconbutton.$on("keyup", ctx[15]);
  iconbutton.$on("focus", ctx[16]);
  iconbutton.$on("blur", ctx[17]);
  iconbutton.$on("focusin", ctx[18]);
  iconbutton.$on("focusout", ctx[19]);
  iconbuttonstyles = new IconButtonStyles({});
  return {
    c() {
      create_component(iconbutton.$$.fragment);
      t = space();
      create_component(iconbuttonstyles.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(iconbuttonstyles.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      insert(target, t, anchor);
      mount_component(iconbuttonstyles, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const iconbutton_changes = dirty & 510 ? get_spread_update(iconbutton_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: classList([ctx2[1]]) },
        dirty & 4 && { style: ctx2[2] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 64 && { href: ctx2[6] },
        dirty & 32 && { color: ctx2[5] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 256 && get_spread_object(ctx2[8])
      ]) : {};
      if (dirty & 1048576) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        iconbutton_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      transition_in(iconbuttonstyles.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      transition_out(iconbuttonstyles.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
      if (detaching)
        detach(t);
      destroy_component(iconbuttonstyles, detaching);
    }
  };
}
let count$4 = 0;
function instance$s($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "ripple", "color", "href", "disabled"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@svelte-material-design/button/IconButton:${count$4++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { disabled = false } = $$props;
  function iconbutton_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("href" in $$new_props)
      $$invalidate(6, href = $$new_props.href);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("$$scope" in $$new_props)
      $$invalidate(20, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    href,
    disabled,
    $$restProps,
    slots,
    iconbutton_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class IconButton_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$s, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      href: 6,
      disabled: 7
    });
  }
}
var Portal_svelte_svelte_type_style_lang = ".portal.svelte-2rvt3a{display:none}";
var Fragment_svelte_svelte_type_style_lang = ".fragment.svelte-123r4l0{display:none}";
var ExtractNamedSlot_svelte_svelte_type_style_lang = ".extract-named-slot-fragment.svelte-2xumix{display:none}";
function create_default_slot$f(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
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
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[18], !current ? -1 : dirty, null, null);
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
function create_fragment$r(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        [
          ctx[4] === "icon" && ctx[1] == void 0,
          "material-icons"
        ]
      ])
    },
    { style: ctx[2] },
    ctx[6]
  ];
  function switch_instance_dom_binding(value) {
    ctx[8](value);
  }
  var switch_value = ctx[5];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$f] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[9]);
    switch_instance.$on("mousedown", ctx[10]);
    switch_instance.$on("mouseup", ctx[11]);
    switch_instance.$on("keydown", ctx[12]);
    switch_instance.$on("keyup", ctx[13]);
    switch_instance.$on("focusin", ctx[14]);
    switch_instance.$on("focusout", ctx[15]);
    switch_instance.$on("focus", ctx[16]);
    switch_instance.$on("blur", ctx[17]);
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
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & 94 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 18 && {
          class: classList([
            ctx2[1],
            [
              ctx2[4] === "icon" && ctx2[1] == void 0,
              "material-icons"
            ]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 64 && get_spread_object(ctx2[6])
      ]) : {};
      if (dirty & 262144) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[5])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[9]);
          switch_instance.$on("mousedown", ctx2[10]);
          switch_instance.$on("mouseup", ctx2[11]);
          switch_instance.$on("keydown", ctx2[12]);
          switch_instance.$on("keyup", ctx2[13]);
          switch_instance.$on("focusin", ctx2[14]);
          switch_instance.$on("focusout", ctx2[15]);
          switch_instance.$on("focus", ctx2[16]);
          switch_instance.$on("blur", ctx2[17]);
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
function instance$r($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "type"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { type = "icon" } = $$props;
  let component;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("type" in $$new_props)
      $$invalidate(4, type = $$new_props.type);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 16) {
      switch (type) {
        case "svg":
          $$invalidate(5, component = Svg);
          break;
        case "icon":
          $$invalidate(5, component = I);
          break;
        case "img":
          $$invalidate(5, component = Img);
          break;
      }
    }
  };
  return [
    dom,
    className,
    style,
    id,
    type,
    component,
    $$restProps,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    focus_handler,
    blur_handler,
    $$scope
  ];
}
class Graphic extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$r, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      type: 4
    });
  }
}
function create_default_slot$e(ctx) {
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
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
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[8], !current ? -1 : dirty, null, null);
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
function create_fragment$q(ctx) {
  let graphic;
  let updating_dom;
  let current;
  const graphic_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-icon-button__icon",
        [
          ctx[4] === "icon" && ctx[1] == void 0,
          "material-icons"
        ]
      ])
    },
    { style: ctx[2] },
    { type: ctx[4] },
    ctx[5]
  ];
  function graphic_dom_binding(value) {
    ctx[7](value);
  }
  let graphic_props = {
    $$slots: { default: [create_default_slot$e] },
    $$scope: { ctx }
  };
  for (let i = 0; i < graphic_spread_levels.length; i += 1) {
    graphic_props = assign(graphic_props, graphic_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    graphic_props.dom = ctx[0];
  }
  graphic = new Graphic({ props: graphic_props });
  binding_callbacks.push(() => bind(graphic, "dom", graphic_dom_binding));
  return {
    c() {
      create_component(graphic.$$.fragment);
    },
    l(nodes) {
      claim_component(graphic.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(graphic, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const graphic_changes = dirty & 62 ? get_spread_update(graphic_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 18 && {
          class: classList([
            ctx2[1],
            "mdc-icon-button__icon",
            [
              ctx2[4] === "icon" && ctx2[1] == void 0,
              "material-icons"
            ]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { type: ctx2[4] },
        dirty & 32 && get_spread_object(ctx2[5])
      ]) : {};
      if (dirty & 256) {
        graphic_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        graphic_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      graphic.$set(graphic_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(graphic.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(graphic.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(graphic, detaching);
    }
  };
}
function instance$q($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "type"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { type = "icon" } = $$props;
  function graphic_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(5, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("type" in $$new_props)
      $$invalidate(4, type = $$new_props.type);
    if ("$$scope" in $$new_props)
      $$invalidate(8, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    type,
    $$restProps,
    slots,
    graphic_dom_binding,
    $$scope
  ];
}
class Icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$q, create_fragment$q, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      type: 4
    });
  }
}
var IconButtonStyles_svelte_svelte_type_style_lang = '.mdc-icon-button{display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;font-size:24px;text-decoration:none;cursor:pointer;user-select:none;width:48px;height:48px;padding:12px}.mdc-icon-button svg,.mdc-icon-button img{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38))}.mdc-icon-button:disabled{cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-icon-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-icon-button::before,.mdc-icon-button::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-icon-button::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-icon-button::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-icon-button.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-icon-button::before,.mdc-icon-button::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded::before,.mdc-icon-button.mdc-ripple-upgraded::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-icon-button::before,.mdc-icon-button::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-icon-button:hover::before,.mdc-icon-button.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-icon-button:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.svmd-icon-button--color--primary{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.svmd-icon-button--color--primary::before,.svmd-icon-button--color--primary::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}.svmd-icon-button--color--primary:hover::before,.svmd-icon-button--color--primary.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.svmd-icon-button--color--primary.mdc-ripple-upgraded--background-focused::before,.svmd-icon-button--color--primary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.svmd-icon-button--color--primary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.svmd-icon-button--color--primary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.svmd-icon-button--color--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.svmd-icon-button--color--secondary{color:#676778;color:var(--mdc-theme-secondary, #676778)}.svmd-icon-button--color--secondary::before,.svmd-icon-button--color--secondary::after{background-color:#676778;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #676778))}.svmd-icon-button--color--secondary:hover::before,.svmd-icon-button--color--secondary.mdc-ripple-surface--hover::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.svmd-icon-button--color--secondary.mdc-ripple-upgraded--background-focused::before,.svmd-icon-button--color--secondary:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.svmd-icon-button--color--secondary:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.svmd-icon-button--color--secondary:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.svmd-icon-button--color--secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}';
class IconButtonStyles extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
}
function create_default_slot$d(ctx) {
  let current;
  const default_slot_template = ctx[8].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[17], null);
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
        if (default_slot.p && (!current || dirty & 131072)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[17], !current ? -1 : dirty, null, null);
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
function create_fragment$p(ctx) {
  let iconbutton;
  let updating_dom;
  let current;
  const iconbutton_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([ctx[1], "mdc-top-app-bar__navigation-icon"])
    },
    { style: ctx[2] },
    { disabled: ctx[6] },
    { color: ctx[5] },
    { ripple: ctx[4] },
    ctx[7]
  ];
  function iconbutton_dom_binding(value) {
    ctx[9](value);
  }
  let iconbutton_props = {
    $$slots: { default: [create_default_slot$d] },
    $$scope: { ctx }
  };
  for (let i = 0; i < iconbutton_spread_levels.length; i += 1) {
    iconbutton_props = assign(iconbutton_props, iconbutton_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    iconbutton_props.dom = ctx[0];
  }
  iconbutton = new IconButton({ props: iconbutton_props });
  binding_callbacks.push(() => bind(iconbutton, "dom", iconbutton_dom_binding));
  iconbutton.$on("click", ctx[10]);
  iconbutton.$on("mousedown", ctx[11]);
  iconbutton.$on("mouseup", ctx[12]);
  iconbutton.$on("keydown", ctx[13]);
  iconbutton.$on("keyup", ctx[14]);
  iconbutton.$on("focus", ctx[15]);
  iconbutton.$on("blur", ctx[16]);
  return {
    c() {
      create_component(iconbutton.$$.fragment);
    },
    l(nodes) {
      claim_component(iconbutton.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(iconbutton, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const iconbutton_changes = dirty & 254 ? get_spread_update(iconbutton_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && {
          class: classList([ctx2[1], "mdc-top-app-bar__navigation-icon"])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 64 && { disabled: ctx2[6] },
        dirty & 32 && { color: ctx2[5] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 128 && get_spread_object(ctx2[7])
      ]) : {};
      if (dirty & 131072) {
        iconbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        iconbutton_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      iconbutton.$set(iconbutton_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(iconbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(iconbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(iconbutton, detaching);
    }
  };
}
function instance$p($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "ripple", "color", "disabled"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = void 0 } = $$props;
  let { disabled = false } = $$props;
  function iconbutton_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(7, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("disabled" in $$new_props)
      $$invalidate(6, disabled = $$new_props.disabled);
    if ("$$scope" in $$new_props)
      $$invalidate(17, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    disabled,
    $$restProps,
    slots,
    iconbutton_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    $$scope
  ];
}
class NavigationIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$p, create_fragment$p, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      disabled: 6
    });
  }
}
const [setButtonContext, getButtonContext] = createContextWritableStore();
const get_trailing_slot_changes$2 = (dirty) => ({});
const get_trailing_slot_context$2 = (ctx) => ({});
const get_leading_slot_changes$2 = (dirty) => ({});
const get_leading_slot_context$2 = (ctx) => ({});
function create_if_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "mdc-button__ripple");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "mdc-button__touch");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot_1$3(ctx) {
  let t0;
  let t1;
  let t2;
  let t3;
  let current;
  let if_block0 = ctx[4] && create_if_block_1();
  let if_block1 = ctx[9] && create_if_block$3();
  const leading_slot_template = ctx[14].leading;
  const leading_slot = create_slot(leading_slot_template, ctx, ctx[25], get_leading_slot_context$2);
  const default_slot_template = ctx[14].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[25], null);
  const trailing_slot_template = ctx[14].trailing;
  const trailing_slot = create_slot(trailing_slot_template, ctx, ctx[25], get_trailing_slot_context$2);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (leading_slot)
        leading_slot.c();
      t2 = space();
      if (default_slot)
        default_slot.c();
      t3 = space();
      if (trailing_slot)
        trailing_slot.c();
    },
    l(nodes) {
      if (if_block0)
        if_block0.l(nodes);
      t0 = claim_space(nodes);
      if (if_block1)
        if_block1.l(nodes);
      t1 = claim_space(nodes);
      if (leading_slot)
        leading_slot.l(nodes);
      t2 = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      t3 = claim_space(nodes);
      if (trailing_slot)
        trailing_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert(target, t0, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, t1, anchor);
      if (leading_slot) {
        leading_slot.m(target, anchor);
      }
      insert(target, t2, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert(target, t3, anchor);
      if (trailing_slot) {
        trailing_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[4]) {
        if (if_block0)
          ;
        else {
          if_block0 = create_if_block_1();
          if_block0.c();
          if_block0.m(t0.parentNode, t0);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (ctx2[9]) {
        if (if_block1)
          ;
        else {
          if_block1 = create_if_block$3();
          if_block1.c();
          if_block1.m(t1.parentNode, t1);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & 33554432)) {
          update_slot(leading_slot, leading_slot_template, ctx2, ctx2[25], !current ? -1 : dirty, get_leading_slot_changes$2, get_leading_slot_context$2);
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 33554432)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[25], !current ? -1 : dirty, null, null);
        }
      }
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & 33554432)) {
          update_slot(trailing_slot, trailing_slot_template, ctx2, ctx2[25], !current ? -1 : dirty, get_trailing_slot_changes$2, get_trailing_slot_context$2);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      transition_in(default_slot, local);
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      transition_out(default_slot, local);
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t0);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(t1);
      if (leading_slot)
        leading_slot.d(detaching);
      if (detaching)
        detach(t2);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t3);
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_default_slot$c(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-button",
        [ctx[6], `mdc-button--${ctx[6]}`],
        [ctx[5] === "secondary", "svmd-button--color--secondary"],
        [ctx[9], "mdc-button--touch"],
        [ctx[4], ctx[26]],
        [ctx[10], "mdc-button--icon-leading"],
        [ctx[11], "mdc-button--icon-trailing"]
      ])
    },
    { style: ctx[2] },
    { disabled: ctx[7] },
    { href: ctx[8] },
    ctx[13]
  ];
  function switch_instance_dom_binding(value) {
    ctx[15](value);
  }
  var switch_value = ctx[12];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_1$3] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[16]);
    switch_instance.$on("mousedown", ctx[17]);
    switch_instance.$on("mouseup", ctx[18]);
    switch_instance.$on("keydown", ctx[19]);
    switch_instance.$on("keyup", ctx[20]);
    switch_instance.$on("focus", ctx[21]);
    switch_instance.$on("blur", ctx[22]);
    switch_instance.$on("focusin", ctx[23]);
    switch_instance.$on("focusout", ctx[24]);
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
      const switch_instance_changes = dirty & 67121150 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 67112562 && {
          class: classList([
            ctx2[1],
            "mdc-button",
            [ctx2[6], `mdc-button--${ctx2[6]}`],
            [ctx2[5] === "secondary", "svmd-button--color--secondary"],
            [ctx2[9], "mdc-button--touch"],
            [ctx2[4], ctx2[26]],
            [ctx2[10], "mdc-button--icon-leading"],
            [ctx2[11], "mdc-button--icon-trailing"]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 256 && { href: ctx2[8] },
        dirty & 8192 && get_spread_object(ctx2[13])
      ]) : {};
      if (dirty & 33554960) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[12])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[16]);
          switch_instance.$on("mousedown", ctx2[17]);
          switch_instance.$on("mouseup", ctx2[18]);
          switch_instance.$on("keydown", ctx2[19]);
          switch_instance.$on("keyup", ctx2[20]);
          switch_instance.$on("focus", ctx2[21]);
          switch_instance.$on("blur", ctx2[22]);
          switch_instance.$on("focusin", ctx2[23]);
          switch_instance.$on("focusout", ctx2[24]);
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
function create_fragment$o(ctx) {
  let ripple_1;
  let current;
  ripple_1 = new Ripple({
    props: {
      target: ctx[4] ? ctx[0] : void 0,
      $$slots: {
        default: [
          create_default_slot$c,
          ({ rippleClasses }) => ({ 26: rippleClasses }),
          ({ rippleClasses }) => rippleClasses ? 67108864 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(ripple_1.$$.fragment);
    },
    l(nodes) {
      claim_component(ripple_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(ripple_1, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const ripple_1_changes = {};
      if (dirty & 17)
        ripple_1_changes.target = ctx2[4] ? ctx2[0] : void 0;
      if (dirty & 100679679) {
        ripple_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ripple_1.$set(ripple_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(ripple_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(ripple_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(ripple_1, detaching);
    }
  };
}
function instance$o($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "color",
    "variant",
    "disabled",
    "href",
    "accessibleTouch",
    "hasLeadingIcon",
    "hasTrailingIcon"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = "primary" } = $$props;
  let { variant = "text" } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { accessibleTouch = false } = $$props;
  let { hasLeadingIcon = false } = $$props;
  let { hasTrailingIcon = false } = $$props;
  let component;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("variant" in $$new_props)
      $$invalidate(6, variant = $$new_props.variant);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("href" in $$new_props)
      $$invalidate(8, href = $$new_props.href);
    if ("accessibleTouch" in $$new_props)
      $$invalidate(9, accessibleTouch = $$new_props.accessibleTouch);
    if ("hasLeadingIcon" in $$new_props)
      $$invalidate(10, hasLeadingIcon = $$new_props.hasLeadingIcon);
    if ("hasTrailingIcon" in $$new_props)
      $$invalidate(11, hasTrailingIcon = $$new_props.hasTrailingIcon);
    if ("$$scope" in $$new_props)
      $$invalidate(25, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 384) {
      $$invalidate(12, component = href == null || disabled ? Button : A);
    }
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    variant,
    disabled,
    href,
    accessibleTouch,
    hasLeadingIcon,
    hasTrailingIcon,
    component,
    $$restProps,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class Button_1$2 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$o, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      variant: 6,
      disabled: 7,
      href: 8,
      accessibleTouch: 9,
      hasLeadingIcon: 10,
      hasTrailingIcon: 11
    });
  }
}
function create_fragment$n(ctx) {
  let span;
  let span_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let span_levels = [
    ctx[4],
    { id: ctx[3] },
    {
      class: span_class_value = classList([ctx[1], "mdc-button__label"])
    },
    { style: ctx[2] },
    ctx[4]
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { id: true, class: true, style: true });
      var span_nodes = children(span);
      if (default_slot)
        default_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if (default_slot) {
        default_slot.m(span, null);
      }
      ctx[7](span);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        dirty & 16 && ctx2[4],
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2 && span_class_value !== (span_class_value = classList([ctx2[1], "mdc-button__label"]))) && { class: span_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(span);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$n($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, span_binding];
}
class Label extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$n, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
const get_leading_slot_changes$1 = (dirty) => ({});
const get_leading_slot_context$1 = (ctx) => ({ slot: "leading" });
const get_trailing_slot_changes$1 = (dirty) => ({});
const get_trailing_slot_context$1 = (ctx) => ({ slot: "trailing" });
function create_default_slot$b(ctx) {
  let current;
  const default_slot_template = ctx[13].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[24], null);
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
        if (default_slot.p && (!current || dirty & 16777216)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[24], !current ? -1 : dirty, null, null);
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
function create_leading_slot$1(ctx) {
  let current;
  const leading_slot_template = ctx[13].leading;
  const leading_slot = create_slot(leading_slot_template, ctx, ctx[24], get_leading_slot_context$1);
  return {
    c() {
      if (leading_slot)
        leading_slot.c();
    },
    l(nodes) {
      if (leading_slot)
        leading_slot.l(nodes);
    },
    m(target, anchor) {
      if (leading_slot) {
        leading_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & 16777216)) {
          update_slot(leading_slot, leading_slot_template, ctx2, ctx2[24], !current ? -1 : dirty, get_leading_slot_changes$1, get_leading_slot_context$1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_trailing_slot$1(ctx) {
  let current;
  const trailing_slot_template = ctx[13].trailing;
  const trailing_slot = create_slot(trailing_slot_template, ctx, ctx[24], get_trailing_slot_context$1);
  return {
    c() {
      if (trailing_slot)
        trailing_slot.c();
    },
    l(nodes) {
      if (trailing_slot)
        trailing_slot.l(nodes);
    },
    m(target, anchor) {
      if (trailing_slot) {
        trailing_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & 16777216)) {
          update_slot(trailing_slot, trailing_slot_template, ctx2, ctx2[24], !current ? -1 : dirty, get_trailing_slot_changes$1, get_trailing_slot_context$1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_fragment$m(ctx) {
  let button;
  let updating_dom;
  let current;
  const button_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { variant: ctx[6] },
    { ripple: ctx[4] },
    { color: ctx[5] },
    { style: ctx[2] },
    { disabled: ctx[7] },
    { href: ctx[8] },
    {
      accessibleTouch: ctx[9]
    },
    {
      hasLeadingIcon: ctx[10]
    },
    {
      hasTrailingIcon: ctx[11]
    },
    ctx[12]
  ];
  function button_dom_binding(value) {
    ctx[14](value);
  }
  let button_props = {
    $$slots: {
      trailing: [create_trailing_slot$1],
      leading: [create_leading_slot$1],
      default: [create_default_slot$b]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < button_spread_levels.length; i += 1) {
    button_props = assign(button_props, button_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    button_props.dom = ctx[0];
  }
  button = new Button_1$2({ props: button_props });
  binding_callbacks.push(() => bind(button, "dom", button_dom_binding));
  button.$on("click", ctx[15]);
  button.$on("mousedown", ctx[16]);
  button.$on("mouseup", ctx[17]);
  button.$on("keydown", ctx[18]);
  button.$on("keyup", ctx[19]);
  button.$on("focus", ctx[20]);
  button.$on("blur", ctx[21]);
  button.$on("focusin", ctx[22]);
  button.$on("focusout", ctx[23]);
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
    p(ctx2, [dirty]) {
      const button_changes = dirty & 8190 ? get_spread_update(button_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 64 && { variant: ctx2[6] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 32 && { color: ctx2[5] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 256 && { href: ctx2[8] },
        dirty & 512 && {
          accessibleTouch: ctx2[9]
        },
        dirty & 1024 && {
          hasLeadingIcon: ctx2[10]
        },
        dirty & 2048 && {
          hasTrailingIcon: ctx2[11]
        },
        dirty & 4096 && get_spread_object(ctx2[12])
      ]) : {};
      if (dirty & 16777216) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        button_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
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
function instance$m($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "color",
    "variant",
    "disabled",
    "href",
    "accessibleTouch"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = "primary" } = $$props;
  let { variant = "text" } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { accessibleTouch = false } = $$props;
  let hasLeadingIcon = false;
  let hasTrailingIcon = false;
  setButtonContext({
    setHasLeadingIcon(value) {
      $$invalidate(10, hasLeadingIcon = value);
    },
    setHasTrailingIcon(value) {
      $$invalidate(11, hasTrailingIcon = value);
    }
  });
  function button_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("variant" in $$new_props)
      $$invalidate(6, variant = $$new_props.variant);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("href" in $$new_props)
      $$invalidate(8, href = $$new_props.href);
    if ("accessibleTouch" in $$new_props)
      $$invalidate(9, accessibleTouch = $$new_props.accessibleTouch);
    if ("$$scope" in $$new_props)
      $$invalidate(24, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    variant,
    disabled,
    href,
    accessibleTouch,
    hasLeadingIcon,
    hasTrailingIcon,
    $$restProps,
    slots,
    button_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class Button_1$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$m, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      variant: 6,
      disabled: 7,
      href: 8,
      accessibleTouch: 9
    });
  }
}
function create_default_slot$a(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
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
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[9], !current ? -1 : dirty, null, null);
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
function create_fragment$l(ctx) {
  let graphic;
  let updating_dom;
  let current;
  const graphic_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-button__icon",
        [
          ctx[4] === "icon" && ctx[1] == void 0,
          "material-icons"
        ]
      ])
    },
    { style: ctx[2] },
    { type: ctx[4] },
    { "aria-hidden": true },
    ctx[6]
  ];
  function graphic_dom_binding(value) {
    ctx[8](value);
  }
  let graphic_props = {
    $$slots: { default: [create_default_slot$a] },
    $$scope: { ctx }
  };
  for (let i = 0; i < graphic_spread_levels.length; i += 1) {
    graphic_props = assign(graphic_props, graphic_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    graphic_props.dom = ctx[0];
  }
  graphic = new Graphic({ props: graphic_props });
  binding_callbacks.push(() => bind(graphic, "dom", graphic_dom_binding));
  return {
    c() {
      create_component(graphic.$$.fragment);
    },
    l(nodes) {
      claim_component(graphic.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(graphic, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const graphic_changes = dirty & 94 ? get_spread_update(graphic_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 18 && {
          class: classList([
            ctx2[1],
            "mdc-button__icon",
            [
              ctx2[4] === "icon" && ctx2[1] == void 0,
              "material-icons"
            ]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { type: ctx2[4] },
        graphic_spread_levels[4],
        dirty & 64 && get_spread_object(ctx2[6])
      ]) : {};
      if (dirty & 512) {
        graphic_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        graphic_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      graphic.$set(graphic_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(graphic.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(graphic.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(graphic, detaching);
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "type"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $buttonContext$;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { type = "icon" } = $$props;
  const buttonContext$ = getButtonContext();
  component_subscribe($$self, buttonContext$, (value) => $$invalidate(10, $buttonContext$ = value));
  onMount(() => {
    $buttonContext$.setHasLeadingIcon(true);
    return () => {
      $buttonContext$.setHasLeadingIcon(false);
    };
  });
  function graphic_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("type" in $$new_props)
      $$invalidate(4, type = $$new_props.type);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    type,
    buttonContext$,
    $$restProps,
    slots,
    graphic_dom_binding,
    $$scope
  ];
}
class TrailingIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$l, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      type: 4
    });
  }
}
function create_default_slot$9(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], null);
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
        if (default_slot.p && (!current || dirty & 512)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[9], !current ? -1 : dirty, null, null);
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
function create_fragment$k(ctx) {
  let graphic;
  let updating_dom;
  let current;
  const graphic_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-button__icon",
        [
          ctx[4] === "icon" && ctx[1] == void 0,
          "material-icons"
        ]
      ])
    },
    { style: ctx[2] },
    { type: ctx[4] },
    { "aria-hidden": true },
    ctx[6]
  ];
  function graphic_dom_binding(value) {
    ctx[8](value);
  }
  let graphic_props = {
    $$slots: { default: [create_default_slot$9] },
    $$scope: { ctx }
  };
  for (let i = 0; i < graphic_spread_levels.length; i += 1) {
    graphic_props = assign(graphic_props, graphic_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    graphic_props.dom = ctx[0];
  }
  graphic = new Graphic({ props: graphic_props });
  binding_callbacks.push(() => bind(graphic, "dom", graphic_dom_binding));
  return {
    c() {
      create_component(graphic.$$.fragment);
    },
    l(nodes) {
      claim_component(graphic.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(graphic, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const graphic_changes = dirty & 94 ? get_spread_update(graphic_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 18 && {
          class: classList([
            ctx2[1],
            "mdc-button__icon",
            [
              ctx2[4] === "icon" && ctx2[1] == void 0,
              "material-icons"
            ]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { type: ctx2[4] },
        graphic_spread_levels[4],
        dirty & 64 && get_spread_object(ctx2[6])
      ]) : {};
      if (dirty & 512) {
        graphic_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        graphic_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      graphic.$set(graphic_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(graphic.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(graphic.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(graphic, detaching);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "type"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $buttonContext$;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { type = "icon" } = $$props;
  const buttonContext$ = getButtonContext();
  component_subscribe($$self, buttonContext$, (value) => $$invalidate(10, $buttonContext$ = value));
  onMount(() => {
    $buttonContext$.setHasLeadingIcon(true);
    return () => {
      $buttonContext$.setHasLeadingIcon(false);
    };
  });
  function graphic_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("type" in $$new_props)
      $$invalidate(4, type = $$new_props.type);
    if ("$$scope" in $$new_props)
      $$invalidate(9, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    type,
    buttonContext$,
    $$restProps,
    slots,
    graphic_dom_binding,
    $$scope
  ];
}
class LeadingIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      type: 4
    });
  }
}
var Button_svelte_svelte_type_style_lang = '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:0;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:#fff;background-color:var(--mdc-elevation-overlay-color, #fff)}.mdc-button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase);position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;font-size:1.125rem;height:1.125rem;vertical-align:top;width:1.125rem}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__touch{position:absolute;top:50%;right:0;height:48px;left:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon,.mdc-button--outlined .mdc-button__icon{margin-left:-4px;margin-right:8px}[dir=rtl] .mdc-button--raised .mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__icon,.mdc-button--outlined .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mdc-button--touch{margin-top:6px;margin-bottom:6px}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-button .mdc-button__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-button .mdc-button__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded .mdc-button__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-button.mdc-ripple-upgraded--foreground-activation .mdc-button__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation .mdc-button__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-button .mdc-button__ripple{position:absolute;box-sizing:content-box;width:100%;height:100%;overflow:hidden}.mdc-button:not(.mdc-button--outlined) .mdc-button__ripple{top:0;left:0}.mdc-button--raised{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--raised:hover,.mdc-button--raised:focus{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)}.mdc-button--raised:active{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-button--raised:disabled{box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)}.mdc-button--outlined{border-style:solid}.mdc-button{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 8px 0 8px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button:disabled{background-color:transparent}.mdc-button:not(:disabled){color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-button:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button .mdc-button__ripple::before,.mdc-button .mdc-button__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}.mdc-button:hover .mdc-button__ripple::before,.mdc-button.mdc-ripple-surface--hover .mdc-button__ripple::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--unelevated{padding:0 16px 0 16px;height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--unelevated:not(:disabled){background-color:#c7b300;background-color:var(--mdc-theme-primary, #c7b300)}.mdc-button--unelevated:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--unelevated:not(:disabled){color:#000;color:var(--mdc-theme-on-primary, #000)}.mdc-button--unelevated:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--unelevated .mdc-button__ripple::before,.mdc-button--unelevated .mdc-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-primary, #000))}.mdc-button--unelevated:hover .mdc-button__ripple::before,.mdc-button--unelevated.mdc-ripple-surface--hover .mdc-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-button--unelevated.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-button--unelevated:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--unelevated:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-button--unelevated .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised{padding:0 16px 0 16px;height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--raised:not(:disabled){background-color:#c7b300;background-color:var(--mdc-theme-primary, #c7b300)}.mdc-button--raised:disabled{background-color:rgba(0, 0, 0, 0.12)}.mdc-button--raised:not(:disabled){color:#000;color:var(--mdc-theme-on-primary, #000)}.mdc-button--raised:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--raised .mdc-button__ripple::before,.mdc-button--raised .mdc-button__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-primary, #000))}.mdc-button--raised:hover .mdc-button__ripple::before,.mdc-button--raised.mdc-ripple-surface--hover .mdc-button__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-button--raised.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-button--raised:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-button--raised.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-button--raised .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined{height:36px;border-radius:4px;border-radius:var(--mdc-shape-small, 4px);padding:0 15px 0 15px;border-width:1px}.mdc-button--outlined:not(:disabled){background-color:transparent}.mdc-button--outlined:disabled{background-color:transparent}.mdc-button--outlined:not(:disabled){color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-button--outlined:disabled{color:rgba(0, 0, 0, 0.38)}.mdc-button--outlined .mdc-button__ripple::before,.mdc-button--outlined .mdc-button__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}.mdc-button--outlined:hover .mdc-button__ripple::before,.mdc-button--outlined.mdc-ripple-surface--hover .mdc-button__ripple::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-button--outlined.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--outlined:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-button--outlined:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--outlined:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button--outlined.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button--outlined .mdc-button__ripple{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-button--outlined:not(:disabled){border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined:disabled{border-color:rgba(0, 0, 0, 0.12)}.mdc-button--outlined .mdc-button__ripple{top:-1px;left:-1px;border:1px solid transparent}.mdc-button--outlined .mdc-button__touch{left:-1px;width:calc(100% + 2 * 1px)}.mdc-button--raised.svmd-button--color--secondary:not(:disabled),.mdc-button--unelevated.svmd-button--color--secondary:not(:disabled){background-color:#676778}.mdc-button--raised.svmd-button--color--secondary:not(:disabled),.mdc-button--unelevated.svmd-button--color--secondary:not(:disabled){color:white;color:var(--mdc-theme-text-primary-on-dark, white)}.mdc-button--raised.svmd-button--color--secondary .mdc-button__ripple::before,.mdc-button--raised.svmd-button--color--secondary .mdc-button__ripple::after,.mdc-button--unelevated.svmd-button--color--secondary .mdc-button__ripple::before,.mdc-button--unelevated.svmd-button--color--secondary .mdc-button__ripple::after{background-color:white;background-color:var(--mdc-ripple-color, var(--mdc-theme-text-primary-on-dark, white))}.mdc-button--raised.svmd-button--color--secondary:hover .mdc-button__ripple::before,.mdc-button--raised.svmd-button--color--secondary.mdc-ripple-surface--hover .mdc-button__ripple::before,.mdc-button--unelevated.svmd-button--color--secondary:hover .mdc-button__ripple::before,.mdc-button--unelevated.svmd-button--color--secondary.mdc-ripple-surface--hover .mdc-button__ripple::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-button--raised.svmd-button--color--secondary.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--raised.svmd-button--color--secondary:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before,.mdc-button--unelevated.svmd-button--color--secondary.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,.mdc-button--unelevated.svmd-button--color--secondary:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-button--raised.svmd-button--color--secondary:not(.mdc-ripple-upgraded) .mdc-button__ripple::after,.mdc-button--unelevated.svmd-button--color--secondary:not(.mdc-ripple-upgraded) .mdc-button__ripple::after{transition:opacity 150ms linear}.mdc-button--raised.svmd-button--color--secondary:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after,.mdc-button--unelevated.svmd-button--color--secondary:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button--raised.svmd-button--color--secondary.mdc-ripple-upgraded,.mdc-button--unelevated.svmd-button--color--secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-button--text.svmd-button--color--secondary:not(:disabled),.mdc-button--outlined.svmd-button--color--secondary:not(:disabled){color:#676778}.mdc-button--text.svmd-button--color--secondary:not(:disabled),.mdc-button--outlined.svmd-button--color--secondary:not(:disabled){border-color:#676778}';
const get_leading_slot_changes = (dirty) => ({});
const get_leading_slot_context = (ctx) => ({ slot: "leading" });
const get_trailing_slot_changes = (dirty) => ({});
const get_trailing_slot_context = (ctx) => ({ slot: "trailing" });
function create_default_slot$8(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[22], null);
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
        if (default_slot.p && (!current || dirty & 4194304)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[22], !current ? -1 : dirty, null, null);
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
function create_leading_slot(ctx) {
  let current;
  const leading_slot_template = ctx[11].leading;
  const leading_slot = create_slot(leading_slot_template, ctx, ctx[22], get_leading_slot_context);
  return {
    c() {
      if (leading_slot)
        leading_slot.c();
    },
    l(nodes) {
      if (leading_slot)
        leading_slot.l(nodes);
    },
    m(target, anchor) {
      if (leading_slot) {
        leading_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (leading_slot) {
        if (leading_slot.p && (!current || dirty & 4194304)) {
          update_slot(leading_slot, leading_slot_template, ctx2, ctx2[22], !current ? -1 : dirty, get_leading_slot_changes, get_leading_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(leading_slot, local);
      current = true;
    },
    o(local) {
      transition_out(leading_slot, local);
      current = false;
    },
    d(detaching) {
      if (leading_slot)
        leading_slot.d(detaching);
    }
  };
}
function create_trailing_slot(ctx) {
  let current;
  const trailing_slot_template = ctx[11].trailing;
  const trailing_slot = create_slot(trailing_slot_template, ctx, ctx[22], get_trailing_slot_context);
  return {
    c() {
      if (trailing_slot)
        trailing_slot.c();
    },
    l(nodes) {
      if (trailing_slot)
        trailing_slot.l(nodes);
    },
    m(target, anchor) {
      if (trailing_slot) {
        trailing_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (trailing_slot) {
        if (trailing_slot.p && (!current || dirty & 4194304)) {
          update_slot(trailing_slot, trailing_slot_template, ctx2, ctx2[22], !current ? -1 : dirty, get_trailing_slot_changes, get_trailing_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(trailing_slot, local);
      current = true;
    },
    o(local) {
      transition_out(trailing_slot, local);
      current = false;
    },
    d(detaching) {
      if (trailing_slot)
        trailing_slot.d(detaching);
    }
  };
}
function create_fragment$j(ctx) {
  let button;
  let updating_dom;
  let current;
  const button_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { variant: ctx[6] },
    { ripple: ctx[4] },
    { color: ctx[5] },
    { style: ctx[2] },
    { disabled: ctx[7] },
    { href: ctx[8] },
    {
      accessibleTouch: ctx[9]
    },
    ctx[10]
  ];
  function button_dom_binding(value) {
    ctx[12](value);
  }
  let button_props = {
    $$slots: {
      trailing: [create_trailing_slot],
      leading: [create_leading_slot],
      default: [create_default_slot$8]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < button_spread_levels.length; i += 1) {
    button_props = assign(button_props, button_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    button_props.dom = ctx[0];
  }
  button = new Button_1$1({ props: button_props });
  binding_callbacks.push(() => bind(button, "dom", button_dom_binding));
  button.$on("click", ctx[13]);
  button.$on("mousedown", ctx[14]);
  button.$on("mouseup", ctx[15]);
  button.$on("keydown", ctx[16]);
  button.$on("keyup", ctx[17]);
  button.$on("focus", ctx[18]);
  button.$on("blur", ctx[19]);
  button.$on("focusin", ctx[20]);
  button.$on("focusout", ctx[21]);
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
    p(ctx2, [dirty]) {
      const button_changes = dirty & 2046 ? get_spread_update(button_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 64 && { variant: ctx2[6] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 32 && { color: ctx2[5] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 256 && { href: ctx2[8] },
        dirty & 512 && {
          accessibleTouch: ctx2[9]
        },
        dirty & 1024 && get_spread_object(ctx2[10])
      ]) : {};
      if (dirty & 4194304) {
        button_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        button_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
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
let count$3 = 0;
function instance$j($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "color",
    "variant",
    "disabled",
    "href",
    "accessibleTouch"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@svmd/button/Button:${count$3++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { color = "primary" } = $$props;
  let { variant = "text" } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { accessibleTouch = false } = $$props;
  function button_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("color" in $$new_props)
      $$invalidate(5, color = $$new_props.color);
    if ("variant" in $$new_props)
      $$invalidate(6, variant = $$new_props.variant);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("href" in $$new_props)
      $$invalidate(8, href = $$new_props.href);
    if ("accessibleTouch" in $$new_props)
      $$invalidate(9, accessibleTouch = $$new_props.accessibleTouch);
    if ("$$scope" in $$new_props)
      $$invalidate(22, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    color,
    variant,
    disabled,
    href,
    accessibleTouch,
    $$restProps,
    slots,
    button_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class Button_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      color: 5,
      variant: 6,
      disabled: 7,
      href: 8,
      accessibleTouch: 9
    });
  }
}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function createFocusTrapInstance(surfaceEl, focusTrapFactory) {
  return focusTrapFactory(surfaceEl, {
    skipInitialFocus: true
  });
}
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var FOCUS_SENTINEL_CLASS = "mdc-dom-focus-sentinel";
var FocusTrap = function() {
  function FocusTrap2(root, options) {
    if (options === void 0) {
      options = {};
    }
    this.root = root;
    this.options = options;
    this.elFocusedBeforeTrapFocus = null;
  }
  FocusTrap2.prototype.trapFocus = function() {
    var focusableEls = this.getFocusableElements(this.root);
    if (focusableEls.length === 0) {
      throw new Error("FocusTrap: Element must have at least one focusable child.");
    }
    this.elFocusedBeforeTrapFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.wrapTabFocus(this.root);
    if (!this.options.skipInitialFocus) {
      this.focusInitialElement(focusableEls, this.options.initialFocusEl);
    }
  };
  FocusTrap2.prototype.releaseFocus = function() {
    [].slice.call(this.root.querySelectorAll("." + FOCUS_SENTINEL_CLASS)).forEach(function(sentinelEl) {
      sentinelEl.parentElement.removeChild(sentinelEl);
    });
    if (!this.options.skipRestoreFocus && this.elFocusedBeforeTrapFocus) {
      this.elFocusedBeforeTrapFocus.focus();
    }
  };
  FocusTrap2.prototype.wrapTabFocus = function(el) {
    var _this = this;
    var sentinelStart = this.createSentinel();
    var sentinelEnd = this.createSentinel();
    sentinelStart.addEventListener("focus", function() {
      var focusableEls = _this.getFocusableElements(el);
      if (focusableEls.length > 0) {
        focusableEls[focusableEls.length - 1].focus();
      }
    });
    sentinelEnd.addEventListener("focus", function() {
      var focusableEls = _this.getFocusableElements(el);
      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    });
    el.insertBefore(sentinelStart, el.children[0]);
    el.appendChild(sentinelEnd);
  };
  FocusTrap2.prototype.focusInitialElement = function(focusableEls, initialFocusEl) {
    var focusIndex = 0;
    if (initialFocusEl) {
      focusIndex = Math.max(focusableEls.indexOf(initialFocusEl), 0);
    }
    focusableEls[focusIndex].focus();
  };
  FocusTrap2.prototype.getFocusableElements = function(root) {
    var focusableEls = [].slice.call(root.querySelectorAll("[autofocus], [tabindex], a, input, textarea, select, button"));
    return focusableEls.filter(function(el) {
      var isDisabledOrHidden = el.getAttribute("aria-disabled") === "true" || el.getAttribute("disabled") != null || el.getAttribute("hidden") != null || el.getAttribute("aria-hidden") === "true";
      var isTabbableAndVisible = el.tabIndex >= 0 && el.getBoundingClientRect().width > 0 && !el.classList.contains(FOCUS_SENTINEL_CLASS) && !isDisabledOrHidden;
      var isProgrammaticallyHidden = false;
      if (isTabbableAndVisible) {
        var style = getComputedStyle(el);
        isProgrammaticallyHidden = style.display === "none" || style.visibility === "hidden";
      }
      return isTabbableAndVisible && !isProgrammaticallyHidden;
    });
  };
  FocusTrap2.prototype.createSentinel = function() {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("tabindex", "0");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.classList.add(FOCUS_SENTINEL_CLASS);
    return sentinel;
  };
  return FocusTrap2;
}();
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a, _b;
var cssClasses$2 = {
  LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
  LIST_ITEM_CLASS: "mdc-list-item",
  LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
  LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
  LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
  LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
  ROOT: "mdc-list"
};
var evolutionClassNameMap = (_a = {}, _a["" + cssClasses$2.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated", _a["" + cssClasses$2.LIST_ITEM_CLASS] = "mdc-list-item", _a["" + cssClasses$2.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled", _a["" + cssClasses$2.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected", _a["" + cssClasses$2.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text", _a["" + cssClasses$2.ROOT] = "mdc-list", _a);
var deprecatedClassNameMap = (_b = {}, _b["" + cssClasses$2.LIST_ITEM_ACTIVATED_CLASS] = "mdc-deprecated-list-item--activated", _b["" + cssClasses$2.LIST_ITEM_CLASS] = "mdc-deprecated-list-item", _b["" + cssClasses$2.LIST_ITEM_DISABLED_CLASS] = "mdc-deprecated-list-item--disabled", _b["" + cssClasses$2.LIST_ITEM_SELECTED_CLASS] = "mdc-deprecated-list-item--selected", _b["" + cssClasses$2.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text", _b["" + cssClasses$2.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-deprecated-list-item__primary-text", _b["" + cssClasses$2.ROOT] = "mdc-deprecated-list", _b);
var strings$2 = {
  ACTION_EVENT: "MDCList:action",
  ARIA_CHECKED: "aria-checked",
  ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
  ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
  ARIA_CURRENT: "aria-current",
  ARIA_DISABLED: "aria-disabled",
  ARIA_ORIENTATION: "aria-orientation",
  ARIA_ORIENTATION_HORIZONTAL: "horizontal",
  ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
  ARIA_SELECTED: "aria-selected",
  ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
  ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
  CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
  CHECKBOX_SELECTOR: 'input[type="checkbox"]',
  CHILD_ELEMENTS_TO_TOGGLE_TABINDEX: "\n    ." + cssClasses$2.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$2.LIST_ITEM_CLASS + " a,\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " a\n  ",
  DEPRECATED_SELECTOR: ".mdc-deprecated-list",
  FOCUSABLE_CHILD_ELEMENTS: "\n    ." + cssClasses$2.LIST_ITEM_CLASS + " button:not(:disabled),\n    ." + cssClasses$2.LIST_ITEM_CLASS + " a,\n    ." + cssClasses$2.LIST_ITEM_CLASS + ' input[type="radio"]:not(:disabled),\n    .' + cssClasses$2.LIST_ITEM_CLASS + ' input[type="checkbox"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " button:not(:disabled),\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + " a,\n    ." + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + ' input[type="radio"]:not(:disabled),\n    .' + deprecatedClassNameMap[cssClasses$2.LIST_ITEM_CLASS] + ' input[type="checkbox"]:not(:disabled)\n  ',
  RADIO_SELECTOR: 'input[type="radio"]',
  SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]'
};
var numbers = {
  UNSET_INDEX: -1,
  TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300
};
var evolutionAttribute = "evolution";
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var KEY = {
  UNKNOWN: "Unknown",
  BACKSPACE: "Backspace",
  ENTER: "Enter",
  SPACEBAR: "Spacebar",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
  END: "End",
  HOME: "Home",
  ARROW_LEFT: "ArrowLeft",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_DOWN: "ArrowDown",
  DELETE: "Delete",
  ESCAPE: "Escape",
  TAB: "Tab"
};
var normalizedKeys = new Set();
normalizedKeys.add(KEY.BACKSPACE);
normalizedKeys.add(KEY.ENTER);
normalizedKeys.add(KEY.SPACEBAR);
normalizedKeys.add(KEY.PAGE_UP);
normalizedKeys.add(KEY.PAGE_DOWN);
normalizedKeys.add(KEY.END);
normalizedKeys.add(KEY.HOME);
normalizedKeys.add(KEY.ARROW_LEFT);
normalizedKeys.add(KEY.ARROW_UP);
normalizedKeys.add(KEY.ARROW_RIGHT);
normalizedKeys.add(KEY.ARROW_DOWN);
normalizedKeys.add(KEY.DELETE);
normalizedKeys.add(KEY.ESCAPE);
normalizedKeys.add(KEY.TAB);
var KEY_CODE = {
  BACKSPACE: 8,
  ENTER: 13,
  SPACEBAR: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  DELETE: 46,
  ESCAPE: 27,
  TAB: 9
};
var mappedKeyCodes = new Map();
mappedKeyCodes.set(KEY_CODE.BACKSPACE, KEY.BACKSPACE);
mappedKeyCodes.set(KEY_CODE.ENTER, KEY.ENTER);
mappedKeyCodes.set(KEY_CODE.SPACEBAR, KEY.SPACEBAR);
mappedKeyCodes.set(KEY_CODE.PAGE_UP, KEY.PAGE_UP);
mappedKeyCodes.set(KEY_CODE.PAGE_DOWN, KEY.PAGE_DOWN);
mappedKeyCodes.set(KEY_CODE.END, KEY.END);
mappedKeyCodes.set(KEY_CODE.HOME, KEY.HOME);
mappedKeyCodes.set(KEY_CODE.ARROW_LEFT, KEY.ARROW_LEFT);
mappedKeyCodes.set(KEY_CODE.ARROW_UP, KEY.ARROW_UP);
mappedKeyCodes.set(KEY_CODE.ARROW_RIGHT, KEY.ARROW_RIGHT);
mappedKeyCodes.set(KEY_CODE.ARROW_DOWN, KEY.ARROW_DOWN);
mappedKeyCodes.set(KEY_CODE.DELETE, KEY.DELETE);
mappedKeyCodes.set(KEY_CODE.ESCAPE, KEY.ESCAPE);
mappedKeyCodes.set(KEY_CODE.TAB, KEY.TAB);
var navigationKeys = new Set();
navigationKeys.add(KEY.PAGE_UP);
navigationKeys.add(KEY.PAGE_DOWN);
navigationKeys.add(KEY.END);
navigationKeys.add(KEY.HOME);
navigationKeys.add(KEY.ARROW_LEFT);
navigationKeys.add(KEY.ARROW_UP);
navigationKeys.add(KEY.ARROW_RIGHT);
navigationKeys.add(KEY.ARROW_DOWN);
function normalizeKey(evt) {
  var key = evt.key;
  if (normalizedKeys.has(key)) {
    return key;
  }
  var mappedKey = mappedKeyCodes.get(evt.keyCode);
  if (mappedKey) {
    return mappedKey;
  }
  return KEY.UNKNOWN;
}
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var ELEMENTS_KEY_ALLOWED_IN = ["input", "button", "textarea", "select"];
var preventDefaultEvent = function(evt) {
  var target = evt.target;
  if (!target) {
    return;
  }
  var tagName = ("" + target.tagName).toLowerCase();
  if (ELEMENTS_KEY_ALLOWED_IN.indexOf(tagName) === -1) {
    evt.preventDefault();
  }
};
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function initState() {
  var state = {
    bufferClearTimeout: 0,
    currentFirstChar: "",
    sortedIndexCursor: 0,
    typeaheadBuffer: ""
  };
  return state;
}
function initSortedIndex(listItemCount, getPrimaryTextByItemIndex) {
  var sortedIndexByFirstChar = new Map();
  for (var i = 0; i < listItemCount; i++) {
    var primaryText = getPrimaryTextByItemIndex(i).trim();
    if (!primaryText) {
      continue;
    }
    var firstChar = primaryText[0].toLowerCase();
    if (!sortedIndexByFirstChar.has(firstChar)) {
      sortedIndexByFirstChar.set(firstChar, []);
    }
    sortedIndexByFirstChar.get(firstChar).push({ text: primaryText.toLowerCase(), index: i });
  }
  sortedIndexByFirstChar.forEach(function(values) {
    values.sort(function(first, second) {
      return first.index - second.index;
    });
  });
  return sortedIndexByFirstChar;
}
function matchItem(opts, state) {
  var nextChar = opts.nextChar, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, focusedItemIndex = opts.focusedItemIndex, skipFocus = opts.skipFocus, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  clearTimeout(state.bufferClearTimeout);
  state.bufferClearTimeout = setTimeout(function() {
    clearBuffer(state);
  }, numbers.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS);
  state.typeaheadBuffer = state.typeaheadBuffer + nextChar;
  var index;
  if (state.typeaheadBuffer.length === 1) {
    index = matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state);
  } else {
    index = matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state);
  }
  if (index !== -1 && !skipFocus) {
    focusItemAtIndex(index);
  }
  return index;
}
function matchFirstChar(sortedIndexByFirstChar, focusedItemIndex, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
  if (!itemsMatchingFirstChar) {
    return -1;
  }
  if (firstChar === state.currentFirstChar && itemsMatchingFirstChar[state.sortedIndexCursor].index === focusedItemIndex) {
    state.sortedIndexCursor = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
    var newIndex = itemsMatchingFirstChar[state.sortedIndexCursor].index;
    if (!isItemAtIndexDisabled(newIndex)) {
      return newIndex;
    }
  }
  state.currentFirstChar = firstChar;
  var newCursorPosition = -1;
  var cursorPosition;
  for (cursorPosition = 0; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (!isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }
  for (; cursorPosition < itemsMatchingFirstChar.length; cursorPosition++) {
    if (itemsMatchingFirstChar[cursorPosition].index > focusedItemIndex && !isItemAtIndexDisabled(itemsMatchingFirstChar[cursorPosition].index)) {
      newCursorPosition = cursorPosition;
      break;
    }
  }
  if (newCursorPosition !== -1) {
    state.sortedIndexCursor = newCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }
  return -1;
}
function matchAllChars(sortedIndexByFirstChar, isItemAtIndexDisabled, state) {
  var firstChar = state.typeaheadBuffer[0];
  var itemsMatchingFirstChar = sortedIndexByFirstChar.get(firstChar);
  if (!itemsMatchingFirstChar) {
    return -1;
  }
  var startingItem = itemsMatchingFirstChar[state.sortedIndexCursor];
  if (startingItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0 && !isItemAtIndexDisabled(startingItem.index)) {
    return startingItem.index;
  }
  var cursorPosition = (state.sortedIndexCursor + 1) % itemsMatchingFirstChar.length;
  var nextCursorPosition = -1;
  while (cursorPosition !== state.sortedIndexCursor) {
    var currentItem = itemsMatchingFirstChar[cursorPosition];
    var matches2 = currentItem.text.lastIndexOf(state.typeaheadBuffer, 0) === 0;
    var isEnabled = !isItemAtIndexDisabled(currentItem.index);
    if (matches2 && isEnabled) {
      nextCursorPosition = cursorPosition;
      break;
    }
    cursorPosition = (cursorPosition + 1) % itemsMatchingFirstChar.length;
  }
  if (nextCursorPosition !== -1) {
    state.sortedIndexCursor = nextCursorPosition;
    return itemsMatchingFirstChar[state.sortedIndexCursor].index;
  }
  return -1;
}
function isTypingInProgress(state) {
  return state.typeaheadBuffer.length > 0;
}
function clearBuffer(state) {
  state.typeaheadBuffer = "";
}
function handleKeydown(opts, state) {
  var event = opts.event, isTargetListItem = opts.isTargetListItem, focusedItemIndex = opts.focusedItemIndex, focusItemAtIndex = opts.focusItemAtIndex, sortedIndexByFirstChar = opts.sortedIndexByFirstChar, isItemAtIndexDisabled = opts.isItemAtIndexDisabled;
  var isArrowLeft = normalizeKey(event) === "ArrowLeft";
  var isArrowUp = normalizeKey(event) === "ArrowUp";
  var isArrowRight = normalizeKey(event) === "ArrowRight";
  var isArrowDown = normalizeKey(event) === "ArrowDown";
  var isHome = normalizeKey(event) === "Home";
  var isEnd = normalizeKey(event) === "End";
  var isEnter = normalizeKey(event) === "Enter";
  var isSpace = normalizeKey(event) === "Spacebar";
  if (event.ctrlKey || event.metaKey || isArrowLeft || isArrowUp || isArrowRight || isArrowDown || isHome || isEnd || isEnter) {
    return -1;
  }
  var isCharacterKey = !isSpace && event.key.length === 1;
  if (isCharacterKey) {
    preventDefaultEvent(event);
    var matchItemOpts = {
      focusItemAtIndex,
      focusedItemIndex,
      nextChar: event.key.toLowerCase(),
      sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }
  if (!isSpace) {
    return -1;
  }
  if (isTargetListItem) {
    preventDefaultEvent(event);
  }
  var typeaheadOnListItem = isTargetListItem && isTypingInProgress(state);
  if (typeaheadOnListItem) {
    var matchItemOpts = {
      focusItemAtIndex,
      focusedItemIndex,
      nextChar: " ",
      sortedIndexByFirstChar,
      skipFocus: false,
      isItemAtIndexDisabled
    };
    return matchItem(matchItemOpts, state);
  }
  return -1;
}
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function isNumberArray(selectedIndex) {
  return selectedIndex instanceof Array;
}
var MDCListFoundation = function(_super) {
  __extends(MDCListFoundation2, _super);
  function MDCListFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCListFoundation2.defaultAdapter), adapter)) || this;
    _this.wrapFocus_ = false;
    _this.isVertical_ = true;
    _this.isSingleSelectionList_ = false;
    _this.selectedIndex_ = numbers.UNSET_INDEX;
    _this.focusedItemIndex = numbers.UNSET_INDEX;
    _this.useActivatedClass_ = false;
    _this.useSelectedAttr_ = false;
    _this.ariaCurrentAttrValue_ = null;
    _this.isCheckboxList_ = false;
    _this.isRadioList_ = false;
    _this.hasTypeahead = false;
    _this.typeaheadState = initState();
    _this.sortedIndexByFirstChar = new Map();
    return _this;
  }
  Object.defineProperty(MDCListFoundation2, "strings", {
    get: function() {
      return strings$2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation2, "cssClasses", {
    get: function() {
      return cssClasses$2;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation2, "numbers", {
    get: function() {
      return numbers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCListFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClassForElementIndex: function() {
          return void 0;
        },
        focusItemAtIndex: function() {
          return void 0;
        },
        getAttributeForElementIndex: function() {
          return null;
        },
        getFocusedElementIndex: function() {
          return 0;
        },
        getListItemCount: function() {
          return 0;
        },
        hasCheckboxAtIndex: function() {
          return false;
        },
        hasRadioAtIndex: function() {
          return false;
        },
        isCheckboxCheckedAtIndex: function() {
          return false;
        },
        isFocusInsideList: function() {
          return false;
        },
        isRootFocused: function() {
          return false;
        },
        listItemAtIndexHasClass: function() {
          return false;
        },
        notifyAction: function() {
          return void 0;
        },
        removeClassForElementIndex: function() {
          return void 0;
        },
        setAttributeForElementIndex: function() {
          return void 0;
        },
        setCheckedCheckboxOrRadioAtIndex: function() {
          return void 0;
        },
        setTabIndexForListItemChildren: function() {
          return void 0;
        },
        getPrimaryTextAtIndex: function() {
          return "";
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCListFoundation2.prototype.layout = function() {
    if (this.adapter.getListItemCount() === 0) {
      return;
    }
    if (this.adapter.hasCheckboxAtIndex(0)) {
      this.isCheckboxList_ = true;
    } else if (this.adapter.hasRadioAtIndex(0)) {
      this.isRadioList_ = true;
    } else {
      this.maybeInitializeSingleSelection();
    }
    if (this.hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  MDCListFoundation2.prototype.setWrapFocus = function(value) {
    this.wrapFocus_ = value;
  };
  MDCListFoundation2.prototype.setVerticalOrientation = function(value) {
    this.isVertical_ = value;
  };
  MDCListFoundation2.prototype.setSingleSelection = function(value) {
    this.isSingleSelectionList_ = value;
    if (value) {
      this.maybeInitializeSingleSelection();
    }
  };
  MDCListFoundation2.prototype.maybeInitializeSingleSelection = function() {
    var listItemsCount = this.adapter.getListItemCount();
    for (var i = 0; i < listItemsCount; i++) {
      var hasSelectedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$2.LIST_ITEM_SELECTED_CLASS);
      var hasActivatedClass = this.adapter.listItemAtIndexHasClass(i, cssClasses$2.LIST_ITEM_ACTIVATED_CLASS);
      if (!(hasSelectedClass || hasActivatedClass)) {
        continue;
      }
      if (hasActivatedClass) {
        this.setUseActivatedClass(true);
      }
      this.isSingleSelectionList_ = true;
      this.selectedIndex_ = i;
      return;
    }
  };
  MDCListFoundation2.prototype.setHasTypeahead = function(hasTypeahead) {
    this.hasTypeahead = hasTypeahead;
    if (hasTypeahead) {
      this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex();
    }
  };
  MDCListFoundation2.prototype.isTypeaheadInProgress = function() {
    return this.hasTypeahead && isTypingInProgress(this.typeaheadState);
  };
  MDCListFoundation2.prototype.setUseActivatedClass = function(useActivated) {
    this.useActivatedClass_ = useActivated;
  };
  MDCListFoundation2.prototype.setUseSelectedAttribute = function(useSelected) {
    this.useSelectedAttr_ = useSelected;
  };
  MDCListFoundation2.prototype.getSelectedIndex = function() {
    return this.selectedIndex_;
  };
  MDCListFoundation2.prototype.setSelectedIndex = function(index) {
    if (!this.isIndexValid_(index)) {
      return;
    }
    if (this.isCheckboxList_) {
      this.setCheckboxAtIndex_(index);
    } else if (this.isRadioList_) {
      this.setRadioAtIndex_(index);
    } else {
      this.setSingleSelectionAtIndex_(index);
    }
  };
  MDCListFoundation2.prototype.handleFocusIn = function(_, listItemIndex) {
    if (listItemIndex >= 0) {
      this.focusedItemIndex = listItemIndex;
      this.adapter.setAttributeForElementIndex(listItemIndex, "tabindex", "0");
      this.adapter.setTabIndexForListItemChildren(listItemIndex, "0");
    }
  };
  MDCListFoundation2.prototype.handleFocusOut = function(_, listItemIndex) {
    var _this = this;
    if (listItemIndex >= 0) {
      this.adapter.setAttributeForElementIndex(listItemIndex, "tabindex", "-1");
      this.adapter.setTabIndexForListItemChildren(listItemIndex, "-1");
    }
    setTimeout(function() {
      if (!_this.adapter.isFocusInsideList()) {
        _this.setTabindexToFirstSelectedOrFocusedItem();
      }
    }, 0);
  };
  MDCListFoundation2.prototype.handleKeydown = function(event, isRootListItem, listItemIndex) {
    var _this = this;
    var isArrowLeft = normalizeKey(event) === "ArrowLeft";
    var isArrowUp = normalizeKey(event) === "ArrowUp";
    var isArrowRight = normalizeKey(event) === "ArrowRight";
    var isArrowDown = normalizeKey(event) === "ArrowDown";
    var isHome = normalizeKey(event) === "Home";
    var isEnd = normalizeKey(event) === "End";
    var isEnter = normalizeKey(event) === "Enter";
    var isSpace = normalizeKey(event) === "Spacebar";
    var isLetterA = event.key === "A" || event.key === "a";
    if (this.adapter.isRootFocused()) {
      if (isArrowUp || isEnd) {
        event.preventDefault();
        this.focusLastElement();
      } else if (isArrowDown || isHome) {
        event.preventDefault();
        this.focusFirstElement();
      }
      if (this.hasTypeahead) {
        var handleKeydownOpts = {
          event,
          focusItemAtIndex: function(index) {
            _this.focusItemAtIndex(index);
          },
          focusedItemIndex: -1,
          isTargetListItem: isRootListItem,
          sortedIndexByFirstChar: this.sortedIndexByFirstChar,
          isItemAtIndexDisabled: function(index) {
            return _this.adapter.listItemAtIndexHasClass(index, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
          }
        };
        handleKeydown(handleKeydownOpts, this.typeaheadState);
      }
      return;
    }
    var currentIndex = this.adapter.getFocusedElementIndex();
    if (currentIndex === -1) {
      currentIndex = listItemIndex;
      if (currentIndex < 0) {
        return;
      }
    }
    if (this.isVertical_ && isArrowDown || !this.isVertical_ && isArrowRight) {
      preventDefaultEvent(event);
      this.focusNextElement(currentIndex);
    } else if (this.isVertical_ && isArrowUp || !this.isVertical_ && isArrowLeft) {
      preventDefaultEvent(event);
      this.focusPrevElement(currentIndex);
    } else if (isHome) {
      preventDefaultEvent(event);
      this.focusFirstElement();
    } else if (isEnd) {
      preventDefaultEvent(event);
      this.focusLastElement();
    } else if (isLetterA && event.ctrlKey && this.isCheckboxList_) {
      event.preventDefault();
      this.toggleAll(this.selectedIndex_ === numbers.UNSET_INDEX ? [] : this.selectedIndex_);
    } else if (isEnter || isSpace) {
      if (isRootListItem) {
        var target = event.target;
        if (target && target.tagName === "A" && isEnter) {
          return;
        }
        preventDefaultEvent(event);
        if (this.adapter.listItemAtIndexHasClass(currentIndex, cssClasses$2.LIST_ITEM_DISABLED_CLASS)) {
          return;
        }
        if (!this.isTypeaheadInProgress()) {
          if (this.isSelectableList_()) {
            this.setSelectedIndexOnAction_(currentIndex);
          }
          this.adapter.notifyAction(currentIndex);
        }
      }
    }
    if (this.hasTypeahead) {
      var handleKeydownOpts = {
        event,
        focusItemAtIndex: function(index) {
          _this.focusItemAtIndex(index);
        },
        focusedItemIndex: this.focusedItemIndex,
        isTargetListItem: isRootListItem,
        sortedIndexByFirstChar: this.sortedIndexByFirstChar,
        isItemAtIndexDisabled: function(index) {
          return _this.adapter.listItemAtIndexHasClass(index, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
        }
      };
      handleKeydown(handleKeydownOpts, this.typeaheadState);
    }
  };
  MDCListFoundation2.prototype.handleClick = function(index, toggleCheckbox) {
    if (index === numbers.UNSET_INDEX) {
      return;
    }
    if (this.adapter.listItemAtIndexHasClass(index, cssClasses$2.LIST_ITEM_DISABLED_CLASS)) {
      return;
    }
    if (this.isSelectableList_()) {
      this.setSelectedIndexOnAction_(index, toggleCheckbox);
    }
    this.adapter.notifyAction(index);
  };
  MDCListFoundation2.prototype.focusNextElement = function(index) {
    var count2 = this.adapter.getListItemCount();
    var nextIndex = index + 1;
    if (nextIndex >= count2) {
      if (this.wrapFocus_) {
        nextIndex = 0;
      } else {
        return index;
      }
    }
    this.focusItemAtIndex(nextIndex);
    return nextIndex;
  };
  MDCListFoundation2.prototype.focusPrevElement = function(index) {
    var prevIndex = index - 1;
    if (prevIndex < 0) {
      if (this.wrapFocus_) {
        prevIndex = this.adapter.getListItemCount() - 1;
      } else {
        return index;
      }
    }
    this.focusItemAtIndex(prevIndex);
    return prevIndex;
  };
  MDCListFoundation2.prototype.focusFirstElement = function() {
    this.focusItemAtIndex(0);
    return 0;
  };
  MDCListFoundation2.prototype.focusLastElement = function() {
    var lastIndex = this.adapter.getListItemCount() - 1;
    this.focusItemAtIndex(lastIndex);
    return lastIndex;
  };
  MDCListFoundation2.prototype.focusInitialElement = function() {
    var initialIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.focusItemAtIndex(initialIndex);
    return initialIndex;
  };
  MDCListFoundation2.prototype.setEnabled = function(itemIndex, isEnabled) {
    if (!this.isIndexValid_(itemIndex)) {
      return;
    }
    if (isEnabled) {
      this.adapter.removeClassForElementIndex(itemIndex, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, strings$2.ARIA_DISABLED, "false");
    } else {
      this.adapter.addClassForElementIndex(itemIndex, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
      this.adapter.setAttributeForElementIndex(itemIndex, strings$2.ARIA_DISABLED, "true");
    }
  };
  MDCListFoundation2.prototype.setSingleSelectionAtIndex_ = function(index) {
    if (this.selectedIndex_ === index) {
      return;
    }
    var selectedClassName = cssClasses$2.LIST_ITEM_SELECTED_CLASS;
    if (this.useActivatedClass_) {
      selectedClassName = cssClasses$2.LIST_ITEM_ACTIVATED_CLASS;
    }
    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter.removeClassForElementIndex(this.selectedIndex_, selectedClassName);
    }
    this.setAriaForSingleSelectionAtIndex_(index);
    this.setTabindexAtIndex(index);
    if (index !== numbers.UNSET_INDEX) {
      this.adapter.addClassForElementIndex(index, selectedClassName);
    }
    this.selectedIndex_ = index;
  };
  MDCListFoundation2.prototype.setAriaForSingleSelectionAtIndex_ = function(index) {
    if (this.selectedIndex_ === numbers.UNSET_INDEX) {
      this.ariaCurrentAttrValue_ = this.adapter.getAttributeForElementIndex(index, strings$2.ARIA_CURRENT);
    }
    var isAriaCurrent = this.ariaCurrentAttrValue_ !== null;
    var ariaAttribute = isAriaCurrent ? strings$2.ARIA_CURRENT : strings$2.ARIA_SELECTED;
    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, ariaAttribute, "false");
    }
    if (index !== numbers.UNSET_INDEX) {
      var ariaAttributeValue = isAriaCurrent ? this.ariaCurrentAttrValue_ : "true";
      this.adapter.setAttributeForElementIndex(index, ariaAttribute, ariaAttributeValue);
    }
  };
  MDCListFoundation2.prototype.getSelectionAttribute = function() {
    return this.useSelectedAttr_ ? strings$2.ARIA_SELECTED : strings$2.ARIA_CHECKED;
  };
  MDCListFoundation2.prototype.setRadioAtIndex_ = function(index) {
    var selectionAttribute = this.getSelectionAttribute();
    this.adapter.setCheckedCheckboxOrRadioAtIndex(index, true);
    if (this.selectedIndex_ !== numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, selectionAttribute, "false");
    }
    this.adapter.setAttributeForElementIndex(index, selectionAttribute, "true");
    this.selectedIndex_ = index;
  };
  MDCListFoundation2.prototype.setCheckboxAtIndex_ = function(index) {
    var selectionAttribute = this.getSelectionAttribute();
    for (var i = 0; i < this.adapter.getListItemCount(); i++) {
      var isChecked = false;
      if (index.indexOf(i) >= 0) {
        isChecked = true;
      }
      this.adapter.setCheckedCheckboxOrRadioAtIndex(i, isChecked);
      this.adapter.setAttributeForElementIndex(i, selectionAttribute, isChecked ? "true" : "false");
    }
    this.selectedIndex_ = index;
  };
  MDCListFoundation2.prototype.setTabindexAtIndex = function(index) {
    if (this.focusedItemIndex === numbers.UNSET_INDEX && index !== 0) {
      this.adapter.setAttributeForElementIndex(0, "tabindex", "-1");
    } else if (this.focusedItemIndex >= 0 && this.focusedItemIndex !== index) {
      this.adapter.setAttributeForElementIndex(this.focusedItemIndex, "tabindex", "-1");
    }
    if (!(this.selectedIndex_ instanceof Array) && this.selectedIndex_ !== index) {
      this.adapter.setAttributeForElementIndex(this.selectedIndex_, "tabindex", "-1");
    }
    if (index !== numbers.UNSET_INDEX) {
      this.adapter.setAttributeForElementIndex(index, "tabindex", "0");
    }
  };
  MDCListFoundation2.prototype.isSelectableList_ = function() {
    return this.isSingleSelectionList_ || this.isCheckboxList_ || this.isRadioList_;
  };
  MDCListFoundation2.prototype.setTabindexToFirstSelectedOrFocusedItem = function() {
    var targetIndex = this.getFirstSelectedOrFocusedItemIndex();
    this.setTabindexAtIndex(targetIndex);
  };
  MDCListFoundation2.prototype.getFirstSelectedOrFocusedItemIndex = function() {
    var targetIndex = this.focusedItemIndex >= 0 ? this.focusedItemIndex : 0;
    if (this.isSelectableList_()) {
      if (typeof this.selectedIndex_ === "number" && this.selectedIndex_ !== numbers.UNSET_INDEX) {
        targetIndex = this.selectedIndex_;
      } else if (isNumberArray(this.selectedIndex_) && this.selectedIndex_.length > 0) {
        targetIndex = this.selectedIndex_.reduce(function(currentIndex, minIndex) {
          return Math.min(currentIndex, minIndex);
        });
      }
    }
    return targetIndex;
  };
  MDCListFoundation2.prototype.isIndexValid_ = function(index) {
    var _this = this;
    if (index instanceof Array) {
      if (!this.isCheckboxList_) {
        throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");
      }
      if (index.length === 0) {
        return true;
      } else {
        return index.some(function(i) {
          return _this.isIndexInRange_(i);
        });
      }
    } else if (typeof index === "number") {
      if (this.isCheckboxList_) {
        throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: " + index);
      }
      return this.isIndexInRange_(index) || this.isSingleSelectionList_ && index === numbers.UNSET_INDEX;
    } else {
      return false;
    }
  };
  MDCListFoundation2.prototype.isIndexInRange_ = function(index) {
    var listSize = this.adapter.getListItemCount();
    return index >= 0 && index < listSize;
  };
  MDCListFoundation2.prototype.setSelectedIndexOnAction_ = function(index, toggleCheckbox) {
    if (toggleCheckbox === void 0) {
      toggleCheckbox = true;
    }
    if (this.isCheckboxList_) {
      this.toggleCheckboxAtIndex_(index, toggleCheckbox);
    } else {
      this.setSelectedIndex(index);
    }
  };
  MDCListFoundation2.prototype.toggleCheckboxAtIndex_ = function(index, toggleCheckbox) {
    var selectionAttribute = this.getSelectionAttribute();
    var isChecked = this.adapter.isCheckboxCheckedAtIndex(index);
    if (toggleCheckbox) {
      isChecked = !isChecked;
      this.adapter.setCheckedCheckboxOrRadioAtIndex(index, isChecked);
    }
    this.adapter.setAttributeForElementIndex(index, selectionAttribute, isChecked ? "true" : "false");
    var selectedIndexes = this.selectedIndex_ === numbers.UNSET_INDEX ? [] : this.selectedIndex_.slice();
    if (isChecked) {
      selectedIndexes.push(index);
    } else {
      selectedIndexes = selectedIndexes.filter(function(i) {
        return i !== index;
      });
    }
    this.selectedIndex_ = selectedIndexes;
  };
  MDCListFoundation2.prototype.focusItemAtIndex = function(index) {
    this.adapter.focusItemAtIndex(index);
    this.focusedItemIndex = index;
  };
  MDCListFoundation2.prototype.toggleAll = function(currentlySelectedIndexes) {
    var count2 = this.adapter.getListItemCount();
    if (currentlySelectedIndexes.length === count2) {
      this.setCheckboxAtIndex_([]);
    } else {
      var allIndexes = [];
      for (var i = 0; i < count2; i++) {
        if (!this.adapter.listItemAtIndexHasClass(i, cssClasses$2.LIST_ITEM_DISABLED_CLASS) || currentlySelectedIndexes.indexOf(i) > -1) {
          allIndexes.push(i);
        }
      }
      this.setCheckboxAtIndex_(allIndexes);
    }
  };
  MDCListFoundation2.prototype.typeaheadMatchItem = function(nextChar, startingIndex, skipFocus) {
    var _this = this;
    if (skipFocus === void 0) {
      skipFocus = false;
    }
    var opts = {
      focusItemAtIndex: function(index) {
        _this.focusItemAtIndex(index);
      },
      focusedItemIndex: startingIndex ? startingIndex : this.focusedItemIndex,
      nextChar,
      sortedIndexByFirstChar: this.sortedIndexByFirstChar,
      skipFocus,
      isItemAtIndexDisabled: function(index) {
        return _this.adapter.listItemAtIndexHasClass(index, cssClasses$2.LIST_ITEM_DISABLED_CLASS);
      }
    };
    return matchItem(opts, this.typeaheadState);
  };
  MDCListFoundation2.prototype.typeaheadInitSortedIndex = function() {
    return initSortedIndex(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
  };
  MDCListFoundation2.prototype.clearTypeaheadBuffer = function() {
    clearBuffer(this.typeaheadState);
  };
  return MDCListFoundation2;
}(MDCFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCList = function(_super) {
  __extends(MDCList2, _super);
  function MDCList2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Object.defineProperty(MDCList2.prototype, "vertical", {
    set: function(value) {
      this.foundation.setVerticalOrientation(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "listElements", {
    get: function() {
      return Array.from(this.root.querySelectorAll("." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS]));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "wrapFocus", {
    set: function(value) {
      this.foundation.setWrapFocus(value);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "typeaheadInProgress", {
    get: function() {
      return this.foundation.isTypeaheadInProgress();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "hasTypeahead", {
    set: function(hasTypeahead) {
      this.foundation.setHasTypeahead(hasTypeahead);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "singleSelection", {
    set: function(isSingleSelectionList) {
      this.foundation.setSingleSelection(isSingleSelectionList);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCList2.prototype, "selectedIndex", {
    get: function() {
      return this.foundation.getSelectedIndex();
    },
    set: function(index) {
      this.foundation.setSelectedIndex(index);
    },
    enumerable: false,
    configurable: true
  });
  MDCList2.attachTo = function(root) {
    return new MDCList2(root);
  };
  MDCList2.prototype.initialSyncWithDOM = function() {
    this.isEvolutionEnabled = evolutionAttribute in this.root.dataset;
    if (this.isEvolutionEnabled) {
      this.classNameMap = evolutionClassNameMap;
    } else if (matches(this.root, strings$2.DEPRECATED_SELECTOR)) {
      this.classNameMap = deprecatedClassNameMap;
    } else {
      this.classNameMap = Object.values(cssClasses$2).reduce(function(obj, className) {
        obj[className] = className;
        return obj;
      }, {});
    }
    this.handleClick = this.handleClickEvent.bind(this);
    this.handleKeydown = this.handleKeydownEvent.bind(this);
    this.focusInEventListener = this.handleFocusInEvent.bind(this);
    this.focusOutEventListener = this.handleFocusOutEvent.bind(this);
    this.listen("keydown", this.handleKeydown);
    this.listen("click", this.handleClick);
    this.listen("focusin", this.focusInEventListener);
    this.listen("focusout", this.focusOutEventListener);
    this.layout();
    this.initializeListType();
    this.ensureFocusable();
  };
  MDCList2.prototype.destroy = function() {
    this.unlisten("keydown", this.handleKeydown);
    this.unlisten("click", this.handleClick);
    this.unlisten("focusin", this.focusInEventListener);
    this.unlisten("focusout", this.focusOutEventListener);
  };
  MDCList2.prototype.layout = function() {
    var direction = this.root.getAttribute(strings$2.ARIA_ORIENTATION);
    this.vertical = direction !== strings$2.ARIA_ORIENTATION_HORIZONTAL;
    var itemSelector = "." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS] + ":not([tabindex])";
    var childSelector = strings$2.FOCUSABLE_CHILD_ELEMENTS;
    var itemEls = this.root.querySelectorAll(itemSelector);
    if (itemEls.length) {
      Array.prototype.forEach.call(itemEls, function(el) {
        el.setAttribute("tabindex", "-1");
      });
    }
    var focusableChildEls = this.root.querySelectorAll(childSelector);
    if (focusableChildEls.length) {
      Array.prototype.forEach.call(focusableChildEls, function(el) {
        el.setAttribute("tabindex", "-1");
      });
    }
    if (this.isEvolutionEnabled) {
      this.foundation.setUseSelectedAttribute(true);
    }
    this.foundation.layout();
  };
  MDCList2.prototype.getPrimaryText = function(item) {
    var _a2;
    var primaryText = item.querySelector("." + this.classNameMap[cssClasses$2.LIST_ITEM_PRIMARY_TEXT_CLASS]);
    if (this.isEvolutionEnabled || primaryText) {
      return (_a2 = primaryText === null || primaryText === void 0 ? void 0 : primaryText.textContent) !== null && _a2 !== void 0 ? _a2 : "";
    }
    var singleLineText = item.querySelector("." + this.classNameMap[cssClasses$2.LIST_ITEM_TEXT_CLASS]);
    return singleLineText && singleLineText.textContent || "";
  };
  MDCList2.prototype.initializeListType = function() {
    var _this = this;
    this.isInteractive = matches(this.root, strings$2.ARIA_INTERACTIVE_ROLES_SELECTOR);
    if (this.isEvolutionEnabled && this.isInteractive) {
      var selection = Array.from(this.root.querySelectorAll(strings$2.SELECTED_ITEM_SELECTOR), function(listItem) {
        return _this.listElements.indexOf(listItem);
      });
      if (matches(this.root, strings$2.ARIA_MULTI_SELECTABLE_SELECTOR)) {
        this.selectedIndex = selection;
      } else if (selection.length > 0) {
        this.selectedIndex = selection[0];
      }
      return;
    }
    var checkboxListItems = this.root.querySelectorAll(strings$2.ARIA_ROLE_CHECKBOX_SELECTOR);
    var radioSelectedListItem = this.root.querySelector(strings$2.ARIA_CHECKED_RADIO_SELECTOR);
    if (checkboxListItems.length) {
      var preselectedItems = this.root.querySelectorAll(strings$2.ARIA_CHECKED_CHECKBOX_SELECTOR);
      this.selectedIndex = Array.from(preselectedItems, function(listItem) {
        return _this.listElements.indexOf(listItem);
      });
    } else if (radioSelectedListItem) {
      this.selectedIndex = this.listElements.indexOf(radioSelectedListItem);
    }
  };
  MDCList2.prototype.setEnabled = function(itemIndex, isEnabled) {
    this.foundation.setEnabled(itemIndex, isEnabled);
  };
  MDCList2.prototype.typeaheadMatchItem = function(nextChar, startingIndex) {
    return this.foundation.typeaheadMatchItem(nextChar, startingIndex, true);
  };
  MDCList2.prototype.getDefaultFoundation = function() {
    var _this = this;
    var adapter = {
      addClassForElementIndex: function(index, className) {
        var element2 = _this.listElements[index];
        if (element2) {
          element2.classList.add(_this.classNameMap[className]);
        }
      },
      focusItemAtIndex: function(index) {
        var element2 = _this.listElements[index];
        if (element2) {
          element2.focus();
        }
      },
      getAttributeForElementIndex: function(index, attr2) {
        return _this.listElements[index].getAttribute(attr2);
      },
      getFocusedElementIndex: function() {
        return _this.listElements.indexOf(document.activeElement);
      },
      getListItemCount: function() {
        return _this.listElements.length;
      },
      getPrimaryTextAtIndex: function(index) {
        return _this.getPrimaryText(_this.listElements[index]);
      },
      hasCheckboxAtIndex: function(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$2.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: function(index) {
        var listItem = _this.listElements[index];
        return !!listItem.querySelector(strings$2.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: function(index) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$2.CHECKBOX_SELECTOR);
        return toggleEl.checked;
      },
      isFocusInsideList: function() {
        return _this.root !== document.activeElement && _this.root.contains(document.activeElement);
      },
      isRootFocused: function() {
        return document.activeElement === _this.root;
      },
      listItemAtIndexHasClass: function(index, className) {
        return _this.listElements[index].classList.contains(_this.classNameMap[className]);
      },
      notifyAction: function(index) {
        _this.emit(strings$2.ACTION_EVENT, { index }, true);
      },
      removeClassForElementIndex: function(index, className) {
        var element2 = _this.listElements[index];
        if (element2) {
          element2.classList.remove(_this.classNameMap[className]);
        }
      },
      setAttributeForElementIndex: function(index, attr2, value) {
        var element2 = _this.listElements[index];
        if (element2) {
          element2.setAttribute(attr2, value);
        }
      },
      setCheckedCheckboxOrRadioAtIndex: function(index, isChecked) {
        var listItem = _this.listElements[index];
        var toggleEl = listItem.querySelector(strings$2.CHECKBOX_RADIO_SELECTOR);
        toggleEl.checked = isChecked;
        var event = document.createEvent("Event");
        event.initEvent("change", true, true);
        toggleEl.dispatchEvent(event);
      },
      setTabIndexForListItemChildren: function(listItemIndex, tabIndexValue) {
        var element2 = _this.listElements[listItemIndex];
        var selector = strings$2.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX;
        Array.prototype.forEach.call(element2.querySelectorAll(selector), function(el) {
          el.setAttribute("tabindex", tabIndexValue);
        });
      }
    };
    return new MDCListFoundation(adapter);
  };
  MDCList2.prototype.ensureFocusable = function() {
    if (this.isEvolutionEnabled && this.isInteractive) {
      if (!this.root.querySelector("." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS] + '[tabindex="0"]')) {
        var index = this.initialFocusIndex();
        if (index !== -1) {
          this.listElements[index].tabIndex = 0;
        }
      }
    }
  };
  MDCList2.prototype.initialFocusIndex = function() {
    if (this.selectedIndex instanceof Array && this.selectedIndex.length > 0) {
      return this.selectedIndex[0];
    }
    if (typeof this.selectedIndex === "number" && this.selectedIndex !== numbers.UNSET_INDEX) {
      return this.selectedIndex;
    }
    var el = this.root.querySelector("." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS] + ":not(." + this.classNameMap[cssClasses$2.LIST_ITEM_DISABLED_CLASS] + ")");
    if (el === null) {
      return -1;
    }
    return this.getListItemIndex(el);
  };
  MDCList2.prototype.getListItemIndex = function(el) {
    var nearestParent = closest(el, "." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS] + ", ." + this.classNameMap[cssClasses$2.ROOT]);
    if (nearestParent && matches(nearestParent, "." + this.classNameMap[cssClasses$2.LIST_ITEM_CLASS])) {
      return this.listElements.indexOf(nearestParent);
    }
    return -1;
  };
  MDCList2.prototype.handleFocusInEvent = function(evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusIn(evt, index);
  };
  MDCList2.prototype.handleFocusOutEvent = function(evt) {
    var index = this.getListItemIndex(evt.target);
    this.foundation.handleFocusOut(evt, index);
  };
  MDCList2.prototype.handleKeydownEvent = function(evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target;
    this.foundation.handleKeydown(evt, target.classList.contains(this.classNameMap[cssClasses$2.LIST_ITEM_CLASS]), index);
  };
  MDCList2.prototype.handleClickEvent = function(evt) {
    var index = this.getListItemIndex(evt.target);
    var target = evt.target;
    var toggleCheckbox = !matches(target, strings$2.CHECKBOX_RADIO_SELECTOR);
    this.foundation.handleClick(index, toggleCheckbox);
  };
  return MDCList2;
}(MDCComponent);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses$1 = {
  ANIMATE: "mdc-drawer--animate",
  CLOSING: "mdc-drawer--closing",
  DISMISSIBLE: "mdc-drawer--dismissible",
  MODAL: "mdc-drawer--modal",
  OPEN: "mdc-drawer--open",
  OPENING: "mdc-drawer--opening",
  ROOT: "mdc-drawer"
};
var strings$1 = {
  APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
  CLOSE_EVENT: "MDCDrawer:closed",
  OPEN_EVENT: "MDCDrawer:opened",
  SCRIM_SELECTOR: ".mdc-drawer-scrim",
  LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
  LIST_ITEM_ACTIVATED_SELECTOR: ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
};
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCDismissibleDrawerFoundation = function(_super) {
  __extends(MDCDismissibleDrawerFoundation2, _super);
  function MDCDismissibleDrawerFoundation2(adapter) {
    var _this = _super.call(this, __assign(__assign({}, MDCDismissibleDrawerFoundation2.defaultAdapter), adapter)) || this;
    _this.animationFrame_ = 0;
    _this.animationTimer_ = 0;
    return _this;
  }
  Object.defineProperty(MDCDismissibleDrawerFoundation2, "strings", {
    get: function() {
      return strings$1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation2, "cssClasses", {
    get: function() {
      return cssClasses$1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDismissibleDrawerFoundation2, "defaultAdapter", {
    get: function() {
      return {
        addClass: function() {
          return void 0;
        },
        removeClass: function() {
          return void 0;
        },
        hasClass: function() {
          return false;
        },
        elementHasClass: function() {
          return false;
        },
        notifyClose: function() {
          return void 0;
        },
        notifyOpen: function() {
          return void 0;
        },
        saveFocus: function() {
          return void 0;
        },
        restoreFocus: function() {
          return void 0;
        },
        focusActiveNavigationItem: function() {
          return void 0;
        },
        trapFocus: function() {
          return void 0;
        },
        releaseFocus: function() {
          return void 0;
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  MDCDismissibleDrawerFoundation2.prototype.destroy = function() {
    if (this.animationFrame_) {
      cancelAnimationFrame(this.animationFrame_);
    }
    if (this.animationTimer_) {
      clearTimeout(this.animationTimer_);
    }
  };
  MDCDismissibleDrawerFoundation2.prototype.open = function() {
    var _this = this;
    if (this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }
    this.adapter.addClass(cssClasses$1.OPEN);
    this.adapter.addClass(cssClasses$1.ANIMATE);
    this.runNextAnimationFrame_(function() {
      _this.adapter.addClass(cssClasses$1.OPENING);
    });
    this.adapter.saveFocus();
  };
  MDCDismissibleDrawerFoundation2.prototype.close = function() {
    if (!this.isOpen() || this.isOpening() || this.isClosing()) {
      return;
    }
    this.adapter.addClass(cssClasses$1.CLOSING);
  };
  MDCDismissibleDrawerFoundation2.prototype.isOpen = function() {
    return this.adapter.hasClass(cssClasses$1.OPEN);
  };
  MDCDismissibleDrawerFoundation2.prototype.isOpening = function() {
    return this.adapter.hasClass(cssClasses$1.OPENING) || this.adapter.hasClass(cssClasses$1.ANIMATE);
  };
  MDCDismissibleDrawerFoundation2.prototype.isClosing = function() {
    return this.adapter.hasClass(cssClasses$1.CLOSING);
  };
  MDCDismissibleDrawerFoundation2.prototype.handleKeydown = function(evt) {
    var keyCode = evt.keyCode, key = evt.key;
    var isEscape = key === "Escape" || keyCode === 27;
    if (isEscape) {
      this.close();
    }
  };
  MDCDismissibleDrawerFoundation2.prototype.handleTransitionEnd = function(evt) {
    var OPENING = cssClasses$1.OPENING, CLOSING = cssClasses$1.CLOSING, OPEN = cssClasses$1.OPEN, ANIMATE = cssClasses$1.ANIMATE, ROOT = cssClasses$1.ROOT;
    var isRootElement = this.isElement_(evt.target) && this.adapter.elementHasClass(evt.target, ROOT);
    if (!isRootElement) {
      return;
    }
    if (this.isClosing()) {
      this.adapter.removeClass(OPEN);
      this.closed_();
      this.adapter.restoreFocus();
      this.adapter.notifyClose();
    } else {
      this.adapter.focusActiveNavigationItem();
      this.opened_();
      this.adapter.notifyOpen();
    }
    this.adapter.removeClass(ANIMATE);
    this.adapter.removeClass(OPENING);
    this.adapter.removeClass(CLOSING);
  };
  MDCDismissibleDrawerFoundation2.prototype.opened_ = function() {
  };
  MDCDismissibleDrawerFoundation2.prototype.closed_ = function() {
  };
  MDCDismissibleDrawerFoundation2.prototype.runNextAnimationFrame_ = function(callback) {
    var _this = this;
    cancelAnimationFrame(this.animationFrame_);
    this.animationFrame_ = requestAnimationFrame(function() {
      _this.animationFrame_ = 0;
      clearTimeout(_this.animationTimer_);
      _this.animationTimer_ = setTimeout(callback, 0);
    });
  };
  MDCDismissibleDrawerFoundation2.prototype.isElement_ = function(element2) {
    return Boolean(element2.classList);
  };
  return MDCDismissibleDrawerFoundation2;
}(MDCFoundation);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCModalDrawerFoundation = function(_super) {
  __extends(MDCModalDrawerFoundation2, _super);
  function MDCModalDrawerFoundation2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCModalDrawerFoundation2.prototype.handleScrimClick = function() {
    this.close();
  };
  MDCModalDrawerFoundation2.prototype.opened_ = function() {
    this.adapter.trapFocus();
  };
  MDCModalDrawerFoundation2.prototype.closed_ = function() {
    this.adapter.releaseFocus();
  };
  return MDCModalDrawerFoundation2;
}(MDCDismissibleDrawerFoundation);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = MDCDismissibleDrawerFoundation.cssClasses, strings = MDCDismissibleDrawerFoundation.strings;
var MDCDrawer = function(_super) {
  __extends(MDCDrawer2, _super);
  function MDCDrawer2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  MDCDrawer2.attachTo = function(root) {
    return new MDCDrawer2(root);
  };
  Object.defineProperty(MDCDrawer2.prototype, "open", {
    get: function() {
      return this.foundation.isOpen();
    },
    set: function(isOpen) {
      if (isOpen) {
        this.foundation.open();
      } else {
        this.foundation.close();
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(MDCDrawer2.prototype, "list", {
    get: function() {
      return this.list_;
    },
    enumerable: false,
    configurable: true
  });
  MDCDrawer2.prototype.initialize = function(focusTrapFactory, listFactory) {
    if (focusTrapFactory === void 0) {
      focusTrapFactory = function(el) {
        return new FocusTrap(el);
      };
    }
    if (listFactory === void 0) {
      listFactory = function(el) {
        return new MDCList(el);
      };
    }
    var listEl = this.root.querySelector(strings.LIST_SELECTOR);
    if (listEl) {
      this.list_ = listFactory(listEl);
      this.list_.wrapFocus = true;
    }
    this.focusTrapFactory_ = focusTrapFactory;
  };
  MDCDrawer2.prototype.initialSyncWithDOM = function() {
    var _this = this;
    var MODAL = cssClasses.MODAL;
    var SCRIM_SELECTOR = strings.SCRIM_SELECTOR;
    this.scrim_ = this.root.parentNode.querySelector(SCRIM_SELECTOR);
    if (this.scrim_ && this.root.classList.contains(MODAL)) {
      this.handleScrimClick_ = function() {
        return _this.foundation.handleScrimClick();
      };
      this.scrim_.addEventListener("click", this.handleScrimClick_);
      this.focusTrap_ = createFocusTrapInstance(this.root, this.focusTrapFactory_);
    }
    this.handleKeydown_ = function(evt) {
      return _this.foundation.handleKeydown(evt);
    };
    this.handleTransitionEnd_ = function(evt) {
      return _this.foundation.handleTransitionEnd(evt);
    };
    this.listen("keydown", this.handleKeydown_);
    this.listen("transitionend", this.handleTransitionEnd_);
  };
  MDCDrawer2.prototype.destroy = function() {
    this.unlisten("keydown", this.handleKeydown_);
    this.unlisten("transitionend", this.handleTransitionEnd_);
    if (this.list_) {
      this.list_.destroy();
    }
    var MODAL = cssClasses.MODAL;
    if (this.scrim_ && this.handleScrimClick_ && this.root.classList.contains(MODAL)) {
      this.scrim_.removeEventListener("click", this.handleScrimClick_);
      this.open = false;
    }
  };
  MDCDrawer2.prototype.getDefaultFoundation = function() {
    var _this = this;
    var adapter = {
      addClass: function(className) {
        return _this.root.classList.add(className);
      },
      removeClass: function(className) {
        return _this.root.classList.remove(className);
      },
      hasClass: function(className) {
        return _this.root.classList.contains(className);
      },
      elementHasClass: function(element2, className) {
        return element2.classList.contains(className);
      },
      saveFocus: function() {
        return _this.previousFocus_ = document.activeElement;
      },
      restoreFocus: function() {
        var previousFocus = _this.previousFocus_;
        if (previousFocus && previousFocus.focus && _this.root.contains(document.activeElement)) {
          previousFocus.focus();
        }
      },
      focusActiveNavigationItem: function() {
        var activeNavItemEl = _this.root.querySelector(strings.LIST_ITEM_ACTIVATED_SELECTOR);
        if (activeNavItemEl) {
          activeNavItemEl.focus();
        }
      },
      notifyClose: function() {
        return _this.emit(strings.CLOSE_EVENT, {}, true);
      },
      notifyOpen: function() {
        return _this.emit(strings.OPEN_EVENT, {}, true);
      },
      trapFocus: function() {
        return _this.focusTrap_.trapFocus();
      },
      releaseFocus: function() {
        return _this.focusTrap_.releaseFocus();
      }
    };
    var DISMISSIBLE = cssClasses.DISMISSIBLE, MODAL = cssClasses.MODAL;
    if (this.root.classList.contains(DISMISSIBLE)) {
      return new MDCDismissibleDrawerFoundation(adapter);
    } else if (this.root.classList.contains(MODAL)) {
      return new MDCModalDrawerFoundation(adapter);
    } else {
      throw new Error("MDCDrawer: Failed to instantiate component. Supported variants are " + DISMISSIBLE + " and " + MODAL + ".");
    }
  };
  return MDCDrawer2;
}(MDCComponent);
const [createDrawerContext, getDrawerContext] = createContextWritableStore();
function create_fragment$i(ctx) {
  let div;
  let div_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let div_levels = [
    { id: ctx[3] },
    {
      class: div_class_value = classList([ctx[1], "mdc-drawer-scrim"])
    },
    { style: ctx[2] },
    ctx[4]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[7](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2 && div_class_value !== (div_class_value = classList([ctx2[1], "mdc-drawer-scrim"]))) && { class: div_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
      ctx[7](null);
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, div_binding];
}
class Scrim extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
var Drawer_svelte_svelte_type_style_lang = '.mdc-drawer{border-color:rgba(0, 0, 0, 0.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-top-left-radius:0;border-top-right-radius:0;border-top-right-radius:var(--mdc-shape-large, 0);border-bottom-right-radius:0;border-bottom-right-radius:var(--mdc-shape-large, 0);border-bottom-left-radius:0;z-index:6;width:256px;display:flex;flex-direction:column;flex-shrink:0;box-sizing:border-box;height:100%;border-right-width:1px;border-right-style:solid;overflow:hidden;transition-property:transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer .mdc-drawer__title{color:rgba(0, 0, 0, 0.87)}.mdc-drawer .mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-drawer__subtitle{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-deprecated-list-item__graphic{color:rgba(0, 0, 0, 0.6)}.mdc-drawer .mdc-deprecated-list-item{color:rgba(0, 0, 0, 0.87)}.mdc-drawer .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#c7b300}.mdc-drawer .mdc-deprecated-list-item--activated{color:rgba(199, 179, 0, 0.87)}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-top-left-radius:0;border-top-left-radius:var(--mdc-shape-large, 0);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:0;border-bottom-left-radius:var(--mdc-shape-large, 0)}.mdc-drawer .mdc-deprecated-list-item{border-radius:4px;border-radius:var(--mdc-shape-small, 4px)}.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content{margin-left:256px;margin-right:0}[dir=rtl] .mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content,.mdc-drawer.mdc-drawer--open:not(.mdc-drawer--closing)+.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:256px}[dir=rtl] .mdc-drawer,.mdc-drawer[dir=rtl]{border-right-width:0;border-left-width:1px;border-right-style:none;border-left-style:solid}.mdc-drawer .mdc-deprecated-list-item{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit);height:calc(48px - 2 * 4px);margin:8px 8px;padding:0 8px}.mdc-drawer .mdc-deprecated-list-item:nth-child(1){margin-top:2px}.mdc-drawer .mdc-deprecated-list-item:nth-last-child(1){margin-bottom:0}.mdc-drawer .mdc-deprecated-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;padding:0 16px}.mdc-drawer .mdc-deprecated-list-group__subheader::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-drawer .mdc-deprecated-list-divider{margin:3px 0 4px}.mdc-drawer .mdc-deprecated-list-item__text,.mdc-drawer .mdc-deprecated-list-item__graphic{pointer-events:none}.mdc-drawer--animate{transform:translateX(-100%)}[dir=rtl] .mdc-drawer--animate,.mdc-drawer--animate[dir=rtl]{transform:translateX(100%)}.mdc-drawer--opening{transform:translateX(0);transition-duration:250ms}[dir=rtl] .mdc-drawer--opening,.mdc-drawer--opening[dir=rtl]{transform:translateX(0)}.mdc-drawer--closing{transform:translateX(-100%);transition-duration:200ms}[dir=rtl] .mdc-drawer--closing,.mdc-drawer--closing[dir=rtl]{transform:translateX(100%)}.mdc-drawer__header{flex-shrink:0;box-sizing:border-box;min-height:64px;padding:0 16px 4px}.mdc-drawer__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-drawer__title::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-drawer__title::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-drawer__subtitle{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-bottom:0}.mdc-drawer__subtitle::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-drawer__content{height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch}.mdc-drawer--dismissible{left:0;right:initial;display:none;position:absolute}[dir=rtl] .mdc-drawer--dismissible,.mdc-drawer--dismissible[dir=rtl]{left:initial;right:0}.mdc-drawer--dismissible.mdc-drawer--open{display:flex}.mdc-drawer-app-content{margin-left:0;margin-right:0;position:relative}[dir=rtl] .mdc-drawer-app-content,.mdc-drawer-app-content[dir=rtl]{margin-left:0;margin-right:0}.mdc-drawer--modal{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);left:0;right:initial;display:none;position:fixed}.mdc-drawer--modal+.mdc-drawer-scrim{background-color:rgba(0, 0, 0, 0.32)}[dir=rtl] .mdc-drawer--modal,.mdc-drawer--modal[dir=rtl]{left:initial;right:0}.mdc-drawer--modal.mdc-drawer--open{display:flex}.mdc-drawer-scrim{display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:5;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.mdc-drawer--open+.mdc-drawer-scrim{display:block}.mdc-drawer--animate+.mdc-drawer-scrim{opacity:0}.mdc-drawer--opening+.mdc-drawer-scrim{transition-duration:250ms;opacity:1}.mdc-drawer--closing+.mdc-drawer-scrim{transition-duration:200ms;opacity:0}.mdc-drawer{position:absolute}';
const get_app_content_slot_changes = (dirty) => ({});
const get_app_content_slot_context = (ctx) => ({});
function create_if_block$2(ctx) {
  let scrim;
  let current;
  scrim = new Scrim({});
  return {
    c() {
      create_component(scrim.$$.fragment);
    },
    l(nodes) {
      claim_component(scrim.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(scrim, target, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      transition_in(scrim.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(scrim.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(scrim, detaching);
    }
  };
}
function create_fragment$h(ctx) {
  let usestate;
  let t0;
  let aside;
  let aside_class_value;
  let t1;
  let t2;
  let if_block_anchor;
  let current;
  usestate = new UseState({
    props: {
      value: ctx[0],
      onUpdate: ctx[7]
    }
  });
  const default_slot_template = ctx[13].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[12], null);
  let aside_levels = [
    { id: ctx[4] },
    {
      class: aside_class_value = classList([
        ctx[2],
        "mdc-drawer",
        [ctx[0] === "dismissible", "mdc-drawer--dismissible"],
        [ctx[0] === "modal", "mdc-drawer--modal"],
        [
          ctx[5] || ctx[0] === "permanent",
          "mdc-drawer--open"
        ]
      ])
    },
    { style: ctx[3] },
    ctx[8]
  ];
  let aside_data = {};
  for (let i = 0; i < aside_levels.length; i += 1) {
    aside_data = assign(aside_data, aside_levels[i]);
  }
  const app_content_slot_template = ctx[13]["app-content"];
  const app_content_slot = create_slot(app_content_slot_template, ctx, ctx[12], get_app_content_slot_context);
  let if_block = ctx[0] === "modal" && create_if_block$2();
  return {
    c() {
      create_component(usestate.$$.fragment);
      t0 = space();
      aside = element("aside");
      if (default_slot)
        default_slot.c();
      t1 = space();
      if (app_content_slot)
        app_content_slot.c();
      t2 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      claim_component(usestate.$$.fragment, nodes);
      t0 = claim_space(nodes);
      aside = claim_element(nodes, "ASIDE", { id: true, class: true, style: true });
      var aside_nodes = children(aside);
      if (default_slot)
        default_slot.l(aside_nodes);
      aside_nodes.forEach(detach);
      t1 = claim_space(nodes);
      if (app_content_slot)
        app_content_slot.l(nodes);
      t2 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      set_attributes(aside, aside_data);
    },
    m(target, anchor) {
      mount_component(usestate, target, anchor);
      insert(target, t0, anchor);
      insert(target, aside, anchor);
      if (default_slot) {
        default_slot.m(aside, null);
      }
      ctx[14](aside);
      insert(target, t1, anchor);
      if (app_content_slot) {
        app_content_slot.m(target, anchor);
      }
      insert(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const usestate_changes = {};
      if (dirty & 1)
        usestate_changes.value = ctx2[0];
      usestate.$set(usestate_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4096)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[12], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(aside, aside_data = get_spread_update(aside_levels, [
        (!current || dirty & 16) && { id: ctx2[4] },
        (!current || dirty & 37 && aside_class_value !== (aside_class_value = classList([
          ctx2[2],
          "mdc-drawer",
          [ctx2[0] === "dismissible", "mdc-drawer--dismissible"],
          [ctx2[0] === "modal", "mdc-drawer--modal"],
          [
            ctx2[5] || ctx2[0] === "permanent",
            "mdc-drawer--open"
          ]
        ]))) && { class: aside_class_value },
        (!current || dirty & 8) && { style: ctx2[3] },
        dirty & 256 && ctx2[8]
      ]));
      if (app_content_slot) {
        if (app_content_slot.p && (!current || dirty & 4096)) {
          update_slot(app_content_slot, app_content_slot_template, ctx2, ctx2[12], !current ? -1 : dirty, get_app_content_slot_changes, get_app_content_slot_context);
        }
      }
      if (ctx2[0] === "modal") {
        if (if_block) {
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2();
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
      transition_in(usestate.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(app_content_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(usestate.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(app_content_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      destroy_component(usestate, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(aside);
      if (default_slot)
        default_slot.d(detaching);
      ctx[14](null);
      if (detaching)
        detach(t1);
      if (app_content_slot)
        app_content_slot.d(detaching);
      if (detaching)
        detach(t2);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
let count$2 = 0;
function instance$h($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "variant", "open"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $context$;
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@smui/drawer/Drawer:${count$2++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { variant = "permanent" } = $$props;
  let { open = false } = $$props;
  const dispatch2 = createEventDispatcher();
  let opened = false;
  let drawer;
  onMount(() => {
    initialize();
  });
  const context$ = createDrawerContext({ variant });
  component_subscribe($$self, context$, (value) => $$invalidate(11, $context$ = value));
  onDestroy(() => {
    drawer && drawer.destroy();
  });
  function initialize() {
    var _a2;
    (_a2 = drawer === null || drawer === void 0 ? void 0 : drawer.list) === null || _a2 === void 0 ? void 0 : _a2.destroy();
    drawer === null || drawer === void 0 ? void 0 : drawer.destroy();
    if (variant === "dismissible" || variant === "modal") {
      $$invalidate(10, drawer = new MDCDrawer(dom));
      drawer.listen("MDCDrawer:opened", handleOpen);
      drawer.listen("MDCDrawer:closed", handleClose);
    }
  }
  function handleOpen() {
    return __awaiter(this, void 0, void 0, function* () {
      $$invalidate(5, opened = true);
      handleUpdateOpen();
      yield tick();
      dispatch2("open");
    });
  }
  function handleClose() {
    return __awaiter(this, void 0, void 0, function* () {
      $$invalidate(5, opened = false);
      handleUpdateOpen();
      yield tick();
      dispatch2("close");
    });
  }
  function handleUpdateOpen() {
    $$invalidate(9, open = drawer.open);
  }
  function aside_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(1, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(3, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(4, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(1, dom = $$new_props.dom);
    if ("variant" in $$new_props)
      $$invalidate(0, variant = $$new_props.variant);
    if ("open" in $$new_props)
      $$invalidate(9, open = $$new_props.open);
    if ("$$scope" in $$new_props)
      $$invalidate(12, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      if (!variant)
        $$invalidate(0, variant = "permanent");
    }
    if ($$self.$$.dirty & 2049) {
      set_store_value(context$, $context$ = Object.assign(Object.assign({}, $context$), { variant }), $context$);
    }
    if ($$self.$$.dirty & 1536) {
      if (drawer && drawer.open !== open) {
        tick().then(() => $$invalidate(10, drawer.open = open, drawer));
      }
    }
  };
  return [
    variant,
    dom,
    className,
    style,
    id,
    opened,
    context$,
    initialize,
    $$restProps,
    open,
    drawer,
    $context$,
    $$scope,
    slots,
    aside_binding
  ];
}
class Drawer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, not_equal, {
      class: 2,
      style: 3,
      id: 4,
      dom: 1,
      variant: 0,
      open: 9
    });
  }
}
const get_topAppBar_slot_changes = (dirty) => ({});
const get_topAppBar_slot_context = (ctx) => ({});
function create_fragment$g(ctx) {
  let div;
  let t;
  let div_class_value;
  let current;
  const topAppBar_slot_template = ctx[5].topAppBar;
  const topAppBar_slot = create_slot(topAppBar_slot_template, ctx, ctx[4], get_topAppBar_slot_context);
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
  return {
    c() {
      div = element("div");
      if (topAppBar_slot)
        topAppBar_slot.c();
      t = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (topAppBar_slot)
        topAppBar_slot.l(div_nodes);
      t = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", ctx[3]);
      attr(div, "class", div_class_value = classList([ctx[1], "mdc-drawer-app-content"]));
      attr(div, "style", ctx[2]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (topAppBar_slot) {
        topAppBar_slot.m(div, null);
      }
      append(div, t);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[6](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (topAppBar_slot) {
        if (topAppBar_slot.p && (!current || dirty & 16)) {
          update_slot(topAppBar_slot, topAppBar_slot_template, ctx2, ctx2[4], !current ? -1 : dirty, get_topAppBar_slot_changes, get_topAppBar_slot_context);
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[4], !current ? -1 : dirty, null, null);
        }
      }
      if (!current || dirty & 8) {
        attr(div, "id", ctx2[3]);
      }
      if (!current || dirty & 2 && div_class_value !== (div_class_value = classList([ctx2[1], "mdc-drawer-app-content"]))) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty & 4) {
        attr(div, "style", ctx2[2]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(topAppBar_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(topAppBar_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (topAppBar_slot)
        topAppBar_slot.d(detaching);
      if (default_slot)
        default_slot.d(detaching);
      ctx[6](null);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("class" in $$props2)
      $$invalidate(1, className = $$props2.class);
    if ("style" in $$props2)
      $$invalidate(2, style = $$props2.style);
    if ("id" in $$props2)
      $$invalidate(3, id = $$props2.id);
    if ("dom" in $$props2)
      $$invalidate(0, dom = $$props2.dom);
    if ("$$scope" in $$props2)
      $$invalidate(4, $$scope = $$props2.$$scope);
  };
  return [dom, className, style, id, $$scope, slots, div_binding];
}
class AppContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$f(ctx) {
  let div;
  let div_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let div_levels = [
    { id: ctx[3] },
    {
      class: div_class_value = classList([ctx[1], "mdc-drawer__content"])
    },
    { style: ctx[2] },
    ctx[4]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[7](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2 && div_class_value !== (div_class_value = classList([ctx2[1], "mdc-drawer__content"]))) && { class: div_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
      ctx[7](null);
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, div_binding];
}
class Content$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function createContext() {
  const CONTEXT_ID = {};
  function setContextValue(context) {
    setContext$1(CONTEXT_ID, context);
    return context;
  }
  function getContextValue() {
    return getContext$1(CONTEXT_ID);
  }
  return [setContextValue, getContextValue];
}
const [setGroupContext, getGroupContext] = createContext();
function initialParams(fn) {
  return function(...args) {
    var callback = args.pop();
    return fn.call(this, args, callback);
  };
}
var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
function fallback(fn) {
  setTimeout(fn, 0);
}
function wrap(defer) {
  return (fn, ...args) => defer(() => fn(...args));
}
var _defer;
if (hasSetImmediate) {
  _defer = setImmediate;
} else if (hasNextTick) {
  _defer = process.nextTick;
} else {
  _defer = fallback;
}
var setImmediate$1 = wrap(_defer);
function asyncify(func) {
  if (isAsync(func)) {
    return function(...args) {
      const callback = args.pop();
      const promise2 = func.apply(this, args);
      return handlePromise(promise2, callback);
    };
  }
  return initialParams(function(args, callback) {
    var result;
    try {
      result = func.apply(this, args);
    } catch (e) {
      return callback(e);
    }
    if (result && typeof result.then === "function") {
      return handlePromise(result, callback);
    } else {
      callback(null, result);
    }
  });
}
function handlePromise(promise2, callback) {
  return promise2.then((value) => {
    invokeCallback(callback, null, value);
  }, (err) => {
    invokeCallback(callback, err && err.message ? err : new Error(err));
  });
}
function invokeCallback(callback, error, value) {
  try {
    callback(error, value);
  } catch (err) {
    setImmediate$1((e) => {
      throw e;
    }, err);
  }
}
function isAsync(fn) {
  return fn[Symbol.toStringTag] === "AsyncFunction";
}
function wrapAsync(asyncFn) {
  if (typeof asyncFn !== "function")
    throw new Error("expected a function");
  return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}
function onlyOnce(fn) {
  return function(...args) {
    if (fn === null)
      throw new Error("Callback was already called.");
    var callFn = fn;
    fn = null;
    callFn.apply(this, args);
  };
}
class DLL {
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }
  removeLink(node) {
    if (node.prev)
      node.prev.next = node.next;
    else
      this.head = node.next;
    if (node.next)
      node.next.prev = node.prev;
    else
      this.tail = node.prev;
    node.prev = node.next = null;
    this.length -= 1;
    return node;
  }
  empty() {
    while (this.head)
      this.shift();
    return this;
  }
  insertAfter(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next)
      node.next.prev = newNode;
    else
      this.tail = newNode;
    node.next = newNode;
    this.length += 1;
  }
  insertBefore(node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev)
      node.prev.next = newNode;
    else
      this.head = newNode;
    node.prev = newNode;
    this.length += 1;
  }
  unshift(node) {
    if (this.head)
      this.insertBefore(this.head, node);
    else
      setInitial(this, node);
  }
  push(node) {
    if (this.tail)
      this.insertAfter(this.tail, node);
    else
      setInitial(this, node);
  }
  shift() {
    return this.head && this.removeLink(this.head);
  }
  pop() {
    return this.tail && this.removeLink(this.tail);
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    var cur = this.head;
    while (cur) {
      yield cur.data;
      cur = cur.next;
    }
  }
  remove(testFn) {
    var curr = this.head;
    while (curr) {
      var { next } = curr;
      if (testFn(curr)) {
        this.removeLink(curr);
      }
      curr = next;
    }
    return this;
  }
}
function setInitial(dll, node) {
  dll.length = 1;
  dll.head = dll.tail = node;
}
function queue(worker, concurrency, payload) {
  if (concurrency == null) {
    concurrency = 1;
  } else if (concurrency === 0) {
    throw new RangeError("Concurrency must not be zero");
  }
  var _worker = wrapAsync(worker);
  var numRunning = 0;
  var workersList = [];
  const events = {
    error: [],
    drain: [],
    saturated: [],
    unsaturated: [],
    empty: []
  };
  function on(event, handler) {
    events[event].push(handler);
  }
  function once(event, handler) {
    const handleAndRemove = (...args) => {
      off(event, handleAndRemove);
      handler(...args);
    };
    events[event].push(handleAndRemove);
  }
  function off(event, handler) {
    if (!event)
      return Object.keys(events).forEach((ev) => events[ev] = []);
    if (!handler)
      return events[event] = [];
    events[event] = events[event].filter((ev) => ev !== handler);
  }
  function trigger(event, ...args) {
    events[event].forEach((handler) => handler(...args));
  }
  var processingScheduled = false;
  function _insert(data, insertAtFront, rejectOnError, callback) {
    if (callback != null && typeof callback !== "function") {
      throw new Error("task callback must be a function");
    }
    q.started = true;
    var res, rej;
    function promiseCallback(err, ...args) {
      if (err)
        return rejectOnError ? rej(err) : res();
      if (args.length <= 1)
        return res(args[0]);
      res(args);
    }
    var item = {
      data,
      callback: rejectOnError ? promiseCallback : callback || promiseCallback
    };
    if (insertAtFront) {
      q._tasks.unshift(item);
    } else {
      q._tasks.push(item);
    }
    if (!processingScheduled) {
      processingScheduled = true;
      setImmediate$1(() => {
        processingScheduled = false;
        q.process();
      });
    }
    if (rejectOnError || !callback) {
      return new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
    }
  }
  function _createCB(tasks2) {
    return function(err, ...args) {
      numRunning -= 1;
      for (var i = 0, l = tasks2.length; i < l; i++) {
        var task = tasks2[i];
        var index = workersList.indexOf(task);
        if (index === 0) {
          workersList.shift();
        } else if (index > 0) {
          workersList.splice(index, 1);
        }
        task.callback(err, ...args);
        if (err != null) {
          trigger("error", err, task.data);
        }
      }
      if (numRunning <= q.concurrency - q.buffer) {
        trigger("unsaturated");
      }
      if (q.idle()) {
        trigger("drain");
      }
      q.process();
    };
  }
  function _maybeDrain(data) {
    if (data.length === 0 && q.idle()) {
      setImmediate$1(() => trigger("drain"));
      return true;
    }
    return false;
  }
  const eventMethod = (name) => (handler) => {
    if (!handler) {
      return new Promise((resolve, reject) => {
        once(name, (err, data) => {
          if (err)
            return reject(err);
          resolve(data);
        });
      });
    }
    off(name);
    on(name, handler);
  };
  var isProcessing = false;
  var q = {
    _tasks: new DLL(),
    *[Symbol.iterator]() {
      yield* q._tasks[Symbol.iterator]();
    },
    concurrency,
    payload,
    buffer: concurrency / 4,
    started: false,
    paused: false,
    push(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, false, false, callback));
      }
      return _insert(data, false, false, callback);
    },
    pushAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, false, true, callback));
      }
      return _insert(data, false, true, callback);
    },
    kill() {
      off();
      q._tasks.empty();
    },
    unshift(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, true, false, callback));
      }
      return _insert(data, true, false, callback);
    },
    unshiftAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data))
          return;
        return data.map((datum) => _insert(datum, true, true, callback));
      }
      return _insert(data, true, true, callback);
    },
    remove(testFn) {
      q._tasks.remove(testFn);
    },
    process() {
      if (isProcessing) {
        return;
      }
      isProcessing = true;
      while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
        var tasks2 = [], data = [];
        var l = q._tasks.length;
        if (q.payload)
          l = Math.min(l, q.payload);
        for (var i = 0; i < l; i++) {
          var node = q._tasks.shift();
          tasks2.push(node);
          workersList.push(node);
          data.push(node.data);
        }
        numRunning += 1;
        if (q._tasks.length === 0) {
          trigger("empty");
        }
        if (numRunning === q.concurrency) {
          trigger("saturated");
        }
        var cb = onlyOnce(_createCB(tasks2));
        _worker(data, cb);
      }
      isProcessing = false;
    },
    length() {
      return q._tasks.length;
    },
    running() {
      return numRunning;
    },
    workersList() {
      return workersList;
    },
    idle() {
      return q._tasks.length + numRunning === 0;
    },
    pause() {
      q.paused = true;
    },
    resume() {
      if (q.paused === false) {
        return;
      }
      q.paused = false;
      setImmediate$1(q.process);
    }
  };
  Object.defineProperties(q, {
    saturated: {
      writable: false,
      value: eventMethod("saturated")
    },
    unsaturated: {
      writable: false,
      value: eventMethod("unsaturated")
    },
    empty: {
      writable: false,
      value: eventMethod("empty")
    },
    drain: {
      writable: false,
      value: eventMethod("drain")
    },
    error: {
      writable: false,
      value: eventMethod("error")
    }
  });
  return q;
}
function cargo(worker, payload) {
  return queue(worker, 1, payload);
}
function tickCargo(cb) {
  const tickCargoInstance = cargo(async (data) => {
    await tick();
    await cb(data);
  });
  return {
    push: tickCargoInstance.push
  };
}
const get_default_slot_changes$5 = (dirty) => ({});
const get_default_slot_context$5 = (ctx) => ({ group: ctx[1] });
function create_fragment$e(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], get_default_slot_context$5);
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
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[6], !current ? -1 : dirty, get_default_slot_changes$5, get_default_slot_context$5);
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
function instance$e($$self, $$props, $$invalidate) {
  let $group$;
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { onInit = void 0 } = $$props;
  let destroyed = false;
  const dispatch2 = createEventDispatcher();
  let group$ = createComponentsGroupStore();
  component_subscribe($$self, group$, (value) => $$invalidate(9, $group$ = value));
  const group = {
    registerItem,
    unregisterItem,
    updateItem,
    getItems
  };
  setGroupContext(group);
  onInit === null || onInit === void 0 ? void 0 : onInit({ group });
  onDestroy(() => {
    destroyed = true;
  });
  function updateItem(item, newContext) {
    return __awaiter(this, void 0, void 0, function* () {
      if (destroyed)
        return;
      group$.updateItem(item, newContext);
      updateItemTickCargo.push(item);
    });
  }
  const updateItemTickCargo = tickCargo((updatedItems) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch2("update", { items: updatedItems });
  }));
  function registerItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
      if (destroyed)
        return;
      group$.registerItem(item);
      unregisterItemTickCargo.push(item);
    });
  }
  const registerItemTickCargo = tickCargo((registeredItems) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch2("optionsChange", { items: registeredItems });
  }));
  function unregisterItem(item) {
    return __awaiter(this, void 0, void 0, function* () {
      if (destroyed)
        return;
      group$.unregisterItem(item);
      registerItemTickCargo.push(item);
    });
  }
  const unregisterItemTickCargo = tickCargo((unregisteredItems) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch2("optionsChange", { items: unregisteredItems });
  }));
  function getBindings() {
    return group;
  }
  function getItems() {
    return $group$;
  }
  function getStore() {
    return group$;
  }
  $$self.$$set = ($$props2) => {
    if ("onInit" in $$props2)
      $$invalidate(2, onInit = $$props2.onInit);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [group$, group, onInit, getBindings, getItems, getStore, $$scope, slots];
}
class Group extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, not_equal, {
      onInit: 2,
      getBindings: 3,
      getItems: 4,
      getStore: 5
    });
  }
  get getBindings() {
    return this.$$.ctx[3];
  }
  get getItems() {
    return this.$$.ctx[4];
  }
  get getStore() {
    return this.$$.ctx[5];
  }
}
function create_fragment$d(ctx) {
  let usestate;
  let t;
  let current;
  usestate = new UseState({
    props: {
      value: [ctx[0], ctx[1]],
      onUpdate: ctx[2]
    }
  });
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  return {
    c() {
      create_component(usestate.$$.fragment);
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      claim_component(usestate.$$.fragment, nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      mount_component(usestate, target, anchor);
      insert(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const usestate_changes = {};
      if (dirty & 3)
        usestate_changes.value = [ctx2[0], ctx2[1]];
      usestate.$set(usestate_changes);
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[6], !current ? -1 : dirty, null, null);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(usestate.$$.fragment, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(usestate.$$.fragment, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      destroy_component(usestate, detaching);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$d($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { dom = void 0 } = $$props;
  let { context: externalContext = void 0 } = $$props;
  let { group = void 0 } = $$props;
  let { useGroupContext = false } = $$props;
  let { onInit = void 0 } = $$props;
  if (useGroupContext && !group) {
    group = getGroupContext();
  }
  const context = {
    dom,
    externalContext,
    updateContext(newContext) {
      Object.assign(context, Object.assign({}, newContext));
      updateContext();
    },
    setGroup(newGroup) {
      $$invalidate(3, group = newGroup);
    }
  };
  onInit === null || onInit === void 0 ? void 0 : onInit({ group, context });
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    yield tick();
    updateContext();
    group === null || group === void 0 ? void 0 : group.registerItem(context);
  }));
  onDestroy(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a2;
    (_a2 = group === null || group === void 0 ? void 0 : group.unregisterItem) === null || _a2 === void 0 ? void 0 : _a2.call(group, context);
  }));
  function updateItem() {
    updateContext();
    group === null || group === void 0 ? void 0 : group.updateItem(context, Object.assign({}, getContextData()));
  }
  function updateContext() {
    Object.assign(context, Object.assign({}, getContextData()));
  }
  function getContextData() {
    return { dom, externalContext };
  }
  $$self.$$set = ($$props2) => {
    if ("dom" in $$props2)
      $$invalidate(0, dom = $$props2.dom);
    if ("context" in $$props2)
      $$invalidate(1, externalContext = $$props2.context);
    if ("group" in $$props2)
      $$invalidate(3, group = $$props2.group);
    if ("useGroupContext" in $$props2)
      $$invalidate(4, useGroupContext = $$props2.useGroupContext);
    if ("onInit" in $$props2)
      $$invalidate(5, onInit = $$props2.onInit);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [
    dom,
    externalContext,
    updateItem,
    group,
    useGroupContext,
    onInit,
    $$scope,
    slots
  ];
}
class GroupItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, not_equal, {
      dom: 0,
      context: 1,
      group: 3,
      useGroupContext: 4,
      onInit: 5
    });
  }
}
function beforeOrAfter(a, b) {
  const pos = b.compareDocumentPosition(a);
  const resBitmask = pos & 6;
  if (resBitmask === 2) {
    return -1;
  } else if (resBitmask === 4) {
    return 1;
  }
  throw new Error(`Unexpeted position: ${resBitmask.toString(2)}`);
}
function createComponentsGroupStore() {
  const { subscribe: subscribe2, set, update: update2 } = writable([]);
  return {
    subscribe: subscribe2,
    update: update2,
    set,
    async registerItem(item) {
      update2((items) => {
        items.push(item);
        if (typeof window !== "undefined") {
          items.sort((a, b) => beforeOrAfter(a.dom, b.dom));
        }
        return [...items];
      });
    },
    async unregisterItem(item) {
      update2((items) => {
        const index = items.indexOf(item);
        if (~index) {
          items = items.slice(0, index).concat(items.slice(index + 1));
        }
        return [...items];
      });
    },
    async updateItem(item, newContext) {
      if (newContext) {
        Object.assign(item, newContext);
      }
      update2((items) => {
        return [...items];
      });
    }
  };
}
function create_default_slot$7(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[20], null);
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
        if (default_slot.p && (!current || dirty & 1048576)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[20], !current ? -1 : dirty, null, null);
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
function create_fragment$c(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[4] },
    {
      class: classList([
        ctx[2],
        "mdc-list",
        [ctx[7], "mdc-list--dense"],
        [ctx[0] === 2, "mdc-list--two-line"],
        [ctx[0] === 3, "smui-list--three-line"],
        [ctx[5] === "horizontal", "smui-list--horizontal"],
        [ctx[6] === "textual", "mdc-list--textual-list"],
        [ctx[6] === "avatar", "mdc-list--avatar-list"],
        [ctx[6] === "icon", "mdc-list--icon-list"],
        [ctx[6] === "image", "mdc-list--image-list"],
        [ctx[6] === "thumbnail", "mdc-list--thumbnail-list"],
        [ctx[6] === "video", "mdc-list--video-list"]
      ])
    },
    { style: ctx[3] },
    {
      "aria-orientation": ctx[5]
    },
    ctx[9]
  ];
  function switch_instance_dom_binding(value) {
    ctx[12](value);
  }
  var switch_value = ctx[8];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot$7] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[1] !== void 0) {
      switch_instance_props.dom = ctx2[1];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[13]);
    switch_instance.$on("mousedown", ctx[14]);
    switch_instance.$on("mouseup", ctx[15]);
    switch_instance.$on("keydown", ctx[16]);
    switch_instance.$on("keyup", ctx[17]);
    switch_instance.$on("focusin", ctx[18]);
    switch_instance.$on("focusout", ctx[19]);
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
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & 765 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 16 && { id: ctx2[4] },
        dirty & 229 && {
          class: classList([
            ctx2[2],
            "mdc-list",
            [ctx2[7], "mdc-list--dense"],
            [ctx2[0] === 2, "mdc-list--two-line"],
            [ctx2[0] === 3, "smui-list--three-line"],
            [ctx2[5] === "horizontal", "smui-list--horizontal"],
            [ctx2[6] === "textual", "mdc-list--textual-list"],
            [ctx2[6] === "avatar", "mdc-list--avatar-list"],
            [ctx2[6] === "icon", "mdc-list--icon-list"],
            [ctx2[6] === "image", "mdc-list--image-list"],
            [ctx2[6] === "thumbnail", "mdc-list--thumbnail-list"],
            [ctx2[6] === "video", "mdc-list--video-list"]
          ])
        },
        dirty & 8 && { style: ctx2[3] },
        dirty & 32 && {
          "aria-orientation": ctx2[5]
        },
        dirty & 512 && get_spread_object(ctx2[9])
      ]) : {};
      if (dirty & 1048576) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 2) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[1];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[8])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[13]);
          switch_instance.$on("mousedown", ctx2[14]);
          switch_instance.$on("mouseup", ctx2[15]);
          switch_instance.$on("keydown", ctx2[16]);
          switch_instance.$on("keyup", ctx2[17]);
          switch_instance.$on("focusin", ctx2[18]);
          switch_instance.$on("focusout", ctx2[19]);
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
function instance$c($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "orientation",
    "itemsStyle",
    "itemsRows",
    "dense",
    "density",
    "component"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { orientation = "vertical" } = $$props;
  let { itemsStyle = "textual" } = $$props;
  let { itemsRows = 1 } = $$props;
  let { dense = false } = $$props;
  let { density = 0 } = $$props;
  let { component = Ul } = $$props;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(1, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(2, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(3, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(4, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(1, dom = $$new_props.dom);
    if ("orientation" in $$new_props)
      $$invalidate(5, orientation = $$new_props.orientation);
    if ("itemsStyle" in $$new_props)
      $$invalidate(6, itemsStyle = $$new_props.itemsStyle);
    if ("itemsRows" in $$new_props)
      $$invalidate(0, itemsRows = $$new_props.itemsRows);
    if ("dense" in $$new_props)
      $$invalidate(7, dense = $$new_props.dense);
    if ("density" in $$new_props)
      $$invalidate(10, density = $$new_props.density);
    if ("component" in $$new_props)
      $$invalidate(8, component = $$new_props.component);
    if ("$$scope" in $$new_props)
      $$invalidate(20, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      if (itemsRows > 3) {
        $$invalidate(0, itemsRows = 3);
      } else if (itemsRows < 1) {
        $$invalidate(0, itemsRows = 1);
      }
    }
    if ($$self.$$.dirty & 1025) {
      if (itemsRows === 1) {
        if (density > 0)
          $$invalidate(10, density = 0);
        else if (density < -4)
          $$invalidate(10, density = -4);
      } else {
        $$invalidate(10, density = 0);
      }
    }
  };
  return [
    itemsRows,
    dom,
    className,
    style,
    id,
    orientation,
    itemsStyle,
    dense,
    component,
    $$restProps,
    density,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class List extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, not_equal, {
      class: 2,
      style: 3,
      id: 4,
      dom: 1,
      orientation: 5,
      itemsStyle: 6,
      itemsRows: 0,
      dense: 7,
      density: 10,
      component: 8
    });
  }
}
const get_default_slot_changes$4 = (dirty) => ({
  activated: dirty & 64,
  selected: dirty & 32,
  leadingClassName: dirty & 16777216,
  trailingClassName: dirty & 33554432
});
const get_default_slot_context$4 = (ctx) => ({
  activated: ctx[6],
  selected: ctx[5],
  leadingClassName: ctx[24],
  trailingClassName: ctx[25]
});
function create_default_slot_2(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[22], get_default_slot_context$4);
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
        if (default_slot.p && (!current || dirty & 54526048)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[22], !current ? -1 : dirty, get_default_slot_changes$4, get_default_slot_context$4);
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
function create_default_slot_1$2(ctx) {
  let itemcontent;
  let current;
  itemcontent = new ItemContent({
    props: {
      $$slots: {
        default: [
          create_default_slot_2,
          ({ leadingClassName, trailingClassName }) => ({
            24: leadingClassName,
            25: trailingClassName
          }),
          ({ leadingClassName, trailingClassName }) => (leadingClassName ? 16777216 : 0) | (trailingClassName ? 33554432 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(itemcontent.$$.fragment);
    },
    l(nodes) {
      claim_component(itemcontent.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(itemcontent, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const itemcontent_changes = {};
      if (dirty & 54526048) {
        itemcontent_changes.$$scope = { dirty, ctx: ctx2 };
      }
      itemcontent.$set(itemcontent_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(itemcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(itemcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(itemcontent, detaching);
    }
  };
}
function create_default_slot$6(ctx) {
  let switch_instance;
  let updating_dom;
  let switch_instance_anchor;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([
        ctx[1],
        "mdc-list-item",
        [ctx[8] === 1, "mdc-list-item--with-one-line"],
        [ctx[8] === 2, "mdc-list-item--with-two-lines"],
        [ctx[8] === 3, "mdc-list-item--with-three-lines"],
        [ctx[7], "mdc-list-item--disabled"],
        [ctx[5], "mdc-list-item--selected"],
        [ctx[6], "mdc-list-item--activated"],
        ctx[23]
      ])
    },
    { style: ctx[2] },
    ctx[10]
  ];
  function switch_instance_dom_binding(value) {
    ctx[12](value);
  }
  var switch_value = ctx[9];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot_1$2] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[13]);
    switch_instance.$on("mousedown", ctx[14]);
    switch_instance.$on("mouseup", ctx[15]);
    switch_instance.$on("keydown", ctx[16]);
    switch_instance.$on("keyup", ctx[17]);
    switch_instance.$on("focus", ctx[18]);
    switch_instance.$on("focusin", ctx[19]);
    switch_instance.$on("focusout", ctx[20]);
    switch_instance.$on("blur", ctx[21]);
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
      const switch_instance_changes = dirty & 8390126 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 8389090 && {
          class: classList([
            ctx2[1],
            "mdc-list-item",
            [ctx2[8] === 1, "mdc-list-item--with-one-line"],
            [ctx2[8] === 2, "mdc-list-item--with-two-lines"],
            [ctx2[8] === 3, "mdc-list-item--with-three-lines"],
            [ctx2[7], "mdc-list-item--disabled"],
            [ctx2[5], "mdc-list-item--selected"],
            [ctx2[6], "mdc-list-item--activated"],
            ctx2[23]
          ])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 1024 && get_spread_object(ctx2[10])
      ]) : {};
      if (dirty & 4194400) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[9])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[13]);
          switch_instance.$on("mousedown", ctx2[14]);
          switch_instance.$on("mouseup", ctx2[15]);
          switch_instance.$on("keydown", ctx2[16]);
          switch_instance.$on("keyup", ctx2[17]);
          switch_instance.$on("focus", ctx2[18]);
          switch_instance.$on("focusin", ctx2[19]);
          switch_instance.$on("focusout", ctx2[20]);
          switch_instance.$on("blur", ctx2[21]);
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
function create_fragment$b(ctx) {
  let ripple_1;
  let current;
  ripple_1 = new Ripple({
    props: {
      target: ctx[4] ? ctx[0] : void 0,
      $$slots: {
        default: [
          create_default_slot$6,
          ({ rippleClasses }) => ({ 23: rippleClasses }),
          ({ rippleClasses }) => rippleClasses ? 8388608 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(ripple_1.$$.fragment);
    },
    l(nodes) {
      claim_component(ripple_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(ripple_1, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const ripple_1_changes = {};
      if (dirty & 17)
        ripple_1_changes.target = ctx2[4] ? ctx2[0] : void 0;
      if (dirty & 12584943) {
        ripple_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ripple_1.$set(ripple_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(ripple_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(ripple_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(ripple_1, detaching);
    }
  };
}
function instance$b($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "selected",
    "activated",
    "disabled",
    "lines",
    "component"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { selected = false } = $$props;
  let { activated = false } = $$props;
  let { disabled = false } = $$props;
  let { lines = 1 } = $$props;
  let { component = Li } = $$props;
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("selected" in $$new_props)
      $$invalidate(5, selected = $$new_props.selected);
    if ("activated" in $$new_props)
      $$invalidate(6, activated = $$new_props.activated);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("lines" in $$new_props)
      $$invalidate(8, lines = $$new_props.lines);
    if ("component" in $$new_props)
      $$invalidate(9, component = $$new_props.component);
    if ("$$scope" in $$new_props)
      $$invalidate(22, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    selected,
    activated,
    disabled,
    lines,
    component,
    $$restProps,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    focusin_handler,
    focusout_handler,
    blur_handler,
    $$scope
  ];
}
class Item$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      selected: 5,
      activated: 6,
      disabled: 7,
      lines: 8,
      component: 9
    });
  }
}
const get_default_slot_changes$3 = (dirty) => ({});
const get_default_slot_context$3 = (ctx) => ({
  leadingClassName: "mdc-list-item__startc",
  trailingClassName: "mdc-list-item__end"
});
function create_fragment$a(ctx) {
  let span;
  let t;
  let current;
  const default_slot_template = ctx[1].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[0], get_default_slot_context$3);
  return {
    c() {
      span = element("span");
      t = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { class: true });
      children(span).forEach(detach);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
      this.h();
    },
    h() {
      attr(span, "class", "mdc-list-item__ripple");
    },
    m(target, anchor) {
      insert(target, span, anchor);
      insert(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[0], !current ? -1 : dirty, get_default_slot_changes$3, get_default_slot_context$3);
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
        detach(span);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(0, $$scope = $$props2.$$scope);
  };
  return [$$scope, slots];
}
class ItemContent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, not_equal, {});
  }
}
var ListStyles_svelte_svelte_type_style_lang = '.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list-item__secondary-text{color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic{background-color:transparent}.mdc-deprecated-list-item__graphic{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__text{opacity:0.38}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__text,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__secondary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item--selected,.mdc-deprecated-list-item--activated{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:0.812rem}.mdc-deprecated-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-deprecated-list-item:focus{outline:none}.mdc-deprecated-list-item:not(.mdc-deprecated-list-item--selected):focus::before,.mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}.mdc-deprecated-list-item.mdc-deprecated-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:"";pointer-events:none}[dir=rtl] .mdc-deprecated-list-item,.mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-item,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-item,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-item,.mdc-deprecated-list--image-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-item,.mdc-deprecated-list--video-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-deprecated-list-item__graphic,.mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list .mdc-deprecated-list-item__graphic{display:inline-flex}.mdc-deprecated-list-item__meta{margin-left:auto;margin-right:0}.mdc-deprecated-list-item__meta:not(.material-icons){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-deprecated-list-item[dir=rtl] .mdc-deprecated-list-item__meta,[dir=rtl] .mdc-deprecated-list-item .mdc-deprecated-list-item__meta{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}.mdc-deprecated-list--dense .mdc-deprecated-list-item{height:40px}.mdc-deprecated-list--two-line .mdc-deprecated-list-item__text{align-self:flex-start}.mdc-deprecated-list--two-line .mdc-deprecated-list-item{height:64px}.mdc-deprecated-list--two-line.mdc-deprecated-list--video-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--image-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--icon-list .mdc-deprecated-list-item{height:72px}.mdc-deprecated-list--two-line.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense .mdc-deprecated-list-item,.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item{height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item{cursor:pointer}a.mdc-deprecated-list-item{color:inherit;text-decoration:none}.mdc-deprecated-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-deprecated-list-divider{border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list-divider--padded,.mdc-deprecated-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list-divider--inset,.mdc-deprecated-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded,.mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-deprecated-list-group .mdc-deprecated-list{padding:0}.mdc-deprecated-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-item__primary-text{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-list-item__secondary-text{color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-trailing-icon .mdc-list-item__end{background-color:transparent}.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:0.38}.mdc-list-item--disabled .mdc-list-item__primary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled .mdc-list-item__secondary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--selected .mdc-list-item__primary-text,.mdc-list-item--activated .mdc-list-item__primary-text{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-list-item--selected.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--activated.mdc-list-item--with-leading-icon .mdc-list-item__start{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}@media screen and (-ms-high-contrast: active){.mdc-list-divider::after{content:"";display:block;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:white}}.mdc-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{background-color:rgba(0, 0, 0, 0.12)}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--unbounded .mdc-deprecated-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-activation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-deprecated-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-deprecated-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-list-item--disabled).mdc-list-item:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-list-item--disabled).mdc-list-item--activated:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-list-item--disabled).mdc-list-item--selected:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-list-item--disabled .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-list-item--disabled .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-list-item--disabled .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.smui-list--horizontal{display:flex;flex-direction:row;padding:0}.smui-list--horizontal .mdc-list-divider{border-bottom:none;border-left-color:rgba(0, 0, 0, 0.12);border-left-width:1px;border-left-style:solid;height:auto}.mdc-list-item__meta.smui-list__trailing-icon{width:24px;height:24px;flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover}';
const [createListContext, getListContext] = createContextWritableStore();
function create_fragment$9(ctx) {
  let span;
  let span_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let span_levels = [
    { id: ctx[3] },
    {
      class: span_class_value = classList([ctx[1], "mdc-list-item__content"])
    },
    { style: ctx[2] },
    ctx[4]
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { id: true, class: true, style: true });
      var span_nodes = children(span);
      if (default_slot)
        default_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if (default_slot) {
        default_slot.m(span, null);
      }
      ctx[7](span);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2 && span_class_value !== (span_class_value = classList([ctx2[1], "mdc-list-item__content"]))) && { class: span_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(span);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, span_binding];
}
class Content extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
function create_fragment$8(ctx) {
  let span;
  let span_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  let span_levels = [
    { id: ctx[3] },
    {
      class: span_class_value = classList([ctx[1], "mdc-list-item__primary-text"])
    },
    { style: ctx[2] },
    ctx[4]
  ];
  let span_data = {};
  for (let i = 0; i < span_levels.length; i += 1) {
    span_data = assign(span_data, span_levels[i]);
  }
  return {
    c() {
      span = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", { id: true, class: true, style: true });
      var span_nodes = children(span);
      if (default_slot)
        default_slot.l(span_nodes);
      span_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(span, span_data);
    },
    m(target, anchor) {
      insert(target, span, anchor);
      if (default_slot) {
        default_slot.m(span, null);
      }
      ctx[7](span);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      set_attributes(span, span_data = get_spread_update(span_levels, [
        (!current || dirty & 8) && { id: ctx2[3] },
        (!current || dirty & 2 && span_class_value !== (span_class_value = classList([ctx2[1], "mdc-list-item__primary-text"]))) && { class: span_class_value },
        (!current || dirty & 4) && { style: ctx2[2] },
        dirty & 16 && ctx2[4]
      ]));
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
        detach(span);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("$$scope" in $$new_props)
      $$invalidate(5, $$scope = $$new_props.$$scope);
  };
  return [dom, className, style, id, $$restProps, $$scope, slots, span_binding];
}
class PrimaryText extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, not_equal, { class: 1, style: 2, id: 3, dom: 0 });
  }
}
createContextWritableStore();
var FormField_svelte_svelte_type_style_lang = ".smui-form-field--vertical.svelte-1kyw10c.svelte-1kyw10c{display:flex;flex-direction:column}.smui-form-field--vertical.mdc-form-field--align-end.svelte-1kyw10c>label.svelte-1kyw10c{margin-left:0;margin-right:auto}";
var FormFieldStyles_svelte_svelte_type_style_lang = ".mdc-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}";
createContextWritableStore();
var CheckboxStyles_svelte_svelte_type_style_lang = '.mdc-checkbox{padding:calc((40px - 18px) / 2);padding:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);margin:calc((40px - 40px) / 2);margin:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-ripple-size, 40px)) / 2)}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-checkbox:hover .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#676778;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #676778))}.mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-surface--hover .mdc-checkbox__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after{transition:opacity 150ms linear}.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after{background-color:#676778;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #676778))}.mdc-checkbox .mdc-checkbox__background{top:calc((40px - 18px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2);left:calc((40px - 18px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - 18px) / 2)}.mdc-checkbox .mdc-checkbox__native-control{top:calc((40px - 40px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-ripple-size, 40px)) / 2);right:calc((40px - 40px) / 2);right:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-ripple-size, 40px)) / 2);left:calc((40px - 40px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-ripple-size, 40px)) / 2);width:40px;width:var(--mdc-checkbox-ripple-size, 40px);height:40px;height:var(--mdc-checkbox-ripple-size, 40px)}.mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:#676778;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778));background-color:#676778;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778))}@keyframes mdc-checkbox-fade-in-background-8A000000FF67677800000000FF676778{0%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}50%{border-color:#676778;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778));background-color:#676778;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778))}}@keyframes mdc-checkbox-fade-out-background-8A000000FF67677800000000FF676778{0%,80%{border-color:#676778;border-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778));background-color:#676778;background-color:var(--mdc-checkbox-checked-color, var(--mdc-theme-secondary, #676778))}100%{border-color:rgba(0, 0, 0, 0.54);border-color:var(--mdc-checkbox-unchecked-color, rgba(0, 0, 0, 0.54));background-color:transparent}}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FF67677800000000FF676778}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FF67677800000000FF676778}.mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:rgba(0, 0, 0, 0.38);border-color:var(--mdc-checkbox-disabled-color, rgba(0, 0, 0, 0.38));background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:rgba(0, 0, 0, 0.38);background-color:var(--mdc-checkbox-disabled-color, rgba(0, 0, 0, 0.38))}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:#fff;color:var(--mdc-checkbox-ink-color, #fff)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:#fff;border-color:var(--mdc-checkbox-ink-color, #fff)}.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}@media screen and (-ms-high-contrast: active){.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:GrayText;border-color:var(--mdc-checkbox-disabled-color, GrayText);background-color:transparent}.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:GrayText;background-color:transparent;background-color:var(--mdc-checkbox-disabled-color, transparent)}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:GrayText;color:var(--mdc-checkbox-ink-color, GrayText)}.mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:GrayText;border-color:var(--mdc-checkbox-ink-color, GrayText)}.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:transparent;pointer-events:none;will-change:background-color, border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin:calc((48px - 40px) / 2);margin:calc((var(--mdc-checkbox-touch-target-size, 48px) - var(--mdc-checkbox-ripple-size, 40px)) / 2)}.mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((40px - 48px) / 2);top:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-touch-target-size, 48px)) / 2);right:calc((40px - 48px) / 2);right:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-touch-target-size, 48px)) / 2);left:calc((40px - 48px) / 2);left:calc((var(--mdc-checkbox-ripple-size, 40px) - var(--mdc-checkbox-touch-target-size, 48px)) / 2);width:48px;width:var(--mdc-checkbox-touch-target-size, 48px);height:48px;height:var(--mdc-checkbox-touch-target-size, 48px)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-checkbox{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-checkbox .mdc-checkbox__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-checkbox .mdc-checkbox__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-checkbox.mdc-ripple-upgraded--unbounded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-checkbox.mdc-ripple-upgraded--foreground-activation .mdc-checkbox__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation .mdc-checkbox__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before,.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-checkbox{z-index:0}.mdc-checkbox .mdc-checkbox__ripple::before,.mdc-checkbox .mdc-checkbox__ripple::after{z-index:-1;z-index:var(--mdc-ripple-z-index, -1)}.mdc-checkbox__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}';
const [setItemContext, getItemContext] = createContextWritableStore();
createContextWritableStore();
var RadioStyles_svelte_svelte_type_style_lang = '.mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:10px;display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity, transform, border-color, color}.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54)}.mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#676778;border-color:var(--mdc-theme-secondary, #676778)}.mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#676778;border-color:var(--mdc-theme-secondary, #676778)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio .mdc-radio__background::before{background-color:#676778;background-color:var(--mdc-theme-secondary, #676778)}.mdc-radio .mdc-radio__background::before{top:-10px;left:-10px;width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:0px;right:0px;left:0px;width:40px;height:40px}@media screen and (-ms-high-contrast: active){.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:GrayText}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:GrayText}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:GrayText}}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1), transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1), border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:-4px;right:-4px;left:-4px;width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1), border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1), border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:0.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1), transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-radio{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-radio .mdc-radio__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-radio .mdc-radio__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-radio.mdc-ripple-upgraded--unbounded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-radio.mdc-ripple-upgraded--foreground-activation .mdc-radio__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-radio.mdc-ripple-upgraded--foreground-deactivation .mdc-radio__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{top:calc(50% - 50%);left:calc(50% - 50%);width:100%;height:100%}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before,.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{top:var(--mdc-ripple-top, calc(50% - 50%));left:var(--mdc-ripple-left, calc(50% - 50%));width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-radio .mdc-radio__ripple::before,.mdc-radio .mdc-radio__ripple::after{background-color:#676778;background-color:var(--mdc-ripple-color, var(--mdc-theme-secondary, #676778))}.mdc-radio:hover .mdc-radio__ripple::before,.mdc-radio.mdc-ripple-surface--hover .mdc-radio__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__ripple::before,.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-radio:not(.mdc-ripple-upgraded) .mdc-radio__ripple::after{transition:opacity 150ms linear}.mdc-radio:not(.mdc-ripple-upgraded):active .mdc-radio__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-radio.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-radio.mdc-ripple-upgraded .mdc-radio__background::before,.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__background::before{content:none}.mdc-radio__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}';
function create_default_slot_1$1(ctx) {
  let current;
  const default_slot_template = ctx[21].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[32], null);
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
        if (default_slot.p && (!current || dirty[1] & 2)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[32], !current ? [-1, -1] : dirty, null, null);
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
function create_default_slot$5(ctx) {
  let list_1;
  let updating_dom;
  let current;
  const list_1_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { orientation: ctx[4] },
    { itemsStyle: ctx[5] },
    { itemsRows: ctx[6] },
    { dense: ctx[7] },
    {
      "aria-orientation": ctx[4]
    },
    { component: ctx[8] },
    ctx[13]
  ];
  function list_1_dom_binding(value) {
    ctx[22](value);
  }
  let list_1_props = {
    $$slots: { default: [create_default_slot_1$1] },
    $$scope: { ctx }
  };
  for (let i = 0; i < list_1_spread_levels.length; i += 1) {
    list_1_props = assign(list_1_props, list_1_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    list_1_props.dom = ctx[0];
  }
  list_1 = new List({ props: list_1_props });
  binding_callbacks.push(() => bind(list_1, "dom", list_1_dom_binding));
  list_1.$on("click", ctx[23]);
  list_1.$on("mousedown", ctx[24]);
  list_1.$on("mouseup", ctx[25]);
  list_1.$on("keydown", ctx[26]);
  list_1.$on("keyup", ctx[27]);
  list_1.$on("focusin", ctx[28]);
  list_1.$on("focusout", ctx[29]);
  return {
    c() {
      create_component(list_1.$$.fragment);
    },
    l(nodes) {
      claim_component(list_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(list_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const list_1_changes = dirty[0] & 8702 ? get_spread_update(list_1_spread_levels, [
        dirty[0] & 8 && { id: ctx2[3] },
        dirty[0] & 2 && { class: ctx2[1] },
        dirty[0] & 4 && { style: ctx2[2] },
        dirty[0] & 16 && { orientation: ctx2[4] },
        dirty[0] & 32 && { itemsStyle: ctx2[5] },
        dirty[0] & 64 && { itemsRows: ctx2[6] },
        dirty[0] & 128 && { dense: ctx2[7] },
        dirty[0] & 16 && {
          "aria-orientation": ctx2[4]
        },
        dirty[0] & 256 && { component: ctx2[8] },
        dirty[0] & 8192 && get_spread_object(ctx2[13])
      ]) : {};
      if (dirty[1] & 2) {
        list_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty[0] & 1) {
        updating_dom = true;
        list_1_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      list_1.$set(list_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(list_1, detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let usestate;
  let t;
  let group_1;
  let current;
  usestate = new UseState({
    props: {
      value: ctx[0],
      onUpdate: ctx[11]
    }
  });
  let group_1_props = {
    $$slots: { default: [create_default_slot$5] },
    $$scope: { ctx }
  };
  group_1 = new Group({ props: group_1_props });
  ctx[30](group_1);
  group_1.$on("optionsChange", ctx[31]);
  return {
    c() {
      create_component(usestate.$$.fragment);
      t = space();
      create_component(group_1.$$.fragment);
    },
    l(nodes) {
      claim_component(usestate.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(group_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(usestate, target, anchor);
      insert(target, t, anchor);
      mount_component(group_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const usestate_changes = {};
      if (dirty[0] & 1)
        usestate_changes.value = ctx2[0];
      usestate.$set(usestate_changes);
      const group_1_changes = {};
      if (dirty[0] & 8703 | dirty[1] & 2) {
        group_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      group_1.$set(group_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(usestate.$$.fragment, local);
      transition_in(group_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(usestate.$$.fragment, local);
      transition_out(group_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(usestate, detaching);
      if (detaching)
        detach(t);
      ctx[30](null);
      destroy_component(group_1, detaching);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "orientation",
    "itemsStyle",
    "itemsRows",
    "dense",
    "wrapFocus",
    "typeahead",
    "group",
    "selectionType",
    "disableMDCInstance",
    "component"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $context$;
  let { $$slots: slots = {}, $$scope } = $$props;
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
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
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { orientation = "vertical" } = $$props;
  let { itemsStyle = "textual" } = $$props;
  let { itemsRows = 1 } = $$props;
  let { dense = false } = $$props;
  let { wrapFocus = false } = $$props;
  let { typeahead = false } = $$props;
  let { group = void 0 } = $$props;
  let { selectionType = void 0 } = $$props;
  let { disableMDCInstance = false } = $$props;
  let { component = void 0 } = $$props;
  const dispatch2 = createEventDispatcher();
  let list;
  let listGroup;
  let treeObserver;
  const context$ = createListContext({
    listSelectionGroup: group,
    selectionType,
    itemsRows,
    reinitialize() {
      initialize();
    }
  });
  component_subscribe($$self, context$, (value) => $$invalidate(20, $context$ = value));
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    set_store_value(context$, $context$ = Object.assign(Object.assign({}, $context$), { listGroup: listGroup.getBindings() }), $context$);
    let treeObserverDebounce;
    treeObserver = new MutationObserver(() => {
      clearTimeout(treeObserverDebounce);
      treeObserverDebounce = setTimeout(() => {
        list === null || list === void 0 ? void 0 : list.layout();
      });
    });
    initTreeObserver();
    yield tick();
    initialize();
  }));
  onDestroy(() => {
    treeObserver === null || treeObserver === void 0 ? void 0 : treeObserver.disconnect();
    list === null || list === void 0 ? void 0 : list.destroy();
  });
  afterUpdate(() => {
    fixItemsTabIndex();
  });
  function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!disableMDCInstance) {
        list === null || list === void 0 ? void 0 : list.destroy();
        $$invalidate(19, list = new MDCList(dom));
        list.listen("MDCList:action", handleAction);
      }
    });
  }
  function getItems() {
    return listGroup === null || listGroup === void 0 ? void 0 : listGroup.getItems().map((item) => item.externalContext);
  }
  function fixItemsTabIndex() {
    const items = getItems();
    if (items === null || items === void 0 ? void 0 : items.length) {
      if (!items.some((item) => !item.disabled && item.dom.tabIndex === 0)) {
        const firstEnabledItem = items.find((item) => !(item === null || item === void 0 ? void 0 : item.disabled));
        if (firstEnabledItem) {
          firstEnabledItem.dom.tabIndex = 0;
        }
        items.forEach((item) => {
          if (item !== firstEnabledItem) {
            item.dom.tabIndex = -1;
          }
        });
      }
    }
  }
  function handleAction(event) {
    return __awaiter(this, void 0, void 0, function* () {
      const selectedItem = listGroup.getItems()[event.detail.index];
      dispatch2("action", {
        dom,
        itemIndex: event.detail.index,
        itemDom: selectedItem.dom,
        value: selectedItem.externalContext.value
      });
    });
  }
  function initTreeObserver() {
    treeObserver.disconnect();
    treeObserver.observe(dom, { childList: true, subtree: true });
  }
  function handleOptionsChange(event) {
    fixItemsTabIndex();
    $$invalidate(19, list.hasTypeahead = typeahead, list);
    dispatch2("optionsChange", { dom, items: event.items.map((i) => i.dom) });
  }
  function list_1_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function group_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      listGroup = $$value;
      $$invalidate(9, listGroup);
    });
  }
  const optionsChange_handler = (e) => handleOptionsChange(e.detail);
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(13, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("orientation" in $$new_props)
      $$invalidate(4, orientation = $$new_props.orientation);
    if ("itemsStyle" in $$new_props)
      $$invalidate(5, itemsStyle = $$new_props.itemsStyle);
    if ("itemsRows" in $$new_props)
      $$invalidate(6, itemsRows = $$new_props.itemsRows);
    if ("dense" in $$new_props)
      $$invalidate(7, dense = $$new_props.dense);
    if ("wrapFocus" in $$new_props)
      $$invalidate(14, wrapFocus = $$new_props.wrapFocus);
    if ("typeahead" in $$new_props)
      $$invalidate(15, typeahead = $$new_props.typeahead);
    if ("group" in $$new_props)
      $$invalidate(16, group = $$new_props.group);
    if ("selectionType" in $$new_props)
      $$invalidate(17, selectionType = $$new_props.selectionType);
    if ("disableMDCInstance" in $$new_props)
      $$invalidate(18, disableMDCInstance = $$new_props.disableMDCInstance);
    if ("component" in $$new_props)
      $$invalidate(8, component = $$new_props.component);
    if ("$$scope" in $$new_props)
      $$invalidate(32, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 573456) {
      if (list) {
        if (orientation === "vertical" && (!list.vertical == null || list.vertical === false)) {
          $$invalidate(19, list.vertical = true, list);
        } else if (orientation === "horizontal" && (list.vertical == null || list.vertical === true)) {
          $$invalidate(19, list.vertical = false, list);
        }
        if (list.wrapFocus !== wrapFocus) {
          $$invalidate(19, list.wrapFocus = wrapFocus, list);
        }
        if (list.hasTypeahead !== typeahead) {
          $$invalidate(19, list.hasTypeahead = typeahead, list);
        }
      }
    }
    if ($$self.$$.dirty[0] & 1704001) {
      set_store_value(context$, $context$ = Object.assign(Object.assign({}, $context$), { dom, list, selectionType, itemsRows }), $context$);
    }
  };
  return [
    dom,
    className,
    style,
    id,
    orientation,
    itemsStyle,
    itemsRows,
    dense,
    component,
    listGroup,
    context$,
    initTreeObserver,
    handleOptionsChange,
    $$restProps,
    wrapFocus,
    typeahead,
    group,
    selectionType,
    disableMDCInstance,
    list,
    $context$,
    slots,
    list_1_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    group_1_binding,
    optionsChange_handler,
    $$scope
  ];
}
class List_1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      orientation: 4,
      itemsStyle: 5,
      itemsRows: 6,
      dense: 7,
      wrapFocus: 14,
      typeahead: 15,
      group: 16,
      selectionType: 17,
      disableMDCInstance: 18,
      component: 8
    }, [-1, -1]);
  }
}
const get_default_slot_changes$2 = (dirty) => ({
  activated: dirty & 64,
  selected: dirty & 32,
  leadingClassName: dirty & 16777216,
  trailingClassName: dirty & 33554432
});
const get_default_slot_context$2 = (ctx) => ({
  activated: ctx[6],
  selected: ctx[5],
  leadingClassName: ctx[24],
  trailingClassName: ctx[25]
});
function create_default_slot$4(ctx) {
  let current;
  const default_slot_template = ctx[12].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[23], get_default_slot_context$2);
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
        if (default_slot.p && (!current || dirty & 58720352)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[23], !current ? -1 : dirty, get_default_slot_changes$2, get_default_slot_context$2);
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
function create_fragment$6(ctx) {
  let li;
  let itemimpl;
  let current;
  const itemimpl_spread_levels = [
    { class: ctx[1] },
    { style: ctx[2] },
    { selected: ctx[5] },
    { activated: ctx[6] },
    { ripple: ctx[4] },
    { disabled: ctx[7] },
    { value: ctx[8] },
    { href: ctx[9] },
    { lines: ctx[10] },
    ctx[11]
  ];
  let itemimpl_props = {
    $$slots: {
      default: [
        create_default_slot$4,
        ({ leadingClassName, trailingClassName }) => ({
          24: leadingClassName,
          25: trailingClassName
        }),
        ({ leadingClassName, trailingClassName }) => (leadingClassName ? 16777216 : 0) | (trailingClassName ? 33554432 : 0)
      ]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < itemimpl_spread_levels.length; i += 1) {
    itemimpl_props = assign(itemimpl_props, itemimpl_spread_levels[i]);
  }
  itemimpl = new ItemImpl({ props: itemimpl_props });
  itemimpl.$on("click", ctx[13]);
  itemimpl.$on("mousedown", ctx[14]);
  itemimpl.$on("mouseup", ctx[15]);
  itemimpl.$on("keydown", ctx[16]);
  itemimpl.$on("keyup", ctx[17]);
  itemimpl.$on("focus", ctx[18]);
  itemimpl.$on("focusin", ctx[19]);
  itemimpl.$on("focusout", ctx[20]);
  itemimpl.$on("blur", ctx[21]);
  return {
    c() {
      li = element("li");
      create_component(itemimpl.$$.fragment);
      this.h();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", { id: true });
      var li_nodes = children(li);
      claim_component(itemimpl.$$.fragment, li_nodes);
      li_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(li, "id", ctx[3]);
    },
    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(itemimpl, li, null);
      ctx[22](li);
      current = true;
    },
    p(ctx2, [dirty]) {
      const itemimpl_changes = dirty & 4086 ? get_spread_update(itemimpl_spread_levels, [
        dirty & 2 && { class: ctx2[1] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 32 && { selected: ctx2[5] },
        dirty & 64 && { activated: ctx2[6] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 128 && { disabled: ctx2[7] },
        dirty & 256 && { value: ctx2[8] },
        dirty & 512 && { href: ctx2[9] },
        dirty & 1024 && { lines: ctx2[10] },
        dirty & 2048 && get_spread_object(ctx2[11])
      ]) : {};
      if (dirty & 58720352) {
        itemimpl_changes.$$scope = { dirty, ctx: ctx2 };
      }
      itemimpl.$set(itemimpl_changes);
      if (!current || dirty & 8) {
        attr(li, "id", ctx2[3]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(itemimpl.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(itemimpl.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(li);
      destroy_component(itemimpl);
      ctx[22](null);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "selected",
    "activated",
    "disabled",
    "value",
    "href",
    "lines"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { selected = false } = $$props;
  let { activated = false } = $$props;
  let { disabled = false } = $$props;
  let { value = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { lines = void 0 } = $$props;
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("selected" in $$new_props)
      $$invalidate(5, selected = $$new_props.selected);
    if ("activated" in $$new_props)
      $$invalidate(6, activated = $$new_props.activated);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("value" in $$new_props)
      $$invalidate(8, value = $$new_props.value);
    if ("href" in $$new_props)
      $$invalidate(9, href = $$new_props.href);
    if ("lines" in $$new_props)
      $$invalidate(10, lines = $$new_props.lines);
    if ("$$scope" in $$new_props)
      $$invalidate(23, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    selected,
    activated,
    disabled,
    value,
    href,
    lines,
    $$restProps,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    focusin_handler,
    focusout_handler,
    blur_handler,
    li_binding,
    $$scope
  ];
}
class Item extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      selected: 5,
      activated: 6,
      disabled: 7,
      value: 8,
      href: 9,
      lines: 10
    });
  }
}
const get_default_slot_changes$1 = (dirty) => ({
  leadingClassName: dirty[1] & 8,
  trailingClassName: dirty[1] & 16
});
const get_default_slot_context$1 = (ctx) => ({
  leadingClassName: ctx[34],
  trailingClassName: ctx[35]
});
function create_if_block$1(ctx) {
  let hiddeninput;
  let current;
  hiddeninput = new HiddenInput({ props: { selected: ctx[5] } });
  return {
    c() {
      create_component(hiddeninput.$$.fragment);
    },
    l(nodes) {
      claim_component(hiddeninput.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(hiddeninput, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hiddeninput_changes = {};
      if (dirty[0] & 32)
        hiddeninput_changes.selected = ctx2[5];
      hiddeninput.$set(hiddeninput_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hiddeninput.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hiddeninput.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hiddeninput, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  let current;
  let if_block = ctx[11] && create_if_block$1(ctx);
  const default_slot_template = ctx[19].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[31], get_default_slot_context$1);
  return {
    c() {
      if (if_block)
        if_block.c();
      t = space();
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      t = claim_space(nodes);
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t, anchor);
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[11]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 2048) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
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
      if (default_slot) {
        if (default_slot.p && (!current || dirty[1] & 25)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[31], !current ? [-1, -1] : dirty, get_default_slot_changes$1, get_default_slot_context$1);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_default_slot$3(ctx) {
  let item;
  let updating_dom;
  let current;
  const item_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { selected: ctx[5] },
    { activated: ctx[6] },
    { ripple: ctx[4] },
    { disabled: ctx[7] },
    { href: ctx[9] },
    {
      lines: ctx[10] || ctx[13].itemsRows
    },
    { component: ctx[9] ? A : Div },
    { "data-value": ctx[8] },
    { "aria-selected": ctx[5] },
    { "aria-checked": ctx[12] },
    { "aria-disabled": ctx[7] },
    ctx[17]
  ];
  function item_dom_binding(value) {
    ctx[21](value);
  }
  let item_props = {
    $$slots: {
      default: [
        create_default_slot_1,
        ({ leadingClassName, trailingClassName }) => ({
          34: leadingClassName,
          35: trailingClassName
        }),
        ({ leadingClassName, trailingClassName }) => [0, (leadingClassName ? 8 : 0) | (trailingClassName ? 16 : 0)]
      ]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < item_spread_levels.length; i += 1) {
    item_props = assign(item_props, item_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    item_props.dom = ctx[0];
  }
  item = new Item$1({ props: item_props });
  binding_callbacks.push(() => bind(item, "dom", item_dom_binding));
  item.$on("click", ctx[22]);
  item.$on("mousedown", ctx[23]);
  item.$on("mouseup", ctx[24]);
  item.$on("keydown", ctx[25]);
  item.$on("keyup", ctx[26]);
  item.$on("focus", ctx[27]);
  item.$on("focusin", ctx[28]);
  item.$on("focusout", ctx[29]);
  item.$on("blur", ctx[30]);
  return {
    c() {
      create_component(item.$$.fragment);
    },
    l(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const item_changes = dirty[0] & 145406 ? get_spread_update(item_spread_levels, [
        dirty[0] & 8 && { id: ctx2[3] },
        dirty[0] & 2 && { class: ctx2[1] },
        dirty[0] & 4 && { style: ctx2[2] },
        dirty[0] & 32 && { selected: ctx2[5] },
        dirty[0] & 64 && { activated: ctx2[6] },
        dirty[0] & 16 && { ripple: ctx2[4] },
        dirty[0] & 128 && { disabled: ctx2[7] },
        dirty[0] & 512 && { href: ctx2[9] },
        dirty[0] & 9216 && {
          lines: ctx2[10] || ctx2[13].itemsRows
        },
        dirty[0] & 512 && { component: ctx2[9] ? A : Div },
        dirty[0] & 256 && { "data-value": ctx2[8] },
        dirty[0] & 32 && { "aria-selected": ctx2[5] },
        dirty[0] & 4096 && { "aria-checked": ctx2[12] },
        dirty[0] & 128 && { "aria-disabled": ctx2[7] },
        dirty[0] & 131072 && get_spread_object(ctx2[17])
      ]) : {};
      if (dirty[0] & 2080 | dirty[1] & 25) {
        item_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty[0] & 1) {
        updating_dom = true;
        item_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      item.$set(item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(item, detaching);
    }
  };
}
function create_fragment$5(ctx) {
  let usestate;
  let t;
  let groupitem;
  let current;
  usestate = new UseState({
    props: {
      value: ctx[4],
      onUpdate: ctx[20]
    }
  });
  groupitem = new GroupItem({
    props: {
      dom: ctx[0],
      group: ctx[13].listGroup,
      context: ctx[16],
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(usestate.$$.fragment);
      t = space();
      create_component(groupitem.$$.fragment);
    },
    l(nodes) {
      claim_component(usestate.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(groupitem.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(usestate, target, anchor);
      insert(target, t, anchor);
      mount_component(groupitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const usestate_changes = {};
      if (dirty[0] & 16)
        usestate_changes.value = ctx2[4];
      if (dirty[0] & 8192)
        usestate_changes.onUpdate = ctx2[20];
      usestate.$set(usestate_changes);
      const groupitem_changes = {};
      if (dirty[0] & 1)
        groupitem_changes.dom = ctx2[0];
      if (dirty[0] & 8192)
        groupitem_changes.group = ctx2[13].listGroup;
      if (dirty[0] & 147455 | dirty[1] & 1) {
        groupitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      groupitem.$set(groupitem_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(usestate.$$.fragment, local);
      transition_in(groupitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(usestate.$$.fragment, local);
      transition_out(groupitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(usestate, detaching);
      if (detaching)
        detach(t);
      destroy_component(groupitem, detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let checked;
  const omit_props_names = [
    "class",
    "style",
    "id",
    "dom",
    "ripple",
    "selected",
    "activated",
    "disabled",
    "value",
    "href",
    "lines"
  ];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $context$;
  let $listContext$;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { selected = false } = $$props;
  let { activated = false } = $$props;
  let { disabled = false } = $$props;
  let { value = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { lines = void 0 } = $$props;
  const listContext$ = getListContext();
  component_subscribe($$self, listContext$, (value2) => $$invalidate(13, $listContext$ = value2));
  let useHiddenInputs = false;
  const context$ = setItemContext({ disabled, selected, value });
  component_subscribe($$self, context$, (value2) => $$invalidate(18, $context$ = value2));
  const context = $context$;
  onMount(() => {
    if ($listContext$.selectionType) {
      $$invalidate(11, useHiddenInputs = true);
    }
  });
  function hasCheckbox() {
    return !!dom.querySelector("input[type=checkbox]");
  }
  function hasRadio() {
    return !!dom.querySelector("input[type=radio]");
  }
  const func = () => $listContext$.reinitialize();
  function item_dom_binding(value2) {
    dom = value2;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(17, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("selected" in $$new_props)
      $$invalidate(5, selected = $$new_props.selected);
    if ("activated" in $$new_props)
      $$invalidate(6, activated = $$new_props.activated);
    if ("disabled" in $$new_props)
      $$invalidate(7, disabled = $$new_props.disabled);
    if ("value" in $$new_props)
      $$invalidate(8, value = $$new_props.value);
    if ("href" in $$new_props)
      $$invalidate(9, href = $$new_props.href);
    if ("lines" in $$new_props)
      $$invalidate(10, lines = $$new_props.lines);
    if ("$$scope" in $$new_props)
      $$invalidate(31, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 33) {
      $$invalidate(12, checked = dom && selected && (hasCheckbox() || hasRadio()));
    }
    if ($$self.$$.dirty[0] & 262561) {
      set_store_value(context$, $context$ = Object.assign({}, Object.assign(context, Object.assign(Object.assign({}, $context$), { disabled, selected, value, dom }))), $context$);
    }
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    selected,
    activated,
    disabled,
    value,
    href,
    lines,
    useHiddenInputs,
    checked,
    $listContext$,
    listContext$,
    context$,
    context,
    $$restProps,
    $context$,
    slots,
    func,
    item_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    focusin_handler,
    focusout_handler,
    blur_handler,
    $$scope
  ];
}
class ItemImpl extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      selected: 5,
      activated: 6,
      disabled: 7,
      value: 8,
      href: 9,
      lines: 10
    }, [-1, -1]);
  }
}
function create_fragment$4(ctx) {
  let input;
  return {
    c() {
      input = element("input");
      this.h();
    },
    l(nodes) {
      input = claim_element(nodes, "INPUT", { style: true, type: true });
      this.h();
    },
    h() {
      set_style(input, "display", "none");
      attr(input, "type", "checkbox");
      input.checked = ctx[0];
    },
    m(target, anchor) {
      insert(target, input, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        input.checked = ctx2[0];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(input);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { selected } = $$props;
  $$self.$$set = ($$props2) => {
    if ("selected" in $$props2)
      $$invalidate(0, selected = $$props2.selected);
  };
  return [selected];
}
class HiddenInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { selected: 0 });
  }
}
var NavList_svelte_svelte_type_style_lang = '.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list-item__secondary-text{color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic{background-color:transparent}.mdc-deprecated-list-item__graphic{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__text{opacity:0.38}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__text,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__secondary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item--selected,.mdc-deprecated-list-item--activated{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:0.812rem}.mdc-deprecated-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;height:48px}.mdc-deprecated-list-item:focus{outline:none}.mdc-deprecated-list-item:not(.mdc-deprecated-list-item--selected):focus::before,.mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}.mdc-deprecated-list-item.mdc-deprecated-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:"";pointer-events:none}[dir=rtl] .mdc-deprecated-list-item,.mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-item,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-item,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:56px}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-item{padding-left:16px;padding-right:16px;height:72px}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-item,.mdc-deprecated-list--image-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item{padding-left:0px;padding-right:16px;height:72px}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-item,.mdc-deprecated-list--video-list .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:0px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:20px;height:20px}[dir=rtl] .mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;object-fit:cover;margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-deprecated-list-item__graphic,.mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:32px;margin-right:0}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:56px;height:56px}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:100px;height:56px}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--video-list .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}.mdc-deprecated-list .mdc-deprecated-list-item__graphic{display:inline-flex}.mdc-deprecated-list-item__meta{margin-left:auto;margin-right:0}.mdc-deprecated-list-item__meta:not(.material-icons){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-deprecated-list-item[dir=rtl] .mdc-deprecated-list-item__meta,[dir=rtl] .mdc-deprecated-list-item .mdc-deprecated-list-item__meta{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text::before,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list--video-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--image-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item__primary-text::after,.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}.mdc-deprecated-list--dense .mdc-deprecated-list-item{height:40px}.mdc-deprecated-list--two-line .mdc-deprecated-list-item__text{align-self:flex-start}.mdc-deprecated-list--two-line .mdc-deprecated-list-item{height:64px}.mdc-deprecated-list--two-line.mdc-deprecated-list--video-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--image-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--avatar-list .mdc-deprecated-list-item,.mdc-deprecated-list--two-line.mdc-deprecated-list--icon-list .mdc-deprecated-list-item{height:72px}.mdc-deprecated-list--two-line.mdc-deprecated-list--icon-list .mdc-deprecated-list-item__graphic{align-self:flex-start;margin-top:16px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense .mdc-deprecated-list-item,.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item{height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:16px;width:36px;height:36px}[dir=rtl] .mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic,.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:16px;margin-right:0}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item{cursor:pointer}a.mdc-deprecated-list-item{color:inherit;text-decoration:none}.mdc-deprecated-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-deprecated-list-divider{border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list-divider--padded{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list-divider--padded,.mdc-deprecated-list-divider--padded[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list-divider--inset,.mdc-deprecated-list-divider--inset[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded,.mdc-deprecated-list-divider--inset.mdc-deprecated-list-divider--padded[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--icon-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--avatar-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading{margin-left:72px;margin-right:0;width:calc(100% - 72px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:72px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:72px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--thumbnail-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading{margin-left:88px;margin-right:0;width:calc(100% - 88px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:88px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:88px;margin-right:0;width:calc(100% - 104px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:88px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:16px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:16px;margin-right:0;width:calc(100% - 32px)}[dir=rtl] .mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--image-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:16px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading{margin-left:116px;margin-right:0;width:calc(100% - 116px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading[dir=rtl]{margin-left:0;margin-right:116px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-trailing{width:calc(100% - 16px)}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing{margin-left:116px;margin-right:0;width:calc(100% - 132px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing[dir=rtl]{margin-left:0;margin-right:116px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding{margin-left:0px;margin-right:0;width:calc(100% - 0px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding{margin-left:0px;margin-right:0;width:calc(100% - 16px)}[dir=rtl] .mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding,.mdc-deprecated-list--video-list .mdc-deprecated-list-divider--inset-leading.mdc-deprecated-list-divider--inset-trailing.mdc-deprecated-list-divider--inset-padding[dir=rtl]{margin-left:0;margin-right:0px}.mdc-deprecated-list-group .mdc-deprecated-list{padding:0}.mdc-deprecated-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-item__primary-text{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}.mdc-list-item__secondary-text{color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-trailing-icon .mdc-list-item__end{background-color:transparent}.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:0.38}.mdc-list-item--disabled .mdc-list-item__primary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled .mdc-list-item__secondary-text{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--disabled.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-list-item--selected .mdc-list-item__primary-text,.mdc-list-item--activated .mdc-list-item__primary-text{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-list-item--selected.mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--activated.mdc-list-item--with-leading-icon .mdc-list-item__start{color:#c7b300;color:var(--mdc-theme-primary, #c7b300)}.mdc-deprecated-list-group__subheader{color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}@media screen and (-ms-high-contrast: active){.mdc-list-divider::after{content:"";display:block;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:white}}.mdc-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:16px;padding-right:16px;align-items:stretch;cursor:pointer}.mdc-list-item:focus{outline:none}[dir=rtl] .mdc-list-item,.mdc-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-list-item.mdc-list-item--with-one-line{height:48px}.mdc-list-item.mdc-list-item--with-two-lines{height:64px}.mdc-list-item.mdc-list-item--with-three-lines{height:88px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--disabled,.mdc-list-item.mdc-list-item--non-interactive{cursor:auto}.mdc-list-item:not(.mdc-list-item--selected):focus::before,.mdc-list-item.mdc-ripple-upgraded--background-focused::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}.mdc-list-item.mdc-list-item--selected::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:3px double transparent;border-radius:inherit;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__content[for]{pointer-events:none}.mdc-list-item__primary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item__overline-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-list-item--with-two-lines .mdc-list-item__overline-text,.mdc-list-item--with-three-lines .mdc-list-item__overline-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::before,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__overline-text::after,.mdc-list-item--with-three-lines .mdc-list-item__overline-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start,.mdc-list-item--with-leading-avatar .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-avatar.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-avatar .mdc-list-item__start{border-radius:50%}.mdc-list-item--with-leading-icon .mdc-list-item__start{width:24px;height:24px}.mdc-list-item--with-leading-icon.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start,.mdc-list-item--with-leading-icon .mdc-list-item__start[dir=rtl]{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-icon.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-thumbnail.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-thumbnail.mdc-list-item,.mdc-list-item--with-leading-thumbnail.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-thumbnail .mdc-list-item__start,.mdc-list-item--with-leading-thumbnail .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-thumbnail .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-thumbnail.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-image.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-image.mdc-list-item,.mdc-list-item--with-leading-image.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-image .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-image .mdc-list-item__start,.mdc-list-item--with-leading-image .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-image .mdc-list-item__start{width:56px;height:56px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-image.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-image.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-video.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-video.mdc-list-item,.mdc-list-item--with-leading-video.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{margin-left:0;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-video .mdc-list-item__start,.mdc-list-item--with-leading-video .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:0}.mdc-list-item--with-leading-video .mdc-list-item__start{width:100px;height:56px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-video.mdc-list-item--with-one-line{height:72px}.mdc-list-item--with-leading-video.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-checkbox.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-checkbox .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-radio.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-radio.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-radio .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-radio .mdc-list-item__start[dir=rtl]{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio .mdc-list-item__start{width:40px;height:40px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-leading-switch.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-list-item--with-leading-switch.mdc-list-item,.mdc-list-item--with-leading-switch.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-list-item--with-leading-switch .mdc-list-item__start{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-leading-switch .mdc-list-item__start,.mdc-list-item--with-leading-switch .mdc-list-item__start[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-leading-switch .mdc-list-item__start{width:36px;height:20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-switch.mdc-list-item--with-one-line{height:56px}.mdc-list-item--with-leading-switch.mdc-list-item--with-two-lines{height:72px}.mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item,.mdc-list-item--with-trailing-icon.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-icon .mdc-list-item__end,.mdc-list-item--with-trailing-icon .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-icon .mdc-list-item__end{width:24px;height:24px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item,.mdc-list-item--with-trailing-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-trailing-meta .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-radio.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-radio .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-radio .mdc-list-item__end[dir=rtl]{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio .mdc-list-item__end{width:40px;height:40px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-switch.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-switch.mdc-list-item,.mdc-list-item--with-trailing-switch.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-list-item--with-trailing-switch .mdc-list-item__end{margin-left:16px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-switch .mdc-list-item__end,.mdc-list-item--with-trailing-switch .mdc-list-item__end[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-switch .mdc-list-item__end{width:36px;height:20px}.mdc-list-item--with-trailing-switch.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-group .mdc-deprecated-list{padding:0}.mdc-list-group__subheader{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);margin:calc( (3rem - 1.5rem) / 2 ) 16px}.mdc-list-divider{background-color:rgba(0, 0, 0, 0.12)}.mdc-list-divider{height:1px;padding:0;background-clip:content-box}.mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset{padding-left:16px;padding-right:auto}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-leading-inset,.mdc-list-divider.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-leading-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:16px}.mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset{padding-left:auto;padding-right:16px}[dir=rtl] .mdc-list-divider.mdc-list-divider--with-trailing-inset,.mdc-list-divider.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-text.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-icon.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-image.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-thumbnail.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-avatar.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-checkbox.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-switch.mdc-list-divider--with-trailing-inset[dir=rtl],[dir=rtl] .mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset,.mdc-list-divider--with-leading-radio.mdc-list-divider--with-trailing-inset[dir=rtl]{padding-left:16px;padding-right:auto}.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset{padding-left:0px;padding-right:auto}[dir=rtl] .mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset,.mdc-list-divider--with-leading-video.mdc-list-divider--with-leading-inset[dir=rtl]{padding-left:auto;padding-right:0px}[dir=rtl] .mdc-list-divider,.mdc-list-divider[dir=rtl]{padding:0}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--unbounded .mdc-deprecated-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-activation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-deprecated-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:hover .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:hover .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-deprecated-list-item__ripple,:not(.mdc-deprecated-list-item--disabled).mdc-deprecated-list-item .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-deprecated-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity;--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-deprecated-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-deprecated-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-deprecated-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,.mdc-deprecated-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-deprecated-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-deprecated-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-deprecated-list-item--disabled .mdc-deprecated-list-item__ripple,.mdc-deprecated-list-item--disabled .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}:not(.mdc-list-item--disabled).mdc-list-item{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}:not(.mdc-list-item--disabled).mdc-list-item:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-activated-opacity, 0.24)}:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-list-item--disabled).mdc-list-item--activated:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.32;opacity:var(--mdc-ripple-hover-opacity, 0.32)}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-focus-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.48;opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.48)}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before{opacity:0.16;opacity:var(--mdc-ripple-selected-opacity, 0.16)}:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected .mdc-list-item__ripple::after{background-color:#c7b300;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #c7b300))}:not(.mdc-list-item--disabled).mdc-list-item--selected:hover .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.24;opacity:var(--mdc-ripple-hover-opacity, 0.24)}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-focus-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.4;opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.4)}:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-list-item--disabled{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);will-change:transform, opacity}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-list-item--disabled .mdc-list-item__ripple::before{transition:opacity 15ms linear, background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-list-item--disabled .mdc-list-item__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded .mdc-list-item__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards, mdc-ripple-fg-opacity-in 75ms forwards}.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation .mdc-list-item__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-list-item--disabled.mdc-ripple-upgraded .mdc-list-item__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-list-item--disabled .mdc-list-item__ripple::before,.mdc-list-item--disabled .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, #000)}.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-list-item--disabled .mdc-list-item__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}';
function create_default_slot$2(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[20], null);
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
        if (default_slot.p && (!current || dirty & 1048576)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[20], !current ? -1 : dirty, null, null);
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
  let nav;
  let list;
  let current;
  const list_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { orientation: ctx[4] },
    { itemsStyle: ctx[5] },
    { dense: ctx[6] },
    { itemsRows: ctx[7] },
    {
      disableMDCInstance: ctx[8].variant === "dismissible" || ctx[8].variant === "modal"
    },
    ctx[10]
  ];
  let list_props = {
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  for (let i = 0; i < list_spread_levels.length; i += 1) {
    list_props = assign(list_props, list_spread_levels[i]);
  }
  list = new List_1({ props: list_props });
  list.$on("click", ctx[12]);
  list.$on("mousedown", ctx[13]);
  list.$on("mouseup", ctx[14]);
  list.$on("keydown", ctx[15]);
  list.$on("keyup", ctx[16]);
  list.$on("focusin", ctx[17]);
  list.$on("focusout", ctx[18]);
  return {
    c() {
      nav = element("nav");
      create_component(list.$$.fragment);
    },
    l(nodes) {
      nav = claim_element(nodes, "NAV", {});
      var nav_nodes = children(nav);
      claim_component(list.$$.fragment, nav_nodes);
      nav_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      mount_component(list, nav, null);
      ctx[19](nav);
      current = true;
    },
    p(ctx2, [dirty]) {
      const list_changes = dirty & 1534 ? get_spread_update(list_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { orientation: ctx2[4] },
        dirty & 32 && { itemsStyle: ctx2[5] },
        dirty & 64 && { dense: ctx2[6] },
        dirty & 128 && { itemsRows: ctx2[7] },
        dirty & 256 && {
          disableMDCInstance: ctx2[8].variant === "dismissible" || ctx2[8].variant === "modal"
        },
        dirty & 1024 && get_spread_object(ctx2[10])
      ]) : {};
      if (dirty & 1048576) {
        list_changes.$$scope = { dirty, ctx: ctx2 };
      }
      list.$set(list_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(list.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(list.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(nav);
      destroy_component(list);
      ctx[19](null);
    }
  };
}
let count$1 = 0;
function instance$3($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "orientation", "itemsStyle", "dense", "itemsRows"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let $drawerContext$;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@smui/drawer/nav-list/NavList:${count$1++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { orientation = "vertical" } = $$props;
  let { itemsStyle = "textual" } = $$props;
  let { dense = false } = $$props;
  let { itemsRows = 1 } = $$props;
  const drawerContext$ = getDrawerContext();
  component_subscribe($$self, drawerContext$, (value) => $$invalidate(8, $drawerContext$ = value));
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function nav_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dom = $$value;
      $$invalidate(0, dom);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(10, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("orientation" in $$new_props)
      $$invalidate(4, orientation = $$new_props.orientation);
    if ("itemsStyle" in $$new_props)
      $$invalidate(5, itemsStyle = $$new_props.itemsStyle);
    if ("dense" in $$new_props)
      $$invalidate(6, dense = $$new_props.dense);
    if ("itemsRows" in $$new_props)
      $$invalidate(7, itemsRows = $$new_props.itemsRows);
    if ("$$scope" in $$new_props)
      $$invalidate(20, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    orientation,
    itemsStyle,
    dense,
    itemsRows,
    $drawerContext$,
    drawerContext$,
    $$restProps,
    slots,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focusin_handler,
    focusout_handler,
    nav_binding,
    $$scope
  ];
}
class NavList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      orientation: 4,
      itemsStyle: 5,
      dense: 6,
      itemsRows: 7
    });
  }
}
const get_default_slot_changes = (dirty) => ({
  activated: dirty & 32,
  leadingClassName: dirty & 2097152,
  trailingClassName: dirty & 4194304
});
const get_default_slot_context = (ctx) => ({
  activated: ctx[5],
  leadingClassName: ctx[21],
  trailingClassName: ctx[22]
});
function create_default_slot$1(ctx) {
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[20], get_default_slot_context);
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
        if (default_slot.p && (!current || dirty & 7340064)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[20], !current ? -1 : dirty, get_default_slot_changes, get_default_slot_context);
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
  let item;
  let updating_dom;
  let current;
  const item_spread_levels = [
    { id: ctx[3] },
    { class: ctx[1] },
    { style: ctx[2] },
    { ripple: ctx[4] },
    { href: ctx[7] },
    { disabled: ctx[6] },
    { activated: ctx[5] },
    ctx[8]
  ];
  function item_dom_binding(value) {
    ctx[10](value);
  }
  let item_props = {
    $$slots: {
      default: [
        create_default_slot$1,
        ({ leadingClassName, trailingClassName }) => ({
          21: leadingClassName,
          22: trailingClassName
        }),
        ({ leadingClassName, trailingClassName }) => (leadingClassName ? 2097152 : 0) | (trailingClassName ? 4194304 : 0)
      ]
    },
    $$scope: { ctx }
  };
  for (let i = 0; i < item_spread_levels.length; i += 1) {
    item_props = assign(item_props, item_spread_levels[i]);
  }
  if (ctx[0] !== void 0) {
    item_props.dom = ctx[0];
  }
  item = new Item({ props: item_props });
  binding_callbacks.push(() => bind(item, "dom", item_dom_binding));
  item.$on("click", ctx[11]);
  item.$on("mousedown", ctx[12]);
  item.$on("mouseup", ctx[13]);
  item.$on("keydown", ctx[14]);
  item.$on("keyup", ctx[15]);
  item.$on("focus", ctx[16]);
  item.$on("focusin", ctx[17]);
  item.$on("focusout", ctx[18]);
  item.$on("blur", ctx[19]);
  return {
    c() {
      create_component(item.$$.fragment);
    },
    l(nodes) {
      claim_component(item.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const item_changes = dirty & 510 ? get_spread_update(item_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 2 && { class: ctx2[1] },
        dirty & 4 && { style: ctx2[2] },
        dirty & 16 && { ripple: ctx2[4] },
        dirty & 128 && { href: ctx2[7] },
        dirty & 64 && { disabled: ctx2[6] },
        dirty & 32 && { activated: ctx2[5] },
        dirty & 256 && get_spread_object(ctx2[8])
      ]) : {};
      if (dirty & 7340064) {
        item_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        item_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      item.$set(item_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(item.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(item, detaching);
    }
  };
}
let count = 0;
function instance$2($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "ripple", "activated", "disabled", "href"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = `@smui/list/Item:${count++}` } = $$props;
  let { dom = void 0 } = $$props;
  let { ripple = true } = $$props;
  let { activated = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  function item_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("ripple" in $$new_props)
      $$invalidate(4, ripple = $$new_props.ripple);
    if ("activated" in $$new_props)
      $$invalidate(5, activated = $$new_props.activated);
    if ("disabled" in $$new_props)
      $$invalidate(6, disabled = $$new_props.disabled);
    if ("href" in $$new_props)
      $$invalidate(7, href = $$new_props.href);
    if ("$$scope" in $$new_props)
      $$invalidate(20, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    ripple,
    activated,
    disabled,
    href,
    $$restProps,
    slots,
    item_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    focusin_handler,
    focusout_handler,
    blur_handler,
    $$scope
  ];
}
class NavItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      ripple: 4,
      activated: 5,
      disabled: 6,
      href: 7
    });
  }
}
function create_default_slot(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[18], null);
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
        if (default_slot.p && (!current || dirty & 262144)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[18], !current ? -1 : dirty, null, null);
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
  let switch_instance;
  let updating_dom;
  let t;
  let typographystyle;
  let current;
  const switch_instance_spread_levels = [
    { id: ctx[3] },
    {
      class: classList([ctx[1], `mdc-typography--${ctx[4]}`])
    },
    { style: ctx[2] },
    ctx[6]
  ];
  function switch_instance_dom_binding(value) {
    ctx[8](value);
  }
  var switch_value = ctx[5];
  function switch_props(ctx2) {
    let switch_instance_props = {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: ctx2 }
    };
    for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
      switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    }
    if (ctx2[0] !== void 0) {
      switch_instance_props.dom = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
    switch_instance.$on("click", ctx[9]);
    switch_instance.$on("mousedown", ctx[10]);
    switch_instance.$on("mouseup", ctx[11]);
    switch_instance.$on("keydown", ctx[12]);
    switch_instance.$on("keyup", ctx[13]);
    switch_instance.$on("focus", ctx[14]);
    switch_instance.$on("blur", ctx[15]);
    switch_instance.$on("focusin", ctx[16]);
    switch_instance.$on("focusout", ctx[17]);
  }
  typographystyle = new TypographyStyle({});
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      t = space();
      create_component(typographystyle.$$.fragment);
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      t = claim_space(nodes);
      claim_component(typographystyle.$$.fragment, nodes);
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert(target, t, anchor);
      mount_component(typographystyle, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const switch_instance_changes = dirty & 94 ? get_spread_update(switch_instance_spread_levels, [
        dirty & 8 && { id: ctx2[3] },
        dirty & 18 && {
          class: classList([ctx2[1], `mdc-typography--${ctx2[4]}`])
        },
        dirty & 4 && { style: ctx2[2] },
        dirty & 64 && get_spread_object(ctx2[6])
      ]) : {};
      if (dirty & 262144) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_dom && dirty & 1) {
        updating_dom = true;
        switch_instance_changes.dom = ctx2[0];
        add_flush_callback(() => updating_dom = false);
      }
      if (switch_value !== (switch_value = ctx2[5])) {
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
          binding_callbacks.push(() => bind(switch_instance, "dom", switch_instance_dom_binding));
          switch_instance.$on("click", ctx2[9]);
          switch_instance.$on("mousedown", ctx2[10]);
          switch_instance.$on("mouseup", ctx2[11]);
          switch_instance.$on("keydown", ctx2[12]);
          switch_instance.$on("keyup", ctx2[13]);
          switch_instance.$on("focus", ctx2[14]);
          switch_instance.$on("blur", ctx2[15]);
          switch_instance.$on("focusin", ctx2[16]);
          switch_instance.$on("focusout", ctx2[17]);
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, t.parentNode, t);
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
      transition_in(typographystyle.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      transition_out(typographystyle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (switch_instance)
        destroy_component(switch_instance, detaching);
      if (detaching)
        detach(t);
      destroy_component(typographystyle, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const omit_props_names = ["class", "style", "id", "dom", "variant", "component"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { dom = void 0 } = $$props;
  let { variant = "body1" } = $$props;
  let { component = getDefaultComponent(variant) } = $$props;
  function getDefaultComponent(variant2) {
    switch (variant2) {
      case "headline1":
        return H1;
      case "headline2":
        return H2;
      case "headline3":
        return H3;
      case "headline4":
        return H4;
      case "headline5":
        return H5;
      case "headline6":
      case "subtitle1":
      case "subtitle2":
        return H6;
      case "caption":
      case "button":
      case "overline":
        return Span;
      case "body1":
      case "body2":
      default:
        return P;
    }
  }
  function switch_instance_dom_binding(value) {
    dom = value;
    $$invalidate(0, dom);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keyup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function blur_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusout_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("style" in $$new_props)
      $$invalidate(2, style = $$new_props.style);
    if ("id" in $$new_props)
      $$invalidate(3, id = $$new_props.id);
    if ("dom" in $$new_props)
      $$invalidate(0, dom = $$new_props.dom);
    if ("variant" in $$new_props)
      $$invalidate(4, variant = $$new_props.variant);
    if ("component" in $$new_props)
      $$invalidate(5, component = $$new_props.component);
    if ("$$scope" in $$new_props)
      $$invalidate(18, $$scope = $$new_props.$$scope);
  };
  return [
    dom,
    className,
    style,
    id,
    variant,
    component,
    $$restProps,
    slots,
    switch_instance_dom_binding,
    click_handler,
    mousedown_handler,
    mouseup_handler,
    keydown_handler,
    keyup_handler,
    focus_handler,
    blur_handler,
    focusin_handler,
    focusout_handler,
    $$scope
  ];
}
class Typography extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, not_equal, {
      class: 1,
      style: 2,
      id: 3,
      dom: 0,
      variant: 4,
      component: 5
    });
  }
}
var TypographyStyle_svelte_svelte_type_style_lang = ".mdc-typography{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-font-family, Roboto, sans-serif)}.mdc-typography--headline1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:6rem;font-size:var(--mdc-typography-headline1-font-size, 6rem);line-height:6rem;line-height:var(--mdc-typography-headline1-line-height, 6rem);font-weight:300;font-weight:var(--mdc-typography-headline1-font-weight, 300);letter-spacing:-0.015625em;letter-spacing:var(--mdc-typography-headline1-letter-spacing, -0.015625em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline1-text-transform, inherit)}.mdc-typography--headline2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:3.75rem;font-size:var(--mdc-typography-headline2-font-size, 3.75rem);line-height:3.75rem;line-height:var(--mdc-typography-headline2-line-height, 3.75rem);font-weight:300;font-weight:var(--mdc-typography-headline2-font-weight, 300);letter-spacing:-0.0083333333em;letter-spacing:var(--mdc-typography-headline2-letter-spacing, -0.0083333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline2-text-transform, inherit)}.mdc-typography--headline3{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline3-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:3rem;font-size:var(--mdc-typography-headline3-font-size, 3rem);line-height:3.125rem;line-height:var(--mdc-typography-headline3-line-height, 3.125rem);font-weight:400;font-weight:var(--mdc-typography-headline3-font-weight, 400);letter-spacing:normal;letter-spacing:var(--mdc-typography-headline3-letter-spacing, normal);text-decoration:inherit;text-decoration:var(--mdc-typography-headline3-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline3-text-transform, inherit)}.mdc-typography--headline4{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline4-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:2.125rem;font-size:var(--mdc-typography-headline4-font-size, 2.125rem);line-height:2.5rem;line-height:var(--mdc-typography-headline4-line-height, 2.5rem);font-weight:400;font-weight:var(--mdc-typography-headline4-font-weight, 400);letter-spacing:0.0073529412em;letter-spacing:var(--mdc-typography-headline4-letter-spacing, 0.0073529412em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline4-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline4-text-transform, inherit)}.mdc-typography--headline5{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline5-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.5rem;font-size:var(--mdc-typography-headline5-font-size, 1.5rem);line-height:2rem;line-height:var(--mdc-typography-headline5-line-height, 2rem);font-weight:400;font-weight:var(--mdc-typography-headline5-font-weight, 400);letter-spacing:normal;letter-spacing:var(--mdc-typography-headline5-letter-spacing, normal);text-decoration:inherit;text-decoration:var(--mdc-typography-headline5-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline5-text-transform, inherit)}.mdc-typography--headline6{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit)}.mdc-typography--subtitle1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit)}.mdc-typography--subtitle2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-subtitle2-font-size, 0.875rem);line-height:1.375rem;line-height:var(--mdc-typography-subtitle2-line-height, 1.375rem);font-weight:500;font-weight:var(--mdc-typography-subtitle2-font-weight, 500);letter-spacing:0.0071428571em;letter-spacing:var(--mdc-typography-subtitle2-letter-spacing, 0.0071428571em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle2-text-transform, inherit)}.mdc-typography--body1{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-body1-font-size, 1rem);line-height:1.5rem;line-height:var(--mdc-typography-body1-line-height, 1.5rem);font-weight:400;font-weight:var(--mdc-typography-body1-font-weight, 400);letter-spacing:0.03125em;letter-spacing:var(--mdc-typography-body1-letter-spacing, 0.03125em);text-decoration:inherit;text-decoration:var(--mdc-typography-body1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body1-text-transform, inherit)}.mdc-typography--body2{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit)}.mdc-typography--caption{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}.mdc-typography--button{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-button-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-button-font-size, 0.875rem);line-height:2.25rem;line-height:var(--mdc-typography-button-line-height, 2.25rem);font-weight:500;font-weight:var(--mdc-typography-button-font-weight, 500);letter-spacing:0.0892857143em;letter-spacing:var(--mdc-typography-button-letter-spacing, 0.0892857143em);text-decoration:none;text-decoration:var(--mdc-typography-button-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-button-text-transform, uppercase)}.mdc-typography--overline{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-overline-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-overline-font-size, 0.75rem);line-height:2rem;line-height:var(--mdc-typography-overline-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-overline-font-weight, 500);letter-spacing:0.1666666667em;letter-spacing:var(--mdc-typography-overline-letter-spacing, 0.1666666667em);text-decoration:none;text-decoration:var(--mdc-typography-overline-text-decoration, none);text-transform:uppercase;text-transform:var(--mdc-typography-overline-text-transform, uppercase)}";
class TypographyStyle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, null, safe_not_equal, {});
  }
}
if (typeof window !== "undefined") {
  if (window.Prism)
    console.warn("Prism has already been initiated. Please ensure that svelte-prism is imported first.");
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var prism$2 = { exports: {} };
(function(module) {
  var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var Prism2 = function(_self2) {
    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
    var uniqueId = 0;
    var plainTextGrammar = {};
    var _ = {
      manual: _self2.Prism && _self2.Prism.manual,
      disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
      util: {
        encode: function encode(tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, encode(tokens.content), tokens.alias);
          } else if (Array.isArray(tokens)) {
            return tokens.map(encode);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        type: function(o) {
          return Object.prototype.toString.call(o).slice(8, -1);
        },
        objId: function(obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", { value: ++uniqueId });
          }
          return obj["__id"];
        },
        clone: function deepClone(o, visited) {
          visited = visited || {};
          var clone;
          var id;
          switch (_.util.type(o)) {
            case "Object":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = {};
              visited[id] = clone;
              for (var key in o) {
                if (o.hasOwnProperty(key)) {
                  clone[key] = deepClone(o[key], visited);
                }
              }
              return clone;
            case "Array":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = [];
              visited[id] = clone;
              o.forEach(function(v, i) {
                clone[i] = deepClone(v, visited);
              });
              return clone;
            default:
              return o;
          }
        },
        getLanguage: function(element2) {
          while (element2 && !lang.test(element2.className)) {
            element2 = element2.parentElement;
          }
          if (element2) {
            return (element2.className.match(lang) || [, "none"])[1].toLowerCase();
          }
          return "none";
        },
        currentScript: function() {
          if (typeof document === "undefined") {
            return null;
          }
          if ("currentScript" in document && 1 < 2) {
            return document.currentScript;
          }
          try {
            throw new Error();
          } catch (err) {
            var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
            if (src) {
              var scripts = document.getElementsByTagName("script");
              for (var i in scripts) {
                if (scripts[i].src == src) {
                  return scripts[i];
                }
              }
            }
            return null;
          }
        },
        isActive: function(element2, className, defaultActivation) {
          var no = "no-" + className;
          while (element2) {
            var classList2 = element2.classList;
            if (classList2.contains(className)) {
              return true;
            }
            if (classList2.contains(no)) {
              return false;
            }
            element2 = element2.parentElement;
          }
          return !!defaultActivation;
        }
      },
      languages: {
        plain: plainTextGrammar,
        plaintext: plainTextGrammar,
        text: plainTextGrammar,
        txt: plainTextGrammar,
        extend: function(id, redef) {
          var lang2 = _.util.clone(_.languages[id]);
          for (var key in redef) {
            lang2[key] = redef[key];
          }
          return lang2;
        },
        insertBefore: function(inside, before, insert2, root) {
          root = root || _.languages;
          var grammar = root[inside];
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert2) {
                  if (insert2.hasOwnProperty(newToken)) {
                    ret[newToken] = insert2[newToken];
                  }
                }
              }
              if (!insert2.hasOwnProperty(token)) {
                ret[token] = grammar[token];
              }
            }
          }
          var old = root[inside];
          root[inside] = ret;
          _.languages.DFS(_.languages, function(key, value) {
            if (value === old && key != inside) {
              this[key] = ret;
            }
          });
          return ret;
        },
        DFS: function DFS(o, callback, type, visited) {
          visited = visited || {};
          var objId = _.util.objId;
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);
              var property = o[i];
              var propertyType = _.util.type(property);
              if (propertyType === "Object" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, null, visited);
              } else if (propertyType === "Array" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, i, visited);
              }
            }
          }
        }
      },
      plugins: {},
      highlightAll: function(async, callback) {
        _.highlightAllUnder(document, async, callback);
      },
      highlightAllUnder: function(container, async, callback) {
        var env = {
          callback,
          container,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _.hooks.run("before-highlightall", env);
        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
        _.hooks.run("before-all-elements-highlight", env);
        for (var i = 0, element2; element2 = env.elements[i++]; ) {
          _.highlightElement(element2, async === true, env.callback);
        }
      },
      highlightElement: function(element2, async, callback) {
        var language = _.util.getLanguage(element2);
        var grammar = _.languages[language];
        element2.className = element2.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
        var parent = element2.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre") {
          parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
        }
        var code = element2.textContent;
        var env = {
          element: element2,
          language,
          grammar,
          code
        };
        function insertHighlightedCode(highlightedCode) {
          env.highlightedCode = highlightedCode;
          _.hooks.run("before-insert", env);
          env.element.innerHTML = env.highlightedCode;
          _.hooks.run("after-highlight", env);
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
        }
        _.hooks.run("before-sanity-check", env);
        parent = env.element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
          parent.setAttribute("tabindex", "0");
        }
        if (!env.code) {
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
          return;
        }
        _.hooks.run("before-highlight", env);
        if (!env.grammar) {
          insertHighlightedCode(_.util.encode(env.code));
          return;
        }
        if (async && _self2.Worker) {
          var worker = new Worker(_.filename);
          worker.onmessage = function(evt) {
            insertHighlightedCode(evt.data);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        }
      },
      highlight: function(text2, grammar, language) {
        var env = {
          code: text2,
          grammar,
          language
        };
        _.hooks.run("before-tokenize", env);
        env.tokens = _.tokenize(env.code, env.grammar);
        _.hooks.run("after-tokenize", env);
        return Token.stringify(_.util.encode(env.tokens), env.language);
      },
      tokenize: function(text2, grammar) {
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        var tokenList = new LinkedList();
        addAfter(tokenList, tokenList.head, text2);
        matchGrammar(text2, tokenList, grammar, tokenList.head, 0);
        return toArray(tokenList);
      },
      hooks: {
        all: {},
        add: function(name, callback) {
          var hooks = _.hooks.all;
          hooks[name] = hooks[name] || [];
          hooks[name].push(callback);
        },
        run: function(name, env) {
          var callbacks = _.hooks.all[name];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i = 0, callback; callback = callbacks[i++]; ) {
            callback(env);
          }
        }
      },
      Token
    };
    _self2.Prism = _;
    function Token(type, content, alias, matchedStr) {
      this.type = type;
      this.content = content;
      this.alias = alias;
      this.length = (matchedStr || "").length | 0;
    }
    Token.stringify = function stringify(o, language) {
      if (typeof o == "string") {
        return o;
      }
      if (Array.isArray(o)) {
        var s = "";
        o.forEach(function(e) {
          s += stringify(e, language);
        });
        return s;
      }
      var env = {
        type: o.type,
        content: stringify(o.content, language),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language
      };
      var aliases = o.alias;
      if (aliases) {
        if (Array.isArray(aliases)) {
          Array.prototype.push.apply(env.classes, aliases);
        } else {
          env.classes.push(aliases);
        }
      }
      _.hooks.run("wrap", env);
      var attributes = "";
      for (var name in env.attributes) {
        attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }
      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
    };
    function matchPattern(pattern, pos, text2, lookbehind) {
      pattern.lastIndex = pos;
      var match = pattern.exec(text2);
      if (match && lookbehind && match[1]) {
        var lookbehindLength = match[1].length;
        match.index += lookbehindLength;
        match[0] = match[0].slice(lookbehindLength);
      }
      return match;
    }
    function matchGrammar(text2, tokenList, grammar, startNode, startPos, rematch) {
      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }
        var patterns = grammar[token];
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        for (var j = 0; j < patterns.length; ++j) {
          if (rematch && rematch.cause == token + "," + j) {
            return;
          }
          var patternObj = patterns[j];
          var inside = patternObj.inside;
          var lookbehind = !!patternObj.lookbehind;
          var greedy = !!patternObj.greedy;
          var alias = patternObj.alias;
          if (greedy && !patternObj.pattern.global) {
            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
            patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
          }
          var pattern = patternObj.pattern || patternObj;
          for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
            if (rematch && pos >= rematch.reach) {
              break;
            }
            var str = currentNode.value;
            if (tokenList.length > text2.length) {
              return;
            }
            if (str instanceof Token) {
              continue;
            }
            var removeCount = 1;
            var match;
            if (greedy) {
              match = matchPattern(pattern, pos, text2, lookbehind);
              if (!match) {
                break;
              }
              var from = match.index;
              var to = match.index + match[0].length;
              var p = pos;
              p += currentNode.value.length;
              while (from >= p) {
                currentNode = currentNode.next;
                p += currentNode.value.length;
              }
              p -= currentNode.value.length;
              pos = p;
              if (currentNode.value instanceof Token) {
                continue;
              }
              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                removeCount++;
                p += k.value.length;
              }
              removeCount--;
              str = text2.slice(pos, p);
              match.index -= pos;
            } else {
              match = matchPattern(pattern, 0, str, lookbehind);
              if (!match) {
                continue;
              }
            }
            var from = match.index;
            var matchStr = match[0];
            var before = str.slice(0, from);
            var after = str.slice(from + matchStr.length);
            var reach = pos + str.length;
            if (rematch && reach > rematch.reach) {
              rematch.reach = reach;
            }
            var removeFrom = currentNode.prev;
            if (before) {
              removeFrom = addAfter(tokenList, removeFrom, before);
              pos += before.length;
            }
            removeRange(tokenList, removeFrom, removeCount);
            var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
            currentNode = addAfter(tokenList, removeFrom, wrapped);
            if (after) {
              addAfter(tokenList, currentNode, after);
            }
            if (removeCount > 1) {
              var nestedRematch = {
                cause: token + "," + j,
                reach
              };
              matchGrammar(text2, tokenList, grammar, currentNode.prev, pos, nestedRematch);
              if (rematch && nestedRematch.reach > rematch.reach) {
                rematch.reach = nestedRematch.reach;
              }
            }
          }
        }
      }
    }
    function LinkedList() {
      var head = { value: null, prev: null, next: null };
      var tail = { value: null, prev: head, next: null };
      head.next = tail;
      this.head = head;
      this.tail = tail;
      this.length = 0;
    }
    function addAfter(list, node, value) {
      var next = node.next;
      var newNode = { value, prev: node, next };
      node.next = newNode;
      next.prev = newNode;
      list.length++;
      return newNode;
    }
    function removeRange(list, node, count2) {
      var next = node.next;
      for (var i = 0; i < count2 && next !== list.tail; i++) {
        next = next.next;
      }
      node.next = next;
      next.prev = node;
      list.length -= i;
    }
    function toArray(list) {
      var array = [];
      var node = list.head.next;
      while (node !== list.tail) {
        array.push(node.value);
        node = node.next;
      }
      return array;
    }
    if (!_self2.document) {
      if (!_self2.addEventListener) {
        return _;
      }
      if (!_.disableWorkerMessageHandler) {
        _self2.addEventListener("message", function(evt) {
          var message = JSON.parse(evt.data);
          var lang2 = message.language;
          var code = message.code;
          var immediateClose = message.immediateClose;
          _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
          if (immediateClose) {
            _self2.close();
          }
        }, false);
      }
      return _;
    }
    var script = _.util.currentScript();
    if (script) {
      _.filename = script.src;
      if (script.hasAttribute("data-manual")) {
        _.manual = true;
      }
    }
    function highlightAutomaticallyCallback() {
      if (!_.manual) {
        _.highlightAll();
      }
    }
    if (!_.manual) {
      var readyState = document.readyState;
      if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(highlightAutomaticallyCallback);
        } else {
          window.setTimeout(highlightAutomaticallyCallback, 16);
        }
      }
    }
    return _;
  }(_self);
  if (module.exports) {
    module.exports = Prism2;
  }
  if (typeof commonjsGlobal !== "undefined") {
    commonjsGlobal.Prism = Prism2;
  }
  Prism2.languages.markup = {
    "comment": /<!--[\s\S]*?-->/,
    "prolog": /<\?[\s\S]+?\?>/,
    "doctype": {
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
        },
        "string": {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        "punctuation": /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/,
        "name": /[^\s<>'"]+/
      }
    },
    "cdata": /<!\[CDATA\[[\s\S]*?\]\]>/i,
    "tag": {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        "tag": {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            "punctuation": /^<\/?/,
            "namespace": /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            "punctuation": [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        },
        "punctuation": /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            "namespace": /^[^\s>\/:]+:/
          }
        }
      }
    },
    "entity": [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };
  Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
  Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
  Prism2.hooks.add("wrap", function(env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
    value: function addInlined2(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism2.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism2.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
          return tagName;
        }), "i"),
        lookbehind: true,
        greedy: true,
        inside
      };
      Prism2.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
    value: function(attrName, lang) {
      Prism2.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              "value": {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism2.languages[lang]
              },
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });
  Prism2.languages.html = Prism2.languages.markup;
  Prism2.languages.mathml = Prism2.languages.markup;
  Prism2.languages.svg = Prism2.languages.markup;
  Prism2.languages.xml = Prism2.languages.extend("markup", {});
  Prism2.languages.ssml = Prism2.languages.xml;
  Prism2.languages.atom = Prism2.languages.xml;
  Prism2.languages.rss = Prism2.languages.xml;
  (function(Prism3) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism3.languages.css = {
      "comment": /\/\*[\s\S]*?\*\//,
      "atrule": {
        pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
        inside: {
          "rule": /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          "keyword": {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
        }
      },
      "url": {
        pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
        greedy: true,
        inside: {
          "function": /^url/i,
          "punctuation": /^\(|\)$/,
          "string": {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      "selector": {
        pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
        lookbehind: true
      },
      "string": {
        pattern: string,
        greedy: true
      },
      "property": {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      "important": /!important\b/i,
      "function": {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      "punctuation": /[(){};:,]/
    };
    Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
    var markup = Prism3.languages.markup;
    if (markup) {
      markup.tag.addInlined("style", "css");
      markup.tag.addAttribute("style", "css");
    }
  })(Prism2);
  Prism2.languages.clike = {
    "comment": [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    "string": {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        "punctuation": /[.\\]/
      }
    },
    "keyword": /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(?:true|false)\b/,
    "function": /\b\w+(?=\()/,
    "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    "punctuation": /[{}[\];(),.:]/
  };
  Prism2.languages.javascript = Prism2.languages.extend("clike", {
    "class-name": [
      Prism2.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
        lookbehind: true
      }
    ],
    "keyword": [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }
    ],
    "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    "number": /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
  Prism2.languages.insertBefore("javascript", "keyword", {
    "regex": {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: "language-regex",
          inside: Prism2.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    "parameter": [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }
    ],
    "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism2.languages.insertBefore("javascript", "string", {
    "hashbang": {
      pattern: /^#!.*/,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism2.languages.javascript
          }
        },
        "string": /[\s\S]+/
      }
    }
  });
  if (Prism2.languages.markup) {
    Prism2.languages.markup.tag.addInlined("script", "javascript");
    Prism2.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
  }
  Prism2.languages.js = Prism2.languages.javascript;
  (function() {
    if (typeof Prism2 === "undefined" || typeof document === "undefined") {
      return;
    }
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    var LOADING_MESSAGE = "Loading\u2026";
    var FAILURE_MESSAGE = function(status, message) {
      return "\u2716 Error " + status + " while fetching file: " + message;
    };
    var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
    var EXTENSIONS = {
      "js": "javascript",
      "py": "python",
      "rb": "ruby",
      "ps1": "powershell",
      "psm1": "powershell",
      "sh": "bash",
      "bat": "batch",
      "h": "c",
      "tex": "latex"
    };
    var STATUS_ATTR = "data-src-status";
    var STATUS_LOADING = "loading";
    var STATUS_LOADED = "loaded";
    var STATUS_FAILED = "failed";
    var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
    var lang = /\blang(?:uage)?-([\w-]+)\b/i;
    function setLanguageClass(element2, language) {
      var className = element2.className;
      className = className.replace(lang, " ") + " language-" + language;
      element2.className = className.replace(/\s+/g, " ").trim();
    }
    Prism2.hooks.add("before-highlightall", function(env) {
      env.selector += ", " + SELECTOR;
    });
    Prism2.hooks.add("before-sanity-check", function(env) {
      var pre = env.element;
      if (pre.matches(SELECTOR)) {
        env.code = "";
        pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
        var code = pre.appendChild(document.createElement("CODE"));
        code.textContent = LOADING_MESSAGE;
        var src = pre.getAttribute("data-src");
        var language = env.language;
        if (language === "none") {
          var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
          language = EXTENSIONS[extension] || extension;
        }
        setLanguageClass(code, language);
        setLanguageClass(pre, language);
        var autoloader = Prism2.plugins.autoloader;
        if (autoloader) {
          autoloader.loadLanguages(language);
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              code.textContent = xhr.responseText;
              Prism2.highlightElement(code);
            } else {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              if (xhr.status >= 400) {
                code.textContent = FAILURE_MESSAGE(xhr.status, xhr.statusText);
              } else {
                code.textContent = FAILURE_EMPTY_MESSAGE;
              }
            }
          }
        };
        xhr.send(null);
      }
    });
    Prism2.plugins.fileHighlight = {
      highlight: function highlight(container) {
        var elements = (container || document).querySelectorAll(SELECTOR);
        for (var i = 0, element2; element2 = elements[i++]; ) {
          Prism2.highlightElement(element2);
        }
      }
    };
    var logged = false;
    Prism2.fileHighlight = function() {
      if (!logged) {
        console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
        logged = true;
      }
      Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
    };
  })();
})(prism$2);
var prism$1 = prism$2.exports;
const blocks = "(if|else if|await|then|catch|each|html|debug)";
Prism.languages.svelte = Prism.languages.extend("markup", {
  each: {
    pattern: new RegExp("{[#/]each(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),
    inside: {
      "language-javascript": [
        {
          pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        },
        {
          pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        },
        {
          pattern: /(#each[\s]*)[\s\S]*(?=as)/,
          lookbehind: true,
          inside: Prism.languages["javascript"]
        }
      ],
      keyword: /[#/]each|as/,
      punctuation: /{|}/
    }
  },
  block: {
    pattern: new RegExp("{[#:/@]/s" + blocks + "(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}"),
    inside: {
      punctuation: /^{|}$/,
      keyword: [new RegExp("[#:/@]" + blocks + "( )*"), /as/, /then/],
      "language-javascript": {
        pattern: /[\s\S]*/,
        inside: Prism.languages["javascript"]
      }
    }
  },
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: true,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "language-javascript": {
        pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
        inside: Prism.languages["javascript"]
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          punctuation: [
            /^=/,
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true
            }
          ],
          "language-javascript": {
            pattern: /{[\s\S]+}/,
            inside: Prism.languages["javascript"]
          }
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  "language-javascript": {
    pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
    lookbehind: true,
    inside: Prism.languages["javascript"]
  }
});
Prism.languages.svelte["tag"].inside["attr-value"].inside["entity"] = Prism.languages.svelte["entity"];
Prism.hooks.add("wrap", (env) => {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});
Object.defineProperty(Prism.languages.svelte.tag, "addInlined", {
  value: function addInlined(tagName, lang) {
    const includedCdataInside = {};
    includedCdataInside["language-" + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
    const inside = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside["language-" + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    const def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, tagName), "i"),
      lookbehind: true,
      greedy: true,
      inside
    };
    Prism.languages.insertBefore("svelte", "cdata", def);
  }
});
Prism.languages.svelte.tag.addInlined("style", "css");
Prism.languages.svelte.tag.addInlined("script", "javascript");
function create_else_block(ctx) {
  let html_tag;
  let html_anchor;
  return {
    c() {
      html_tag = new HtmlTag();
      html_anchor = empty();
      this.h();
    },
    l(nodes) {
      html_tag = claim_html_tag(nodes);
      html_anchor = empty();
      this.h();
    },
    h() {
      html_tag.a = html_anchor;
    },
    m(target, anchor) {
      html_tag.m(ctx[2], target, anchor);
      insert(target, html_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        html_tag.p(ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(html_anchor);
      if (detaching)
        html_tag.d();
    }
  };
}
function create_if_block(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[2]);
    },
    l(nodes) {
      t = claim_text(nodes, ctx[2]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let code0;
  let t;
  let pre;
  let code1;
  let code1_class_value;
  let pre_class_value;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  function select_block_type(ctx2, dirty) {
    if (ctx2[0] === "none")
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      code0 = element("code");
      if (default_slot)
        default_slot.c();
      t = space();
      pre = element("pre");
      code1 = element("code");
      if_block.c();
      this.h();
    },
    l(nodes) {
      code0 = claim_element(nodes, "CODE", { style: true });
      var code0_nodes = children(code0);
      if (default_slot)
        default_slot.l(code0_nodes);
      code0_nodes.forEach(detach);
      t = claim_space(nodes);
      pre = claim_element(nodes, "PRE", {
        class: true,
        "command-line": true,
        "data-output": true
      });
      var pre_nodes = children(pre);
      code1 = claim_element(pre_nodes, "CODE", { class: true });
      var code1_nodes = children(code1);
      if_block.l(code1_nodes);
      code1_nodes.forEach(detach);
      pre_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(code0, "display", "none");
      attr(code1, "class", code1_class_value = "language-" + ctx[0]);
      attr(pre, "class", pre_class_value = "language-" + ctx[0]);
      attr(pre, "command-line", "");
      attr(pre, "data-output", "2-17");
    },
    m(target, anchor) {
      insert(target, code0, anchor);
      if (default_slot) {
        default_slot.m(code0, null);
      }
      ctx[7](code0);
      insert(target, t, anchor);
      insert(target, pre, anchor);
      append(pre, code1);
      if_block.m(code1, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot(default_slot, default_slot_template, ctx2, ctx2[5], !current ? -1 : dirty, null, null);
        }
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(code1, null);
        }
      }
      if (!current || dirty & 1 && code1_class_value !== (code1_class_value = "language-" + ctx2[0])) {
        attr(code1, "class", code1_class_value);
      }
      if (!current || dirty & 1 && pre_class_value !== (pre_class_value = "language-" + ctx2[0])) {
        attr(pre, "class", pre_class_value);
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
        detach(code0);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
      if (detaching)
        detach(t);
      if (detaching)
        detach(pre);
      if_block.d();
    }
  };
}
const prism = prism$1;
prism$1.highlightElement;
const globalConfig = { transform: (x) => x };
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { language = "javascript" } = $$props;
  let { source = "" } = $$props;
  let { transform = (src) => src } = $$props;
  let element2;
  let formattedCode;
  let elementObserver;
  onMount(() => {
    elementObserver = new MutationObserver((mutations) => {
      const addedChilds = mutations.find((mutation) => mutation.type === "childList" && mutation.addedNodes.length);
      const charData = mutations.find((mutation) => mutation.type === "characterData" && mutation.target);
      if (addedChilds) {
        $$invalidate(3, source = addedChilds.target.textContent);
      } else {
        $$invalidate(3, source = charData.target.textContent);
      }
    });
    elementObserver.observe(element2, {
      childList: true,
      characterData: true,
      subtree: true
    });
  });
  onDestroy(() => {
    elementObserver === null || elementObserver === void 0 ? void 0 : elementObserver.disconnect();
  });
  function highlightCode(source2) {
    const grammar = prism.languages[language];
    let body = source2;
    body = globalConfig.transform(body);
    body = transform(body);
    $$invalidate(2, formattedCode = language === "none" ? body : prism.highlight(body, grammar, language));
  }
  function code0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(1, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("language" in $$props2)
      $$invalidate(0, language = $$props2.language);
    if ("source" in $$props2)
      $$invalidate(3, source = $$props2.source);
    if ("transform" in $$props2)
      $$invalidate(4, transform = $$props2.transform);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      source && highlightCode(source);
    }
  };
  return [
    language,
    element2,
    formattedCode,
    source,
    transform,
    $$scope,
    slots,
    code0_binding
  ];
}
class Prism$1 extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { language: 0, source: 3, transform: 4 });
  }
}
(function(Prism2) {
  Prism2.languages.typescript = Prism2.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
    },
    "builtin": /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
  });
  Prism2.languages.typescript.keyword.push(/\b(?:abstract|as|declare|implements|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)(?!\s*[^\s_${}*a-zA-Z\xA0-\uFFFF])/);
  delete Prism2.languages.typescript["parameter"];
  var typeInside = Prism2.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism2.languages.typescript["class-name"].inside = typeInside;
  Prism2.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism2.languages.ts = Prism2.languages.typescript;
})(Prism);
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token)
          fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
function flip(node, animation, params = {}) {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleX = animation.from.width / node.clientWidth;
  const scaleY = animation.from.height / node.clientHeight;
  const dx = (animation.from.left - animation.to.left) / scaleX;
  const dy = (animation.from.top - animation.to.top) / scaleY;
  const d = Math.sqrt(dx * dx + dy * dy);
  const { delay = 0, duration = (d2) => Math.sqrt(d2) * 120, easing = cubicOut } = params;
  return {
    delay,
    duration: is_function(duration) ? duration(d) : duration,
    easing,
    css: (_t, u) => `transform: ${transform} translate(${u * dx}px, ${u * dy}px);`
  };
}
export { query_selector_all as $, assign as A, group_outros as B, writable as C, not_equal as D, createEventDispatcher as E, Section as F, create_slot as G, update_slot as H, Title as I, Icon as J, binding_callbacks as K, bind as L, AppContent as M, NavigationIcon as N, append as O, add_flush_callback as P, onDestroy as Q, Drawer as R, SvelteComponent as S, TopAppBar_1 as T, component_subscribe as U, Content$1 as V, NavList as W, destroy_each as X, NavItem as Y, Content as Z, PrimaryText as _, children as a, getContext$1 as a0, noop as a1, Prism$1 as a2, IconButton_1 as a3, Button_1 as a4, LeadingIcon as a5, Label as a6, TrailingIcon as a7, Typography as a8, svg_element as a9, toggle_class as aa, set_style as ab, listen as ac, run_all as ad, spring as ae, action_destroyer as af, is_function as ag, fix_position as ah, add_transform as ai, create_animation as aj, add_render_callback as ak, create_bidirectional_transition as al, update_keyed_each as am, flip as an, scale as ao, fix_and_outro_and_destroy_block as ap, getContext as aq, setContext as ar, createContext$1 as as, createContextWritableStore as at, createContextStore as au, set_store_value as av, attr as b, claim_element as c, detach as d, element as e, insert as f, claim_text as g, set_data as h, init as i, create_component as j, space as k, empty as l, claim_component as m, claim_space as n, mount_component as o, get_spread_update as p, get_spread_object as q, transition_out as r, safe_not_equal as s, text as t, check_outros as u, transition_in as v, destroy_component as w, setContext$1 as x, afterUpdate as y, onMount as z };
//# sourceMappingURL=vendor-4b28337c.js.map
