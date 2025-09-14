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
    return {
        isStreaming,
        streamContent,
        startStream,
        updateStream,
        endStream
    };
}

exports.ChatBot = ChatBot;
exports.ThemeToggle = ThemeToggle;
exports.useChatBot = useChatBot;
exports.useContentstack = useContentstack;
exports.useLLMProvider = useLLMProvider;
exports.useStreaming = useStreaming;
//# sourceMappingURL=index.js.map
