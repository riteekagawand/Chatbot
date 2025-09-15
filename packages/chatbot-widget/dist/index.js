'use strict';

var require$$0 = require('react');
var axios = require('axios');

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production = {};

/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production;

function requireReactJsxRuntime_production () {
	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
	hasRequiredReactJsxRuntime_production = 1;
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
	  var key = null;
	  void 0 !== maybeKey && (key = "" + maybeKey);
	  void 0 !== config.key && (key = "" + config.key);
	  if ("key" in config) {
	    maybeKey = {};
	    for (var propName in config)
	      "key" !== propName && (maybeKey[propName] = config[propName]);
	  } else maybeKey = config;
	  config = maybeKey.ref;
	  return {
	    $$typeof: REACT_ELEMENT_TYPE,
	    type: type,
	    key: key,
	    ref: void 0 !== config ? config : null,
	    props: maybeKey
	  };
	}
	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_production.jsx = jsxProd;
	reactJsxRuntime_production.jsxs = jsxProd;
	return reactJsxRuntime_production;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;
	"production" !== process.env.NODE_ENV &&
	  (function () {
	    function getComponentNameFromType(type) {
	      if (null == type) return null;
	      if ("function" === typeof type)
	        return type.$$typeof === REACT_CLIENT_REFERENCE
	          ? null
	          : type.displayName || type.name || null;
	      if ("string" === typeof type) return type;
	      switch (type) {
	        case REACT_FRAGMENT_TYPE:
	          return "Fragment";
	        case REACT_PROFILER_TYPE:
	          return "Profiler";
	        case REACT_STRICT_MODE_TYPE:
	          return "StrictMode";
	        case REACT_SUSPENSE_TYPE:
	          return "Suspense";
	        case REACT_SUSPENSE_LIST_TYPE:
	          return "SuspenseList";
	        case REACT_ACTIVITY_TYPE:
	          return "Activity";
	      }
	      if ("object" === typeof type)
	        switch (
	          ("number" === typeof type.tag &&
	            console.error(
	              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
	            ),
	          type.$$typeof)
	        ) {
	          case REACT_PORTAL_TYPE:
	            return "Portal";
	          case REACT_CONTEXT_TYPE:
	            return (type.displayName || "Context") + ".Provider";
	          case REACT_CONSUMER_TYPE:
	            return (type._context.displayName || "Context") + ".Consumer";
	          case REACT_FORWARD_REF_TYPE:
	            var innerType = type.render;
	            type = type.displayName;
	            type ||
	              ((type = innerType.displayName || innerType.name || ""),
	              (type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef"));
	            return type;
	          case REACT_MEMO_TYPE:
	            return (
	              (innerType = type.displayName || null),
	              null !== innerType
	                ? innerType
	                : getComponentNameFromType(type.type) || "Memo"
	            );
	          case REACT_LAZY_TYPE:
	            innerType = type._payload;
	            type = type._init;
	            try {
	              return getComponentNameFromType(type(innerType));
	            } catch (x) {}
	        }
	      return null;
	    }
	    function testStringCoercion(value) {
	      return "" + value;
	    }
	    function checkKeyStringCoercion(value) {
	      try {
	        testStringCoercion(value);
	        var JSCompiler_inline_result = !1;
	      } catch (e) {
	        JSCompiler_inline_result = !0;
	      }
	      if (JSCompiler_inline_result) {
	        JSCompiler_inline_result = console;
	        var JSCompiler_temp_const = JSCompiler_inline_result.error;
	        var JSCompiler_inline_result$jscomp$0 =
	          ("function" === typeof Symbol &&
	            Symbol.toStringTag &&
	            value[Symbol.toStringTag]) ||
	          value.constructor.name ||
	          "Object";
	        JSCompiler_temp_const.call(
	          JSCompiler_inline_result,
	          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
	          JSCompiler_inline_result$jscomp$0
	        );
	        return testStringCoercion(value);
	      }
	    }
	    function getTaskName(type) {
	      if (type === REACT_FRAGMENT_TYPE) return "<>";
	      if (
	        "object" === typeof type &&
	        null !== type &&
	        type.$$typeof === REACT_LAZY_TYPE
	      )
	        return "<...>";
	      try {
	        var name = getComponentNameFromType(type);
	        return name ? "<" + name + ">" : "<...>";
	      } catch (x) {
	        return "<...>";
	      }
	    }
	    function getOwner() {
	      var dispatcher = ReactSharedInternals.A;
	      return null === dispatcher ? null : dispatcher.getOwner();
	    }
	    function UnknownOwner() {
	      return Error("react-stack-top-frame");
	    }
	    function hasValidKey(config) {
	      if (hasOwnProperty.call(config, "key")) {
	        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
	        if (getter && getter.isReactWarning) return !1;
	      }
	      return void 0 !== config.key;
	    }
	    function defineKeyPropWarningGetter(props, displayName) {
	      function warnAboutAccessingKey() {
	        specialPropKeyWarningShown ||
	          ((specialPropKeyWarningShown = !0),
	          console.error(
	            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
	            displayName
	          ));
	      }
	      warnAboutAccessingKey.isReactWarning = !0;
	      Object.defineProperty(props, "key", {
	        get: warnAboutAccessingKey,
	        configurable: !0
	      });
	    }
	    function elementRefGetterWithDeprecationWarning() {
	      var componentName = getComponentNameFromType(this.type);
	      didWarnAboutElementRef[componentName] ||
	        ((didWarnAboutElementRef[componentName] = !0),
	        console.error(
	          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
	        ));
	      componentName = this.props.ref;
	      return void 0 !== componentName ? componentName : null;
	    }
	    function ReactElement(
	      type,
	      key,
	      self,
	      source,
	      owner,
	      props,
	      debugStack,
	      debugTask
	    ) {
	      self = props.ref;
	      type = {
	        $$typeof: REACT_ELEMENT_TYPE,
	        type: type,
	        key: key,
	        props: props,
	        _owner: owner
	      };
	      null !== (void 0 !== self ? self : null)
	        ? Object.defineProperty(type, "ref", {
	            enumerable: !1,
	            get: elementRefGetterWithDeprecationWarning
	          })
	        : Object.defineProperty(type, "ref", { enumerable: !1, value: null });
	      type._store = {};
	      Object.defineProperty(type._store, "validated", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: 0
	      });
	      Object.defineProperty(type, "_debugInfo", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: null
	      });
	      Object.defineProperty(type, "_debugStack", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugStack
	      });
	      Object.defineProperty(type, "_debugTask", {
	        configurable: !1,
	        enumerable: !1,
	        writable: !0,
	        value: debugTask
	      });
	      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
	      return type;
	    }
	    function jsxDEVImpl(
	      type,
	      config,
	      maybeKey,
	      isStaticChildren,
	      source,
	      self,
	      debugStack,
	      debugTask
	    ) {
	      var children = config.children;
	      if (void 0 !== children)
	        if (isStaticChildren)
	          if (isArrayImpl(children)) {
	            for (
	              isStaticChildren = 0;
	              isStaticChildren < children.length;
	              isStaticChildren++
	            )
	              validateChildKeys(children[isStaticChildren]);
	            Object.freeze && Object.freeze(children);
	          } else
	            console.error(
	              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
	            );
	        else validateChildKeys(children);
	      if (hasOwnProperty.call(config, "key")) {
	        children = getComponentNameFromType(type);
	        var keys = Object.keys(config).filter(function (k) {
	          return "key" !== k;
	        });
	        isStaticChildren =
	          0 < keys.length
	            ? "{key: someKey, " + keys.join(": ..., ") + ": ...}"
	            : "{key: someKey}";
	        didWarnAboutKeySpread[children + isStaticChildren] ||
	          ((keys =
	            0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}"),
	          console.error(
	            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
	            isStaticChildren,
	            children,
	            keys,
	            children
	          ),
	          (didWarnAboutKeySpread[children + isStaticChildren] = !0));
	      }
	      children = null;
	      void 0 !== maybeKey &&
	        (checkKeyStringCoercion(maybeKey), (children = "" + maybeKey));
	      hasValidKey(config) &&
	        (checkKeyStringCoercion(config.key), (children = "" + config.key));
	      if ("key" in config) {
	        maybeKey = {};
	        for (var propName in config)
	          "key" !== propName && (maybeKey[propName] = config[propName]);
	      } else maybeKey = config;
	      children &&
	        defineKeyPropWarningGetter(
	          maybeKey,
	          "function" === typeof type
	            ? type.displayName || type.name || "Unknown"
	            : type
	        );
	      return ReactElement(
	        type,
	        children,
	        self,
	        source,
	        getOwner(),
	        maybeKey,
	        debugStack,
	        debugTask
	      );
	    }
	    function validateChildKeys(node) {
	      "object" === typeof node &&
	        null !== node &&
	        node.$$typeof === REACT_ELEMENT_TYPE &&
	        node._store &&
	        (node._store.validated = 1);
	    }
	    var React = require$$0,
	      REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
	      REACT_PORTAL_TYPE = Symbol.for("react.portal"),
	      REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
	      REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
	      REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
	      REACT_CONTEXT_TYPE = Symbol.for("react.context"),
	      REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
	      REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
	      REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
	      REACT_MEMO_TYPE = Symbol.for("react.memo"),
	      REACT_LAZY_TYPE = Symbol.for("react.lazy"),
	      REACT_ACTIVITY_TYPE = Symbol.for("react.activity"),
	      REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
	      ReactSharedInternals =
	        React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      isArrayImpl = Array.isArray,
	      createTask = console.createTask
	        ? console.createTask
	        : function () {
	            return null;
	          };
	    React = {
	      "react-stack-bottom-frame": function (callStackForError) {
	        return callStackForError();
	      }
	    };
	    var specialPropKeyWarningShown;
	    var didWarnAboutElementRef = {};
	    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
	      React,
	      UnknownOwner
	    )();
	    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
	    var didWarnAboutKeySpread = {};
	    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	    reactJsxRuntime_development.jsx = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !1,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	    reactJsxRuntime_development.jsxs = function (type, config, maybeKey, source, self) {
	      var trackActualOwner =
	        1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
	      return jsxDEVImpl(
	        type,
	        config,
	        maybeKey,
	        !0,
	        source,
	        self,
	        trackActualOwner
	          ? Error("react-stack-top-frame")
	          : unknownOwnerDebugStack,
	        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
	      );
	    };
	  })();
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

var ContentstackService = /** @class */ (function () {
    function ContentstackService(apiKey, deliveryToken, environment, region) {
        if (region === void 0) { region = 'eu'; }
        this.apiKey = apiKey;
        this.deliveryToken = deliveryToken;
        this.environment = environment;
        this.baseUrl = "https://".concat(region, "-cdn.contentstack.com/v3");
    }
    ContentstackService.prototype.fetchContentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios.get("".concat(this.baseUrl, "/content_types"), {
                                params: { environment: this.environment },
                                headers: {
                                    'api_key': this.apiKey,
                                    'access_token': this.deliveryToken,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response.data.content_types) === null || _a === void 0 ? void 0 : _a.map(function (ct) { return ct.uid; })) || []];
                    case 2:
                        error_1 = _b.sent();
                        console.error('Error fetching content types:', error_1);
                        return [2 /*return*/, ['tour', 'faqs']]; // Fallback
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContentstackService.prototype.fetchEntries = function (contentType, query) {
        return __awaiter(this, void 0, void 0, function () {
            var url, params, searchQuery, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        url = "".concat(this.baseUrl, "/content_types/").concat(contentType, "/entries");
                        params = {
                            environment: this.environment,
                            limit: 10
                        };
                        if (query) {
                            searchQuery = JSON.stringify({
                                "$or": [
                                    { "title": { "$regex": query, "$options": "i" } },
                                    { "question": { "$regex": query, "$options": "i" } },
                                    { "description": { "$regex": query, "$options": "i" } },
                                    { "answers": { "$regex": query, "$options": "i" } },
                                    { "answer": { "$regex": query, "$options": "i" } }
                                ]
                            });
                            params.query = searchQuery;
                        }
                        return [4 /*yield*/, axios.get(url, {
                                params: params,
                                headers: {
                                    'api_key': this.apiKey,
                                    'access_token': this.deliveryToken,
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.entries || []];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error fetching ".concat(contentType, " entries:"), error_2);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ContentstackService.prototype.searchContent = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var lowerMessage, _a, tours, faqs, relevantTours, relevantFaqs;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        lowerMessage = message.toLowerCase();
                        return [4 /*yield*/, Promise.all([
                                this.fetchEntries('tour'),
                                this.fetchEntries('faqs')
                            ])];
                    case 1:
                        _a = _b.sent(), tours = _a[0], faqs = _a[1];
                        relevantTours = tours.filter(function (tour) {
                            return lowerMessage.includes('tour') ||
                                lowerMessage.includes('travel') ||
                                lowerMessage.includes('destination') ||
                                lowerMessage.includes('country');
                        });
                        relevantFaqs = faqs.filter(function (faq) {
                            var _a, _b, _c;
                            var question = ((_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
                            var answer = ((_b = faq.answers) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || ((_c = faq.answer) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
                            return lowerMessage.includes('accommodation') && question.includes('accommodation') ||
                                lowerMessage.includes('hotel') && (question.includes('accommodation') || answer.includes('hotel')) ||
                                lowerMessage.includes('booking') && question.includes('book') ||
                                lowerMessage.includes('cancel') && question.includes('cancel') ||
                                lowerMessage.includes('payment') && question.includes('payment') ||
                                lowerMessage.includes('insurance') && question.includes('insurance') ||
                                lowerMessage.includes('flight') && question.includes('flight') ||
                                lowerMessage.includes('refund') && question.includes('refund');
                        });
                        return [2 /*return*/, { tours: relevantTours, faqs: relevantFaqs }];
                }
            });
        });
    };
    return ContentstackService;
}());

var ChatBot = function (_a) {
    _a.llmProvider; _a.llmApiKey; var contentstackApiKey = _a.contentstackApiKey, contentstackToken = _a.contentstackToken, contentstackEnvironment = _a.contentstackEnvironment, _c = _a.title, title = _c === void 0 ? 'Travel Assistant' : _c, _d = _a.placeholder, placeholder = _d === void 0 ? 'Ask me about tours and travel...' : _d, _e = _a.position, position = _e === void 0 ? 'bottom-right' : _e, _f = _a.theme, theme = _f === void 0 ? 'light' : _f, _g = _a.width, width = _g === void 0 ? 350 : _g, _h = _a.height, height = _h === void 0 ? 500 : _h;
    var _j = require$$0.useState({
        messages: [],
        isOpen: false,
        isLoading: false,
        isConnected: true
    }), state = _j[0], setState = _j[1];
    var messagesEndRef = require$$0.useRef(null);
    var inputRef = require$$0.useRef(null);
    var contentstackService = require$$0.useRef();
    require$$0.useEffect(function () {
        contentstackService.current = new ContentstackService(contentstackApiKey, contentstackToken, contentstackEnvironment);
    }, [contentstackApiKey, contentstackToken, contentstackEnvironment]);
    require$$0.useEffect(function () {
        scrollToBottom();
    }, [state.messages]);
    var scrollToBottom = function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    var addMessage = function (text, isUser) {
        var message = {
            id: Date.now().toString(),
            text: text,
            isUser: isUser,
            timestamp: new Date()
        };
        setState(function (prev) { return (__assign(__assign({}, prev), { messages: __spreadArray(__spreadArray([], prev.messages, true), [message], false) })); });
    };
    var generateResponse = function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, tours, faqs, lowerMessage, accommodationFaq, bookingFaq, cancelFaq, paymentFaq, insuranceFaq, flightFaq, refundFaq, tourList, faq, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!contentstackService.current) {
                        return [2 /*return*/, "I'm having trouble connecting to the content service. Please try again later."];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, contentstackService.current.searchContent(message)];
                case 2:
                    _a = _b.sent(), tours = _a.tours, faqs = _a.faqs;
                    lowerMessage = message.toLowerCase();
                    // Handle specific queries
                    if (lowerMessage.includes('how many tours') || lowerMessage.includes('tour count')) {
                        return [2 /*return*/, "We currently have ".concat(tours.length, " amazing tours available! Would you like to know more about any specific destination?")];
                    }
                    if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('provide')) {
                        accommodationFaq = faqs.find(function (faq) {
                            var _a, _b;
                            return ((_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('accommodation')) ||
                                ((_b = faq.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('accommodation'));
                        });
                        if (accommodationFaq) {
                            return [2 /*return*/, "**".concat(accommodationFaq.question || accommodationFaq.title, "**\n\n").concat(accommodationFaq.answers || accommodationFaq.answer, "\n\nDo you have any specific accommodation preferences?")];
                        }
                    }
                    if (lowerMessage.includes('booking') || lowerMessage.includes('book')) {
                        bookingFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('book'); });
                        if (bookingFaq) {
                            return [2 /*return*/, "**".concat(bookingFaq.question, "**\n\n").concat(bookingFaq.answers || bookingFaq.answer, "\n\nWould you like help with booking a specific tour?")];
                        }
                    }
                    if (lowerMessage.includes('cancel')) {
                        cancelFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('cancel'); });
                        if (cancelFaq) {
                            return [2 /*return*/, "**".concat(cancelFaq.question, "**\n\n").concat(cancelFaq.answers || cancelFaq.answer, "\n\nDo you need help with a specific cancellation?")];
                        }
                    }
                    if (lowerMessage.includes('payment')) {
                        paymentFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('payment'); });
                        if (paymentFaq) {
                            return [2 /*return*/, "**".concat(paymentFaq.question, "**\n\n").concat(paymentFaq.answers || paymentFaq.answer, "\n\nDo you have any other payment questions?")];
                        }
                    }
                    if (lowerMessage.includes('insurance')) {
                        insuranceFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('insurance'); });
                        if (insuranceFaq) {
                            return [2 /*return*/, "**".concat(insuranceFaq.question, "**\n\n").concat(insuranceFaq.answers || insuranceFaq.answer, "\n\nWould you like help finding travel insurance?")];
                        }
                    }
                    if (lowerMessage.includes('flight')) {
                        flightFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('flight'); });
                        if (flightFaq) {
                            return [2 /*return*/, "**".concat(flightFaq.question, "**\n\n").concat(flightFaq.answers || flightFaq.answer, "\n\nWould you like help with flight bookings?")];
                        }
                    }
                    if (lowerMessage.includes('refund')) {
                        refundFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('refund'); });
                        if (refundFaq) {
                            return [2 /*return*/, "**".concat(refundFaq.question, "**\n\n").concat(refundFaq.answers || refundFaq.answer, "\n\nDo you need help with a specific refund?")];
                        }
                    }
                    // General tour information
                    if (tours.length > 0) {
                        tourList = tours.slice(0, 3).map(function (tour) {
                            return "\u2022 **".concat(tour.title, "** - ").concat(tour.country, " (").concat(tour.duration, ", $").concat(tour.price, ")");
                        }).join('\n');
                        return [2 /*return*/, "Here are some of our amazing tours:\n\n".concat(tourList, "\n\nWould you like more details about any specific tour?")];
                    }
                    // General FAQ response
                    if (faqs.length > 0) {
                        faq = faqs[0];
                        return [2 /*return*/, "**".concat(faq.question || faq.title, "**\n\n").concat(faq.answers || faq.answer, "\n\nIs there anything else I can help you with?")];
                    }
                    return [2 /*return*/, "I understand you're asking about travel and tours. I can help you with information about our tours, booking, accommodation, and more. Could you be more specific? For example:\n\n• \"How many tours do you have?\"\n• \"Tell me about your tours\"\n• \"How do I book a tour?\"\n• \"What's your cancellation policy?\"\n\nWhat would you like to know?"];
                case 3:
                    error_1 = _b.sent();
                    console.error('Error generating response:', error_1);
                    return [2 /*return*/, "I'm having trouble connecting right now. Please try again later."];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var sendMessage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var input, message, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = inputRef.current;
                    if (!input || !input.value.trim() || state.isLoading)
                        return [2 /*return*/];
                    message = input.value.trim();
                    input.value = '';
                    addMessage(message, true);
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: true })); });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, generateResponse(message)];
                case 2:
                    response = _a.sent();
                    addMessage(response, false);
                    return [3 /*break*/, 5];
                case 3:
                    _a.sent();
                    addMessage("I'm having trouble connecting right now. Please try again later.", false);
                    return [3 /*break*/, 5];
                case 4:
                    setState(function (prev) { return (__assign(__assign({}, prev), { isLoading: false })); });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    var toggleChat = function () {
        setState(function (prev) { return (__assign(__assign({}, prev), { isOpen: !prev.isOpen })); });
    };
    var getPositionStyles = function () {
        var positions = {
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' }
        };
        return positions[position];
    };
    var themeStyles = {
        light: {
            backgroundColor: '#ffffff',
            textColor: '#333333',
            borderColor: '#e0e0e0',
            buttonColor: '#007bff',
            inputColor: '#f8f9fa'
        },
        dark: {
            backgroundColor: '#2d3748',
            textColor: '#ffffff',
            borderColor: '#4a5568',
            buttonColor: '#3182ce',
            inputColor: '#4a5568'
        }
    };
    var currentTheme = themeStyles[theme];
    return (jsxRuntimeExports.jsxs("div", { style: __assign({ position: 'fixed', zIndex: 1000 }, getPositionStyles()), children: [state.isOpen && (jsxRuntimeExports.jsxs("div", { style: {
                    width: "".concat(width, "px"),
                    height: "".concat(height, "px"),
                    backgroundColor: currentTheme.backgroundColor,
                    border: "1px solid ".concat(currentTheme.borderColor),
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                }, children: [jsxRuntimeExports.jsxs("div", { style: {
                            padding: '16px',
                            borderBottom: "1px solid ".concat(currentTheme.borderColor),
                            backgroundColor: currentTheme.buttonColor,
                            color: 'white',
                            borderRadius: '12px 12px 0 0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }, children: [jsxRuntimeExports.jsx("h3", { style: { margin: 0, fontSize: '16px', fontWeight: '600' }, children: title }), jsxRuntimeExports.jsx("button", { onClick: toggleChat, style: {
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    padding: '4px'
                                }, children: "\u00D7" })] }), jsxRuntimeExports.jsxs("div", { style: {
                            flex: 1,
                            overflowY: 'auto',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }, children: [state.messages.length === 0 && (jsxRuntimeExports.jsx("div", { style: { textAlign: 'center', color: currentTheme.textColor, opacity: 0.7 }, children: "\uD83D\uDC4B Hi! I'm your travel assistant. How can I help you today?" })), state.messages.map(function (message) { return (jsxRuntimeExports.jsx("div", { style: {
                                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%'
                                }, children: jsxRuntimeExports.jsx("div", { style: {
                                        backgroundColor: message.isUser ? currentTheme.buttonColor : currentTheme.inputColor,
                                        color: message.isUser ? 'white' : currentTheme.textColor,
                                        padding: '12px 16px',
                                        borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        fontSize: '14px',
                                        lineHeight: '1.4',
                                        whiteSpace: 'pre-wrap'
                                    }, children: message.text }) }, message.id)); }), state.isLoading && (jsxRuntimeExports.jsx("div", { style: { alignSelf: 'flex-start' }, children: jsxRuntimeExports.jsx("div", { style: {
                                        backgroundColor: currentTheme.inputColor,
                                        color: currentTheme.textColor,
                                        padding: '12px 16px',
                                        borderRadius: '18px 18px 18px 4px',
                                        fontSize: '14px'
                                    }, children: jsxRuntimeExports.jsx("span", { children: "\uD83D\uDCAD Thinking..." }) }) })), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), jsxRuntimeExports.jsxs("div", { style: {
                            padding: '16px',
                            borderTop: "1px solid ".concat(currentTheme.borderColor),
                            display: 'flex',
                            gap: '8px'
                        }, children: [jsxRuntimeExports.jsx("input", { ref: inputRef, type: "text", placeholder: placeholder, onKeyPress: handleKeyPress, disabled: state.isLoading, style: {
                                    flex: 1,
                                    padding: '12px 16px',
                                    border: "1px solid ".concat(currentTheme.borderColor),
                                    borderRadius: '24px',
                                    fontSize: '14px',
                                    backgroundColor: currentTheme.inputColor,
                                    color: currentTheme.textColor,
                                    outline: 'none'
                                } }), jsxRuntimeExports.jsx("button", { onClick: sendMessage, disabled: state.isLoading, style: {
                                    padding: '12px 16px',
                                    backgroundColor: currentTheme.buttonColor,
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '24px',
                                    cursor: state.isLoading ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    opacity: state.isLoading ? 0.6 : 1
                                }, children: "Send" })] })] })), !state.isOpen && (jsxRuntimeExports.jsx("button", { onClick: toggleChat, style: {
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: currentTheme.buttonColor,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }, children: "\uD83D\uDCAC" }))] }));
};

exports.ChatBot = ChatBot;
exports.ContentstackService = ContentstackService;
//# sourceMappingURL=index.js.map
