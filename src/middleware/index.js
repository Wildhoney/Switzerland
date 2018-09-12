/**
 * @function load ∷ ∀ a. Props p ⇒ String → a|[a] → p → p
 */
const load = name => async (...args) => {
    const module = await import(`./${name}/index.js`);
    return module.default(...args);
};

export default {
    adapt: load('adapt'),
    attrs: load('attrs'),
    defer: load('defer'),
    delay: load('delay'),
    intersect: load('intersect'),
    interval: load('interval'),
    loader: load('loader'),
    methods: load('methods'),
    once: load('once'),
    redux: load('redux'),
    rescue: load('rescue'),
    template: load('template'),
    vdom: load('vdom'),
    wait: load('wait')
};
