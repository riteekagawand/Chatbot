'use strict';

var require$$0 = require('react');

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

function useChatBot(props) {
    const [state, setState] = require$$0.useState({
        messages: [],
        isLoading: false,
        error: null
    });
    // Conversation context for better responses
    const getConversationContext = require$$0.useCallback(() => {
        const recentMessages = state.messages.slice(-6); // Last 6 messages for context
        return recentMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    }, [state.messages]);
    const sendMessage = require$$0.useCallback(async (content) => {
        if (!props.llmProvider || !props.llmApiKey) {
            setState(prev => (Object.assign(Object.assign({}, prev), { error: 'LLM provider or API key not configured' })));
            return;
        }
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date()
        };
        setState(prev => (Object.assign(Object.assign({}, prev), { messages: [...prev.messages, userMessage], isLoading: true, error: null })));
        try {
            // Make API call to the chat endpoint
            const apiResponse = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    llmProvider: props.llmProvider,
                    llmApiKey: props.llmApiKey,
                    llmModel: props.llmModel,
                    enableStreaming: props.enableStreaming,
                    contentstackApiKey: props.contentstackApiKey,
                    contentstackToken: props.contentstackToken,
                    contentstackEnvironment: props.contentstackEnvironment,
                    contentTypes: props.contentTypes,
                    conversationContext: getConversationContext()
                }),
            });
            if (!apiResponse.ok) {
                const errorData = await apiResponse.json().catch(() => ({}));
                // Handle specific error types
                if (errorData.type === 'RATE_LIMIT') {
                    throw new Error(`Rate limit exceeded. Please wait ${errorData.retryAfter || 60} seconds before trying again.`);
                }
                if (errorData.type === 'AUTH_ERROR') {
                    throw new Error('Invalid API credentials. Please check your API key and try again.');
                }
                if (errorData.type === 'CONTENT_ERROR') {
                    throw new Error('Content service temporarily unavailable. Please try again later.');
                }
                if (errorData.type === 'TIMEOUT_ERROR') {
                    throw new Error('Request timeout. Please try again.');
                }
                throw new Error(errorData.error || `HTTP error! status: ${apiResponse.status}`);
            }
            const data = await apiResponse.json();
            const response = data.content;
            const assistantMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };
            setState(prev => (Object.assign(Object.assign({}, prev), { messages: [...prev.messages, assistantMessage], isLoading: false })));
        }
        catch (error) {
            setState(prev => (Object.assign(Object.assign({}, prev), { isLoading: false, error: error instanceof Error ? error.message : 'Failed to send message' })));
        }
    }, [props.llmProvider, props.llmApiKey, props.llmModel, props.enableStreaming]);
    const clearMessages = require$$0.useCallback(() => {
        setState(prev => (Object.assign(Object.assign({}, prev), { messages: [] })));
    }, []);
    const clearError = require$$0.useCallback(() => {
        setState(prev => (Object.assign(Object.assign({}, prev), { error: null })));
    }, []);
    return Object.assign(Object.assign({}, state), { sendMessage,
        clearMessages,
        clearError });
}

function ChatBot(props) {
    const [input, setInput] = require$$0.useState('');
    const messagesEndRef = require$$0.useRef(null);
    const { messages, isLoading, error, sendMessage, clearMessages, clearError } = useChatBot(props);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    require$$0.useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading)
            return;
        const message = input.trim();
        setInput('');
        await sendMessage(message);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const positionClasses = {
        'bottom-right': 'fixed bottom-4 right-4',
        'bottom-left': 'fixed bottom-4 left-4',
        'top-right': 'fixed top-4 right-4',
        'top-left': 'fixed top-4 left-4',
    };
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    return (jsxRuntimeExports.jsxs("div", { className: `${positionClasses[props.position || 'bottom-right']} w-80 h-96 flex flex-col rounded-lg shadow-lg border ${themeClasses[props.theme || 'auto']}`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center", children: jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-bold", children: "\uD83E\uDD16" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: "Chat Bot" }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Powered by AI" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("button", { onClick: clearMessages, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Clear conversation", children: "Clear" }), jsxRuntimeExports.jsx("button", { onClick: () => { }, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Minimize", children: "\u2212" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500 dark:text-gray-400", children: [jsxRuntimeExports.jsx("p", { children: "Start a conversation!" }), jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Ask me anything..." })] })), messages.map((message) => (jsxRuntimeExports.jsx("div", { className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, children: jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`, children: [jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`, children: message.role === 'user' ? '👤' : '🤖' }), jsxRuntimeExports.jsxs("div", { className: `px-3 py-2 rounded-lg ${message.role === 'user'
                                        ? 'bg-blue-500 text-white rounded-br-sm'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'}`, children: [jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: message.content }), jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] })] }) }, message.id))), isLoading && (jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: jsxRuntimeExports.jsx("div", { className: "bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2", children: jsxRuntimeExports.jsxs("div", { className: "flex space-x-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), error && (jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [jsxRuntimeExports.jsx("span", { children: error }), jsxRuntimeExports.jsx("button", { onClick: clearError, className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }) })), jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t border-gray-200 dark:border-gray-600", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: props.placeholder || "Type your message...", disabled: isLoading, className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !input.trim() || isLoading, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed", children: "Send" })] }) })] }));
}

function EnhancedChatBot(props) {
    const [input, setInput] = require$$0.useState('');
    const [isMinimized, setIsMinimized] = require$$0.useState(props.isMinimized || false);
    require$$0.useState(false);
    const [copiedMessageId, setCopiedMessageId] = require$$0.useState(null);
    const messagesEndRef = require$$0.useRef(null);
    const inputRef = require$$0.useRef(null);
    const { messages, isLoading, error, sendMessage, clearMessages, clearError } = useChatBot(props);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    require$$0.useEffect(() => {
        scrollToBottom();
    }, [messages]);
    require$$0.useEffect(() => {
        if (!isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isMinimized]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading)
            return;
        const message = input.trim();
        setInput('');
        await sendMessage(message);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    const handleMinimize = () => {
        var _a;
        setIsMinimized(true);
        (_a = props.onMinimize) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const handleMaximize = () => {
        var _a;
        setIsMinimized(false);
        (_a = props.onMaximize) === null || _a === void 0 ? void 0 : _a.call(props);
    };
    const copyToClipboard = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedMessageId(messageId);
            setTimeout(() => setCopiedMessageId(null), 2000);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    const exportConversation = () => {
        const conversation = messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
        const blob = new Blob([conversation], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chatbot-conversation-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    const positionClasses = {
        'bottom-right': 'fixed bottom-4 right-4',
        'bottom-left': 'fixed bottom-4 left-4',
        'top-right': 'fixed top-4 right-4',
        'top-left': 'fixed top-4 left-4',
    };
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    const maxHeight = props.maxHeight || 'h-96';
    // Minimized state - just show a floating button
    if (isMinimized) {
        return (jsxRuntimeExports.jsx("div", { className: `${positionClasses[props.position || 'bottom-right']}`, children: jsxRuntimeExports.jsxs("button", { onClick: handleMaximize, className: "w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110", title: "Open chat", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "\uD83D\uDCAC" }), messages.length > 0 && (jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center", children: messages.length }))] }) }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: `${positionClasses[props.position || 'bottom-right']} w-80 ${maxHeight} flex flex-col rounded-lg shadow-lg border ${themeClasses[props.theme || 'auto']}`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center", children: jsxRuntimeExports.jsx("span", { className: "text-white text-sm font-bold", children: "\uD83E\uDD16" }) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: props.title || 'Chat Bot' }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: isLoading ? 'Typing...' : 'Powered by AI' })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [props.enableExport && messages.length > 0 && (jsxRuntimeExports.jsx("button", { onClick: exportConversation, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Export conversation", children: "\uD83D\uDCE5" })), jsxRuntimeExports.jsx("button", { onClick: clearMessages, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Clear conversation", children: "\uD83D\uDDD1\uFE0F" }), jsxRuntimeExports.jsx("button", { onClick: handleMinimize, className: "text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700", title: "Minimize", children: "\u2796" })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [messages.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center text-gray-500 dark:text-gray-400", children: [jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDC4B" }), jsxRuntimeExports.jsx("p", { className: "font-medium", children: props.customWelcomeMessage || 'Welcome!' }), jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: "Ask me anything..." })] })), messages.map((message) => (jsxRuntimeExports.jsx("div", { className: `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, children: jsxRuntimeExports.jsxs("div", { className: `flex items-start gap-2 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`, children: [jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-full flex items-center justify-center text-xs ${message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`, children: message.role === 'user' ? '👤' : '🤖' }), jsxRuntimeExports.jsxs("div", { className: "group relative", children: [jsxRuntimeExports.jsxs("div", { className: `px-3 py-2 rounded-lg ${message.role === 'user'
                                                ? 'bg-blue-500 text-white rounded-br-sm'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'}`, children: [jsxRuntimeExports.jsx("div", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: props.enableMarkdown ? (jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: {
                                                            __html: message.content.replace(/\n/g, '<br>')
                                                        } })) : (message.content) }), props.showTimestamp && (jsxRuntimeExports.jsx("p", { className: "text-xs opacity-70 mt-1", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }))] }), props.enableCopy && (jsxRuntimeExports.jsx("button", { onClick: () => copyToClipboard(message.content, message.id), className: `absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity ${message.role === 'user'
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`, title: "Copy message", children: copiedMessageId === message.id ? '✓' : '📋' }))] })] }) }, message.id))), isLoading && props.showTypingIndicator && (jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: jsxRuntimeExports.jsx("div", { className: "bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2", children: jsxRuntimeExports.jsxs("div", { className: "flex space-x-1", children: [jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.1s' } }), jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce", style: { animationDelay: '0.2s' } })] }) }) })), jsxRuntimeExports.jsx("div", { ref: messagesEndRef })] }), error && (jsxRuntimeExports.jsx("div", { className: "px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm", children: jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [jsxRuntimeExports.jsx("span", { children: error }), jsxRuntimeExports.jsx("button", { onClick: clearError, className: "text-red-500 hover:text-red-700", children: "\u00D7" })] }) })), jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, className: "p-4 border-t border-gray-200 dark:border-gray-600", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [jsxRuntimeExports.jsx("input", { ref: inputRef, type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyPress: handleKeyPress, placeholder: props.placeholder || "Type your message...", disabled: isLoading, className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white" }), jsxRuntimeExports.jsx("button", { type: "submit", disabled: !input.trim() || isLoading, className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: isLoading ? '⏳' : '📤' })] }) })] }));
}

const providerInfo = {
    openai: {
        name: 'OpenAI',
        description: 'GPT-3.5, GPT-4, and other OpenAI models',
        icon: '🤖',
        models: ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'],
        defaultModel: 'gpt-3.5-turbo'
    },
    groq: {
        name: 'Groq',
        description: 'Fast inference with Llama models',
        icon: '⚡',
        models: ['llama3-8b-8192', 'llama3-70b-8192', 'mixtral-8x7b-32768'],
        defaultModel: 'llama3-8b-8192'
    },
    anthropic: {
        name: 'Anthropic',
        description: 'Claude models for advanced reasoning',
        icon: '🧠',
        models: ['claude-3-haiku-20240307', 'claude-3-sonnet-20240229', 'claude-3-opus-20240229'],
        defaultModel: 'claude-3-haiku-20240307'
    },
    perplexity: {
        name: 'Perplexity',
        description: 'Real-time web search capabilities',
        icon: '🔍',
        models: ['llama-3.1-sonar-small-128k-online', 'llama-3.1-sonar-large-128k-online'],
        defaultModel: 'llama-3.1-sonar-small-128k-online'
    }
};
function LLMProviderSelector({ selectedProvider, onProviderChange, onConfigChange, config, className = '', theme = 'auto' }) {
    const [isOpen, setIsOpen] = require$$0.useState(false);
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    const handleProviderSelect = (provider) => {
        const providerData = providerInfo[provider];
        onProviderChange(provider);
        onConfigChange(Object.assign(Object.assign({}, config), { model: providerData.defaultModel }));
        setIsOpen(false);
    };
    const handleModelChange = (model) => {
        onConfigChange(Object.assign(Object.assign({}, config), { model }));
    };
    const handleApiKeyChange = (apiKey) => {
        onConfigChange(Object.assign(Object.assign({}, config), { apiKey }));
    };
    const selectedProviderData = providerInfo[selectedProvider];
    return (jsxRuntimeExports.jsx("div", { className: `relative ${className}`, children: jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "LLM Provider" }), jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: `w-full px-4 py-3 border rounded-lg flex items-center justify-between ${themeClasses[theme]} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-xl", children: selectedProviderData.icon }), jsxRuntimeExports.jsxs("div", { className: "text-left", children: [jsxRuntimeExports.jsx("div", { className: "font-medium", children: selectedProviderData.name }), jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: selectedProviderData.description })] })] }), jsxRuntimeExports.jsx("svg", { className: `w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isOpen && (jsxRuntimeExports.jsx("div", { className: `absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-10 ${themeClasses[theme]}`, children: Object.entries(providerInfo).map(([key, provider]) => (jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleProviderSelect(key), className: `w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${selectedProvider === key ? 'bg-blue-50 dark:bg-blue-900' : ''}`, children: jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [jsxRuntimeExports.jsx("span", { className: "text-xl", children: provider.icon }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("div", { className: "font-medium", children: provider.name }), jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: provider.description })] })] }) }, key))) }))] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Model" }), jsxRuntimeExports.jsx("select", { value: config.model || selectedProviderData.defaultModel, onChange: (e) => handleModelChange(e.target.value), className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: selectedProviderData.models.map((model) => (jsxRuntimeExports.jsx("option", { value: model, children: model }, model))) })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-2", children: ["API Key", jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "password", value: config.apiKey || '', onChange: (e) => handleApiKeyChange(e.target.value), placeholder: `Enter your ${selectedProviderData.name} API key`, className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Your API key is stored locally and never shared" })] }), jsxRuntimeExports.jsxs("details", { className: "group", children: [jsxRuntimeExports.jsx("summary", { className: "cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white", children: "Advanced Settings" }), jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3 pl-4 border-l-2 border-gray-200 dark:border-gray-600", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Temperature" }), jsxRuntimeExports.jsx("input", { type: "range", min: "0", max: "2", step: "0.1", value: config.temperature || 0.7, onChange: (e) => onConfigChange(Object.assign(Object.assign({}, config), { temperature: parseFloat(e.target.value) })), className: "w-full" }), jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1", children: [jsxRuntimeExports.jsx("span", { children: "Focused (0)" }), jsxRuntimeExports.jsx("span", { children: "Balanced (1)" }), jsxRuntimeExports.jsx("span", { children: "Creative (2)" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Max Tokens" }), jsxRuntimeExports.jsx("input", { type: "number", min: "100", max: "4000", value: config.maxTokens || 1000, onChange: (e) => onConfigChange(Object.assign(Object.assign({}, config), { maxTokens: parseInt(e.target.value) })), className: `w-full px-3 py-2 border rounded ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] })] })] })] }) }));
}

function ConfigForm({ onConfigSubmit, initialConfig, className = '', theme = 'auto' }) {
    var _a;
    const [llmProvider, setLlmProvider] = require$$0.useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.llm.provider) || 'openai');
    const [llmConfig, setLlmConfig] = require$$0.useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.llm.config) || {
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1000
    });
    const [contentstackConfig, setContentstackConfig] = require$$0.useState((initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.contentstack) || {
        apiKey: '',
        deliveryToken: '',
        environment: 'development',
        contentTypes: ['tour', 'faqs']
    });
    const [isContentstackEnabled, setIsContentstackEnabled] = require$$0.useState(!!((_a = initialConfig === null || initialConfig === void 0 ? void 0 : initialConfig.contentstack) === null || _a === void 0 ? void 0 : _a.apiKey));
    const themeClasses = {
        light: 'bg-white text-gray-900 border-gray-200',
        dark: 'bg-gray-800 text-white border-gray-600',
        auto: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600'
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            llm: {
                provider: llmProvider,
                config: llmConfig
            },
            contentstack: isContentstackEnabled ? contentstackConfig : undefined
        };
        onConfigSubmit(config);
    };
    const handleContentstackChange = (field, value) => {
        setContentstackConfig(prev => (Object.assign(Object.assign({}, prev), { [field]: value })));
    };
    return (jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: `space-y-6 ${className}`, children: [jsxRuntimeExports.jsxs("div", { className: "text-center", children: [jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-2", children: "ChatBot Configuration" }), jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Configure your AI chatbot with LLM and content integration" })] }), jsxRuntimeExports.jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "\uD83E\uDD16" }), "LLM Configuration"] }), jsxRuntimeExports.jsx(LLMProviderSelector, { selectedProvider: llmProvider, onProviderChange: setLlmProvider, onConfigChange: setLlmConfig, config: llmConfig, theme: theme })] }), jsxRuntimeExports.jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "\uD83D\uDCDA" }), "Content Integration"] }), jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isContentstackEnabled, onChange: (e) => setIsContentstackEnabled(e.target.checked), className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Enable Content Integration" })] })] }), isContentstackEnabled && (jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Contentstack API Key", jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "text", value: contentstackConfig.apiKey, onChange: (e) => handleContentstackChange('apiKey', e.target.value), placeholder: "blt...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsxs("label", { className: "block text-sm font-medium mb-2", children: ["Delivery Token", jsxRuntimeExports.jsx("span", { className: "text-red-500 ml-1", children: "*" })] }), jsxRuntimeExports.jsx("input", { type: "password", value: contentstackConfig.deliveryToken, onChange: (e) => handleContentstackChange('deliveryToken', e.target.value), placeholder: "cs...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500` })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Environment" }), jsxRuntimeExports.jsxs("select", { value: contentstackConfig.environment, onChange: (e) => handleContentstackChange('environment', e.target.value), className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [jsxRuntimeExports.jsx("option", { value: "development", children: "Development" }), jsxRuntimeExports.jsx("option", { value: "staging", children: "Staging" }), jsxRuntimeExports.jsx("option", { value: "production", children: "Production" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Content Types" }), jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ['tour', 'faqs', 'blog', 'product', 'article'].map((type) => {
                                            var _a;
                                            return (jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", checked: ((_a = contentstackConfig.contentTypes) === null || _a === void 0 ? void 0 : _a.includes(type)) || false, onChange: (e) => {
                                                            const currentTypes = contentstackConfig.contentTypes || [];
                                                            const newTypes = e.target.checked
                                                                ? [...currentTypes, type]
                                                                : currentTypes.filter((t) => t !== type);
                                                            handleContentstackChange('contentTypes', newTypes);
                                                        }, className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" }), jsxRuntimeExports.jsx("span", { className: "text-sm capitalize", children: type })] }, type));
                                        }) })] })] }))] }), jsxRuntimeExports.jsxs("div", { className: `p-6 border rounded-lg ${themeClasses[theme]}`, children: [jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "\u2699\uFE0F" }), "ChatBot Settings"] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Position" }), jsxRuntimeExports.jsxs("select", { className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [jsxRuntimeExports.jsx("option", { value: "bottom-right", children: "Bottom Right" }), jsxRuntimeExports.jsx("option", { value: "bottom-left", children: "Bottom Left" }), jsxRuntimeExports.jsx("option", { value: "top-right", children: "Top Right" }), jsxRuntimeExports.jsx("option", { value: "top-left", children: "Top Left" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Theme" }), jsxRuntimeExports.jsxs("select", { className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, children: [jsxRuntimeExports.jsx("option", { value: "auto", children: "Auto (System)" }), jsxRuntimeExports.jsx("option", { value: "light", children: "Light" }), jsxRuntimeExports.jsx("option", { value: "dark", children: "Dark" })] })] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Welcome Message" }), jsxRuntimeExports.jsx("textarea", { placeholder: "Enter a custom welcome message...", className: `w-full px-4 py-3 border rounded-lg ${themeClasses[theme]} focus:outline-none focus:ring-2 focus:ring-blue-500`, rows: 3 })] })] }), jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: jsxRuntimeExports.jsx("button", { type: "submit", className: "px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium", children: "Save Configuration" }) })] }));
}

function ThemeToggle() {
    const [dark, setDark] = require$$0.useState(false);
    require$$0.useEffect(() => {
        if (localStorage.theme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);
    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.theme = "light";
            setDark(false);
        }
        else {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            setDark(true);
        }
    };
    return (jsxRuntimeExports.jsx("button", { onClick: toggleTheme, className: "ml-4 px-4 py-2 rounded-lg bg-gray-200 text-black dark:bg-gray-800 dark:text-white", children: dark ? "☀️ Light" : "🌙 Dark" }));
}

const themes = {
    light: {
        name: 'Light',
        colors: {
            primary: '#3B82F6',
            secondary: '#6B7280',
            background: '#FFFFFF',
            surface: '#F9FAFB',
            text: '#111827',
            textSecondary: '#6B7280',
            border: '#E5E7EB',
            success: '#10B981',
            warning: '#F59E0B',
            error: '#EF4444',
            info: '#3B82F6',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        typography: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
    },
    dark: {
        name: 'Dark',
        colors: {
            primary: '#60A5FA',
            secondary: '#9CA3AF',
            background: '#111827',
            surface: '#1F2937',
            text: '#F9FAFB',
            textSecondary: '#D1D5DB',
            border: '#374151',
            success: '#34D399',
            warning: '#FBBF24',
            error: '#F87171',
            info: '#60A5FA',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        },
        typography: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
    },
    blue: {
        name: 'Blue',
        colors: {
            primary: '#1E40AF',
            secondary: '#3B82F6',
            background: '#EFF6FF',
            surface: '#DBEAFE',
            text: '#1E3A8A',
            textSecondary: '#1D4ED8',
            border: '#93C5FD',
            success: '#059669',
            warning: '#D97706',
            error: '#DC2626',
            info: '#0284C7',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(30, 64, 175, 0.1)',
            md: '0 4px 6px -1px rgba(30, 64, 175, 0.2), 0 2px 4px -1px rgba(30, 64, 175, 0.1)',
            lg: '0 10px 15px -3px rgba(30, 64, 175, 0.2), 0 4px 6px -2px rgba(30, 64, 175, 0.1)',
        },
        typography: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
    },
    green: {
        name: 'Green',
        colors: {
            primary: '#059669',
            secondary: '#10B981',
            background: '#ECFDF5',
            surface: '#D1FAE5',
            text: '#064E3B',
            textSecondary: '#047857',
            border: '#86EFAC',
            success: '#059669',
            warning: '#D97706',
            error: '#DC2626',
            info: '#0284C7',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(5, 150, 105, 0.1)',
            md: '0 4px 6px -1px rgba(5, 150, 105, 0.2), 0 2px 4px -1px rgba(5, 150, 105, 0.1)',
            lg: '0 10px 15px -3px rgba(5, 150, 105, 0.2), 0 4px 6px -2px rgba(5, 150, 105, 0.1)',
        },
        typography: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
    },
    purple: {
        name: 'Purple',
        colors: {
            primary: '#7C3AED',
            secondary: '#8B5CF6',
            background: '#FAF5FF',
            surface: '#EDE9FE',
            text: '#581C87',
            textSecondary: '#6D28D9',
            border: '#C4B5FD',
            success: '#059669',
            warning: '#D97706',
            error: '#DC2626',
            info: '#0284C7',
        },
        spacing: {
            xs: '0.25rem',
            sm: '0.5rem',
            md: '1rem',
            lg: '1.5rem',
            xl: '2rem',
        },
        borderRadius: {
            sm: '0.25rem',
            md: '0.5rem',
            lg: '0.75rem',
            full: '9999px',
        },
        shadows: {
            sm: '0 1px 2px 0 rgba(124, 58, 237, 0.1)',
            md: '0 4px 6px -1px rgba(124, 58, 237, 0.2), 0 2px 4px -1px rgba(124, 58, 237, 0.1)',
            lg: '0 10px 15px -3px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.1)',
        },
        typography: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
            },
            fontWeight: {
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
            },
        },
    },
};
function getTheme(themeName) {
    return themes[themeName] || themes.light;
}
function applyTheme(theme) {
    return `
    --chatbot-primary: ${theme.colors.primary};
    --chatbot-secondary: ${theme.colors.secondary};
    --chatbot-background: ${theme.colors.background};
    --chatbot-surface: ${theme.colors.surface};
    --chatbot-text: ${theme.colors.text};
    --chatbot-text-secondary: ${theme.colors.textSecondary};
    --chatbot-border: ${theme.colors.border};
    --chatbot-success: ${theme.colors.success};
    --chatbot-warning: ${theme.colors.warning};
    --chatbot-error: ${theme.colors.error};
    --chatbot-info: ${theme.colors.info};
    --chatbot-spacing-xs: ${theme.spacing.xs};
    --chatbot-spacing-sm: ${theme.spacing.sm};
    --chatbot-spacing-md: ${theme.spacing.md};
    --chatbot-spacing-lg: ${theme.spacing.lg};
    --chatbot-spacing-xl: ${theme.spacing.xl};
    --chatbot-radius-sm: ${theme.borderRadius.sm};
    --chatbot-radius-md: ${theme.borderRadius.md};
    --chatbot-radius-lg: ${theme.borderRadius.lg};
    --chatbot-radius-full: ${theme.borderRadius.full};
    --chatbot-shadow-sm: ${theme.shadows.sm};
    --chatbot-shadow-md: ${theme.shadows.md};
    --chatbot-shadow-lg: ${theme.shadows.lg};
    --chatbot-font-family: ${theme.typography.fontFamily};
    --chatbot-font-size-xs: ${theme.typography.fontSize.xs};
    --chatbot-font-size-sm: ${theme.typography.fontSize.sm};
    --chatbot-font-size-base: ${theme.typography.fontSize.base};
    --chatbot-font-size-lg: ${theme.typography.fontSize.lg};
    --chatbot-font-size-xl: ${theme.typography.fontSize.xl};
    --chatbot-font-size-2xl: ${theme.typography.fontSize['2xl']};
    --chatbot-font-weight-normal: ${theme.typography.fontWeight.normal};
    --chatbot-font-weight-medium: ${theme.typography.fontWeight.medium};
    --chatbot-font-weight-semibold: ${theme.typography.fontWeight.semibold};
    --chatbot-font-weight-bold: ${theme.typography.fontWeight.bold};
  `;
}

const ThemeContext = require$$0.createContext(undefined);
function ThemeProvider({ children, defaultTheme = 'light', storageKey = 'chatbot-theme', enableSystemTheme = true }) {
    const [themeName, setThemeName] = require$$0.useState(defaultTheme);
    const [mounted, setMounted] = require$$0.useState(false);
    // Get system theme preference
    const getSystemTheme = () => {
        if (typeof window !== 'undefined' && enableSystemTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return defaultTheme;
    };
    // Load theme from localStorage or system preference
    require$$0.useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey);
        const systemTheme = getSystemTheme();
        if (savedTheme && themes[savedTheme]) {
            setThemeName(savedTheme);
        }
        else if (enableSystemTheme) {
            setThemeName(systemTheme);
        }
        setMounted(true);
    }, [storageKey, enableSystemTheme, defaultTheme]);
    // Apply theme to document
    require$$0.useEffect(() => {
        if (mounted) {
            const theme = getTheme(themeName);
            const cssVariables = applyTheme(theme);
            // Apply CSS variables to document root
            const root = document.documentElement;
            root.style.cssText = cssVariables;
            // Add theme class to body for additional styling
            document.body.className = document.body.className
                .replace(/chatbot-theme-\w+/g, '')
                .trim();
            document.body.classList.add(`chatbot-theme-${themeName}`);
        }
    }, [themeName, mounted]);
    // Listen for system theme changes
    require$$0.useEffect(() => {
        if (!enableSystemTheme)
            return;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            const savedTheme = localStorage.getItem(storageKey);
            if (!savedTheme) {
                setThemeName(getSystemTheme());
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [storageKey, enableSystemTheme]);
    const setTheme = (newThemeName) => {
        if (themes[newThemeName]) {
            setThemeName(newThemeName);
            localStorage.setItem(storageKey, newThemeName);
        }
    };
    const currentTheme = getTheme(themeName);
    const availableThemes = Object.keys(themes);
    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return jsxRuntimeExports.jsx("div", { style: { visibility: 'hidden' }, children: children });
    }
    return (jsxRuntimeExports.jsx(ThemeContext.Provider, { value: {
            currentTheme,
            themeName,
            setTheme,
            availableThemes
        }, children: children }));
}
function useTheme() {
    const context = require$$0.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
function ThemeSelector({ className = '', showLabels = true }) {
    const { currentTheme, themeName, setTheme, availableThemes } = useTheme();
    return (jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [showLabels && (jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Theme:" })), jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: availableThemes.map((theme) => (jsxRuntimeExports.jsx("button", { onClick: () => setTheme(theme), className: `w-8 h-8 rounded-full border-2 transition-all ${themeName === theme
                        ? 'border-blue-500 scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`, style: {
                        backgroundColor: themes[theme].colors.primary,
                    }, title: themes[theme].name }, theme))) })] }));
}

function useLLMProvider() {
    const [provider, setProvider] = require$$0.useState('openai');
    const [config, setConfig] = require$$0.useState(null);
    const updateProvider = (newProvider) => {
        setProvider(newProvider);
    };
    const updateConfig = (newConfig) => {
        setConfig(newConfig);
    };
    return {
        provider,
        config,
        updateProvider,
        updateConfig
    };
}

function useContentstack() {
    const [config, setConfig] = require$$0.useState(null);
    const [isConnected, setIsConnected] = require$$0.useState(false);
    const connect = async (newConfig) => {
        // TODO: Implement Contentstack connection
        setConfig(newConfig);
        setIsConnected(true);
    };
    const disconnect = () => {
        setConfig(null);
        setIsConnected(false);
    };
    return {
        config,
        isConnected,
        connect,
        disconnect
    };
}

function useStreaming() {
    const [isStreaming, setIsStreaming] = require$$0.useState(false);
    const [streamContent, setStreamContent] = require$$0.useState('');
    const [streamingMessage, setStreamingMessage] = require$$0.useState(null);
    const abortControllerRef = require$$0.useRef(null);
    const startStream = require$$0.useCallback(() => {
        setIsStreaming(true);
        setStreamContent('');
    }, []);
    const updateStream = require$$0.useCallback((content) => {
        setStreamContent(content);
    }, []);
    const endStream = require$$0.useCallback(() => {
        setIsStreaming(false);
    }, []);
    const startStreaming = require$$0.useCallback(async (message, apiEndpoint, options = {}) => {
        var _a, _b, _c, _d, _e;
        // Cancel any existing stream
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        // Create new abort controller
        abortControllerRef.current = new AbortController();
        setIsStreaming(true);
        setStreamContent('');
        const streamingMessage = {
            id: Date.now().toString(),
            content: '',
            role: 'assistant',
            timestamp: new Date(),
            isStreaming: true
        };
        setStreamingMessage(streamingMessage);
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    stream: true // Request streaming response
                }),
                signal: abortControllerRef.current.signal
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
            if (!reader) {
                throw new Error('No response body');
            }
            const decoder = new TextDecoder();
            let buffer = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (line.trim() === '')
                        continue;
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            setIsStreaming(false);
                            const finalMessage = Object.assign(Object.assign({}, streamingMessage), { isStreaming: false });
                            setStreamingMessage(finalMessage);
                            (_b = options.onComplete) === null || _b === void 0 ? void 0 : _b.call(options, finalMessage);
                            return finalMessage;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.content) {
                                const newContent = streamingMessage.content + parsed.content;
                                const updatedMessage = Object.assign(Object.assign({}, streamingMessage), { content: newContent });
                                setStreamingMessage(updatedMessage);
                                setStreamContent(newContent);
                                (_c = options.onChunk) === null || _c === void 0 ? void 0 : _c.call(options, parsed.content);
                            }
                        }
                        catch (e) {
                            console.error('Error parsing streaming data:', e);
                        }
                    }
                }
            }
            // Complete the stream
            setIsStreaming(false);
            const finalMessage = Object.assign(Object.assign({}, streamingMessage), { isStreaming: false });
            setStreamingMessage(finalMessage);
            (_d = options.onComplete) === null || _d === void 0 ? void 0 : _d.call(options, finalMessage);
            return finalMessage;
        }
        catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                console.log('Streaming aborted');
            }
            else {
                console.error('Streaming error:', error);
                (_e = options.onError) === null || _e === void 0 ? void 0 : _e.call(options, error);
            }
            setIsStreaming(false);
            setStreamingMessage(null);
            throw error;
        }
    }, []);
    const stopStreaming = require$$0.useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsStreaming(false);
        setStreamingMessage(prev => prev ? Object.assign(Object.assign({}, prev), { isStreaming: false }) : null);
    }, []);
    const clearStreamingMessage = require$$0.useCallback(() => {
        setStreamingMessage(null);
        setStreamContent('');
    }, []);
    return {
        isStreaming,
        streamContent,
        streamingMessage,
        startStream,
        updateStream,
        endStream,
        startStreaming,
        stopStreaming,
        clearStreamingMessage
    };
}

exports.ChatBot = ChatBot;
exports.ConfigForm = ConfigForm;
exports.EnhancedChatBot = EnhancedChatBot;
exports.LLMProviderSelector = LLMProviderSelector;
exports.ThemeProvider = ThemeProvider;
exports.ThemeSelector = ThemeSelector;
exports.ThemeToggle = ThemeToggle;
exports.applyTheme = applyTheme;
exports.getTheme = getTheme;
exports.themes = themes;
exports.useChatBot = useChatBot;
exports.useContentstack = useContentstack;
exports.useLLMProvider = useLLMProvider;
exports.useStreaming = useStreaming;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
