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
	exports.element = exports.redux = exports.include = exports.state = exports.attrs = exports.create = undefined;

	var _attributes = __webpack_require__(2);

	Object.defineProperty(exports, 'attrs', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_attributes).default;
	    }
	});

	var _state = __webpack_require__(5);

	Object.defineProperty(exports, 'state', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_state).default;
	    }
	});

	var _include = __webpack_require__(6);

	Object.defineProperty(exports, 'include', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_include).default;
	    }
	});

	var _redux = __webpack_require__(8);

	Object.defineProperty(exports, 'redux', {
	    enumerable: true,
	    get: function () {
	        return _interopRequireDefault(_redux).default;
	    }
	});

	var _virtualDom = __webpack_require__(9);

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
	 * @method create
	 * @param {String} name
	 * @param {Function} render
	 * @return {void}
	 */
	const create = exports.create = (name, render) => {

	    window.customElements.define(name, class extends window.HTMLElement {

	        /**
	         * @method connectedCallback
	         * @return {void}
	         */
	        connectedCallback() {

	            const node = this;
	            const boundary = node.attachShadow({ mode: 'open' });
	            const rerender = () => this.render(registry.get(this));

	            const tree = render({ node, render: rerender });
	            const root = (0, _virtualDom.create)(tree);

	            // See: https://github.com/Matt-Esch/virtual-dom/pull/413
	            boundary.appendChild(root);

	            registry.set(this, { node, tree, root });
	        }

	        /**
	         * @method disconnectedCallback
	         * @return {void}
	         */
	        disconnectedCallback() {

	            // Once the node has been removed then we perform one last pass, however the render function
	            // ensures the node is in the DOM before any reconciliation takes place, thus saving resources.
	            this.render(registry.get(this));
	        }

	        /**
	         * @method render
	         * @param {Object} instance
	         * @return {Object}
	         */
	        render(instance) {
	            const currentTree = instance.tree;
	            const currentRoot = instance.root;
	            const node = instance.node;

	            const rerender = () => this.render(registry.get(this));

	            const tree = render({ node, render: rerender });

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _humps = __webpack_require__(3);

	var _ramda = __webpack_require__(4);

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
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	module.exports = require("ramda");

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _ramda = __webpack_require__(4);

	var _axios = __webpack_require__(7);

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

	                attach(addedFiles).then(nodes => {

	                    // Remove any `null` values which means the content of the file was empty, and then append
	                    // them to the component's shadow boundary.
	                    nodes.filter(_ramda.identity).forEach(node => boundary.appendChild(node));
	                });

	                return addedFiles;
	            }

	            return [];
	        })();

	        return _extends({}, props, { files: addedFiles });
	    };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("axios");

/***/ },
/* 8 */
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

	    return _extends({}, props, { store: store.getState() });
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("virtual-dom");

/***/ }
/******/ ]);