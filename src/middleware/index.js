/**
 * @function load ∷ ∀ a. Props p ⇒ String → a|[a] → p → p
 */
const load = name => args => async props => {
    const module = await import(`./${name}/index.js`);
    const f = Array.isArray(args)
        ? module.default(...args)
        : module.default(args);
    return f(props);
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
