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
	exports.element = exports.timeEnd = exports.time = exports.redux = exports.include = exports.state = exports.attrs = exports.once = exports.html = exports.create = undefined;

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

	var _state = __webpack_require__(7);

	Object.defineProperty(exports, 'state', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_state).default;
	    }
	});

	var _include = __webpack_require__(8);

	Object.defineProperty(exports, 'include', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_include).default;
	    }
	});

	var _redux = __webpack_require__(10);

	Object.defineProperty(exports, 'redux', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_redux).default;
	    }
	});

	var _timer = __webpack_require__(11);

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

	var _virtualDom = __webpack_require__(21);

	Object.defineProperty(exports, 'element', {
	    enumerable: true,
	    get: function () {
	        return _virtualDom.h;
	    }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @constant registry
	 * @type {WeakMap}
	 */
	const registry = new WeakMap();

	/**
	 * @constant implementations
	 * @type {Object}
	 */
	const implementations = {

	    v0: {
	        hooks: ['attachedCallback', 'detachedCallback'],
	        customElement: (name, blueprint) => document.registerElement(name, blueprint),
	        shadowBoundary: node => node.createShadowRoot()
	    },
	    v1: {
	        hooks: ['connectedCallback', 'disconnectedCallback'],
	        customElement: (name, blueprint) => window.customElements.define(name, blueprint),
	        shadowBoundary: node => node.attachShadow({ mode: 'open' })
	    }

	};

	/**
	 * @method htmlFor
	 * @param {Object} model
	 * @return {Object}
	 */
	const htmlFor = model => {
	    return 'html' in model ? model.html : model;
	};

	/**
	 * @method create
	 * @param {String} name
	 * @param {Function} render
	 * @return {void}
	 */
	const create = exports.create = (name, render) => {

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
	         * @method connectedCallback
	         * @return {void}
	         */
	        [implementation.hooks[0]]() {

	            const node = this;
	            const boundary = implementation.shadowBoundary(node);
	            const rerender = () => this.render();

	            const tree = htmlFor(render({ node, render: rerender }));
	            const root = (0, _virtualDom.create)(tree);

	            // See: https://github.com/Matt-Esch/virtual-dom/pull/413
	            boundary.appendChild(root);

	            registry.set(this, { node, tree, root });
	        }

	        /**
	         * @method disconnectedCallback
	         * @return {void}
	         */
	        [implementation.hooks[1]]() {

	            // Once the node has been removed then we perform one last pass, however the render function
	            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
	            this.render();
	        }

	        /**
	         * @method render
	         * @return {void}
	         */
	        render() {

	            const instance = registry.get(this);

	            if (!instance) {

	                // Rejected as developer has attempted to re-render during the start-up phase.
	                // As an alternative we could queue the re-render using `setTimeout` for the next
	                // tick, but ideally the developer should setup sensible defaults and thus avoid a
	                // re-render during the start-up phase.
	                // Queue: setTimeout(this.render.bind(this));
	                return;
	            }

	            const currentTree = instance.tree;
	            const currentRoot = instance.root;
	            const node = instance.node;

	            const rerender = () => this.render();

	            const tree = htmlFor(render({ node, render: rerender }));

	            if (node.isConnected) {

	                const patches = (0, _virtualDom.diff)(currentTree, tree);
	                const root = (0, _virtualDom.patch)(currentRoot, patches);

	                registry.set(this, { node, tree, root });
	            }
	        }

	    });
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/**
	 * @param {Function} html
	 * @return {Function}
	 */
	exports.default = html => {

	    return props => {
	        return _extends({}, props, { html: html(props) });
	    };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

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
	 * @return {Function}
	 */

	exports.default = callback => {

	    return props => {

	        // Ensure the node has an entry in the map.
	        const hasNode = once.has(props.node);
	        !hasNode && once.set(props.node, new WeakMap());

	        // Determine whether the function has been called already.
	        const hasFunction = once.get(props.node).has(callback);
	        !hasFunction && once.get(props.node).set(callback, callback(props));

	        return _extends({}, props, once.get(props.node).get(callback));
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

	var _ramda = __webpack_require__(6);

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
	const removePrefix = name => name.replace('data-', '');

	/**
	 * @method transform
	 * @param {NamedNodeMap} attributes
	 * @return {Object}
	 */
	const transform = attributes => {

	  return Object.keys(attributes).reduce((acc, index) => {

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

	exports.default = props => {
	  const node = props.node;
	  const render = props.render;

	  // Obtain the reference to the observer, using the WeakMap to query whether we have an existing
	  // one to utilise before creating another.

	  const hasObserver = observers.has(node);
	  const observer = hasObserver ? observers.get(node) : new MutationObserver(() => {

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
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 7 */
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
	 * @param {Object} props
	 * @return {Object}
	 */

	exports.default = props => {

	  const hasState = states.has(props.node);
	  const state = hasState ? states.get(props.node) : {};
	  !hasState && states.set(props.node, state);

	  /**
	   * @method setState
	   * @param {Object} updatedState
	   * @return {void}
	   */
	  const setState = updatedState => {
	    states.set(props.node, _extends({}, state, updatedState));
	    props.render();
	  };

	  return _extends({}, props, { state, setState });
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _ramda = __webpack_require__(6);

	var _axios = __webpack_require__(9);

	/**
	 * @constant includes
	 * @type {WeakMap}
	 */
	const includes = new WeakMap();

	/**
	 * @constant includeMap
	 * @type {Object}
	 */
	const includeMap = [{ extensions: ['js'], tag: 'script', attrs: { type: 'text/javascript' } }, { extensions: ['css'], tag: 'style', attrs: { type: 'text/css' } }];

	/**
	 * @method fetchInclude
	 * @param {String} document
	 * @return {Promise}
	 */
	const fetchInclude = (0, _ramda.memoize)(document => {

	    return new Promise(resolve => {
	        (0, _axios.get)(document).then(response => response.data).then(resolve).catch(() => resolve(''));
	    });
	});

	/**
	 * @method attach
	 * @param files {Array|String}
	 * @return {Promise}
	 */
	const attach = files => {

	    // Group all of the files by their extension.
	    const groupedFiles = (0, _ramda.groupBy)(file => file.extension)(files.map(path => ({ path, extension: path.split('.').pop() })));

	    const mappedFiles = Object.keys(groupedFiles).map(extension => {

	        const nodeData = includeMap.find(model => model.extensions.includes(extension));
	        const files = groupedFiles[extension].map(model => model.path);
	        const containerNode = document.createElement(nodeData.tag);

	        // Apply all of the attributes defined in the `includeMap` to the node.
	        Object.keys(nodeData.attrs).map(key => containerNode.setAttribute(key, nodeData.attrs[key]));

	        // Load each file individually and then concatenate them.
	        return Promise.all(files.map(fetchInclude)).then(fileData => {
	            containerNode.innerHTML = fileData.reduce((acc, fileDatum) => `${ acc } ${ fileDatum }`).trim();
	            return containerNode.innerHTML.length ? containerNode : null;
	        });
	    });

	    return Promise.all(mappedFiles);
	};

	/**
	 * @param {Array} files
	 * @return {Function}
	 */

	exports.default = (...files) => {

	    return props => {
	        const node = props.node;


	        const addedFiles = (() => {

	            if (node.isConnected) {

	                const boundary = props.node.shadowRoot;

	                const hasCurrent = includes.has(node);
	                !hasCurrent && includes.set(node, []);
	                const current = includes.get(node);

	                // We don't want to load the same files again, so we'll see what was previously loaded.
	                const addedFiles = (0, _ramda.difference)(files, current);

	                // Memorise the current set of files.
	                includes.set(node, files);

	                if (addedFiles.length) {

	                    props.node.classList.add('resolving');
	                    props.node.classList.remove('resolved');

	                    attach(addedFiles).then(nodes => {

	                        // Remove any `null` values which means the content of the file was empty, and then append
	                        // them to the component's shadow boundary.
	                        nodes.filter(_ramda.identity).forEach(node => boundary.appendChild(node));

	                        props.node.classList.add('resolved');
	                        props.node.classList.remove('resolving');
	                    });
	                }

	                return addedFiles;
	            }

	            return [];
	        })();

	        return _extends({}, props, { files: addedFiles });
	    };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 10 */
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

	exports.default = (store, handler = () => true) => {

	  return props => {

	    const has = subscriptions.has(props.node);

	    // Subscribe to the store only if we haven't done so already.
	    !has && subscriptions.set(props.node, store.subscribe(() => handler(store.getState()) && props.render()));

	    return _extends({}, props, { store: store.getState(), dispatch: store.dispatch });
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.timeEnd = exports.time = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _shortid = __webpack_require__(12);

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
	const time = exports.time = props => {

	  const node = props.node;
	  const has = timers.has(props.node);
	  const id = has ? timers.get(node) : `${ node.nodeName.toLowerCase() } (${ (0, _shortid.generate)() })`;
	  !has && timers.set(node, id);
	  console.time(id);
	  return _extends({}, props, { timer: id });
	};

	/**
	 * @method timeEnd
	 * @param {Object} props
	 * @return {Object}
	 */
	const timeEnd = exports.timeEnd = props => {

	  console.timeEnd(id);
	  return _extends({}, props, { timer: id });
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(14);
	var encode = __webpack_require__(16);
	var decode = __webpack_require__(18);
	var isValid = __webpack_require__(19);

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
	var clusterWorkerId = __webpack_require__(20) || 0;

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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomFromSeed = __webpack_require__(15);

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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var randomByte = __webpack_require__(17);

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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(14);

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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var alphabet = __webpack_require__(14);

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
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = 0;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("virtual-dom");

/***/ }
/******/ ]);