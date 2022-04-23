// ../node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var i;
var t;
var o;
var r;
var f;
var e = {};
var c = [];
var s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function a(n2, l2) {
    for (var u3 in l2) n2[u3] = l2[u3];
    return n2;
}
function h(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
}
function v(l2, u3, i3) {
    var t3,
        o2,
        r3,
        f3 = {};
    for (r3 in u3) r3 == 'key' ? (t3 = u3[r3]) : r3 == 'ref' ? (o2 = u3[r3]) : (f3[r3] = u3[r3]);
    if (
        (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3),
        typeof l2 == 'function' && l2.defaultProps != null)
    )
        for (r3 in l2.defaultProps) f3[r3] === void 0 && (f3[r3] = l2.defaultProps[r3]);
    return y(l2, f3, t3, o2, null);
}
function y(n2, i3, t3, o2, r3) {
    var f3 = {
        type: n2,
        props: i3,
        key: t3,
        ref: o2,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        __h: null,
        constructor: void 0,
        __v: r3 == null ? ++u : r3,
    };
    return r3 == null && l.vnode != null && l.vnode(f3), f3;
}
function d(n2) {
    return n2.children;
}
function _(n2, l2) {
    (this.props = n2), (this.context = l2);
}
function k(n2, l2) {
    if (l2 == null) return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l2 < n2.__k.length; l2++) if ((u3 = n2.__k[l2]) != null && u3.__e != null) return u3.__e;
    return typeof n2.type == 'function' ? k(n2) : null;
}
function b(n2) {
    var l2, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
        for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
            if ((u3 = n2.__k[l2]) != null && u3.__e != null) {
                n2.__e = n2.__c.base = u3.__e;
                break;
            }
        return b(n2);
    }
}
function m(n2) {
    ((!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++) || r !== l.debounceRendering) &&
        ((r = l.debounceRendering) || o)(g);
}
function g() {
    for (var n2; (g.__r = t.length); )
        (n2 = t.sort(function (n3, l2) {
            return n3.__v.__b - l2.__v.__b;
        })),
            (t = []),
            n2.some(function (n3) {
                var l2, u3, i3, t3, o2, r3;
                n3.__d &&
                    ((o2 = (t3 = (l2 = n3).__v).__e),
                    (r3 = l2.__P) &&
                        ((u3 = []),
                        ((i3 = a({}, t3)).__v = t3.__v + 1),
                        j(
                            r3,
                            t3,
                            i3,
                            l2.__n,
                            r3.ownerSVGElement !== void 0,
                            t3.__h != null ? [o2] : null,
                            u3,
                            o2 == null ? k(t3) : o2,
                            t3.__h
                        ),
                        z(u3, t3),
                        t3.__e != o2 && b(t3)));
            });
}
function w(n2, l2, u3, i3, t3, o2, r3, f3, s3, a3) {
    var h3,
        v3,
        p3,
        _3,
        b3,
        m3,
        g4,
        w3 = (i3 && i3.__k) || c,
        A4 = w3.length;
    for (u3.__k = [], h3 = 0; h3 < l2.length; h3++)
        if (
            (_3 = u3.__k[h3] =
                (_3 = l2[h3]) == null || typeof _3 == 'boolean'
                    ? null
                    : typeof _3 == 'string' || typeof _3 == 'number' || typeof _3 == 'bigint'
                    ? y(null, _3, null, null, _3)
                    : Array.isArray(_3)
                    ? y(d, { children: _3 }, null, null, null)
                    : _3.__b > 0
                    ? y(_3.type, _3.props, _3.key, null, _3.__v)
                    : _3) != null
        ) {
            if (
                ((_3.__ = u3),
                (_3.__b = u3.__b + 1),
                (p3 = w3[h3]) === null || (p3 && _3.key == p3.key && _3.type === p3.type))
            )
                w3[h3] = void 0;
            else
                for (v3 = 0; v3 < A4; v3++) {
                    if ((p3 = w3[v3]) && _3.key == p3.key && _3.type === p3.type) {
                        w3[v3] = void 0;
                        break;
                    }
                    p3 = null;
                }
            j(n2, _3, (p3 = p3 || e), t3, o2, r3, f3, s3, a3),
                (b3 = _3.__e),
                (v3 = _3.ref) &&
                    p3.ref != v3 &&
                    (g4 || (g4 = []), p3.ref && g4.push(p3.ref, null, _3), g4.push(v3, _3.__c || b3, _3)),
                b3 != null
                    ? (m3 == null && (m3 = b3),
                      typeof _3.type == 'function' && _3.__k === p3.__k
                          ? (_3.__d = s3 = x(_3, s3, n2))
                          : (s3 = P(n2, _3, p3, w3, b3, s3)),
                      typeof u3.type == 'function' && (u3.__d = s3))
                    : s3 && p3.__e == s3 && s3.parentNode != n2 && (s3 = k(p3));
        }
    for (u3.__e = m3, h3 = A4; h3--; )
        w3[h3] != null &&
            (typeof u3.type == 'function' && w3[h3].__e != null && w3[h3].__e == u3.__d && (u3.__d = k(i3, h3 + 1)),
            N(w3[h3], w3[h3]));
    if (g4) for (h3 = 0; h3 < g4.length; h3++) M(g4[h3], g4[++h3], g4[++h3]);
}
function x(n2, l2, u3) {
    for (var i3, t3 = n2.__k, o2 = 0; t3 && o2 < t3.length; o2++)
        (i3 = t3[o2]) &&
            ((i3.__ = n2), (l2 = typeof i3.type == 'function' ? x(i3, l2, u3) : P(u3, i3, i3, t3, i3.__e, l2)));
    return l2;
}
function A(n2, l2) {
    return (
        (l2 = l2 || []),
        n2 == null ||
            typeof n2 == 'boolean' ||
            (Array.isArray(n2)
                ? n2.some(function (n3) {
                      A(n3, l2);
                  })
                : l2.push(n2)),
        l2
    );
}
function P(n2, l2, u3, i3, t3, o2) {
    var r3, f3, e3;
    if (l2.__d !== void 0) (r3 = l2.__d), (l2.__d = void 0);
    else if (u3 == null || t3 != o2 || t3.parentNode == null)
        n: if (o2 == null || o2.parentNode !== n2) n2.appendChild(t3), (r3 = null);
        else {
            for (f3 = o2, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2) if (f3 == t3) break n;
            n2.insertBefore(t3, o2), (r3 = o2);
        }
    return r3 !== void 0 ? r3 : t3.nextSibling;
}
function C(n2, l2, u3, i3, t3) {
    var o2;
    for (o2 in u3) o2 === 'children' || o2 === 'key' || o2 in l2 || H(n2, o2, null, u3[o2], i3);
    for (o2 in l2)
        (t3 && typeof l2[o2] != 'function') ||
            o2 === 'children' ||
            o2 === 'key' ||
            o2 === 'value' ||
            o2 === 'checked' ||
            u3[o2] === l2[o2] ||
            H(n2, o2, l2[o2], u3[o2], i3);
}
function $(n2, l2, u3) {
    l2[0] === '-'
        ? n2.setProperty(l2, u3)
        : (n2[l2] = u3 == null ? '' : typeof u3 != 'number' || s.test(l2) ? u3 : u3 + 'px');
}
function H(n2, l2, u3, i3, t3) {
    var o2;
    n: if (l2 === 'style')
        if (typeof u3 == 'string') n2.style.cssText = u3;
        else {
            if ((typeof i3 == 'string' && (n2.style.cssText = i3 = ''), i3))
                for (l2 in i3) (u3 && l2 in u3) || $(n2.style, l2, '');
            if (u3) for (l2 in u3) (i3 && u3[l2] === i3[l2]) || $(n2.style, l2, u3[l2]);
        }
    else if (l2[0] === 'o' && l2[1] === 'n')
        (o2 = l2 !== (l2 = l2.replace(/Capture$/, ''))),
            (l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2)),
            n2.l || (n2.l = {}),
            (n2.l[l2 + o2] = u3),
            u3 ? i3 || n2.addEventListener(l2, o2 ? T : I, o2) : n2.removeEventListener(l2, o2 ? T : I, o2);
    else if (l2 !== 'dangerouslySetInnerHTML') {
        if (t3) l2 = l2.replace(/xlink(H|:h)/, 'h').replace(/sName$/, 's');
        else if (l2 !== 'href' && l2 !== 'list' && l2 !== 'form' && l2 !== 'tabIndex' && l2 !== 'download' && l2 in n2)
            try {
                n2[l2] = u3 == null ? '' : u3;
                break n;
            } catch (n3) {}
        typeof u3 == 'function' ||
            (u3 != null && (u3 !== false || (l2[0] === 'a' && l2[1] === 'r'))
                ? n2.setAttribute(l2, u3)
                : n2.removeAttribute(l2));
    }
}
function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
}
function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
}
function j(n2, u3, i3, t3, o2, r3, f3, e3, c3) {
    var s3,
        h3,
        v3,
        y3,
        p3,
        k2,
        b3,
        m3,
        g4,
        x3,
        A4,
        P3 = u3.type;
    if (u3.constructor !== void 0) return null;
    i3.__h != null && ((c3 = i3.__h), (e3 = u3.__e = i3.__e), (u3.__h = null), (r3 = [e3])), (s3 = l.__b) && s3(u3);
    try {
        n: if (typeof P3 == 'function') {
            if (
                ((m3 = u3.props),
                (g4 = (s3 = P3.contextType) && t3[s3.__c]),
                (x3 = s3 ? (g4 ? g4.props.value : s3.__) : t3),
                i3.__c
                    ? (b3 = (h3 = u3.__c = i3.__c).__ = h3.__E)
                    : ('prototype' in P3 && P3.prototype.render
                          ? (u3.__c = h3 = new P3(m3, x3))
                          : ((u3.__c = h3 = new _(m3, x3)), (h3.constructor = P3), (h3.render = O)),
                      g4 && g4.sub(h3),
                      (h3.props = m3),
                      h3.state || (h3.state = {}),
                      (h3.context = x3),
                      (h3.__n = t3),
                      (v3 = h3.__d = true),
                      (h3.__h = [])),
                h3.__s == null && (h3.__s = h3.state),
                P3.getDerivedStateFromProps != null &&
                    (h3.__s == h3.state && (h3.__s = a({}, h3.__s)),
                    a(h3.__s, P3.getDerivedStateFromProps(m3, h3.__s))),
                (y3 = h3.props),
                (p3 = h3.state),
                v3)
            )
                P3.getDerivedStateFromProps == null && h3.componentWillMount != null && h3.componentWillMount(),
                    h3.componentDidMount != null && h3.__h.push(h3.componentDidMount);
            else {
                if (
                    (P3.getDerivedStateFromProps == null &&
                        m3 !== y3 &&
                        h3.componentWillReceiveProps != null &&
                        h3.componentWillReceiveProps(m3, x3),
                    (!h3.__e &&
                        h3.shouldComponentUpdate != null &&
                        h3.shouldComponentUpdate(m3, h3.__s, x3) === false) ||
                        u3.__v === i3.__v)
                ) {
                    (h3.props = m3),
                        (h3.state = h3.__s),
                        u3.__v !== i3.__v && (h3.__d = false),
                        (h3.__v = u3),
                        (u3.__e = i3.__e),
                        (u3.__k = i3.__k),
                        u3.__k.forEach(function (n3) {
                            n3 && (n3.__ = u3);
                        }),
                        h3.__h.length && f3.push(h3);
                    break n;
                }
                h3.componentWillUpdate != null && h3.componentWillUpdate(m3, h3.__s, x3),
                    h3.componentDidUpdate != null &&
                        h3.__h.push(function () {
                            h3.componentDidUpdate(y3, p3, k2);
                        });
            }
            (h3.context = x3),
                (h3.props = m3),
                (h3.state = h3.__s),
                (s3 = l.__r) && s3(u3),
                (h3.__d = false),
                (h3.__v = u3),
                (h3.__P = n2),
                (s3 = h3.render(h3.props, h3.state, h3.context)),
                (h3.state = h3.__s),
                h3.getChildContext != null && (t3 = a(a({}, t3), h3.getChildContext())),
                v3 || h3.getSnapshotBeforeUpdate == null || (k2 = h3.getSnapshotBeforeUpdate(y3, p3)),
                (A4 = s3 != null && s3.type === d && s3.key == null ? s3.props.children : s3),
                w(n2, Array.isArray(A4) ? A4 : [A4], u3, i3, t3, o2, r3, f3, e3, c3),
                (h3.base = u3.__e),
                (u3.__h = null),
                h3.__h.length && f3.push(h3),
                b3 && (h3.__E = h3.__ = null),
                (h3.__e = false);
        } else
            r3 == null && u3.__v === i3.__v
                ? ((u3.__k = i3.__k), (u3.__e = i3.__e))
                : (u3.__e = L(i3.__e, u3, i3, t3, o2, r3, f3, c3));
        (s3 = l.diffed) && s3(u3);
    } catch (n3) {
        (u3.__v = null),
            (c3 || r3 != null) && ((u3.__e = e3), (u3.__h = !!c3), (r3[r3.indexOf(e3)] = null)),
            l.__e(n3, u3, i3);
    }
}
function z(n2, u3) {
    l.__c && l.__c(u3, n2),
        n2.some(function (u4) {
            try {
                (n2 = u4.__h),
                    (u4.__h = []),
                    n2.some(function (n3) {
                        n3.call(u4);
                    });
            } catch (n3) {
                l.__e(n3, u4.__v);
            }
        });
}
function L(l2, u3, i3, t3, o2, r3, f3, c3) {
    var s3,
        a3,
        v3,
        y3 = i3.props,
        p3 = u3.props,
        d3 = u3.type,
        _3 = 0;
    if ((d3 === 'svg' && (o2 = true), r3 != null)) {
        for (; _3 < r3.length; _3++)
            if ((s3 = r3[_3]) && 'setAttribute' in s3 == !!d3 && (d3 ? s3.localName === d3 : s3.nodeType === 3)) {
                (l2 = s3), (r3[_3] = null);
                break;
            }
    }
    if (l2 == null) {
        if (d3 === null) return document.createTextNode(p3);
        (l2 = o2
            ? document.createElementNS('http://www.w3.org/2000/svg', d3)
            : document.createElement(d3, p3.is && p3)),
            (r3 = null),
            (c3 = false);
    }
    if (d3 === null) y3 === p3 || (c3 && l2.data === p3) || (l2.data = p3);
    else {
        if (
            ((r3 = r3 && n.call(l2.childNodes)),
            (a3 = (y3 = i3.props || e).dangerouslySetInnerHTML),
            (v3 = p3.dangerouslySetInnerHTML),
            !c3)
        ) {
            if (r3 != null)
                for (y3 = {}, _3 = 0; _3 < l2.attributes.length; _3++)
                    y3[l2.attributes[_3].name] = l2.attributes[_3].value;
            (v3 || a3) &&
                ((v3 && ((a3 && v3.__html == a3.__html) || v3.__html === l2.innerHTML)) ||
                    (l2.innerHTML = (v3 && v3.__html) || ''));
        }
        if ((C(l2, p3, y3, o2, c3), v3)) u3.__k = [];
        else if (
            ((_3 = u3.props.children),
            w(
                l2,
                Array.isArray(_3) ? _3 : [_3],
                u3,
                i3,
                t3,
                o2 && d3 !== 'foreignObject',
                r3,
                f3,
                r3 ? r3[0] : i3.__k && k(i3, 0),
                c3
            ),
            r3 != null)
        )
            for (_3 = r3.length; _3--; ) r3[_3] != null && h(r3[_3]);
        c3 ||
            ('value' in p3 &&
                (_3 = p3.value) !== void 0 &&
                (_3 !== l2.value || (d3 === 'progress' && !_3) || (d3 === 'option' && _3 !== y3.value)) &&
                H(l2, 'value', _3, y3.value, false),
            'checked' in p3 &&
                (_3 = p3.checked) !== void 0 &&
                _3 !== l2.checked &&
                H(l2, 'checked', _3, y3.checked, false));
    }
    return l2;
}
function M(n2, u3, i3) {
    try {
        typeof n2 == 'function' ? n2(u3) : (n2.current = u3);
    } catch (n3) {
        l.__e(n3, i3);
    }
}
function N(n2, u3, i3) {
    var t3, o2;
    if (
        (l.unmount && l.unmount(n2),
        (t3 = n2.ref) && ((t3.current && t3.current !== n2.__e) || M(t3, null, u3)),
        (t3 = n2.__c) != null)
    ) {
        if (t3.componentWillUnmount)
            try {
                t3.componentWillUnmount();
            } catch (n3) {
                l.__e(n3, u3);
            }
        t3.base = t3.__P = null;
    }
    if ((t3 = n2.__k)) for (o2 = 0; o2 < t3.length; o2++) t3[o2] && N(t3[o2], u3, typeof n2.type != 'function');
    i3 || n2.__e == null || h(n2.__e), (n2.__e = n2.__d = void 0);
}
function O(n2, l2, u3) {
    return this.constructor(n2, u3);
}
(n = c.slice),
    (l = {
        __e: function (n2, l2, u3, i3) {
            for (var t3, o2, r3; (l2 = l2.__); )
                if ((t3 = l2.__c) && !t3.__)
                    try {
                        if (
                            ((o2 = t3.constructor) &&
                                o2.getDerivedStateFromError != null &&
                                (t3.setState(o2.getDerivedStateFromError(n2)), (r3 = t3.__d)),
                            t3.componentDidCatch != null && (t3.componentDidCatch(n2, i3 || {}), (r3 = t3.__d)),
                            r3)
                        )
                            return (t3.__E = t3);
                    } catch (l3) {
                        n2 = l3;
                    }
            throw n2;
        },
    }),
    (u = 0),
    (i = function (n2) {
        return n2 != null && n2.constructor === void 0;
    }),
    (_.prototype.setState = function (n2, l2) {
        var u3;
        (u3 = this.__s != null && this.__s !== this.state ? this.__s : (this.__s = a({}, this.state))),
            typeof n2 == 'function' && (n2 = n2(a({}, u3), this.props)),
            n2 && a(u3, n2),
            n2 != null && this.__v && (l2 && this.__h.push(l2), m(this));
    }),
    (_.prototype.forceUpdate = function (n2) {
        this.__v && ((this.__e = true), n2 && this.__h.push(n2), m(this));
    }),
    (_.prototype.render = d),
    (t = []),
    (o = typeof Promise == 'function' ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
    (g.__r = 0),
    (f = 0);

// ../node_modules/preact/hooks/dist/hooks.module.js
var t2;
var u2;
var r2;
var i2 = [];
var c2 = l.__b;
var f2 = l.__r;
var e2 = l.diffed;
var a2 = l.__c;
var v2 = l.unmount;
function x2() {
    for (var t3; (t3 = i2.shift()); )
        if (t3.__P)
            try {
                t3.__H.__h.forEach(g2), t3.__H.__h.forEach(j2), (t3.__H.__h = []);
            } catch (u3) {
                (t3.__H.__h = []), l.__e(u3, t3.__v);
            }
}
(l.__b = function (n2) {
    (u2 = null), c2 && c2(n2);
}),
    (l.__r = function (n2) {
        f2 && f2(n2), (t2 = 0);
        var r3 = (u2 = n2.__c).__H;
        r3 && (r3.__h.forEach(g2), r3.__h.forEach(j2), (r3.__h = []));
    }),
    (l.diffed = function (t3) {
        e2 && e2(t3);
        var o2 = t3.__c;
        o2 &&
            o2.__H &&
            o2.__H.__h.length &&
            ((i2.push(o2) !== 1 && r2 === l.requestAnimationFrame) ||
                (
                    (r2 = l.requestAnimationFrame) ||
                    function (n2) {
                        var t4,
                            u3 = function () {
                                clearTimeout(r3), b2 && cancelAnimationFrame(t4), setTimeout(n2);
                            },
                            r3 = setTimeout(u3, 100);
                        b2 && (t4 = requestAnimationFrame(u3));
                    }
                )(x2)),
            (u2 = null);
    }),
    (l.__c = function (t3, u3) {
        u3.some(function (t4) {
            try {
                t4.__h.forEach(g2),
                    (t4.__h = t4.__h.filter(function (n2) {
                        return !n2.__ || j2(n2);
                    }));
            } catch (r3) {
                u3.some(function (n2) {
                    n2.__h && (n2.__h = []);
                }),
                    (u3 = []),
                    l.__e(r3, t4.__v);
            }
        }),
            a2 && a2(t3, u3);
    }),
    (l.unmount = function (t3) {
        v2 && v2(t3);
        var u3,
            r3 = t3.__c;
        r3 &&
            r3.__H &&
            (r3.__H.__.forEach(function (n2) {
                try {
                    g2(n2);
                } catch (n3) {
                    u3 = n3;
                }
            }),
            u3 && l.__e(u3, r3.__v));
    });
var b2 = typeof requestAnimationFrame == 'function';
function g2(n2) {
    var t3 = u2,
        r3 = n2.__c;
    typeof r3 == 'function' && ((n2.__c = void 0), r3()), (u2 = t3);
}
function j2(n2) {
    var t3 = u2;
    (n2.__c = n2.__()), (u2 = t3);
}

// ../node_modules/preact/compat/dist/compat.module.js
function C2(n2, t3) {
    for (var e3 in t3) n2[e3] = t3[e3];
    return n2;
}
function S2(n2, t3) {
    for (var e3 in n2) if (e3 !== '__source' && !(e3 in t3)) return true;
    for (var r3 in t3) if (r3 !== '__source' && n2[r3] !== t3[r3]) return true;
    return false;
}
function E(n2) {
    this.props = n2;
}
function g3(n2, t3) {
    function e3(n3) {
        var e4 = this.props.ref,
            r4 = e4 == n3.ref;
        return (
            !r4 && e4 && (e4.call ? e4(null) : (e4.current = null)),
            t3 ? !t3(this.props, n3) || !r4 : S2(this.props, n3)
        );
    }
    function r3(t4) {
        return (this.shouldComponentUpdate = e3), v(n2, t4);
    }
    return (
        (r3.displayName = 'Memo(' + (n2.displayName || n2.name) + ')'),
        (r3.prototype.isReactComponent = true),
        (r3.__f = true),
        r3
    );
}
((E.prototype = new _()).isPureReactComponent = true),
    (E.prototype.shouldComponentUpdate = function (n2, t3) {
        return S2(this.props, n2) || S2(this.state, t3);
    });
var w2 = l.__b;
l.__b = function (n2) {
    n2.type && n2.type.__f && n2.ref && ((n2.props.ref = n2.ref), (n2.ref = null)), w2 && w2(n2);
};
var R = (typeof Symbol != 'undefined' && Symbol.for && Symbol.for('react.forward_ref')) || 3911;
var A3 = l.__e;
l.__e = function (n2, t3, e3, r3) {
    if (n2.then) {
        for (var u3, o2 = t3; (o2 = o2.__); )
            if ((u3 = o2.__c) && u3.__c)
                return t3.__e == null && ((t3.__e = e3.__e), (t3.__k = e3.__k)), u3.__c(n2, t3);
    }
    A3(n2, t3, e3, r3);
};
var O2 = l.unmount;
function L2() {
    (this.__u = 0), (this.t = null), (this.__b = null);
}
function U(n2) {
    var t3 = n2.__.__c;
    return t3 && t3.__e && t3.__e(n2);
}
function M2() {
    (this.u = null), (this.o = null);
}
(l.unmount = function (n2) {
    var t3 = n2.__c;
    t3 && t3.__R && t3.__R(), t3 && n2.__h === true && (n2.type = null), O2 && O2(n2);
}),
    ((L2.prototype = new _()).__c = function (n2, t3) {
        var e3 = t3.__c,
            r3 = this;
        r3.t == null && (r3.t = []), r3.t.push(e3);
        var u3 = U(r3.__v),
            o2 = false,
            i3 = function () {
                o2 || ((o2 = true), (e3.__R = null), u3 ? u3(l2) : l2());
            };
        e3.__R = i3;
        var l2 = function () {
                if (!--r3.__u) {
                    if (r3.state.__e) {
                        var n3 = r3.state.__e;
                        r3.__v.__k[0] = (function n4(t5, e4, r4) {
                            return (
                                t5 &&
                                    ((t5.__v = null),
                                    (t5.__k =
                                        t5.__k &&
                                        t5.__k.map(function (t6) {
                                            return n4(t6, e4, r4);
                                        })),
                                    t5.__c &&
                                        t5.__c.__P === e4 &&
                                        (t5.__e && r4.insertBefore(t5.__e, t5.__d),
                                        (t5.__c.__e = true),
                                        (t5.__c.__P = r4))),
                                t5
                            );
                        })(n3, n3.__c.__P, n3.__c.__O);
                    }
                    var t4;
                    for (r3.setState({ __e: (r3.__b = null) }); (t4 = r3.t.pop()); ) t4.forceUpdate();
                }
            },
            f3 = t3.__h === true;
        r3.__u++ || f3 || r3.setState({ __e: (r3.__b = r3.__v.__k[0]) }), n2.then(i3, i3);
    }),
    (L2.prototype.componentWillUnmount = function () {
        this.t = [];
    }),
    (L2.prototype.render = function (n2, t3) {
        if (this.__b) {
            if (this.__v.__k) {
                var e3 = document.createElement('div'),
                    r3 = this.__v.__k[0].__c;
                this.__v.__k[0] = (function n3(t4, e4, r4) {
                    return (
                        t4 &&
                            (t4.__c &&
                                t4.__c.__H &&
                                (t4.__c.__H.__.forEach(function (n4) {
                                    typeof n4.__c == 'function' && n4.__c();
                                }),
                                (t4.__c.__H = null)),
                            (t4 = C2({}, t4)).__c != null && (t4.__c.__P === r4 && (t4.__c.__P = e4), (t4.__c = null)),
                            (t4.__k =
                                t4.__k &&
                                t4.__k.map(function (t5) {
                                    return n3(t5, e4, r4);
                                }))),
                        t4
                    );
                })(this.__b, e3, (r3.__O = r3.__P));
            }
            this.__b = null;
        }
        var u3 = t3.__e && v(d, null, n2.fallback);
        return u3 && (u3.__h = null), [v(d, null, t3.__e ? null : n2.children), u3];
    });
var T3 = function (n2, t3, e3) {
    if ((++e3[1] === e3[0] && n2.o.delete(t3), n2.props.revealOrder && (n2.props.revealOrder[0] !== 't' || !n2.o.size)))
        for (e3 = n2.u; e3; ) {
            for (; e3.length > 3; ) e3.pop()();
            if (e3[1] < e3[0]) break;
            n2.u = e3 = e3[2];
        }
};
((M2.prototype = new _()).__e = function (n2) {
    var t3 = this,
        e3 = U(t3.__v),
        r3 = t3.o.get(n2);
    return (
        r3[0]++,
        function (u3) {
            var o2 = function () {
                t3.props.revealOrder ? (r3.push(u3), T3(t3, n2, r3)) : u3();
            };
            e3 ? e3(o2) : o2();
        }
    );
}),
    (M2.prototype.render = function (n2) {
        (this.u = null), (this.o = /* @__PURE__ */ new Map());
        var t3 = A(n2.children);
        n2.revealOrder && n2.revealOrder[0] === 'b' && t3.reverse();
        for (var e3 = t3.length; e3--; ) this.o.set(t3[e3], (this.u = [1, 0, this.u]));
        return n2.children;
    }),
    (M2.prototype.componentDidUpdate = M2.prototype.componentDidMount =
        function () {
            var n2 = this;
            this.o.forEach(function (t3, e3) {
                T3(n2, e3, t3);
            });
        });
var P2 = (typeof Symbol != 'undefined' && Symbol.for && Symbol.for('react.element')) || 60103;
var V =
    /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var j3 = typeof document != 'undefined';
var z2 = function (n2) {
    return (typeof Symbol != 'undefined' && typeof Symbol() == 'symbol' ? /fil|che|rad/i : /fil|che|ra/i).test(n2);
};
(_.prototype.isReactComponent = {}),
    ['componentWillMount', 'componentWillReceiveProps', 'componentWillUpdate'].forEach(function (n2) {
        Object.defineProperty(_.prototype, n2, {
            configurable: true,
            get: function () {
                return this['UNSAFE_' + n2];
            },
            set: function (t3) {
                Object.defineProperty(this, n2, { configurable: true, writable: true, value: t3 });
            },
        });
    });
var H2 = l.event;
function Z() {}
function Y() {
    return this.cancelBubble;
}
function q2() {
    return this.defaultPrevented;
}
l.event = function (n2) {
    return (
        H2 && (n2 = H2(n2)),
        (n2.persist = Z),
        (n2.isPropagationStopped = Y),
        (n2.isDefaultPrevented = q2),
        (n2.nativeEvent = n2)
    );
};
var G;
var J = {
    configurable: true,
    get: function () {
        return this.class;
    },
};
var K = l.vnode;
l.vnode = function (n2) {
    var t3 = n2.type,
        e3 = n2.props,
        r3 = e3;
    if (typeof t3 == 'string') {
        var u3 = t3.indexOf('-') === -1;
        for (var o2 in ((r3 = {}), e3)) {
            var i3 = e3[o2];
            (j3 && o2 === 'children' && t3 === 'noscript') ||
                (o2 === 'value' && 'defaultValue' in e3 && i3 == null) ||
                (o2 === 'defaultValue' && 'value' in e3 && e3.value == null
                    ? (o2 = 'value')
                    : o2 === 'download' && i3 === true
                    ? (i3 = '')
                    : /ondoubleclick/i.test(o2)
                    ? (o2 = 'ondblclick')
                    : /^onchange(textarea|input)/i.test(o2 + t3) && !z2(e3.type)
                    ? (o2 = 'oninput')
                    : /^onfocus$/i.test(o2)
                    ? (o2 = 'onfocusin')
                    : /^onblur$/i.test(o2)
                    ? (o2 = 'onfocusout')
                    : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o2)
                    ? (o2 = o2.toLowerCase())
                    : u3 && V.test(o2)
                    ? (o2 = o2.replace(/[A-Z0-9]/, '-$&').toLowerCase())
                    : i3 === null && (i3 = void 0),
                (r3[o2] = i3));
        }
        t3 == 'select' &&
            r3.multiple &&
            Array.isArray(r3.value) &&
            (r3.value = A(e3.children).forEach(function (n3) {
                n3.props.selected = r3.value.indexOf(n3.props.value) != -1;
            })),
            t3 == 'select' &&
                r3.defaultValue != null &&
                (r3.value = A(e3.children).forEach(function (n3) {
                    n3.props.selected = r3.multiple
                        ? r3.defaultValue.indexOf(n3.props.value) != -1
                        : r3.defaultValue == n3.props.value;
                })),
            (n2.props = r3),
            e3.class != e3.className &&
                ((J.enumerable = 'className' in e3),
                e3.className != null && (r3.class = e3.className),
                Object.defineProperty(r3, 'className', J));
    }
    (n2.$$typeof = P2), K && K(n2);
};
var Q = l.__r;
l.__r = function (n2) {
    Q && Q(n2), (G = n2.__c);
};

// src/index.ts
function create(name, tree) {
    function Tree() {
        return v(name, {}, tree);
    }
    return g3(Tree, () => false);
}

// example/index.tsx
var example_default = create('x-name', () => {
    return /* @__PURE__ */ v('div', null, 'Hi Imogen!');
});
export { example_default as default };
