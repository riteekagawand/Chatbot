'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var require$$0 = require('react');

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

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

var ContentstackService = /** @class */ (function () {
    function ContentstackService(config) {
        this.config = config;
        this.httpClient = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                'api_key': config.apiKey,
                'access_token': config.deliveryToken,
                'Content-Type': 'application/json'
            }
        });
    }
    ContentstackService.prototype.getBaseUrl = function () {
        if (this.config.baseUrl) {
            return this.config.baseUrl;
        }
        var regionUrls = {
            us: 'https://cdn.contentstack.io/v3',
            eu: 'https://eu-cdn.contentstack.io/v3',
            azure: 'https://azure-cdn.contentstack.io/v3'
        };
        return regionUrls[this.config.region || 'eu'];
    };
    ContentstackService.prototype.fetchContentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get('/content_types', {
                                params: { environment: this.config.environment }
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
            var params, searchQuery, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = {
                            environment: this.config.environment,
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
                        return [4 /*yield*/, this.httpClient.get("/content_types/".concat(contentType, "/entries"), { params: params })];
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
            var lowerMessage, _a, tours, faqs, relevantTours, relevantFaqs, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        lowerMessage = message.toLowerCase();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                this.fetchEntries('tour'),
                                this.fetchEntries('faqs')
                            ])];
                    case 2:
                        _a = _b.sent(), tours = _a[0], faqs = _a[1];
                        relevantTours = tours.filter(function (tour) {
                            return lowerMessage.includes('tour') ||
                                lowerMessage.includes('travel') ||
                                lowerMessage.includes('destination') ||
                                lowerMessage.includes('country') ||
                                lowerMessage.includes('package') ||
                                lowerMessage.includes('trip');
                        });
                        relevantFaqs = faqs.filter(function (faq) {
                            var _a, _b, _c, _d;
                            var question = ((_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
                            var answer = ((_b = faq.answers) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || ((_c = faq.answer) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '';
                            var title = ((_d = faq.title) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '';
                            return (
                            // Accommodation queries
                            (lowerMessage.includes('accommodation') && (question.includes('accommodation') || title.includes('accommodation'))) ||
                                (lowerMessage.includes('hotel') && (question.includes('accommodation') || answer.includes('hotel'))) ||
                                (lowerMessage.includes('provide') && question.includes('accommodation')) ||
                                // Booking queries
                                (lowerMessage.includes('booking') && question.includes('book')) ||
                                (lowerMessage.includes('book') && question.includes('book')) ||
                                // Cancellation queries
                                (lowerMessage.includes('cancel') && question.includes('cancel')) ||
                                (lowerMessage.includes('cancellation') && question.includes('cancel')) ||
                                // Payment queries
                                (lowerMessage.includes('payment') && question.includes('payment')) ||
                                (lowerMessage.includes('pay') && question.includes('payment')) ||
                                // Insurance queries
                                (lowerMessage.includes('insurance') && question.includes('insurance')) ||
                                // Flight queries
                                (lowerMessage.includes('flight') && question.includes('flight')) ||
                                (lowerMessage.includes('flights') && question.includes('flight')) ||
                                // Refund queries
                                (lowerMessage.includes('refund') && question.includes('refund')) ||
                                // General queries
                                (lowerMessage.includes('how') && (question.includes('how') || answer.includes('how'))) ||
                                (lowerMessage.includes('what') && (question.includes('what') || answer.includes('what'))) ||
                                (lowerMessage.includes('when') && (question.includes('when') || answer.includes('when'))));
                        });
                        return [2 /*return*/, { tours: relevantTours, faqs: relevantFaqs }];
                    case 3:
                        error_3 = _b.sent();
                        console.error('Error searching content:', error_3);
                        return [2 /*return*/, { tours: [], faqs: [] }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ContentstackService.prototype.updateConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
        this.httpClient = axios.create({
            baseURL: this.getBaseUrl(),
            headers: {
                'api_key': this.config.apiKey,
                'access_token': this.config.deliveryToken,
                'Content-Type': 'application/json'
            }
        });
    };
    return ContentstackService;
}());

var ResponseGenerator = /** @class */ (function () {
    function ResponseGenerator() {
    }
    ResponseGenerator.prototype.generateResponse = function (message, content) {
        var tours = content.tours, faqs = content.faqs;
        var lowerMessage = message.toLowerCase();
        // Handle specific queries
        if (lowerMessage.includes('how many tours') || lowerMessage.includes('tour count')) {
            return "We currently have ".concat(tours.length, " amazing tours available! Would you like to know more about any specific destination?");
        }
        if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('provide')) {
            var accommodationFaq = faqs.find(function (faq) {
                var _a, _b;
                return ((_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('accommodation')) ||
                    ((_b = faq.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('accommodation'));
            });
            if (accommodationFaq) {
                return "**".concat(accommodationFaq.question || accommodationFaq.title, "**\n\n").concat(accommodationFaq.answers || accommodationFaq.answer, "\n\nDo you have any specific accommodation preferences?");
            }
        }
        if (lowerMessage.includes('booking') || lowerMessage.includes('book')) {
            var bookingFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('book'); });
            if (bookingFaq) {
                return "**".concat(bookingFaq.question, "**\n\n").concat(bookingFaq.answers || bookingFaq.answer, "\n\nWould you like help with booking a specific tour?");
            }
        }
        if (lowerMessage.includes('cancel')) {
            var cancelFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('cancel'); });
            if (cancelFaq) {
                return "**".concat(cancelFaq.question, "**\n\n").concat(cancelFaq.answers || cancelFaq.answer, "\n\nDo you need help with a specific cancellation?");
            }
        }
        if (lowerMessage.includes('payment')) {
            var paymentFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('payment'); });
            if (paymentFaq) {
                return "**".concat(paymentFaq.question, "**\n\n").concat(paymentFaq.answers || paymentFaq.answer, "\n\nDo you have any other payment questions?");
            }
        }
        if (lowerMessage.includes('insurance')) {
            var insuranceFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('insurance'); });
            if (insuranceFaq) {
                return "**".concat(insuranceFaq.question, "**\n\n").concat(insuranceFaq.answers || insuranceFaq.answer, "\n\nWould you like help finding travel insurance?");
            }
        }
        if (lowerMessage.includes('flight')) {
            var flightFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('flight'); });
            if (flightFaq) {
                return "**".concat(flightFaq.question, "**\n\n").concat(flightFaq.answers || flightFaq.answer, "\n\nWould you like help with flight bookings?");
            }
        }
        if (lowerMessage.includes('refund')) {
            var refundFaq = faqs.find(function (faq) { var _a; return (_a = faq.question) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('refund'); });
            if (refundFaq) {
                return "**".concat(refundFaq.question, "**\n\n").concat(refundFaq.answers || refundFaq.answer, "\n\nDo you need help with a specific refund?");
            }
        }
        // General tour information
        if (tours.length > 0) {
            var tourList = tours.slice(0, 3).map(function (tour) {
                return "\u2022 **".concat(tour.title, "** - ").concat(tour.country, " (").concat(tour.duration, ", $").concat(tour.price, ")");
            }).join('\n');
            return "Here are some of our amazing tours:\n\n".concat(tourList, "\n\nWould you like more details about any specific tour?");
        }
        // General FAQ response
        if (faqs.length > 0) {
            var faq = faqs[0];
            return "**".concat(faq.question || faq.title, "**\n\n").concat(faq.answers || faq.answer, "\n\nIs there anything else I can help you with?");
        }
        return "I understand you're asking about travel and tours. I can help you with information about our tours, booking, accommodation, and more. Could you be more specific? For example:\n\n• \"How many tours do you have?\"\n• \"Tell me about your tours\"\n• \"How do I book a tour?\"\n• \"What's your cancellation policy?\"\n\nWhat would you like to know?";
    };
    return ResponseGenerator;
}());

var ChatBotCore = /** @class */ (function () {
    function ChatBotCore(config, events) {
        if (events === void 0) { events = {}; }
        this.container = null;
        this.chatElement = null;
        this.config = config;
        this.events = events;
        this.state = {
            messages: [],
            isOpen: config.autoOpen || false,
            isLoading: false,
            isConnected: true
        };
        this.contentstackService = new ContentstackService(config.contentstack);
        this.responseGenerator = new ResponseGenerator();
        this.initializeState();
    }
    ChatBotCore.prototype.initializeState = function () {
        if (this.config.showWelcomeMessage !== false) {
            var welcomeMessage = {
                id: 'welcome',
                text: this.config.welcomeMessage || "👋 Hi! I'm your travel assistant. How can I help you today?",
                isUser: false,
                timestamp: new Date()
            };
            this.state.messages = [welcomeMessage];
        }
    };
    ChatBotCore.prototype.mount = function (container) {
        this.container = container;
        this.createChatElement();
        this.render();
        this.attachEventListeners();
    };
    ChatBotCore.prototype.unmount = function () {
        if (this.chatElement && this.container) {
            this.container.removeChild(this.chatElement);
            this.chatElement = null;
        }
    };
    ChatBotCore.prototype.open = function () {
        var _a, _b;
        this.setState({ isOpen: true });
        (_b = (_a = this.events).onOpen) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    ChatBotCore.prototype.close = function () {
        var _a, _b;
        this.setState({ isOpen: false });
        (_b = (_a = this.events).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    ChatBotCore.prototype.sendMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var userMessage, content, response, botMessage, error_1, errorMessage;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!message.trim() || this.state.isLoading)
                            return [2 /*return*/];
                        userMessage = {
                            id: Date.now().toString(),
                            text: message.trim(),
                            isUser: true,
                            timestamp: new Date()
                        };
                        this.addMessage(userMessage);
                        this.setState({ isLoading: true });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.contentstackService.searchContent(message)];
                    case 2:
                        content = _c.sent();
                        response = this.responseGenerator.generateResponse(message, content);
                        botMessage = {
                            id: (Date.now() + 1).toString(),
                            text: response,
                            isUser: false,
                            timestamp: new Date()
                        };
                        this.addMessage(botMessage);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _c.sent();
                        errorMessage = {
                            id: (Date.now() + 1).toString(),
                            text: "I'm having trouble connecting right now. Please try again later.",
                            isUser: false,
                            timestamp: new Date()
                        };
                        this.addMessage(errorMessage);
                        (_b = (_a = this.events).onError) === null || _b === void 0 ? void 0 : _b.call(_a, error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChatBotCore.prototype.getState = function () {
        return __assign({}, this.state);
    };
    ChatBotCore.prototype.updateConfig = function (newConfig) {
        this.config = __assign(__assign({}, this.config), newConfig);
        this.contentstackService.updateConfig(newConfig.contentstack || {});
        this.render();
    };
    ChatBotCore.prototype.destroy = function () {
        this.unmount();
        this.container = null;
    };
    ChatBotCore.prototype.setState = function (newState) {
        var _a, _b;
        this.state = __assign(__assign({}, this.state), newState);
        (_b = (_a = this.events).onStateChange) === null || _b === void 0 ? void 0 : _b.call(_a, this.state);
        this.render();
    };
    ChatBotCore.prototype.addMessage = function (message) {
        var _a, _b;
        this.state.messages.push(message);
        (_b = (_a = this.events).onMessage) === null || _b === void 0 ? void 0 : _b.call(_a, message);
        this.render();
    };
    ChatBotCore.prototype.createChatElement = function () {
        if (!this.container)
            return;
        this.chatElement = document.createElement('div');
        this.chatElement.className = 'contentstack-chatbot';
        this.chatElement.style.cssText = "\n      position: fixed;\n      z-index: 1000;\n      ".concat(this.getPositionStyles(), "\n    ");
        this.container.appendChild(this.chatElement);
    };
    ChatBotCore.prototype.getPositionStyles = function () {
        var positions = {
            'bottom-right': 'bottom: 20px; right: 20px;',
            'bottom-left': 'bottom: 20px; left: 20px;',
            'top-right': 'top: 20px; right: 20px;',
            'top-left': 'top: 20px; left: 20px;'
        };
        return positions[this.config.position || 'bottom-right'];
    };
    ChatBotCore.prototype.render = function () {
        if (!this.chatElement)
            return;
        var theme = this.getThemeStyles();
        this.chatElement.innerHTML = "\n      ".concat(this.state.isOpen ? this.renderChatWindow(theme) : '', "\n      ").concat(!this.state.isOpen ? this.renderChatButton(theme) : '', "\n    ");
        this.attachEventListeners();
    };
    ChatBotCore.prototype.renderChatWindow = function (theme) {
        return "\n      <div class=\"chat-window\" style=\"\n        width: ".concat(this.config.width || 350, "px;\n        height: ").concat(this.config.height || 500, "px;\n        background-color: ").concat(theme.backgroundColor, ";\n        border: 1px solid ").concat(theme.borderColor, ";\n        border-radius: 12px;\n        box-shadow: 0 4px 20px rgba(0,0,0,0.15);\n        display: flex;\n        flex-direction: column;\n        font-family: system-ui, -apple-system, sans-serif;\n      \">\n        ").concat(this.renderHeader(theme), "\n        ").concat(this.renderMessages(theme), "\n        ").concat(this.renderInput(theme), "\n      </div>\n    ");
    };
    ChatBotCore.prototype.renderHeader = function (theme) {
        return "\n      <div class=\"chat-header\" style=\"\n        padding: 16px;\n        border-bottom: 1px solid ".concat(theme.borderColor, ";\n        background-color: ").concat(theme.buttonColor, ";\n        color: white;\n        border-radius: 12px 12px 0 0;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n      \">\n        <h3 style=\"margin: 0; font-size: 16px; font-weight: 600;\">\n          ").concat(this.config.title || 'Travel Assistant', "\n        </h3>\n        <button class=\"close-btn\" style=\"\n          background: none;\n          border: none;\n          color: white;\n          font-size: 18px;\n          cursor: pointer;\n          padding: 4px;\n        \">\u00D7</button>\n      </div>\n    ");
    };
    ChatBotCore.prototype.renderMessages = function (theme) {
        var messagesHtml = this.state.messages.map(function (message) { return "\n      <div class=\"message ".concat(message.isUser ? 'user' : 'bot', "\" style=\"\n        align-self: ").concat(message.isUser ? 'flex-end' : 'flex-start', ";\n        max-width: 80%;\n        margin-bottom: 12px;\n      \">\n        <div style=\"\n          background-color: ").concat(message.isUser ? theme.buttonColor : theme.inputColor, ";\n          color: ").concat(message.isUser ? 'white' : theme.textColor, ";\n          padding: 12px 16px;\n          border-radius: ").concat(message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px', ";\n          font-size: 14px;\n          line-height: 1.4;\n          white-space: pre-wrap;\n        \">").concat(message.text, "</div>\n      </div>\n    "); }).join('');
        var loadingHtml = this.state.isLoading ? "\n      <div class=\"loading\" style=\"\n        align-self: flex-start;\n        max-width: 80%;\n        margin-bottom: 12px;\n      \">\n        <div style=\"\n          background-color: ".concat(theme.inputColor, ";\n          color: ").concat(theme.textColor, ";\n          padding: 12px 16px;\n          border-radius: 18px 18px 18px 4px;\n          font-size: 14px;\n        \">\uD83D\uDCAD Thinking...</div>\n      </div>\n    ") : '';
        return "\n      <div class=\"chat-messages\" style=\"\n        flex: 1;\n        overflow-y: auto;\n        padding: 16px;\n        display: flex;\n        flex-direction: column;\n        gap: 12px;\n      \">\n        ".concat(messagesHtml, "\n        ").concat(loadingHtml, "\n        <div class=\"messages-end\"></div>\n      </div>\n    ");
    };
    ChatBotCore.prototype.renderInput = function (theme) {
        return "\n      <div class=\"chat-input\" style=\"\n        padding: 16px;\n        border-top: 1px solid ".concat(theme.borderColor, ";\n        display: flex;\n        gap: 8px;\n      \">\n        <input type=\"text\" class=\"message-input\" placeholder=\"").concat(this.config.placeholder || 'Ask me about tours and travel...', "\" style=\"\n          flex: 1;\n          padding: 12px 16px;\n          border: 1px solid ").concat(theme.borderColor, ";\n          border-radius: 24px;\n          font-size: 14px;\n          background-color: ").concat(theme.inputColor, ";\n          color: ").concat(theme.textColor, ";\n          outline: none;\n        \" ").concat(this.state.isLoading ? 'disabled' : '', ">\n        <button class=\"send-btn\" style=\"\n          padding: 12px 16px;\n          background-color: ").concat(theme.buttonColor, ";\n          color: white;\n          border: none;\n          border-radius: 24px;\n          cursor: ").concat(this.state.isLoading ? 'not-allowed' : 'pointer', ";\n          font-size: 14px;\n          opacity: ").concat(this.state.isLoading ? 0.6 : 1, ";\n        \" ").concat(this.state.isLoading ? 'disabled' : '', ">Send</button>\n      </div>\n    ");
    };
    ChatBotCore.prototype.renderChatButton = function (theme) {
        return "\n      <button class=\"chat-button\" style=\"\n        width: 60px;\n        height: 60px;\n        border-radius: 50%;\n        background-color: ".concat(theme.buttonColor, ";\n        color: white;\n        border: none;\n        cursor: pointer;\n        font-size: 24px;\n        box-shadow: 0 4px 20px rgba(0,0,0,0.15);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      \">\uD83D\uDCAC</button>\n    ");
    };
    ChatBotCore.prototype.getThemeStyles = function () {
        var themes = {
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
        return themes[this.config.theme || 'light'];
    };
    ChatBotCore.prototype.attachEventListeners = function () {
        var _this = this;
        if (!this.chatElement)
            return;
        // Close button
        var closeBtn = this.chatElement.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () { return _this.close(); });
        }
        // Chat button
        var chatButton = this.chatElement.querySelector('.chat-button');
        if (chatButton) {
            chatButton.addEventListener('click', function () { return _this.open(); });
        }
        // Send button
        var sendBtn = this.chatElement.querySelector('.send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', function () { return _this.handleSendMessage(); });
        }
        // Input enter key
        var messageInput = this.chatElement.querySelector('.message-input');
        if (messageInput) {
            messageInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    _this.handleSendMessage();
                }
            });
        }
        // Auto-scroll to bottom
        var messagesEnd = this.chatElement.querySelector('.messages-end');
        if (messagesEnd) {
            messagesEnd.scrollIntoView({ behavior: 'smooth' });
        }
    };
    ChatBotCore.prototype.handleSendMessage = function () {
        var _a;
        var messageInput = (_a = this.chatElement) === null || _a === void 0 ? void 0 : _a.querySelector('.message-input');
        if (messageInput) {
            var message = messageInput.value.trim();
            if (message) {
                this.sendMessage(message);
                messageInput.value = '';
            }
        }
    };
    return ChatBotCore;
}());

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

var ReactChatBot = function (_a) {
    var onMessage = _a.onMessage, onStateChange = _a.onStateChange, onError = _a.onError, onOpen = _a.onOpen, onClose = _a.onClose, config = __rest(_a, ["onMessage", "onStateChange", "onError", "onOpen", "onClose"]);
    var containerRef = require$$0.useRef(null);
    var chatbotRef = require$$0.useRef(null);
    var _b = require$$0.useState({
        messages: [],
        isOpen: config.autoOpen || false,
        isLoading: false,
        isConnected: true
    }); _b[0]; var setState = _b[1];
    require$$0.useEffect(function () {
        if (!containerRef.current)
            return;
        var events = {
            onMessage: function (message) {
                setState(function (prev) { return (__assign(__assign({}, prev), { messages: __spreadArray(__spreadArray([], prev.messages, true), [message], false) })); });
                onMessage === null || onMessage === void 0 ? void 0 : onMessage(message);
            },
            onStateChange: function (newState) {
                setState(newState);
                onStateChange === null || onStateChange === void 0 ? void 0 : onStateChange(newState);
            },
            onError: function (error) {
                onError === null || onError === void 0 ? void 0 : onError(error);
            },
            onOpen: function () {
                onOpen === null || onOpen === void 0 ? void 0 : onOpen();
            },
            onClose: function () {
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }
        };
        chatbotRef.current = new ChatBotCore(config, events);
        chatbotRef.current.mount(containerRef.current);
        return function () {
            var _a;
            (_a = chatbotRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
        };
    }, []);
    require$$0.useEffect(function () {
        if (chatbotRef.current) {
            chatbotRef.current.updateConfig(config);
        }
    }, [config]);
    return jsxRuntimeExports.jsx("div", { ref: containerRef });
};

// Core SDK
var ContentstackChatBot = /** @class */ (function () {
    function ContentstackChatBot() {
    }
    ContentstackChatBot.create = function (config, events) {
        return new ChatBotCore(config, events);
    };
    ContentstackChatBot.createReact = function (config, events) {
        // This will be used by React wrapper
        return { config: config, events: events };
    };
    return ContentstackChatBot;
}());

exports.ChatBotCore = ChatBotCore;
exports.ContentstackChatBot = ContentstackChatBot;
exports.ContentstackService = ContentstackService;
exports.ReactChatBot = ReactChatBot;
exports.ResponseGenerator = ResponseGenerator;
exports.default = ContentstackChatBot;
//# sourceMappingURL=index.js.map
