!(function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = (t[r] = { i: r, l: !1, exports: {} });
        return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function(e, t, r) {
            n.o(e, t) ||
                Object.defineProperty(e, t, { enumerable: !0, get: r });
        }),
        (n.r = function(e) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: 'Module'
                }),
                Object.defineProperty(e, '__esModule', { value: !0 });
        }),
        (n.t = function(e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (
                (n.r(r),
                Object.defineProperty(r, 'default', {
                    enumerable: !0,
                    value: e
                }),
                2 & t && 'string' != typeof e)
            )
                for (var o in e)
                    n.d(
                        r,
                        o,
                        function(t) {
                            return e[t];
                        }.bind(null, o)
                    );
            return r;
        }),
        (n.n = function(e) {
            var t =
                e && e.__esModule
                    ? function() {
                          return e.default;
                      }
                    : function() {
                          return e;
                      };
            return n.d(t, 'a', t), t;
        }),
        (n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ''),
        n((n.s = 0));
})([
    function(e, t, n) {
        e.exports = n(1);
    },
    function(e, t, n) {
        'use strict';
        function r(e, t, n) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: n,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                      })
                    : (e[t] = n),
                e
            );
        }
        (0, n(2).create)('x-hello', function(e) {
            return (function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {},
                        o = Object.keys(n);
                    'function' == typeof Object.getOwnPropertySymbols &&
                        (o = o.concat(
                            Object.getOwnPropertySymbols(n).filter(function(e) {
                                return Object.getOwnPropertyDescriptor(
                                    n,
                                    e
                                ).enumerable;
                            })
                        )),
                        o.forEach(function(t) {
                            r(e, t, n[t]);
                        });
                }
                return e;
            })({}, e, { name: 'Adam' });
        });
    },
    function(e, t, n) {
        'use strict';
        function r(e) {
            return (r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function(e) {
                          return typeof e;
                      }
                    : function(e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol &&
                              e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      })(e);
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {},
                    r = Object.keys(n);
                'function' == typeof Object.getOwnPropertySymbols &&
                    (r = r.concat(
                        Object.getOwnPropertySymbols(n).filter(function(e) {
                            return Object.getOwnPropertyDescriptor(
                                n,
                                e
                            ).enumerable;
                        })
                    )),
                    r.forEach(function(t) {
                        c(e, t, n[t]);
                    });
            }
            return e;
        }
        function c(e, t, n) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: n,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0
                      })
                    : (e[t] = n),
                e
            );
        }
        function u(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r);
            }
        }
        function i(e, t) {
            return !t || ('object' !== r(t) && 'function' != typeof t)
                ? (function(e) {
                      if (void 0 === e)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called"
                          );
                      return e;
                  })(e)
                : t;
        }
        function f(e) {
            var t = 'function' == typeof Map ? new Map() : void 0;
            return (f = function(e) {
                if (null === e) return null;
                if ('function' != typeof e)
                    throw new TypeError(
                        'Super expression must either be null or a function'
                    );
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e);
                    t.set(e, n);
                }
                function n() {
                    return (function(e, t, n) {
                        return ((function() {
                            if (
                                'undefined' == typeof Reflect ||
                                !Reflect.construct
                            )
                                return !1;
                            if (Reflect.construct.sham) return !1;
                            if ('function' == typeof Proxy) return !0;
                            try {
                                return (
                                    Date.prototype.toString.call(
                                        Reflect.construct(
                                            Date,
                                            [],
                                            function() {}
                                        )
                                    ),
                                    !0
                                );
                            } catch (e) {
                                return !1;
                            }
                        })()
                            ? Reflect.construct
                            : function(e, t, n) {
                                  var r = [null];
                                  r.push.apply(r, t);
                                  var o = new (Function.bind.apply(e, r))();
                                  return n && l(o, n.prototype), o;
                              }
                        ).apply(null, arguments);
                    })(e, arguments, a(this).constructor);
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })),
                    l(n, e)
                );
            })(e);
        }
        function l(e, t) {
            return (l =
                Object.setPrototypeOf ||
                function(e, t) {
                    return (e.__proto__ = t), e;
                })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function(e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                  })(e);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
            (t.create = void 0),
            (function(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n)) {
                            var r =
                                Object.defineProperty &&
                                Object.getOwnPropertyDescriptor
                                    ? Object.getOwnPropertyDescriptor(e, n)
                                    : {};
                            r.get || r.set
                                ? Object.defineProperty(t, n, r)
                                : (t[n] = e[n]);
                        }
                t.default = e;
            })(n(3)),
            (t.create = function(e) {
                for (
                    var t = arguments.length,
                        n = new Array(t > 1 ? t - 1 : 0),
                        r = 1;
                    r < t;
                    r++
                )
                    n[r - 1] = arguments[r];
                customElements.define(
                    e,
                    (function(e) {
                        function t() {
                            return (
                                (function(e, t) {
                                    if (!(e instanceof t))
                                        throw new TypeError(
                                            'Cannot call a class as a function'
                                        );
                                })(this, t),
                                i(this, a(t).apply(this, arguments))
                            );
                        }
                        return (
                            (function(e, t) {
                                if ('function' != typeof t && null !== t)
                                    throw new TypeError(
                                        'Super expression must either be null or a function'
                                    );
                                (e.prototype = Object.create(t && t.prototype, {
                                    constructor: {
                                        value: e,
                                        writable: !0,
                                        configurable: !0
                                    }
                                })),
                                    t && l(e, t);
                            })(t, f(HTMLElement)),
                            (function(e, t, n) {
                                t && u(e.prototype, t);
                            })(t, [
                                {
                                    key: 'connectedCallback',
                                    value: function() {
                                        return this.render();
                                    }
                                },
                                {
                                    key: 'disconnectedCallback',
                                    value: function() {
                                        return (
                                            this.classList.remove('resolved'),
                                            this.render()
                                        );
                                    }
                                },
                                {
                                    key: 'render',
                                    value: function() {
                                        var e = o(
                                                {},
                                                arguments.length > 0 &&
                                                void 0 !== arguments[0]
                                                    ? arguments[0]
                                                    : {},
                                                { node: this }
                                            ),
                                            t = n.reduce(function(e, t) {
                                                return o({}, e, t(e));
                                            }, e);
                                        console.log(t);
                                    }
                                }
                            ]),
                            t
                        );
                    })()
                );
            });
    },
    function(e, t, n) {
        'use strict';
        (function(e) {
            function n(e, t, n) {
                return (
                    t in e
                        ? Object.defineProperty(e, t, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (e[t] = n),
                    e
                );
            }
            Object.defineProperty(t, '__esModule', { value: !0 }),
                (t.consoleMessage = t.getNamespace = t.getEventName = t.dispatchEvent = void 0),
                (t.dispatchEvent = function(e, t) {
                    t.node.dispatchEvent(
                        new CustomEvent(e, {
                            detail: (function(e) {
                                for (var t = 1; t < arguments.length; t++) {
                                    var r =
                                            null != arguments[t]
                                                ? arguments[t]
                                                : {},
                                        o = Object.keys(r);
                                    'function' ==
                                        typeof Object.getOwnPropertySymbols &&
                                        (o = o.concat(
                                            Object.getOwnPropertySymbols(
                                                r
                                            ).filter(function(e) {
                                                return Object.getOwnPropertyDescriptor(
                                                    r,
                                                    e
                                                ).enumerable;
                                            })
                                        )),
                                        o.forEach(function(t) {
                                            n(e, t, r[t]);
                                        });
                                }
                                return e;
                            })({}, t, {
                                version: Object({ NODE_ENV: 'development' })
                                    .npm_config_version
                            }),
                            bubbles: !0,
                            composed: !0
                        })
                    );
                }),
                (t.getEventName = function(e) {
                    return '@switzerland/'.concat(e);
                }),
                (t.getNamespace = function() {
                    e.document &&
                        document.currentScript &&
                        document.currentScript.dataset.namespace;
                }),
                (t.consoleMessage = function(e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 'error';
                    console[t]('🇨🇭 Switzerland: '.concat(e, '.'));
                });
        }.call(this, n(4)));
    },
    function(e, t) {
        var n;
        n = (function() {
            return this;
        })();
        try {
            n = n || Function('return this')() || (0, eval)('this');
        } catch (e) {
            'object' == typeof window && (n = window);
        }
        e.exports = n;
    }
]);
