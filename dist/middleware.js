module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 157);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}


/***/ },
/* 1 */
/***/ function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}


/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = "2"


/***/ },
/* 4 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 5 */
/***/ function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}


/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = exports.element = exports.resolved = exports.compose = exports.pipe = exports.path = exports.prevPropsKey = exports.options = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.create = create;

var _path = __webpack_require__(40);

Object.defineProperty(exports, 'path', {
    enumerable: true,
    get: function () {
        return _interopRequireDefault(_path).default;
    }
});

var _composition = __webpack_require__(38);

Object.defineProperty(exports, 'pipe', {
    enumerable: true,
    get: function () {
        return _composition.pipe;
    }
});
Object.defineProperty(exports, 'compose', {
    enumerable: true,
    get: function () {
        return _composition.compose;
    }
});

var _await = __webpack_require__(29);

Object.defineProperty(exports, 'resolved', {
    enumerable: true,
    get: function () {
        return _await.resolved;
    }
});

var _virtualDom = __webpack_require__(16);

var _orderlyQueue = __webpack_require__(48);

var _orderlyQueue2 = _interopRequireDefault(_orderlyQueue);

var _implementation = __webpack_require__(39);

var _implementation2 = _interopRequireDefault(_implementation);

var _environment = __webpack_require__(14);

var _environment2 = _interopRequireDefault(_environment);

var _html = __webpack_require__(30);

var _html2 = _interopRequireDefault(_html);

var _rescue = __webpack_require__(34);

var _loading = __webpack_require__(31);

var _refs = __webpack_require__(33);

var _messages = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @constant options
 * @type {Object}
 */
const options = exports.options = {
    DEFAULT: 1,
    ASYNC: 2,
    RESET: 4,
    DEFER: 8
};

/**
 * @constant queueKey
 * @type {Symbol}
 */
const queueKey = Symbol('switzerland/queue');

/**
 * @constant prevPropsKey
 * @type {Symbol}
 */
const prevPropsKey = exports.prevPropsKey = Symbol('switzerland/last-props');

/**
 * @method clearHTMLFor
 * @param {HTMLElement} node
 * @return {void}
 */
const clearHTMLFor = function (node) {
    node.shadowRoot.innerHTML = '';
};

/**
 * @method isAttached
 * @param {HTMLElement} node
 * @return {Boolean}
 */
const isAttached = function (node) {
    return 'isConnected' in node ? node.isConnected : document.contains(node);
};

/**
 * @method handle
 * @param {HTMLElement} node
 * @param {Function} component
 * @return {Object}
 */
const handle = function () {
    var _ref = _asyncToGenerator(function* (node, component) {

        const render = node.render.bind(node);
        const attached = isAttached(node);
        const props = 'error' in Object(node[prevPropsKey].props) ? null : node[prevPropsKey].props || null;
        const prevProps = { [_loading.vDomPropsKey]: node[prevPropsKey], prevProps: props };

        try {

            // Render the component and yield the `props` along with the virtual-dom vtree.
            const props = yield component(_extends({ node, render, attached }, prevProps));
            return { props, tree: (0, _html.htmlFor)(props) };
        } catch (err) {

            // As the component has raised an error during the processing of its middleware, we'll attempt
            // to find the error vtree from the component's `error` middleware, otherwise we'll use the
            // Switzerland default vtree as well as raising an error to prevent the component from being
            // rendered in an invalid state.
            const componentError = (0, _rescue.htmlErrorFor)(node) || (0, _html2.default)(function (props) {

                if ((0, _environment2.default)()) {

                    // Display the uncaught error.
                    const nodeName = props.node.nodeName.toLowerCase();
                    (0, _messages.error)('<' + nodeName + ' /> threw an uncaught error when rendering: ' + (props.error.message || props.error));
                }

                return element('span', null);
            });

            try {

                // Invoke the middleware for rendering the error vtree for the component.
                const props = yield componentError({ node, render: function () {
                        return render(false);
                    }, attached, error: err });
                return { props, tree: (0, _html.htmlFor)(props) || element('span', null) };
            } catch (err) {

                // Catch any errors that were thrown in the error handler, which is forbidden as otherwise
                // we'd be entering an Inception-esque down-the-rabbit-hole labyrinth.
                (0, _messages.error)('Throwing an error within an error handler is forbidden, and as such should be entirely side-effect free');
                return { props: { node }, tree: element('span', null) };
            }
        }
    });

    return function handle(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * @method transition
 * @param {HTMLElement} node
 * @param {Object} tree
 * @param {Object} props
 * @param {HTMLElement} currentRoot
 * @return {Object}
 */
const transition = function () {
    var _ref2 = _asyncToGenerator(function* (node, tree, props, currentRoot) {

        // Prevent any interactions with the current root, as technically it is now inactive.
        currentRoot.style.pointerEvents = 'none';

        // Render the updated vtree and hide it.
        const boundary = node.shadowRoot;
        const root = (0, _virtualDom.create)(tree);
        root.style.display = 'none';
        boundary.insertBefore(root, boundary.firstChild);

        // Wait until the children have been resolved.
        yield (0, _await.children)(props);

        // ...And then remove the previous child and show the newly rendered vtree.
        currentRoot.remove();
        root.style.display = 'block';

        return { node, tree, root };
    });

    return function transition(_x3, _x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}();

/**
 * @method create
 * @param {String} name
 * @param {Function} component
 * @return {void}
 */
function create(name, component) {

    /**
     * @constant component
     * @type {Object}
     */
    _implementation2.default.customElement(name, {

        /**
         * @method connectedCallback
         * @return {void}
         */
        connected() {
            var _this = this;

            const queue = this[queueKey] = new _orderlyQueue2.default({ value: '', next: function (prevProps) {

                    // Memorise the previous props as it's useful in the methods middleware.
                    _this[prevPropsKey] = prevProps;
                } });

            queue.process(_asyncToGenerator(function* () {

                // Setup the shadow boundary for the current node.
                const node = _this;
                node.shadowRoot && clearHTMLFor(node);
                const boundary = node.shadowRoot || _implementation2.default.shadowBoundary(node);

                try {

                    // Apply the middleware and wait for the props to be returned.
                    var _ref4 = yield handle(node, component);

                    const props = _ref4.props,
                          tree = _ref4.tree;

                    // Setup the Virtual DOM instance, and then append the component to the DOM.

                    const root = (0, _virtualDom.create)(tree);
                    boundary.insertBefore(root, boundary.firstChild);

                    // Invoke any ref callbacks defined in the component's `render` method.
                    'ref' in props && (0, _refs.invokeFor)(node);

                    /**
                     * @constant resolved
                     * @type {Promise}
                     */
                    node.resolved = _asyncToGenerator(function* () {

                        // Setup listener for children being resolved.
                        yield (0, _await.children)(props);

                        // Emit the event that the node has been resolved.
                        node.dispatchEvent(new window.CustomEvent(_await.awaitEventName, {
                            detail: node,
                            bubbles: true,
                            composed: true
                        }));

                        return node;
                    })();

                    return { tree, root, node, props };
                } catch (err) {

                    // Capture any errors that were thrown in processing the component.
                    (0, _messages.error)(err);
                }
            }));
        },

        /**
         * @method disconnectedCallback
         * @return {void}
         */
        disconnected() {

            clearHTMLFor(this);

            // Once the node has been removed then we perform one last pass, however the render function
            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
            this.render();
        },

        /**
         * @method render
         * @param {Boolean} [delta = true]
         * @return {void}
         */
        render(delta = true) {

            this[queueKey].process(function () {
                var _ref6 = _asyncToGenerator(function* (instance) {

                    // Gather the props from the previous rendering of the component.
                    const currentTree = instance.tree,
                          currentRoot = instance.root,
                          node = instance.node;


                    try {

                        // Apply the middleware and wait for the props to be returned.
                        var _ref7 = yield handle(node, component);

                        const props = _ref7.props,
                              tree = _ref7.tree;

                        // Use either the loading root and tree, or from the previous render.

                        const patchRoot = _loading.vDomPropsKey in props ? props[_loading.vDomPropsKey].root : currentRoot;
                        const patchTree = _loading.vDomPropsKey in props ? props[_loading.vDomPropsKey].tree : currentTree;

                        // Clear any previously defined refs for the current component.
                        'ref' in props && (0, _refs.purgeFor)(node);

                        if (node.isConnected) {

                            // Determine whether we're transitioning or patching.
                            return delta ? function () {

                                // Diff and patch the current DOM state with the new one.
                                const patches = (0, _virtualDom.diff)(patchTree, tree);
                                const root = (0, _virtualDom.patch)(patchRoot, patches);

                                // Invoke any ref callbacks defined in the component's `render` method.
                                'ref' in props && (0, _refs.invokeFor)(node);

                                return { node, tree, root, props };
                            }() : transition(node, tree, props, patchRoot);
                        }
                    } catch (err) {

                        // Capture any errors that were thrown in processing the component.
                        (0, _messages.error)(err);
                    }
                });

                return function (_x7) {
                    return _ref6.apply(this, arguments);
                };
            }());
        }

    });
}

/**
 * @method element
 * @param {HTMLElement} el
 * @param {Object} props
 * @param {Array} children
 * @return {Object}
 */
const element = exports.element = function (el, props, ...children) {
    return (0, _virtualDom.h)(el, props, children);
};

/**
 * @method h
 * @alias element
 * @return {Object}
 */
const h = exports.h = element;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(102)
var ieee754 = __webpack_require__(131)
var isArray = __webpack_require__(83)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(5);
/*</replacement>*/

var Readable = __webpack_require__(87);
var Writable = __webpack_require__(57);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ },
/* 12 */
/***/ function(module, exports) {

var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}


/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("ramda");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _once = __webpack_require__(55);

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant env
 * @type {String}
 */
const env = function () {

    try {
        return process.env.NODE_ENV;
    } catch (err) {
        return 'development';
    }
}();

/**
 * @method isDevelopment
 * @return {Boolean}
 */
exports.default = (0, _once2.default)(function () {
    return env === 'development';
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warning = exports.error = undefined;

var _environment = __webpack_require__(14);

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method message
 * @param {String} text
 * @param {Function} fn
 * @return {void}
 */
const message = function (text, fn) {
  return (0, _environment2.default)() && fn('Switzerland \uD83C\uDDE8\uD83C\uDDED ' + text + '.');
};

/**
 * @method error
 * @param {String} text
 * @return {void}
 */
const error = exports.error = function (text) {
  return message(text, window.console.error);
};

/**
 * @method warning
 * @param {String} text
 * @return {void}
 */
const warning = exports.warning = function (text) {
  return message(text, window.console.warn);
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var diff = __webpack_require__(62)
var patch = __webpack_require__(64)
var h = __webpack_require__(63)
var create = __webpack_require__(61)
var VNode = __webpack_require__(26)
var VText = __webpack_require__(28)

module.exports = {
    diff: diff,
    patch: patch,
    h: h,
    create: create,
    VNode: VNode,
    VText: VText
}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10).Buffer))

/***/ },
/* 18 */
/***/ function(module, exports) {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>
	Doctype: "doctype",

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};


/***/ },
/* 19 */
/***/ function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = __webpack_require__(75);

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(79),
    DomHandler = __webpack_require__(107);

function defineProp(name, value){
	delete module.exports[name];
	module.exports[name] = value;
	return value;
}

module.exports = {
	Parser: Parser,
	Tokenizer: __webpack_require__(80),
	ElementType: __webpack_require__(18),
	DomHandler: DomHandler,
	get FeedHandler(){
		return defineProp("FeedHandler", __webpack_require__(128));
	},
	get Stream(){
		return defineProp("Stream", __webpack_require__(130));
	},
	get WritableStream(){
		return defineProp("WritableStream", __webpack_require__(81));
	},
	get ProxyHandler(){
		return defineProp("ProxyHandler", __webpack_require__(129));
	},
	get DomUtils(){
		return defineProp("DomUtils", __webpack_require__(109));
	},
	get CollectingHandler(){
		return defineProp("CollectingHandler", __webpack_require__(127));
	},
	// For legacy support
	DefaultHandler: DomHandler,
	get RssHandler(){
		return defineProp("RssHandler", this.FeedHandler);
	},
	//helper methods
	parseDOM: function(data, options){
		var handler = new DomHandler(options);
		new Parser(handler, options).end(data);
		return handler.dom;
	},
	parseFeed: function(feed, options){
		var handler = new module.exports.FeedHandler(options);
		new Parser(handler, options).end(feed);
		return handler.dom;
	},
	createDomStream: function(cb, options, elementCb){
		var handler = new DomHandler(cb, options, elementCb);
		return new Parser(handler, options);
	},
	// List of all events that the parser emits
	EVENTS: { /* Format: eventname: number of arguments */
		attribute: 2,
		cdatastart: 0,
		cdataend: 0,
		text: 1,
		processinginstruction: 2,
		comment: 1,
		commentend: 0,
		closetag: 1,
		opentag: 2,
		opentagname: 1,
		error: 1,
		end: 0
	}
};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22)
var isHook = __webpack_require__(7)

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var document = __webpack_require__(20)

var applyProperties = __webpack_require__(23)

var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(8)
var isWidget = __webpack_require__(0)
var handleThunk = __webpack_require__(25)

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName.toLowerCase()) :
        doc.createElementNS(vnode.namespace, vnode.tagName.toLowerCase())

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(8)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(6)

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)
var isVNode = __webpack_require__(2)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(6)
var isVHook = __webpack_require__(7)

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var version = __webpack_require__(3)

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @constant awaitKey
 * @type {Symbol}
 */
const awaitKey = exports.awaitKey = Symbol('switzerland/await');

/**
 * @constant awaitEventName
 * @type {String}
 */
const awaitEventName = exports.awaitEventName = 'switzerland/resolved';

/**
 * @method children
 * @param {Object} props
 * @return {Promise}
 */
const children = exports.children = function (props) {

    const waitFor = new Map();
    const node = props.node;

    const boundary = node.shadowRoot;

    return awaitKey in props ? new Promise(function (resolve) {

        /**
         * @method resolved
         * @param {Object} event
         * @return {void}
         */
        function resolved(event) {

            // Resolve the current node if we have it in the map.
            waitFor.has(event.detail) && waitFor.set(event.detail, true);

            // Determine whether all awaiting nodes have been resolved, and if so then we'll
            // resolve the current node.
            Array.from(waitFor.values()).every(function (resolved) {
                return resolved === true;
            }) && done(node);
        }

        /**
         * @method done
         * @param {HTMLElement} node
         * @return {void}
         */
        function done(node) {

            // Tree has been resolved.
            node.removeEventListener(awaitEventName, resolved);
            resolve(waitFor);
            props.node.classList.add('resolved');
        }

        node.addEventListener(awaitEventName, resolved);

        // Place all of the nodes we're awaiting into the map.
        const nodeNames = props[awaitKey].join(',');

        // Attempt to find any matching nodes and await their resolution.
        const nodes = nodeNames.length && boundary.querySelectorAll(nodeNames);
        Array.from(nodes).forEach(function (awaitNode) {
            return waitFor.set(awaitNode, false);
        });

        // If we were unable to find any of the `await` nodes then we'll simply resolve.
        !nodes.length && done(node);
    }) : Promise.resolve() && props.node.classList.add('resolved');
};

/**
 * @method resolved
 * @param {HTMLElement} node
 * @return {Promise}
 */
const resolved = exports.resolved = function (node) {

    return 'resolved' in node ? node.resolved : new Promise(function (resolve) {

        node.addEventListener(awaitEventName, function resolved(event) {

            if (event.detail === node) {
                node.removeEventListener(awaitEventName, resolved);
                node.resolved.then(function () {
                    return resolve(node);
                });
            }
        });
    });
};

/**
 * @param {String[]|String} nodes
 * @return {Function}
 */

exports.default = function (...nodes) {

    const nodeTags = Array.isArray(nodes) ? nodes : [nodes];

    return function (props) {
        return _extends({}, props, { [awaitKey]: nodeTags });
    };
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @constant htmlKey
 * @type {Symbol}
 */
const htmlKey = exports.htmlKey = Symbol('switzerland/html');

/**
 * @method htmlFor
 * @param {Object} model
 * @return {Object}
 */
const htmlFor = exports.htmlFor = function (model) {
  return model[htmlKey];
};

/**
 * @param {Function} html
 * @return {Function}
 */

exports.default = function (html) {

  return function (props) {
    return _extends({}, props, { [htmlKey]: html(props) });
  };
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vDomPropsKey = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _virtualDom = __webpack_require__(16);

/**
 * @constant vDomPropsKey
 * @type {Symbol}
 */
const vDomPropsKey = exports.vDomPropsKey = Symbol('switzerland/vdom-props');

/**
 * @param {Function} html
 * @return {Function}
 */

exports.default = function (html) {

    return function (props) {
        var _props$vDomPropsKey = props[vDomPropsKey];
        const currentTree = _props$vDomPropsKey.tree,
              currentRoot = _props$vDomPropsKey.root;


        const patchTree = props.tree || currentTree;
        const patchRoot = props.root || currentRoot;

        if (props.prevProps) {

            const tree = html(_extends({}, props.prevProps, { loading: true }));
            const patches = (0, _virtualDom.diff)(patchTree, tree);
            const root = (0, _virtualDom.patch)(patchRoot, patches);

            return _extends({}, props, { [vDomPropsKey]: { root, tree } });
        }

        return props;
    };
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = __webpack_require__(13);

var _switzerland = __webpack_require__(9);

/**
 * @constant once
 * @type {WeakMap}
 */
const once = new WeakMap();

/**
 * @param {Function} fn
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */

exports.default = function (fn, flags = _switzerland.options.DEFAULT) {

    return function (props) {

        const key = props.node;

        // Ensure the node has an entry in the map.
        const hasNode = once.has(key);
        !hasNode && once.set(key, new WeakMap());

        // Determine whether the function has been called already.
        const hasFunction = once.get(key).has(fn);
        !hasFunction && once.get(key).set(fn, fn(props));

        // Only promises will be yielded in the next tick, whereas functions that
        // yield objects will return immediately.
        const response = once.get(key).get(fn);

        // Remove the callback if the node has been deleted, which will cause it to be invoked
        // again if the node is re-added.
        flags & _switzerland.options.RESET && !props.attached && once.get(key).delete(fn);

        return 'then' in Object(response) ? response.then((0, _ramda.merge)(_ramda.__, props)) : _extends({}, response, props);
    };
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @constant refs
 * @type {WeakMap}
 */
const refs = new WeakMap();

/**
 * Invoke each defined refs once the node(s) have been appended to the DOM. This is
 * in contract to Virtual DOM's default behaviour which invokes refs without them
 * being in the DOM. This of course causes issues for props that rely on a node's
 * presence in the DOM, such as a node's dimensions.
 *
 * @method invokeFor
 * @props {HTMLElement} node
 * @return {Array}
 */
const invokeFor = exports.invokeFor = function (node) {

    const hooks = refs.get(node) || [];

    // Iterate over each defined refs and invoke it.
    Array.from(hooks.keys()).forEach(function (key) {
        hooks.get(key)(key);
    });
};

/**
 * Responsible for purging all of a node's defined refs.
 *
 * @method purgeFor
 * @param {HTMLElement} node
 * @return {void}
 */
const purgeFor = exports.purgeFor = function (node) {
    const hooks = refs.get(node);
    hooks && hooks.clear(node);
};

/**
 * @param {Object} props
 * @return {Object}
 */

exports.default = function (props) {

    const hasRef = refs.has(props.node);
    !hasRef && refs.set(props.node, new Map());
    const hooks = refs.get(props.node);

    const ref = function (fn) {

        // See: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md
        const Hook = function () {};
        Hook.prototype.hook = function (node) {
            return hooks.set(node, fn);
        };
        return new Hook();
    };

    // Delete the refs if the node has been removed from the DOM.
    hasRef && !props.attached && refs.delete(props.node);

    return _extends({}, props, { ref });
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @constant handlers
 * @type {WeakMap}
 */
const handlers = new WeakMap();

/**
 * @method htmlErrorFor
 * @return {Object}
 */
const htmlErrorFor = exports.htmlErrorFor = function (node) {
  return handlers.get(node);
};

/**
 * @param {Function} html
 * @return {Function}
 */

exports.default = function (html) {

  return function (props) {

    // Assign the HTML error function to the node if it hasn't yet been defined.
    !handlers.has[props.node] && handlers.set(props.node, html);

    return props;
  };
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var isWindows = process.platform === 'win32';

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

win32.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};



// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


posix.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


if (isWindows)
  module.exports = win32.parse;
else /* posix */
  module.exports = posix.parse;

module.exports.posix = posix.parse;
module.exports.win32 = win32.parse;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(19).EventEmitter;
var inherits = __webpack_require__(5);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(139);
Stream.Writable = __webpack_require__(141);
Stream.Duplex = __webpack_require__(136);
Stream.Transform = __webpack_require__(140);
Stream.PassThrough = __webpack_require__(138);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(58);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = exports.pipe = undefined;

var _promisedPipe = __webpack_require__(50);

var _promisedPipe2 = _interopRequireDefault(_promisedPipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method pipe
 * @param {Array} fns
 * @return {Function}
 */
const pipe = exports.pipe = _promisedPipe2.default;

/**
 * @constant compose
 * @param {Array} fns
 * @return {Object}
 */
const compose = exports.compose = function (...fns) {
  return pipe(fns.reverse());
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @constant implementations
 * @type {Object}
 */
const implementations = {

    v0: {

        /**
         * @method customElement
         * @param {String} tag
         * @param {Object} component
         * @return {void}
         */
        customElement: function (tag, component) {

            const prototype = Object.create(window.HTMLElement.prototype, {
                createdCallback: {
                    value: component.connected
                },
                detachedCallback: {
                    value: component.disconnected
                }
            });

            prototype.render = component.render;
            document.registerElement(tag, { prototype });
        },

        /**
         * @method shadowBoundary
         * @param {HTMLElement} node
         * @return {void}
         */
        shadowBoundary: function (node) {
            return node.createShadowRoot();
        }
    },
    v1: {

        /**
         * @method customElement
         * @param {String} tag
         * @param {Object} component
         * @return {void}
         */
        customElement: function (tag, component) {

            window.customElements.define(tag, class extends window.HTMLElement {
                connectedCallback() {
                    component.connected.apply(this);
                }
                disconnectedCallback() {
                    component.disconnected.apply(this);
                }
                render(transition) {
                    component.render.call(this, transition);
                }
            });
        },

        /**
         * @method shadowBoundary
         * @param {HTMLElement} node
         * @return {void}
         */
        shadowBoundary: function (node) {
            return node.attachShadow({ mode: 'open' });
        }
    }

};

exports.default = typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pathParse = __webpack_require__(35);

var _pathParse2 = _interopRequireDefault(_pathParse);

var _messages = __webpack_require__(15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant scriptPath
 * @return {String|void}
 */
const scriptPath = function () {

    try {
        return (0, _pathParse2.default)(document.currentScript.getAttribute('src')).dir;
    } catch (err) {}

    try {
        return (0, _pathParse2.default)(self.location.href).dir;
    } catch (err) {}

    typeof _messages.error === 'function' && (0, _messages.error)('Unable to determine the path for the current component');
}();

exports.default = function () {

    /**
     * @method path
     * @param {String} file
     * @return {String}
     */
    const path = function (file) {
        return scriptPath + '/' + file;
    };

    /**
     * @method toString
     * @return {String}
     */
    path.toString = function () {
        return scriptPath;
    };

    return path;
}();

/***/ },
/* 41 */
/***/ function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var buffer = __webpack_require__(10);
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var OneVersionConstraint = __webpack_require__(45);

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Individual = __webpack_require__(44);

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}


/***/ },
/* 46 */
/***/ function(module, exports) {

module.exports = {
	"Aacute": "Á",
	"aacute": "á",
	"Abreve": "Ă",
	"abreve": "ă",
	"ac": "∾",
	"acd": "∿",
	"acE": "∾̳",
	"Acirc": "Â",
	"acirc": "â",
	"acute": "´",
	"Acy": "А",
	"acy": "а",
	"AElig": "Æ",
	"aelig": "æ",
	"af": "⁡",
	"Afr": "𝔄",
	"afr": "𝔞",
	"Agrave": "À",
	"agrave": "à",
	"alefsym": "ℵ",
	"aleph": "ℵ",
	"Alpha": "Α",
	"alpha": "α",
	"Amacr": "Ā",
	"amacr": "ā",
	"amalg": "⨿",
	"amp": "&",
	"AMP": "&",
	"andand": "⩕",
	"And": "⩓",
	"and": "∧",
	"andd": "⩜",
	"andslope": "⩘",
	"andv": "⩚",
	"ang": "∠",
	"ange": "⦤",
	"angle": "∠",
	"angmsdaa": "⦨",
	"angmsdab": "⦩",
	"angmsdac": "⦪",
	"angmsdad": "⦫",
	"angmsdae": "⦬",
	"angmsdaf": "⦭",
	"angmsdag": "⦮",
	"angmsdah": "⦯",
	"angmsd": "∡",
	"angrt": "∟",
	"angrtvb": "⊾",
	"angrtvbd": "⦝",
	"angsph": "∢",
	"angst": "Å",
	"angzarr": "⍼",
	"Aogon": "Ą",
	"aogon": "ą",
	"Aopf": "𝔸",
	"aopf": "𝕒",
	"apacir": "⩯",
	"ap": "≈",
	"apE": "⩰",
	"ape": "≊",
	"apid": "≋",
	"apos": "'",
	"ApplyFunction": "⁡",
	"approx": "≈",
	"approxeq": "≊",
	"Aring": "Å",
	"aring": "å",
	"Ascr": "𝒜",
	"ascr": "𝒶",
	"Assign": "≔",
	"ast": "*",
	"asymp": "≈",
	"asympeq": "≍",
	"Atilde": "Ã",
	"atilde": "ã",
	"Auml": "Ä",
	"auml": "ä",
	"awconint": "∳",
	"awint": "⨑",
	"backcong": "≌",
	"backepsilon": "϶",
	"backprime": "‵",
	"backsim": "∽",
	"backsimeq": "⋍",
	"Backslash": "∖",
	"Barv": "⫧",
	"barvee": "⊽",
	"barwed": "⌅",
	"Barwed": "⌆",
	"barwedge": "⌅",
	"bbrk": "⎵",
	"bbrktbrk": "⎶",
	"bcong": "≌",
	"Bcy": "Б",
	"bcy": "б",
	"bdquo": "„",
	"becaus": "∵",
	"because": "∵",
	"Because": "∵",
	"bemptyv": "⦰",
	"bepsi": "϶",
	"bernou": "ℬ",
	"Bernoullis": "ℬ",
	"Beta": "Β",
	"beta": "β",
	"beth": "ℶ",
	"between": "≬",
	"Bfr": "𝔅",
	"bfr": "𝔟",
	"bigcap": "⋂",
	"bigcirc": "◯",
	"bigcup": "⋃",
	"bigodot": "⨀",
	"bigoplus": "⨁",
	"bigotimes": "⨂",
	"bigsqcup": "⨆",
	"bigstar": "★",
	"bigtriangledown": "▽",
	"bigtriangleup": "△",
	"biguplus": "⨄",
	"bigvee": "⋁",
	"bigwedge": "⋀",
	"bkarow": "⤍",
	"blacklozenge": "⧫",
	"blacksquare": "▪",
	"blacktriangle": "▴",
	"blacktriangledown": "▾",
	"blacktriangleleft": "◂",
	"blacktriangleright": "▸",
	"blank": "␣",
	"blk12": "▒",
	"blk14": "░",
	"blk34": "▓",
	"block": "█",
	"bne": "=⃥",
	"bnequiv": "≡⃥",
	"bNot": "⫭",
	"bnot": "⌐",
	"Bopf": "𝔹",
	"bopf": "𝕓",
	"bot": "⊥",
	"bottom": "⊥",
	"bowtie": "⋈",
	"boxbox": "⧉",
	"boxdl": "┐",
	"boxdL": "╕",
	"boxDl": "╖",
	"boxDL": "╗",
	"boxdr": "┌",
	"boxdR": "╒",
	"boxDr": "╓",
	"boxDR": "╔",
	"boxh": "─",
	"boxH": "═",
	"boxhd": "┬",
	"boxHd": "╤",
	"boxhD": "╥",
	"boxHD": "╦",
	"boxhu": "┴",
	"boxHu": "╧",
	"boxhU": "╨",
	"boxHU": "╩",
	"boxminus": "⊟",
	"boxplus": "⊞",
	"boxtimes": "⊠",
	"boxul": "┘",
	"boxuL": "╛",
	"boxUl": "╜",
	"boxUL": "╝",
	"boxur": "└",
	"boxuR": "╘",
	"boxUr": "╙",
	"boxUR": "╚",
	"boxv": "│",
	"boxV": "║",
	"boxvh": "┼",
	"boxvH": "╪",
	"boxVh": "╫",
	"boxVH": "╬",
	"boxvl": "┤",
	"boxvL": "╡",
	"boxVl": "╢",
	"boxVL": "╣",
	"boxvr": "├",
	"boxvR": "╞",
	"boxVr": "╟",
	"boxVR": "╠",
	"bprime": "‵",
	"breve": "˘",
	"Breve": "˘",
	"brvbar": "¦",
	"bscr": "𝒷",
	"Bscr": "ℬ",
	"bsemi": "⁏",
	"bsim": "∽",
	"bsime": "⋍",
	"bsolb": "⧅",
	"bsol": "\\",
	"bsolhsub": "⟈",
	"bull": "•",
	"bullet": "•",
	"bump": "≎",
	"bumpE": "⪮",
	"bumpe": "≏",
	"Bumpeq": "≎",
	"bumpeq": "≏",
	"Cacute": "Ć",
	"cacute": "ć",
	"capand": "⩄",
	"capbrcup": "⩉",
	"capcap": "⩋",
	"cap": "∩",
	"Cap": "⋒",
	"capcup": "⩇",
	"capdot": "⩀",
	"CapitalDifferentialD": "ⅅ",
	"caps": "∩︀",
	"caret": "⁁",
	"caron": "ˇ",
	"Cayleys": "ℭ",
	"ccaps": "⩍",
	"Ccaron": "Č",
	"ccaron": "č",
	"Ccedil": "Ç",
	"ccedil": "ç",
	"Ccirc": "Ĉ",
	"ccirc": "ĉ",
	"Cconint": "∰",
	"ccups": "⩌",
	"ccupssm": "⩐",
	"Cdot": "Ċ",
	"cdot": "ċ",
	"cedil": "¸",
	"Cedilla": "¸",
	"cemptyv": "⦲",
	"cent": "¢",
	"centerdot": "·",
	"CenterDot": "·",
	"cfr": "𝔠",
	"Cfr": "ℭ",
	"CHcy": "Ч",
	"chcy": "ч",
	"check": "✓",
	"checkmark": "✓",
	"Chi": "Χ",
	"chi": "χ",
	"circ": "ˆ",
	"circeq": "≗",
	"circlearrowleft": "↺",
	"circlearrowright": "↻",
	"circledast": "⊛",
	"circledcirc": "⊚",
	"circleddash": "⊝",
	"CircleDot": "⊙",
	"circledR": "®",
	"circledS": "Ⓢ",
	"CircleMinus": "⊖",
	"CirclePlus": "⊕",
	"CircleTimes": "⊗",
	"cir": "○",
	"cirE": "⧃",
	"cire": "≗",
	"cirfnint": "⨐",
	"cirmid": "⫯",
	"cirscir": "⧂",
	"ClockwiseContourIntegral": "∲",
	"CloseCurlyDoubleQuote": "”",
	"CloseCurlyQuote": "’",
	"clubs": "♣",
	"clubsuit": "♣",
	"colon": ":",
	"Colon": "∷",
	"Colone": "⩴",
	"colone": "≔",
	"coloneq": "≔",
	"comma": ",",
	"commat": "@",
	"comp": "∁",
	"compfn": "∘",
	"complement": "∁",
	"complexes": "ℂ",
	"cong": "≅",
	"congdot": "⩭",
	"Congruent": "≡",
	"conint": "∮",
	"Conint": "∯",
	"ContourIntegral": "∮",
	"copf": "𝕔",
	"Copf": "ℂ",
	"coprod": "∐",
	"Coproduct": "∐",
	"copy": "©",
	"COPY": "©",
	"copysr": "℗",
	"CounterClockwiseContourIntegral": "∳",
	"crarr": "↵",
	"cross": "✗",
	"Cross": "⨯",
	"Cscr": "𝒞",
	"cscr": "𝒸",
	"csub": "⫏",
	"csube": "⫑",
	"csup": "⫐",
	"csupe": "⫒",
	"ctdot": "⋯",
	"cudarrl": "⤸",
	"cudarrr": "⤵",
	"cuepr": "⋞",
	"cuesc": "⋟",
	"cularr": "↶",
	"cularrp": "⤽",
	"cupbrcap": "⩈",
	"cupcap": "⩆",
	"CupCap": "≍",
	"cup": "∪",
	"Cup": "⋓",
	"cupcup": "⩊",
	"cupdot": "⊍",
	"cupor": "⩅",
	"cups": "∪︀",
	"curarr": "↷",
	"curarrm": "⤼",
	"curlyeqprec": "⋞",
	"curlyeqsucc": "⋟",
	"curlyvee": "⋎",
	"curlywedge": "⋏",
	"curren": "¤",
	"curvearrowleft": "↶",
	"curvearrowright": "↷",
	"cuvee": "⋎",
	"cuwed": "⋏",
	"cwconint": "∲",
	"cwint": "∱",
	"cylcty": "⌭",
	"dagger": "†",
	"Dagger": "‡",
	"daleth": "ℸ",
	"darr": "↓",
	"Darr": "↡",
	"dArr": "⇓",
	"dash": "‐",
	"Dashv": "⫤",
	"dashv": "⊣",
	"dbkarow": "⤏",
	"dblac": "˝",
	"Dcaron": "Ď",
	"dcaron": "ď",
	"Dcy": "Д",
	"dcy": "д",
	"ddagger": "‡",
	"ddarr": "⇊",
	"DD": "ⅅ",
	"dd": "ⅆ",
	"DDotrahd": "⤑",
	"ddotseq": "⩷",
	"deg": "°",
	"Del": "∇",
	"Delta": "Δ",
	"delta": "δ",
	"demptyv": "⦱",
	"dfisht": "⥿",
	"Dfr": "𝔇",
	"dfr": "𝔡",
	"dHar": "⥥",
	"dharl": "⇃",
	"dharr": "⇂",
	"DiacriticalAcute": "´",
	"DiacriticalDot": "˙",
	"DiacriticalDoubleAcute": "˝",
	"DiacriticalGrave": "`",
	"DiacriticalTilde": "˜",
	"diam": "⋄",
	"diamond": "⋄",
	"Diamond": "⋄",
	"diamondsuit": "♦",
	"diams": "♦",
	"die": "¨",
	"DifferentialD": "ⅆ",
	"digamma": "ϝ",
	"disin": "⋲",
	"div": "÷",
	"divide": "÷",
	"divideontimes": "⋇",
	"divonx": "⋇",
	"DJcy": "Ђ",
	"djcy": "ђ",
	"dlcorn": "⌞",
	"dlcrop": "⌍",
	"dollar": "$",
	"Dopf": "𝔻",
	"dopf": "𝕕",
	"Dot": "¨",
	"dot": "˙",
	"DotDot": "⃜",
	"doteq": "≐",
	"doteqdot": "≑",
	"DotEqual": "≐",
	"dotminus": "∸",
	"dotplus": "∔",
	"dotsquare": "⊡",
	"doublebarwedge": "⌆",
	"DoubleContourIntegral": "∯",
	"DoubleDot": "¨",
	"DoubleDownArrow": "⇓",
	"DoubleLeftArrow": "⇐",
	"DoubleLeftRightArrow": "⇔",
	"DoubleLeftTee": "⫤",
	"DoubleLongLeftArrow": "⟸",
	"DoubleLongLeftRightArrow": "⟺",
	"DoubleLongRightArrow": "⟹",
	"DoubleRightArrow": "⇒",
	"DoubleRightTee": "⊨",
	"DoubleUpArrow": "⇑",
	"DoubleUpDownArrow": "⇕",
	"DoubleVerticalBar": "∥",
	"DownArrowBar": "⤓",
	"downarrow": "↓",
	"DownArrow": "↓",
	"Downarrow": "⇓",
	"DownArrowUpArrow": "⇵",
	"DownBreve": "̑",
	"downdownarrows": "⇊",
	"downharpoonleft": "⇃",
	"downharpoonright": "⇂",
	"DownLeftRightVector": "⥐",
	"DownLeftTeeVector": "⥞",
	"DownLeftVectorBar": "⥖",
	"DownLeftVector": "↽",
	"DownRightTeeVector": "⥟",
	"DownRightVectorBar": "⥗",
	"DownRightVector": "⇁",
	"DownTeeArrow": "↧",
	"DownTee": "⊤",
	"drbkarow": "⤐",
	"drcorn": "⌟",
	"drcrop": "⌌",
	"Dscr": "𝒟",
	"dscr": "𝒹",
	"DScy": "Ѕ",
	"dscy": "ѕ",
	"dsol": "⧶",
	"Dstrok": "Đ",
	"dstrok": "đ",
	"dtdot": "⋱",
	"dtri": "▿",
	"dtrif": "▾",
	"duarr": "⇵",
	"duhar": "⥯",
	"dwangle": "⦦",
	"DZcy": "Џ",
	"dzcy": "џ",
	"dzigrarr": "⟿",
	"Eacute": "É",
	"eacute": "é",
	"easter": "⩮",
	"Ecaron": "Ě",
	"ecaron": "ě",
	"Ecirc": "Ê",
	"ecirc": "ê",
	"ecir": "≖",
	"ecolon": "≕",
	"Ecy": "Э",
	"ecy": "э",
	"eDDot": "⩷",
	"Edot": "Ė",
	"edot": "ė",
	"eDot": "≑",
	"ee": "ⅇ",
	"efDot": "≒",
	"Efr": "𝔈",
	"efr": "𝔢",
	"eg": "⪚",
	"Egrave": "È",
	"egrave": "è",
	"egs": "⪖",
	"egsdot": "⪘",
	"el": "⪙",
	"Element": "∈",
	"elinters": "⏧",
	"ell": "ℓ",
	"els": "⪕",
	"elsdot": "⪗",
	"Emacr": "Ē",
	"emacr": "ē",
	"empty": "∅",
	"emptyset": "∅",
	"EmptySmallSquare": "◻",
	"emptyv": "∅",
	"EmptyVerySmallSquare": "▫",
	"emsp13": " ",
	"emsp14": " ",
	"emsp": " ",
	"ENG": "Ŋ",
	"eng": "ŋ",
	"ensp": " ",
	"Eogon": "Ę",
	"eogon": "ę",
	"Eopf": "𝔼",
	"eopf": "𝕖",
	"epar": "⋕",
	"eparsl": "⧣",
	"eplus": "⩱",
	"epsi": "ε",
	"Epsilon": "Ε",
	"epsilon": "ε",
	"epsiv": "ϵ",
	"eqcirc": "≖",
	"eqcolon": "≕",
	"eqsim": "≂",
	"eqslantgtr": "⪖",
	"eqslantless": "⪕",
	"Equal": "⩵",
	"equals": "=",
	"EqualTilde": "≂",
	"equest": "≟",
	"Equilibrium": "⇌",
	"equiv": "≡",
	"equivDD": "⩸",
	"eqvparsl": "⧥",
	"erarr": "⥱",
	"erDot": "≓",
	"escr": "ℯ",
	"Escr": "ℰ",
	"esdot": "≐",
	"Esim": "⩳",
	"esim": "≂",
	"Eta": "Η",
	"eta": "η",
	"ETH": "Ð",
	"eth": "ð",
	"Euml": "Ë",
	"euml": "ë",
	"euro": "€",
	"excl": "!",
	"exist": "∃",
	"Exists": "∃",
	"expectation": "ℰ",
	"exponentiale": "ⅇ",
	"ExponentialE": "ⅇ",
	"fallingdotseq": "≒",
	"Fcy": "Ф",
	"fcy": "ф",
	"female": "♀",
	"ffilig": "ﬃ",
	"fflig": "ﬀ",
	"ffllig": "ﬄ",
	"Ffr": "𝔉",
	"ffr": "𝔣",
	"filig": "ﬁ",
	"FilledSmallSquare": "◼",
	"FilledVerySmallSquare": "▪",
	"fjlig": "fj",
	"flat": "♭",
	"fllig": "ﬂ",
	"fltns": "▱",
	"fnof": "ƒ",
	"Fopf": "𝔽",
	"fopf": "𝕗",
	"forall": "∀",
	"ForAll": "∀",
	"fork": "⋔",
	"forkv": "⫙",
	"Fouriertrf": "ℱ",
	"fpartint": "⨍",
	"frac12": "½",
	"frac13": "⅓",
	"frac14": "¼",
	"frac15": "⅕",
	"frac16": "⅙",
	"frac18": "⅛",
	"frac23": "⅔",
	"frac25": "⅖",
	"frac34": "¾",
	"frac35": "⅗",
	"frac38": "⅜",
	"frac45": "⅘",
	"frac56": "⅚",
	"frac58": "⅝",
	"frac78": "⅞",
	"frasl": "⁄",
	"frown": "⌢",
	"fscr": "𝒻",
	"Fscr": "ℱ",
	"gacute": "ǵ",
	"Gamma": "Γ",
	"gamma": "γ",
	"Gammad": "Ϝ",
	"gammad": "ϝ",
	"gap": "⪆",
	"Gbreve": "Ğ",
	"gbreve": "ğ",
	"Gcedil": "Ģ",
	"Gcirc": "Ĝ",
	"gcirc": "ĝ",
	"Gcy": "Г",
	"gcy": "г",
	"Gdot": "Ġ",
	"gdot": "ġ",
	"ge": "≥",
	"gE": "≧",
	"gEl": "⪌",
	"gel": "⋛",
	"geq": "≥",
	"geqq": "≧",
	"geqslant": "⩾",
	"gescc": "⪩",
	"ges": "⩾",
	"gesdot": "⪀",
	"gesdoto": "⪂",
	"gesdotol": "⪄",
	"gesl": "⋛︀",
	"gesles": "⪔",
	"Gfr": "𝔊",
	"gfr": "𝔤",
	"gg": "≫",
	"Gg": "⋙",
	"ggg": "⋙",
	"gimel": "ℷ",
	"GJcy": "Ѓ",
	"gjcy": "ѓ",
	"gla": "⪥",
	"gl": "≷",
	"glE": "⪒",
	"glj": "⪤",
	"gnap": "⪊",
	"gnapprox": "⪊",
	"gne": "⪈",
	"gnE": "≩",
	"gneq": "⪈",
	"gneqq": "≩",
	"gnsim": "⋧",
	"Gopf": "𝔾",
	"gopf": "𝕘",
	"grave": "`",
	"GreaterEqual": "≥",
	"GreaterEqualLess": "⋛",
	"GreaterFullEqual": "≧",
	"GreaterGreater": "⪢",
	"GreaterLess": "≷",
	"GreaterSlantEqual": "⩾",
	"GreaterTilde": "≳",
	"Gscr": "𝒢",
	"gscr": "ℊ",
	"gsim": "≳",
	"gsime": "⪎",
	"gsiml": "⪐",
	"gtcc": "⪧",
	"gtcir": "⩺",
	"gt": ">",
	"GT": ">",
	"Gt": "≫",
	"gtdot": "⋗",
	"gtlPar": "⦕",
	"gtquest": "⩼",
	"gtrapprox": "⪆",
	"gtrarr": "⥸",
	"gtrdot": "⋗",
	"gtreqless": "⋛",
	"gtreqqless": "⪌",
	"gtrless": "≷",
	"gtrsim": "≳",
	"gvertneqq": "≩︀",
	"gvnE": "≩︀",
	"Hacek": "ˇ",
	"hairsp": " ",
	"half": "½",
	"hamilt": "ℋ",
	"HARDcy": "Ъ",
	"hardcy": "ъ",
	"harrcir": "⥈",
	"harr": "↔",
	"hArr": "⇔",
	"harrw": "↭",
	"Hat": "^",
	"hbar": "ℏ",
	"Hcirc": "Ĥ",
	"hcirc": "ĥ",
	"hearts": "♥",
	"heartsuit": "♥",
	"hellip": "…",
	"hercon": "⊹",
	"hfr": "𝔥",
	"Hfr": "ℌ",
	"HilbertSpace": "ℋ",
	"hksearow": "⤥",
	"hkswarow": "⤦",
	"hoarr": "⇿",
	"homtht": "∻",
	"hookleftarrow": "↩",
	"hookrightarrow": "↪",
	"hopf": "𝕙",
	"Hopf": "ℍ",
	"horbar": "―",
	"HorizontalLine": "─",
	"hscr": "𝒽",
	"Hscr": "ℋ",
	"hslash": "ℏ",
	"Hstrok": "Ħ",
	"hstrok": "ħ",
	"HumpDownHump": "≎",
	"HumpEqual": "≏",
	"hybull": "⁃",
	"hyphen": "‐",
	"Iacute": "Í",
	"iacute": "í",
	"ic": "⁣",
	"Icirc": "Î",
	"icirc": "î",
	"Icy": "И",
	"icy": "и",
	"Idot": "İ",
	"IEcy": "Е",
	"iecy": "е",
	"iexcl": "¡",
	"iff": "⇔",
	"ifr": "𝔦",
	"Ifr": "ℑ",
	"Igrave": "Ì",
	"igrave": "ì",
	"ii": "ⅈ",
	"iiiint": "⨌",
	"iiint": "∭",
	"iinfin": "⧜",
	"iiota": "℩",
	"IJlig": "Ĳ",
	"ijlig": "ĳ",
	"Imacr": "Ī",
	"imacr": "ī",
	"image": "ℑ",
	"ImaginaryI": "ⅈ",
	"imagline": "ℐ",
	"imagpart": "ℑ",
	"imath": "ı",
	"Im": "ℑ",
	"imof": "⊷",
	"imped": "Ƶ",
	"Implies": "⇒",
	"incare": "℅",
	"in": "∈",
	"infin": "∞",
	"infintie": "⧝",
	"inodot": "ı",
	"intcal": "⊺",
	"int": "∫",
	"Int": "∬",
	"integers": "ℤ",
	"Integral": "∫",
	"intercal": "⊺",
	"Intersection": "⋂",
	"intlarhk": "⨗",
	"intprod": "⨼",
	"InvisibleComma": "⁣",
	"InvisibleTimes": "⁢",
	"IOcy": "Ё",
	"iocy": "ё",
	"Iogon": "Į",
	"iogon": "į",
	"Iopf": "𝕀",
	"iopf": "𝕚",
	"Iota": "Ι",
	"iota": "ι",
	"iprod": "⨼",
	"iquest": "¿",
	"iscr": "𝒾",
	"Iscr": "ℐ",
	"isin": "∈",
	"isindot": "⋵",
	"isinE": "⋹",
	"isins": "⋴",
	"isinsv": "⋳",
	"isinv": "∈",
	"it": "⁢",
	"Itilde": "Ĩ",
	"itilde": "ĩ",
	"Iukcy": "І",
	"iukcy": "і",
	"Iuml": "Ï",
	"iuml": "ï",
	"Jcirc": "Ĵ",
	"jcirc": "ĵ",
	"Jcy": "Й",
	"jcy": "й",
	"Jfr": "𝔍",
	"jfr": "𝔧",
	"jmath": "ȷ",
	"Jopf": "𝕁",
	"jopf": "𝕛",
	"Jscr": "𝒥",
	"jscr": "𝒿",
	"Jsercy": "Ј",
	"jsercy": "ј",
	"Jukcy": "Є",
	"jukcy": "є",
	"Kappa": "Κ",
	"kappa": "κ",
	"kappav": "ϰ",
	"Kcedil": "Ķ",
	"kcedil": "ķ",
	"Kcy": "К",
	"kcy": "к",
	"Kfr": "𝔎",
	"kfr": "𝔨",
	"kgreen": "ĸ",
	"KHcy": "Х",
	"khcy": "х",
	"KJcy": "Ќ",
	"kjcy": "ќ",
	"Kopf": "𝕂",
	"kopf": "𝕜",
	"Kscr": "𝒦",
	"kscr": "𝓀",
	"lAarr": "⇚",
	"Lacute": "Ĺ",
	"lacute": "ĺ",
	"laemptyv": "⦴",
	"lagran": "ℒ",
	"Lambda": "Λ",
	"lambda": "λ",
	"lang": "⟨",
	"Lang": "⟪",
	"langd": "⦑",
	"langle": "⟨",
	"lap": "⪅",
	"Laplacetrf": "ℒ",
	"laquo": "«",
	"larrb": "⇤",
	"larrbfs": "⤟",
	"larr": "←",
	"Larr": "↞",
	"lArr": "⇐",
	"larrfs": "⤝",
	"larrhk": "↩",
	"larrlp": "↫",
	"larrpl": "⤹",
	"larrsim": "⥳",
	"larrtl": "↢",
	"latail": "⤙",
	"lAtail": "⤛",
	"lat": "⪫",
	"late": "⪭",
	"lates": "⪭︀",
	"lbarr": "⤌",
	"lBarr": "⤎",
	"lbbrk": "❲",
	"lbrace": "{",
	"lbrack": "[",
	"lbrke": "⦋",
	"lbrksld": "⦏",
	"lbrkslu": "⦍",
	"Lcaron": "Ľ",
	"lcaron": "ľ",
	"Lcedil": "Ļ",
	"lcedil": "ļ",
	"lceil": "⌈",
	"lcub": "{",
	"Lcy": "Л",
	"lcy": "л",
	"ldca": "⤶",
	"ldquo": "“",
	"ldquor": "„",
	"ldrdhar": "⥧",
	"ldrushar": "⥋",
	"ldsh": "↲",
	"le": "≤",
	"lE": "≦",
	"LeftAngleBracket": "⟨",
	"LeftArrowBar": "⇤",
	"leftarrow": "←",
	"LeftArrow": "←",
	"Leftarrow": "⇐",
	"LeftArrowRightArrow": "⇆",
	"leftarrowtail": "↢",
	"LeftCeiling": "⌈",
	"LeftDoubleBracket": "⟦",
	"LeftDownTeeVector": "⥡",
	"LeftDownVectorBar": "⥙",
	"LeftDownVector": "⇃",
	"LeftFloor": "⌊",
	"leftharpoondown": "↽",
	"leftharpoonup": "↼",
	"leftleftarrows": "⇇",
	"leftrightarrow": "↔",
	"LeftRightArrow": "↔",
	"Leftrightarrow": "⇔",
	"leftrightarrows": "⇆",
	"leftrightharpoons": "⇋",
	"leftrightsquigarrow": "↭",
	"LeftRightVector": "⥎",
	"LeftTeeArrow": "↤",
	"LeftTee": "⊣",
	"LeftTeeVector": "⥚",
	"leftthreetimes": "⋋",
	"LeftTriangleBar": "⧏",
	"LeftTriangle": "⊲",
	"LeftTriangleEqual": "⊴",
	"LeftUpDownVector": "⥑",
	"LeftUpTeeVector": "⥠",
	"LeftUpVectorBar": "⥘",
	"LeftUpVector": "↿",
	"LeftVectorBar": "⥒",
	"LeftVector": "↼",
	"lEg": "⪋",
	"leg": "⋚",
	"leq": "≤",
	"leqq": "≦",
	"leqslant": "⩽",
	"lescc": "⪨",
	"les": "⩽",
	"lesdot": "⩿",
	"lesdoto": "⪁",
	"lesdotor": "⪃",
	"lesg": "⋚︀",
	"lesges": "⪓",
	"lessapprox": "⪅",
	"lessdot": "⋖",
	"lesseqgtr": "⋚",
	"lesseqqgtr": "⪋",
	"LessEqualGreater": "⋚",
	"LessFullEqual": "≦",
	"LessGreater": "≶",
	"lessgtr": "≶",
	"LessLess": "⪡",
	"lesssim": "≲",
	"LessSlantEqual": "⩽",
	"LessTilde": "≲",
	"lfisht": "⥼",
	"lfloor": "⌊",
	"Lfr": "𝔏",
	"lfr": "𝔩",
	"lg": "≶",
	"lgE": "⪑",
	"lHar": "⥢",
	"lhard": "↽",
	"lharu": "↼",
	"lharul": "⥪",
	"lhblk": "▄",
	"LJcy": "Љ",
	"ljcy": "љ",
	"llarr": "⇇",
	"ll": "≪",
	"Ll": "⋘",
	"llcorner": "⌞",
	"Lleftarrow": "⇚",
	"llhard": "⥫",
	"lltri": "◺",
	"Lmidot": "Ŀ",
	"lmidot": "ŀ",
	"lmoustache": "⎰",
	"lmoust": "⎰",
	"lnap": "⪉",
	"lnapprox": "⪉",
	"lne": "⪇",
	"lnE": "≨",
	"lneq": "⪇",
	"lneqq": "≨",
	"lnsim": "⋦",
	"loang": "⟬",
	"loarr": "⇽",
	"lobrk": "⟦",
	"longleftarrow": "⟵",
	"LongLeftArrow": "⟵",
	"Longleftarrow": "⟸",
	"longleftrightarrow": "⟷",
	"LongLeftRightArrow": "⟷",
	"Longleftrightarrow": "⟺",
	"longmapsto": "⟼",
	"longrightarrow": "⟶",
	"LongRightArrow": "⟶",
	"Longrightarrow": "⟹",
	"looparrowleft": "↫",
	"looparrowright": "↬",
	"lopar": "⦅",
	"Lopf": "𝕃",
	"lopf": "𝕝",
	"loplus": "⨭",
	"lotimes": "⨴",
	"lowast": "∗",
	"lowbar": "_",
	"LowerLeftArrow": "↙",
	"LowerRightArrow": "↘",
	"loz": "◊",
	"lozenge": "◊",
	"lozf": "⧫",
	"lpar": "(",
	"lparlt": "⦓",
	"lrarr": "⇆",
	"lrcorner": "⌟",
	"lrhar": "⇋",
	"lrhard": "⥭",
	"lrm": "‎",
	"lrtri": "⊿",
	"lsaquo": "‹",
	"lscr": "𝓁",
	"Lscr": "ℒ",
	"lsh": "↰",
	"Lsh": "↰",
	"lsim": "≲",
	"lsime": "⪍",
	"lsimg": "⪏",
	"lsqb": "[",
	"lsquo": "‘",
	"lsquor": "‚",
	"Lstrok": "Ł",
	"lstrok": "ł",
	"ltcc": "⪦",
	"ltcir": "⩹",
	"lt": "<",
	"LT": "<",
	"Lt": "≪",
	"ltdot": "⋖",
	"lthree": "⋋",
	"ltimes": "⋉",
	"ltlarr": "⥶",
	"ltquest": "⩻",
	"ltri": "◃",
	"ltrie": "⊴",
	"ltrif": "◂",
	"ltrPar": "⦖",
	"lurdshar": "⥊",
	"luruhar": "⥦",
	"lvertneqq": "≨︀",
	"lvnE": "≨︀",
	"macr": "¯",
	"male": "♂",
	"malt": "✠",
	"maltese": "✠",
	"Map": "⤅",
	"map": "↦",
	"mapsto": "↦",
	"mapstodown": "↧",
	"mapstoleft": "↤",
	"mapstoup": "↥",
	"marker": "▮",
	"mcomma": "⨩",
	"Mcy": "М",
	"mcy": "м",
	"mdash": "—",
	"mDDot": "∺",
	"measuredangle": "∡",
	"MediumSpace": " ",
	"Mellintrf": "ℳ",
	"Mfr": "𝔐",
	"mfr": "𝔪",
	"mho": "℧",
	"micro": "µ",
	"midast": "*",
	"midcir": "⫰",
	"mid": "∣",
	"middot": "·",
	"minusb": "⊟",
	"minus": "−",
	"minusd": "∸",
	"minusdu": "⨪",
	"MinusPlus": "∓",
	"mlcp": "⫛",
	"mldr": "…",
	"mnplus": "∓",
	"models": "⊧",
	"Mopf": "𝕄",
	"mopf": "𝕞",
	"mp": "∓",
	"mscr": "𝓂",
	"Mscr": "ℳ",
	"mstpos": "∾",
	"Mu": "Μ",
	"mu": "μ",
	"multimap": "⊸",
	"mumap": "⊸",
	"nabla": "∇",
	"Nacute": "Ń",
	"nacute": "ń",
	"nang": "∠⃒",
	"nap": "≉",
	"napE": "⩰̸",
	"napid": "≋̸",
	"napos": "ŉ",
	"napprox": "≉",
	"natural": "♮",
	"naturals": "ℕ",
	"natur": "♮",
	"nbsp": " ",
	"nbump": "≎̸",
	"nbumpe": "≏̸",
	"ncap": "⩃",
	"Ncaron": "Ň",
	"ncaron": "ň",
	"Ncedil": "Ņ",
	"ncedil": "ņ",
	"ncong": "≇",
	"ncongdot": "⩭̸",
	"ncup": "⩂",
	"Ncy": "Н",
	"ncy": "н",
	"ndash": "–",
	"nearhk": "⤤",
	"nearr": "↗",
	"neArr": "⇗",
	"nearrow": "↗",
	"ne": "≠",
	"nedot": "≐̸",
	"NegativeMediumSpace": "​",
	"NegativeThickSpace": "​",
	"NegativeThinSpace": "​",
	"NegativeVeryThinSpace": "​",
	"nequiv": "≢",
	"nesear": "⤨",
	"nesim": "≂̸",
	"NestedGreaterGreater": "≫",
	"NestedLessLess": "≪",
	"NewLine": "\n",
	"nexist": "∄",
	"nexists": "∄",
	"Nfr": "𝔑",
	"nfr": "𝔫",
	"ngE": "≧̸",
	"nge": "≱",
	"ngeq": "≱",
	"ngeqq": "≧̸",
	"ngeqslant": "⩾̸",
	"nges": "⩾̸",
	"nGg": "⋙̸",
	"ngsim": "≵",
	"nGt": "≫⃒",
	"ngt": "≯",
	"ngtr": "≯",
	"nGtv": "≫̸",
	"nharr": "↮",
	"nhArr": "⇎",
	"nhpar": "⫲",
	"ni": "∋",
	"nis": "⋼",
	"nisd": "⋺",
	"niv": "∋",
	"NJcy": "Њ",
	"njcy": "њ",
	"nlarr": "↚",
	"nlArr": "⇍",
	"nldr": "‥",
	"nlE": "≦̸",
	"nle": "≰",
	"nleftarrow": "↚",
	"nLeftarrow": "⇍",
	"nleftrightarrow": "↮",
	"nLeftrightarrow": "⇎",
	"nleq": "≰",
	"nleqq": "≦̸",
	"nleqslant": "⩽̸",
	"nles": "⩽̸",
	"nless": "≮",
	"nLl": "⋘̸",
	"nlsim": "≴",
	"nLt": "≪⃒",
	"nlt": "≮",
	"nltri": "⋪",
	"nltrie": "⋬",
	"nLtv": "≪̸",
	"nmid": "∤",
	"NoBreak": "⁠",
	"NonBreakingSpace": " ",
	"nopf": "𝕟",
	"Nopf": "ℕ",
	"Not": "⫬",
	"not": "¬",
	"NotCongruent": "≢",
	"NotCupCap": "≭",
	"NotDoubleVerticalBar": "∦",
	"NotElement": "∉",
	"NotEqual": "≠",
	"NotEqualTilde": "≂̸",
	"NotExists": "∄",
	"NotGreater": "≯",
	"NotGreaterEqual": "≱",
	"NotGreaterFullEqual": "≧̸",
	"NotGreaterGreater": "≫̸",
	"NotGreaterLess": "≹",
	"NotGreaterSlantEqual": "⩾̸",
	"NotGreaterTilde": "≵",
	"NotHumpDownHump": "≎̸",
	"NotHumpEqual": "≏̸",
	"notin": "∉",
	"notindot": "⋵̸",
	"notinE": "⋹̸",
	"notinva": "∉",
	"notinvb": "⋷",
	"notinvc": "⋶",
	"NotLeftTriangleBar": "⧏̸",
	"NotLeftTriangle": "⋪",
	"NotLeftTriangleEqual": "⋬",
	"NotLess": "≮",
	"NotLessEqual": "≰",
	"NotLessGreater": "≸",
	"NotLessLess": "≪̸",
	"NotLessSlantEqual": "⩽̸",
	"NotLessTilde": "≴",
	"NotNestedGreaterGreater": "⪢̸",
	"NotNestedLessLess": "⪡̸",
	"notni": "∌",
	"notniva": "∌",
	"notnivb": "⋾",
	"notnivc": "⋽",
	"NotPrecedes": "⊀",
	"NotPrecedesEqual": "⪯̸",
	"NotPrecedesSlantEqual": "⋠",
	"NotReverseElement": "∌",
	"NotRightTriangleBar": "⧐̸",
	"NotRightTriangle": "⋫",
	"NotRightTriangleEqual": "⋭",
	"NotSquareSubset": "⊏̸",
	"NotSquareSubsetEqual": "⋢",
	"NotSquareSuperset": "⊐̸",
	"NotSquareSupersetEqual": "⋣",
	"NotSubset": "⊂⃒",
	"NotSubsetEqual": "⊈",
	"NotSucceeds": "⊁",
	"NotSucceedsEqual": "⪰̸",
	"NotSucceedsSlantEqual": "⋡",
	"NotSucceedsTilde": "≿̸",
	"NotSuperset": "⊃⃒",
	"NotSupersetEqual": "⊉",
	"NotTilde": "≁",
	"NotTildeEqual": "≄",
	"NotTildeFullEqual": "≇",
	"NotTildeTilde": "≉",
	"NotVerticalBar": "∤",
	"nparallel": "∦",
	"npar": "∦",
	"nparsl": "⫽⃥",
	"npart": "∂̸",
	"npolint": "⨔",
	"npr": "⊀",
	"nprcue": "⋠",
	"nprec": "⊀",
	"npreceq": "⪯̸",
	"npre": "⪯̸",
	"nrarrc": "⤳̸",
	"nrarr": "↛",
	"nrArr": "⇏",
	"nrarrw": "↝̸",
	"nrightarrow": "↛",
	"nRightarrow": "⇏",
	"nrtri": "⋫",
	"nrtrie": "⋭",
	"nsc": "⊁",
	"nsccue": "⋡",
	"nsce": "⪰̸",
	"Nscr": "𝒩",
	"nscr": "𝓃",
	"nshortmid": "∤",
	"nshortparallel": "∦",
	"nsim": "≁",
	"nsime": "≄",
	"nsimeq": "≄",
	"nsmid": "∤",
	"nspar": "∦",
	"nsqsube": "⋢",
	"nsqsupe": "⋣",
	"nsub": "⊄",
	"nsubE": "⫅̸",
	"nsube": "⊈",
	"nsubset": "⊂⃒",
	"nsubseteq": "⊈",
	"nsubseteqq": "⫅̸",
	"nsucc": "⊁",
	"nsucceq": "⪰̸",
	"nsup": "⊅",
	"nsupE": "⫆̸",
	"nsupe": "⊉",
	"nsupset": "⊃⃒",
	"nsupseteq": "⊉",
	"nsupseteqq": "⫆̸",
	"ntgl": "≹",
	"Ntilde": "Ñ",
	"ntilde": "ñ",
	"ntlg": "≸",
	"ntriangleleft": "⋪",
	"ntrianglelefteq": "⋬",
	"ntriangleright": "⋫",
	"ntrianglerighteq": "⋭",
	"Nu": "Ν",
	"nu": "ν",
	"num": "#",
	"numero": "№",
	"numsp": " ",
	"nvap": "≍⃒",
	"nvdash": "⊬",
	"nvDash": "⊭",
	"nVdash": "⊮",
	"nVDash": "⊯",
	"nvge": "≥⃒",
	"nvgt": ">⃒",
	"nvHarr": "⤄",
	"nvinfin": "⧞",
	"nvlArr": "⤂",
	"nvle": "≤⃒",
	"nvlt": "<⃒",
	"nvltrie": "⊴⃒",
	"nvrArr": "⤃",
	"nvrtrie": "⊵⃒",
	"nvsim": "∼⃒",
	"nwarhk": "⤣",
	"nwarr": "↖",
	"nwArr": "⇖",
	"nwarrow": "↖",
	"nwnear": "⤧",
	"Oacute": "Ó",
	"oacute": "ó",
	"oast": "⊛",
	"Ocirc": "Ô",
	"ocirc": "ô",
	"ocir": "⊚",
	"Ocy": "О",
	"ocy": "о",
	"odash": "⊝",
	"Odblac": "Ő",
	"odblac": "ő",
	"odiv": "⨸",
	"odot": "⊙",
	"odsold": "⦼",
	"OElig": "Œ",
	"oelig": "œ",
	"ofcir": "⦿",
	"Ofr": "𝔒",
	"ofr": "𝔬",
	"ogon": "˛",
	"Ograve": "Ò",
	"ograve": "ò",
	"ogt": "⧁",
	"ohbar": "⦵",
	"ohm": "Ω",
	"oint": "∮",
	"olarr": "↺",
	"olcir": "⦾",
	"olcross": "⦻",
	"oline": "‾",
	"olt": "⧀",
	"Omacr": "Ō",
	"omacr": "ō",
	"Omega": "Ω",
	"omega": "ω",
	"Omicron": "Ο",
	"omicron": "ο",
	"omid": "⦶",
	"ominus": "⊖",
	"Oopf": "𝕆",
	"oopf": "𝕠",
	"opar": "⦷",
	"OpenCurlyDoubleQuote": "“",
	"OpenCurlyQuote": "‘",
	"operp": "⦹",
	"oplus": "⊕",
	"orarr": "↻",
	"Or": "⩔",
	"or": "∨",
	"ord": "⩝",
	"order": "ℴ",
	"orderof": "ℴ",
	"ordf": "ª",
	"ordm": "º",
	"origof": "⊶",
	"oror": "⩖",
	"orslope": "⩗",
	"orv": "⩛",
	"oS": "Ⓢ",
	"Oscr": "𝒪",
	"oscr": "ℴ",
	"Oslash": "Ø",
	"oslash": "ø",
	"osol": "⊘",
	"Otilde": "Õ",
	"otilde": "õ",
	"otimesas": "⨶",
	"Otimes": "⨷",
	"otimes": "⊗",
	"Ouml": "Ö",
	"ouml": "ö",
	"ovbar": "⌽",
	"OverBar": "‾",
	"OverBrace": "⏞",
	"OverBracket": "⎴",
	"OverParenthesis": "⏜",
	"para": "¶",
	"parallel": "∥",
	"par": "∥",
	"parsim": "⫳",
	"parsl": "⫽",
	"part": "∂",
	"PartialD": "∂",
	"Pcy": "П",
	"pcy": "п",
	"percnt": "%",
	"period": ".",
	"permil": "‰",
	"perp": "⊥",
	"pertenk": "‱",
	"Pfr": "𝔓",
	"pfr": "𝔭",
	"Phi": "Φ",
	"phi": "φ",
	"phiv": "ϕ",
	"phmmat": "ℳ",
	"phone": "☎",
	"Pi": "Π",
	"pi": "π",
	"pitchfork": "⋔",
	"piv": "ϖ",
	"planck": "ℏ",
	"planckh": "ℎ",
	"plankv": "ℏ",
	"plusacir": "⨣",
	"plusb": "⊞",
	"pluscir": "⨢",
	"plus": "+",
	"plusdo": "∔",
	"plusdu": "⨥",
	"pluse": "⩲",
	"PlusMinus": "±",
	"plusmn": "±",
	"plussim": "⨦",
	"plustwo": "⨧",
	"pm": "±",
	"Poincareplane": "ℌ",
	"pointint": "⨕",
	"popf": "𝕡",
	"Popf": "ℙ",
	"pound": "£",
	"prap": "⪷",
	"Pr": "⪻",
	"pr": "≺",
	"prcue": "≼",
	"precapprox": "⪷",
	"prec": "≺",
	"preccurlyeq": "≼",
	"Precedes": "≺",
	"PrecedesEqual": "⪯",
	"PrecedesSlantEqual": "≼",
	"PrecedesTilde": "≾",
	"preceq": "⪯",
	"precnapprox": "⪹",
	"precneqq": "⪵",
	"precnsim": "⋨",
	"pre": "⪯",
	"prE": "⪳",
	"precsim": "≾",
	"prime": "′",
	"Prime": "″",
	"primes": "ℙ",
	"prnap": "⪹",
	"prnE": "⪵",
	"prnsim": "⋨",
	"prod": "∏",
	"Product": "∏",
	"profalar": "⌮",
	"profline": "⌒",
	"profsurf": "⌓",
	"prop": "∝",
	"Proportional": "∝",
	"Proportion": "∷",
	"propto": "∝",
	"prsim": "≾",
	"prurel": "⊰",
	"Pscr": "𝒫",
	"pscr": "𝓅",
	"Psi": "Ψ",
	"psi": "ψ",
	"puncsp": " ",
	"Qfr": "𝔔",
	"qfr": "𝔮",
	"qint": "⨌",
	"qopf": "𝕢",
	"Qopf": "ℚ",
	"qprime": "⁗",
	"Qscr": "𝒬",
	"qscr": "𝓆",
	"quaternions": "ℍ",
	"quatint": "⨖",
	"quest": "?",
	"questeq": "≟",
	"quot": "\"",
	"QUOT": "\"",
	"rAarr": "⇛",
	"race": "∽̱",
	"Racute": "Ŕ",
	"racute": "ŕ",
	"radic": "√",
	"raemptyv": "⦳",
	"rang": "⟩",
	"Rang": "⟫",
	"rangd": "⦒",
	"range": "⦥",
	"rangle": "⟩",
	"raquo": "»",
	"rarrap": "⥵",
	"rarrb": "⇥",
	"rarrbfs": "⤠",
	"rarrc": "⤳",
	"rarr": "→",
	"Rarr": "↠",
	"rArr": "⇒",
	"rarrfs": "⤞",
	"rarrhk": "↪",
	"rarrlp": "↬",
	"rarrpl": "⥅",
	"rarrsim": "⥴",
	"Rarrtl": "⤖",
	"rarrtl": "↣",
	"rarrw": "↝",
	"ratail": "⤚",
	"rAtail": "⤜",
	"ratio": "∶",
	"rationals": "ℚ",
	"rbarr": "⤍",
	"rBarr": "⤏",
	"RBarr": "⤐",
	"rbbrk": "❳",
	"rbrace": "}",
	"rbrack": "]",
	"rbrke": "⦌",
	"rbrksld": "⦎",
	"rbrkslu": "⦐",
	"Rcaron": "Ř",
	"rcaron": "ř",
	"Rcedil": "Ŗ",
	"rcedil": "ŗ",
	"rceil": "⌉",
	"rcub": "}",
	"Rcy": "Р",
	"rcy": "р",
	"rdca": "⤷",
	"rdldhar": "⥩",
	"rdquo": "”",
	"rdquor": "”",
	"rdsh": "↳",
	"real": "ℜ",
	"realine": "ℛ",
	"realpart": "ℜ",
	"reals": "ℝ",
	"Re": "ℜ",
	"rect": "▭",
	"reg": "®",
	"REG": "®",
	"ReverseElement": "∋",
	"ReverseEquilibrium": "⇋",
	"ReverseUpEquilibrium": "⥯",
	"rfisht": "⥽",
	"rfloor": "⌋",
	"rfr": "𝔯",
	"Rfr": "ℜ",
	"rHar": "⥤",
	"rhard": "⇁",
	"rharu": "⇀",
	"rharul": "⥬",
	"Rho": "Ρ",
	"rho": "ρ",
	"rhov": "ϱ",
	"RightAngleBracket": "⟩",
	"RightArrowBar": "⇥",
	"rightarrow": "→",
	"RightArrow": "→",
	"Rightarrow": "⇒",
	"RightArrowLeftArrow": "⇄",
	"rightarrowtail": "↣",
	"RightCeiling": "⌉",
	"RightDoubleBracket": "⟧",
	"RightDownTeeVector": "⥝",
	"RightDownVectorBar": "⥕",
	"RightDownVector": "⇂",
	"RightFloor": "⌋",
	"rightharpoondown": "⇁",
	"rightharpoonup": "⇀",
	"rightleftarrows": "⇄",
	"rightleftharpoons": "⇌",
	"rightrightarrows": "⇉",
	"rightsquigarrow": "↝",
	"RightTeeArrow": "↦",
	"RightTee": "⊢",
	"RightTeeVector": "⥛",
	"rightthreetimes": "⋌",
	"RightTriangleBar": "⧐",
	"RightTriangle": "⊳",
	"RightTriangleEqual": "⊵",
	"RightUpDownVector": "⥏",
	"RightUpTeeVector": "⥜",
	"RightUpVectorBar": "⥔",
	"RightUpVector": "↾",
	"RightVectorBar": "⥓",
	"RightVector": "⇀",
	"ring": "˚",
	"risingdotseq": "≓",
	"rlarr": "⇄",
	"rlhar": "⇌",
	"rlm": "‏",
	"rmoustache": "⎱",
	"rmoust": "⎱",
	"rnmid": "⫮",
	"roang": "⟭",
	"roarr": "⇾",
	"robrk": "⟧",
	"ropar": "⦆",
	"ropf": "𝕣",
	"Ropf": "ℝ",
	"roplus": "⨮",
	"rotimes": "⨵",
	"RoundImplies": "⥰",
	"rpar": ")",
	"rpargt": "⦔",
	"rppolint": "⨒",
	"rrarr": "⇉",
	"Rrightarrow": "⇛",
	"rsaquo": "›",
	"rscr": "𝓇",
	"Rscr": "ℛ",
	"rsh": "↱",
	"Rsh": "↱",
	"rsqb": "]",
	"rsquo": "’",
	"rsquor": "’",
	"rthree": "⋌",
	"rtimes": "⋊",
	"rtri": "▹",
	"rtrie": "⊵",
	"rtrif": "▸",
	"rtriltri": "⧎",
	"RuleDelayed": "⧴",
	"ruluhar": "⥨",
	"rx": "℞",
	"Sacute": "Ś",
	"sacute": "ś",
	"sbquo": "‚",
	"scap": "⪸",
	"Scaron": "Š",
	"scaron": "š",
	"Sc": "⪼",
	"sc": "≻",
	"sccue": "≽",
	"sce": "⪰",
	"scE": "⪴",
	"Scedil": "Ş",
	"scedil": "ş",
	"Scirc": "Ŝ",
	"scirc": "ŝ",
	"scnap": "⪺",
	"scnE": "⪶",
	"scnsim": "⋩",
	"scpolint": "⨓",
	"scsim": "≿",
	"Scy": "С",
	"scy": "с",
	"sdotb": "⊡",
	"sdot": "⋅",
	"sdote": "⩦",
	"searhk": "⤥",
	"searr": "↘",
	"seArr": "⇘",
	"searrow": "↘",
	"sect": "§",
	"semi": ";",
	"seswar": "⤩",
	"setminus": "∖",
	"setmn": "∖",
	"sext": "✶",
	"Sfr": "𝔖",
	"sfr": "𝔰",
	"sfrown": "⌢",
	"sharp": "♯",
	"SHCHcy": "Щ",
	"shchcy": "щ",
	"SHcy": "Ш",
	"shcy": "ш",
	"ShortDownArrow": "↓",
	"ShortLeftArrow": "←",
	"shortmid": "∣",
	"shortparallel": "∥",
	"ShortRightArrow": "→",
	"ShortUpArrow": "↑",
	"shy": "­",
	"Sigma": "Σ",
	"sigma": "σ",
	"sigmaf": "ς",
	"sigmav": "ς",
	"sim": "∼",
	"simdot": "⩪",
	"sime": "≃",
	"simeq": "≃",
	"simg": "⪞",
	"simgE": "⪠",
	"siml": "⪝",
	"simlE": "⪟",
	"simne": "≆",
	"simplus": "⨤",
	"simrarr": "⥲",
	"slarr": "←",
	"SmallCircle": "∘",
	"smallsetminus": "∖",
	"smashp": "⨳",
	"smeparsl": "⧤",
	"smid": "∣",
	"smile": "⌣",
	"smt": "⪪",
	"smte": "⪬",
	"smtes": "⪬︀",
	"SOFTcy": "Ь",
	"softcy": "ь",
	"solbar": "⌿",
	"solb": "⧄",
	"sol": "/",
	"Sopf": "𝕊",
	"sopf": "𝕤",
	"spades": "♠",
	"spadesuit": "♠",
	"spar": "∥",
	"sqcap": "⊓",
	"sqcaps": "⊓︀",
	"sqcup": "⊔",
	"sqcups": "⊔︀",
	"Sqrt": "√",
	"sqsub": "⊏",
	"sqsube": "⊑",
	"sqsubset": "⊏",
	"sqsubseteq": "⊑",
	"sqsup": "⊐",
	"sqsupe": "⊒",
	"sqsupset": "⊐",
	"sqsupseteq": "⊒",
	"square": "□",
	"Square": "□",
	"SquareIntersection": "⊓",
	"SquareSubset": "⊏",
	"SquareSubsetEqual": "⊑",
	"SquareSuperset": "⊐",
	"SquareSupersetEqual": "⊒",
	"SquareUnion": "⊔",
	"squarf": "▪",
	"squ": "□",
	"squf": "▪",
	"srarr": "→",
	"Sscr": "𝒮",
	"sscr": "𝓈",
	"ssetmn": "∖",
	"ssmile": "⌣",
	"sstarf": "⋆",
	"Star": "⋆",
	"star": "☆",
	"starf": "★",
	"straightepsilon": "ϵ",
	"straightphi": "ϕ",
	"strns": "¯",
	"sub": "⊂",
	"Sub": "⋐",
	"subdot": "⪽",
	"subE": "⫅",
	"sube": "⊆",
	"subedot": "⫃",
	"submult": "⫁",
	"subnE": "⫋",
	"subne": "⊊",
	"subplus": "⪿",
	"subrarr": "⥹",
	"subset": "⊂",
	"Subset": "⋐",
	"subseteq": "⊆",
	"subseteqq": "⫅",
	"SubsetEqual": "⊆",
	"subsetneq": "⊊",
	"subsetneqq": "⫋",
	"subsim": "⫇",
	"subsub": "⫕",
	"subsup": "⫓",
	"succapprox": "⪸",
	"succ": "≻",
	"succcurlyeq": "≽",
	"Succeeds": "≻",
	"SucceedsEqual": "⪰",
	"SucceedsSlantEqual": "≽",
	"SucceedsTilde": "≿",
	"succeq": "⪰",
	"succnapprox": "⪺",
	"succneqq": "⪶",
	"succnsim": "⋩",
	"succsim": "≿",
	"SuchThat": "∋",
	"sum": "∑",
	"Sum": "∑",
	"sung": "♪",
	"sup1": "¹",
	"sup2": "²",
	"sup3": "³",
	"sup": "⊃",
	"Sup": "⋑",
	"supdot": "⪾",
	"supdsub": "⫘",
	"supE": "⫆",
	"supe": "⊇",
	"supedot": "⫄",
	"Superset": "⊃",
	"SupersetEqual": "⊇",
	"suphsol": "⟉",
	"suphsub": "⫗",
	"suplarr": "⥻",
	"supmult": "⫂",
	"supnE": "⫌",
	"supne": "⊋",
	"supplus": "⫀",
	"supset": "⊃",
	"Supset": "⋑",
	"supseteq": "⊇",
	"supseteqq": "⫆",
	"supsetneq": "⊋",
	"supsetneqq": "⫌",
	"supsim": "⫈",
	"supsub": "⫔",
	"supsup": "⫖",
	"swarhk": "⤦",
	"swarr": "↙",
	"swArr": "⇙",
	"swarrow": "↙",
	"swnwar": "⤪",
	"szlig": "ß",
	"Tab": "\t",
	"target": "⌖",
	"Tau": "Τ",
	"tau": "τ",
	"tbrk": "⎴",
	"Tcaron": "Ť",
	"tcaron": "ť",
	"Tcedil": "Ţ",
	"tcedil": "ţ",
	"Tcy": "Т",
	"tcy": "т",
	"tdot": "⃛",
	"telrec": "⌕",
	"Tfr": "𝔗",
	"tfr": "𝔱",
	"there4": "∴",
	"therefore": "∴",
	"Therefore": "∴",
	"Theta": "Θ",
	"theta": "θ",
	"thetasym": "ϑ",
	"thetav": "ϑ",
	"thickapprox": "≈",
	"thicksim": "∼",
	"ThickSpace": "  ",
	"ThinSpace": " ",
	"thinsp": " ",
	"thkap": "≈",
	"thksim": "∼",
	"THORN": "Þ",
	"thorn": "þ",
	"tilde": "˜",
	"Tilde": "∼",
	"TildeEqual": "≃",
	"TildeFullEqual": "≅",
	"TildeTilde": "≈",
	"timesbar": "⨱",
	"timesb": "⊠",
	"times": "×",
	"timesd": "⨰",
	"tint": "∭",
	"toea": "⤨",
	"topbot": "⌶",
	"topcir": "⫱",
	"top": "⊤",
	"Topf": "𝕋",
	"topf": "𝕥",
	"topfork": "⫚",
	"tosa": "⤩",
	"tprime": "‴",
	"trade": "™",
	"TRADE": "™",
	"triangle": "▵",
	"triangledown": "▿",
	"triangleleft": "◃",
	"trianglelefteq": "⊴",
	"triangleq": "≜",
	"triangleright": "▹",
	"trianglerighteq": "⊵",
	"tridot": "◬",
	"trie": "≜",
	"triminus": "⨺",
	"TripleDot": "⃛",
	"triplus": "⨹",
	"trisb": "⧍",
	"tritime": "⨻",
	"trpezium": "⏢",
	"Tscr": "𝒯",
	"tscr": "𝓉",
	"TScy": "Ц",
	"tscy": "ц",
	"TSHcy": "Ћ",
	"tshcy": "ћ",
	"Tstrok": "Ŧ",
	"tstrok": "ŧ",
	"twixt": "≬",
	"twoheadleftarrow": "↞",
	"twoheadrightarrow": "↠",
	"Uacute": "Ú",
	"uacute": "ú",
	"uarr": "↑",
	"Uarr": "↟",
	"uArr": "⇑",
	"Uarrocir": "⥉",
	"Ubrcy": "Ў",
	"ubrcy": "ў",
	"Ubreve": "Ŭ",
	"ubreve": "ŭ",
	"Ucirc": "Û",
	"ucirc": "û",
	"Ucy": "У",
	"ucy": "у",
	"udarr": "⇅",
	"Udblac": "Ű",
	"udblac": "ű",
	"udhar": "⥮",
	"ufisht": "⥾",
	"Ufr": "𝔘",
	"ufr": "𝔲",
	"Ugrave": "Ù",
	"ugrave": "ù",
	"uHar": "⥣",
	"uharl": "↿",
	"uharr": "↾",
	"uhblk": "▀",
	"ulcorn": "⌜",
	"ulcorner": "⌜",
	"ulcrop": "⌏",
	"ultri": "◸",
	"Umacr": "Ū",
	"umacr": "ū",
	"uml": "¨",
	"UnderBar": "_",
	"UnderBrace": "⏟",
	"UnderBracket": "⎵",
	"UnderParenthesis": "⏝",
	"Union": "⋃",
	"UnionPlus": "⊎",
	"Uogon": "Ų",
	"uogon": "ų",
	"Uopf": "𝕌",
	"uopf": "𝕦",
	"UpArrowBar": "⤒",
	"uparrow": "↑",
	"UpArrow": "↑",
	"Uparrow": "⇑",
	"UpArrowDownArrow": "⇅",
	"updownarrow": "↕",
	"UpDownArrow": "↕",
	"Updownarrow": "⇕",
	"UpEquilibrium": "⥮",
	"upharpoonleft": "↿",
	"upharpoonright": "↾",
	"uplus": "⊎",
	"UpperLeftArrow": "↖",
	"UpperRightArrow": "↗",
	"upsi": "υ",
	"Upsi": "ϒ",
	"upsih": "ϒ",
	"Upsilon": "Υ",
	"upsilon": "υ",
	"UpTeeArrow": "↥",
	"UpTee": "⊥",
	"upuparrows": "⇈",
	"urcorn": "⌝",
	"urcorner": "⌝",
	"urcrop": "⌎",
	"Uring": "Ů",
	"uring": "ů",
	"urtri": "◹",
	"Uscr": "𝒰",
	"uscr": "𝓊",
	"utdot": "⋰",
	"Utilde": "Ũ",
	"utilde": "ũ",
	"utri": "▵",
	"utrif": "▴",
	"uuarr": "⇈",
	"Uuml": "Ü",
	"uuml": "ü",
	"uwangle": "⦧",
	"vangrt": "⦜",
	"varepsilon": "ϵ",
	"varkappa": "ϰ",
	"varnothing": "∅",
	"varphi": "ϕ",
	"varpi": "ϖ",
	"varpropto": "∝",
	"varr": "↕",
	"vArr": "⇕",
	"varrho": "ϱ",
	"varsigma": "ς",
	"varsubsetneq": "⊊︀",
	"varsubsetneqq": "⫋︀",
	"varsupsetneq": "⊋︀",
	"varsupsetneqq": "⫌︀",
	"vartheta": "ϑ",
	"vartriangleleft": "⊲",
	"vartriangleright": "⊳",
	"vBar": "⫨",
	"Vbar": "⫫",
	"vBarv": "⫩",
	"Vcy": "В",
	"vcy": "в",
	"vdash": "⊢",
	"vDash": "⊨",
	"Vdash": "⊩",
	"VDash": "⊫",
	"Vdashl": "⫦",
	"veebar": "⊻",
	"vee": "∨",
	"Vee": "⋁",
	"veeeq": "≚",
	"vellip": "⋮",
	"verbar": "|",
	"Verbar": "‖",
	"vert": "|",
	"Vert": "‖",
	"VerticalBar": "∣",
	"VerticalLine": "|",
	"VerticalSeparator": "❘",
	"VerticalTilde": "≀",
	"VeryThinSpace": " ",
	"Vfr": "𝔙",
	"vfr": "𝔳",
	"vltri": "⊲",
	"vnsub": "⊂⃒",
	"vnsup": "⊃⃒",
	"Vopf": "𝕍",
	"vopf": "𝕧",
	"vprop": "∝",
	"vrtri": "⊳",
	"Vscr": "𝒱",
	"vscr": "𝓋",
	"vsubnE": "⫋︀",
	"vsubne": "⊊︀",
	"vsupnE": "⫌︀",
	"vsupne": "⊋︀",
	"Vvdash": "⊪",
	"vzigzag": "⦚",
	"Wcirc": "Ŵ",
	"wcirc": "ŵ",
	"wedbar": "⩟",
	"wedge": "∧",
	"Wedge": "⋀",
	"wedgeq": "≙",
	"weierp": "℘",
	"Wfr": "𝔚",
	"wfr": "𝔴",
	"Wopf": "𝕎",
	"wopf": "𝕨",
	"wp": "℘",
	"wr": "≀",
	"wreath": "≀",
	"Wscr": "𝒲",
	"wscr": "𝓌",
	"xcap": "⋂",
	"xcirc": "◯",
	"xcup": "⋃",
	"xdtri": "▽",
	"Xfr": "𝔛",
	"xfr": "𝔵",
	"xharr": "⟷",
	"xhArr": "⟺",
	"Xi": "Ξ",
	"xi": "ξ",
	"xlarr": "⟵",
	"xlArr": "⟸",
	"xmap": "⟼",
	"xnis": "⋻",
	"xodot": "⨀",
	"Xopf": "𝕏",
	"xopf": "𝕩",
	"xoplus": "⨁",
	"xotime": "⨂",
	"xrarr": "⟶",
	"xrArr": "⟹",
	"Xscr": "𝒳",
	"xscr": "𝓍",
	"xsqcup": "⨆",
	"xuplus": "⨄",
	"xutri": "△",
	"xvee": "⋁",
	"xwedge": "⋀",
	"Yacute": "Ý",
	"yacute": "ý",
	"YAcy": "Я",
	"yacy": "я",
	"Ycirc": "Ŷ",
	"ycirc": "ŷ",
	"Ycy": "Ы",
	"ycy": "ы",
	"yen": "¥",
	"Yfr": "𝔜",
	"yfr": "𝔶",
	"YIcy": "Ї",
	"yicy": "ї",
	"Yopf": "𝕐",
	"yopf": "𝕪",
	"Yscr": "𝒴",
	"yscr": "𝓎",
	"YUcy": "Ю",
	"yucy": "ю",
	"yuml": "ÿ",
	"Yuml": "Ÿ",
	"Zacute": "Ź",
	"zacute": "ź",
	"Zcaron": "Ž",
	"zcaron": "ž",
	"Zcy": "З",
	"zcy": "з",
	"Zdot": "Ż",
	"zdot": "ż",
	"zeetrf": "ℨ",
	"ZeroWidthSpace": "​",
	"Zeta": "Ζ",
	"zeta": "ζ",
	"zfr": "𝔷",
	"Zfr": "ℨ",
	"ZHcy": "Ж",
	"zhcy": "ж",
	"zigrarr": "⇝",
	"zopf": "𝕫",
	"Zopf": "ℤ",
	"Zscr": "𝒵",
	"zscr": "𝓏",
	"zwj": "‍",
	"zwnj": "‌"
};

/***/ },
/* 47 */
/***/ function(module, exports) {

module.exports = {
	"amp": "&",
	"apos": "'",
	"gt": ">",
	"lt": "<",
	"quot": "\""
};

/***/ },
/* 48 */
/***/ function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function wrap(fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function await(value) { return new AwaitValue(value); } }; }();

exports.default = function () {

  /**
   * @method queue
   * @param {Function} createTask
   * @param {Object} [props]
   * @yield {void}
   */
  var queue = function () {
    var _ref2 = _asyncGenerator.wrap(regeneratorRuntime.mark(function _callee(createTask, props) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _asyncGenerator.await(createTask(props));

            case 3:
              result = _context.sent;


              // Publish the resolved value of the task to the subscription.
              next(result);

              // Recursively invoke the generator, passing in the props received from the last
              // invocation.
              _context.next = 7;
              return result;

            case 7:
              _context.t0 = _context.sent;
              _context.t1 = result;
              _context.t2 = queue(_context.t0, _context.t1);
              _context.t3 = _asyncIterator(_context.t2);
              _context.t4 = _asyncGenerator.await;
              return _context.delegateYield(_asyncGeneratorDelegate(_context.t3, _context.t4), 't5', 13);

            case 13:
              _context.next = 26;
              break;

            case 15:
              _context.prev = 15;
              _context.t6 = _context['catch'](0);


              // Publish the rejected value of the task to the subscription.
              error(_context.t6);

              // Any further invocations will simply continue from the last successful task, which
              // allows recovery from any promise rejections.
              _context.next = 20;
              return _context.t6;

            case 20:
              _context.t7 = _context.sent;
              _context.t8 = props;
              _context.t9 = queue(_context.t7, _context.t8);
              _context.t10 = _asyncIterator(_context.t9);
              _context.t11 = _asyncGenerator.await;
              return _context.delegateYield(_asyncGeneratorDelegate(_context.t10, _context.t11), 't12', 26);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 15]]);
    }));

    return function queue(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Initiate the async generator, and move the cursor to the first yield.


  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions,
      _ref$value = _ref.value,
      value = _ref$value === undefined ? null : _ref$value,
      _ref$next = _ref.next,
      next = _ref$next === undefined ? fn : _ref$next,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? fn : _ref$error;

  /**
   * Initial task the yields the value that was passed in upon instantiation.
   *
   * @method initialTask
   * @return {Promise}
   */
  var initialTask = function initialTask() {
    return Promise.resolve(value);
  };var iterator = queue(initialTask);
  iterator.next();

  /**
   * @method process
   * @param {Function} promiseFn
   * @return {Promise}
   */
  var process = function process(promiseFn) {

    if (typeof promiseFn !== 'function') {
      throw new Error(message('Passed in task to `queue` must be a function that yields a promise'));
    }

    return iterator.next(promiseFn);
  };

  return { process: process, abort: function abort() {
      return iterator.return();
    } };
};

function _asyncIterator(iterable) { if (typeof Symbol === "function") { if (Symbol.asyncIterator) { var method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { return iterable[Symbol.iterator](); } } throw new TypeError("Object is not async iterable"); }

function _asyncGeneratorDelegate(inner, awaitWrap) { var iter = {}, waiting = false; function pump(key, value) { waiting = true; value = new Promise(function (resolve) { resolve(inner[key](value)); }); return { done: false, value: awaitWrap(value) }; } ; if (typeof Symbol === "function" && Symbol.iterator) { iter[Symbol.iterator] = function () { return this; }; } iter.next = function (value) { if (waiting) { waiting = false; return value; } return pump("next", value); }; if (typeof inner.throw === "function") { iter.throw = function (value) { if (waiting) { waiting = false; throw value; } return pump("throw", value); }; } if (typeof inner.return === "function") { iter.return = function (value) { return pump("return", value); }; } return iter; }

/**
 * @method fn
 * @return {void}
 */
var fn = Function.prototype;

/**
 * @method message
 * @param {String} message
 */
var message = function message(_message) {
  return 'OrderlyQueue: ' + _message + '.';
};

/**
 * @constant defaultOptions
 * @type {Object}
 */
var defaultOptions = { value: null, next: fn, error: fn };

/**
 * @param {Object} [value = null]
 * @param {Function} [next = Function.prototype]
 * @param {Function} [error = Function.prototype]
 * @return {Object}
 */

/***/ }
/******/ ]);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

// Dependencies
var pipe = __webpack_require__(13).pipe
var promised = __webpack_require__(51).promised

// Public intefrace
module.exports = promisedPipe

function promisedPipe() {
  var args = Array.prototype.slice.call(arguments);
  return pipe.apply(null, args.map(promised))
}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (true) {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define(definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.nextTick()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack &&
        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack) {
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;
        promise.source = newPromise;

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected() {
            pendingCount--;
            if (pendingCount === 0) {
                deferred.reject(new Error(
                    "Can't get fulfillment value from any promise, all " +
                    "promises were rejected."
                ));
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(37).setImmediate))

/***/ },
/* 52 */
/***/ function(module, exports) {

module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0: return function() { return fn.apply(this, arguments); };
    case 1: return function(a0) { return fn.apply(this, arguments); };
    case 2: return function(a0, a1) { return fn.apply(this, arguments); };
    case 3: return function(a0, a1, a2) { return fn.apply(this, arguments); };
    case 4: return function(a0, a1, a2, a3) { return fn.apply(this, arguments); };
    case 5: return function(a0, a1, a2, a3, a4) { return fn.apply(this, arguments); };
    case 6: return function(a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments); };
    case 7: return function(a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments); };
    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments); };
    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments); };
    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments); };
    default: throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__(54);


/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};


/***/ },
/* 54 */
/***/ function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null &&
         typeof a === 'object' &&
         a['@@functional/placeholder'] === true;
};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

var _arity = __webpack_require__(52);
var _curry1 = __webpack_require__(53);


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
module.exports = _curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(11);

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(5);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



module.exports = Writable;

/*<replacement>*/
var processNextTick = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(5);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(152)
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(36);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(19).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(10).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(42);
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(11);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(11);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(37).setImmediate))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1)))

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var randomFromSeed = __webpack_require__(148);

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

module.exports = {
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(10).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

var createElement = __webpack_require__(24)

module.exports = createElement


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

var diff = __webpack_require__(74)

module.exports = diff


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

var h = __webpack_require__(71)

module.exports = h


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

var patch = __webpack_require__(67)

module.exports = patch


/***/ },
/* 65 */
/***/ function(module, exports) {

// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

var applyProperties = __webpack_require__(23)

var isWidget = __webpack_require__(0)
var VPatch = __webpack_require__(27)

var updateWidget = __webpack_require__(68)

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

var document = __webpack_require__(20)
var isArray = __webpack_require__(12)

var render = __webpack_require__(24)
var domIndex = __webpack_require__(65)
var patchOp = __webpack_require__(66)
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

var isWidget = __webpack_require__(0)

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var EvStore = __webpack_require__(43);

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(12);

var VNode = __webpack_require__(26);
var VText = __webpack_require__(28);
var isVNode = __webpack_require__(2);
var isVText = __webpack_require__(8);
var isWidget = __webpack_require__(0);
var isHook = __webpack_require__(7);
var isVThunk = __webpack_require__(6);

var parseTag = __webpack_require__(72);
var softSetHook = __webpack_require__(70);
var evHook = __webpack_require__(69);

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var split = __webpack_require__(41);

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(22)
var isHook = __webpack_require__(7)

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(12)

var VPatch = __webpack_require__(27)
var isVNode = __webpack_require__(2)
var isVText = __webpack_require__(8)
var isWidget = __webpack_require__(0)
var isThunk = __webpack_require__(6)
var handleThunk = __webpack_require__(25)

var diffProps = __webpack_require__(73)

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}


/***/ },
/* 75 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 76 */
/***/ function(module, exports) {

// This object will be used as the prototype for Nodes when creating a
// DOM-Level-1-compliant structure.
var NodePrototype = module.exports = {
	get firstChild() {
		var children = this.children;
		return children && children[0] || null;
	},
	get lastChild() {
		var children = this.children;
		return children && children[children.length - 1] || null;
	},
	get nodeType() {
		return nodeTypes[this.type] || nodeTypes.element;
	}
};

var domLvl1 = {
	tagName: "name",
	childNodes: "children",
	parentNode: "parent",
	previousSibling: "prev",
	nextSibling: "next",
	nodeValue: "data"
};

var nodeTypes = {
	element: 1,
	text: 3,
	cdata: 4,
	comment: 8
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(NodePrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

exports.encode = __webpack_require__(117);
exports.decode = __webpack_require__(116);


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(134);

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap){
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

var Tokenizer = __webpack_require__(80);

/*
	Options:

	xmlMode: Disables the special behavior for script/style tags (false by default)
	lowerCaseAttributeNames: call .toLowerCase for each attribute name (true if xmlMode is `false`)
	lowerCaseTags: call .toLowerCase for each tag name (true if xmlMode is `false`)
*/

/*
	Callbacks:

	oncdataend,
	oncdatastart,
	onclosetag,
	oncomment,
	oncommentend,
	onerror,
	onopentag,
	onprocessinginstruction,
	onreset,
	ontext
*/

var formTags = {
	input: true,
	option: true,
	optgroup: true,
	select: true,
	button: true,
	datalist: true,
	textarea: true
};

var openImpliesClose = {
	tr      : { tr:true, th:true, td:true },
	th      : { th:true },
	td      : { thead:true, th:true, td:true },
	body    : { head:true, link:true, script:true },
	li      : { li:true },
	p       : { p:true },
	h1      : { p:true },
	h2      : { p:true },
	h3      : { p:true },
	h4      : { p:true },
	h5      : { p:true },
	h6      : { p:true },
	select  : formTags,
	input   : formTags,
	output  : formTags,
	button  : formTags,
	datalist: formTags,
	textarea: formTags,
	option  : { option:true },
	optgroup: { optgroup:true }
};

var voidElements = {
	__proto__: null,
	area: true,
	base: true,
	basefont: true,
	br: true,
	col: true,
	command: true,
	embed: true,
	frame: true,
	hr: true,
	img: true,
	input: true,
	isindex: true,
	keygen: true,
	link: true,
	meta: true,
	param: true,
	source: true,
	track: true,
	wbr: true,

	//common self closing svg elements
	path: true,
	circle: true,
	ellipse: true,
	line: true,
	rect: true,
	use: true,
	stop: true,
	polyline: true,
	polygon: true
};

var re_nameEnd = /\s|\//;

function Parser(cbs, options){
	this._options = options || {};
	this._cbs = cbs || {};

	this._tagname = "";
	this._attribname = "";
	this._attribvalue = "";
	this._attribs = null;
	this._stack = [];

	this.startIndex = 0;
	this.endIndex = null;

	this._lowerCaseTagNames = "lowerCaseTags" in this._options ?
									!!this._options.lowerCaseTags :
									!this._options.xmlMode;
	this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ?
									!!this._options.lowerCaseAttributeNames :
									!this._options.xmlMode;

	if(this._options.Tokenizer) {
		Tokenizer = this._options.Tokenizer;
	}
	this._tokenizer = new Tokenizer(this._options, this);

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
}

__webpack_require__(5)(Parser, __webpack_require__(19).EventEmitter);

Parser.prototype._updatePosition = function(initialOffset){
	if(this.endIndex === null){
		if(this._tokenizer._sectionStart <= initialOffset){
			this.startIndex = 0;
		} else {
			this.startIndex = this._tokenizer._sectionStart - initialOffset;
		}
	}
	else this.startIndex = this.endIndex + 1;
	this.endIndex = this._tokenizer.getAbsoluteIndex();
};

//Tokenizer event handlers
Parser.prototype.ontext = function(data){
	this._updatePosition(1);
	this.endIndex--;

	if(this._cbs.ontext) this._cbs.ontext(data);
};

Parser.prototype.onopentagname = function(name){
	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	this._tagname = name;

	if(!this._options.xmlMode && name in openImpliesClose) {
		for(
			var el;
			(el = this._stack[this._stack.length - 1]) in openImpliesClose[name];
			this.onclosetag(el)
		);
	}

	if(this._options.xmlMode || !(name in voidElements)){
		this._stack.push(name);
	}

	if(this._cbs.onopentagname) this._cbs.onopentagname(name);
	if(this._cbs.onopentag) this._attribs = {};
};

Parser.prototype.onopentagend = function(){
	this._updatePosition(1);

	if(this._attribs){
		if(this._cbs.onopentag) this._cbs.onopentag(this._tagname, this._attribs);
		this._attribs = null;
	}

	if(!this._options.xmlMode && this._cbs.onclosetag && this._tagname in voidElements){
		this._cbs.onclosetag(this._tagname);
	}

	this._tagname = "";
};

Parser.prototype.onclosetag = function(name){
	this._updatePosition(1);

	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	if(this._stack.length && (!(name in voidElements) || this._options.xmlMode)){
		var pos = this._stack.lastIndexOf(name);
		if(pos !== -1){
			if(this._cbs.onclosetag){
				pos = this._stack.length - pos;
				while(pos--) this._cbs.onclosetag(this._stack.pop());
			}
			else this._stack.length = pos;
		} else if(name === "p" && !this._options.xmlMode){
			this.onopentagname(name);
			this._closeCurrentTag();
		}
	} else if(!this._options.xmlMode && (name === "br" || name === "p")){
		this.onopentagname(name);
		this._closeCurrentTag();
	}
};

Parser.prototype.onselfclosingtag = function(){
	if(this._options.xmlMode || this._options.recognizeSelfClosing){
		this._closeCurrentTag();
	} else {
		this.onopentagend();
	}
};

Parser.prototype._closeCurrentTag = function(){
	var name = this._tagname;

	this.onopentagend();

	//self-closing tags will be on the top of the stack
	//(cheaper check than in onclosetag)
	if(this._stack[this._stack.length - 1] === name){
		if(this._cbs.onclosetag){
			this._cbs.onclosetag(name);
		}
		this._stack.pop();
	}
};

Parser.prototype.onattribname = function(name){
	if(this._lowerCaseAttributeNames){
		name = name.toLowerCase();
	}
	this._attribname = name;
};

Parser.prototype.onattribdata = function(value){
	this._attribvalue += value;
};

Parser.prototype.onattribend = function(){
	if(this._cbs.onattribute) this._cbs.onattribute(this._attribname, this._attribvalue);
	if(
		this._attribs &&
		!Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)
	){
		this._attribs[this._attribname] = this._attribvalue;
	}
	this._attribname = "";
	this._attribvalue = "";
};

Parser.prototype._getInstructionName = function(value){
	var idx = value.search(re_nameEnd),
	    name = idx < 0 ? value : value.substr(0, idx);

	if(this._lowerCaseTagNames){
		name = name.toLowerCase();
	}

	return name;
};

Parser.prototype.ondeclaration = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("!" + name, "!" + value);
	}
};

Parser.prototype.onprocessinginstruction = function(value){
	if(this._cbs.onprocessinginstruction){
		var name = this._getInstructionName(value);
		this._cbs.onprocessinginstruction("?" + name, "?" + value);
	}
};

Parser.prototype.oncomment = function(value){
	this._updatePosition(4);

	if(this._cbs.oncomment) this._cbs.oncomment(value);
	if(this._cbs.oncommentend) this._cbs.oncommentend();
};

Parser.prototype.oncdata = function(value){
	this._updatePosition(1);

	if(this._options.xmlMode || this._options.recognizeCDATA){
		if(this._cbs.oncdatastart) this._cbs.oncdatastart();
		if(this._cbs.ontext) this._cbs.ontext(value);
		if(this._cbs.oncdataend) this._cbs.oncdataend();
	} else {
		this.oncomment("[CDATA[" + value + "]]");
	}
};

Parser.prototype.onerror = function(err){
	if(this._cbs.onerror) this._cbs.onerror(err);
};

Parser.prototype.onend = function(){
	if(this._cbs.onclosetag){
		for(
			var i = this._stack.length;
			i > 0;
			this._cbs.onclosetag(this._stack[--i])
		);
	}
	if(this._cbs.onend) this._cbs.onend();
};


//Resets the parser to a blank state, ready to parse a new HTML document
Parser.prototype.reset = function(){
	if(this._cbs.onreset) this._cbs.onreset();
	this._tokenizer.reset();

	this._tagname = "";
	this._attribname = "";
	this._attribs = null;
	this._stack = [];

	if(this._cbs.onparserinit) this._cbs.onparserinit(this);
};

//Parses a complete HTML document and pushes it to the handler
Parser.prototype.parseComplete = function(data){
	this.reset();
	this.end(data);
};

Parser.prototype.write = function(chunk){
	this._tokenizer.write(chunk);
};

Parser.prototype.end = function(chunk){
	this._tokenizer.end(chunk);
};

Parser.prototype.pause = function(){
	this._tokenizer.pause();
};

Parser.prototype.resume = function(){
	this._tokenizer.resume();
};

//alias for backwards compat
Parser.prototype.parseChunk = Parser.prototype.write;
Parser.prototype.done = Parser.prototype.end;

module.exports = Parser;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

module.exports = Tokenizer;

var decodeCodePoint = __webpack_require__(78),
    entityMap = __webpack_require__(46),
    legacyMap = __webpack_require__(84),
    xmlMap    = __webpack_require__(47),

    i = 0,

    TEXT                      = i++,
    BEFORE_TAG_NAME           = i++, //after <
    IN_TAG_NAME               = i++,
    IN_SELF_CLOSING_TAG       = i++,
    BEFORE_CLOSING_TAG_NAME   = i++,
    IN_CLOSING_TAG_NAME       = i++,
    AFTER_CLOSING_TAG_NAME    = i++,

    //attributes
    BEFORE_ATTRIBUTE_NAME     = i++,
    IN_ATTRIBUTE_NAME         = i++,
    AFTER_ATTRIBUTE_NAME      = i++,
    BEFORE_ATTRIBUTE_VALUE    = i++,
    IN_ATTRIBUTE_VALUE_DQ     = i++, // "
    IN_ATTRIBUTE_VALUE_SQ     = i++, // '
    IN_ATTRIBUTE_VALUE_NQ     = i++,

    //declarations
    BEFORE_DECLARATION        = i++, // !
    IN_DECLARATION            = i++,

    //processing instructions
    IN_PROCESSING_INSTRUCTION = i++, // ?

    //comments
    BEFORE_COMMENT            = i++,
    IN_COMMENT                = i++,
    AFTER_COMMENT_1           = i++,
    AFTER_COMMENT_2           = i++,

    //cdata
    BEFORE_CDATA_1            = i++, // [
    BEFORE_CDATA_2            = i++, // C
    BEFORE_CDATA_3            = i++, // D
    BEFORE_CDATA_4            = i++, // A
    BEFORE_CDATA_5            = i++, // T
    BEFORE_CDATA_6            = i++, // A
    IN_CDATA                  = i++, // [
    AFTER_CDATA_1             = i++, // ]
    AFTER_CDATA_2             = i++, // ]

    //special tags
    BEFORE_SPECIAL            = i++, //S
    BEFORE_SPECIAL_END        = i++,   //S

    BEFORE_SCRIPT_1           = i++, //C
    BEFORE_SCRIPT_2           = i++, //R
    BEFORE_SCRIPT_3           = i++, //I
    BEFORE_SCRIPT_4           = i++, //P
    BEFORE_SCRIPT_5           = i++, //T
    AFTER_SCRIPT_1            = i++, //C
    AFTER_SCRIPT_2            = i++, //R
    AFTER_SCRIPT_3            = i++, //I
    AFTER_SCRIPT_4            = i++, //P
    AFTER_SCRIPT_5            = i++, //T

    BEFORE_STYLE_1            = i++, //T
    BEFORE_STYLE_2            = i++, //Y
    BEFORE_STYLE_3            = i++, //L
    BEFORE_STYLE_4            = i++, //E
    AFTER_STYLE_1             = i++, //T
    AFTER_STYLE_2             = i++, //Y
    AFTER_STYLE_3             = i++, //L
    AFTER_STYLE_4             = i++, //E

    BEFORE_ENTITY             = i++, //&
    BEFORE_NUMERIC_ENTITY     = i++, //#
    IN_NAMED_ENTITY           = i++,
    IN_NUMERIC_ENTITY         = i++,
    IN_HEX_ENTITY             = i++, //X

    j = 0,

    SPECIAL_NONE              = j++,
    SPECIAL_SCRIPT            = j++,
    SPECIAL_STYLE             = j++;

function whitespace(c){
	return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}

function characterState(char, SUCCESS){
	return function(c){
		if(c === char) this._state = SUCCESS;
	};
}

function ifElseState(upper, SUCCESS, FAILURE){
	var lower = upper.toLowerCase();

	if(upper === lower){
		return function(c){
			if(c === lower){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	} else {
		return function(c){
			if(c === lower || c === upper){
				this._state = SUCCESS;
			} else {
				this._state = FAILURE;
				this._index--;
			}
		};
	}
}

function consumeSpecialNameChar(upper, NEXT_STATE){
	var lower = upper.toLowerCase();

	return function(c){
		if(c === lower || c === upper){
			this._state = NEXT_STATE;
		} else {
			this._state = IN_TAG_NAME;
			this._index--; //consume the token again
		}
	};
}

function Tokenizer(options, cbs){
	this._state = TEXT;
	this._buffer = "";
	this._sectionStart = 0;
	this._index = 0;
	this._bufferOffset = 0; //chars removed from _buffer
	this._baseState = TEXT;
	this._special = SPECIAL_NONE;
	this._cbs = cbs;
	this._running = true;
	this._ended = false;
	this._xmlMode = !!(options && options.xmlMode);
	this._decodeEntities = !!(options && options.decodeEntities);
}

Tokenizer.prototype._stateText = function(c){
	if(c === "<"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._state = BEFORE_TAG_NAME;
		this._sectionStart = this._index;
	} else if(this._decodeEntities && this._special === SPECIAL_NONE && c === "&"){
		if(this._index > this._sectionStart){
			this._cbs.ontext(this._getSection());
		}
		this._baseState = TEXT;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeTagName = function(c){
	if(c === "/"){
		this._state = BEFORE_CLOSING_TAG_NAME;
	} else if(c === "<"){
		this._cbs.ontext(this._getSection());
		this._sectionStart = this._index;
	} else if(c === ">" || this._special !== SPECIAL_NONE || whitespace(c)) {
		this._state = TEXT;
	} else if(c === "!"){
		this._state = BEFORE_DECLARATION;
		this._sectionStart = this._index + 1;
	} else if(c === "?"){
		this._state = IN_PROCESSING_INSTRUCTION;
		this._sectionStart = this._index + 1;
	} else {
		this._state = (!this._xmlMode && (c === "s" || c === "S")) ?
						BEFORE_SPECIAL : IN_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInTagName = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._emitToken("onopentagname");
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateBeforeCloseingTagName = function(c){
	if(whitespace(c));
	else if(c === ">"){
		this._state = TEXT;
	} else if(this._special !== SPECIAL_NONE){
		if(c === "s" || c === "S"){
			this._state = BEFORE_SPECIAL_END;
		} else {
			this._state = TEXT;
			this._index--;
		}
	} else {
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInCloseingTagName = function(c){
	if(c === ">" || whitespace(c)){
		this._emitToken("onclosetag");
		this._state = AFTER_CLOSING_TAG_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterCloseingTagName = function(c){
	//skip everything until ">"
	if(c === ">"){
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeAttributeName = function(c){
	if(c === ">"){
		this._cbs.onopentagend();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c === "/"){
		this._state = IN_SELF_CLOSING_TAG;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInSelfClosingTag = function(c){
	if(c === ">"){
		this._cbs.onselfclosingtag();
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateInAttributeName = function(c){
	if(c === "=" || c === "/" || c === ">" || whitespace(c)){
		this._cbs.onattribname(this._getSection());
		this._sectionStart = -1;
		this._state = AFTER_ATTRIBUTE_NAME;
		this._index--;
	}
};

Tokenizer.prototype._stateAfterAttributeName = function(c){
	if(c === "="){
		this._state = BEFORE_ATTRIBUTE_VALUE;
	} else if(c === "/" || c === ">"){
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(!whitespace(c)){
		this._cbs.onattribend();
		this._state = IN_ATTRIBUTE_NAME;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeAttributeValue = function(c){
	if(c === "\""){
		this._state = IN_ATTRIBUTE_VALUE_DQ;
		this._sectionStart = this._index + 1;
	} else if(c === "'"){
		this._state = IN_ATTRIBUTE_VALUE_SQ;
		this._sectionStart = this._index + 1;
	} else if(!whitespace(c)){
		this._state = IN_ATTRIBUTE_VALUE_NQ;
		this._sectionStart = this._index;
		this._index--; //reconsume token
	}
};

Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function(c){
	if(c === "\""){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueSingleQuotes = function(c){
	if(c === "'"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateInAttributeValueNoQuotes = function(c){
	if(whitespace(c) || c === ">"){
		this._emitToken("onattribdata");
		this._cbs.onattribend();
		this._state = BEFORE_ATTRIBUTE_NAME;
		this._index--;
	} else if(this._decodeEntities && c === "&"){
		this._emitToken("onattribdata");
		this._baseState = this._state;
		this._state = BEFORE_ENTITY;
		this._sectionStart = this._index;
	}
};

Tokenizer.prototype._stateBeforeDeclaration = function(c){
	this._state = c === "[" ? BEFORE_CDATA_1 :
					c === "-" ? BEFORE_COMMENT :
						IN_DECLARATION;
};

Tokenizer.prototype._stateInDeclaration = function(c){
	if(c === ">"){
		this._cbs.ondeclaration(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateInProcessingInstruction = function(c){
	if(c === ">"){
		this._cbs.onprocessinginstruction(this._getSection());
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	}
};

Tokenizer.prototype._stateBeforeComment = function(c){
	if(c === "-"){
		this._state = IN_COMMENT;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
	}
};

Tokenizer.prototype._stateInComment = function(c){
	if(c === "-") this._state = AFTER_COMMENT_1;
};

Tokenizer.prototype._stateAfterComment1 = function(c){
	if(c === "-"){
		this._state = AFTER_COMMENT_2;
	} else {
		this._state = IN_COMMENT;
	}
};

Tokenizer.prototype._stateAfterComment2 = function(c){
	if(c === ">"){
		//remove 2 trailing chars
		this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "-"){
		this._state = IN_COMMENT;
	}
	// else: stay in AFTER_COMMENT_2 (`--->`)
};

Tokenizer.prototype._stateBeforeCdata1 = ifElseState("C", BEFORE_CDATA_2, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata2 = ifElseState("D", BEFORE_CDATA_3, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata3 = ifElseState("A", BEFORE_CDATA_4, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata4 = ifElseState("T", BEFORE_CDATA_5, IN_DECLARATION);
Tokenizer.prototype._stateBeforeCdata5 = ifElseState("A", BEFORE_CDATA_6, IN_DECLARATION);

Tokenizer.prototype._stateBeforeCdata6 = function(c){
	if(c === "["){
		this._state = IN_CDATA;
		this._sectionStart = this._index + 1;
	} else {
		this._state = IN_DECLARATION;
		this._index--;
	}
};

Tokenizer.prototype._stateInCdata = function(c){
	if(c === "]") this._state = AFTER_CDATA_1;
};

Tokenizer.prototype._stateAfterCdata1 = characterState("]", AFTER_CDATA_2);

Tokenizer.prototype._stateAfterCdata2 = function(c){
	if(c === ">"){
		//remove 2 trailing chars
		this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
		this._state = TEXT;
		this._sectionStart = this._index + 1;
	} else if(c !== "]") {
		this._state = IN_CDATA;
	}
	//else: stay in AFTER_CDATA_2 (`]]]>`)
};

Tokenizer.prototype._stateBeforeSpecial = function(c){
	if(c === "c" || c === "C"){
		this._state = BEFORE_SCRIPT_1;
	} else if(c === "t" || c === "T"){
		this._state = BEFORE_STYLE_1;
	} else {
		this._state = IN_TAG_NAME;
		this._index--; //consume the token again
	}
};

Tokenizer.prototype._stateBeforeSpecialEnd = function(c){
	if(this._special === SPECIAL_SCRIPT && (c === "c" || c === "C")){
		this._state = AFTER_SCRIPT_1;
	} else if(this._special === SPECIAL_STYLE && (c === "t" || c === "T")){
		this._state = AFTER_STYLE_1;
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeScript1 = consumeSpecialNameChar("R", BEFORE_SCRIPT_2);
Tokenizer.prototype._stateBeforeScript2 = consumeSpecialNameChar("I", BEFORE_SCRIPT_3);
Tokenizer.prototype._stateBeforeScript3 = consumeSpecialNameChar("P", BEFORE_SCRIPT_4);
Tokenizer.prototype._stateBeforeScript4 = consumeSpecialNameChar("T", BEFORE_SCRIPT_5);

Tokenizer.prototype._stateBeforeScript5 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_SCRIPT;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterScript1 = ifElseState("R", AFTER_SCRIPT_2, TEXT);
Tokenizer.prototype._stateAfterScript2 = ifElseState("I", AFTER_SCRIPT_3, TEXT);
Tokenizer.prototype._stateAfterScript3 = ifElseState("P", AFTER_SCRIPT_4, TEXT);
Tokenizer.prototype._stateAfterScript4 = ifElseState("T", AFTER_SCRIPT_5, TEXT);

Tokenizer.prototype._stateAfterScript5 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 6;
		this._index--; //reconsume the token
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeStyle1 = consumeSpecialNameChar("Y", BEFORE_STYLE_2);
Tokenizer.prototype._stateBeforeStyle2 = consumeSpecialNameChar("L", BEFORE_STYLE_3);
Tokenizer.prototype._stateBeforeStyle3 = consumeSpecialNameChar("E", BEFORE_STYLE_4);

Tokenizer.prototype._stateBeforeStyle4 = function(c){
	if(c === "/" || c === ">" || whitespace(c)){
		this._special = SPECIAL_STYLE;
	}
	this._state = IN_TAG_NAME;
	this._index--; //consume the token again
};

Tokenizer.prototype._stateAfterStyle1 = ifElseState("Y", AFTER_STYLE_2, TEXT);
Tokenizer.prototype._stateAfterStyle2 = ifElseState("L", AFTER_STYLE_3, TEXT);
Tokenizer.prototype._stateAfterStyle3 = ifElseState("E", AFTER_STYLE_4, TEXT);

Tokenizer.prototype._stateAfterStyle4 = function(c){
	if(c === ">" || whitespace(c)){
		this._special = SPECIAL_NONE;
		this._state = IN_CLOSING_TAG_NAME;
		this._sectionStart = this._index - 5;
		this._index--; //reconsume the token
	}
	else this._state = TEXT;
};

Tokenizer.prototype._stateBeforeEntity = ifElseState("#", BEFORE_NUMERIC_ENTITY, IN_NAMED_ENTITY);
Tokenizer.prototype._stateBeforeNumericEntity = ifElseState("X", IN_HEX_ENTITY, IN_NUMERIC_ENTITY);

//for entities terminated with a semicolon
Tokenizer.prototype._parseNamedEntityStrict = function(){
	//offset = 1
	if(this._sectionStart + 1 < this._index){
		var entity = this._buffer.substring(this._sectionStart + 1, this._index),
		    map = this._xmlMode ? xmlMap : entityMap;

		if(map.hasOwnProperty(entity)){
			this._emitPartial(map[entity]);
			this._sectionStart = this._index + 1;
		}
	}
};


//parses legacy entities (without trailing semicolon)
Tokenizer.prototype._parseLegacyEntity = function(){
	var start = this._sectionStart + 1,
	    limit = this._index - start;

	if(limit > 6) limit = 6; //the max length of legacy entities is 6

	while(limit >= 2){ //the min length of legacy entities is 2
		var entity = this._buffer.substr(start, limit);

		if(legacyMap.hasOwnProperty(entity)){
			this._emitPartial(legacyMap[entity]);
			this._sectionStart += limit + 1;
			return;
		} else {
			limit--;
		}
	}
};

Tokenizer.prototype._stateInNamedEntity = function(c){
	if(c === ";"){
		this._parseNamedEntityStrict();
		if(this._sectionStart + 1 < this._index && !this._xmlMode){
			this._parseLegacyEntity();
		}
		this._state = this._baseState;
	} else if((c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")){
		if(this._xmlMode);
		else if(this._sectionStart + 1 === this._index);
		else if(this._baseState !== TEXT){
			if(c !== "="){
				this._parseNamedEntityStrict();
			}
		} else {
			this._parseLegacyEntity();
		}

		this._state = this._baseState;
		this._index--;
	}
};

Tokenizer.prototype._decodeNumericEntity = function(offset, base){
	var sectionStart = this._sectionStart + offset;

	if(sectionStart !== this._index){
		//parse entity
		var entity = this._buffer.substring(sectionStart, this._index);
		var parsed = parseInt(entity, base);

		this._emitPartial(decodeCodePoint(parsed));
		this._sectionStart = this._index;
	} else {
		this._sectionStart--;
	}

	this._state = this._baseState;
};

Tokenizer.prototype._stateInNumericEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(2, 10);
		this._sectionStart++;
	} else if(c < "0" || c > "9"){
		if(!this._xmlMode){
			this._decodeNumericEntity(2, 10);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._stateInHexEntity = function(c){
	if(c === ";"){
		this._decodeNumericEntity(3, 16);
		this._sectionStart++;
	} else if((c < "a" || c > "f") && (c < "A" || c > "F") && (c < "0" || c > "9")){
		if(!this._xmlMode){
			this._decodeNumericEntity(3, 16);
		} else {
			this._state = this._baseState;
		}
		this._index--;
	}
};

Tokenizer.prototype._cleanup = function (){
	if(this._sectionStart < 0){
		this._buffer = "";
		this._bufferOffset += this._index;
		this._index = 0;
	} else if(this._running){
		if(this._state === TEXT){
			if(this._sectionStart !== this._index){
				this._cbs.ontext(this._buffer.substr(this._sectionStart));
			}
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else if(this._sectionStart === this._index){
			//the section just started
			this._buffer = "";
			this._bufferOffset += this._index;
			this._index = 0;
		} else {
			//remove everything unnecessary
			this._buffer = this._buffer.substr(this._sectionStart);
			this._index -= this._sectionStart;
			this._bufferOffset += this._sectionStart;
		}

		this._sectionStart = 0;
	}
};

//TODO make events conditional
Tokenizer.prototype.write = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".write() after done!"));

	this._buffer += chunk;
	this._parse();
};

Tokenizer.prototype._parse = function(){
	while(this._index < this._buffer.length && this._running){
		var c = this._buffer.charAt(this._index);
		if(this._state === TEXT) {
			this._stateText(c);
		} else if(this._state === BEFORE_TAG_NAME){
			this._stateBeforeTagName(c);
		} else if(this._state === IN_TAG_NAME) {
			this._stateInTagName(c);
		} else if(this._state === BEFORE_CLOSING_TAG_NAME){
			this._stateBeforeCloseingTagName(c);
		} else if(this._state === IN_CLOSING_TAG_NAME){
			this._stateInCloseingTagName(c);
		} else if(this._state === AFTER_CLOSING_TAG_NAME){
			this._stateAfterCloseingTagName(c);
		} else if(this._state === IN_SELF_CLOSING_TAG){
			this._stateInSelfClosingTag(c);
		}

		/*
		*	attributes
		*/
		else if(this._state === BEFORE_ATTRIBUTE_NAME){
			this._stateBeforeAttributeName(c);
		} else if(this._state === IN_ATTRIBUTE_NAME){
			this._stateInAttributeName(c);
		} else if(this._state === AFTER_ATTRIBUTE_NAME){
			this._stateAfterAttributeName(c);
		} else if(this._state === BEFORE_ATTRIBUTE_VALUE){
			this._stateBeforeAttributeValue(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_DQ){
			this._stateInAttributeValueDoubleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_SQ){
			this._stateInAttributeValueSingleQuotes(c);
		} else if(this._state === IN_ATTRIBUTE_VALUE_NQ){
			this._stateInAttributeValueNoQuotes(c);
		}

		/*
		*	declarations
		*/
		else if(this._state === BEFORE_DECLARATION){
			this._stateBeforeDeclaration(c);
		} else if(this._state === IN_DECLARATION){
			this._stateInDeclaration(c);
		}

		/*
		*	processing instructions
		*/
		else if(this._state === IN_PROCESSING_INSTRUCTION){
			this._stateInProcessingInstruction(c);
		}

		/*
		*	comments
		*/
		else if(this._state === BEFORE_COMMENT){
			this._stateBeforeComment(c);
		} else if(this._state === IN_COMMENT){
			this._stateInComment(c);
		} else if(this._state === AFTER_COMMENT_1){
			this._stateAfterComment1(c);
		} else if(this._state === AFTER_COMMENT_2){
			this._stateAfterComment2(c);
		}

		/*
		*	cdata
		*/
		else if(this._state === BEFORE_CDATA_1){
			this._stateBeforeCdata1(c);
		} else if(this._state === BEFORE_CDATA_2){
			this._stateBeforeCdata2(c);
		} else if(this._state === BEFORE_CDATA_3){
			this._stateBeforeCdata3(c);
		} else if(this._state === BEFORE_CDATA_4){
			this._stateBeforeCdata4(c);
		} else if(this._state === BEFORE_CDATA_5){
			this._stateBeforeCdata5(c);
		} else if(this._state === BEFORE_CDATA_6){
			this._stateBeforeCdata6(c);
		} else if(this._state === IN_CDATA){
			this._stateInCdata(c);
		} else if(this._state === AFTER_CDATA_1){
			this._stateAfterCdata1(c);
		} else if(this._state === AFTER_CDATA_2){
			this._stateAfterCdata2(c);
		}

		/*
		* special tags
		*/
		else if(this._state === BEFORE_SPECIAL){
			this._stateBeforeSpecial(c);
		} else if(this._state === BEFORE_SPECIAL_END){
			this._stateBeforeSpecialEnd(c);
		}

		/*
		* script
		*/
		else if(this._state === BEFORE_SCRIPT_1){
			this._stateBeforeScript1(c);
		} else if(this._state === BEFORE_SCRIPT_2){
			this._stateBeforeScript2(c);
		} else if(this._state === BEFORE_SCRIPT_3){
			this._stateBeforeScript3(c);
		} else if(this._state === BEFORE_SCRIPT_4){
			this._stateBeforeScript4(c);
		} else if(this._state === BEFORE_SCRIPT_5){
			this._stateBeforeScript5(c);
		}

		else if(this._state === AFTER_SCRIPT_1){
			this._stateAfterScript1(c);
		} else if(this._state === AFTER_SCRIPT_2){
			this._stateAfterScript2(c);
		} else if(this._state === AFTER_SCRIPT_3){
			this._stateAfterScript3(c);
		} else if(this._state === AFTER_SCRIPT_4){
			this._stateAfterScript4(c);
		} else if(this._state === AFTER_SCRIPT_5){
			this._stateAfterScript5(c);
		}

		/*
		* style
		*/
		else if(this._state === BEFORE_STYLE_1){
			this._stateBeforeStyle1(c);
		} else if(this._state === BEFORE_STYLE_2){
			this._stateBeforeStyle2(c);
		} else if(this._state === BEFORE_STYLE_3){
			this._stateBeforeStyle3(c);
		} else if(this._state === BEFORE_STYLE_4){
			this._stateBeforeStyle4(c);
		}

		else if(this._state === AFTER_STYLE_1){
			this._stateAfterStyle1(c);
		} else if(this._state === AFTER_STYLE_2){
			this._stateAfterStyle2(c);
		} else if(this._state === AFTER_STYLE_3){
			this._stateAfterStyle3(c);
		} else if(this._state === AFTER_STYLE_4){
			this._stateAfterStyle4(c);
		}

		/*
		* entities
		*/
		else if(this._state === BEFORE_ENTITY){
			this._stateBeforeEntity(c);
		} else if(this._state === BEFORE_NUMERIC_ENTITY){
			this._stateBeforeNumericEntity(c);
		} else if(this._state === IN_NAMED_ENTITY){
			this._stateInNamedEntity(c);
		} else if(this._state === IN_NUMERIC_ENTITY){
			this._stateInNumericEntity(c);
		} else if(this._state === IN_HEX_ENTITY){
			this._stateInHexEntity(c);
		}

		else {
			this._cbs.onerror(Error("unknown _state"), this._state);
		}

		this._index++;
	}

	this._cleanup();
};

Tokenizer.prototype.pause = function(){
	this._running = false;
};
Tokenizer.prototype.resume = function(){
	this._running = true;

	if(this._index < this._buffer.length){
		this._parse();
	}
	if(this._ended){
		this._finish();
	}
};

Tokenizer.prototype.end = function(chunk){
	if(this._ended) this._cbs.onerror(Error(".end() after done!"));
	if(chunk) this.write(chunk);

	this._ended = true;

	if(this._running) this._finish();
};

Tokenizer.prototype._finish = function(){
	//if there is remaining data, emit it in a reasonable way
	if(this._sectionStart < this._index){
		this._handleTrailingData();
	}

	this._cbs.onend();
};

Tokenizer.prototype._handleTrailingData = function(){
	var data = this._buffer.substr(this._sectionStart);

	if(this._state === IN_CDATA || this._state === AFTER_CDATA_1 || this._state === AFTER_CDATA_2){
		this._cbs.oncdata(data);
	} else if(this._state === IN_COMMENT || this._state === AFTER_COMMENT_1 || this._state === AFTER_COMMENT_2){
		this._cbs.oncomment(data);
	} else if(this._state === IN_NAMED_ENTITY && !this._xmlMode){
		this._parseLegacyEntity();
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_NUMERIC_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(2, 10);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(this._state === IN_HEX_ENTITY && !this._xmlMode){
		this._decodeNumericEntity(3, 16);
		if(this._sectionStart < this._index){
			this._state = this._baseState;
			this._handleTrailingData();
		}
	} else if(
		this._state !== IN_TAG_NAME &&
		this._state !== BEFORE_ATTRIBUTE_NAME &&
		this._state !== BEFORE_ATTRIBUTE_VALUE &&
		this._state !== AFTER_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_NAME &&
		this._state !== IN_ATTRIBUTE_VALUE_SQ &&
		this._state !== IN_ATTRIBUTE_VALUE_DQ &&
		this._state !== IN_ATTRIBUTE_VALUE_NQ &&
		this._state !== IN_CLOSING_TAG_NAME
	){
		this._cbs.ontext(data);
	}
	//else, ignore remaining data
	//TODO add a way to remove current tag
};

Tokenizer.prototype.reset = function(){
	Tokenizer.call(this, {xmlMode: this._xmlMode, decodeEntities: this._decodeEntities}, this._cbs);
};

Tokenizer.prototype.getAbsoluteIndex = function(){
	return this._bufferOffset + this._index;
};

Tokenizer.prototype._getSection = function(){
	return this._buffer.substring(this._sectionStart, this._index);
};

Tokenizer.prototype._emitToken = function(name){
	this._cbs[name](this._getSection());
	this._sectionStart = -1;
};

Tokenizer.prototype._emitPartial = function(value){
	if(this._baseState !== TEXT){
		this._cbs.onattribdata(value); //TODO implement the new event
	} else {
		this._cbs.ontext(value);
	}
};


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__(79),
    WritableStream = __webpack_require__(36).Writable || __webpack_require__(155).Writable,
    StringDecoder = __webpack_require__(60).StringDecoder,
    Buffer = __webpack_require__(10).Buffer;

function Stream(cbs, options){
	var parser = this._parser = new Parser(cbs, options);
	var decoder = this._decoder = new StringDecoder();

	WritableStream.call(this, {decodeStrings: false});

	this.once("finish", function(){
		parser.end(decoder.end());
	});
}

__webpack_require__(5)(Stream, WritableStream);

WritableStream.prototype._write = function(chunk, encoding, cb){
	if(chunk instanceof Buffer) chunk = this._decoder.write(chunk);
	this._parser.write(chunk);
	cb();
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// =========
// = humps =
// =========
// Underscore-to-camelCase converter (and vice versa)
// for strings and object keys

// humps is copyright © 2012+ Dom Christie
// Released under the MIT license.


;(function(global) {

  var _processKeys = function(convert, obj, options) {
    if(!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj) || _isFunction(obj)) {
      return obj;
    }

    var output,
        i = 0,
        l = 0;

    if(_isArray(obj)) {
      output = [];
      for(l=obj.length; i<l; i++) {
        output.push(_processKeys(convert, obj[i], options));
      }
    }
    else {
      output = {};
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          output[convert(key, options)] = _processKeys(convert, obj[key], options);
        }
      }
    }
    return output;
  };

  // String conversion methods

  var separateWords = function(string, options) {
    options = options || {};
    var separator = options.separator || '_';
    var split = options.split || /(?=[A-Z])/;

    return string.split(split).join(separator);
  };

  var camelize = function(string) {
    if (_isNumerical(string)) {
      return string;
    }
    string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : '';
    });
    // Ensure 1st char is always lowercase
    return string.substr(0, 1).toLowerCase() + string.substr(1);
  };

  var pascalize = function(string) {
    var camelized = camelize(string);
    // Ensure 1st char is always uppercase
    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
  };

  var decamelize = function(string, options) {
    return separateWords(string, options).toLowerCase();
  };

  // Utilities
  // Taken from Underscore.js

  var toString = Object.prototype.toString;

  var _isFunction = function(obj) {
    return typeof(obj) === 'function';
  };
  var _isObject = function(obj) {
    return obj === Object(obj);
  };
  var _isArray = function(obj) {
    return toString.call(obj) == '[object Array]';
  };
  var _isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };
  var _isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };
  var _isBoolean = function(obj) {
    return toString.call(obj) == '[object Boolean]';
  };

  // Performant way to determine if obj coerces to a number
  var _isNumerical = function(obj) {
    obj = obj - 0;
    return obj === obj;
  };

  // Sets up function which handles processing keys
  // allowing the convert function to be modified by a callback
  var _processor = function(convert, options) {
    var callback = options && 'process' in options ? options.process : options;

    if(typeof(callback) !== 'function') {
      return convert;
    }

    return function(string, options) {
      return callback(string, convert, options);
    }
  };

  var humps = {
    camelize: camelize,
    decamelize: decamelize,
    pascalize: pascalize,
    depascalize: decamelize,
    camelizeKeys: function(object, options) {
      return _processKeys(_processor(camelize, options), object);
    },
    decamelizeKeys: function(object, options) {
      return _processKeys(_processor(decamelize, options), object, options);
    },
    pascalizeKeys: function(object, options) {
      return _processKeys(_processor(pascalize, options), object);
    },
    depascalizeKeys: function () {
      return this.decamelizeKeys.apply(this, arguments);
    }
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (humps), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = humps;
  } else {
    global.humps = humps;
  }

})(this);


/***/ },
/* 83 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ },
/* 84 */
/***/ function(module, exports) {

module.exports = {
	"Aacute": "Á",
	"aacute": "á",
	"Acirc": "Â",
	"acirc": "â",
	"acute": "´",
	"AElig": "Æ",
	"aelig": "æ",
	"Agrave": "À",
	"agrave": "à",
	"amp": "&",
	"AMP": "&",
	"Aring": "Å",
	"aring": "å",
	"Atilde": "Ã",
	"atilde": "ã",
	"Auml": "Ä",
	"auml": "ä",
	"brvbar": "¦",
	"Ccedil": "Ç",
	"ccedil": "ç",
	"cedil": "¸",
	"cent": "¢",
	"copy": "©",
	"COPY": "©",
	"curren": "¤",
	"deg": "°",
	"divide": "÷",
	"Eacute": "É",
	"eacute": "é",
	"Ecirc": "Ê",
	"ecirc": "ê",
	"Egrave": "È",
	"egrave": "è",
	"ETH": "Ð",
	"eth": "ð",
	"Euml": "Ë",
	"euml": "ë",
	"frac12": "½",
	"frac14": "¼",
	"frac34": "¾",
	"gt": ">",
	"GT": ">",
	"Iacute": "Í",
	"iacute": "í",
	"Icirc": "Î",
	"icirc": "î",
	"iexcl": "¡",
	"Igrave": "Ì",
	"igrave": "ì",
	"iquest": "¿",
	"Iuml": "Ï",
	"iuml": "ï",
	"laquo": "«",
	"lt": "<",
	"LT": "<",
	"macr": "¯",
	"micro": "µ",
	"middot": "·",
	"nbsp": " ",
	"not": "¬",
	"Ntilde": "Ñ",
	"ntilde": "ñ",
	"Oacute": "Ó",
	"oacute": "ó",
	"Ocirc": "Ô",
	"ocirc": "ô",
	"Ograve": "Ò",
	"ograve": "ò",
	"ordf": "ª",
	"ordm": "º",
	"Oslash": "Ø",
	"oslash": "ø",
	"Otilde": "Õ",
	"otilde": "õ",
	"Ouml": "Ö",
	"ouml": "ö",
	"para": "¶",
	"plusmn": "±",
	"pound": "£",
	"quot": "\"",
	"QUOT": "\"",
	"raquo": "»",
	"reg": "®",
	"REG": "®",
	"sect": "§",
	"shy": "­",
	"sup1": "¹",
	"sup2": "²",
	"sup3": "³",
	"szlig": "ß",
	"THORN": "Þ",
	"thorn": "þ",
	"times": "×",
	"Uacute": "Ú",
	"uacute": "ú",
	"Ucirc": "Û",
	"ucirc": "û",
	"Ugrave": "Ù",
	"ugrave": "ù",
	"uml": "¨",
	"Uuml": "Ü",
	"uuml": "ü",
	"Yacute": "Ý",
	"yacute": "ý",
	"yen": "¥",
	"yuml": "ÿ"
};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(153)(module), __webpack_require__(4)))

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(56);

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(5);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = Readable;

/*<replacement>*/
var processNextTick = __webpack_require__(49);
/*</replacement>*/

/*<replacement>*/
var isArray = __webpack_require__(83);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(19).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = __webpack_require__(36);
  } catch (_) {} finally {
    if (!Stream) Stream = __webpack_require__(19).EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = __webpack_require__(10).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(42);
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(17);
util.inherits = __webpack_require__(5);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(156);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(137);
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(11);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(60).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(11);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(60).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _html = __webpack_require__(30);

Object.defineProperty(exports, 'html', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_html).default;
  }
});

var _once = __webpack_require__(32);

Object.defineProperty(exports, 'once', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_once).default;
  }
});

var _attributes = __webpack_require__(92);

Object.defineProperty(exports, 'attrs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_attributes).default;
  }
});

var _state = __webpack_require__(98);

Object.defineProperty(exports, 'state', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_state).default;
  }
});

var _include = __webpack_require__(95);

Object.defineProperty(exports, 'include', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_include).default;
  }
});

var _redux = __webpack_require__(97);

Object.defineProperty(exports, 'redux', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_redux).default;
  }
});

var _refs = __webpack_require__(33);

Object.defineProperty(exports, 'refs', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_refs).default;
  }
});

var _methods = __webpack_require__(96);

Object.defineProperty(exports, 'methods', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_methods).default;
  }
});

var _events = __webpack_require__(94);

Object.defineProperty(exports, 'events', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_events).default;
  }
});

var _validate = __webpack_require__(100);

Object.defineProperty(exports, 'validate', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_validate).default;
  }
});

var _cleanup = __webpack_require__(93);

Object.defineProperty(exports, 'cleanup', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_cleanup).default;
  }
});

var _vars = __webpack_require__(101);

Object.defineProperty(exports, 'vars', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_vars).default;
  }
});

var _await = __webpack_require__(29);

Object.defineProperty(exports, 'await', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_await).default;
  }
});

var _transclude = __webpack_require__(99);

Object.defineProperty(exports, 'transclude', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_transclude).default;
  }
});

var _rescue = __webpack_require__(34);

Object.defineProperty(exports, 'rescue', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_rescue).default;
  }
});

var _loading = __webpack_require__(31);

Object.defineProperty(exports, 'loading', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_loading).default;
  }
});

var _timer = __webpack_require__(91);

Object.defineProperty(exports, 'time', {
  enumerable: true,
  get: function () {
    return _timer.time;
  }
});
Object.defineProperty(exports, 'timeEnd', {
  enumerable: true,
  get: function () {
    return _timer.timeEnd;
  }
});

var _delay = __webpack_require__(89);

Object.defineProperty(exports, 'delay', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_delay).default;
  }
});

var _error = __webpack_require__(90);

Object.defineProperty(exports, 'error', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_error).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Number} by
 * @return {Object}
 */
exports.default = function (by) {

    return function (props) {
        return new Promise(function (resolve) {
            return setTimeout(function () {
                return resolve(props);
            }, by);
        });
    };
};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _starwars = __webpack_require__(150);

var _starwars2 = _interopRequireDefault(_starwars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Number} [errorPercentage = 50]
 * @return {Object}
 */
exports.default = function (errorPercentage = 50) {

    return function (props) {

        Math.random() < errorPercentage / 100 && function (message) {
            console.error('Switzerland Debug: Throwing ' + message + '.');
            throw new Error(message);
        }((0, _starwars2.default)());

        return props;
    };
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeEnd = exports.time = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shortid = __webpack_require__(142);

/**
 * @constant timers
 * @type {WeakMap}
 */
const timers = new WeakMap();

/**
 * @method time
 * @param {Object} props
 * @return {Object}
 */
const time = exports.time = function (props) {

  const node = props.node;
  const hasTimer = timers.has(props.node);
  const id = hasTimer ? timers.get(node) : node.nodeName.toLowerCase() + ' (' + (0, _shortid.generate)() + ')';
  !hasTimer && timers.set(node, id);
  window.console.time(id);
  return _extends({}, props, { timer: id });
};

/**
 * @method timeEnd
 * @param {Object} props
 * @return {Object}
 */
const timeEnd = exports.timeEnd = function (props) {

  const id = timers.get(props.node);
  window.console.timeEnd(id);
  return _extends({}, props, { timer: id });
};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _humps = __webpack_require__(82);

var _ramda = __webpack_require__(13);

/**
 * @constant observers
 * @type {WeakMap}
 */
const observers = new WeakMap();

/**
 * @constant attributes
 * @type {WeakMap}
 */
const attributes = new WeakMap();

/**
 * @method removePrefix
 * @param {String} name
 * @return {String}
 */
const removePrefix = function (name) {
  return name.replace('data-', '');
};

/**
 * @constant excluded
 * @type {Array}
 */
const excluded = ['class', 'id'];

/**
 * @method transform
 * @param {NamedNodeMap} attributes
 * @return {Object}
 */
const transform = function (attributes) {

  const isExcluded = function (index) {
    return !excluded.includes(attributes[index].nodeName);
  };

  return Object.keys(attributes).filter(isExcluded).reduce(function (acc, index) {

    // Transform each attribute into a plain object.
    const model = attributes[index];
    const label = (0, _ramda.compose)(_humps.camelize, removePrefix);

    return _extends({}, acc, { [label(model.nodeName)]: model.nodeValue });
  }, Object.create(null));
};

/**
 * @param {Object} props
 * @return {Object}
 */

exports.default = function (props) {
  const node = props.node,
        render = props.render;

  // Obtain the reference to the observer, using the WeakMap to query whether we have an existing
  // one to utilise before creating another.

  const hasObserver = observers.has(node);
  const observer = hasObserver ? observers.get(node) : new window.MutationObserver(function (mutations) {

    const mutatedAttributes = mutations.map(function (model) {
      return model.attributeName;
    });

    // Prevent a re-render of the component if every mutated attribute is included in the `excluded`
    // list.
    if (!mutatedAttributes.every(function (model) {
      return excluded.includes(model);
    })) {

      // Remove the existing memorisation of the node's attributes before re-rendering.
      attributes.delete(node);
      render();
    }
  });

  observer.observe(node, { attributes: true });
  !hasObserver && observers.set(node, observer);

  // Parse all of the attributes on the node, and nested those into the props passed.
  const attrs = attributes.get(node) || transform(node.attributes);
  attributes.set(node, attrs);

  // Clean up the observer if the node is no longer present in the DOM.
  !props.attached && observer.disconnect();

  return _extends({}, props, { attrs });
};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _switzerland = __webpack_require__(9);

var _once = __webpack_require__(32);

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {

    const cleanupFn = (0, _once2.default)(fn, _switzerland.options.RESET);

    return function (props) {

        // Invoke the function if the node isn't connected to the DOM.
        return props.attached ? props : _extends({}, cleanupFn(props), props);
    };
};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @param {Object} props
 * @return {Object}
 */
exports.default = function (props) {

    /**
     * @method event
     * @param {String} name
     * @param {Object} model
     * @return {void}
     */
    const event = function (name, model) {

        const eventName = props.node.nodeName.toLowerCase() + "/" + name;

        props.node.dispatchEvent(new window.CustomEvent(eventName, {
            detail: Object.freeze(model),
            bubbles: true,
            composed: true
        }));
    };

    return _extends({}, props, { event });
};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = __webpack_require__(13);

var _axios = __webpack_require__(154);

var _cssUrlParser = __webpack_require__(103);

var _cssUrlParser2 = _interopRequireDefault(_cssUrlParser);

var _pathParse = __webpack_require__(35);

var _pathParse2 = _interopRequireDefault(_pathParse);

var _escapeStringRegexp = __webpack_require__(121);

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _switzerland = __webpack_require__(9);

var _once = __webpack_require__(32);

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @constant includeMap
 * @type {Object}
 */
const includeMap = [{ extensions: ['js'], tag: 'script', attrs: { type: 'text/javascript' } }, { extensions: ['css'], tag: 'style', attrs: { type: 'text/css' } }];

/**
 * @method fetchInclude
 * @param {String} file
 * @return {Promise}
 */
const fetchInclude = (0, _ramda.memoize)(function (file) {

    const cssPath = (0, _pathParse2.default)(file).dir;

    const transformPaths = function (content) {

        const urls = (0, _cssUrlParser2.default)(content);

        // Update the URLs to make them relative to the CSS document.
        return urls.length ? urls.map(function (url) {
            const replacer = new RegExp((0, _escapeStringRegexp2.default)(url), 'ig');
            return content.replace(replacer, cssPath + '/' + url);
        }).toString() : content;
    };

    return new Promise(function (resolve) {
        (0, _axios.get)(file).then(function (response) {
            return transformPaths(response.data);
        }).then(resolve).catch(function () {
            return resolve('');
        });
    });
});

/**
 * @method fetchIncludes
 * @param {Array} files
 * @return {Promise}
 */
const fetchIncludes = function (files) {

    // Group all of the files by their extension.
    const groupedFiles = (0, _ramda.groupBy)(function (file) {
        return file.extension;
    })(files.map(function (path) {
        return { path, extension: path.split('.').pop() };
    }));

    const mappedFiles = Object.keys(groupedFiles).map(function (extension) {

        const nodeData = includeMap.find(function (model) {
            return model.extensions.includes(extension);
        });
        const files = groupedFiles[extension].map(function (model) {
            return model.path;
        });
        const containerNode = document.createElement(nodeData.tag);

        // Apply all of the attributes defined in the `includeMap` to the node.
        Object.keys(nodeData.attrs).map(function (key) {
            return containerNode.setAttribute(key, nodeData.attrs[key]);
        });

        // Load each file individually and then concatenate them.
        return Promise.all(files.map(fetchInclude)).then(function (fileData) {

            // Concatenate all of the content from the documents.
            containerNode.innerHTML = fileData.reduce(function (acc, fileDatum) {
                return acc + ' ' + fileDatum;
            }).trim();
            return containerNode.innerHTML.length ? containerNode : null;
        });
    });

    return Promise.all(mappedFiles);
};

/**
 * @method attachFiles
 * @param flags {Number}
 * @return {Function}
 */
const attachFiles = function (flags) {
    return (0, _once2.default)(function (props) {

        return new Promise(function (resolve) {
            const node = props.node,
                  files = props.files;

            const boundary = node.shadowRoot;

            if (files.length !== 0) {

                if (flags & _switzerland.options.ASYNC) {
                    node.classList.add('styling');
                    node.classList.remove('styled');
                }

                fetchIncludes(files).then(function (nodes) {

                    // Remove any `null` values which means the content of the file was empty, and then append
                    // them to the component's shadow boundary.
                    nodes.filter(_ramda.identity).forEach(function (node) {
                        return boundary.appendChild(node);
                    });

                    if (flags & _switzerland.options.ASYNC) {
                        node.classList.add('styled');
                        node.classList.remove('styling');
                    }

                    resolve();
                });
            }
        });
    }, _switzerland.options.RESET);
};

/**
 * @param {String[]|String} files
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */

exports.default = function (files, flags = _switzerland.options.DEFAULT) {

    const attach = attachFiles(flags);

    return function (props) {

        // Attach the documents using the `once` middleware.
        const attached = attach(_extends({}, props, { files: Array.isArray(files) ? files : [files] }));
        return flags & _switzerland.options.ASYNC ? props : attached.then(function () {
            return props;
        });
    };
};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _switzerland = __webpack_require__(9);

var _messages = __webpack_require__(15);

/**
 * @constant registered
 * @type {Set}
 */
const registered = new Set();

/**
 * @method setPrototypeFor
 * @param {HTMLElement} node
 * @param {Array} fns
 * @return {void}
 */
const setPrototypeFor = function (node, fns) {

    registered.add(node.nodeName);

    Object.keys(fns).forEach(function (name) {

        const fn = fns[name];

        Object.getPrototypeOf(node)[name] = function (...args) {

            if (!(_switzerland.prevPropsKey in this)) {
                (0, _messages.error)('You have passed an invalid context when invoking the "' + name + '" method');
                return;
            }

            const lastProps = this[_switzerland.prevPropsKey];

            // Gather the props that caused the last render of the component, and then invoke
            // the prototype function. If only one argument has been passed, then we'll also define
            // the `arg` variable to make it more gramtically correct.
            args.length === 1 ? fn(_extends({}, lastProps, { args, arg: args[0] })) : fn(_extends({}, lastProps, { args }));
        };
    });
};

/**
 * @param {Object} fns
 * @return {Function}
 */

exports.default = function (fns) {

    return function (props) {
        const node = props.node;

        const hasNode = registered.has(node.nodeName);
        !hasNode && setPrototypeFor(node, fns);

        return props;
    };
};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = __webpack_require__(13);

/**
 * @constant subscriptions
 * @type {WeakMap}
 */
const subscriptions = new WeakMap();

/**
 * @param {Object} store
 * @param {Function} [handler]
 * @return {Function}
 */
exports.default = (0, _ramda.curry)(function (store, handler = function () {
  return true;
}) {

  return function (props) {

    const hasSubscription = subscriptions.has(props.node);
    const state = store.getState();

    // Subscribe to the store only if we haven't done so already.
    !hasSubscription && subscriptions.set(props.node, store.subscribe(function () {
      return handler(store.getState(), state) && props.node.render();
    }));

    return _extends({}, props, { redux: state, dispatch: store.dispatch });
  };
});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _switzerland = __webpack_require__(9);

/**
 * @constant states
 * @type {WeakMap}
 */
const states = new WeakMap();

/**
 * @param {Object} initialState
 * @param {Number} [flags = options.DEFAULT]
 * @return {Function}
 */

exports.default = function (initialState, flags = _switzerland.options.DEFAULT) {

    return function (props) {

        const hasState = states.has(props.node);
        const state = hasState ? states.get(props.node) : initialState;
        !hasState && states.set(props.node, state);

        /**
         * @method setState
         * @param {Object} updatedState
         * @return {void}
         */
        const setState = function (updatedState) {

            // Determine whether or not to use the React default of `setState` being deferred
            // until the next tick.
            const fn = flags & _switzerland.options.DEFER ? setTimeout : function (stateFn) {
                return stateFn();
            };

            fn(function () {
                states.set(props.node, _extends({}, state, updatedState));
                props.node.render();
            });
        };

        return _extends({}, props, { state, setState });
    };
};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _virtualDom = __webpack_require__(16);

var _htmlToVdom = __webpack_require__(122);

var _htmlToVdom2 = _interopRequireDefault(_htmlToVdom);

var _once = __webpack_require__(32);

var _once2 = _interopRequireDefault(_once);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} props
 * @return {Object}
 */
exports.default = (0, _once2.default)(function (props) {

    const html = props.node.innerHTML.trim();
    const children = (0, _htmlToVdom2.default)({ VNode: _virtualDom.VNode, VText: _virtualDom.VText })({
        getVNodeKey: function (attributes) {
            return attributes.id;
        }
    }, html);

    return _extends({}, props, { children });
});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = __webpack_require__(135);

var _environment = __webpack_require__(14);

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} schema
 * @return {Function}
 */
exports.default = function (schema) {

    return function (props) {
        (0, _environment2.default)() && (0, _propTypes.validate)(schema, props, props.node.nodeName.toLowerCase());
        return props;
    };
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _humps = __webpack_require__(82);

/**
 * @constant nodes
 * @type {WeakMap}
 */
const nodes = new WeakMap();

/**
 * @method transform
 * @param {Object} props
 * @return {String}
 */
const transform = function (props) {

    return '' + Object.keys(props).map(function (key) {
        const name = (0, _humps.decamelize)(key, { separator: '-' });
        return '--' + name + ': ' + props[key] + '; ';
    }).join('').trim();
};

/**
 * @param {Function} fn
 * @return {Function}
 */

exports.default = function (fn) {

    return function (props) {

        const hasNode = nodes.has(props.node);
        !hasNode && nodes.set(props.node, document.createElement('style'));

        const styleNode = nodes.get(props.node);
        !hasNode && styleNode.setAttribute('type', 'text/css');

        // Update the style's HTML content, and then append it to the root node, if it doesn't
        // already exist there.
        styleNode.innerHTML = ':host { ' + transform(fn(props)) + ' }';
        !props.attached && props.node.shadowRoot.appendChild(styleNode);

        return props;
    };
};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

var parseCssUrls = __webpack_require__(104);
module.exports = parseCssUrls;


/***/ },
/* 104 */
/***/ function(module, exports) {

var embeddedRegexp = /data:(.*?);base64,/;
var commentRegexp = /\/\*([\s\S]*?)\*\//g;
var urlsRegexp = /((?:@import\s+)?url\s*\(['"]?)(\S*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

function isEmbedded (src) {
	return embeddedRegexp.test(src);
}

function getUrls (text) {
	var urls = [];
	var urlMatch, url;

	text = text.replace(commentRegexp, '');

	while (urlMatch = urlsRegexp.exec(text)) {
		// Match 2 group if '[@import] url(path)', match 5 group if '@import path'
		url = urlMatch[2] || urlMatch[5];

		if (url && !isEmbedded(url) && urls.indexOf(url) === -1) {
			urls.push(url);
		}
	}

	return urls;
}

module.exports = getUrls;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

/*
  Module dependencies
*/
var ElementType = __webpack_require__(106);
var entities = __webpack_require__(118);

/*
  Boolean Attributes
*/
var booleanAttributes = {
  __proto__: null,
  allowfullscreen: true,
  async: true,
  autofocus: true,
  autoplay: true,
  checked: true,
  controls: true,
  default: true,
  defer: true,
  disabled: true,
  hidden: true,
  ismap: true,
  loop: true,
  multiple: true,
  muted: true,
  open: true,
  readonly: true,
  required: true,
  reversed: true,
  scoped: true,
  seamless: true,
  selected: true,
  typemustmatch: true
};

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '',
      value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    if (!value && booleanAttributes[key]) {
      output += key;
    } else {
      output += key + '="' + (opts.decodeEntities ? entities.encodeXML(value) : value) + '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
};


var render = module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for(var i = 0; i < dom.length; i++){
    var elem = dom[i];

    if (elem.type === 'root')
      output += render(elem.children, opts);
    else if (ElementType.isTag(elem))
      output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment)
      output += renderComment(elem);
    else if (elem.type === ElementType.CDATA)
      output += renderCdata(elem);
    else
      output += renderText(elem, opts);
  }

  return output;
};

function renderTag(elem, opts) {
  // Handle SVG
  if (elem.name === "svg") opts = {decodeEntities: opts.decodeEntities, xmlMode: true};

  var tag = '<' + elem.name,
      attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (
    opts.xmlMode
    && (!elem.children || elem.children.length === 0)
  ) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (opts.decodeEntities && !(elem.parent && elem.parent.name in unencodedElements)) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}


/***/ },
/* 106 */
/***/ function(module, exports) {

//Types of elements found in the DOM
module.exports = {
	Text: "text", //Text
	Directive: "directive", //<? ... ?>
	Comment: "comment", //<!-- ... -->
	Script: "script", //<script> tags
	Style: "style", //<style> tags
	Tag: "tag", //Any tag
	CDATA: "cdata", //<![CDATA[ ... ]]>

	isTag: function(elem){
		return elem.type === "tag" || elem.type === "script" || elem.type === "style";
	}
};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(18);

var re_whitespace = /\s+/g;
var NodePrototype = __webpack_require__(76);
var ElementPrototype = __webpack_require__(108);

function DomHandler(callback, options, elementCB){
	if(typeof callback === "object"){
		elementCB = options;
		options = callback;
		callback = null;
	} else if(typeof options === "function"){
		elementCB = options;
		options = defaultOpts;
	}
	this._callback = callback;
	this._options = options || defaultOpts;
	this._elementCB = elementCB;
	this.dom = [];
	this._done = false;
	this._tagStack = [];
	this._parser = this._parser || null;
}

//default options
var defaultOpts = {
	normalizeWhitespace: false, //Replace all whitespace with single spaces
	withStartIndices: false, //Add startIndex properties to nodes
};

DomHandler.prototype.onparserinit = function(parser){
	this._parser = parser;
};

//Resets the handler back to starting state
DomHandler.prototype.onreset = function(){
	DomHandler.call(this, this._callback, this._options, this._elementCB);
};

//Signals the handler that parsing is done
DomHandler.prototype.onend = function(){
	if(this._done) return;
	this._done = true;
	this._parser = null;
	this._handleCallback(null);
};

DomHandler.prototype._handleCallback =
DomHandler.prototype.onerror = function(error){
	if(typeof this._callback === "function"){
		this._callback(error, this.dom);
	} else {
		if(error) throw error;
	}
};

DomHandler.prototype.onclosetag = function(){
	//if(this._tagStack.pop().name !== name) this._handleCallback(Error("Tagname didn't match!"));
	var elem = this._tagStack.pop();
	if(this._elementCB) this._elementCB(elem);
};

DomHandler.prototype._addDomElement = function(element){
	var parent = this._tagStack[this._tagStack.length - 1];
	var siblings = parent ? parent.children : this.dom;
	var previousSibling = siblings[siblings.length - 1];

	element.next = null;

	if(this._options.withStartIndices){
		element.startIndex = this._parser.startIndex;
	}

	if (this._options.withDomLvl1) {
		element.__proto__ = element.type === "tag" ? ElementPrototype : NodePrototype;
	}

	if(previousSibling){
		element.prev = previousSibling;
		previousSibling.next = element;
	} else {
		element.prev = null;
	}

	siblings.push(element);
	element.parent = parent || null;
};

DomHandler.prototype.onopentag = function(name, attribs){
	var element = {
		type: name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag,
		name: name,
		attribs: attribs,
		children: []
	};

	this._addDomElement(element);

	this._tagStack.push(element);
};

DomHandler.prototype.ontext = function(data){
	//the ignoreWhitespace is officially dropped, but for now,
	//it's an alias for normalizeWhitespace
	var normalize = this._options.normalizeWhitespace || this._options.ignoreWhitespace;

	var lastTag;

	if(!this._tagStack.length && this.dom.length && (lastTag = this.dom[this.dom.length-1]).type === ElementType.Text){
		if(normalize){
			lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
		} else {
			lastTag.data += data;
		}
	} else {
		if(
			this._tagStack.length &&
			(lastTag = this._tagStack[this._tagStack.length - 1]) &&
			(lastTag = lastTag.children[lastTag.children.length - 1]) &&
			lastTag.type === ElementType.Text
		){
			if(normalize){
				lastTag.data = (lastTag.data + data).replace(re_whitespace, " ");
			} else {
				lastTag.data += data;
			}
		} else {
			if(normalize){
				data = data.replace(re_whitespace, " ");
			}

			this._addDomElement({
				data: data,
				type: ElementType.Text
			});
		}
	}
};

DomHandler.prototype.oncomment = function(data){
	var lastTag = this._tagStack[this._tagStack.length - 1];

	if(lastTag && lastTag.type === ElementType.Comment){
		lastTag.data += data;
		return;
	}

	var element = {
		data: data,
		type: ElementType.Comment
	};

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncdatastart = function(){
	var element = {
		children: [{
			data: "",
			type: ElementType.Text
		}],
		type: ElementType.CDATA
	};

	this._addDomElement(element);
	this._tagStack.push(element);
};

DomHandler.prototype.oncommentend = DomHandler.prototype.oncdataend = function(){
	this._tagStack.pop();
};

DomHandler.prototype.onprocessinginstruction = function(name, data){
	this._addDomElement({
		name: name,
		data: data,
		type: ElementType.Directive
	});
};

module.exports = DomHandler;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

// DOM-Level-1-compliant structure
var NodePrototype = __webpack_require__(76);
var ElementPrototype = module.exports = Object.create(NodePrototype);

var domLvl1 = {
	tagName: "name"
};

Object.keys(domLvl1).forEach(function(key) {
	var shorthand = domLvl1[key];
	Object.defineProperty(ElementPrototype, key, {
		get: function() {
			return this[shorthand] || null;
		},
		set: function(val) {
			this[shorthand] = val;
			return val;
		}
	});
});


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

var DomUtils = module.exports;

[
	__webpack_require__(114),
	__webpack_require__(115),
	__webpack_require__(112),
	__webpack_require__(113),
	__webpack_require__(111),
	__webpack_require__(110)
].forEach(function(ext){
	Object.keys(ext).forEach(function(key){
		DomUtils[key] = ext[key].bind(DomUtils);
	});
});


/***/ },
/* 110 */
/***/ function(module, exports) {

// removeSubsets
// Given an array of nodes, remove any member that is contained by another.
exports.removeSubsets = function(nodes) {
	var idx = nodes.length, node, ancestor, replace;

	// Check if each node (or one of its ancestors) is already contained in the
	// array.
	while (--idx > -1) {
		node = ancestor = nodes[idx];

		// Temporarily remove the node under consideration
		nodes[idx] = null;
		replace = true;

		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = ancestor.parent;
		}

		// If the node has been found to be unique, re-insert it.
		if (replace) {
			nodes[idx] = node;
		}
	}

	return nodes;
};

// Source: http://dom.spec.whatwg.org/#dom-node-comparedocumentposition
var POSITION = {
	DISCONNECTED: 1,
	PRECEDING: 2,
	FOLLOWING: 4,
	CONTAINS: 8,
	CONTAINED_BY: 16
};

// Compare the position of one node against another node in any other document.
// The return value is a bitmask with the following values:
//
// document order:
// > There is an ordering, document order, defined on all the nodes in the
// > document corresponding to the order in which the first character of the
// > XML representation of each node occurs in the XML representation of the
// > document after expansion of general entities. Thus, the document element
// > node will be the first node. Element nodes occur before their children.
// > Thus, document order orders element nodes in order of the occurrence of
// > their start-tag in the XML (after expansion of entities). The attribute
// > nodes of an element occur after the element and before its children. The
// > relative order of attribute nodes is implementation-dependent./
// Source:
// http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
//
// @argument {Node} nodaA The first node to use in the comparison
// @argument {Node} nodeB The second node to use in the comparison
//
// @return {Number} A bitmask describing the input nodes' relative position.
//         See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
//         a description of these values.
var comparePos = exports.compareDocumentPosition = function(nodeA, nodeB) {
	var aParents = [];
	var bParents = [];
	var current, sharedParent, siblings, aSibling, bSibling, idx;

	if (nodeA === nodeB) {
		return 0;
	}

	current = nodeA;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = nodeB;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}

	idx = 0;
	while (aParents[idx] === bParents[idx]) {
		idx++;
	}

	if (idx === 0) {
		return POSITION.DISCONNECTED;
	}

	sharedParent = aParents[idx - 1];
	siblings = sharedParent.children;
	aSibling = aParents[idx];
	bSibling = bParents[idx];

	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) {
			return POSITION.FOLLOWING | POSITION.CONTAINED_BY;
		}
		return POSITION.FOLLOWING;
	} else {
		if (sharedParent === nodeA) {
			return POSITION.PRECEDING | POSITION.CONTAINS;
		}
		return POSITION.PRECEDING;
	}
};

// Sort an array of nodes based on their relative position in the document and
// remove any duplicate nodes. If the array contains nodes that do not belong
// to the same document, sort order is unspecified.
//
// @argument {Array} nodes Array of DOM nodes
//
// @returns {Array} collection of unique nodes, sorted in document order
exports.uniqueSort = function(nodes) {
	var idx = nodes.length, node, position;

	nodes = nodes.slice();

	while (--idx > -1) {
		node = nodes[idx];
		position = nodes.indexOf(node);
		if (position > -1 && position < idx) {
			nodes.splice(idx, 1);
		}
	}
	nodes.sort(function(a, b) {
		var relative = comparePos(a, b);
		if (relative & POSITION.PRECEDING) {
			return -1;
		} else if (relative & POSITION.FOLLOWING) {
			return 1;
		}
		return 0;
	});

	return nodes;
};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(18);
var isTag = exports.isTag = ElementType.isTag;

exports.testElement = function(options, element){
	for(var key in options){
		if(!options.hasOwnProperty(key));
		else if(key === "tag_name"){
			if(!isTag(element) || !options.tag_name(element.name)){
				return false;
			}
		} else if(key === "tag_type"){
			if(!options.tag_type(element.type)) return false;
		} else if(key === "tag_contains"){
			if(isTag(element) || !options.tag_contains(element.data)){
				return false;
			}
		} else if(!element.attribs || !options[key](element.attribs[key])){
			return false;
		}
	}
	return true;
};

var Checks = {
	tag_name: function(name){
		if(typeof name === "function"){
			return function(elem){ return isTag(elem) && name(elem.name); };
		} else if(name === "*"){
			return isTag;
		} else {
			return function(elem){ return isTag(elem) && elem.name === name; };
		}
	},
	tag_type: function(type){
		if(typeof type === "function"){
			return function(elem){ return type(elem.type); };
		} else {
			return function(elem){ return elem.type === type; };
		}
	},
	tag_contains: function(data){
		if(typeof data === "function"){
			return function(elem){ return !isTag(elem) && data(elem.data); };
		} else {
			return function(elem){ return !isTag(elem) && elem.data === data; };
		}
	}
};

function getAttribCheck(attrib, value){
	if(typeof value === "function"){
		return function(elem){ return elem.attribs && value(elem.attribs[attrib]); };
	} else {
		return function(elem){ return elem.attribs && elem.attribs[attrib] === value; };
	}
}

function combineFuncs(a, b){
	return function(elem){
		return a(elem) || b(elem);
	};
}

exports.getElements = function(options, element, recurse, limit){
	var funcs = Object.keys(options).map(function(key){
		var value = options[key];
		return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
	});

	return funcs.length === 0 ? [] : this.filter(
		funcs.reduce(combineFuncs),
		element, recurse, limit
	);
};

exports.getElementById = function(id, element, recurse){
	if(!Array.isArray(element)) element = [element];
	return this.findOne(getAttribCheck("id", id), element, recurse !== false);
};

exports.getElementsByTagName = function(name, element, recurse, limit){
	return this.filter(Checks.tag_name(name), element, recurse, limit);
};

exports.getElementsByTagType = function(type, element, recurse, limit){
	return this.filter(Checks.tag_type(type), element, recurse, limit);
};


/***/ },
/* 112 */
/***/ function(module, exports) {

exports.removeElement = function(elem){
	if(elem.prev) elem.prev.next = elem.next;
	if(elem.next) elem.next.prev = elem.prev;

	if(elem.parent){
		var childs = elem.parent.children;
		childs.splice(childs.lastIndexOf(elem), 1);
	}
};

exports.replaceElement = function(elem, replacement){
	var prev = replacement.prev = elem.prev;
	if(prev){
		prev.next = replacement;
	}

	var next = replacement.next = elem.next;
	if(next){
		next.prev = replacement;
	}

	var parent = replacement.parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
	}
};

exports.appendChild = function(elem, child){
	child.parent = elem;

	if(elem.children.push(child) !== 1){
		var sibling = elem.children[elem.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
		child.next = null;
	}
};

exports.append = function(elem, next){
	var parent = elem.parent,
		currNext = elem.next;

	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;

	if(currNext){
		currNext.prev = next;
		if(parent){
			var childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if(parent){
		parent.children.push(next);
	}
};

exports.prepend = function(elem, prev){
	var parent = elem.parent;
	if(parent){
		var childs = parent.children;
		childs.splice(childs.lastIndexOf(elem), 0, prev);
	}

	if(elem.prev){
		elem.prev.next = prev;
	}
	
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
};




/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

var isTag = __webpack_require__(18).isTag;

module.exports = {
	filter: filter,
	find: find,
	findOneChild: findOneChild,
	findOne: findOne,
	existsOne: existsOne,
	findAll: findAll
};

function filter(test, element, recurse, limit){
	if(!Array.isArray(element)) element = [element];

	if(typeof limit !== "number" || !isFinite(limit)){
		limit = Infinity;
	}
	return find(test, element, recurse !== false, limit);
}

function find(test, elems, recurse, limit){
	var result = [], childs;

	for(var i = 0, j = elems.length; i < j; i++){
		if(test(elems[i])){
			result.push(elems[i]);
			if(--limit <= 0) break;
		}

		childs = elems[i].children;
		if(recurse && childs && childs.length > 0){
			childs = find(test, childs, recurse, limit);
			result = result.concat(childs);
			limit -= childs.length;
			if(limit <= 0) break;
		}
	}

	return result;
}

function findOneChild(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(test(elems[i])) return elems[i];
	}

	return null;
}

function findOne(test, elems){
	var elem = null;

	for(var i = 0, l = elems.length; i < l && !elem; i++){
		if(!isTag(elems[i])){
			continue;
		} else if(test(elems[i])){
			elem = elems[i];
		} else if(elems[i].children.length > 0){
			elem = findOne(test, elems[i].children);
		}
	}

	return elem;
}

function existsOne(test, elems){
	for(var i = 0, l = elems.length; i < l; i++){
		if(
			isTag(elems[i]) && (
				test(elems[i]) || (
					elems[i].children.length > 0 &&
					existsOne(test, elems[i].children)
				)
			)
		){
			return true;
		}
	}

	return false;
}

function findAll(test, elems){
	var result = [];
	for(var i = 0, j = elems.length; i < j; i++){
		if(!isTag(elems[i])) continue;
		if(test(elems[i])) result.push(elems[i]);

		if(elems[i].children.length > 0){
			result = result.concat(findAll(test, elems[i].children));
		}
	}
	return result;
}


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var ElementType = __webpack_require__(18),
    getOuterHTML = __webpack_require__(105),
    isTag = ElementType.isTag;

module.exports = {
	getInnerHTML: getInnerHTML,
	getOuterHTML: getOuterHTML,
	getText: getText
};

function getInnerHTML(elem, opts){
	return elem.children ? elem.children.map(function(elem){
		return getOuterHTML(elem, opts);
	}).join("") : "";
}

function getText(elem){
	if(Array.isArray(elem)) return elem.map(getText).join("");
	if(isTag(elem) || elem.type === ElementType.CDATA) return getText(elem.children);
	if(elem.type === ElementType.Text) return elem.data;
	return "";
}


/***/ },
/* 115 */
/***/ function(module, exports) {

var getChildren = exports.getChildren = function(elem){
	return elem.children;
};

var getParent = exports.getParent = function(elem){
	return elem.parent;
};

exports.getSiblings = function(elem){
	var parent = getParent(elem);
	return parent ? getChildren(parent) : [elem];
};

exports.getAttributeValue = function(elem, name){
	return elem.attribs && elem.attribs[name];
};

exports.hasAttrib = function(elem, name){
	return !!elem.attribs && hasOwnProperty.call(elem.attribs, name);
};

exports.getName = function(elem){
	return elem.name;
};


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var punycode = __webpack_require__(85);
var entities = __webpack_require__(132);

module.exports = decode;

function decode (str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }

    return str.replace(/&(#?[^;\W]+;?)/g, function (_, match) {
        var m;
        if (m = /^#(\d+);?$/.exec(match)) {
            return punycode.ucs2.encode([ parseInt(m[1], 10) ]);
        } else if (m = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match)) {
            return punycode.ucs2.encode([ parseInt(m[1], 16) ]);
        } else {
            // named entity
            var hasSemi = /;$/.test(match);
            var withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
            var target = entities[withoutSemi] || (hasSemi && entities[match]);

            if (typeof target === 'number') {
                return punycode.ucs2.encode([ target ]);
            } else if (typeof target === 'string') {
                return target;
            } else {
                return '&' + match;
            }
        }
    });
}


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

var punycode = __webpack_require__(85);
var revEntities = __webpack_require__(133);

module.exports = encode;

function encode (str, opts) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }
    if (!opts) opts = {};

    var numeric = true;
    if (opts.named) numeric = false;
    if (opts.numeric !== undefined) numeric = opts.numeric;

    var special = opts.special || {
        '"': true, "'": true,
        '<': true, '>': true,
        '&': true
    };

    var codePoints = punycode.ucs2.decode(str);
    var chars = [];
    for (var i = 0; i < codePoints.length; i++) {
        var cc = codePoints[i];
        var c = punycode.ucs2.encode([ cc ]);
        var e = revEntities[cc];
        if (e && (cc >= 127 || special[c]) && !numeric) {
            chars.push('&' + (/;$/.test(e) ? e : e + ';'));
        }
        else if (cc < 32 || cc >= 127 || special[c]) {
            chars.push('&#' + cc + ';');
        }
        else {
            chars.push(c);
        }
    }
    return chars.join('');
}


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var encode = __webpack_require__(120),
    decode = __webpack_require__(119);

exports.decode = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function(data, level){
	return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 =
exports.encodeHTML5 =
exports.encodeHTML  = encode.HTML;

exports.decodeXML =
exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 =
exports.decodeHTML5 =
exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict =
exports.decodeHTML5Strict =
exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(46),
    legacyMap = __webpack_require__(84),
    xmlMap    = __webpack_require__(47),
    decodeCodePoint = __webpack_require__(78);

var decodeXMLStrict  = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map){
	var keys = Object.keys(map).join("|"),
	    replace = getReplacer(map);

	keys += "|#[xX][\\da-fA-F]+|#\\d+";

	var re = new RegExp("&(?:" + keys + ");", "g");

	return function(str){
		return String(str).replace(re, replace);
	};
}

var decodeHTML = (function(){
	var legacy = Object.keys(legacyMap)
		.sort(sorter);

	var keys = Object.keys(entityMap)
		.sort(sorter);

	for(var i = 0, j = 0; i < keys.length; i++){
		if(legacy[j] === keys[i]){
			keys[i] += ";?";
			j++;
		} else {
			keys[i] += ";";
		}
	}

	var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
	    replace = getReplacer(entityMap);

	function replacer(str){
		if(str.substr(-1) !== ";") str += ";";
		return replace(str);
	}

	//TODO consider creating a merged map
	return function(str){
		return String(str).replace(re, replacer);
	};
}());

function sorter(a, b){
	return a < b ? 1 : -1;
}

function getReplacer(map){
	return function replace(str){
		if(str.charAt(1) === "#"){
			if(str.charAt(2) === "X" || str.charAt(2) === "x"){
				return decodeCodePoint(parseInt(str.substr(3), 16));
			}
			return decodeCodePoint(parseInt(str.substr(2), 10));
		}
		return map[str.slice(1, -1)];
	};
}

module.exports = {
	XML: decodeXMLStrict,
	HTML: decodeHTML,
	HTMLStrict: decodeHTMLStrict
};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

var inverseXML = getInverseObj(__webpack_require__(47)),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(__webpack_require__(46)),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	//TODO add ranges
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data){
	return data
			.replace(re_xmlChars, singleCharReplacer)
			.replace(re_astralSymbols, astralReplacer)
			.replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

var convertHTML = __webpack_require__(124);
module.exports = function initializeConverter (dependencies) {
    if (!dependencies.VNode || !dependencies.VText) {
        throw new Error('html-to-vdom needs to be initialized with VNode and VText');
    }
    return convertHTML(dependencies.VNode, dependencies.VText);
};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

/*
    Adapted from https://github.com/facebook/react/blob/c265504fe2fdeadf0e5358879a3c141628b37a23/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
 */
var decode = __webpack_require__(77).decode;

var MUST_USE_ATTRIBUTE = 0x1;
var MUST_USE_PROPERTY = 0x2;
var HAS_BOOLEAN_VALUE = 0x8;
var HAS_NUMERIC_VALUE = 0x10;
var HAS_POSITIVE_NUMERIC_VALUE = 0x20 | 0x10;
var HAS_OVERLOADED_BOOLEAN_VALUE = 0x40;

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var isCustomAttribute = RegExp.prototype.test.bind(
    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
);

var HTMLDOMPropertyConfig = {
  
  Properties: {
    /**
     * Standard Properties
     */
    accept: null,
    acceptCharset: null,
    accessKey: null,
    action: null,
    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    allowTransparency: MUST_USE_ATTRIBUTE,
    alt: null,
    async: HAS_BOOLEAN_VALUE,
    autoComplete: null,
    autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    cellPadding: null,
    cellSpacing: null,
    charSet: MUST_USE_ATTRIBUTE,
    challenge: MUST_USE_ATTRIBUTE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    classID: MUST_USE_ATTRIBUTE,
    // To set className on SVG elements, it's necessary to use .setAttribute;
    // this works on HTML elements too in all browsers except IE8.
    className: MUST_USE_ATTRIBUTE,
    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    colSpan: null,
    content: null,
    contentEditable: null,
    contextMenu: MUST_USE_ATTRIBUTE,
    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    coords: null,
    crossOrigin: null,
    data: null, // For `<object />` acts as `src`.
    dateTime: MUST_USE_ATTRIBUTE,
    defer: HAS_BOOLEAN_VALUE,
    dir: null,
    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: null,
    encType: null,
    form: MUST_USE_ATTRIBUTE,
    formAction: MUST_USE_ATTRIBUTE,
    formEncType: MUST_USE_ATTRIBUTE,
    formMethod: MUST_USE_ATTRIBUTE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    formTarget: MUST_USE_ATTRIBUTE,
    frameBorder: MUST_USE_ATTRIBUTE,
    headers: null,
    height: MUST_USE_ATTRIBUTE,
    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    high: null,
    href: null,
    hrefLang: null,
    htmlFor: null,
    httpEquiv: null,
    icon: null,
    id: MUST_USE_PROPERTY,
    is: MUST_USE_ATTRIBUTE,
    keyParams: MUST_USE_ATTRIBUTE,
    keyType: MUST_USE_ATTRIBUTE,
    label: null,
    lang: null,
    list: MUST_USE_ATTRIBUTE,
    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    low: null,
    manifest: MUST_USE_ATTRIBUTE,
    marginHeight: null,
    marginWidth: null,
    max: null,
    maxLength: MUST_USE_ATTRIBUTE,
    media: MUST_USE_ATTRIBUTE,
    mediaGroup: null,
    method: null,
    min: null,
    minLength: MUST_USE_ATTRIBUTE,
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    name: null,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    optimum: null,
    pattern: null,
    placeholder: null,
    poster: null,
    preload: null,
    radioGroup: null,
    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    rel: null,
    required: HAS_BOOLEAN_VALUE,
    role: MUST_USE_ATTRIBUTE,
    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: null,
    sandbox: null,
    scope: null,
    scoped: HAS_BOOLEAN_VALUE,
    scrolling: null,
    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    shape: null,
    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
    sizes: MUST_USE_ATTRIBUTE,
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: null,
    src: null,
    srcDoc: MUST_USE_PROPERTY,
    srcSet: MUST_USE_ATTRIBUTE,
    start: HAS_NUMERIC_VALUE,
    step: null,
    style: null,
    tabIndex: null,
    target: null,
    title: null,
    type: null,
    useMap: null,
    value: MUST_USE_PROPERTY,
    width: MUST_USE_ATTRIBUTE,
    wmode: MUST_USE_ATTRIBUTE,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autoCapitalize: null,
    autoCorrect: null,
    // itemProp, itemScope, itemType are for
    // Microdata support. See http://schema.org/docs/gs.html
    itemProp: MUST_USE_ATTRIBUTE,
    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
    itemType: MUST_USE_ATTRIBUTE,
    // itemID and itemRef are for Microdata support as well but
    // only specified in the the WHATWG spec document. See
    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
    itemID: MUST_USE_ATTRIBUTE,
    itemRef: MUST_USE_ATTRIBUTE,
    // property is supported for OpenGraph in meta tags.
    property: null,
    // IE-only attribute that controls focus behavior
    unselectable: MUST_USE_ATTRIBUTE
  }
};

var parseStyles = function(input) {
    var attributes = input.split(';');
    var styles = attributes.reduce(function(object, attribute){
        var entry = attribute.split(/:(.+)/);
        if (entry[0] && entry[1]) {
            object[entry[0].trim()] = entry[1].trim();
        }
        return object;
    },{});
    return styles;
};

var propertyToAttributeMapping = {
    'className': 'class',
    'htmlFor': 'for',
    'httpEquiv': 'http-equiv',
    'acceptCharset': 'accept-charset'
};

var propertyValueConversions = {
    'style': parseStyles,
    'placeholder': decode,
    'title': decode,
    'alt': decode
};

var getPropertyInfo = (function () {
    var propInfoByAttributeName = {};

    Object.keys(HTMLDOMPropertyConfig.Properties).forEach(function (propName) {
        var propConfig = HTMLDOMPropertyConfig.Properties[propName];
        var attributeName = propertyToAttributeMapping[propName] || propName.toLowerCase();

        var propertyInfo = {
            attributeName: attributeName,
            propertyName: propName,

            mustUseAttribute: checkMask(propConfig, MUST_USE_ATTRIBUTE),
            mustUseProperty: checkMask(propConfig, MUST_USE_PROPERTY),
            hasBooleanValue: checkMask(propConfig, HAS_BOOLEAN_VALUE),
            hasNumericValue: checkMask(propConfig, HAS_NUMERIC_VALUE),
            hasPositiveNumericValue:
            checkMask(propConfig, HAS_POSITIVE_NUMERIC_VALUE),
            hasOverloadedBooleanValue:
            checkMask(propConfig, HAS_OVERLOADED_BOOLEAN_VALUE),
        };

        propInfoByAttributeName[attributeName] = propertyInfo;
    });

    return function (attributeName) {
        return propInfoByAttributeName[attributeName];
    };
})();


var convertTagAttributes = function (tag) {
    var attributes = tag.attribs;

    var vdomProperties = {
        attributes: {}
    };

    Object.keys(attributes).forEach(function (attributeName) {
        var lowerCased = attributeName.toLowerCase();
        var propInfo = getPropertyInfo(lowerCased);

        var value = attributes[attributeName];
        if (isCustomAttribute(attributeName) || !propInfo) {
            vdomProperties.attributes[attributeName] = value;
            return;
        }
        
        var valueConverter = propertyValueConversions[propInfo.propertyName];
        if (valueConverter) {
            value = valueConverter(value);
        }

        if (propInfo.mustUseAttribute) {
            if (propInfo.hasBooleanValue) {
                // Boolean attributes come in as an empty string or the 
                vdomProperties.attributes[propInfo.attributeName] = '';
            }
            else {
                vdomProperties.attributes[propInfo.attributeName] = value;
            }
        }
        // Anything we don't set as an attribute is treated as a property
        else {
            var isTrue;
            if (propInfo.hasBooleanValue) {
                isTrue = (value === '' || value.toLowerCase() === propInfo.attributeName);
                vdomProperties[propInfo.propertyName] = isTrue ? true : false;
            }
            else if (propInfo.hasOverloadedBooleanValue) {
                isTrue = (value === '');
                vdomProperties[propInfo.propertyName] = isTrue ? true : value;
            }
            else if (propInfo.hasNumericValue || propInfo.hasPositiveNumericValue) {
                vdomProperties[propInfo.propertyName] = Number(value);
            }
            else {
                vdomProperties[propInfo.propertyName] = value;
            }
        }

    });

    return vdomProperties;
};

module.exports = convertTagAttributes;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

var createConverter = __webpack_require__(125);
var parseHTML = __webpack_require__(126);

module.exports = function initializeHtmlToVdom (VTree, VText) {
    var htmlparserToVdom = createConverter(VTree, VText);
    return function convertHTML(options, html) {
        var noOptions = typeof html === 'undefined' && typeof options === 'string';
        var hasOptions = !noOptions;

        // was html supplied as the only argument?
        var htmlToConvert = noOptions ? options : html;
        var getVNodeKey = hasOptions ? options.getVNodeKey : undefined;

        var tags = parseHTML(htmlToConvert);

        var convertedHTML;
        if (tags.length > 1) {
            convertedHTML = tags.map(function (tag) {
                return htmlparserToVdom.convert(tag, getVNodeKey);
            });
        }
        else {
            convertedHTML = htmlparserToVdom.convert(tags[0], getVNodeKey);
        }
        
        return convertedHTML;
    };
};


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

var decode = __webpack_require__(77).decode;
var convertTagAttributes = __webpack_require__(123);

module.exports = function createConverter (VNode, VText) {
    var converter = {
        convert: function (node, getVNodeKey) {
            if (node.type === 'tag' || node.type === 'script' || node.type === 'style') {
                return converter.convertTag(node, getVNodeKey);
            } else if (node.type === 'text') {
                return new VText(decode(node.data));
            } else {
                // converting an unsupported node, return an empty text node instead.
                return new VText('');
            }
        },
        convertTag: function (tag, getVNodeKey) {
            var attributes = convertTagAttributes(tag);
            var key;

            if (getVNodeKey) {
                key = getVNodeKey(attributes);
            }

            var children = Array.prototype.map.call(tag.children || [], function(node) {
                return converter.convert(node, getVNodeKey);
            });

            return new VNode(tag.name, attributes, children, key);
        }
    };
    return converter;
};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

var htmlparser = __webpack_require__(21);

var parseHTML = function parseHTML (html) {
    var handler = new htmlparser.DomHandler();

    var parser = new htmlparser.Parser(handler, {
        lowerCaseAttributeNames: false
    });
    parser.parseComplete(html);
    return handler.dom;
};

module.exports = parseHTML;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

module.exports = CollectingHandler;

function CollectingHandler(cbs){
	this._cbs = cbs || {};
	this.events = [];
}

var EVENTS = __webpack_require__(21).EVENTS;
Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(){
			this.events.push([name]);
			if(this._cbs[name]) this._cbs[name]();
		};
	} else if(EVENTS[name] === 1){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(a){
			this.events.push([name, a]);
			if(this._cbs[name]) this._cbs[name](a);
		};
	} else if(EVENTS[name] === 2){
		name = "on" + name;
		CollectingHandler.prototype[name] = function(a, b){
			this.events.push([name, a, b]);
			if(this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});

CollectingHandler.prototype.onreset = function(){
	this.events = [];
	if(this._cbs.onreset) this._cbs.onreset();
};

CollectingHandler.prototype.restart = function(){
	if(this._cbs.onreset) this._cbs.onreset();

	for(var i = 0, len = this.events.length; i < len; i++){
		if(this._cbs[this.events[i][0]]){

			var num = this.events[i].length;

			if(num === 1){
				this._cbs[this.events[i][0]]();
			} else if(num === 2){
				this._cbs[this.events[i][0]](this.events[i][1]);
			} else {
				this._cbs[this.events[i][0]](this.events[i][1], this.events[i][2]);
			}
		}
	}
};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

var index = __webpack_require__(21),
    DomHandler = index.DomHandler,
    DomUtils = index.DomUtils;

//TODO: make this a streamable handler
function FeedHandler(callback, options){
	this.init(callback, options);
}

__webpack_require__(5)(FeedHandler, DomHandler);

FeedHandler.prototype.init = DomHandler;

function getElements(what, where){
	return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where){
	return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse){
	return DomUtils.getText(
		DomUtils.getElementsByTagName(what, where, recurse, 1)
	).trim();
}

function addConditionally(obj, prop, what, where, recurse){
	var tmp = fetch(what, where, recurse);
	if(tmp) obj[prop] = tmp;
}

var isValidFeed = function(value){
	return value === "rss" || value === "feed" || value === "rdf:RDF";
};

FeedHandler.prototype.onend = function(){
	var feed = {},
	    feedRoot = getOneElement(isValidFeed, this.dom),
	    tmp, childs;

	if(feedRoot){
		if(feedRoot.name === "feed"){
			childs = feedRoot.children;

			feed.type = "atom";
			addConditionally(feed, "id", "id", childs);
			addConditionally(feed, "title", "title", childs);
			if((tmp = getOneElement("link", childs)) && (tmp = tmp.attribs) && (tmp = tmp.href)) feed.link = tmp;
			addConditionally(feed, "description", "subtitle", childs);
			if((tmp = fetch("updated", childs))) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "email", childs, true);

			feed.items = getElements("entry", childs).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				addConditionally(entry, "id", "id", item);
				addConditionally(entry, "title", "title", item);
				if((tmp = getOneElement("link", item)) && (tmp = tmp.attribs) && (tmp = tmp.href)) entry.link = tmp;
				if((tmp = fetch("summary", item) || fetch("content", item))) entry.description = tmp;
				if((tmp = fetch("updated", item))) entry.pubDate = new Date(tmp);
				return entry;
			});
		} else {
			childs = getOneElement("channel", feedRoot.children).children;

			feed.type = feedRoot.name.substr(0, 3);
			feed.id = "";
			addConditionally(feed, "title", "title", childs);
			addConditionally(feed, "link", "link", childs);
			addConditionally(feed, "description", "description", childs);
			if((tmp = fetch("lastBuildDate", childs))) feed.updated = new Date(tmp);
			addConditionally(feed, "author", "managingEditor", childs, true);

			feed.items = getElements("item", feedRoot.children).map(function(item){
				var entry = {}, tmp;

				item = item.children;

				addConditionally(entry, "id", "guid", item);
				addConditionally(entry, "title", "title", item);
				addConditionally(entry, "link", "link", item);
				addConditionally(entry, "description", "description", item);
				if((tmp = fetch("pubDate", item))) entry.pubDate = new Date(tmp);
				return entry;
			});
		}
	}
	this.dom = feed;
	DomHandler.prototype._handleCallback.call(
		this, feedRoot ? null : Error("couldn't find root of feed")
	);
};

module.exports = FeedHandler;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

module.exports = ProxyHandler;

function ProxyHandler(cbs){
	this._cbs = cbs || {};
}

var EVENTS = __webpack_require__(21).EVENTS;
Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(){
			if(this._cbs[name]) this._cbs[name]();
		};
	} else if(EVENTS[name] === 1){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(a){
			if(this._cbs[name]) this._cbs[name](a);
		};
	} else if(EVENTS[name] === 2){
		name = "on" + name;
		ProxyHandler.prototype[name] = function(a, b){
			if(this._cbs[name]) this._cbs[name](a, b);
		};
	} else {
		throw Error("wrong number of arguments");
	}
});

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

module.exports = Stream;

var Parser = __webpack_require__(81);

function Stream(options){
	Parser.call(this, new Cbs(this), options);
}

__webpack_require__(5)(Stream, Parser);

Stream.prototype.readable = true;

function Cbs(scope){
	this.scope = scope;
}

var EVENTS = __webpack_require__(21).EVENTS;

Object.keys(EVENTS).forEach(function(name){
	if(EVENTS[name] === 0){
		Cbs.prototype["on" + name] = function(){
			this.scope.emit(name);
		};
	} else if(EVENTS[name] === 1){
		Cbs.prototype["on" + name] = function(a){
			this.scope.emit(name, a);
		};
	} else if(EVENTS[name] === 2){
		Cbs.prototype["on" + name] = function(a, b){
			this.scope.emit(name, a, b);
		};
	} else {
		throw Error("wrong number of arguments!");
	}
});

/***/ },
/* 131 */
/***/ function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ },
/* 132 */
/***/ function(module, exports) {

module.exports = {
	"Aacute;": "Á",
	"Aacute": "Á",
	"aacute;": "á",
	"aacute": "á",
	"Abreve;": "Ă",
	"abreve;": "ă",
	"ac;": "∾",
	"acd;": "∿",
	"acE;": "∾̳",
	"Acirc;": "Â",
	"Acirc": "Â",
	"acirc;": "â",
	"acirc": "â",
	"acute;": "´",
	"acute": "´",
	"Acy;": "А",
	"acy;": "а",
	"AElig;": "Æ",
	"AElig": "Æ",
	"aelig;": "æ",
	"aelig": "æ",
	"af;": "⁡",
	"Afr;": "𝔄",
	"afr;": "𝔞",
	"Agrave;": "À",
	"Agrave": "À",
	"agrave;": "à",
	"agrave": "à",
	"alefsym;": "ℵ",
	"aleph;": "ℵ",
	"Alpha;": "Α",
	"alpha;": "α",
	"Amacr;": "Ā",
	"amacr;": "ā",
	"amalg;": "⨿",
	"AMP;": "&",
	"AMP": "&",
	"amp;": "&",
	"amp": "&",
	"And;": "⩓",
	"and;": "∧",
	"andand;": "⩕",
	"andd;": "⩜",
	"andslope;": "⩘",
	"andv;": "⩚",
	"ang;": "∠",
	"ange;": "⦤",
	"angle;": "∠",
	"angmsd;": "∡",
	"angmsdaa;": "⦨",
	"angmsdab;": "⦩",
	"angmsdac;": "⦪",
	"angmsdad;": "⦫",
	"angmsdae;": "⦬",
	"angmsdaf;": "⦭",
	"angmsdag;": "⦮",
	"angmsdah;": "⦯",
	"angrt;": "∟",
	"angrtvb;": "⊾",
	"angrtvbd;": "⦝",
	"angsph;": "∢",
	"angst;": "Å",
	"angzarr;": "⍼",
	"Aogon;": "Ą",
	"aogon;": "ą",
	"Aopf;": "𝔸",
	"aopf;": "𝕒",
	"ap;": "≈",
	"apacir;": "⩯",
	"apE;": "⩰",
	"ape;": "≊",
	"apid;": "≋",
	"apos;": "'",
	"ApplyFunction;": "⁡",
	"approx;": "≈",
	"approxeq;": "≊",
	"Aring;": "Å",
	"Aring": "Å",
	"aring;": "å",
	"aring": "å",
	"Ascr;": "𝒜",
	"ascr;": "𝒶",
	"Assign;": "≔",
	"ast;": "*",
	"asymp;": "≈",
	"asympeq;": "≍",
	"Atilde;": "Ã",
	"Atilde": "Ã",
	"atilde;": "ã",
	"atilde": "ã",
	"Auml;": "Ä",
	"Auml": "Ä",
	"auml;": "ä",
	"auml": "ä",
	"awconint;": "∳",
	"awint;": "⨑",
	"backcong;": "≌",
	"backepsilon;": "϶",
	"backprime;": "‵",
	"backsim;": "∽",
	"backsimeq;": "⋍",
	"Backslash;": "∖",
	"Barv;": "⫧",
	"barvee;": "⊽",
	"Barwed;": "⌆",
	"barwed;": "⌅",
	"barwedge;": "⌅",
	"bbrk;": "⎵",
	"bbrktbrk;": "⎶",
	"bcong;": "≌",
	"Bcy;": "Б",
	"bcy;": "б",
	"bdquo;": "„",
	"becaus;": "∵",
	"Because;": "∵",
	"because;": "∵",
	"bemptyv;": "⦰",
	"bepsi;": "϶",
	"bernou;": "ℬ",
	"Bernoullis;": "ℬ",
	"Beta;": "Β",
	"beta;": "β",
	"beth;": "ℶ",
	"between;": "≬",
	"Bfr;": "𝔅",
	"bfr;": "𝔟",
	"bigcap;": "⋂",
	"bigcirc;": "◯",
	"bigcup;": "⋃",
	"bigodot;": "⨀",
	"bigoplus;": "⨁",
	"bigotimes;": "⨂",
	"bigsqcup;": "⨆",
	"bigstar;": "★",
	"bigtriangledown;": "▽",
	"bigtriangleup;": "△",
	"biguplus;": "⨄",
	"bigvee;": "⋁",
	"bigwedge;": "⋀",
	"bkarow;": "⤍",
	"blacklozenge;": "⧫",
	"blacksquare;": "▪",
	"blacktriangle;": "▴",
	"blacktriangledown;": "▾",
	"blacktriangleleft;": "◂",
	"blacktriangleright;": "▸",
	"blank;": "␣",
	"blk12;": "▒",
	"blk14;": "░",
	"blk34;": "▓",
	"block;": "█",
	"bne;": "=⃥",
	"bnequiv;": "≡⃥",
	"bNot;": "⫭",
	"bnot;": "⌐",
	"Bopf;": "𝔹",
	"bopf;": "𝕓",
	"bot;": "⊥",
	"bottom;": "⊥",
	"bowtie;": "⋈",
	"boxbox;": "⧉",
	"boxDL;": "╗",
	"boxDl;": "╖",
	"boxdL;": "╕",
	"boxdl;": "┐",
	"boxDR;": "╔",
	"boxDr;": "╓",
	"boxdR;": "╒",
	"boxdr;": "┌",
	"boxH;": "═",
	"boxh;": "─",
	"boxHD;": "╦",
	"boxHd;": "╤",
	"boxhD;": "╥",
	"boxhd;": "┬",
	"boxHU;": "╩",
	"boxHu;": "╧",
	"boxhU;": "╨",
	"boxhu;": "┴",
	"boxminus;": "⊟",
	"boxplus;": "⊞",
	"boxtimes;": "⊠",
	"boxUL;": "╝",
	"boxUl;": "╜",
	"boxuL;": "╛",
	"boxul;": "┘",
	"boxUR;": "╚",
	"boxUr;": "╙",
	"boxuR;": "╘",
	"boxur;": "└",
	"boxV;": "║",
	"boxv;": "│",
	"boxVH;": "╬",
	"boxVh;": "╫",
	"boxvH;": "╪",
	"boxvh;": "┼",
	"boxVL;": "╣",
	"boxVl;": "╢",
	"boxvL;": "╡",
	"boxvl;": "┤",
	"boxVR;": "╠",
	"boxVr;": "╟",
	"boxvR;": "╞",
	"boxvr;": "├",
	"bprime;": "‵",
	"Breve;": "˘",
	"breve;": "˘",
	"brvbar;": "¦",
	"brvbar": "¦",
	"Bscr;": "ℬ",
	"bscr;": "𝒷",
	"bsemi;": "⁏",
	"bsim;": "∽",
	"bsime;": "⋍",
	"bsol;": "\\",
	"bsolb;": "⧅",
	"bsolhsub;": "⟈",
	"bull;": "•",
	"bullet;": "•",
	"bump;": "≎",
	"bumpE;": "⪮",
	"bumpe;": "≏",
	"Bumpeq;": "≎",
	"bumpeq;": "≏",
	"Cacute;": "Ć",
	"cacute;": "ć",
	"Cap;": "⋒",
	"cap;": "∩",
	"capand;": "⩄",
	"capbrcup;": "⩉",
	"capcap;": "⩋",
	"capcup;": "⩇",
	"capdot;": "⩀",
	"CapitalDifferentialD;": "ⅅ",
	"caps;": "∩︀",
	"caret;": "⁁",
	"caron;": "ˇ",
	"Cayleys;": "ℭ",
	"ccaps;": "⩍",
	"Ccaron;": "Č",
	"ccaron;": "č",
	"Ccedil;": "Ç",
	"Ccedil": "Ç",
	"ccedil;": "ç",
	"ccedil": "ç",
	"Ccirc;": "Ĉ",
	"ccirc;": "ĉ",
	"Cconint;": "∰",
	"ccups;": "⩌",
	"ccupssm;": "⩐",
	"Cdot;": "Ċ",
	"cdot;": "ċ",
	"cedil;": "¸",
	"cedil": "¸",
	"Cedilla;": "¸",
	"cemptyv;": "⦲",
	"cent;": "¢",
	"cent": "¢",
	"CenterDot;": "·",
	"centerdot;": "·",
	"Cfr;": "ℭ",
	"cfr;": "𝔠",
	"CHcy;": "Ч",
	"chcy;": "ч",
	"check;": "✓",
	"checkmark;": "✓",
	"Chi;": "Χ",
	"chi;": "χ",
	"cir;": "○",
	"circ;": "ˆ",
	"circeq;": "≗",
	"circlearrowleft;": "↺",
	"circlearrowright;": "↻",
	"circledast;": "⊛",
	"circledcirc;": "⊚",
	"circleddash;": "⊝",
	"CircleDot;": "⊙",
	"circledR;": "®",
	"circledS;": "Ⓢ",
	"CircleMinus;": "⊖",
	"CirclePlus;": "⊕",
	"CircleTimes;": "⊗",
	"cirE;": "⧃",
	"cire;": "≗",
	"cirfnint;": "⨐",
	"cirmid;": "⫯",
	"cirscir;": "⧂",
	"ClockwiseContourIntegral;": "∲",
	"CloseCurlyDoubleQuote;": "”",
	"CloseCurlyQuote;": "’",
	"clubs;": "♣",
	"clubsuit;": "♣",
	"Colon;": "∷",
	"colon;": ":",
	"Colone;": "⩴",
	"colone;": "≔",
	"coloneq;": "≔",
	"comma;": ",",
	"commat;": "@",
	"comp;": "∁",
	"compfn;": "∘",
	"complement;": "∁",
	"complexes;": "ℂ",
	"cong;": "≅",
	"congdot;": "⩭",
	"Congruent;": "≡",
	"Conint;": "∯",
	"conint;": "∮",
	"ContourIntegral;": "∮",
	"Copf;": "ℂ",
	"copf;": "𝕔",
	"coprod;": "∐",
	"Coproduct;": "∐",
	"COPY;": "©",
	"COPY": "©",
	"copy;": "©",
	"copy": "©",
	"copysr;": "℗",
	"CounterClockwiseContourIntegral;": "∳",
	"crarr;": "↵",
	"Cross;": "⨯",
	"cross;": "✗",
	"Cscr;": "𝒞",
	"cscr;": "𝒸",
	"csub;": "⫏",
	"csube;": "⫑",
	"csup;": "⫐",
	"csupe;": "⫒",
	"ctdot;": "⋯",
	"cudarrl;": "⤸",
	"cudarrr;": "⤵",
	"cuepr;": "⋞",
	"cuesc;": "⋟",
	"cularr;": "↶",
	"cularrp;": "⤽",
	"Cup;": "⋓",
	"cup;": "∪",
	"cupbrcap;": "⩈",
	"CupCap;": "≍",
	"cupcap;": "⩆",
	"cupcup;": "⩊",
	"cupdot;": "⊍",
	"cupor;": "⩅",
	"cups;": "∪︀",
	"curarr;": "↷",
	"curarrm;": "⤼",
	"curlyeqprec;": "⋞",
	"curlyeqsucc;": "⋟",
	"curlyvee;": "⋎",
	"curlywedge;": "⋏",
	"curren;": "¤",
	"curren": "¤",
	"curvearrowleft;": "↶",
	"curvearrowright;": "↷",
	"cuvee;": "⋎",
	"cuwed;": "⋏",
	"cwconint;": "∲",
	"cwint;": "∱",
	"cylcty;": "⌭",
	"Dagger;": "‡",
	"dagger;": "†",
	"daleth;": "ℸ",
	"Darr;": "↡",
	"dArr;": "⇓",
	"darr;": "↓",
	"dash;": "‐",
	"Dashv;": "⫤",
	"dashv;": "⊣",
	"dbkarow;": "⤏",
	"dblac;": "˝",
	"Dcaron;": "Ď",
	"dcaron;": "ď",
	"Dcy;": "Д",
	"dcy;": "д",
	"DD;": "ⅅ",
	"dd;": "ⅆ",
	"ddagger;": "‡",
	"ddarr;": "⇊",
	"DDotrahd;": "⤑",
	"ddotseq;": "⩷",
	"deg;": "°",
	"deg": "°",
	"Del;": "∇",
	"Delta;": "Δ",
	"delta;": "δ",
	"demptyv;": "⦱",
	"dfisht;": "⥿",
	"Dfr;": "𝔇",
	"dfr;": "𝔡",
	"dHar;": "⥥",
	"dharl;": "⇃",
	"dharr;": "⇂",
	"DiacriticalAcute;": "´",
	"DiacriticalDot;": "˙",
	"DiacriticalDoubleAcute;": "˝",
	"DiacriticalGrave;": "`",
	"DiacriticalTilde;": "˜",
	"diam;": "⋄",
	"Diamond;": "⋄",
	"diamond;": "⋄",
	"diamondsuit;": "♦",
	"diams;": "♦",
	"die;": "¨",
	"DifferentialD;": "ⅆ",
	"digamma;": "ϝ",
	"disin;": "⋲",
	"div;": "÷",
	"divide;": "÷",
	"divide": "÷",
	"divideontimes;": "⋇",
	"divonx;": "⋇",
	"DJcy;": "Ђ",
	"djcy;": "ђ",
	"dlcorn;": "⌞",
	"dlcrop;": "⌍",
	"dollar;": "$",
	"Dopf;": "𝔻",
	"dopf;": "𝕕",
	"Dot;": "¨",
	"dot;": "˙",
	"DotDot;": "⃜",
	"doteq;": "≐",
	"doteqdot;": "≑",
	"DotEqual;": "≐",
	"dotminus;": "∸",
	"dotplus;": "∔",
	"dotsquare;": "⊡",
	"doublebarwedge;": "⌆",
	"DoubleContourIntegral;": "∯",
	"DoubleDot;": "¨",
	"DoubleDownArrow;": "⇓",
	"DoubleLeftArrow;": "⇐",
	"DoubleLeftRightArrow;": "⇔",
	"DoubleLeftTee;": "⫤",
	"DoubleLongLeftArrow;": "⟸",
	"DoubleLongLeftRightArrow;": "⟺",
	"DoubleLongRightArrow;": "⟹",
	"DoubleRightArrow;": "⇒",
	"DoubleRightTee;": "⊨",
	"DoubleUpArrow;": "⇑",
	"DoubleUpDownArrow;": "⇕",
	"DoubleVerticalBar;": "∥",
	"DownArrow;": "↓",
	"Downarrow;": "⇓",
	"downarrow;": "↓",
	"DownArrowBar;": "⤓",
	"DownArrowUpArrow;": "⇵",
	"DownBreve;": "̑",
	"downdownarrows;": "⇊",
	"downharpoonleft;": "⇃",
	"downharpoonright;": "⇂",
	"DownLeftRightVector;": "⥐",
	"DownLeftTeeVector;": "⥞",
	"DownLeftVector;": "↽",
	"DownLeftVectorBar;": "⥖",
	"DownRightTeeVector;": "⥟",
	"DownRightVector;": "⇁",
	"DownRightVectorBar;": "⥗",
	"DownTee;": "⊤",
	"DownTeeArrow;": "↧",
	"drbkarow;": "⤐",
	"drcorn;": "⌟",
	"drcrop;": "⌌",
	"Dscr;": "𝒟",
	"dscr;": "𝒹",
	"DScy;": "Ѕ",
	"dscy;": "ѕ",
	"dsol;": "⧶",
	"Dstrok;": "Đ",
	"dstrok;": "đ",
	"dtdot;": "⋱",
	"dtri;": "▿",
	"dtrif;": "▾",
	"duarr;": "⇵",
	"duhar;": "⥯",
	"dwangle;": "⦦",
	"DZcy;": "Џ",
	"dzcy;": "џ",
	"dzigrarr;": "⟿",
	"Eacute;": "É",
	"Eacute": "É",
	"eacute;": "é",
	"eacute": "é",
	"easter;": "⩮",
	"Ecaron;": "Ě",
	"ecaron;": "ě",
	"ecir;": "≖",
	"Ecirc;": "Ê",
	"Ecirc": "Ê",
	"ecirc;": "ê",
	"ecirc": "ê",
	"ecolon;": "≕",
	"Ecy;": "Э",
	"ecy;": "э",
	"eDDot;": "⩷",
	"Edot;": "Ė",
	"eDot;": "≑",
	"edot;": "ė",
	"ee;": "ⅇ",
	"efDot;": "≒",
	"Efr;": "𝔈",
	"efr;": "𝔢",
	"eg;": "⪚",
	"Egrave;": "È",
	"Egrave": "È",
	"egrave;": "è",
	"egrave": "è",
	"egs;": "⪖",
	"egsdot;": "⪘",
	"el;": "⪙",
	"Element;": "∈",
	"elinters;": "⏧",
	"ell;": "ℓ",
	"els;": "⪕",
	"elsdot;": "⪗",
	"Emacr;": "Ē",
	"emacr;": "ē",
	"empty;": "∅",
	"emptyset;": "∅",
	"EmptySmallSquare;": "◻",
	"emptyv;": "∅",
	"EmptyVerySmallSquare;": "▫",
	"emsp;": " ",
	"emsp13;": " ",
	"emsp14;": " ",
	"ENG;": "Ŋ",
	"eng;": "ŋ",
	"ensp;": " ",
	"Eogon;": "Ę",
	"eogon;": "ę",
	"Eopf;": "𝔼",
	"eopf;": "𝕖",
	"epar;": "⋕",
	"eparsl;": "⧣",
	"eplus;": "⩱",
	"epsi;": "ε",
	"Epsilon;": "Ε",
	"epsilon;": "ε",
	"epsiv;": "ϵ",
	"eqcirc;": "≖",
	"eqcolon;": "≕",
	"eqsim;": "≂",
	"eqslantgtr;": "⪖",
	"eqslantless;": "⪕",
	"Equal;": "⩵",
	"equals;": "=",
	"EqualTilde;": "≂",
	"equest;": "≟",
	"Equilibrium;": "⇌",
	"equiv;": "≡",
	"equivDD;": "⩸",
	"eqvparsl;": "⧥",
	"erarr;": "⥱",
	"erDot;": "≓",
	"Escr;": "ℰ",
	"escr;": "ℯ",
	"esdot;": "≐",
	"Esim;": "⩳",
	"esim;": "≂",
	"Eta;": "Η",
	"eta;": "η",
	"ETH;": "Ð",
	"ETH": "Ð",
	"eth;": "ð",
	"eth": "ð",
	"Euml;": "Ë",
	"Euml": "Ë",
	"euml;": "ë",
	"euml": "ë",
	"euro;": "€",
	"excl;": "!",
	"exist;": "∃",
	"Exists;": "∃",
	"expectation;": "ℰ",
	"ExponentialE;": "ⅇ",
	"exponentiale;": "ⅇ",
	"fallingdotseq;": "≒",
	"Fcy;": "Ф",
	"fcy;": "ф",
	"female;": "♀",
	"ffilig;": "ﬃ",
	"fflig;": "ﬀ",
	"ffllig;": "ﬄ",
	"Ffr;": "𝔉",
	"ffr;": "𝔣",
	"filig;": "ﬁ",
	"FilledSmallSquare;": "◼",
	"FilledVerySmallSquare;": "▪",
	"fjlig;": "fj",
	"flat;": "♭",
	"fllig;": "ﬂ",
	"fltns;": "▱",
	"fnof;": "ƒ",
	"Fopf;": "𝔽",
	"fopf;": "𝕗",
	"ForAll;": "∀",
	"forall;": "∀",
	"fork;": "⋔",
	"forkv;": "⫙",
	"Fouriertrf;": "ℱ",
	"fpartint;": "⨍",
	"frac12;": "½",
	"frac12": "½",
	"frac13;": "⅓",
	"frac14;": "¼",
	"frac14": "¼",
	"frac15;": "⅕",
	"frac16;": "⅙",
	"frac18;": "⅛",
	"frac23;": "⅔",
	"frac25;": "⅖",
	"frac34;": "¾",
	"frac34": "¾",
	"frac35;": "⅗",
	"frac38;": "⅜",
	"frac45;": "⅘",
	"frac56;": "⅚",
	"frac58;": "⅝",
	"frac78;": "⅞",
	"frasl;": "⁄",
	"frown;": "⌢",
	"Fscr;": "ℱ",
	"fscr;": "𝒻",
	"gacute;": "ǵ",
	"Gamma;": "Γ",
	"gamma;": "γ",
	"Gammad;": "Ϝ",
	"gammad;": "ϝ",
	"gap;": "⪆",
	"Gbreve;": "Ğ",
	"gbreve;": "ğ",
	"Gcedil;": "Ģ",
	"Gcirc;": "Ĝ",
	"gcirc;": "ĝ",
	"Gcy;": "Г",
	"gcy;": "г",
	"Gdot;": "Ġ",
	"gdot;": "ġ",
	"gE;": "≧",
	"ge;": "≥",
	"gEl;": "⪌",
	"gel;": "⋛",
	"geq;": "≥",
	"geqq;": "≧",
	"geqslant;": "⩾",
	"ges;": "⩾",
	"gescc;": "⪩",
	"gesdot;": "⪀",
	"gesdoto;": "⪂",
	"gesdotol;": "⪄",
	"gesl;": "⋛︀",
	"gesles;": "⪔",
	"Gfr;": "𝔊",
	"gfr;": "𝔤",
	"Gg;": "⋙",
	"gg;": "≫",
	"ggg;": "⋙",
	"gimel;": "ℷ",
	"GJcy;": "Ѓ",
	"gjcy;": "ѓ",
	"gl;": "≷",
	"gla;": "⪥",
	"glE;": "⪒",
	"glj;": "⪤",
	"gnap;": "⪊",
	"gnapprox;": "⪊",
	"gnE;": "≩",
	"gne;": "⪈",
	"gneq;": "⪈",
	"gneqq;": "≩",
	"gnsim;": "⋧",
	"Gopf;": "𝔾",
	"gopf;": "𝕘",
	"grave;": "`",
	"GreaterEqual;": "≥",
	"GreaterEqualLess;": "⋛",
	"GreaterFullEqual;": "≧",
	"GreaterGreater;": "⪢",
	"GreaterLess;": "≷",
	"GreaterSlantEqual;": "⩾",
	"GreaterTilde;": "≳",
	"Gscr;": "𝒢",
	"gscr;": "ℊ",
	"gsim;": "≳",
	"gsime;": "⪎",
	"gsiml;": "⪐",
	"GT;": ">",
	"GT": ">",
	"Gt;": "≫",
	"gt;": ">",
	"gt": ">",
	"gtcc;": "⪧",
	"gtcir;": "⩺",
	"gtdot;": "⋗",
	"gtlPar;": "⦕",
	"gtquest;": "⩼",
	"gtrapprox;": "⪆",
	"gtrarr;": "⥸",
	"gtrdot;": "⋗",
	"gtreqless;": "⋛",
	"gtreqqless;": "⪌",
	"gtrless;": "≷",
	"gtrsim;": "≳",
	"gvertneqq;": "≩︀",
	"gvnE;": "≩︀",
	"Hacek;": "ˇ",
	"hairsp;": " ",
	"half;": "½",
	"hamilt;": "ℋ",
	"HARDcy;": "Ъ",
	"hardcy;": "ъ",
	"hArr;": "⇔",
	"harr;": "↔",
	"harrcir;": "⥈",
	"harrw;": "↭",
	"Hat;": "^",
	"hbar;": "ℏ",
	"Hcirc;": "Ĥ",
	"hcirc;": "ĥ",
	"hearts;": "♥",
	"heartsuit;": "♥",
	"hellip;": "…",
	"hercon;": "⊹",
	"Hfr;": "ℌ",
	"hfr;": "𝔥",
	"HilbertSpace;": "ℋ",
	"hksearow;": "⤥",
	"hkswarow;": "⤦",
	"hoarr;": "⇿",
	"homtht;": "∻",
	"hookleftarrow;": "↩",
	"hookrightarrow;": "↪",
	"Hopf;": "ℍ",
	"hopf;": "𝕙",
	"horbar;": "―",
	"HorizontalLine;": "─",
	"Hscr;": "ℋ",
	"hscr;": "𝒽",
	"hslash;": "ℏ",
	"Hstrok;": "Ħ",
	"hstrok;": "ħ",
	"HumpDownHump;": "≎",
	"HumpEqual;": "≏",
	"hybull;": "⁃",
	"hyphen;": "‐",
	"Iacute;": "Í",
	"Iacute": "Í",
	"iacute;": "í",
	"iacute": "í",
	"ic;": "⁣",
	"Icirc;": "Î",
	"Icirc": "Î",
	"icirc;": "î",
	"icirc": "î",
	"Icy;": "И",
	"icy;": "и",
	"Idot;": "İ",
	"IEcy;": "Е",
	"iecy;": "е",
	"iexcl;": "¡",
	"iexcl": "¡",
	"iff;": "⇔",
	"Ifr;": "ℑ",
	"ifr;": "𝔦",
	"Igrave;": "Ì",
	"Igrave": "Ì",
	"igrave;": "ì",
	"igrave": "ì",
	"ii;": "ⅈ",
	"iiiint;": "⨌",
	"iiint;": "∭",
	"iinfin;": "⧜",
	"iiota;": "℩",
	"IJlig;": "Ĳ",
	"ijlig;": "ĳ",
	"Im;": "ℑ",
	"Imacr;": "Ī",
	"imacr;": "ī",
	"image;": "ℑ",
	"ImaginaryI;": "ⅈ",
	"imagline;": "ℐ",
	"imagpart;": "ℑ",
	"imath;": "ı",
	"imof;": "⊷",
	"imped;": "Ƶ",
	"Implies;": "⇒",
	"in;": "∈",
	"incare;": "℅",
	"infin;": "∞",
	"infintie;": "⧝",
	"inodot;": "ı",
	"Int;": "∬",
	"int;": "∫",
	"intcal;": "⊺",
	"integers;": "ℤ",
	"Integral;": "∫",
	"intercal;": "⊺",
	"Intersection;": "⋂",
	"intlarhk;": "⨗",
	"intprod;": "⨼",
	"InvisibleComma;": "⁣",
	"InvisibleTimes;": "⁢",
	"IOcy;": "Ё",
	"iocy;": "ё",
	"Iogon;": "Į",
	"iogon;": "į",
	"Iopf;": "𝕀",
	"iopf;": "𝕚",
	"Iota;": "Ι",
	"iota;": "ι",
	"iprod;": "⨼",
	"iquest;": "¿",
	"iquest": "¿",
	"Iscr;": "ℐ",
	"iscr;": "𝒾",
	"isin;": "∈",
	"isindot;": "⋵",
	"isinE;": "⋹",
	"isins;": "⋴",
	"isinsv;": "⋳",
	"isinv;": "∈",
	"it;": "⁢",
	"Itilde;": "Ĩ",
	"itilde;": "ĩ",
	"Iukcy;": "І",
	"iukcy;": "і",
	"Iuml;": "Ï",
	"Iuml": "Ï",
	"iuml;": "ï",
	"iuml": "ï",
	"Jcirc;": "Ĵ",
	"jcirc;": "ĵ",
	"Jcy;": "Й",
	"jcy;": "й",
	"Jfr;": "𝔍",
	"jfr;": "𝔧",
	"jmath;": "ȷ",
	"Jopf;": "𝕁",
	"jopf;": "𝕛",
	"Jscr;": "𝒥",
	"jscr;": "𝒿",
	"Jsercy;": "Ј",
	"jsercy;": "ј",
	"Jukcy;": "Є",
	"jukcy;": "є",
	"Kappa;": "Κ",
	"kappa;": "κ",
	"kappav;": "ϰ",
	"Kcedil;": "Ķ",
	"kcedil;": "ķ",
	"Kcy;": "К",
	"kcy;": "к",
	"Kfr;": "𝔎",
	"kfr;": "𝔨",
	"kgreen;": "ĸ",
	"KHcy;": "Х",
	"khcy;": "х",
	"KJcy;": "Ќ",
	"kjcy;": "ќ",
	"Kopf;": "𝕂",
	"kopf;": "𝕜",
	"Kscr;": "𝒦",
	"kscr;": "𝓀",
	"lAarr;": "⇚",
	"Lacute;": "Ĺ",
	"lacute;": "ĺ",
	"laemptyv;": "⦴",
	"lagran;": "ℒ",
	"Lambda;": "Λ",
	"lambda;": "λ",
	"Lang;": "⟪",
	"lang;": "⟨",
	"langd;": "⦑",
	"langle;": "⟨",
	"lap;": "⪅",
	"Laplacetrf;": "ℒ",
	"laquo;": "«",
	"laquo": "«",
	"Larr;": "↞",
	"lArr;": "⇐",
	"larr;": "←",
	"larrb;": "⇤",
	"larrbfs;": "⤟",
	"larrfs;": "⤝",
	"larrhk;": "↩",
	"larrlp;": "↫",
	"larrpl;": "⤹",
	"larrsim;": "⥳",
	"larrtl;": "↢",
	"lat;": "⪫",
	"lAtail;": "⤛",
	"latail;": "⤙",
	"late;": "⪭",
	"lates;": "⪭︀",
	"lBarr;": "⤎",
	"lbarr;": "⤌",
	"lbbrk;": "❲",
	"lbrace;": "{",
	"lbrack;": "[",
	"lbrke;": "⦋",
	"lbrksld;": "⦏",
	"lbrkslu;": "⦍",
	"Lcaron;": "Ľ",
	"lcaron;": "ľ",
	"Lcedil;": "Ļ",
	"lcedil;": "ļ",
	"lceil;": "⌈",
	"lcub;": "{",
	"Lcy;": "Л",
	"lcy;": "л",
	"ldca;": "⤶",
	"ldquo;": "“",
	"ldquor;": "„",
	"ldrdhar;": "⥧",
	"ldrushar;": "⥋",
	"ldsh;": "↲",
	"lE;": "≦",
	"le;": "≤",
	"LeftAngleBracket;": "⟨",
	"LeftArrow;": "←",
	"Leftarrow;": "⇐",
	"leftarrow;": "←",
	"LeftArrowBar;": "⇤",
	"LeftArrowRightArrow;": "⇆",
	"leftarrowtail;": "↢",
	"LeftCeiling;": "⌈",
	"LeftDoubleBracket;": "⟦",
	"LeftDownTeeVector;": "⥡",
	"LeftDownVector;": "⇃",
	"LeftDownVectorBar;": "⥙",
	"LeftFloor;": "⌊",
	"leftharpoondown;": "↽",
	"leftharpoonup;": "↼",
	"leftleftarrows;": "⇇",
	"LeftRightArrow;": "↔",
	"Leftrightarrow;": "⇔",
	"leftrightarrow;": "↔",
	"leftrightarrows;": "⇆",
	"leftrightharpoons;": "⇋",
	"leftrightsquigarrow;": "↭",
	"LeftRightVector;": "⥎",
	"LeftTee;": "⊣",
	"LeftTeeArrow;": "↤",
	"LeftTeeVector;": "⥚",
	"leftthreetimes;": "⋋",
	"LeftTriangle;": "⊲",
	"LeftTriangleBar;": "⧏",
	"LeftTriangleEqual;": "⊴",
	"LeftUpDownVector;": "⥑",
	"LeftUpTeeVector;": "⥠",
	"LeftUpVector;": "↿",
	"LeftUpVectorBar;": "⥘",
	"LeftVector;": "↼",
	"LeftVectorBar;": "⥒",
	"lEg;": "⪋",
	"leg;": "⋚",
	"leq;": "≤",
	"leqq;": "≦",
	"leqslant;": "⩽",
	"les;": "⩽",
	"lescc;": "⪨",
	"lesdot;": "⩿",
	"lesdoto;": "⪁",
	"lesdotor;": "⪃",
	"lesg;": "⋚︀",
	"lesges;": "⪓",
	"lessapprox;": "⪅",
	"lessdot;": "⋖",
	"lesseqgtr;": "⋚",
	"lesseqqgtr;": "⪋",
	"LessEqualGreater;": "⋚",
	"LessFullEqual;": "≦",
	"LessGreater;": "≶",
	"lessgtr;": "≶",
	"LessLess;": "⪡",
	"lesssim;": "≲",
	"LessSlantEqual;": "⩽",
	"LessTilde;": "≲",
	"lfisht;": "⥼",
	"lfloor;": "⌊",
	"Lfr;": "𝔏",
	"lfr;": "𝔩",
	"lg;": "≶",
	"lgE;": "⪑",
	"lHar;": "⥢",
	"lhard;": "↽",
	"lharu;": "↼",
	"lharul;": "⥪",
	"lhblk;": "▄",
	"LJcy;": "Љ",
	"ljcy;": "љ",
	"Ll;": "⋘",
	"ll;": "≪",
	"llarr;": "⇇",
	"llcorner;": "⌞",
	"Lleftarrow;": "⇚",
	"llhard;": "⥫",
	"lltri;": "◺",
	"Lmidot;": "Ŀ",
	"lmidot;": "ŀ",
	"lmoust;": "⎰",
	"lmoustache;": "⎰",
	"lnap;": "⪉",
	"lnapprox;": "⪉",
	"lnE;": "≨",
	"lne;": "⪇",
	"lneq;": "⪇",
	"lneqq;": "≨",
	"lnsim;": "⋦",
	"loang;": "⟬",
	"loarr;": "⇽",
	"lobrk;": "⟦",
	"LongLeftArrow;": "⟵",
	"Longleftarrow;": "⟸",
	"longleftarrow;": "⟵",
	"LongLeftRightArrow;": "⟷",
	"Longleftrightarrow;": "⟺",
	"longleftrightarrow;": "⟷",
	"longmapsto;": "⟼",
	"LongRightArrow;": "⟶",
	"Longrightarrow;": "⟹",
	"longrightarrow;": "⟶",
	"looparrowleft;": "↫",
	"looparrowright;": "↬",
	"lopar;": "⦅",
	"Lopf;": "𝕃",
	"lopf;": "𝕝",
	"loplus;": "⨭",
	"lotimes;": "⨴",
	"lowast;": "∗",
	"lowbar;": "_",
	"LowerLeftArrow;": "↙",
	"LowerRightArrow;": "↘",
	"loz;": "◊",
	"lozenge;": "◊",
	"lozf;": "⧫",
	"lpar;": "(",
	"lparlt;": "⦓",
	"lrarr;": "⇆",
	"lrcorner;": "⌟",
	"lrhar;": "⇋",
	"lrhard;": "⥭",
	"lrm;": "‎",
	"lrtri;": "⊿",
	"lsaquo;": "‹",
	"Lscr;": "ℒ",
	"lscr;": "𝓁",
	"Lsh;": "↰",
	"lsh;": "↰",
	"lsim;": "≲",
	"lsime;": "⪍",
	"lsimg;": "⪏",
	"lsqb;": "[",
	"lsquo;": "‘",
	"lsquor;": "‚",
	"Lstrok;": "Ł",
	"lstrok;": "ł",
	"LT;": "<",
	"LT": "<",
	"Lt;": "≪",
	"lt;": "<",
	"lt": "<",
	"ltcc;": "⪦",
	"ltcir;": "⩹",
	"ltdot;": "⋖",
	"lthree;": "⋋",
	"ltimes;": "⋉",
	"ltlarr;": "⥶",
	"ltquest;": "⩻",
	"ltri;": "◃",
	"ltrie;": "⊴",
	"ltrif;": "◂",
	"ltrPar;": "⦖",
	"lurdshar;": "⥊",
	"luruhar;": "⥦",
	"lvertneqq;": "≨︀",
	"lvnE;": "≨︀",
	"macr;": "¯",
	"macr": "¯",
	"male;": "♂",
	"malt;": "✠",
	"maltese;": "✠",
	"Map;": "⤅",
	"map;": "↦",
	"mapsto;": "↦",
	"mapstodown;": "↧",
	"mapstoleft;": "↤",
	"mapstoup;": "↥",
	"marker;": "▮",
	"mcomma;": "⨩",
	"Mcy;": "М",
	"mcy;": "м",
	"mdash;": "—",
	"mDDot;": "∺",
	"measuredangle;": "∡",
	"MediumSpace;": " ",
	"Mellintrf;": "ℳ",
	"Mfr;": "𝔐",
	"mfr;": "𝔪",
	"mho;": "℧",
	"micro;": "µ",
	"micro": "µ",
	"mid;": "∣",
	"midast;": "*",
	"midcir;": "⫰",
	"middot;": "·",
	"middot": "·",
	"minus;": "−",
	"minusb;": "⊟",
	"minusd;": "∸",
	"minusdu;": "⨪",
	"MinusPlus;": "∓",
	"mlcp;": "⫛",
	"mldr;": "…",
	"mnplus;": "∓",
	"models;": "⊧",
	"Mopf;": "𝕄",
	"mopf;": "𝕞",
	"mp;": "∓",
	"Mscr;": "ℳ",
	"mscr;": "𝓂",
	"mstpos;": "∾",
	"Mu;": "Μ",
	"mu;": "μ",
	"multimap;": "⊸",
	"mumap;": "⊸",
	"nabla;": "∇",
	"Nacute;": "Ń",
	"nacute;": "ń",
	"nang;": "∠⃒",
	"nap;": "≉",
	"napE;": "⩰̸",
	"napid;": "≋̸",
	"napos;": "ŉ",
	"napprox;": "≉",
	"natur;": "♮",
	"natural;": "♮",
	"naturals;": "ℕ",
	"nbsp;": " ",
	"nbsp": " ",
	"nbump;": "≎̸",
	"nbumpe;": "≏̸",
	"ncap;": "⩃",
	"Ncaron;": "Ň",
	"ncaron;": "ň",
	"Ncedil;": "Ņ",
	"ncedil;": "ņ",
	"ncong;": "≇",
	"ncongdot;": "⩭̸",
	"ncup;": "⩂",
	"Ncy;": "Н",
	"ncy;": "н",
	"ndash;": "–",
	"ne;": "≠",
	"nearhk;": "⤤",
	"neArr;": "⇗",
	"nearr;": "↗",
	"nearrow;": "↗",
	"nedot;": "≐̸",
	"NegativeMediumSpace;": "​",
	"NegativeThickSpace;": "​",
	"NegativeThinSpace;": "​",
	"NegativeVeryThinSpace;": "​",
	"nequiv;": "≢",
	"nesear;": "⤨",
	"nesim;": "≂̸",
	"NestedGreaterGreater;": "≫",
	"NestedLessLess;": "≪",
	"NewLine;": "\n",
	"nexist;": "∄",
	"nexists;": "∄",
	"Nfr;": "𝔑",
	"nfr;": "𝔫",
	"ngE;": "≧̸",
	"nge;": "≱",
	"ngeq;": "≱",
	"ngeqq;": "≧̸",
	"ngeqslant;": "⩾̸",
	"nges;": "⩾̸",
	"nGg;": "⋙̸",
	"ngsim;": "≵",
	"nGt;": "≫⃒",
	"ngt;": "≯",
	"ngtr;": "≯",
	"nGtv;": "≫̸",
	"nhArr;": "⇎",
	"nharr;": "↮",
	"nhpar;": "⫲",
	"ni;": "∋",
	"nis;": "⋼",
	"nisd;": "⋺",
	"niv;": "∋",
	"NJcy;": "Њ",
	"njcy;": "њ",
	"nlArr;": "⇍",
	"nlarr;": "↚",
	"nldr;": "‥",
	"nlE;": "≦̸",
	"nle;": "≰",
	"nLeftarrow;": "⇍",
	"nleftarrow;": "↚",
	"nLeftrightarrow;": "⇎",
	"nleftrightarrow;": "↮",
	"nleq;": "≰",
	"nleqq;": "≦̸",
	"nleqslant;": "⩽̸",
	"nles;": "⩽̸",
	"nless;": "≮",
	"nLl;": "⋘̸",
	"nlsim;": "≴",
	"nLt;": "≪⃒",
	"nlt;": "≮",
	"nltri;": "⋪",
	"nltrie;": "⋬",
	"nLtv;": "≪̸",
	"nmid;": "∤",
	"NoBreak;": "⁠",
	"NonBreakingSpace;": " ",
	"Nopf;": "ℕ",
	"nopf;": "𝕟",
	"Not;": "⫬",
	"not;": "¬",
	"not": "¬",
	"NotCongruent;": "≢",
	"NotCupCap;": "≭",
	"NotDoubleVerticalBar;": "∦",
	"NotElement;": "∉",
	"NotEqual;": "≠",
	"NotEqualTilde;": "≂̸",
	"NotExists;": "∄",
	"NotGreater;": "≯",
	"NotGreaterEqual;": "≱",
	"NotGreaterFullEqual;": "≧̸",
	"NotGreaterGreater;": "≫̸",
	"NotGreaterLess;": "≹",
	"NotGreaterSlantEqual;": "⩾̸",
	"NotGreaterTilde;": "≵",
	"NotHumpDownHump;": "≎̸",
	"NotHumpEqual;": "≏̸",
	"notin;": "∉",
	"notindot;": "⋵̸",
	"notinE;": "⋹̸",
	"notinva;": "∉",
	"notinvb;": "⋷",
	"notinvc;": "⋶",
	"NotLeftTriangle;": "⋪",
	"NotLeftTriangleBar;": "⧏̸",
	"NotLeftTriangleEqual;": "⋬",
	"NotLess;": "≮",
	"NotLessEqual;": "≰",
	"NotLessGreater;": "≸",
	"NotLessLess;": "≪̸",
	"NotLessSlantEqual;": "⩽̸",
	"NotLessTilde;": "≴",
	"NotNestedGreaterGreater;": "⪢̸",
	"NotNestedLessLess;": "⪡̸",
	"notni;": "∌",
	"notniva;": "∌",
	"notnivb;": "⋾",
	"notnivc;": "⋽",
	"NotPrecedes;": "⊀",
	"NotPrecedesEqual;": "⪯̸",
	"NotPrecedesSlantEqual;": "⋠",
	"NotReverseElement;": "∌",
	"NotRightTriangle;": "⋫",
	"NotRightTriangleBar;": "⧐̸",
	"NotRightTriangleEqual;": "⋭",
	"NotSquareSubset;": "⊏̸",
	"NotSquareSubsetEqual;": "⋢",
	"NotSquareSuperset;": "⊐̸",
	"NotSquareSupersetEqual;": "⋣",
	"NotSubset;": "⊂⃒",
	"NotSubsetEqual;": "⊈",
	"NotSucceeds;": "⊁",
	"NotSucceedsEqual;": "⪰̸",
	"NotSucceedsSlantEqual;": "⋡",
	"NotSucceedsTilde;": "≿̸",
	"NotSuperset;": "⊃⃒",
	"NotSupersetEqual;": "⊉",
	"NotTilde;": "≁",
	"NotTildeEqual;": "≄",
	"NotTildeFullEqual;": "≇",
	"NotTildeTilde;": "≉",
	"NotVerticalBar;": "∤",
	"npar;": "∦",
	"nparallel;": "∦",
	"nparsl;": "⫽⃥",
	"npart;": "∂̸",
	"npolint;": "⨔",
	"npr;": "⊀",
	"nprcue;": "⋠",
	"npre;": "⪯̸",
	"nprec;": "⊀",
	"npreceq;": "⪯̸",
	"nrArr;": "⇏",
	"nrarr;": "↛",
	"nrarrc;": "⤳̸",
	"nrarrw;": "↝̸",
	"nRightarrow;": "⇏",
	"nrightarrow;": "↛",
	"nrtri;": "⋫",
	"nrtrie;": "⋭",
	"nsc;": "⊁",
	"nsccue;": "⋡",
	"nsce;": "⪰̸",
	"Nscr;": "𝒩",
	"nscr;": "𝓃",
	"nshortmid;": "∤",
	"nshortparallel;": "∦",
	"nsim;": "≁",
	"nsime;": "≄",
	"nsimeq;": "≄",
	"nsmid;": "∤",
	"nspar;": "∦",
	"nsqsube;": "⋢",
	"nsqsupe;": "⋣",
	"nsub;": "⊄",
	"nsubE;": "⫅̸",
	"nsube;": "⊈",
	"nsubset;": "⊂⃒",
	"nsubseteq;": "⊈",
	"nsubseteqq;": "⫅̸",
	"nsucc;": "⊁",
	"nsucceq;": "⪰̸",
	"nsup;": "⊅",
	"nsupE;": "⫆̸",
	"nsupe;": "⊉",
	"nsupset;": "⊃⃒",
	"nsupseteq;": "⊉",
	"nsupseteqq;": "⫆̸",
	"ntgl;": "≹",
	"Ntilde;": "Ñ",
	"Ntilde": "Ñ",
	"ntilde;": "ñ",
	"ntilde": "ñ",
	"ntlg;": "≸",
	"ntriangleleft;": "⋪",
	"ntrianglelefteq;": "⋬",
	"ntriangleright;": "⋫",
	"ntrianglerighteq;": "⋭",
	"Nu;": "Ν",
	"nu;": "ν",
	"num;": "#",
	"numero;": "№",
	"numsp;": " ",
	"nvap;": "≍⃒",
	"nVDash;": "⊯",
	"nVdash;": "⊮",
	"nvDash;": "⊭",
	"nvdash;": "⊬",
	"nvge;": "≥⃒",
	"nvgt;": ">⃒",
	"nvHarr;": "⤄",
	"nvinfin;": "⧞",
	"nvlArr;": "⤂",
	"nvle;": "≤⃒",
	"nvlt;": "<⃒",
	"nvltrie;": "⊴⃒",
	"nvrArr;": "⤃",
	"nvrtrie;": "⊵⃒",
	"nvsim;": "∼⃒",
	"nwarhk;": "⤣",
	"nwArr;": "⇖",
	"nwarr;": "↖",
	"nwarrow;": "↖",
	"nwnear;": "⤧",
	"Oacute;": "Ó",
	"Oacute": "Ó",
	"oacute;": "ó",
	"oacute": "ó",
	"oast;": "⊛",
	"ocir;": "⊚",
	"Ocirc;": "Ô",
	"Ocirc": "Ô",
	"ocirc;": "ô",
	"ocirc": "ô",
	"Ocy;": "О",
	"ocy;": "о",
	"odash;": "⊝",
	"Odblac;": "Ő",
	"odblac;": "ő",
	"odiv;": "⨸",
	"odot;": "⊙",
	"odsold;": "⦼",
	"OElig;": "Œ",
	"oelig;": "œ",
	"ofcir;": "⦿",
	"Ofr;": "𝔒",
	"ofr;": "𝔬",
	"ogon;": "˛",
	"Ograve;": "Ò",
	"Ograve": "Ò",
	"ograve;": "ò",
	"ograve": "ò",
	"ogt;": "⧁",
	"ohbar;": "⦵",
	"ohm;": "Ω",
	"oint;": "∮",
	"olarr;": "↺",
	"olcir;": "⦾",
	"olcross;": "⦻",
	"oline;": "‾",
	"olt;": "⧀",
	"Omacr;": "Ō",
	"omacr;": "ō",
	"Omega;": "Ω",
	"omega;": "ω",
	"Omicron;": "Ο",
	"omicron;": "ο",
	"omid;": "⦶",
	"ominus;": "⊖",
	"Oopf;": "𝕆",
	"oopf;": "𝕠",
	"opar;": "⦷",
	"OpenCurlyDoubleQuote;": "“",
	"OpenCurlyQuote;": "‘",
	"operp;": "⦹",
	"oplus;": "⊕",
	"Or;": "⩔",
	"or;": "∨",
	"orarr;": "↻",
	"ord;": "⩝",
	"order;": "ℴ",
	"orderof;": "ℴ",
	"ordf;": "ª",
	"ordf": "ª",
	"ordm;": "º",
	"ordm": "º",
	"origof;": "⊶",
	"oror;": "⩖",
	"orslope;": "⩗",
	"orv;": "⩛",
	"oS;": "Ⓢ",
	"Oscr;": "𝒪",
	"oscr;": "ℴ",
	"Oslash;": "Ø",
	"Oslash": "Ø",
	"oslash;": "ø",
	"oslash": "ø",
	"osol;": "⊘",
	"Otilde;": "Õ",
	"Otilde": "Õ",
	"otilde;": "õ",
	"otilde": "õ",
	"Otimes;": "⨷",
	"otimes;": "⊗",
	"otimesas;": "⨶",
	"Ouml;": "Ö",
	"Ouml": "Ö",
	"ouml;": "ö",
	"ouml": "ö",
	"ovbar;": "⌽",
	"OverBar;": "‾",
	"OverBrace;": "⏞",
	"OverBracket;": "⎴",
	"OverParenthesis;": "⏜",
	"par;": "∥",
	"para;": "¶",
	"para": "¶",
	"parallel;": "∥",
	"parsim;": "⫳",
	"parsl;": "⫽",
	"part;": "∂",
	"PartialD;": "∂",
	"Pcy;": "П",
	"pcy;": "п",
	"percnt;": "%",
	"period;": ".",
	"permil;": "‰",
	"perp;": "⊥",
	"pertenk;": "‱",
	"Pfr;": "𝔓",
	"pfr;": "𝔭",
	"Phi;": "Φ",
	"phi;": "φ",
	"phiv;": "ϕ",
	"phmmat;": "ℳ",
	"phone;": "☎",
	"Pi;": "Π",
	"pi;": "π",
	"pitchfork;": "⋔",
	"piv;": "ϖ",
	"planck;": "ℏ",
	"planckh;": "ℎ",
	"plankv;": "ℏ",
	"plus;": "+",
	"plusacir;": "⨣",
	"plusb;": "⊞",
	"pluscir;": "⨢",
	"plusdo;": "∔",
	"plusdu;": "⨥",
	"pluse;": "⩲",
	"PlusMinus;": "±",
	"plusmn;": "±",
	"plusmn": "±",
	"plussim;": "⨦",
	"plustwo;": "⨧",
	"pm;": "±",
	"Poincareplane;": "ℌ",
	"pointint;": "⨕",
	"Popf;": "ℙ",
	"popf;": "𝕡",
	"pound;": "£",
	"pound": "£",
	"Pr;": "⪻",
	"pr;": "≺",
	"prap;": "⪷",
	"prcue;": "≼",
	"prE;": "⪳",
	"pre;": "⪯",
	"prec;": "≺",
	"precapprox;": "⪷",
	"preccurlyeq;": "≼",
	"Precedes;": "≺",
	"PrecedesEqual;": "⪯",
	"PrecedesSlantEqual;": "≼",
	"PrecedesTilde;": "≾",
	"preceq;": "⪯",
	"precnapprox;": "⪹",
	"precneqq;": "⪵",
	"precnsim;": "⋨",
	"precsim;": "≾",
	"Prime;": "″",
	"prime;": "′",
	"primes;": "ℙ",
	"prnap;": "⪹",
	"prnE;": "⪵",
	"prnsim;": "⋨",
	"prod;": "∏",
	"Product;": "∏",
	"profalar;": "⌮",
	"profline;": "⌒",
	"profsurf;": "⌓",
	"prop;": "∝",
	"Proportion;": "∷",
	"Proportional;": "∝",
	"propto;": "∝",
	"prsim;": "≾",
	"prurel;": "⊰",
	"Pscr;": "𝒫",
	"pscr;": "𝓅",
	"Psi;": "Ψ",
	"psi;": "ψ",
	"puncsp;": " ",
	"Qfr;": "𝔔",
	"qfr;": "𝔮",
	"qint;": "⨌",
	"Qopf;": "ℚ",
	"qopf;": "𝕢",
	"qprime;": "⁗",
	"Qscr;": "𝒬",
	"qscr;": "𝓆",
	"quaternions;": "ℍ",
	"quatint;": "⨖",
	"quest;": "?",
	"questeq;": "≟",
	"QUOT;": "\"",
	"QUOT": "\"",
	"quot;": "\"",
	"quot": "\"",
	"rAarr;": "⇛",
	"race;": "∽̱",
	"Racute;": "Ŕ",
	"racute;": "ŕ",
	"radic;": "√",
	"raemptyv;": "⦳",
	"Rang;": "⟫",
	"rang;": "⟩",
	"rangd;": "⦒",
	"range;": "⦥",
	"rangle;": "⟩",
	"raquo;": "»",
	"raquo": "»",
	"Rarr;": "↠",
	"rArr;": "⇒",
	"rarr;": "→",
	"rarrap;": "⥵",
	"rarrb;": "⇥",
	"rarrbfs;": "⤠",
	"rarrc;": "⤳",
	"rarrfs;": "⤞",
	"rarrhk;": "↪",
	"rarrlp;": "↬",
	"rarrpl;": "⥅",
	"rarrsim;": "⥴",
	"Rarrtl;": "⤖",
	"rarrtl;": "↣",
	"rarrw;": "↝",
	"rAtail;": "⤜",
	"ratail;": "⤚",
	"ratio;": "∶",
	"rationals;": "ℚ",
	"RBarr;": "⤐",
	"rBarr;": "⤏",
	"rbarr;": "⤍",
	"rbbrk;": "❳",
	"rbrace;": "}",
	"rbrack;": "]",
	"rbrke;": "⦌",
	"rbrksld;": "⦎",
	"rbrkslu;": "⦐",
	"Rcaron;": "Ř",
	"rcaron;": "ř",
	"Rcedil;": "Ŗ",
	"rcedil;": "ŗ",
	"rceil;": "⌉",
	"rcub;": "}",
	"Rcy;": "Р",
	"rcy;": "р",
	"rdca;": "⤷",
	"rdldhar;": "⥩",
	"rdquo;": "”",
	"rdquor;": "”",
	"rdsh;": "↳",
	"Re;": "ℜ",
	"real;": "ℜ",
	"realine;": "ℛ",
	"realpart;": "ℜ",
	"reals;": "ℝ",
	"rect;": "▭",
	"REG;": "®",
	"REG": "®",
	"reg;": "®",
	"reg": "®",
	"ReverseElement;": "∋",
	"ReverseEquilibrium;": "⇋",
	"ReverseUpEquilibrium;": "⥯",
	"rfisht;": "⥽",
	"rfloor;": "⌋",
	"Rfr;": "ℜ",
	"rfr;": "𝔯",
	"rHar;": "⥤",
	"rhard;": "⇁",
	"rharu;": "⇀",
	"rharul;": "⥬",
	"Rho;": "Ρ",
	"rho;": "ρ",
	"rhov;": "ϱ",
	"RightAngleBracket;": "⟩",
	"RightArrow;": "→",
	"Rightarrow;": "⇒",
	"rightarrow;": "→",
	"RightArrowBar;": "⇥",
	"RightArrowLeftArrow;": "⇄",
	"rightarrowtail;": "↣",
	"RightCeiling;": "⌉",
	"RightDoubleBracket;": "⟧",
	"RightDownTeeVector;": "⥝",
	"RightDownVector;": "⇂",
	"RightDownVectorBar;": "⥕",
	"RightFloor;": "⌋",
	"rightharpoondown;": "⇁",
	"rightharpoonup;": "⇀",
	"rightleftarrows;": "⇄",
	"rightleftharpoons;": "⇌",
	"rightrightarrows;": "⇉",
	"rightsquigarrow;": "↝",
	"RightTee;": "⊢",
	"RightTeeArrow;": "↦",
	"RightTeeVector;": "⥛",
	"rightthreetimes;": "⋌",
	"RightTriangle;": "⊳",
	"RightTriangleBar;": "⧐",
	"RightTriangleEqual;": "⊵",
	"RightUpDownVector;": "⥏",
	"RightUpTeeVector;": "⥜",
	"RightUpVector;": "↾",
	"RightUpVectorBar;": "⥔",
	"RightVector;": "⇀",
	"RightVectorBar;": "⥓",
	"ring;": "˚",
	"risingdotseq;": "≓",
	"rlarr;": "⇄",
	"rlhar;": "⇌",
	"rlm;": "‏",
	"rmoust;": "⎱",
	"rmoustache;": "⎱",
	"rnmid;": "⫮",
	"roang;": "⟭",
	"roarr;": "⇾",
	"robrk;": "⟧",
	"ropar;": "⦆",
	"Ropf;": "ℝ",
	"ropf;": "𝕣",
	"roplus;": "⨮",
	"rotimes;": "⨵",
	"RoundImplies;": "⥰",
	"rpar;": ")",
	"rpargt;": "⦔",
	"rppolint;": "⨒",
	"rrarr;": "⇉",
	"Rrightarrow;": "⇛",
	"rsaquo;": "›",
	"Rscr;": "ℛ",
	"rscr;": "𝓇",
	"Rsh;": "↱",
	"rsh;": "↱",
	"rsqb;": "]",
	"rsquo;": "’",
	"rsquor;": "’",
	"rthree;": "⋌",
	"rtimes;": "⋊",
	"rtri;": "▹",
	"rtrie;": "⊵",
	"rtrif;": "▸",
	"rtriltri;": "⧎",
	"RuleDelayed;": "⧴",
	"ruluhar;": "⥨",
	"rx;": "℞",
	"Sacute;": "Ś",
	"sacute;": "ś",
	"sbquo;": "‚",
	"Sc;": "⪼",
	"sc;": "≻",
	"scap;": "⪸",
	"Scaron;": "Š",
	"scaron;": "š",
	"sccue;": "≽",
	"scE;": "⪴",
	"sce;": "⪰",
	"Scedil;": "Ş",
	"scedil;": "ş",
	"Scirc;": "Ŝ",
	"scirc;": "ŝ",
	"scnap;": "⪺",
	"scnE;": "⪶",
	"scnsim;": "⋩",
	"scpolint;": "⨓",
	"scsim;": "≿",
	"Scy;": "С",
	"scy;": "с",
	"sdot;": "⋅",
	"sdotb;": "⊡",
	"sdote;": "⩦",
	"searhk;": "⤥",
	"seArr;": "⇘",
	"searr;": "↘",
	"searrow;": "↘",
	"sect;": "§",
	"sect": "§",
	"semi;": ";",
	"seswar;": "⤩",
	"setminus;": "∖",
	"setmn;": "∖",
	"sext;": "✶",
	"Sfr;": "𝔖",
	"sfr;": "𝔰",
	"sfrown;": "⌢",
	"sharp;": "♯",
	"SHCHcy;": "Щ",
	"shchcy;": "щ",
	"SHcy;": "Ш",
	"shcy;": "ш",
	"ShortDownArrow;": "↓",
	"ShortLeftArrow;": "←",
	"shortmid;": "∣",
	"shortparallel;": "∥",
	"ShortRightArrow;": "→",
	"ShortUpArrow;": "↑",
	"shy;": "­",
	"shy": "­",
	"Sigma;": "Σ",
	"sigma;": "σ",
	"sigmaf;": "ς",
	"sigmav;": "ς",
	"sim;": "∼",
	"simdot;": "⩪",
	"sime;": "≃",
	"simeq;": "≃",
	"simg;": "⪞",
	"simgE;": "⪠",
	"siml;": "⪝",
	"simlE;": "⪟",
	"simne;": "≆",
	"simplus;": "⨤",
	"simrarr;": "⥲",
	"slarr;": "←",
	"SmallCircle;": "∘",
	"smallsetminus;": "∖",
	"smashp;": "⨳",
	"smeparsl;": "⧤",
	"smid;": "∣",
	"smile;": "⌣",
	"smt;": "⪪",
	"smte;": "⪬",
	"smtes;": "⪬︀",
	"SOFTcy;": "Ь",
	"softcy;": "ь",
	"sol;": "/",
	"solb;": "⧄",
	"solbar;": "⌿",
	"Sopf;": "𝕊",
	"sopf;": "𝕤",
	"spades;": "♠",
	"spadesuit;": "♠",
	"spar;": "∥",
	"sqcap;": "⊓",
	"sqcaps;": "⊓︀",
	"sqcup;": "⊔",
	"sqcups;": "⊔︀",
	"Sqrt;": "√",
	"sqsub;": "⊏",
	"sqsube;": "⊑",
	"sqsubset;": "⊏",
	"sqsubseteq;": "⊑",
	"sqsup;": "⊐",
	"sqsupe;": "⊒",
	"sqsupset;": "⊐",
	"sqsupseteq;": "⊒",
	"squ;": "□",
	"Square;": "□",
	"square;": "□",
	"SquareIntersection;": "⊓",
	"SquareSubset;": "⊏",
	"SquareSubsetEqual;": "⊑",
	"SquareSuperset;": "⊐",
	"SquareSupersetEqual;": "⊒",
	"SquareUnion;": "⊔",
	"squarf;": "▪",
	"squf;": "▪",
	"srarr;": "→",
	"Sscr;": "𝒮",
	"sscr;": "𝓈",
	"ssetmn;": "∖",
	"ssmile;": "⌣",
	"sstarf;": "⋆",
	"Star;": "⋆",
	"star;": "☆",
	"starf;": "★",
	"straightepsilon;": "ϵ",
	"straightphi;": "ϕ",
	"strns;": "¯",
	"Sub;": "⋐",
	"sub;": "⊂",
	"subdot;": "⪽",
	"subE;": "⫅",
	"sube;": "⊆",
	"subedot;": "⫃",
	"submult;": "⫁",
	"subnE;": "⫋",
	"subne;": "⊊",
	"subplus;": "⪿",
	"subrarr;": "⥹",
	"Subset;": "⋐",
	"subset;": "⊂",
	"subseteq;": "⊆",
	"subseteqq;": "⫅",
	"SubsetEqual;": "⊆",
	"subsetneq;": "⊊",
	"subsetneqq;": "⫋",
	"subsim;": "⫇",
	"subsub;": "⫕",
	"subsup;": "⫓",
	"succ;": "≻",
	"succapprox;": "⪸",
	"succcurlyeq;": "≽",
	"Succeeds;": "≻",
	"SucceedsEqual;": "⪰",
	"SucceedsSlantEqual;": "≽",
	"SucceedsTilde;": "≿",
	"succeq;": "⪰",
	"succnapprox;": "⪺",
	"succneqq;": "⪶",
	"succnsim;": "⋩",
	"succsim;": "≿",
	"SuchThat;": "∋",
	"Sum;": "∑",
	"sum;": "∑",
	"sung;": "♪",
	"Sup;": "⋑",
	"sup;": "⊃",
	"sup1;": "¹",
	"sup1": "¹",
	"sup2;": "²",
	"sup2": "²",
	"sup3;": "³",
	"sup3": "³",
	"supdot;": "⪾",
	"supdsub;": "⫘",
	"supE;": "⫆",
	"supe;": "⊇",
	"supedot;": "⫄",
	"Superset;": "⊃",
	"SupersetEqual;": "⊇",
	"suphsol;": "⟉",
	"suphsub;": "⫗",
	"suplarr;": "⥻",
	"supmult;": "⫂",
	"supnE;": "⫌",
	"supne;": "⊋",
	"supplus;": "⫀",
	"Supset;": "⋑",
	"supset;": "⊃",
	"supseteq;": "⊇",
	"supseteqq;": "⫆",
	"supsetneq;": "⊋",
	"supsetneqq;": "⫌",
	"supsim;": "⫈",
	"supsub;": "⫔",
	"supsup;": "⫖",
	"swarhk;": "⤦",
	"swArr;": "⇙",
	"swarr;": "↙",
	"swarrow;": "↙",
	"swnwar;": "⤪",
	"szlig;": "ß",
	"szlig": "ß",
	"Tab;": "\t",
	"target;": "⌖",
	"Tau;": "Τ",
	"tau;": "τ",
	"tbrk;": "⎴",
	"Tcaron;": "Ť",
	"tcaron;": "ť",
	"Tcedil;": "Ţ",
	"tcedil;": "ţ",
	"Tcy;": "Т",
	"tcy;": "т",
	"tdot;": "⃛",
	"telrec;": "⌕",
	"Tfr;": "𝔗",
	"tfr;": "𝔱",
	"there4;": "∴",
	"Therefore;": "∴",
	"therefore;": "∴",
	"Theta;": "Θ",
	"theta;": "θ",
	"thetasym;": "ϑ",
	"thetav;": "ϑ",
	"thickapprox;": "≈",
	"thicksim;": "∼",
	"ThickSpace;": "  ",
	"thinsp;": " ",
	"ThinSpace;": " ",
	"thkap;": "≈",
	"thksim;": "∼",
	"THORN;": "Þ",
	"THORN": "Þ",
	"thorn;": "þ",
	"thorn": "þ",
	"Tilde;": "∼",
	"tilde;": "˜",
	"TildeEqual;": "≃",
	"TildeFullEqual;": "≅",
	"TildeTilde;": "≈",
	"times;": "×",
	"times": "×",
	"timesb;": "⊠",
	"timesbar;": "⨱",
	"timesd;": "⨰",
	"tint;": "∭",
	"toea;": "⤨",
	"top;": "⊤",
	"topbot;": "⌶",
	"topcir;": "⫱",
	"Topf;": "𝕋",
	"topf;": "𝕥",
	"topfork;": "⫚",
	"tosa;": "⤩",
	"tprime;": "‴",
	"TRADE;": "™",
	"trade;": "™",
	"triangle;": "▵",
	"triangledown;": "▿",
	"triangleleft;": "◃",
	"trianglelefteq;": "⊴",
	"triangleq;": "≜",
	"triangleright;": "▹",
	"trianglerighteq;": "⊵",
	"tridot;": "◬",
	"trie;": "≜",
	"triminus;": "⨺",
	"TripleDot;": "⃛",
	"triplus;": "⨹",
	"trisb;": "⧍",
	"tritime;": "⨻",
	"trpezium;": "⏢",
	"Tscr;": "𝒯",
	"tscr;": "𝓉",
	"TScy;": "Ц",
	"tscy;": "ц",
	"TSHcy;": "Ћ",
	"tshcy;": "ћ",
	"Tstrok;": "Ŧ",
	"tstrok;": "ŧ",
	"twixt;": "≬",
	"twoheadleftarrow;": "↞",
	"twoheadrightarrow;": "↠",
	"Uacute;": "Ú",
	"Uacute": "Ú",
	"uacute;": "ú",
	"uacute": "ú",
	"Uarr;": "↟",
	"uArr;": "⇑",
	"uarr;": "↑",
	"Uarrocir;": "⥉",
	"Ubrcy;": "Ў",
	"ubrcy;": "ў",
	"Ubreve;": "Ŭ",
	"ubreve;": "ŭ",
	"Ucirc;": "Û",
	"Ucirc": "Û",
	"ucirc;": "û",
	"ucirc": "û",
	"Ucy;": "У",
	"ucy;": "у",
	"udarr;": "⇅",
	"Udblac;": "Ű",
	"udblac;": "ű",
	"udhar;": "⥮",
	"ufisht;": "⥾",
	"Ufr;": "𝔘",
	"ufr;": "𝔲",
	"Ugrave;": "Ù",
	"Ugrave": "Ù",
	"ugrave;": "ù",
	"ugrave": "ù",
	"uHar;": "⥣",
	"uharl;": "↿",
	"uharr;": "↾",
	"uhblk;": "▀",
	"ulcorn;": "⌜",
	"ulcorner;": "⌜",
	"ulcrop;": "⌏",
	"ultri;": "◸",
	"Umacr;": "Ū",
	"umacr;": "ū",
	"uml;": "¨",
	"uml": "¨",
	"UnderBar;": "_",
	"UnderBrace;": "⏟",
	"UnderBracket;": "⎵",
	"UnderParenthesis;": "⏝",
	"Union;": "⋃",
	"UnionPlus;": "⊎",
	"Uogon;": "Ų",
	"uogon;": "ų",
	"Uopf;": "𝕌",
	"uopf;": "𝕦",
	"UpArrow;": "↑",
	"Uparrow;": "⇑",
	"uparrow;": "↑",
	"UpArrowBar;": "⤒",
	"UpArrowDownArrow;": "⇅",
	"UpDownArrow;": "↕",
	"Updownarrow;": "⇕",
	"updownarrow;": "↕",
	"UpEquilibrium;": "⥮",
	"upharpoonleft;": "↿",
	"upharpoonright;": "↾",
	"uplus;": "⊎",
	"UpperLeftArrow;": "↖",
	"UpperRightArrow;": "↗",
	"Upsi;": "ϒ",
	"upsi;": "υ",
	"upsih;": "ϒ",
	"Upsilon;": "Υ",
	"upsilon;": "υ",
	"UpTee;": "⊥",
	"UpTeeArrow;": "↥",
	"upuparrows;": "⇈",
	"urcorn;": "⌝",
	"urcorner;": "⌝",
	"urcrop;": "⌎",
	"Uring;": "Ů",
	"uring;": "ů",
	"urtri;": "◹",
	"Uscr;": "𝒰",
	"uscr;": "𝓊",
	"utdot;": "⋰",
	"Utilde;": "Ũ",
	"utilde;": "ũ",
	"utri;": "▵",
	"utrif;": "▴",
	"uuarr;": "⇈",
	"Uuml;": "Ü",
	"Uuml": "Ü",
	"uuml;": "ü",
	"uuml": "ü",
	"uwangle;": "⦧",
	"vangrt;": "⦜",
	"varepsilon;": "ϵ",
	"varkappa;": "ϰ",
	"varnothing;": "∅",
	"varphi;": "ϕ",
	"varpi;": "ϖ",
	"varpropto;": "∝",
	"vArr;": "⇕",
	"varr;": "↕",
	"varrho;": "ϱ",
	"varsigma;": "ς",
	"varsubsetneq;": "⊊︀",
	"varsubsetneqq;": "⫋︀",
	"varsupsetneq;": "⊋︀",
	"varsupsetneqq;": "⫌︀",
	"vartheta;": "ϑ",
	"vartriangleleft;": "⊲",
	"vartriangleright;": "⊳",
	"Vbar;": "⫫",
	"vBar;": "⫨",
	"vBarv;": "⫩",
	"Vcy;": "В",
	"vcy;": "в",
	"VDash;": "⊫",
	"Vdash;": "⊩",
	"vDash;": "⊨",
	"vdash;": "⊢",
	"Vdashl;": "⫦",
	"Vee;": "⋁",
	"vee;": "∨",
	"veebar;": "⊻",
	"veeeq;": "≚",
	"vellip;": "⋮",
	"Verbar;": "‖",
	"verbar;": "|",
	"Vert;": "‖",
	"vert;": "|",
	"VerticalBar;": "∣",
	"VerticalLine;": "|",
	"VerticalSeparator;": "❘",
	"VerticalTilde;": "≀",
	"VeryThinSpace;": " ",
	"Vfr;": "𝔙",
	"vfr;": "𝔳",
	"vltri;": "⊲",
	"vnsub;": "⊂⃒",
	"vnsup;": "⊃⃒",
	"Vopf;": "𝕍",
	"vopf;": "𝕧",
	"vprop;": "∝",
	"vrtri;": "⊳",
	"Vscr;": "𝒱",
	"vscr;": "𝓋",
	"vsubnE;": "⫋︀",
	"vsubne;": "⊊︀",
	"vsupnE;": "⫌︀",
	"vsupne;": "⊋︀",
	"Vvdash;": "⊪",
	"vzigzag;": "⦚",
	"Wcirc;": "Ŵ",
	"wcirc;": "ŵ",
	"wedbar;": "⩟",
	"Wedge;": "⋀",
	"wedge;": "∧",
	"wedgeq;": "≙",
	"weierp;": "℘",
	"Wfr;": "𝔚",
	"wfr;": "𝔴",
	"Wopf;": "𝕎",
	"wopf;": "𝕨",
	"wp;": "℘",
	"wr;": "≀",
	"wreath;": "≀",
	"Wscr;": "𝒲",
	"wscr;": "𝓌",
	"xcap;": "⋂",
	"xcirc;": "◯",
	"xcup;": "⋃",
	"xdtri;": "▽",
	"Xfr;": "𝔛",
	"xfr;": "𝔵",
	"xhArr;": "⟺",
	"xharr;": "⟷",
	"Xi;": "Ξ",
	"xi;": "ξ",
	"xlArr;": "⟸",
	"xlarr;": "⟵",
	"xmap;": "⟼",
	"xnis;": "⋻",
	"xodot;": "⨀",
	"Xopf;": "𝕏",
	"xopf;": "𝕩",
	"xoplus;": "⨁",
	"xotime;": "⨂",
	"xrArr;": "⟹",
	"xrarr;": "⟶",
	"Xscr;": "𝒳",
	"xscr;": "𝓍",
	"xsqcup;": "⨆",
	"xuplus;": "⨄",
	"xutri;": "△",
	"xvee;": "⋁",
	"xwedge;": "⋀",
	"Yacute;": "Ý",
	"Yacute": "Ý",
	"yacute;": "ý",
	"yacute": "ý",
	"YAcy;": "Я",
	"yacy;": "я",
	"Ycirc;": "Ŷ",
	"ycirc;": "ŷ",
	"Ycy;": "Ы",
	"ycy;": "ы",
	"yen;": "¥",
	"yen": "¥",
	"Yfr;": "𝔜",
	"yfr;": "𝔶",
	"YIcy;": "Ї",
	"yicy;": "ї",
	"Yopf;": "𝕐",
	"yopf;": "𝕪",
	"Yscr;": "𝒴",
	"yscr;": "𝓎",
	"YUcy;": "Ю",
	"yucy;": "ю",
	"Yuml;": "Ÿ",
	"yuml;": "ÿ",
	"yuml": "ÿ",
	"Zacute;": "Ź",
	"zacute;": "ź",
	"Zcaron;": "Ž",
	"zcaron;": "ž",
	"Zcy;": "З",
	"zcy;": "з",
	"Zdot;": "Ż",
	"zdot;": "ż",
	"zeetrf;": "ℨ",
	"ZeroWidthSpace;": "​",
	"Zeta;": "Ζ",
	"zeta;": "ζ",
	"Zfr;": "ℨ",
	"zfr;": "𝔷",
	"ZHcy;": "Ж",
	"zhcy;": "ж",
	"zigrarr;": "⇝",
	"Zopf;": "ℤ",
	"zopf;": "𝕫",
	"Zscr;": "𝒵",
	"zscr;": "𝓏",
	"zwj;": "‍",
	"zwnj;": "‌"
};

/***/ },
/* 133 */
/***/ function(module, exports) {

module.exports = {
	"9": "Tab;",
	"10": "NewLine;",
	"33": "excl;",
	"34": "quot;",
	"35": "num;",
	"36": "dollar;",
	"37": "percnt;",
	"38": "amp;",
	"39": "apos;",
	"40": "lpar;",
	"41": "rpar;",
	"42": "midast;",
	"43": "plus;",
	"44": "comma;",
	"46": "period;",
	"47": "sol;",
	"58": "colon;",
	"59": "semi;",
	"60": "lt;",
	"61": "equals;",
	"62": "gt;",
	"63": "quest;",
	"64": "commat;",
	"91": "lsqb;",
	"92": "bsol;",
	"93": "rsqb;",
	"94": "Hat;",
	"95": "UnderBar;",
	"96": "grave;",
	"123": "lcub;",
	"124": "VerticalLine;",
	"125": "rcub;",
	"160": "NonBreakingSpace;",
	"161": "iexcl;",
	"162": "cent;",
	"163": "pound;",
	"164": "curren;",
	"165": "yen;",
	"166": "brvbar;",
	"167": "sect;",
	"168": "uml;",
	"169": "copy;",
	"170": "ordf;",
	"171": "laquo;",
	"172": "not;",
	"173": "shy;",
	"174": "reg;",
	"175": "strns;",
	"176": "deg;",
	"177": "pm;",
	"178": "sup2;",
	"179": "sup3;",
	"180": "DiacriticalAcute;",
	"181": "micro;",
	"182": "para;",
	"183": "middot;",
	"184": "Cedilla;",
	"185": "sup1;",
	"186": "ordm;",
	"187": "raquo;",
	"188": "frac14;",
	"189": "half;",
	"190": "frac34;",
	"191": "iquest;",
	"192": "Agrave;",
	"193": "Aacute;",
	"194": "Acirc;",
	"195": "Atilde;",
	"196": "Auml;",
	"197": "Aring;",
	"198": "AElig;",
	"199": "Ccedil;",
	"200": "Egrave;",
	"201": "Eacute;",
	"202": "Ecirc;",
	"203": "Euml;",
	"204": "Igrave;",
	"205": "Iacute;",
	"206": "Icirc;",
	"207": "Iuml;",
	"208": "ETH;",
	"209": "Ntilde;",
	"210": "Ograve;",
	"211": "Oacute;",
	"212": "Ocirc;",
	"213": "Otilde;",
	"214": "Ouml;",
	"215": "times;",
	"216": "Oslash;",
	"217": "Ugrave;",
	"218": "Uacute;",
	"219": "Ucirc;",
	"220": "Uuml;",
	"221": "Yacute;",
	"222": "THORN;",
	"223": "szlig;",
	"224": "agrave;",
	"225": "aacute;",
	"226": "acirc;",
	"227": "atilde;",
	"228": "auml;",
	"229": "aring;",
	"230": "aelig;",
	"231": "ccedil;",
	"232": "egrave;",
	"233": "eacute;",
	"234": "ecirc;",
	"235": "euml;",
	"236": "igrave;",
	"237": "iacute;",
	"238": "icirc;",
	"239": "iuml;",
	"240": "eth;",
	"241": "ntilde;",
	"242": "ograve;",
	"243": "oacute;",
	"244": "ocirc;",
	"245": "otilde;",
	"246": "ouml;",
	"247": "divide;",
	"248": "oslash;",
	"249": "ugrave;",
	"250": "uacute;",
	"251": "ucirc;",
	"252": "uuml;",
	"253": "yacute;",
	"254": "thorn;",
	"255": "yuml;",
	"256": "Amacr;",
	"257": "amacr;",
	"258": "Abreve;",
	"259": "abreve;",
	"260": "Aogon;",
	"261": "aogon;",
	"262": "Cacute;",
	"263": "cacute;",
	"264": "Ccirc;",
	"265": "ccirc;",
	"266": "Cdot;",
	"267": "cdot;",
	"268": "Ccaron;",
	"269": "ccaron;",
	"270": "Dcaron;",
	"271": "dcaron;",
	"272": "Dstrok;",
	"273": "dstrok;",
	"274": "Emacr;",
	"275": "emacr;",
	"278": "Edot;",
	"279": "edot;",
	"280": "Eogon;",
	"281": "eogon;",
	"282": "Ecaron;",
	"283": "ecaron;",
	"284": "Gcirc;",
	"285": "gcirc;",
	"286": "Gbreve;",
	"287": "gbreve;",
	"288": "Gdot;",
	"289": "gdot;",
	"290": "Gcedil;",
	"292": "Hcirc;",
	"293": "hcirc;",
	"294": "Hstrok;",
	"295": "hstrok;",
	"296": "Itilde;",
	"297": "itilde;",
	"298": "Imacr;",
	"299": "imacr;",
	"302": "Iogon;",
	"303": "iogon;",
	"304": "Idot;",
	"305": "inodot;",
	"306": "IJlig;",
	"307": "ijlig;",
	"308": "Jcirc;",
	"309": "jcirc;",
	"310": "Kcedil;",
	"311": "kcedil;",
	"312": "kgreen;",
	"313": "Lacute;",
	"314": "lacute;",
	"315": "Lcedil;",
	"316": "lcedil;",
	"317": "Lcaron;",
	"318": "lcaron;",
	"319": "Lmidot;",
	"320": "lmidot;",
	"321": "Lstrok;",
	"322": "lstrok;",
	"323": "Nacute;",
	"324": "nacute;",
	"325": "Ncedil;",
	"326": "ncedil;",
	"327": "Ncaron;",
	"328": "ncaron;",
	"329": "napos;",
	"330": "ENG;",
	"331": "eng;",
	"332": "Omacr;",
	"333": "omacr;",
	"336": "Odblac;",
	"337": "odblac;",
	"338": "OElig;",
	"339": "oelig;",
	"340": "Racute;",
	"341": "racute;",
	"342": "Rcedil;",
	"343": "rcedil;",
	"344": "Rcaron;",
	"345": "rcaron;",
	"346": "Sacute;",
	"347": "sacute;",
	"348": "Scirc;",
	"349": "scirc;",
	"350": "Scedil;",
	"351": "scedil;",
	"352": "Scaron;",
	"353": "scaron;",
	"354": "Tcedil;",
	"355": "tcedil;",
	"356": "Tcaron;",
	"357": "tcaron;",
	"358": "Tstrok;",
	"359": "tstrok;",
	"360": "Utilde;",
	"361": "utilde;",
	"362": "Umacr;",
	"363": "umacr;",
	"364": "Ubreve;",
	"365": "ubreve;",
	"366": "Uring;",
	"367": "uring;",
	"368": "Udblac;",
	"369": "udblac;",
	"370": "Uogon;",
	"371": "uogon;",
	"372": "Wcirc;",
	"373": "wcirc;",
	"374": "Ycirc;",
	"375": "ycirc;",
	"376": "Yuml;",
	"377": "Zacute;",
	"378": "zacute;",
	"379": "Zdot;",
	"380": "zdot;",
	"381": "Zcaron;",
	"382": "zcaron;",
	"402": "fnof;",
	"437": "imped;",
	"501": "gacute;",
	"567": "jmath;",
	"710": "circ;",
	"711": "Hacek;",
	"728": "breve;",
	"729": "dot;",
	"730": "ring;",
	"731": "ogon;",
	"732": "tilde;",
	"733": "DiacriticalDoubleAcute;",
	"785": "DownBreve;",
	"913": "Alpha;",
	"914": "Beta;",
	"915": "Gamma;",
	"916": "Delta;",
	"917": "Epsilon;",
	"918": "Zeta;",
	"919": "Eta;",
	"920": "Theta;",
	"921": "Iota;",
	"922": "Kappa;",
	"923": "Lambda;",
	"924": "Mu;",
	"925": "Nu;",
	"926": "Xi;",
	"927": "Omicron;",
	"928": "Pi;",
	"929": "Rho;",
	"931": "Sigma;",
	"932": "Tau;",
	"933": "Upsilon;",
	"934": "Phi;",
	"935": "Chi;",
	"936": "Psi;",
	"937": "Omega;",
	"945": "alpha;",
	"946": "beta;",
	"947": "gamma;",
	"948": "delta;",
	"949": "epsilon;",
	"950": "zeta;",
	"951": "eta;",
	"952": "theta;",
	"953": "iota;",
	"954": "kappa;",
	"955": "lambda;",
	"956": "mu;",
	"957": "nu;",
	"958": "xi;",
	"959": "omicron;",
	"960": "pi;",
	"961": "rho;",
	"962": "varsigma;",
	"963": "sigma;",
	"964": "tau;",
	"965": "upsilon;",
	"966": "phi;",
	"967": "chi;",
	"968": "psi;",
	"969": "omega;",
	"977": "vartheta;",
	"978": "upsih;",
	"981": "varphi;",
	"982": "varpi;",
	"988": "Gammad;",
	"989": "gammad;",
	"1008": "varkappa;",
	"1009": "varrho;",
	"1013": "varepsilon;",
	"1014": "bepsi;",
	"1025": "IOcy;",
	"1026": "DJcy;",
	"1027": "GJcy;",
	"1028": "Jukcy;",
	"1029": "DScy;",
	"1030": "Iukcy;",
	"1031": "YIcy;",
	"1032": "Jsercy;",
	"1033": "LJcy;",
	"1034": "NJcy;",
	"1035": "TSHcy;",
	"1036": "KJcy;",
	"1038": "Ubrcy;",
	"1039": "DZcy;",
	"1040": "Acy;",
	"1041": "Bcy;",
	"1042": "Vcy;",
	"1043": "Gcy;",
	"1044": "Dcy;",
	"1045": "IEcy;",
	"1046": "ZHcy;",
	"1047": "Zcy;",
	"1048": "Icy;",
	"1049": "Jcy;",
	"1050": "Kcy;",
	"1051": "Lcy;",
	"1052": "Mcy;",
	"1053": "Ncy;",
	"1054": "Ocy;",
	"1055": "Pcy;",
	"1056": "Rcy;",
	"1057": "Scy;",
	"1058": "Tcy;",
	"1059": "Ucy;",
	"1060": "Fcy;",
	"1061": "KHcy;",
	"1062": "TScy;",
	"1063": "CHcy;",
	"1064": "SHcy;",
	"1065": "SHCHcy;",
	"1066": "HARDcy;",
	"1067": "Ycy;",
	"1068": "SOFTcy;",
	"1069": "Ecy;",
	"1070": "YUcy;",
	"1071": "YAcy;",
	"1072": "acy;",
	"1073": "bcy;",
	"1074": "vcy;",
	"1075": "gcy;",
	"1076": "dcy;",
	"1077": "iecy;",
	"1078": "zhcy;",
	"1079": "zcy;",
	"1080": "icy;",
	"1081": "jcy;",
	"1082": "kcy;",
	"1083": "lcy;",
	"1084": "mcy;",
	"1085": "ncy;",
	"1086": "ocy;",
	"1087": "pcy;",
	"1088": "rcy;",
	"1089": "scy;",
	"1090": "tcy;",
	"1091": "ucy;",
	"1092": "fcy;",
	"1093": "khcy;",
	"1094": "tscy;",
	"1095": "chcy;",
	"1096": "shcy;",
	"1097": "shchcy;",
	"1098": "hardcy;",
	"1099": "ycy;",
	"1100": "softcy;",
	"1101": "ecy;",
	"1102": "yucy;",
	"1103": "yacy;",
	"1105": "iocy;",
	"1106": "djcy;",
	"1107": "gjcy;",
	"1108": "jukcy;",
	"1109": "dscy;",
	"1110": "iukcy;",
	"1111": "yicy;",
	"1112": "jsercy;",
	"1113": "ljcy;",
	"1114": "njcy;",
	"1115": "tshcy;",
	"1116": "kjcy;",
	"1118": "ubrcy;",
	"1119": "dzcy;",
	"8194": "ensp;",
	"8195": "emsp;",
	"8196": "emsp13;",
	"8197": "emsp14;",
	"8199": "numsp;",
	"8200": "puncsp;",
	"8201": "ThinSpace;",
	"8202": "VeryThinSpace;",
	"8203": "ZeroWidthSpace;",
	"8204": "zwnj;",
	"8205": "zwj;",
	"8206": "lrm;",
	"8207": "rlm;",
	"8208": "hyphen;",
	"8211": "ndash;",
	"8212": "mdash;",
	"8213": "horbar;",
	"8214": "Vert;",
	"8216": "OpenCurlyQuote;",
	"8217": "rsquor;",
	"8218": "sbquo;",
	"8220": "OpenCurlyDoubleQuote;",
	"8221": "rdquor;",
	"8222": "ldquor;",
	"8224": "dagger;",
	"8225": "ddagger;",
	"8226": "bullet;",
	"8229": "nldr;",
	"8230": "mldr;",
	"8240": "permil;",
	"8241": "pertenk;",
	"8242": "prime;",
	"8243": "Prime;",
	"8244": "tprime;",
	"8245": "bprime;",
	"8249": "lsaquo;",
	"8250": "rsaquo;",
	"8254": "OverBar;",
	"8257": "caret;",
	"8259": "hybull;",
	"8260": "frasl;",
	"8271": "bsemi;",
	"8279": "qprime;",
	"8287": "MediumSpace;",
	"8288": "NoBreak;",
	"8289": "ApplyFunction;",
	"8290": "it;",
	"8291": "InvisibleComma;",
	"8364": "euro;",
	"8411": "TripleDot;",
	"8412": "DotDot;",
	"8450": "Copf;",
	"8453": "incare;",
	"8458": "gscr;",
	"8459": "Hscr;",
	"8460": "Poincareplane;",
	"8461": "quaternions;",
	"8462": "planckh;",
	"8463": "plankv;",
	"8464": "Iscr;",
	"8465": "imagpart;",
	"8466": "Lscr;",
	"8467": "ell;",
	"8469": "Nopf;",
	"8470": "numero;",
	"8471": "copysr;",
	"8472": "wp;",
	"8473": "primes;",
	"8474": "rationals;",
	"8475": "Rscr;",
	"8476": "Rfr;",
	"8477": "Ropf;",
	"8478": "rx;",
	"8482": "trade;",
	"8484": "Zopf;",
	"8487": "mho;",
	"8488": "Zfr;",
	"8489": "iiota;",
	"8492": "Bscr;",
	"8493": "Cfr;",
	"8495": "escr;",
	"8496": "expectation;",
	"8497": "Fscr;",
	"8499": "phmmat;",
	"8500": "oscr;",
	"8501": "aleph;",
	"8502": "beth;",
	"8503": "gimel;",
	"8504": "daleth;",
	"8517": "DD;",
	"8518": "DifferentialD;",
	"8519": "exponentiale;",
	"8520": "ImaginaryI;",
	"8531": "frac13;",
	"8532": "frac23;",
	"8533": "frac15;",
	"8534": "frac25;",
	"8535": "frac35;",
	"8536": "frac45;",
	"8537": "frac16;",
	"8538": "frac56;",
	"8539": "frac18;",
	"8540": "frac38;",
	"8541": "frac58;",
	"8542": "frac78;",
	"8592": "slarr;",
	"8593": "uparrow;",
	"8594": "srarr;",
	"8595": "ShortDownArrow;",
	"8596": "leftrightarrow;",
	"8597": "varr;",
	"8598": "UpperLeftArrow;",
	"8599": "UpperRightArrow;",
	"8600": "searrow;",
	"8601": "swarrow;",
	"8602": "nleftarrow;",
	"8603": "nrightarrow;",
	"8605": "rightsquigarrow;",
	"8606": "twoheadleftarrow;",
	"8607": "Uarr;",
	"8608": "twoheadrightarrow;",
	"8609": "Darr;",
	"8610": "leftarrowtail;",
	"8611": "rightarrowtail;",
	"8612": "mapstoleft;",
	"8613": "UpTeeArrow;",
	"8614": "RightTeeArrow;",
	"8615": "mapstodown;",
	"8617": "larrhk;",
	"8618": "rarrhk;",
	"8619": "looparrowleft;",
	"8620": "rarrlp;",
	"8621": "leftrightsquigarrow;",
	"8622": "nleftrightarrow;",
	"8624": "lsh;",
	"8625": "rsh;",
	"8626": "ldsh;",
	"8627": "rdsh;",
	"8629": "crarr;",
	"8630": "curvearrowleft;",
	"8631": "curvearrowright;",
	"8634": "olarr;",
	"8635": "orarr;",
	"8636": "lharu;",
	"8637": "lhard;",
	"8638": "upharpoonright;",
	"8639": "upharpoonleft;",
	"8640": "RightVector;",
	"8641": "rightharpoondown;",
	"8642": "RightDownVector;",
	"8643": "LeftDownVector;",
	"8644": "rlarr;",
	"8645": "UpArrowDownArrow;",
	"8646": "lrarr;",
	"8647": "llarr;",
	"8648": "uuarr;",
	"8649": "rrarr;",
	"8650": "downdownarrows;",
	"8651": "ReverseEquilibrium;",
	"8652": "rlhar;",
	"8653": "nLeftarrow;",
	"8654": "nLeftrightarrow;",
	"8655": "nRightarrow;",
	"8656": "Leftarrow;",
	"8657": "Uparrow;",
	"8658": "Rightarrow;",
	"8659": "Downarrow;",
	"8660": "Leftrightarrow;",
	"8661": "vArr;",
	"8662": "nwArr;",
	"8663": "neArr;",
	"8664": "seArr;",
	"8665": "swArr;",
	"8666": "Lleftarrow;",
	"8667": "Rrightarrow;",
	"8669": "zigrarr;",
	"8676": "LeftArrowBar;",
	"8677": "RightArrowBar;",
	"8693": "duarr;",
	"8701": "loarr;",
	"8702": "roarr;",
	"8703": "hoarr;",
	"8704": "forall;",
	"8705": "complement;",
	"8706": "PartialD;",
	"8707": "Exists;",
	"8708": "NotExists;",
	"8709": "varnothing;",
	"8711": "nabla;",
	"8712": "isinv;",
	"8713": "notinva;",
	"8715": "SuchThat;",
	"8716": "NotReverseElement;",
	"8719": "Product;",
	"8720": "Coproduct;",
	"8721": "sum;",
	"8722": "minus;",
	"8723": "mp;",
	"8724": "plusdo;",
	"8726": "ssetmn;",
	"8727": "lowast;",
	"8728": "SmallCircle;",
	"8730": "Sqrt;",
	"8733": "vprop;",
	"8734": "infin;",
	"8735": "angrt;",
	"8736": "angle;",
	"8737": "measuredangle;",
	"8738": "angsph;",
	"8739": "VerticalBar;",
	"8740": "nsmid;",
	"8741": "spar;",
	"8742": "nspar;",
	"8743": "wedge;",
	"8744": "vee;",
	"8745": "cap;",
	"8746": "cup;",
	"8747": "Integral;",
	"8748": "Int;",
	"8749": "tint;",
	"8750": "oint;",
	"8751": "DoubleContourIntegral;",
	"8752": "Cconint;",
	"8753": "cwint;",
	"8754": "cwconint;",
	"8755": "CounterClockwiseContourIntegral;",
	"8756": "therefore;",
	"8757": "because;",
	"8758": "ratio;",
	"8759": "Proportion;",
	"8760": "minusd;",
	"8762": "mDDot;",
	"8763": "homtht;",
	"8764": "Tilde;",
	"8765": "bsim;",
	"8766": "mstpos;",
	"8767": "acd;",
	"8768": "wreath;",
	"8769": "nsim;",
	"8770": "esim;",
	"8771": "TildeEqual;",
	"8772": "nsimeq;",
	"8773": "TildeFullEqual;",
	"8774": "simne;",
	"8775": "NotTildeFullEqual;",
	"8776": "TildeTilde;",
	"8777": "NotTildeTilde;",
	"8778": "approxeq;",
	"8779": "apid;",
	"8780": "bcong;",
	"8781": "CupCap;",
	"8782": "HumpDownHump;",
	"8783": "HumpEqual;",
	"8784": "esdot;",
	"8785": "eDot;",
	"8786": "fallingdotseq;",
	"8787": "risingdotseq;",
	"8788": "coloneq;",
	"8789": "eqcolon;",
	"8790": "eqcirc;",
	"8791": "cire;",
	"8793": "wedgeq;",
	"8794": "veeeq;",
	"8796": "trie;",
	"8799": "questeq;",
	"8800": "NotEqual;",
	"8801": "equiv;",
	"8802": "NotCongruent;",
	"8804": "leq;",
	"8805": "GreaterEqual;",
	"8806": "LessFullEqual;",
	"8807": "GreaterFullEqual;",
	"8808": "lneqq;",
	"8809": "gneqq;",
	"8810": "NestedLessLess;",
	"8811": "NestedGreaterGreater;",
	"8812": "twixt;",
	"8813": "NotCupCap;",
	"8814": "NotLess;",
	"8815": "NotGreater;",
	"8816": "NotLessEqual;",
	"8817": "NotGreaterEqual;",
	"8818": "lsim;",
	"8819": "gtrsim;",
	"8820": "NotLessTilde;",
	"8821": "NotGreaterTilde;",
	"8822": "lg;",
	"8823": "gtrless;",
	"8824": "ntlg;",
	"8825": "ntgl;",
	"8826": "Precedes;",
	"8827": "Succeeds;",
	"8828": "PrecedesSlantEqual;",
	"8829": "SucceedsSlantEqual;",
	"8830": "prsim;",
	"8831": "succsim;",
	"8832": "nprec;",
	"8833": "nsucc;",
	"8834": "subset;",
	"8835": "supset;",
	"8836": "nsub;",
	"8837": "nsup;",
	"8838": "SubsetEqual;",
	"8839": "supseteq;",
	"8840": "nsubseteq;",
	"8841": "nsupseteq;",
	"8842": "subsetneq;",
	"8843": "supsetneq;",
	"8845": "cupdot;",
	"8846": "uplus;",
	"8847": "SquareSubset;",
	"8848": "SquareSuperset;",
	"8849": "SquareSubsetEqual;",
	"8850": "SquareSupersetEqual;",
	"8851": "SquareIntersection;",
	"8852": "SquareUnion;",
	"8853": "oplus;",
	"8854": "ominus;",
	"8855": "otimes;",
	"8856": "osol;",
	"8857": "odot;",
	"8858": "ocir;",
	"8859": "oast;",
	"8861": "odash;",
	"8862": "plusb;",
	"8863": "minusb;",
	"8864": "timesb;",
	"8865": "sdotb;",
	"8866": "vdash;",
	"8867": "LeftTee;",
	"8868": "top;",
	"8869": "UpTee;",
	"8871": "models;",
	"8872": "vDash;",
	"8873": "Vdash;",
	"8874": "Vvdash;",
	"8875": "VDash;",
	"8876": "nvdash;",
	"8877": "nvDash;",
	"8878": "nVdash;",
	"8879": "nVDash;",
	"8880": "prurel;",
	"8882": "vltri;",
	"8883": "vrtri;",
	"8884": "trianglelefteq;",
	"8885": "trianglerighteq;",
	"8886": "origof;",
	"8887": "imof;",
	"8888": "mumap;",
	"8889": "hercon;",
	"8890": "intercal;",
	"8891": "veebar;",
	"8893": "barvee;",
	"8894": "angrtvb;",
	"8895": "lrtri;",
	"8896": "xwedge;",
	"8897": "xvee;",
	"8898": "xcap;",
	"8899": "xcup;",
	"8900": "diamond;",
	"8901": "sdot;",
	"8902": "Star;",
	"8903": "divonx;",
	"8904": "bowtie;",
	"8905": "ltimes;",
	"8906": "rtimes;",
	"8907": "lthree;",
	"8908": "rthree;",
	"8909": "bsime;",
	"8910": "cuvee;",
	"8911": "cuwed;",
	"8912": "Subset;",
	"8913": "Supset;",
	"8914": "Cap;",
	"8915": "Cup;",
	"8916": "pitchfork;",
	"8917": "epar;",
	"8918": "ltdot;",
	"8919": "gtrdot;",
	"8920": "Ll;",
	"8921": "ggg;",
	"8922": "LessEqualGreater;",
	"8923": "gtreqless;",
	"8926": "curlyeqprec;",
	"8927": "curlyeqsucc;",
	"8928": "nprcue;",
	"8929": "nsccue;",
	"8930": "nsqsube;",
	"8931": "nsqsupe;",
	"8934": "lnsim;",
	"8935": "gnsim;",
	"8936": "prnsim;",
	"8937": "succnsim;",
	"8938": "ntriangleleft;",
	"8939": "ntriangleright;",
	"8940": "ntrianglelefteq;",
	"8941": "ntrianglerighteq;",
	"8942": "vellip;",
	"8943": "ctdot;",
	"8944": "utdot;",
	"8945": "dtdot;",
	"8946": "disin;",
	"8947": "isinsv;",
	"8948": "isins;",
	"8949": "isindot;",
	"8950": "notinvc;",
	"8951": "notinvb;",
	"8953": "isinE;",
	"8954": "nisd;",
	"8955": "xnis;",
	"8956": "nis;",
	"8957": "notnivc;",
	"8958": "notnivb;",
	"8965": "barwedge;",
	"8966": "doublebarwedge;",
	"8968": "LeftCeiling;",
	"8969": "RightCeiling;",
	"8970": "lfloor;",
	"8971": "RightFloor;",
	"8972": "drcrop;",
	"8973": "dlcrop;",
	"8974": "urcrop;",
	"8975": "ulcrop;",
	"8976": "bnot;",
	"8978": "profline;",
	"8979": "profsurf;",
	"8981": "telrec;",
	"8982": "target;",
	"8988": "ulcorner;",
	"8989": "urcorner;",
	"8990": "llcorner;",
	"8991": "lrcorner;",
	"8994": "sfrown;",
	"8995": "ssmile;",
	"9005": "cylcty;",
	"9006": "profalar;",
	"9014": "topbot;",
	"9021": "ovbar;",
	"9023": "solbar;",
	"9084": "angzarr;",
	"9136": "lmoustache;",
	"9137": "rmoustache;",
	"9140": "tbrk;",
	"9141": "UnderBracket;",
	"9142": "bbrktbrk;",
	"9180": "OverParenthesis;",
	"9181": "UnderParenthesis;",
	"9182": "OverBrace;",
	"9183": "UnderBrace;",
	"9186": "trpezium;",
	"9191": "elinters;",
	"9251": "blank;",
	"9416": "oS;",
	"9472": "HorizontalLine;",
	"9474": "boxv;",
	"9484": "boxdr;",
	"9488": "boxdl;",
	"9492": "boxur;",
	"9496": "boxul;",
	"9500": "boxvr;",
	"9508": "boxvl;",
	"9516": "boxhd;",
	"9524": "boxhu;",
	"9532": "boxvh;",
	"9552": "boxH;",
	"9553": "boxV;",
	"9554": "boxdR;",
	"9555": "boxDr;",
	"9556": "boxDR;",
	"9557": "boxdL;",
	"9558": "boxDl;",
	"9559": "boxDL;",
	"9560": "boxuR;",
	"9561": "boxUr;",
	"9562": "boxUR;",
	"9563": "boxuL;",
	"9564": "boxUl;",
	"9565": "boxUL;",
	"9566": "boxvR;",
	"9567": "boxVr;",
	"9568": "boxVR;",
	"9569": "boxvL;",
	"9570": "boxVl;",
	"9571": "boxVL;",
	"9572": "boxHd;",
	"9573": "boxhD;",
	"9574": "boxHD;",
	"9575": "boxHu;",
	"9576": "boxhU;",
	"9577": "boxHU;",
	"9578": "boxvH;",
	"9579": "boxVh;",
	"9580": "boxVH;",
	"9600": "uhblk;",
	"9604": "lhblk;",
	"9608": "block;",
	"9617": "blk14;",
	"9618": "blk12;",
	"9619": "blk34;",
	"9633": "square;",
	"9642": "squf;",
	"9643": "EmptyVerySmallSquare;",
	"9645": "rect;",
	"9646": "marker;",
	"9649": "fltns;",
	"9651": "xutri;",
	"9652": "utrif;",
	"9653": "utri;",
	"9656": "rtrif;",
	"9657": "triangleright;",
	"9661": "xdtri;",
	"9662": "dtrif;",
	"9663": "triangledown;",
	"9666": "ltrif;",
	"9667": "triangleleft;",
	"9674": "lozenge;",
	"9675": "cir;",
	"9708": "tridot;",
	"9711": "xcirc;",
	"9720": "ultri;",
	"9721": "urtri;",
	"9722": "lltri;",
	"9723": "EmptySmallSquare;",
	"9724": "FilledSmallSquare;",
	"9733": "starf;",
	"9734": "star;",
	"9742": "phone;",
	"9792": "female;",
	"9794": "male;",
	"9824": "spadesuit;",
	"9827": "clubsuit;",
	"9829": "heartsuit;",
	"9830": "diams;",
	"9834": "sung;",
	"9837": "flat;",
	"9838": "natural;",
	"9839": "sharp;",
	"10003": "checkmark;",
	"10007": "cross;",
	"10016": "maltese;",
	"10038": "sext;",
	"10072": "VerticalSeparator;",
	"10098": "lbbrk;",
	"10099": "rbbrk;",
	"10184": "bsolhsub;",
	"10185": "suphsol;",
	"10214": "lobrk;",
	"10215": "robrk;",
	"10216": "LeftAngleBracket;",
	"10217": "RightAngleBracket;",
	"10218": "Lang;",
	"10219": "Rang;",
	"10220": "loang;",
	"10221": "roang;",
	"10229": "xlarr;",
	"10230": "xrarr;",
	"10231": "xharr;",
	"10232": "xlArr;",
	"10233": "xrArr;",
	"10234": "xhArr;",
	"10236": "xmap;",
	"10239": "dzigrarr;",
	"10498": "nvlArr;",
	"10499": "nvrArr;",
	"10500": "nvHarr;",
	"10501": "Map;",
	"10508": "lbarr;",
	"10509": "rbarr;",
	"10510": "lBarr;",
	"10511": "rBarr;",
	"10512": "RBarr;",
	"10513": "DDotrahd;",
	"10514": "UpArrowBar;",
	"10515": "DownArrowBar;",
	"10518": "Rarrtl;",
	"10521": "latail;",
	"10522": "ratail;",
	"10523": "lAtail;",
	"10524": "rAtail;",
	"10525": "larrfs;",
	"10526": "rarrfs;",
	"10527": "larrbfs;",
	"10528": "rarrbfs;",
	"10531": "nwarhk;",
	"10532": "nearhk;",
	"10533": "searhk;",
	"10534": "swarhk;",
	"10535": "nwnear;",
	"10536": "toea;",
	"10537": "tosa;",
	"10538": "swnwar;",
	"10547": "rarrc;",
	"10549": "cudarrr;",
	"10550": "ldca;",
	"10551": "rdca;",
	"10552": "cudarrl;",
	"10553": "larrpl;",
	"10556": "curarrm;",
	"10557": "cularrp;",
	"10565": "rarrpl;",
	"10568": "harrcir;",
	"10569": "Uarrocir;",
	"10570": "lurdshar;",
	"10571": "ldrushar;",
	"10574": "LeftRightVector;",
	"10575": "RightUpDownVector;",
	"10576": "DownLeftRightVector;",
	"10577": "LeftUpDownVector;",
	"10578": "LeftVectorBar;",
	"10579": "RightVectorBar;",
	"10580": "RightUpVectorBar;",
	"10581": "RightDownVectorBar;",
	"10582": "DownLeftVectorBar;",
	"10583": "DownRightVectorBar;",
	"10584": "LeftUpVectorBar;",
	"10585": "LeftDownVectorBar;",
	"10586": "LeftTeeVector;",
	"10587": "RightTeeVector;",
	"10588": "RightUpTeeVector;",
	"10589": "RightDownTeeVector;",
	"10590": "DownLeftTeeVector;",
	"10591": "DownRightTeeVector;",
	"10592": "LeftUpTeeVector;",
	"10593": "LeftDownTeeVector;",
	"10594": "lHar;",
	"10595": "uHar;",
	"10596": "rHar;",
	"10597": "dHar;",
	"10598": "luruhar;",
	"10599": "ldrdhar;",
	"10600": "ruluhar;",
	"10601": "rdldhar;",
	"10602": "lharul;",
	"10603": "llhard;",
	"10604": "rharul;",
	"10605": "lrhard;",
	"10606": "UpEquilibrium;",
	"10607": "ReverseUpEquilibrium;",
	"10608": "RoundImplies;",
	"10609": "erarr;",
	"10610": "simrarr;",
	"10611": "larrsim;",
	"10612": "rarrsim;",
	"10613": "rarrap;",
	"10614": "ltlarr;",
	"10616": "gtrarr;",
	"10617": "subrarr;",
	"10619": "suplarr;",
	"10620": "lfisht;",
	"10621": "rfisht;",
	"10622": "ufisht;",
	"10623": "dfisht;",
	"10629": "lopar;",
	"10630": "ropar;",
	"10635": "lbrke;",
	"10636": "rbrke;",
	"10637": "lbrkslu;",
	"10638": "rbrksld;",
	"10639": "lbrksld;",
	"10640": "rbrkslu;",
	"10641": "langd;",
	"10642": "rangd;",
	"10643": "lparlt;",
	"10644": "rpargt;",
	"10645": "gtlPar;",
	"10646": "ltrPar;",
	"10650": "vzigzag;",
	"10652": "vangrt;",
	"10653": "angrtvbd;",
	"10660": "ange;",
	"10661": "range;",
	"10662": "dwangle;",
	"10663": "uwangle;",
	"10664": "angmsdaa;",
	"10665": "angmsdab;",
	"10666": "angmsdac;",
	"10667": "angmsdad;",
	"10668": "angmsdae;",
	"10669": "angmsdaf;",
	"10670": "angmsdag;",
	"10671": "angmsdah;",
	"10672": "bemptyv;",
	"10673": "demptyv;",
	"10674": "cemptyv;",
	"10675": "raemptyv;",
	"10676": "laemptyv;",
	"10677": "ohbar;",
	"10678": "omid;",
	"10679": "opar;",
	"10681": "operp;",
	"10683": "olcross;",
	"10684": "odsold;",
	"10686": "olcir;",
	"10687": "ofcir;",
	"10688": "olt;",
	"10689": "ogt;",
	"10690": "cirscir;",
	"10691": "cirE;",
	"10692": "solb;",
	"10693": "bsolb;",
	"10697": "boxbox;",
	"10701": "trisb;",
	"10702": "rtriltri;",
	"10703": "LeftTriangleBar;",
	"10704": "RightTriangleBar;",
	"10716": "iinfin;",
	"10717": "infintie;",
	"10718": "nvinfin;",
	"10723": "eparsl;",
	"10724": "smeparsl;",
	"10725": "eqvparsl;",
	"10731": "lozf;",
	"10740": "RuleDelayed;",
	"10742": "dsol;",
	"10752": "xodot;",
	"10753": "xoplus;",
	"10754": "xotime;",
	"10756": "xuplus;",
	"10758": "xsqcup;",
	"10764": "qint;",
	"10765": "fpartint;",
	"10768": "cirfnint;",
	"10769": "awint;",
	"10770": "rppolint;",
	"10771": "scpolint;",
	"10772": "npolint;",
	"10773": "pointint;",
	"10774": "quatint;",
	"10775": "intlarhk;",
	"10786": "pluscir;",
	"10787": "plusacir;",
	"10788": "simplus;",
	"10789": "plusdu;",
	"10790": "plussim;",
	"10791": "plustwo;",
	"10793": "mcomma;",
	"10794": "minusdu;",
	"10797": "loplus;",
	"10798": "roplus;",
	"10799": "Cross;",
	"10800": "timesd;",
	"10801": "timesbar;",
	"10803": "smashp;",
	"10804": "lotimes;",
	"10805": "rotimes;",
	"10806": "otimesas;",
	"10807": "Otimes;",
	"10808": "odiv;",
	"10809": "triplus;",
	"10810": "triminus;",
	"10811": "tritime;",
	"10812": "iprod;",
	"10815": "amalg;",
	"10816": "capdot;",
	"10818": "ncup;",
	"10819": "ncap;",
	"10820": "capand;",
	"10821": "cupor;",
	"10822": "cupcap;",
	"10823": "capcup;",
	"10824": "cupbrcap;",
	"10825": "capbrcup;",
	"10826": "cupcup;",
	"10827": "capcap;",
	"10828": "ccups;",
	"10829": "ccaps;",
	"10832": "ccupssm;",
	"10835": "And;",
	"10836": "Or;",
	"10837": "andand;",
	"10838": "oror;",
	"10839": "orslope;",
	"10840": "andslope;",
	"10842": "andv;",
	"10843": "orv;",
	"10844": "andd;",
	"10845": "ord;",
	"10847": "wedbar;",
	"10854": "sdote;",
	"10858": "simdot;",
	"10861": "congdot;",
	"10862": "easter;",
	"10863": "apacir;",
	"10864": "apE;",
	"10865": "eplus;",
	"10866": "pluse;",
	"10867": "Esim;",
	"10868": "Colone;",
	"10869": "Equal;",
	"10871": "eDDot;",
	"10872": "equivDD;",
	"10873": "ltcir;",
	"10874": "gtcir;",
	"10875": "ltquest;",
	"10876": "gtquest;",
	"10877": "LessSlantEqual;",
	"10878": "GreaterSlantEqual;",
	"10879": "lesdot;",
	"10880": "gesdot;",
	"10881": "lesdoto;",
	"10882": "gesdoto;",
	"10883": "lesdotor;",
	"10884": "gesdotol;",
	"10885": "lessapprox;",
	"10886": "gtrapprox;",
	"10887": "lneq;",
	"10888": "gneq;",
	"10889": "lnapprox;",
	"10890": "gnapprox;",
	"10891": "lesseqqgtr;",
	"10892": "gtreqqless;",
	"10893": "lsime;",
	"10894": "gsime;",
	"10895": "lsimg;",
	"10896": "gsiml;",
	"10897": "lgE;",
	"10898": "glE;",
	"10899": "lesges;",
	"10900": "gesles;",
	"10901": "eqslantless;",
	"10902": "eqslantgtr;",
	"10903": "elsdot;",
	"10904": "egsdot;",
	"10905": "el;",
	"10906": "eg;",
	"10909": "siml;",
	"10910": "simg;",
	"10911": "simlE;",
	"10912": "simgE;",
	"10913": "LessLess;",
	"10914": "GreaterGreater;",
	"10916": "glj;",
	"10917": "gla;",
	"10918": "ltcc;",
	"10919": "gtcc;",
	"10920": "lescc;",
	"10921": "gescc;",
	"10922": "smt;",
	"10923": "lat;",
	"10924": "smte;",
	"10925": "late;",
	"10926": "bumpE;",
	"10927": "preceq;",
	"10928": "succeq;",
	"10931": "prE;",
	"10932": "scE;",
	"10933": "prnE;",
	"10934": "succneqq;",
	"10935": "precapprox;",
	"10936": "succapprox;",
	"10937": "prnap;",
	"10938": "succnapprox;",
	"10939": "Pr;",
	"10940": "Sc;",
	"10941": "subdot;",
	"10942": "supdot;",
	"10943": "subplus;",
	"10944": "supplus;",
	"10945": "submult;",
	"10946": "supmult;",
	"10947": "subedot;",
	"10948": "supedot;",
	"10949": "subseteqq;",
	"10950": "supseteqq;",
	"10951": "subsim;",
	"10952": "supsim;",
	"10955": "subsetneqq;",
	"10956": "supsetneqq;",
	"10959": "csub;",
	"10960": "csup;",
	"10961": "csube;",
	"10962": "csupe;",
	"10963": "subsup;",
	"10964": "supsub;",
	"10965": "subsub;",
	"10966": "supsup;",
	"10967": "suphsub;",
	"10968": "supdsub;",
	"10969": "forkv;",
	"10970": "topfork;",
	"10971": "mlcp;",
	"10980": "DoubleLeftTee;",
	"10982": "Vdashl;",
	"10983": "Barv;",
	"10984": "vBar;",
	"10985": "vBarv;",
	"10987": "Vbar;",
	"10988": "Not;",
	"10989": "bNot;",
	"10990": "rnmid;",
	"10991": "cirmid;",
	"10992": "midcir;",
	"10993": "topcir;",
	"10994": "nhpar;",
	"10995": "parsim;",
	"11005": "parsl;",
	"64256": "fflig;",
	"64257": "filig;",
	"64258": "fllig;",
	"64259": "ffilig;",
	"64260": "ffllig;"
};

/***/ },
/* 134 */
/***/ function(module, exports) {

module.exports = {
	"0": 65533,
	"128": 8364,
	"130": 8218,
	"131": 402,
	"132": 8222,
	"133": 8230,
	"134": 8224,
	"135": 8225,
	"136": 710,
	"137": 8240,
	"138": 352,
	"139": 8249,
	"140": 338,
	"142": 381,
	"145": 8216,
	"146": 8217,
	"147": 8220,
	"148": 8221,
	"149": 8226,
	"150": 8211,
	"151": 8212,
	"152": 732,
	"153": 8482,
	"154": 353,
	"155": 8250,
	"156": 339,
	"158": 382,
	"159": 376
};

/***/ },
/* 135 */
/***/ function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var PropTypes = _interopRequire(__webpack_require__(1));

	var validate = _interopRequire(__webpack_require__(2));

	var validateWithErrors = _interopRequire(__webpack_require__(3));

	var assign = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	  return target;
	};

	module.exports = assign({}, PropTypes, { validate: validate, validateWithErrors: validateWithErrors });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	function nullFunction() {
	  return null;
	}

	var ANONYMOUS = "<<anonymous>>";

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return "array";
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return "object";
	  }
	  return propType;
	}

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, descriptiveName, location) {
	    descriptiveName = descriptiveName || ANONYMOUS;
	    if (props[propName] == null) {
	      var locationName = location;
	      if (isRequired) {
	        return new Error("Required " + locationName + " `" + propName + "` was not specified in " + ("`" + descriptiveName + "`."));
	      }
	      return null;
	    } else {
	      return validate(props, propName, descriptiveName, location);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = location;
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` " + ("supplied to `" + descriptiveName + "`, expected `" + expectedType + "`."));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(nullFunction);
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = location;
	      var propType = getPropType(propValue);
	      return new Error("Invalid " + locationName + " `" + propName + "` of type " + ("`" + propType + "` supplied to `" + descriptiveName + "`, expected an array."));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, descriptiveName, location);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, descriptiveName, location) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = location;
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      return new Error("Invalid " + locationName + " `" + propName + "` supplied to " + ("`" + descriptiveName + "`, expected instance of `" + expectedClassName + "`."));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (propValue === expectedValues[i]) {
	        return null;
	      }
	    }

	    var locationName = location;
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` " + ("supplied to `" + descriptiveName + "`, expected one of " + valuesString + "."));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== "object") {
	      var locationName = location;
	      return new Error("Invalid " + locationName + " `" + propName + "` of type " + ("`" + propType + "` supplied to `" + descriptiveName + "`, expected an object."));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, descriptiveName, location);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  function validate(props, propName, descriptiveName, location) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, descriptiveName, location) == null) {
	        return null;
	      }
	    }

	    var locationName = location;
	    return new Error("Invalid " + locationName + " `" + propName + "` supplied to " + ("`" + descriptiveName + "`."));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, descriptiveName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== "object") {
	      var locationName = location;
	      return new Error("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` " + ("supplied to `" + descriptiveName + "`, expected `object`."));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, descriptiveName, location);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === "object") {
	    if (propValue instanceof Date) {
	      return "date";
	    } else if (propValue instanceof RegExp) {
	      return "regexp";
	    }
	  }
	  return propType;
	}

	module.exports = {
	  array: createPrimitiveTypeChecker("array"),
	  bool: createPrimitiveTypeChecker("boolean"),
	  func: createPrimitiveTypeChecker("function"),
	  number: createPrimitiveTypeChecker("number"),
	  object: createPrimitiveTypeChecker("object"),
	  string: createPrimitiveTypeChecker("string"),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  instanceOf: createInstanceTypeChecker,
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var invariant = _interopRequire(__webpack_require__(5));

	var warning = _interopRequire(__webpack_require__(4));

	var loggedTypeFailures = {};

	var validate = function (propTypes, props, className) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        invariant(typeof propTypes[propName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from " + "PropTypes.", className, "attributes", propName);

	        error = propTypes[propName](props, propName, className, "prop");
	      } catch (ex) {
	        error = ex;
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;
	        warning(false, "Failed propType: " + error.message);
	      }
	    }
	  }
	};

	module.exports = validate;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var invariant = _interopRequire(__webpack_require__(5));

	var validateWithErrors = function (propTypes, props, className) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        invariant(typeof propTypes[propName] === "function", "%s: %s type `%s` is invalid; it must be a function, usually from " + "PropTypes.", className, "attributes", propName);

	        error = propTypes[propName](props, propName, className, "prop");
	      } catch (ex) {
	        error = ex;
	      }
	      // rethrow the error
	      if (error instanceof Error) {
	        throw error;
	      }
	    }
	  }
	};

	module.exports = validateWithErrors;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	var warning = function (condition, format) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  if (format === undefined) {
	    throw new Error("`warning(condition, format, ...args)` requires a warning " + "message argument");
	  }

	  if (format.length < 10 || /^[s\W]*$/.test(format)) {
	    throw new Error("The warning format should be able to uniquely identify this " + "warning. Please, use a more descriptive format than: " + format);
	  }

	  if (!condition) {
	    var argIndex = 0;
	    var message = "Warning: " + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    console.warn(message);
	    try {
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  }
	};

	module.exports = warning;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * BSD License
	 *
	 * For Flux software
	 *
	 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 *  * Redistributions of source code must retain the above copyright notice, this
	 *    list of conditions and the following disclaimer.
	 *
	 *  * Redistributions in binary form must reproduce the above copyright notice,
	 *    this list of conditions and the following disclaimer in the
	 *    documentation and/or other materials provided with the distribution.
	 *
	 *  * Neither the name Facebook nor the names of its contributors may be used to
	 *    endorse or promote products derived from this software without specific
	 *    prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
	 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function (condition, format, a, b, c, d, e, f) {
	  // if (process.env.NODE_ENV !== 'production') {
	  //   if (format === undefined) {
	  //     throw new Error('invariant requires an error message argument');
	  //   }
	  // }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error("Minified exception occurred; use the non-minified dev environment " + "for the full error message and additional helpful warnings.");
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error("Invariant Violation: " + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

/***/ }
/******/ ]);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11)


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(10).Buffer;
/*<replacement>*/
var bufferShim = __webpack_require__(42);
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(86)


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var Stream = (function (){
  try {
    return __webpack_require__(36); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = __webpack_require__(87);
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(57);
exports.Duplex = __webpack_require__(11);
exports.Transform = __webpack_require__(56);
exports.PassThrough = __webpack_require__(86);

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(56)


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(57)


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(145);


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(59);

/**
 * Decode the id to get the version and worker
 * Mainly for debugging and testing.
 * @param id - the shortid-generated id.
 */
function decode(id) {
    var characters = alphabet.shuffled();
    return {
        version: characters.indexOf(id.substr(0, 1)) & 0x0f,
        worker: characters.indexOf(id.substr(1, 1)) & 0x0f
    };
}

module.exports = decode;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var randomByte = __webpack_require__(147);

function encode(lookup, number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + lookup( ( (number >> (4 * loopCounter)) & 0x0f ) | randomByte() );
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = encode;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var alphabet = __webpack_require__(59);
var encode = __webpack_require__(144);
var decode = __webpack_require__(143);
var isValid = __webpack_require__(146);

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = __webpack_require__(149) || 0;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function generate() {

    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + encode(alphabet.lookup, version);
    str = str + encode(alphabet.lookup, clusterWorkerId);
    if (counter > 0) {
        str = str + encode(alphabet.lookup, counter);
    }
    str = str + encode(alphabet.lookup, seconds);

    return str;
}


/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}


// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.decode = decode;
module.exports.isValid = isValid;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var alphabet = __webpack_require__(59);

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var characters = alphabet.characters();
    var len = id.length;
    for(var i = 0; i < len;i++) {
        if (characters.indexOf(id[i]) === -1) {
            return false;
        }
    }
    return true;
}

module.exports = isShortId;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

function randomByte() {
    if (!crypto || !crypto.getRandomValues) {
        return Math.floor(Math.random() * 256) & 0x30;
    }
    var dest = new Uint8Array(1);
    crypto.getRandomValues(dest);
    return dest[0] & 0x30;
}

module.exports = randomByte;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = 0;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(151);

/***/ },
/* 151 */
/***/ function(module, exports) {

var quotes = [
  'At last we will reveal ourselves to the Jedi. At last we will have revenge.',
  'Do not defy the council, Master, not again.',
  'Compassion, which I would define as unconditional love, is essential...',
  'Governor Tarkin. I should have expected to find you holding Vader\'s leash. I recognized your foul stench when I was brought onboard.',
  'These aren\'t the droids you\'re looking for.',
  'Remember... the Force will be with you, always.',
  'Be mindful of your thoughts Anakin. They\'ll betray you.',
  'Princess, we\'ll find Han. I promise.',
  'There\'s always a bigger fish.',
  'I\'m just a simple man trying to make my way in the universe.',
  'I\'ve been waiting for you, Obi-Wan. We meet again, at last. The circle is now complete.',
  'Sir, the possibility of successfully navigating an asteroid field is approximately 3,720 to 1.',
  'Obi-Wan Kenobi. Obi-Wan. Now that\'s a name I have not heard in a long time. A long time.',
  'Search your feelings, you know it to be true.',
  'Wait. I know that laugh...',
  'The force is with you, young Skywalker, but you are not a Jedi yet.',
  'Luke, we\'re gonna have company!',
  'Told you I did. Reckless is he. ...Now, matters are worse.',
  'Sometimes there are things no one can fix.',
  'A young Jedi named Darth Vader, who was a pupil of mine until he turned to evil, helped the Empire hunt down and destroy the Jedi knights.',
  'I thought they smelled bad on the outside!',
  'Obi-Wan has taught you well.',
  'Now, young Skywalker... you will die.',
  'Do what must be done.',
  'You cannot hide forever.',
  'You are a part of the Rebel Alliance and a traitor! Take her away!',
  'A Jedi\'s strength flows from the force.',
  'R2-D2, it is you, It is you!',
  'I sense great fear in you, Skywalker. You have hate... you have anger... but you don\'t use them.',
  'I can save him. I can turn him back to the good side. I have to try.',
  'Attacking that battle station is not my idea of courage. It\'s more like, suicide.',
  'Oh no, young Jedi. You will find that it is you who are mistaken - about a great many things.',
  'Did you hear that? They shut down the main reactor. We\'ll be destroyed for sure. This is madness.',
  'I do believe they think I am some kind of god.',
  'Luke, when gone am I... the last of the Jedi will you be.',
  'Twice the pride, double the fall.',
  'I will come back and free you, Mom. I promise.',
  'Down here, I am. Find a ladder, I must!',
  'Don\'t call me a mindless philosopher, you overweight glob of grease.',
  'You were the chosen one! It was said that you would destroy the Sith, not join them.',
  'Just being around her again is... intoxicating.',
  'All mentors have a way of seeing more of our faults than we would like. It\'s the only way we grow.',
  'Into the garbage chute, flyboy!',
  'Our fate is in your hands.',
  'Midi-chlorians are a microscopic life form that resides within all living cells.',
  'Would it help if I got out and pushed?',
  'I\'m a member of the Imperial Senate on a diplomatic mission to Alderaan.',
  'I\'m terribly sorry about all this. After all, he\'s only a Wookiee.',
  'You may have been a good smuggler, but now you\'re Bantha fodder.',
  'You were right about me. Tell your sister... you were right.',
  'Commander, tear this ship apart until you\'ve found those plans. And bring me the passengers, I want them alive!',
  'I have failed you Anakin. I have failed you.',
  'The Jedi are selfless, they only care about others.',
  'How wude.',
  'That is the sound of a thousand terrible things headed this way.',
  'Don\'t be too proud of this technological terror you\'ve constructed.',
  'You were right about one thing, Master. The negotiations were short.',
  'I know.',
  'It\'s against my programming to impersonate a deity.',
  'You still have much to learn, my young padawan.',
  'The force surrounds us and penetrates us. It binds the galaxy together.',
  'Train yourself to let go of everything you fear to lose.',
  'That\'s a good story. I think you just can\'t bear to let a gorgeous guy like me out of your sight.',
  'This bounty hunter is my kind of scum. Fearless and inventive.',
  'Use the Force, Luke.',
  'There is good in him. I\'ve felt it.',
  'Jedi Masters don\'t go crazy, they just get eccentric.',
  'Right now I feel like I could take on the whole Empire myself.',
  'The Sith rely on their passion for their strength. They think inward, only about themselves.',
  'Boring conversation anyway.',
  'No one can kill a Jedi.',
  'No more training do you require. Already know you that which you need.',
  'Well, short help is better than no help at all.',
  'I truly... deeply... love you and before we die I want you to know.',
  'Soon will I rest, yes, forever sleep. Earned it I have. Twilight is upon me, soon night must fall.',
  'You fool! I have been trained in your Jedi arts by Count Dooku.',
  'Oh, Han, it\'s not like that at all. He\'s my brother.',
  'Love won\'t save you, Padme. Only my new powers can do that.',
  'He will not let me down. He never has.',
  'This is some rescue. You came in here and you didn\'t have a plan for getting out?',
  'A Long Time Ago In A Galaxy Far Far Away...',
  'Droids don\'t pull people\'s arms outta their sockets when they lose... Wookies are known to do that...',
  'Why you stuck-up, half-witted, scruffy-looking nerf-herder!',
  'I suggest a new strategy, R2. Let the wookiee win.',
  'Don\'t make me destroy you.',
  'One thing\'s for sure, we\'re all going to be a lot thinner.',
  'I\'ve got a very bad feeling about this.',
  'R2-D2, you know better than to trust a strange computer!',
  'General Grievous, you\'re shorter than I expected.',
  'There\'s nothing for me here now. I want to learn the ways of the Force and be a Jedi, like my father before me.',
  'It\'s a trap!',
  'If there\'s a bright centre to the universe, you\'re on the planet that it\'s farthest from.',
  'Greed can be a very powerful ally.',
  'We seem to be made to suffer. It\'s our lot in life.',
  'Your thoughts betray you father. I feel the good in you. The conflict.',
  'Anakin, you\'re breaking my heart! And you\'re going down a path I cannot follow!',
  'Just for once, let me look on you with my own eyes.',
  'Clear your mind must be, if you are to discover the real villains behind this plot.',
  'Listen to them, they\'re dying, R2. Curse my metal body. I wasn\'t fast enough. It\'s all my fault. My poor master.',
  'Look, Your Worshipfulness, let\'s get one thing straight... I take orders from one person! Me!',
  'I can\'t do it, R2. I can\'t go on alone.',
  'Sometimes we must do what is requested of us.',
  'So this is how liberty dies, with thunderous applause.',
  'Look, good against remotes is one thing, good against the living, that\'s something else.',
  'Luke, I don\'t want to lose you to the Emperor the way I lost Vader.',
  'The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
  'Fear is the path to the dark side. Fear leads to anger. Anger leads to hate. Hate leads to suffering.',
  'You are unwise to lower your defenses...',
  'I sense something; a presence I\'ve not felt since...',
  'Beware of the dark side.',
  'Ready are you? What know you of ready? For eight hundred years have I trained Jedi. My own counsel will I keep on who is to be trained.',
  'Don\'t center on your anxieties, Obi-Wan.',
  'Pain, suffering, death I feel. Something terrible has happened. Young Skywalker is in pain. Terrible pain.',
  'Only a master of evil, Darth.',
  'Everything is proceeding as I have foreseen.',
  'You don\'t know how hard I found it, signing the order to terminate your life.',
  'Dreams pass in time.',
  'This party\'s over.',
  'He\'s holding a thermal detonator!',
  'Are you an angel? I\'ve heard the deep space pilots talk about them. They\'re the most beautiful creatures in the universe.',
  'You refer to the prophecy of The One, who will bring balance to the Force. You believe it\'s this boy?',
  'Scoundrel? Scoundrel? I like the sound of that.',
  'In time, you will learn to trust your feelings. Then, you will be invincible.',
  'Without the midi-chlorians, life could not exist, and we would have no knowledge of the Force.',
  'There\'s no mystical energy field that controls my destiny.',
  'You must repair him! Sir, if any of my circuits or gears will help, I\'ll gladly donate them.',
  'Size matters not. Look at me. Judge me by my size, do you? Hmm? Hmm.',
  'All who gain power are afraid to lose it.',
  'Patience, my blue friend.',
  'I can only protect you, I cannot fight a war for you.',
  'Lando\'s not a system he\'s a man!',
  'I don\'t want to hear anymore about Obi-Wan. The Jedi turned against me! Don\'t you turn against me!',
  'You must feel the force around you. Here, between you, me, the tree, the rock... everywhere! Yes, even between this land and that ship!',
  'If so powerful you are, why leave?',
  'It is possible that the war itself has been only one further move in some greater game.',
  'Do not assume anything. Clear, your mind must be.',
  'Great, kid! Don\'t get cocky.',
  'You can\'t win. But there are alternatives to fighting.',
  'Difficult to see. Always in motion is the future.',
  'Good Anakin. Good. Kill him. Kill him now.',
  'Anger, fear, aggression; the dark side of the Force are they. Easily they flow, quick to join you in a fight.',
  'Luke, you can destroy the Emperor. He has foreseen this. It is your destiny. Join me, and together we can rule the galaxy as father and son.',
  'I\'m not afraid to die.',
  'Mudhole? Slimy? My home this is!',
  'You look absolutely beautiful. You truly belong here with us among the clouds.',
  'Either shut him up or shut him down!',
  'Oh my. Space travel sound rather perilous. I can assure you they will never get me on one of those dreadful Star Ships.',
  'I\'m Luke Skywalker, I\'m here to rescue you.',
  'Your overconfidence is your weakness.',
  'Anger, fear, aggression... the dark side are they. Once you start down the dark path, forever will it dominate your destiny.',
  'Every generation has a legend. Every journey has a first step. Every saga has a beginning.',
  'Always two there are, no more, no less: a master and an apprentice.',
  'Victory? Victory, you say? Master Obi-Wan, not victory. The shroud of the Dark Side has fallen. Begun, the Clone War has!',
  'Uh, we had a slight weapons malfunction, but uh, everything\'s perfectly all right now.',
  'That boy is our last hope.',
  'Luminous beings are we. Not this crude matter.',
  'Oh, my! What have you done? I\'m BACKWARDS. You flea-bitten furball! Only an overgrown mop-head like you would be stupid enough to...',
  'Luke... Luke... do not... do not underestimate the powers of the Emperor or suffer your father\'s fate you will.',
  'The ability to speak does not make you intelligent.',
  'He was meant to root out the Rebels, not give them hope. His sacrifice will only inspire them...',
  'You have your moments. Not many of them, but you do have them.',
  'The council has granted me permission to train you. You will be a Jedi, I promise.',
  'For over a thousand generations, the Jedi Knights were the guardians of peace and justice in the Old Republic.',
  'Ex-squeeze me, but the mostest safest place would be Gunga City.',
  'Boy, it\'s lucky you have these compartments!',
  'The drums of conflict are my beating heart.',
  'I find your lack of faith disturbing.',
  'That\'s your uncle talking.',
  'The Force is strong with him. The son of Skywalker must not become a Jedi.',
  'I can hold it... I can hold it... I CAN\'T HOLD IT!',
  'In his belly you will find a new definition of pain and suffering as you are slowly digested over a thousand years.',
  'Then I\'ll see you in hell!',
  'He is as clumsy as he is stupid. General, prepare your troops for a surface attack.',
  'Pass on what you have learned.',
  'From the moment I met you, all those years ago, not a day has gone by when I haven\'t thought of you.',
  'Look, I ain\'t in this for your revolution, and I\'m not in it for you, Princess. I expect to be well paid. I\'m in it for the money.',
  'Luke, you switched off your targeting computer - what\'s wrong?',
  'Will someone get this big walking carpet out of my way?',
  'Mom, you said that the biggest problem in the universe is no one helps each other.',
  'Your eyes can deceive you; don\'t trust them.',
  'Uh, uh... negative, negative. We had a reactor leak here now. Give us a few minutes to lock it down. Large leak, very dangerous.',
  'Hmph. Adventure. Heh. Excitement. Heh. A Jedi craves not these things. You are reckless.',
  'You may dispense with the pleasantries, Commander. I am here to put you back on schedule.',
  'Master Kenobi, you disappoint me. Yoda holds you in such high esteem. Surely you can do better!',
  'He\'s quite clever, you know... for a human being.',
  'This is Red 5, I\'m going in.',
  'Because you are my Son!',
  'I haven\'t gone by the name of Obi-Wan since... oh, before you were born.',
  'He will join us or die, my master.',
  'I think I\'m finally getting the hang of this flying business.',
  'Never tell me the odds.',
  'And I am C-3PO, human-cyborg relations. And this is my counterpart R2D2.',
  'She may not look like much, but she\'s got it where it counts, kid.',
  'Jedi business. Go back to your drinks.',
  'It\'s not wise to upset a Wookiee.',
  'I don\'t know who you are or where you\'ve come from, but from now on you\'ll do as I say, okay?',
  'How you doin\' Chewbacca? Still hanging around with this loser?',
  'Some day you\'re gonna be wrong, I just hope I\'m there to see it.',
  'The ability to destroy a planet is insignificant next to the power of the Force.',
  'Crush them! Make them suffer!',
  'Use my knowledge, I beg you.',
  'I felt a great disturbance in the force, as if millions of voices suddenly cried out in terror and were suddenly silenced.',
  'Anakin, please tell me this isn\'t another of your patented rescues where we\'ll require the whole Republic army to get safely away.',
  'I have you now!',
  'But which one was destroyed? The master or the apprentice?',
  'I don\'t believe what I\'m hearing... Obi-Wan was right. You\'ve changed.',
  'Always on the move.',
  'The Dark Side of the Force is the pathway to many abilities some consider to be... Unnatural.',
  'When 900 years old, you reach... Look as good, you will not.',
  'You were my brother, Anakin. I loved you.',
  'Army or not. You must realize, you are doomed.',
  'Hold your fire. There\'s no life forms. It must have short-circuited.',
  'Captain, being held by you isn\'t quite enough to get me excited.',
  'You can forget your troubles with those Imperial slugs. I told you I\'d outrun \'em. Don\'t everyone thank me at once.',
  'You can\'t win, Darth. Strike me down, and I will become more powerful than you could possibly imagine.',
  'You\'ll be dead!',
  'Nooooooooooooooooooo!',
  'Attachment is forbidden. Possession is forbidden. Compassion, which I would define as unconditional love, is essential to a Jedi\'s life.',
  'I sense a great deal of confusion in you, young Skywalker. There\'s much fear that clouds your judgement.',
  'Keep your concentration here and now, where it belongs.',
  'Into exile I must go, failed I have.',
  'Watch your mouth kid, or you\'ll find yourself floating home.',
  'Aren\'t you a little short for a stormtrooper?',
  'Truly wonderful, the mind of a child is.',
  'Laugh it up, Fuzz ball.',
  'Promise. Promise me you will train the boy. He... is the chosen one... he will bring balance. Train him.',
  'Impressive, most impressive.',
  'Oh my goodness, shut me down! Machines making machines. How perverse.',
  'I\'m Luke Skywalker. I\'m here to rescue you.',
  'Keep your distance, Chewie, but don\'t, y\'know, look like you\'re keeping your distance.',
  'Don\'t get technical with me. What mission? What are you talking about? I\'ve just about had enough of you. Go that way, you\'ll be malfunctioning in a day you near-sighted scrap pile.',
  'I have waited a long time for this moment, my little green friend. At last, the Jedi are no more.',
  'Blind we are, if creation of this clone army we could not see.',
  'Asteroids do not concern me, Admiral. I want that ship, not excuses.',
  'A tremor in the Force. The last time I felt it was in the presence of my old master.',
  'Bargain rather than fight? He\'s no Jedi.',
  'The Force can have a strong influence on the weak-minded.',
  'Aaaaaaargh!',
  'Now, be brave and don\'t look back. Don\'t look back.',
  'Patience, use the Force, think!',
  'I don\'t like you either. You just watch yourself. We\'re wanted men. I have the death sentence on twelve systems.',
  'The Jedi are extinct, their fire has gone out of the universe. You, my friend, are all that\'s left of their religion.',
  'I hope so Commander, for your sake. The Emperor is not as forgiving as I am.',
  'What a piece of junk!',
  'I\'m getting too old for this sort of thing.',
  'You fool! I\'ve been trained in your Jedi arts by Count Dooku.',
  'Make, at least, 20 people smile in a day.',
  'Mmm. Lost a planet, Master Obi-Wan has. How embarrassing.',
  'Bring \'em on, I\'d prefer a straight fight to all this sneaking around.',
  'In my experience, there\'s no such thing as luck.',
  'I guess you don\'t know everything about women yet.',
  'Evacuate in our moment of triumph? I think you overestimate their chances.',
  'To a dark place this line of thought will carry us. Great care we must take.',
  'All his life has he looked away... to the future, to the horizon. Never his mind on where he was. Hmm? What he was doing.',
  'I was not elected to watch my people suffer and die while you discuss this invasion in a committee!',
  'Wonderful girl. Either I\'m going to kill her or I\'m beginning to like her.',
  'Why do I sense we\'ve picked up another pathetic life-form?',
  'These blast points - too accurate for sandpeople. Only imperial stormtroopers are so precise.',
  'How ya feeling kid? You don\'t look so bad to me. You look strong enough to pull the ears off a gundark.',
  'No, my father didn\'t fight in the Clone Wars. He was a navigator on a spice freighter.',
  'You were to bring balance to the force, not leave it in darkness.',
  'Mesa called JaJa Binks, mesa youse humble servant!',
  'A Jedi uses the force for knowledge and defense, never for attack.',
  'I don\'t like sand. It\'s coarse and rough and irritating and it gets everywhere. Not like here. Here everything is soft and smooth.',
  'Me? A Master? I\'m overwhelmed, sir. But the Council elects its own members. They will never accept this.',
  'One truth, one hate.',
  'Thank the maker!',
  'Many Bothans died to bring us this information.',
  'Help me Obi-Wan Kenobi, you\'re my only hope.',
  'The Force is what gives a Jedi his power. It\'s an energy field created by all living things. It surrounds us and penetrates us. It binds the galaxy together.',
  'If you have warriors, now is the time.',
  'This will be a day long remembered. It has seen the end of Kenobi, and will soon see the end of the rebellion.',
  'I recognized your foul stench when I was brought on board.',
  'You\'ve never heard of the Millennium Falcon?... It\'s the ship that made the Kessel run in less than 12 parsecs.',
  'Son, my place is here, my future is here. It is time for you to let go.',
  'We are indebted to you for your bravery, Obi-Wan Kenobi. And you, young Skywalker; we will watch your career with great interest.',
  'I\'m altering the deal. Pray I don\'t alter it any further.',
  'To be angry is to be human.',
  'You came in that thing? You\'re braver than I thought.',
  'Attachment leads to jealousy. The shadow of greed that is.',
  'You know better than to trust a strange computer.',
  'Someday I\'ll be the most powerful Jedi ever.',
  'You were the Chosen one!',
  'Traveling through hyperspace ain\'t like dusting crops, farm boy.',
  'You can either profit by this or be destroyed. It\'s your choice, but I warn you not to underestimate my power.',
  'R2, why did you have to be so brave?',
  'Jabba, you\'re a wonderful human being.',
  'All who gain power are afraid to lose it.',
  'Help me Obi-Wan Kenobi. You\'re my only hope.',
  'You\'re asking me to be rational. That is something I know I cannot do. Believe me, I wish I could just wish away my feelings, but I can\'t.',
  'What if the democracy we thought we were serving no longer exists, and the Republic has become the very evil we\'ve been fighting to destroy?',
  'Hello. I don\'t believe we have been introduced. R2-D2? A pleasure to meet you. I am C-3PO, Human-Cyborg Relations.',
  'Faith in your new apprentice, misplaced may be. As is your faith in the dark side of the Force.',
  'Give yourself to the Dark Side. It is the only way you can save your friends. Yes your thoughts betray you.',
  'You must unlearn what you have learned.',
  'Now don\'t you forget this! Why I should stick my neck out for you is far beyond my capacity!',
  'Feel the Force!',
  'I am not training him.',
  'Something\'s happening. I\'m not the Jedi I should be. I want more. And I know I shouldn\'t.',
  'Feel, don\'t think.',
  'I\'ve been waiting for you, Obi-Wan. We meet again, at last. The circle is now complete. When I left you, I was but the learner; now I am the master.',
  'I will not condone a course of action that will lead us to war.',
  'At the thought of not being with you, I can\'t breathe.',
  'Don\'t try to frighten us with your sorcerous ways, Lord Vader.',
  'It is obvious that this contest cannot be decided by our knowledge of the Force... but by our skills with a lightsaber.',
  'Wipe them out. All of them.',
  'Look, sir: Droids.',
  'If you\'re not with me, then you\'re my enemy.',
  'May the force be with you.',
  'A Jedi Knight? Jeez, I\'m out of it for a little while, everyone gets delusions of grandeur!',
  'These Federation types are cowards. The negotiations will be short.',
  'Your powers are weak, old man.',
  'Through the force, things you will see. Other places. The future... the past. Old friends long gone.',
  'Hokey religions and ancient weapons are no match for a good blaster at your side, kid.',
  'Clear your mind of questions.',
  'Great shot kid, that was one in a million.',
  'Wars not make one great.',
  'Let the Wookie win.',
  'This is some rescue! You came in here, but didn\'t you have a plan for getting out?',
  'That... is why you fail.',
  'I don\'t sense anything.',
  'Mos Eisley spaceport. You will never find a more wretched hive of scum and villainy.',
  'Not to worry. We\'re still flying half a ship.',
  'Another happy landing.',
  'Rejoice for those around you who transform into the Force.',
  'The Force is strong with this one.',
  'I see you becoming the greatest of all the Jedi, Anakin. Even more powerful than Master Yoda.',
  'No. I am your Father.',
  'It is too late for me, son. The Emperor will show you the true nature of the Force. He is your master now.',
  'The Chancellor\'s right, Senator. We\'ll be quite safe. He won several cups for airspeeder racing back on Naboo.',
  'No! Try not. Do, or do not. There is no try.',
  'Anything is possible.',
  'Your arrogance blinds you.',
  'I\'m haunted by the kiss that you should never have given me. My heart is beating... hoping that kiss will not become a scar.',
  'Only a sith deals in absolutes.',
  'We live in a real world, Annie. Come back to it.',
  'So, what do you think? You think a princess and a guy like me...',
  'Don\'t center on your anxieties, Obi-Wan. Keep your concentration here and now, where it belongs.',
  'I\'ll be careful.',
  'Who\'s the more foolish: the fool, or the fool who follows him?',
  'General, prepare your men.',
  'The strong survive, the weak die. That\'s the way the galaxy works. The day we forgot that, we became everyone\'s lackey.',
  'We have powerful friends. You\'re going to regret this.',
  'I\'ve seen a lot of strange stuff, but I\'ve never seen anything to make me believe there\'s one all-powerful Force controlling everything.',
  'Maybe you\'d like it back in your cell, your highness.',
  'I want them alive - no disintegrations!',
  'A Jedi must have the deepest commitment, the most serious mind.',
  'I think my eyes are getting better. Instead of a big dark blur, I see a big light blur.',
  'We have a new enemy, the young Rebel who destroyed the Death Star. I have no doubt this boy is the offspring of Anakin Skywalker.',
  'Jabba\'s put a price on your head so large, every bounty hunter in the galaxy will be looking for you.',
  'My parts are showing? Oh, my goodness, oh!',
  'That\'s no moon, it\'s a space station.',
  'The Force is strong with you. A powerful Sith you will become. Henceforth, you shall be known as Darth... Vader.',
  'You slimy, double-crossing, no-good swindler. You\'ve got a lot of guts coming here, after what you pulled.',
  'Soon, I will have a new apprentice. One far younger, and more powerful.',
  'You\'re all clear, kid! Now let\'s blow this thing and go home!',
  'He\'s the brains, sweetheart!',
  'You will find that many of the truths we cling to depend greatly on our own point of view.',
  'I\'m a person, and my name is Anakin!',
  'This station is now the ultimate power in the universe! I suggest we use it.',
  'Hold me, like you did by the lake on Naboo; so long ago when there was nothing but our love. No politics, no plotting, no war.',
  'You can\'t stop the change any more than you can stop the suns from setting.',
  'Death is a natural part of life.'
];

module.exports = function() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

module.exports.quotes = quotes

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 153 */
/***/ function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function() { return module.l; }
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function() { return module.i; }
		});
		module.webpackPolyfill = 1;
	}
	return module;
}


/***/ },
/* 154 */
/***/ function(module, exports) {

module.exports = require("axios");

/***/ },
/* 155 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 156 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88);


/***/ }
/******/ ]);