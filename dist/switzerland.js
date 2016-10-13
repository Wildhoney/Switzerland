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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.element = exports.compose = exports.pipe = exports.path = exports.timeEnd = exports.time = exports.validate = exports.events = exports.methods = exports.refs = exports.redux = exports.include = exports.state = exports.attrs = exports.once = exports.html = exports.create = exports.warning = exports.error = exports.registryKey = undefined;

	var _html = __webpack_require__(2);

	Object.defineProperty(exports, 'html', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_html).default;
	    }
	});

	var _once = __webpack_require__(3);

	Object.defineProperty(exports, 'once', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_once).default;
	    }
	});

	var _attributes = __webpack_require__(4);

	Object.defineProperty(exports, 'attrs', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_attributes).default;
	    }
	});

	var _state = __webpack_require__(26);

	Object.defineProperty(exports, 'state', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_state).default;
	    }
	});

	var _include = __webpack_require__(27);

	Object.defineProperty(exports, 'include', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_include).default;
	    }
	});

	var _redux = __webpack_require__(35);

	Object.defineProperty(exports, 'redux', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_redux).default;
	    }
	});

	var _refs = __webpack_require__(36);

	Object.defineProperty(exports, 'refs', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_refs).default;
	    }
	});

	var _methods = __webpack_require__(37);

	Object.defineProperty(exports, 'methods', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_methods).default;
	    }
	});

	var _events = __webpack_require__(38);

	Object.defineProperty(exports, 'events', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_events).default;
	    }
	});

	var _validate = __webpack_require__(39);

	Object.defineProperty(exports, 'validate', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_validate).default;
	    }
	});

	var _timer = __webpack_require__(43);

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

	var _path = __webpack_require__(53);

	Object.defineProperty(exports, 'path', {
	    enumerable: true,
	    get: function () {
	        return _path.path;
	    }
	});

	var _composition = __webpack_require__(54);

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

	var _virtualDom = __webpack_require__(56);

	Object.defineProperty(exports, 'element', {
	    enumerable: true,
	    get: function () {
	        return _virtualDom.h;
	    }
	});

	var _env = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @constant registryKey
	 * @type {Symbol}
	 */
	const registryKey = exports.registryKey = Symbol('switzerland/registry');

	/**
	 * @method message
	 * @param {String} text
	 * @param {Function} fn
	 * @return {void}
	 */
	const message = function (text, fn) {
	    return (0, _env.isDevelopment)() && fn('Switzerland \uD83C\uDDE8\uD83C\uDDED ' + text + '.');
	};

	/**
	 * @method error
	 * @param {String} text
	 * @return {void}
	 */
	const error = exports.error = function (text) {
	    return message(text, console.error);
	};

	/**
	 * @method warning
	 * @param {String} text
	 * @return {void}
	 */
	const warning = exports.warning = function (text) {
	    return message(text, console.warn);
	};

	/**
	 * @constant implementations
	 * @type {Object}
	 */
	const implementations = {

	    v0: {
	        hooks: ['attachedCallback', 'detachedCallback'],
	        customElement: function (name, blueprint) {
	            return document.registerElement(name, blueprint);
	        },
	        shadowBoundary: function (node) {
	            return node.createShadowRoot();
	        }
	    },
	    v1: {
	        hooks: ['connectedCallback', 'disconnectedCallback'],
	        customElement: function (name, blueprint) {
	            return window.customElements.define(name, blueprint);
	        },
	        shadowBoundary: function (node) {
	            return node.attachShadow({ mode: 'open' });
	        }
	    }

	};

	/**
	 * @method clearHTMLFor
	 * @param {HTMLElement} node
	 * @return {void}
	 */
	const clearHTMLFor = function (node) {
	    node.shadowRoot.innerHTML = '';
	};

	/**
	 * @method create
	 * @param {String} name
	 * @param {Function} render
	 * @return {void}
	 */
	const create = exports.create = function (name, render) {

	    /**
	     * Determines whether we use the v0 or v1 implementation of Custom Elements.
	     *
	     * @constant implementation
	     * @type {Object}
	     */
	    const implementation = typeof window.customElements === 'undefined' ? implementations.v0 : implementations.v1;

	    /**
	     * @constant blueprint
	     * @type {Object}
	     */
	    implementation.customElement(name, class extends window.HTMLElement {

	        /**
	         * @constructor
	         */
	        constructor() {
	            super();
	            this[registryKey] = {};
	        }

	        /**
	         * @method connectedCallback
	         * @return {void}
	         */
	        [implementation.hooks[0]]() {
	            var _this = this;

	            const node = this;
	            node.shadowRoot && clearHTMLFor(node);

	            const boundary = node.shadowRoot || implementation.shadowBoundary(node);

	            render({ node, render: node.render.bind(node) }).then(function (props) {

	                const tree = (0, _html.htmlFor)(props);
	                const root = (0, _virtualDom.create)(tree);

	                // See: https://github.com/Matt-Esch/virtual-dom/pull/413
	                boundary.appendChild(root);

	                // Invoke any ref callbacks defined in the component's `render` method.
	                'ref' in props && (0, _refs.invokeFor)(node);

	                _this[registryKey] = { node, tree, root, props };
	            }).catch(error);
	        }

	        /**
	         * @method disconnectedCallback
	         * @return {void}
	         */
	        [implementation.hooks[1]]() {

	            clearHTMLFor(this);

	            // Once the node has been removed then we perform one last pass, however the render function
	            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
	            this.render();
	        }

	        /**
	         * @method render
	         * @return {void}
	         */
	        render() {
	            var _this2 = this;

	            const instance = this[registryKey];

	            if (!instance) {

	                // Rejected as developer has attempted to re-render during the start-up phase.
	                // As an alternative we could queue the re-render using `setTimeout` for the next
	                // tick, but ideally the developer should setup sensible defaults and thus avoid a
	                // re-render during the start-up phase.
	                // Queue: setTimeout(this.render.bind(this));
	                warning('Casually ignoring an attempted re-render during the start-up phase of a component');
	                return;
	            }

	            const currentTree = instance.tree;
	            const currentRoot = instance.root;
	            const node = instance.node;


	            render({ node, render: node.render.bind(node) }).then(function (props) {

	                const tree = (0, _html.htmlFor)(props);

	                // Clear any previously defined refs for the current component.
	                'ref' in props && (0, _refs.purgeFor)(node);

	                if (node.isConnected) {

	                    const patches = (0, _virtualDom.diff)(currentTree, tree);
	                    const root = (0, _virtualDom.patch)(currentRoot, patches);

	                    // Invoke any ref callbacks defined in the component's `render` method.
	                    'ref' in props && (0, _refs.invokeFor)(node);

	                    _this2[registryKey] = { node, tree, root, props };
	                }
	            }).catch(error);
	        }

	    });
	};

	// Middleware.

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

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
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * @constant once
	 * @type {WeakMap}
	 */
	const once = new WeakMap();

	/**
	 * @param {Function} callback
	 * @param {Function} [keyFrom]
	 * @return {Function}
	 */

	exports.default = function (callback, keyFrom = function (props) {
	  return props.node;
	}) {

	  return function (props) {

	    const key = keyFrom(props);

	    // Ensure the node has an entry in the map.
	    const hasNode = once.has(key);
	    !hasNode && once.set(key, new WeakMap());

	    // Determine whether the function has been called already.
	    const hasFunction = once.get(key).has(callback);
	    !hasFunction && once.get(key).set(callback, callback(props));

	    // Only promises will be yielded in the next tick, whereas functions that
	    // yield objects will return immediately.
	    const response = once.get(key).get(callback);
	    return 'then' in Object(response) ? response.then(function (onceProps) {
	      return _extends({}, onceProps, props);
	    }) : _extends({}, response, props);
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _humps = __webpack_require__(5);

	var _compose = __webpack_require__(6);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	 * @method transform
	 * @param {NamedNodeMap} attributes
	 * @return {Object}
	 */
	const transform = function (attributes) {

	  return Object.keys(attributes).reduce(function (acc, index) {

	    // Transform each attribute into a plain object.
	    const model = attributes[index];
	    const label = (0, _compose2.default)(_humps.camelize, removePrefix);

	    return _extends({}, acc, { [label(model.nodeName)]: model.nodeValue });
	  }, Object.create(null));
	};

	/**
	 * @param {Object} props
	 * @return {Object}
	 */

	exports.default = function (props) {
	  const node = props.node;
	  const render = props.render;

	  // Obtain the reference to the observer, using the WeakMap to query whether we have an existing
	  // one to utilise before creating another.

	  const hasObserver = observers.has(node);
	  const observer = hasObserver ? observers.get(node) : new window.MutationObserver(function () {

	    // Remove the existing memorisation of the node's attributes before re-rendering.
	    attributes.delete(node);
	    render();
	  });

	  observer.observe(node, { attributes: true });
	  !hasObserver && observers.set(node, observer);

	  // Parse all of the attributes on the node, and nested those into the props passed.
	  const attrs = attributes.get(node) || transform(node.attributes);
	  attributes.set(node, attrs);

	  // Clean up the observer if the node is no longer present in the DOM.
	  !node.isConnected && observer.disconnect();

	  return _extends({}, props, { attrs });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	// =========
	// = humps =
	// =========
	// Underscore-to-camelCase converter (and vice versa)
	// for strings and object keys

	// humps is copyright © 2012+ Dom Christie
	// Released under the MIT license.


	;(function (global) {

	  var _processKeys = function (convert, obj, options) {
	    if (!_isObject(obj) || _isDate(obj) || _isRegExp(obj) || _isBoolean(obj)) {
	      return obj;
	    }

	    var output,
	        i = 0,
	        l = 0;

	    if (_isArray(obj)) {
	      output = [];
	      for (l = obj.length; i < l; i++) {
	        output.push(_processKeys(convert, obj[i], options));
	      }
	    } else {
	      output = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          output[convert(key, options)] = _processKeys(convert, obj[key], options);
	        }
	      }
	    }
	    return output;
	  };

	  // String conversion methods

	  var separateWords = function (string, options) {
	    options = options || {};
	    var separator = options.separator || '_';
	    var split = options.split || /(?=[A-Z])/;

	    return string.split(split).join(separator);
	  };

	  var camelize = function (string) {
	    if (_isNumerical(string)) {
	      return string;
	    }
	    string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
	      return chr ? chr.toUpperCase() : '';
	    });
	    // Ensure 1st char is always lowercase
	    return string.substr(0, 1).toLowerCase() + string.substr(1);
	  };

	  var pascalize = function (string) {
	    var camelized = camelize(string);
	    // Ensure 1st char is always uppercase
	    return camelized.substr(0, 1).toUpperCase() + camelized.substr(1);
	  };

	  var decamelize = function (string, options) {
	    return separateWords(string, options).toLowerCase();
	  };

	  // Utilities
	  // Taken from Underscore.js

	  var toString = Object.prototype.toString;

	  var _isObject = function (obj) {
	    return obj === Object(obj);
	  };
	  var _isArray = function (obj) {
	    return toString.call(obj) == '[object Array]';
	  };
	  var _isDate = function (obj) {
	    return toString.call(obj) == '[object Date]';
	  };
	  var _isRegExp = function (obj) {
	    return toString.call(obj) == '[object RegExp]';
	  };
	  var _isBoolean = function (obj) {
	    return toString.call(obj) == '[object Boolean]';
	  };

	  // Performant way to determine if obj coerces to a number
	  var _isNumerical = function (obj) {
	    obj = obj - 0;
	    return obj === obj;
	  };

	  // Sets up function which handles processing keys
	  // allowing the convert function to be modified by a callback
	  var _processor = function (convert, options) {
	    var callback = options && 'process' in options ? options.process : options;

	    if (typeof callback !== 'function') {
	      return convert;
	    }

	    return function (string, options) {
	      return callback(string, convert, options);
	    };
	  };

	  var humps = {
	    camelize: camelize,
	    decamelize: decamelize,
	    pascalize: pascalize,
	    depascalize: decamelize,
	    camelizeKeys: function (object, options) {
	      return _processKeys(_processor(camelize, options), object);
	    },
	    decamelizeKeys: function (object, options) {
	      return _processKeys(_processor(decamelize, options), object, options);
	    },
	    pascalizeKeys: function (object, options) {
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
	})(undefined);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pipe = __webpack_require__(7);
	var reverse = __webpack_require__(25);

	/**
	 * Performs right-to-left function composition. The rightmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * **Note:** The result of compose is not automatically curried.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.pipe
	 * @example
	 *
	 *      var f = R.compose(R.inc, R.negate, Math.pow);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function compose() {
	  if (arguments.length === 0) {
	    throw new Error('compose requires at least one argument');
	  }
	  return pipe.apply(this, reverse(arguments));
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(8);
	var _pipe = __webpack_require__(9);
	var reduce = __webpack_require__(10);
	var tail = __webpack_require__(21);

	/**
	 * Performs left-to-right function composition. The leftmost function may have
	 * any arity; the remaining functions must be unary.
	 *
	 * In some libraries this function is named `sequence`.
	 *
	 * **Note:** The result of pipe is not automatically curried.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category Function
	 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
	 * @param {...Function} functions
	 * @return {Function}
	 * @see R.compose
	 * @example
	 *
	 *      var f = R.pipe(Math.pow, R.negate, R.inc);
	 *
	 *      f(3, 4); // -(3^4) + 1
	 */
	module.exports = function pipe() {
	  if (arguments.length === 0) {
	    throw new Error('pipe requires at least one argument');
	  }
	  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function _arity(n, fn) {
	  /* eslint-disable no-unused-vars */
	  switch (n) {
	    case 0:
	      return function () {
	        return fn.apply(this, arguments);
	      };
	    case 1:
	      return function (a0) {
	        return fn.apply(this, arguments);
	      };
	    case 2:
	      return function (a0, a1) {
	        return fn.apply(this, arguments);
	      };
	    case 3:
	      return function (a0, a1, a2) {
	        return fn.apply(this, arguments);
	      };
	    case 4:
	      return function (a0, a1, a2, a3) {
	        return fn.apply(this, arguments);
	      };
	    case 5:
	      return function (a0, a1, a2, a3, a4) {
	        return fn.apply(this, arguments);
	      };
	    case 6:
	      return function (a0, a1, a2, a3, a4, a5) {
	        return fn.apply(this, arguments);
	      };
	    case 7:
	      return function (a0, a1, a2, a3, a4, a5, a6) {
	        return fn.apply(this, arguments);
	      };
	    case 8:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	        return fn.apply(this, arguments);
	      };
	    case 9:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	        return fn.apply(this, arguments);
	      };
	    case 10:
	      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	        return fn.apply(this, arguments);
	      };
	    default:
	      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function _pipe(f, g) {
	  return function () {
	    return g.call(this, f.apply(this, arguments));
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry3 = __webpack_require__(11);
	var _reduce = __webpack_require__(15);

	/**
	 * Returns a single item by iterating through the list, successively calling
	 * the iterator function and passing it an accumulator value and the current
	 * value from the array, and then passing the result to the next call.
	 *
	 * The iterator function receives two values: *(acc, value)*. It may use
	 * `R.reduced` to shortcut the iteration.
	 *
	 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
	 * arrays), unlike the native `Array.prototype.reduce` method. For more details
	 * on this behavior, see:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	 *
	 * Dispatches to the `reduce` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig ((a, b) -> a) -> a -> [b] -> a
	 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	 *        current element from the array.
	 * @param {*} acc The accumulator value.
	 * @param {Array} list The list to iterate over.
	 * @return {*} The final, accumulated value.
	 * @see R.reduced, R.addIndex
	 * @example
	 *
	 *      var numbers = [1, 2, 3];
	 *      var plus = (a, b) => a + b;
	 *
	 *      R.reduce(plus, 10, numbers); //=> 16
	 */
	module.exports = _curry3(_reduce);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(12);
	var _curry2 = __webpack_require__(14);
	var _isPlaceholder = __webpack_require__(13);

	/**
	 * Optimized internal three-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry3(fn) {
	  return function f3(a, b, c) {
	    switch (arguments.length) {
	      case 0:
	        return f3;
	      case 1:
	        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
	          return fn(a, _b, _c);
	        });
	      case 2:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
	          return fn(_a, b, _c);
	        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
	          return fn(a, _b, _c);
	        }) : _curry1(function (_c) {
	          return fn(a, b, _c);
	        });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
	          return fn(_a, _b, c);
	        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
	          return fn(_a, b, _c);
	        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
	          return fn(a, _b, _c);
	        }) : _isPlaceholder(a) ? _curry1(function (_a) {
	          return fn(_a, b, c);
	        }) : _isPlaceholder(b) ? _curry1(function (_b) {
	          return fn(a, _b, c);
	        }) : _isPlaceholder(c) ? _curry1(function (_c) {
	          return fn(a, b, _c);
	        }) : fn(a, b, c);
	    }
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isPlaceholder = __webpack_require__(13);

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
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function _isPlaceholder(a) {
	       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(12);
	var _isPlaceholder = __webpack_require__(13);

	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    switch (arguments.length) {
	      case 0:
	        return f2;
	      case 1:
	        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
	          return fn(a, _b);
	        });
	      default:
	        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
	          return fn(_a, b);
	        }) : _isPlaceholder(b) ? _curry1(function (_b) {
	          return fn(a, _b);
	        }) : fn(a, b);
	    }
	  };
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _xwrap = __webpack_require__(16);
	var bind = __webpack_require__(17);
	var isArrayLike = __webpack_require__(18);

	module.exports = function () {
	  function _arrayReduce(xf, acc, list) {
	    var idx = 0;
	    var len = list.length;
	    while (idx < len) {
	      acc = xf['@@transducer/step'](acc, list[idx]);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      idx += 1;
	    }
	    return xf['@@transducer/result'](acc);
	  }

	  function _iterableReduce(xf, acc, iter) {
	    var step = iter.next();
	    while (!step.done) {
	      acc = xf['@@transducer/step'](acc, step.value);
	      if (acc && acc['@@transducer/reduced']) {
	        acc = acc['@@transducer/value'];
	        break;
	      }
	      step = iter.next();
	    }
	    return xf['@@transducer/result'](acc);
	  }

	  function _methodReduce(xf, acc, obj) {
	    return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	  }

	  var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	  return function _reduce(fn, acc, list) {
	    if (typeof fn === 'function') {
	      fn = _xwrap(fn);
	    }
	    if (isArrayLike(list)) {
	      return _arrayReduce(fn, acc, list);
	    }
	    if (typeof list.reduce === 'function') {
	      return _methodReduce(fn, acc, list);
	    }
	    if (list[symIterator] != null) {
	      return _iterableReduce(fn, acc, list[symIterator]());
	    }
	    if (typeof list.next === 'function') {
	      return _iterableReduce(fn, acc, list);
	    }
	    throw new TypeError('reduce: list must be array or iterable');
	  };
	}();

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  function XWrap(fn) {
	    this.f = fn;
	  }
	  XWrap.prototype['@@transducer/init'] = function () {
	    throw new Error('init not implemented on XWrap');
	  };
	  XWrap.prototype['@@transducer/result'] = function (acc) {
	    return acc;
	  };
	  XWrap.prototype['@@transducer/step'] = function (acc, x) {
	    return this.f(acc, x);
	  };

	  return function _xwrap(fn) {
	    return new XWrap(fn);
	  };
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(8);
	var _curry2 = __webpack_require__(14);

	/**
	 * Creates a function that is bound to a context.
	 * Note: `R.bind` does not provide the additional argument-binding capabilities of
	 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	 *
	 * @func
	 * @memberOf R
	 * @since v0.6.0
	 * @category Function
	 * @category Object
	 * @sig (* -> *) -> {*} -> (* -> *)
	 * @param {Function} fn The function to bind to context
	 * @param {Object} thisObj The context to bind `fn` to
	 * @return {Function} A function that will execute in the context of `thisObj`.
	 * @see R.partial
	 * @example
	 *
	 *      var log = R.bind(console.log, console);
	 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
	 *      // logs {a: 2}
	 */
	module.exports = _curry2(function bind(fn, thisObj) {
	  return _arity(fn.length, function () {
	    return fn.apply(thisObj, arguments);
	  });
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(12);
	var _isArray = __webpack_require__(19);
	var _isString = __webpack_require__(20);

	/**
	 * Tests whether or not an object is similar to an array.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.5.0
	 * @category Type
	 * @category List
	 * @sig * -> Boolean
	 * @param {*} x The object to test.
	 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	 * @example
	 *
	 *      R.isArrayLike([]); //=> true
	 *      R.isArrayLike(true); //=> false
	 *      R.isArrayLike({}); //=> false
	 *      R.isArrayLike({length: 10}); //=> false
	 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	 */
	module.exports = _curry1(function isArrayLike(x) {
	  if (_isArray(x)) {
	    return true;
	  }
	  if (!x) {
	    return false;
	  }
	  if (typeof x !== 'object') {
	    return false;
	  }
	  if (_isString(x)) {
	    return false;
	  }
	  if (x.nodeType === 1) {
	    return !!x.length;
	  }
	  if (x.length === 0) {
	    return true;
	  }
	  if (x.length > 0) {
	    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
	  }
	  return false;
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Tests whether or not an object is an array.
	 *
	 * @private
	 * @param {*} val The object to test.
	 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	 * @example
	 *
	 *      _isArray([]); //=> true
	 *      _isArray(null); //=> false
	 *      _isArray({}); //=> false
	 */
	module.exports = Array.isArray || function _isArray(val) {
	  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function _isString(x) {
	  return Object.prototype.toString.call(x) === '[object String]';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _checkForMethod = __webpack_require__(22);
	var slice = __webpack_require__(24);

	/**
	 * Returns all but the first element of the given list or string (or object
	 * with a `tail` method).
	 *
	 * Dispatches to the `slice` method of the first argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {*} list
	 * @return {*}
	 * @see R.head, R.init, R.last
	 * @example
	 *
	 *      R.tail([1, 2, 3]);  //=> [2, 3]
	 *      R.tail([1, 2]);     //=> [2]
	 *      R.tail([1]);        //=> []
	 *      R.tail([]);         //=> []
	 *
	 *      R.tail('abc');  //=> 'bc'
	 *      R.tail('ab');   //=> 'b'
	 *      R.tail('a');    //=> ''
	 *      R.tail('');     //=> ''
	 */
	module.exports = _checkForMethod('tail', slice(1, Infinity));

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _isArray = __webpack_require__(19);
	var _slice = __webpack_require__(23);

	/**
	 * Similar to hasMethod, this checks whether a function has a [methodname]
	 * function. If it isn't an array it will execute that function otherwise it
	 * will default to the ramda implementation.
	 *
	 * @private
	 * @param {Function} fn ramda implemtation
	 * @param {String} methodname property to check for a custom implementation
	 * @return {Object} Whatever the return value of the method is.
	 */
	module.exports = function _checkForMethod(methodname, fn) {
	  return function () {
	    var length = arguments.length;
	    if (length === 0) {
	      return fn();
	    }
	    var obj = arguments[length - 1];
	    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * An optimized, private array `slice` implementation.
	 *
	 * @private
	 * @param {Arguments|Array} args The array or arguments object to consider.
	 * @param {Number} [from=0] The array index to slice from, inclusive.
	 * @param {Number} [to=args.length] The array index to slice to, exclusive.
	 * @return {Array} A new, sliced array.
	 * @example
	 *
	 *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	 *
	 *      var firstThreeArgs = function(a, b, c, d) {
	 *        return _slice(arguments, 0, 3);
	 *      };
	 *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	 */
	module.exports = function _slice(args, from, to) {
	  switch (arguments.length) {
	    case 1:
	      return _slice(args, 0, args.length);
	    case 2:
	      return _slice(args, from, args.length);
	    default:
	      var list = [];
	      var idx = 0;
	      var len = Math.max(0, Math.min(args.length, to) - from);
	      while (idx < len) {
	        list[idx] = args[from + idx];
	        idx += 1;
	      }
	      return list;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _checkForMethod = __webpack_require__(22);
	var _curry3 = __webpack_require__(11);

	/**
	 * Returns the elements of the given list or string (or object with a `slice`
	 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
	 *
	 * Dispatches to the `slice` method of the third argument, if present.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.4
	 * @category List
	 * @sig Number -> Number -> [a] -> [a]
	 * @sig Number -> Number -> String -> String
	 * @param {Number} fromIndex The start index (inclusive).
	 * @param {Number} toIndex The end index (exclusive).
	 * @param {*} list
	 * @return {*}
	 * @example
	 *
	 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	 */
	module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
	  return Array.prototype.slice.call(list, fromIndex, toIndex);
	}));

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _curry1 = __webpack_require__(12);
	var _isString = __webpack_require__(20);
	var _slice = __webpack_require__(23);

	/**
	 * Returns a new list or string with the elements or characters in reverse
	 * order.
	 *
	 * @func
	 * @memberOf R
	 * @since v0.1.0
	 * @category List
	 * @sig [a] -> [a]
	 * @sig String -> String
	 * @param {Array|String} list
	 * @return {Array|String}
	 * @example
	 *
	 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	 *      R.reverse([1, 2]);     //=> [2, 1]
	 *      R.reverse([1]);        //=> [1]
	 *      R.reverse([]);         //=> []
	 *
	 *      R.reverse('abc');      //=> 'cba'
	 *      R.reverse('ab');       //=> 'ba'
	 *      R.reverse('a');        //=> 'a'
	 *      R.reverse('');         //=> ''
	 */
	module.exports = _curry1(function reverse(list) {
	  return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * @constant states
	 * @type {WeakMap}
	 */
	const states = new WeakMap();

	/**
	 * @param {Object} initialState
	 * @return {Function}
	 */

	exports.default = function (initialState) {

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
	      states.set(props.node, _extends({}, state, updatedState));
	      props.node.render();
	    };

	    return _extends({}, props, { state, setState });
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _ramda = __webpack_require__(28);

	var _axios = __webpack_require__(29);

	var _cssUrlParser = __webpack_require__(30);

	var _cssUrlParser2 = _interopRequireDefault(_cssUrlParser);

	var _pathParse = __webpack_require__(32);

	var _pathParse2 = _interopRequireDefault(_pathParse);

	var _escapeStringRegexp = __webpack_require__(34);

	var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

	var _once = __webpack_require__(3);

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
	 * @param props {Object}
	 * @return {void}
	 */
	const attachFiles = (0, _once2.default)(function (props) {
	    const node = props.node;
	    const files = props.files;

	    const boundary = node.shadowRoot;

	    if (files.length) {

	        node.classList.add('resolving');
	        node.classList.remove('resolved');

	        fetchIncludes(files).then(function (nodes) {

	            // Remove any `null` values which means the content of the file was empty, and then append
	            // them to the component's shadow boundary.
	            nodes.filter(_ramda.identity).forEach(function (node) {
	                return boundary.appendChild(node);
	            });

	            node.classList.add('resolved');
	            node.classList.remove('resolving');
	        });
	    }
	});

	/**
	 * @param {Array|String} files
	 * @return {Function}
	 */

	exports.default = function (...files) {

	    return function (props) {

	        // Attach the documents using the `once` middleware.
	        attachFiles(_extends({}, props, { files: Array.isArray(files) ? files : [files] }));

	        return props;
	    };
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parseCssUrls = __webpack_require__(31);
	module.exports = parseCssUrls;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	var embeddedRegexp = /data:(.*?);base64,/;
	var commentRegexp = /\/\*([\s\S]*?)\*\//g;
	var urlsRegexp = /((?:@import\s+)?url\s*\(['"]?)(\S*?)(['"]?\s*\))|(@import\s+['"]?)([^;'"]+)/ig;

	function isEmbedded(src) {
		return embeddedRegexp.test(src);
	}

	function getUrls(text) {
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var isWindows = process.platform === 'win32';

	// Regex to split a windows path into three parts: [*, device, slash,
	// tail] windows-only
	var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

	// Regex to split the tail part of the above into [*, dir, basename, ext]
	var splitTailRe = /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

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

	win32.parse = function (pathString) {
	  if (typeof pathString !== 'string') {
	    throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
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
	var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var posix = {};

	function posixSplitPath(filename) {
	  return splitPathRe.exec(filename).slice(1);
	}

	posix.parse = function (pathString) {
	  if (typeof pathString !== 'string') {
	    throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
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

	if (isWindows) module.exports = win32.parse;else /* posix */
	  module.exports = posix.parse;

	module.exports.posix = posix.parse;
	module.exports.win32 = win32.parse;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

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
	function defaultClearTimeout() {
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
	})();
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
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
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
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
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
	    while (len) {
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

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';

	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}

		return str.replace(matchOperatorsRe, '\\$&');
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

	exports.default = function (store, handler = function () {
	  return true;
	}) {

	  return function (props) {

	    const has = subscriptions.has(props.node);
	    const state = store.getState();

	    // Subscribe to the store only if we haven't done so already.
	    !has && subscriptions.set(props.node, store.subscribe(function () {
	      return handler(store.getState(), state) && props.node.render();
	    }));

	    return _extends({}, props, { redux: state, dispatch: store.dispatch });
	  };
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

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

	    const refsLocal = refs.get(node) || [];

	    // Iterate over each defined refs and invoke it.
	    Array.from(refsLocal.keys()).forEach(function (key) {
	        refsLocal.get(key)(key);
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
	    const refsLocal = refs.get(node);
	    refsLocal && refsLocal.clear(node);
	};

	/**
	 * @param {Object} props
	 * @return {Object}
	 */

	exports.default = function (props) {

	    const has = refs.has(props.node);
	    !has && refs.set(props.node, new Map());
	    const refsLocal = refs.get(props.node);

	    const ref = function (fn) {

	        // See: https://github.com/Matt-Esch/virtual-dom/blob/master/docs/hooks.md
	        const Hook = function () {};
	        Hook.prototype.hook = function (node) {
	            return refsLocal.set(node, fn);
	        };
	        return new Hook();
	    };

	    // Delete the refs is the node has been removed from the DOM.
	    has && !props.node.isConnected && refs.delete(props.node);

	    return _extends({}, props, { ref });
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _switzerland = __webpack_require__(1);

	/**
	 * @constant registered
	 * @type {Set}
	 */
	const registered = new Set();

	/**
	 * @method setPrototypeFor
	 * @param {HTMLElement} node
	 * @param {Array} methods
	 * @return {void}
	 */
	const setPrototypeFor = function (node, methods) {

	    registered.add(node.nodeName);

	    Object.keys(methods).forEach(function (name) {

	        const fn = methods[name];

	        Object.getPrototypeOf(node)[name] = function (...args) {

	            if (!(_switzerland.registryKey in this)) {
	                (0, _switzerland.error)('You have passed an invalid context when invoking the node method');
	                return;
	            }

	            // Gather the props that caused the last render of the component, and then invoke
	            // the prototype function.
	            const lastProps = this[_switzerland.registryKey].props;

	            fn(_extends({}, lastProps, { args }));
	        };
	    });
	};

	/**
	 * @param {Object} methods
	 * @return {Function}
	 */

	exports.default = function (methods) {

	    return function (props) {
	        const node = props.node;

	        const has = registered.has(node.nodeName);
	        !has && setPrototypeFor(node, methods);

	        return props;
	    };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _propTypes = __webpack_require__(40);

	var _env = __webpack_require__(41);

	/**
	 * @param {Object} schema
	 * @return {Function}
	 */
	exports.default = function (schema) {

	    return function (props) {
	        (0, _env.isDevelopment)() && (0, _propTypes.validate)(schema, props, props.node.nodeName.toLowerCase());
	        return props;
	    };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";

	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.loaded = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	}(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";

		var _interopRequire = function (obj) {
			return obj && obj.__esModule ? obj["default"] : obj;
		};

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

		/***/
	},
	/* 1 */
	/***/function (module, exports, __webpack_require__) {

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

		/***/
	},
	/* 2 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";

		var _interopRequire = function (obj) {
			return obj && obj.__esModule ? obj["default"] : obj;
		};

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

		/***/
	},
	/* 3 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";

		var _interopRequire = function (obj) {
			return obj && obj.__esModule ? obj["default"] : obj;
		};

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

		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {

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

		/***/
	},
	/* 5 */
	/***/function (module, exports, __webpack_require__) {

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

		/***/
	}
	/******/]);

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isDevelopment = undefined;

	var _once = __webpack_require__(42);

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
	const isDevelopment = exports.isDevelopment = (0, _once2.default)(function () {
	    return env === 'development';
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _arity = __webpack_require__(8);
	var _curry1 = __webpack_require__(12);

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
	  return _arity(fn.length, function () {
	    if (called) {
	      return result;
	    }
	    called = true;
	    result = fn.apply(this, arguments);
	    return result;
	  });
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.timeEnd = exports.time = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _shortid = __webpack_require__(44);

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
	  const has = timers.has(props.node);
	  const id = has ? timers.get(node) : node.nodeName.toLowerCase() + ' (' + (0, _shortid.generate)() + ')';
	  !has && timers.set(node, id);
	  console.time(id);
	  return _extends({}, props, { timer: id });
	};

	/**
	 * @method timeEnd
	 * @param {Object} props
	 * @return {Object}
	 */
	const timeEnd = exports.timeEnd = function (props) {

	  const id = timers.get(props.node);
	  console.timeEnd(id);
	  return _extends({}, props, { timer: id });
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(45);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(46);
	var encode = __webpack_require__(48);
	var decode = __webpack_require__(50);
	var isValid = __webpack_require__(51);

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
	var clusterWorkerId = __webpack_require__(52) || 0;

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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(47);

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

	    var unique = _alphabet_.split('').filter(function (item, ind, arr) {
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
/* 47 */
/***/ function(module, exports) {

	'use strict';

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
	    return seed / 233280.0;
	}

	function setSeed(_seed_) {
	    seed = _seed_;
	}

	module.exports = {
	    nextValue: getNextValue,
	    seed: setSeed
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(49);

	function encode(lookup, number) {
	    var loopCounter = 0;
	    var done;

	    var str = '';

	    while (!done) {
	        str = str + lookup(number >> 4 * loopCounter & 0x0f | randomByte());
	        done = number < Math.pow(16, loopCounter + 1);
	        loopCounter++;
	    }
	    return str;
	}

	module.exports = encode;

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(46);

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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(46);

	function isShortId(id) {
	    if (!id || typeof id !== 'string' || id.length < 6) {
	        return false;
	    }

	    var characters = alphabet.characters();
	    var len = id.length;
	    for (var i = 0; i < len; i++) {
	        if (characters.indexOf(id[i]) === -1) {
	            return false;
	        }
	    }
	    return true;
	}

	module.exports = isShortId;

/***/ },
/* 52 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.path = undefined;

	var _pathParse = __webpack_require__(32);

	var _pathParse2 = _interopRequireDefault(_pathParse);

	var _switzerland = __webpack_require__(1);

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

	  (0, _switzerland.error)('Unable to determine the path for the current component');
	}();

	/**
	 * @method path
	 * @param {String} file
	 * @return {String}
	 */
	const path = exports.path = function (file) {
	  return scriptPath + '/' + file;
	};

	/**
	 * @method toString
	 * @return {String}
	 */
	path.toString = function () {
	  return scriptPath;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.compose = exports.pipe = undefined;

	var _promisedPipe = __webpack_require__(55);

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
/* 55 */
/***/ function(module, exports) {

	module.exports = require("promised-pipe");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var diff = __webpack_require__(57);
	var patch = __webpack_require__(70);
	var h = __webpack_require__(79);
	var create = __webpack_require__(90);
	var VNode = __webpack_require__(81);
	var VText = __webpack_require__(82);

	module.exports = {
	    diff: diff,
	    patch: patch,
	    h: h,
	    create: create,
	    VNode: VNode,
	    VText: VText
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var diff = __webpack_require__(58);

	module.exports = diff;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isArray = __webpack_require__(59);

	var VPatch = __webpack_require__(60);
	var isVNode = __webpack_require__(62);
	var isVText = __webpack_require__(63);
	var isWidget = __webpack_require__(64);
	var isThunk = __webpack_require__(65);
	var handleThunk = __webpack_require__(66);

	var diffProps = __webpack_require__(67);

	module.exports = diff;

	function diff(a, b) {
	    var patch = { a: a };
	    walk(a, b, patch, 0);
	    return patch;
	}

	function walk(a, b, patch, index) {
	    if (a === b) {
	        return;
	    }

	    var apply = patch[index];
	    var applyClear = false;

	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index);
	    } else if (b == null) {

	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index);
	            apply = patch[index];
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties);
	                if (propsPatch) {
	                    apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
	                }
	                apply = diffChildren(a, b, patch, apply, index);
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
	                applyClear = true;
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
	            applyClear = true;
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
	            applyClear = true;
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true;
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
	    }

	    if (apply) {
	        patch[index] = apply;
	    }

	    if (applyClear) {
	        clearState(a, patch, index);
	    }
	}

	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children;
	    var orderedSet = reorder(aChildren, b.children);
	    var bChildren = orderedSet.children;

	    var aLen = aChildren.length;
	    var bLen = bChildren.length;
	    var len = aLen > bLen ? aLen : bLen;

	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i];
	        var rightNode = bChildren[i];
	        index += 1;

	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index);
	        }

	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count;
	        }
	    }

	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
	    }

	    return apply;
	}

	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index);
	    destroyWidgets(vNode, patch, index);
	}

	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children;
	        var len = children.length;
	        for (var i = 0; i < len; i++) {
	            var child = children[i];
	            index += 1;

	            destroyWidgets(child, patch, index);

	            if (isVNode(child) && child.count) {
	                index += child.count;
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index);
	    }
	}

	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b);
	    var thunkPatch = diff(nodes.a, nodes.b);
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
	    }
	}

	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true;
	        }
	    }

	    return false;
	}

	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
	        }

	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children;
	            var len = children.length;
	            for (var i = 0; i < len; i++) {
	                var child = children[i];
	                index += 1;

	                unhook(child, patch, index);

	                if (isVNode(child) && child.count) {
	                    index += child.count;
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index);
	    }
	}

	function undefinedKeys(obj) {
	    var result = {};

	    for (var key in obj) {
	        result[key] = undefined;
	    }

	    return result;
	}

	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren);
	    var bKeys = bChildIndex.keys;
	    var bFree = bChildIndex.free;

	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        };
	    }

	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren);
	    var aKeys = aChildIndex.keys;
	    var aFree = aChildIndex.free;

	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        };
	    }

	    // O(MAX(N, M)) memory
	    var newChildren = [];

	    var freeIndex = 0;
	    var freeCount = bFree.length;
	    var deletedItems = 0;

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0; i < aChildren.length; i++) {
	        var aItem = aChildren[i];
	        var itemIndex;

	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key];
	                newChildren.push(bChildren[itemIndex]);
	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++;
	                newChildren.push(null);
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++];
	                newChildren.push(bChildren[itemIndex]);
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++;
	                newChildren.push(null);
	            }
	        }
	    }

	    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];

	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j];

	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem);
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem);
	        }
	    }

	    var simulate = newChildren.slice();
	    var simulateIndex = 0;
	    var removes = [];
	    var inserts = [];
	    var simulateItem;

	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k];
	        simulateItem = simulate[simulateIndex];

	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null));
	            simulateItem = simulate[simulateIndex];
	        }

	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key));
	                        simulateItem = simulate[simulateIndex];
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({ key: wantedItem.key, to: k });
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                                simulateIndex++;
	                            }
	                    } else {
	                        inserts.push({ key: wantedItem.key, to: k });
	                    }
	                } else {
	                    inserts.push({ key: wantedItem.key, to: k });
	                }
	                k++;
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                    removes.push(remove(simulate, simulateIndex, simulateItem.key));
	                }
	        } else {
	            simulateIndex++;
	            k++;
	        }
	    }

	    // remove all the remaining nodes from simulate
	    while (simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex];
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
	    }

	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        };
	    }

	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    };
	}

	function remove(arr, index, key) {
	    arr.splice(index, 1);

	    return {
	        from: index,
	        key: key
	    };
	}

	function keyIndex(children) {
	    var keys = {};
	    var free = [];
	    var length = children.length;

	    for (var i = 0; i < length; i++) {
	        var child = children[i];

	        if (child.key) {
	            keys[child.key] = i;
	        } else {
	            free.push(i);
	        }
	    }

	    return {
	        keys: keys, // A hash of key name to index
	        free: free // An array of unkeyed item indices
	    };
	}

	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch);
	        } else {
	            apply = [apply, patch];
	        }

	        return apply;
	    } else {
	        return patch;
	    }
	}

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	var nativeIsArray = Array.isArray;
	var toString = Object.prototype.toString;

	module.exports = nativeIsArray || isArray;

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]";
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(61);

	VirtualPatch.NONE = 0;
	VirtualPatch.VTEXT = 1;
	VirtualPatch.VNODE = 2;
	VirtualPatch.WIDGET = 3;
	VirtualPatch.PROPS = 4;
	VirtualPatch.ORDER = 5;
	VirtualPatch.INSERT = 6;
	VirtualPatch.REMOVE = 7;
	VirtualPatch.THUNK = 8;

	module.exports = VirtualPatch;

	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type);
	    this.vNode = vNode;
	    this.patch = patch;
	}

	VirtualPatch.prototype.version = version;
	VirtualPatch.prototype.type = "VirtualPatch";

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";

	module.exports = "2";

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(61);

	module.exports = isVirtualNode;

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version;
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(61);

	module.exports = isVirtualText;

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version;
	}

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isWidget;

	function isWidget(w) {
	    return w && w.type === "Widget";
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isThunk;

	function isThunk(t) {
	    return t && t.type === "Thunk";
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isVNode = __webpack_require__(62);
	var isVText = __webpack_require__(63);
	var isWidget = __webpack_require__(64);
	var isThunk = __webpack_require__(65);

	module.exports = handleThunk;

	function handleThunk(a, b) {
	    var renderedA = a;
	    var renderedB = b;

	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a);
	    }

	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null);
	    }

	    return {
	        a: renderedA,
	        b: renderedB
	    };
	}

	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode;

	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous);
	    }

	    if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }

	    return renderedThunk;
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(68);
	var isHook = __webpack_require__(69);

	module.exports = diffProps;

	function diffProps(a, b) {
	    var diff;

	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {};
	            diff[aKey] = undefined;
	        }

	        var aValue = a[aKey];
	        var bValue = b[aKey];

	        if (aValue === bValue) {
	            continue;
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {};
	                diff[aKey] = bValue;
	            } else if (isHook(bValue)) {
	                diff = diff || {};
	                diff[aKey] = bValue;
	            } else {
	                var objectDiff = diffProps(aValue, bValue);
	                if (objectDiff) {
	                    diff = diff || {};
	                    diff[aKey] = objectDiff;
	                }
	            }
	        } else {
	            diff = diff || {};
	            diff[aKey] = bValue;
	        }
	    }

	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {};
	            diff[bKey] = b[bKey];
	        }
	    }

	    return diff;
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value);
	    } else if (value.__proto__) {
	        return value.__proto__;
	    } else if (value.constructor) {
	        return value.constructor.prototype;
	    }
	}

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";

	module.exports = isHook;

	function isHook(hook) {
	  return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var patch = __webpack_require__(71);

	module.exports = patch;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var document = __webpack_require__(72);
	var isArray = __webpack_require__(59);

	var render = __webpack_require__(74);
	var domIndex = __webpack_require__(76);
	var patchOp = __webpack_require__(77);
	module.exports = patch;

	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {};
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
	    renderOptions.render = renderOptions.render || render;

	    return renderOptions.patch(rootNode, patches, renderOptions);
	}

	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches);

	    if (indices.length === 0) {
	        return rootNode;
	    }

	    var index = domIndex(rootNode, patches.a, indices);
	    var ownerDocument = rootNode.ownerDocument;

	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument;
	    }

	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i];
	        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
	    }

	    return rootNode;
	}

	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode;
	    }

	    var newNode;

	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions);

	            if (domNode === rootNode) {
	                rootNode = newNode;
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions);

	        if (domNode === rootNode) {
	            rootNode = newNode;
	        }
	    }

	    return rootNode;
	}

	function patchIndices(patches) {
	    var indices = [];

	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key));
	        }
	    }

	    return indices;
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
	var minDoc = __webpack_require__(73);

	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 73 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var document = __webpack_require__(72);

	var applyProperties = __webpack_require__(75);

	var isVNode = __webpack_require__(62);
	var isVText = __webpack_require__(63);
	var isWidget = __webpack_require__(64);
	var handleThunk = __webpack_require__(66);

	module.exports = createElement;

	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document;
	    var warn = opts ? opts.warn : null;

	    vnode = handleThunk(vnode).a;

	    if (isWidget(vnode)) {
	        return vnode.init();
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text);
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode);
	        }
	        return null;
	    }

	    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);

	    var props = vnode.properties;
	    applyProperties(node, props);

	    var children = vnode.children;

	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts);
	        if (childNode) {
	            node.appendChild(childNode);
	        }
	    }

	    return node;
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isObject = __webpack_require__(68);
	var isHook = __webpack_require__(69);

	module.exports = applyProperties;

	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName];

	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous);
	            if (propValue.hook) {
	                propValue.hook(node, propName, previous ? previous[propName] : undefined);
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue;
	            }
	        }
	    }
	}

	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName];

	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName);
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = "";
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = "";
	            } else {
	                node[propName] = null;
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue);
	        }
	    }
	}

	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined;

	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName];

	            if (attrValue === undefined) {
	                node.removeAttribute(attrName);
	            } else {
	                node.setAttribute(attrName, attrValue);
	            }
	        }

	        return;
	    }

	    if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue;
	        return;
	    }

	    if (!isObject(node[propName])) {
	        node[propName] = {};
	    }

	    var replacer = propName === "style" ? "" : undefined;

	    for (var k in propValue) {
	        var value = propValue[k];
	        node[propName][k] = value === undefined ? replacer : value;
	    }
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value);
	    } else if (value.__proto__) {
	        return value.__proto__;
	    } else if (value.constructor) {
	        return value.constructor.prototype;
	    }
	}

/***/ },
/* 76 */
/***/ function(module, exports) {

	"use strict";

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.

	var noChild = {};

	module.exports = domIndex;

	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {};
	    } else {
	        indices.sort(ascending);
	        return recurse(rootNode, tree, indices, nodes, 0);
	    }
	}

	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {};

	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode;
	        }

	        var vChildren = tree.children;

	        if (vChildren) {

	            var childNodes = rootNode.childNodes;

	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1;

	                var vChild = vChildren[i] || noChild;
	                var nextIndex = rootIndex + (vChild.count || 0);

	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex);
	                }

	                rootIndex = nextIndex;
	            }
	        }
	    }

	    return nodes;
	}

	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false;
	    }

	    var minIndex = 0;
	    var maxIndex = indices.length - 1;
	    var currentIndex;
	    var currentItem;

	    while (minIndex <= maxIndex) {
	        currentIndex = (maxIndex + minIndex) / 2 >> 0;
	        currentItem = indices[currentIndex];

	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right;
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1;
	        } else if (currentItem > right) {
	            maxIndex = currentIndex - 1;
	        } else {
	            return true;
	        }
	    }

	    return false;
	}

	function ascending(a, b) {
	    return a > b ? 1 : -1;
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var applyProperties = __webpack_require__(75);

	var isWidget = __webpack_require__(64);
	var VPatch = __webpack_require__(60);

	var updateWidget = __webpack_require__(78);

	module.exports = applyPatch;

	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type;
	    var vNode = vpatch.vNode;
	    var patch = vpatch.patch;

	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode);
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions);
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions);
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions);
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions);
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch);
	            return domNode;
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties);
	            return domNode;
	        case VPatch.THUNK:
	            return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
	        default:
	            return domNode;
	    }
	}

	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode;

	    if (parentNode) {
	        parentNode.removeChild(domNode);
	    }

	    destroyWidget(domNode, vNode);

	    return null;
	}

	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions);

	    if (parentNode) {
	        parentNode.appendChild(newNode);
	    }

	    return parentNode;
	}

	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode;

	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text);
	        newNode = domNode;
	    } else {
	        var parentNode = domNode.parentNode;
	        newNode = renderOptions.render(vText, renderOptions);

	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode);
	        }
	    }

	    return newNode;
	}

	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget);
	    var newNode;

	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode;
	    } else {
	        newNode = renderOptions.render(widget, renderOptions);
	    }

	    var parentNode = domNode.parentNode;

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	    }

	    if (!updating) {
	        destroyWidget(domNode, leftVNode);
	    }

	    return newNode;
	}

	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode;
	    var newNode = renderOptions.render(vNode, renderOptions);

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode);
	    }

	    return newNode;
	}

	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode);
	    }
	}

	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes;
	    var keyMap = {};
	    var node;
	    var remove;
	    var insert;

	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i];
	        node = childNodes[remove.from];
	        if (remove.key) {
	            keyMap[remove.key] = node;
	        }
	        domNode.removeChild(node);
	    }

	    var length = childNodes.length;
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j];
	        node = keyMap[insert.key];
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
	    }
	}

	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot);
	    }

	    return newRoot;
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var isWidget = __webpack_require__(64);

	module.exports = updateWidget;

	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id;
	        } else {
	            return a.init === b.init;
	        }
	    }

	    return false;
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var h = __webpack_require__(80);

	module.exports = h;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(59);

	var VNode = __webpack_require__(81);
	var VText = __webpack_require__(82);
	var isVNode = __webpack_require__(62);
	var isVText = __webpack_require__(63);
	var isWidget = __webpack_require__(64);
	var isHook = __webpack_require__(69);
	var isVThunk = __webpack_require__(65);

	var parseTag = __webpack_require__(83);
	var softSetHook = __webpack_require__(85);
	var evHook = __webpack_require__(86);

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
	    if (tag === 'INPUT' && !namespace && props.hasOwnProperty('value') && props.value !== undefined && !isHook(props.value)) {
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
	    err.message = 'Unexpected virtual child passed to h().\n' + 'Expected a VNode / Vthunk / VWidget / string but:\n' + 'got:\n' + errorString(data.foreignObject) + '.\n' + 'The parent vnode is:\n' + errorString(data.parentVnode);
	    '\n' + 'Suggested fix: change your `h(..., [ ... ])` callsite.';
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(61);
	var isVNode = __webpack_require__(62);
	var isWidget = __webpack_require__(64);
	var isThunk = __webpack_require__(65);
	var isVHook = __webpack_require__(69);

	module.exports = VirtualNode;

	var noProperties = {};
	var noChildren = [];

	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName;
	    this.properties = properties || noProperties;
	    this.children = children || noChildren;
	    this.key = key != null ? String(key) : undefined;
	    this.namespace = typeof namespace === "string" ? namespace : null;

	    var count = children && children.length || 0;
	    var descendants = 0;
	    var hasWidgets = false;
	    var hasThunks = false;
	    var descendantHooks = false;
	    var hooks;

	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName];
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {};
	                }

	                hooks[propName] = property;
	            }
	        }
	    }

	    for (var i = 0; i < count; i++) {
	        var child = children[i];
	        if (isVNode(child)) {
	            descendants += child.count || 0;

	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true;
	            }

	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true;
	            }

	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true;
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true;
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }

	    this.count = count + descendants;
	    this.hasWidgets = hasWidgets;
	    this.hasThunks = hasThunks;
	    this.hooks = hooks;
	    this.descendantHooks = descendantHooks;
	}

	VirtualNode.prototype.version = version;
	VirtualNode.prototype.type = "VirtualNode";

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var version = __webpack_require__(61);

	module.exports = VirtualText;

	function VirtualText(text) {
	    this.text = String(text);
	}

	VirtualText.prototype.version = version;
	VirtualText.prototype.type = "VirtualText";

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var split = __webpack_require__(84);

	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;

	module.exports = parseTag;

	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }

	    var noId = !props.hasOwnProperty('id');

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
/* 84 */
/***/ function(module, exports) {

	"use strict";

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
	module.exports = function split(undef) {

	  var nativeSplit = String.prototype.split,
	      compliantExecNpcg = /()??/.exec("")[1] === undef,

	  // NPCG: nonparticipating capturing group
	  self;

	  self = function (str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	        flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
	    separator.sticky ? "y" : ""),

	    // Firefox 3+
	    lastLastIndex = 0,

	    // Make `global` and avoid `lastIndex` issues by working with a copy
	    separator = new RegExp(separator.source, flags + "g"),
	        separator2,
	        match,
	        lastIndex,
	        lastLength;
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
	          match[0].replace(separator2, function () {
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
	}();

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var EvStore = __webpack_require__(87);

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

	EvHook.prototype.unhook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);

	    es[propName] = undefined;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var OneVersionConstraint = __webpack_require__(88);

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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Individual = __webpack_require__(89);

	module.exports = OneVersion;

	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';

	    var versionValue = Individual(enforceKey, version);

	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' + moduleName + '.\n' + 'You already have version ' + versionValue + ' installed.\n' + 'This means you cannot install version ' + version);
	    }

	    return Individual(key, defaultValue);
	}

/***/ },
/* 89 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/*global window, global*/

	var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

	module.exports = Individual;

	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }

	    root[key] = value;

	    return value;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var createElement = __webpack_require__(74);

	module.exports = createElement;

/***/ }
/******/ ]);