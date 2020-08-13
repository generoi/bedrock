(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/scripts/vendor"],{

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
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

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/css-shim-3333ed1f.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/css-shim-3333ed1f.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Stencil Client Platform v1.13.0 | MIT Licensed | https://stenciljs.com
 */
var StyleNode = function () { this.start = 0, this.end = 0, this.previous = null, this.parent = null, this.rules = null, this.parsedCssText = "", this.cssText = "", this.atRule = !1, this.type = 0, this.keyframesName = "", this.selector = "", this.parsedSelector = ""; };
function parse(e) { return parseCss(lex(e = clean(e)), e); }
function clean(e) { return e.replace(RX.comments, "").replace(RX.port, ""); }
function lex(e) { var t = new StyleNode; t.start = 0, t.end = e.length; for (var r = t, n = 0, s = e.length; n < s; n++)
    if (e[n] === OPEN_BRACE) {
        r.rules || (r.rules = []);
        var o = r, a = o.rules[o.rules.length - 1] || null;
        (r = new StyleNode).start = n + 1, r.parent = o, r.previous = a, o.rules.push(r);
    }
    else
        e[n] === CLOSE_BRACE && (r.end = n + 1, r = r.parent || t); return t; }
function parseCss(e, t) { var r = t.substring(e.start, e.end - 1); if (e.parsedCssText = e.cssText = r.trim(), e.parent) {
    var n = e.previous ? e.previous.end : e.parent.start;
    r = (r = (r = _expandUnicodeEscapes(r = t.substring(n, e.start - 1))).replace(RX.multipleSpaces, " ")).substring(r.lastIndexOf(";") + 1);
    var s = e.parsedSelector = e.selector = r.trim();
    e.atRule = 0 === s.indexOf(AT_START), e.atRule ? 0 === s.indexOf(MEDIA_START) ? e.type = types.MEDIA_RULE : s.match(RX.keyframesRule) && (e.type = types.KEYFRAMES_RULE, e.keyframesName = e.selector.split(RX.multipleSpaces).pop()) : 0 === s.indexOf(VAR_START) ? e.type = types.MIXIN_RULE : e.type = types.STYLE_RULE;
} var o = e.rules; if (o)
    for (var a = 0, i = o.length, l = void 0; a < i && (l = o[a]); a++)
        parseCss(l, t); return e; }
function _expandUnicodeEscapes(e) { return e.replace(/\\([0-9a-f]{1,6})\s/gi, (function () { for (var e = arguments[1], t = 6 - e.length; t--;)
    e = "0" + e; return "\\" + e; })); }
var types = { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3 }, OPEN_BRACE = "{", CLOSE_BRACE = "}", RX = { comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, port: /@import[^;]*;/gim, customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim, mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim, mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim, varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim, keyframesRule: /^@[^\s]*keyframes/, multipleSpaces: /\s+/g }, VAR_START = "--", MEDIA_START = "@media", AT_START = "@";
function findRegex(e, t, r) { e.lastIndex = 0; var n = t.substring(r).match(e); if (n) {
    var s = r + n.index;
    return { start: s, end: s + n[0].length };
} return null; }
var VAR_USAGE_START = /\bvar\(/, VAR_ASSIGN_START = /\B--[\w-]+\s*:/, COMMENTS = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim, TRAILING_LINES = /^[\t ]+\n/gm;
function resolveVar(e, t, r) { return e[t] ? e[t] : r ? executeTemplate(r, e) : ""; }
function findVarEndIndex(e, t) { for (var r = 0, n = t; n < e.length; n++) {
    var s = e[n];
    if ("(" === s)
        r++;
    else if (")" === s && --r <= 0)
        return n + 1;
} return n; }
function parseVar(e, t) { var r = findRegex(VAR_USAGE_START, e, t); if (!r)
    return null; var n = findVarEndIndex(e, r.start), s = e.substring(r.end, n - 1).split(","), o = s[0], a = s.slice(1); return { start: r.start, end: n, propName: o.trim(), fallback: a.length > 0 ? a.join(",").trim() : void 0 }; }
function compileVar(e, t, r) { var n = parseVar(e, r); if (!n)
    return t.push(e.substring(r, e.length)), e.length; var s = n.propName, o = null != n.fallback ? compileTemplate(n.fallback) : void 0; return t.push(e.substring(r, n.start), (function (e) { return resolveVar(e, s, o); })), n.end; }
function executeTemplate(e, t) { for (var r = "", n = 0; n < e.length; n++) {
    var s = e[n];
    r += "string" == typeof s ? s : s(t);
} return r; }
function findEndValue(e, t) { for (var r = !1, n = !1, s = t; s < e.length; s++) {
    var o = e[s];
    if (r)
        n && '"' === o && (r = !1), n || "'" !== o || (r = !1);
    else if ('"' === o)
        r = !0, n = !0;
    else if ("'" === o)
        r = !0, n = !1;
    else {
        if (";" === o)
            return s + 1;
        if ("}" === o)
            return s;
    }
} return s; }
function removeCustomAssigns(e) { for (var t = "", r = 0;;) {
    var n = findRegex(VAR_ASSIGN_START, e, r), s = n ? n.start : e.length;
    if (t += e.substring(r, s), !n)
        break;
    r = findEndValue(e, s);
} return t; }
function compileTemplate(e) { var t = 0; e = removeCustomAssigns(e = e.replace(COMMENTS, "")).replace(TRAILING_LINES, ""); for (var r = []; t < e.length;)
    t = compileVar(e, r, t); return r; }
function resolveValues(e) { var t = {}; e.forEach((function (e) { e.declarations.forEach((function (e) { t[e.prop] = e.value; })); })); for (var r = {}, n = Object.entries(t), s = function (e) { var t = !1; if (n.forEach((function (e) { var n = e[0], s = executeTemplate(e[1], r); s !== r[n] && (r[n] = s, t = !0); })), !t)
    return "break"; }, o = 0; o < 10; o++) {
    if ("break" === s())
        break;
} return r; }
function getSelectors(e, t) { if (void 0 === t && (t = 0), !e.rules)
    return []; var r = []; return e.rules.filter((function (e) { return e.type === types.STYLE_RULE; })).forEach((function (e) { var n = getDeclarations(e.cssText); n.length > 0 && e.parsedSelector.split(",").forEach((function (e) { e = e.trim(), r.push({ selector: e, declarations: n, specificity: computeSpecificity(), nu: t }); })), t++; })), r; }
function computeSpecificity(e) { return 1; }
var IMPORTANT = "!important", FIND_DECLARATIONS = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gm;
function getDeclarations(e) { for (var t, r = []; t = FIND_DECLARATIONS.exec(e.trim());) {
    var n = normalizeValue(t[2]), s = n.value, o = n.important;
    r.push({ prop: t[1].trim(), value: compileTemplate(s), important: o });
} return r; }
function normalizeValue(e) { var t = (e = e.replace(/\s+/gim, " ").trim()).endsWith(IMPORTANT); return t && (e = e.substr(0, e.length - IMPORTANT.length).trim()), { value: e, important: t }; }
function getActiveSelectors(e, t, r) { var n = [], s = getScopesForElement(t, e); return r.forEach((function (e) { return n.push(e); })), s.forEach((function (e) { return n.push(e); })), sortSelectors(getSelectorsForScopes(n).filter((function (t) { return matches(e, t.selector); }))); }
function getScopesForElement(e, t) { for (var r = []; t;) {
    var n = e.get(t);
    n && r.push(n), t = t.parentElement;
} return r; }
function getSelectorsForScopes(e) { var t = []; return e.forEach((function (e) { t.push.apply(t, e.selectors); })), t; }
function sortSelectors(e) { return e.sort((function (e, t) { return e.specificity === t.specificity ? e.nu - t.nu : e.specificity - t.specificity; })), e; }
function matches(e, t) { return ":root" === t || "html" === t || e.matches(t); }
function parseCSS(e) { var t = parse(e), r = compileTemplate(e); return { original: e, template: r, selectors: getSelectors(t), usesCssVars: r.length > 1 }; }
function addGlobalStyle(e, t) { if (e.some((function (e) { return e.styleEl === t; })))
    return !1; var r = parseCSS(t.textContent); return r.styleEl = t, e.push(r), !0; }
function updateGlobalScopes(e) { var t = resolveValues(getSelectorsForScopes(e)); e.forEach((function (e) { e.usesCssVars && (e.styleEl.textContent = executeTemplate(e.template, t)); })); }
function reScope(e, t) { var r = e.template.map((function (r) { return "string" == typeof r ? replaceScope(r, e.scopeId, t) : r; })), n = e.selectors.map((function (r) { return Object.assign(Object.assign({}, r), { selector: replaceScope(r.selector, e.scopeId, t) }); })); return Object.assign(Object.assign({}, e), { template: r, selectors: n, scopeId: t }); }
function replaceScope(e, t, r) { return e = replaceAll(e, "\\." + t, "." + r); }
function replaceAll(e, t, r) { return e.replace(new RegExp(t, "g"), r); }
function loadDocument(e, t) { return loadDocumentStyles(e, t), loadDocumentLinks(e, t).then((function () { updateGlobalScopes(t); })); }
function startWatcher(e, t) { "undefined" != typeof MutationObserver && new MutationObserver((function () { loadDocumentStyles(e, t) && updateGlobalScopes(t); })).observe(document.head, { childList: !0 }); }
function loadDocumentLinks(e, t) { for (var r = [], n = e.querySelectorAll('link[rel="stylesheet"][href]:not([data-no-shim])'), s = 0; s < n.length; s++)
    r.push(addGlobalLink(e, t, n[s])); return Promise.all(r); }
function loadDocumentStyles(e, t) { return Array.from(e.querySelectorAll("style:not([data-styles]):not([data-no-shim])")).map((function (e) { return addGlobalStyle(t, e); })).some(Boolean); }
function addGlobalLink(e, t, r) { var n = r.href; return fetch(n).then((function (e) { return e.text(); })).then((function (s) { if (hasCssVariables(s) && r.parentNode) {
    hasRelativeUrls(s) && (s = fixRelativeUrls(s, n));
    var o = e.createElement("style");
    o.setAttribute("data-styles", ""), o.textContent = s, addGlobalStyle(t, o), r.parentNode.insertBefore(o, r), r.remove();
} })).catch((function (e) { console.error(e); })); }
var CSS_VARIABLE_REGEXP = /[\s;{]--[-a-zA-Z0-9]+\s*:/m;
function hasCssVariables(e) { return e.indexOf("var(") > -1 || CSS_VARIABLE_REGEXP.test(e); }
var CSS_URL_REGEXP = /url[\s]*\([\s]*['"]?(?!(?:https?|data)\:|\/)([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim;
function hasRelativeUrls(e) { return CSS_URL_REGEXP.lastIndex = 0, CSS_URL_REGEXP.test(e); }
function fixRelativeUrls(e, t) { var r = t.replace(/[^/]*$/, ""); return e.replace(CSS_URL_REGEXP, (function (e, t) { var n = r + t; return e.replace(t, n); })); }
var CustomStyle = function () { function e(e, t) { this.win = e, this.doc = t, this.count = 0, this.hostStyleMap = new WeakMap, this.hostScopeMap = new WeakMap, this.globalScopes = [], this.scopesMap = new Map, this.didInit = !1; } return e.prototype.i = function () { var e = this; return this.didInit || !this.win.requestAnimationFrame ? Promise.resolve() : (this.didInit = !0, new Promise((function (t) { e.win.requestAnimationFrame((function () { startWatcher(e.doc, e.globalScopes), loadDocument(e.doc, e.globalScopes).then((function () { return t(); })); })); }))); }, e.prototype.addLink = function (e) { var t = this; return addGlobalLink(this.doc, this.globalScopes, e).then((function () { t.updateGlobal(); })); }, e.prototype.addGlobalStyle = function (e) { addGlobalStyle(this.globalScopes, e) && this.updateGlobal(); }, e.prototype.createHostStyle = function (e, t, r, n) { if (this.hostScopeMap.has(e))
    throw new Error("host style already created"); var s = this.registerHostTemplate(r, t, n), o = this.doc.createElement("style"); return o.setAttribute("data-no-shim", ""), s.usesCssVars ? n ? (o["s-sc"] = t = s.scopeId + "-" + this.count, o.textContent = "/*needs update*/", this.hostStyleMap.set(e, o), this.hostScopeMap.set(e, reScope(s, t)), this.count++) : (s.styleEl = o, s.usesCssVars || (o.textContent = executeTemplate(s.template, {})), this.globalScopes.push(s), this.updateGlobal(), this.hostScopeMap.set(e, s)) : o.textContent = r, o; }, e.prototype.removeHost = function (e) { var t = this.hostStyleMap.get(e); t && t.remove(), this.hostStyleMap.delete(e), this.hostScopeMap.delete(e); }, e.prototype.updateHost = function (e) { var t = this.hostScopeMap.get(e); if (t && t.usesCssVars && t.isScoped) {
    var r = this.hostStyleMap.get(e);
    if (r) {
        var n = resolveValues(getActiveSelectors(e, this.hostScopeMap, this.globalScopes));
        r.textContent = executeTemplate(t.template, n);
    }
} }, e.prototype.updateGlobal = function () { updateGlobalScopes(this.globalScopes); }, e.prototype.registerHostTemplate = function (e, t, r) { var n = this.scopesMap.get(t); return n || ((n = parseCSS(e)).scopeId = t, n.isScoped = r, this.scopesMap.set(t, n)), n; }, e; }();
!function (e) { !e || e.__cssshim || e.CSS && e.CSS.supports && e.CSS.supports("color", "var(--c)") || (e.__cssshim = new CustomStyle(e, e.document)); }("undefined" != typeof window && window);


/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/dom-f87898ff.js":
/*!************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/dom-f87898ff.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 Stencil Client Platform v1.13.0 | MIT Licensed | https://stenciljs.com
 */
(function () {
    var aa = new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));
    function g(a) { var b = aa.has(a); a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a); return !b && a; }
    function l(a) { var b = a.isConnected; if (void 0 !== b)
        return b; for (; a && !(a.__CE_isImportDocument || a instanceof Document);)
        a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0); return !(!a || !(a.__CE_isImportDocument || a instanceof Document)); }
    function n(a, b) { for (; b && b !== a && !b.nextSibling;)
        b = b.parentNode; return b && b !== a ? b.nextSibling : null; }
    function p(a, b, d) { d = void 0 === d ? new Set : d; for (var c = a; c;) {
        if (c.nodeType === Node.ELEMENT_NODE) {
            var e = c;
            b(e);
            var f = e.localName;
            if ("link" === f && "import" === e.getAttribute("rel")) {
                c = e.import;
                if (c instanceof Node && !d.has(c))
                    for (d.add(c), c = c.firstChild; c; c = c.nextSibling)
                        p(c, b, d);
                c = n(a, e);
                continue;
            }
            else if ("template" === f) {
                c = n(a, e);
                continue;
            }
            if (e = e.__CE_shadowRoot)
                for (e = e.firstChild; e; e = e.nextSibling)
                    p(e, b, d);
        }
        c = c.firstChild ? c.firstChild : n(a, c);
    } }
    function r(a, b, d) { a[b] = d; }
    function u() { this.a = new Map; this.g = new Map; this.c = []; this.f = []; this.b = !1; }
    function ba(a, b, d) { a.a.set(b, d); a.g.set(d.constructorFunction, d); }
    function ca(a, b) { a.b = !0; a.c.push(b); }
    function da(a, b) { a.b = !0; a.f.push(b); }
    function v(a, b) { a.b && p(b, function (b) { return w(a, b); }); }
    function w(a, b) { if (a.b && !b.__CE_patched) {
        b.__CE_patched = !0;
        for (var d = 0; d < a.c.length; d++)
            a.c[d](b);
        for (d = 0; d < a.f.length; d++)
            a.f[d](b);
    } }
    function x(a, b) { var d = []; p(b, function (b) { return d.push(b); }); for (b = 0; b < d.length; b++) {
        var c = d[b];
        1 === c.__CE_state ? a.connectedCallback(c) : y(a, c);
    } }
    function z(a, b) { var d = []; p(b, function (b) { return d.push(b); }); for (b = 0; b < d.length; b++) {
        var c = d[b];
        1 === c.__CE_state && a.disconnectedCallback(c);
    } }
    function A(a, b, d) {
        d = void 0 === d ? {} : d;
        var c = d.u || new Set, e = d.i || function (b) { return y(a, b); }, f = [];
        p(b, function (b) { if ("link" === b.localName && "import" === b.getAttribute("rel")) {
            var d = b.import;
            d instanceof Node && (d.__CE_isImportDocument = !0, d.__CE_hasRegistry = !0);
            d && "complete" === d.readyState ? d.__CE_documentLoadHandled = !0 : b.addEventListener("load", function () { var d = b.import; if (!d.__CE_documentLoadHandled) {
                d.__CE_documentLoadHandled = !0;
                var f = new Set(c);
                f.delete(d);
                A(a, d, { u: f, i: e });
            } });
        }
        else
            f.push(b); }, c);
        if (a.b)
            for (b =
                0; b < f.length; b++)
                w(a, f[b]);
        for (b = 0; b < f.length; b++)
            e(f[b]);
    }
    function y(a, b) {
        if (void 0 === b.__CE_state) {
            var d = b.ownerDocument;
            if (d.defaultView || d.__CE_isImportDocument && d.__CE_hasRegistry)
                if (d = a.a.get(b.localName)) {
                    d.constructionStack.push(b);
                    var c = d.constructorFunction;
                    try {
                        try {
                            if (new c !== b)
                                throw Error("The custom element constructor did not produce the element being upgraded.");
                        }
                        finally {
                            d.constructionStack.pop();
                        }
                    }
                    catch (t) {
                        throw b.__CE_state = 2, t;
                    }
                    b.__CE_state = 1;
                    b.__CE_definition = d;
                    if (d.attributeChangedCallback)
                        for (d = d.observedAttributes, c = 0; c < d.length; c++) {
                            var e = d[c], f = b.getAttribute(e);
                            null !== f && a.attributeChangedCallback(b, e, null, f, null);
                        }
                    l(b) && a.connectedCallback(b);
                }
        }
    }
    u.prototype.connectedCallback = function (a) { var b = a.__CE_definition; b.connectedCallback && b.connectedCallback.call(a); };
    u.prototype.disconnectedCallback = function (a) { var b = a.__CE_definition; b.disconnectedCallback && b.disconnectedCallback.call(a); };
    u.prototype.attributeChangedCallback = function (a, b, d, c, e) { var f = a.__CE_definition; f.attributeChangedCallback && -1 < f.observedAttributes.indexOf(b) && f.attributeChangedCallback.call(a, b, d, c, e); };
    function B(a) { var b = document; this.c = a; this.a = b; this.b = void 0; A(this.c, this.a); "loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 })); }
    function C(a) { a.b && a.b.disconnect(); }
    B.prototype.f = function (a) { var b = this.a.readyState; "interactive" !== b && "complete" !== b || C(this); for (b = 0; b < a.length; b++)
        for (var d = a[b].addedNodes, c = 0; c < d.length; c++)
            A(this.c, d[c]); };
    function ea() { var a = this; this.b = this.a = void 0; this.c = new Promise(function (b) { a.b = b; a.a && b(a.a); }); }
    function D(a) { if (a.a)
        throw Error("Already resolved."); a.a = void 0; a.b && a.b(void 0); }
    function E(a) { this.c = !1; this.a = a; this.j = new Map; this.f = function (b) { return b(); }; this.b = !1; this.g = []; this.o = new B(a); }
    E.prototype.l = function (a, b) {
        var d = this;
        if (!(b instanceof Function))
            throw new TypeError("Custom element constructors must be functions.");
        if (!g(a))
            throw new SyntaxError("The element name '" + a + "' is not valid.");
        if (this.a.a.get(a))
            throw Error("A custom element with name '" + a + "' has already been defined.");
        if (this.c)
            throw Error("A custom element is already being defined.");
        this.c = !0;
        try {
            var c = function (b) {
                var a = e[b];
                if (void 0 !== a && !(a instanceof Function))
                    throw Error("The '" + b + "' callback must be a function.");
                return a;
            }, e = b.prototype;
            if (!(e instanceof Object))
                throw new TypeError("The custom element constructor's prototype is not an object.");
            var f = c("connectedCallback");
            var t = c("disconnectedCallback");
            var k = c("adoptedCallback");
            var h = c("attributeChangedCallback");
            var m = b.observedAttributes || [];
        }
        catch (q) {
            return;
        }
        finally {
            this.c = !1;
        }
        b = { localName: a, constructorFunction: b, connectedCallback: f, disconnectedCallback: t, adoptedCallback: k, attributeChangedCallback: h, observedAttributes: m, constructionStack: [] };
        ba(this.a, a, b);
        this.g.push(b);
        this.b || (this.b = !0, this.f(function () { return fa(d); }));
    };
    E.prototype.i = function (a) { A(this.a, a); };
    function fa(a) { if (!1 !== a.b) {
        a.b = !1;
        for (var b = a.g, d = [], c = new Map, e = 0; e < b.length; e++)
            c.set(b[e].localName, []);
        A(a.a, document, { i: function (b) { if (void 0 === b.__CE_state) {
                var e = b.localName, f = c.get(e);
                f ? f.push(b) : a.a.a.get(e) && d.push(b);
            } } });
        for (e = 0; e < d.length; e++)
            y(a.a, d[e]);
        for (; 0 < b.length;) {
            var f = b.shift();
            e = f.localName;
            f = c.get(f.localName);
            for (var t = 0; t < f.length; t++)
                y(a.a, f[t]);
            (e = a.j.get(e)) && D(e);
        }
    } }
    E.prototype.get = function (a) { if (a = this.a.a.get(a))
        return a.constructorFunction; };
    E.prototype.m = function (a) { if (!g(a))
        return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name.")); var b = this.j.get(a); if (b)
        return b.c; b = new ea; this.j.set(a, b); this.a.a.get(a) && !this.g.some(function (b) { return b.localName === a; }) && D(b); return b.c; };
    E.prototype.s = function (a) { C(this.o); var b = this.f; this.f = function (d) { return a(function () { return b(d); }); }; };
    window.CustomElementRegistry = E;
    E.prototype.define = E.prototype.l;
    E.prototype.upgrade = E.prototype.i;
    E.prototype.get = E.prototype.get;
    E.prototype.whenDefined = E.prototype.m;
    E.prototype.polyfillWrapFlushCallback = E.prototype.s;
    var F = window.Document.prototype.createElement, G = window.Document.prototype.createElementNS, ha = window.Document.prototype.importNode, ia = window.Document.prototype.prepend, ja = window.Document.prototype.append, ka = window.DocumentFragment.prototype.prepend, la = window.DocumentFragment.prototype.append, H = window.Node.prototype.cloneNode, I = window.Node.prototype.appendChild, J = window.Node.prototype.insertBefore, K = window.Node.prototype.removeChild, L = window.Node.prototype.replaceChild, M = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"), N = window.Element.prototype.attachShadow, O = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"), P = window.Element.prototype.getAttribute, Q = window.Element.prototype.setAttribute, R = window.Element.prototype.removeAttribute, S = window.Element.prototype.getAttributeNS, T = window.Element.prototype.setAttributeNS, U = window.Element.prototype.removeAttributeNS, ma = window.Element.prototype.insertAdjacentElement, na = window.Element.prototype.insertAdjacentHTML, oa = window.Element.prototype.prepend, pa = window.Element.prototype.append, V = window.Element.prototype.before, qa = window.Element.prototype.after, ra = window.Element.prototype.replaceWith, sa = window.Element.prototype.remove, ta = window.HTMLElement, W = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"), ua = window.HTMLElement.prototype.insertAdjacentElement, va = window.HTMLElement.prototype.insertAdjacentHTML;
    var wa = new function () { };
    function xa() {
        var a = X;
        window.HTMLElement = function () {
            function b() {
                var b = this.constructor, c = a.g.get(b);
                if (!c)
                    throw Error("The custom element being constructed was not registered with `customElements`.");
                var e = c.constructionStack;
                if (0 === e.length)
                    return e = F.call(document, c.localName), Object.setPrototypeOf(e, b.prototype), e.__CE_state = 1, e.__CE_definition = c, w(a, e), e;
                c = e.length - 1;
                var f = e[c];
                if (f === wa)
                    throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
                e[c] = wa;
                Object.setPrototypeOf(f, b.prototype);
                w(a, f);
                return f;
            }
            b.prototype = ta.prototype;
            Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });
            return b;
        }();
    }
    function Y(a, b, d) { function c(b) { return function (d) { for (var e = [], c = 0; c < arguments.length; ++c)
        e[c] = arguments[c]; c = []; for (var f = [], m = 0; m < e.length; m++) {
        var q = e[m];
        q instanceof Element && l(q) && f.push(q);
        if (q instanceof DocumentFragment)
            for (q = q.firstChild; q; q = q.nextSibling)
                c.push(q);
        else
            c.push(q);
    } b.apply(this, e); for (e = 0; e < f.length; e++)
        z(a, f[e]); if (l(this))
        for (e = 0; e < c.length; e++)
            f = c[e], f instanceof Element && x(a, f); }; } void 0 !== d.h && (b.prepend = c(d.h)); void 0 !== d.append && (b.append = c(d.append)); }
    function ya() {
        var a = X;
        r(Document.prototype, "createElement", function (b) { if (this.__CE_hasRegistry) {
            var d = a.a.get(b);
            if (d)
                return new d.constructorFunction;
        } b = F.call(this, b); w(a, b); return b; });
        r(Document.prototype, "importNode", function (b, d) { b = ha.call(this, b, !!d); this.__CE_hasRegistry ? A(a, b) : v(a, b); return b; });
        r(Document.prototype, "createElementNS", function (b, d) {
            if (this.__CE_hasRegistry && (null === b || "http://www.w3.org/1999/xhtml" === b)) {
                var c = a.a.get(d);
                if (c)
                    return new c.constructorFunction;
            }
            b = G.call(this, b, d);
            w(a, b);
            return b;
        });
        Y(a, Document.prototype, { h: ia, append: ja });
    }
    function za() {
        function a(a, c) { Object.defineProperty(a, "textContent", { enumerable: c.enumerable, configurable: !0, get: c.get, set: function (a) { if (this.nodeType === Node.TEXT_NODE)
                c.set.call(this, a);
            else {
                var d = void 0;
                if (this.firstChild) {
                    var e = this.childNodes, k = e.length;
                    if (0 < k && l(this)) {
                        d = Array(k);
                        for (var h = 0; h < k; h++)
                            d[h] = e[h];
                    }
                }
                c.set.call(this, a);
                if (d)
                    for (a = 0; a < d.length; a++)
                        z(b, d[a]);
            } } }); }
        var b = X;
        r(Node.prototype, "insertBefore", function (a, c) {
            if (a instanceof DocumentFragment) {
                var e = Array.prototype.slice.apply(a.childNodes);
                a = J.call(this, a, c);
                if (l(this))
                    for (c = 0; c < e.length; c++)
                        x(b, e[c]);
                return a;
            }
            e = l(a);
            c = J.call(this, a, c);
            e && z(b, a);
            l(this) && x(b, a);
            return c;
        });
        r(Node.prototype, "appendChild", function (a) { if (a instanceof DocumentFragment) {
            var c = Array.prototype.slice.apply(a.childNodes);
            a = I.call(this, a);
            if (l(this))
                for (var e = 0; e < c.length; e++)
                    x(b, c[e]);
            return a;
        } c = l(a); e = I.call(this, a); c && z(b, a); l(this) && x(b, a); return e; });
        r(Node.prototype, "cloneNode", function (a) {
            a = H.call(this, !!a);
            this.ownerDocument.__CE_hasRegistry ? A(b, a) : v(b, a);
            return a;
        });
        r(Node.prototype, "removeChild", function (a) { var c = l(a), e = K.call(this, a); c && z(b, a); return e; });
        r(Node.prototype, "replaceChild", function (a, c) { if (a instanceof DocumentFragment) {
            var e = Array.prototype.slice.apply(a.childNodes);
            a = L.call(this, a, c);
            if (l(this))
                for (z(b, c), c = 0; c < e.length; c++)
                    x(b, e[c]);
            return a;
        } e = l(a); var f = L.call(this, a, c), d = l(this); d && z(b, c); e && z(b, a); d && x(b, a); return f; });
        M && M.get ? a(Node.prototype, M) : ca(b, function (b) {
            a(b, { enumerable: !0, configurable: !0, get: function () {
                    for (var a = [], b = 0; b < this.childNodes.length; b++) {
                        var f = this.childNodes[b];
                        f.nodeType !== Node.COMMENT_NODE && a.push(f.textContent);
                    }
                    return a.join("");
                }, set: function (a) { for (; this.firstChild;)
                    K.call(this, this.firstChild); null != a && "" !== a && I.call(this, document.createTextNode(a)); } });
        });
    }
    function Aa(a) {
        function b(b) { return function (e) { for (var c = [], d = 0; d < arguments.length; ++d)
            c[d] = arguments[d]; d = []; for (var k = [], h = 0; h < c.length; h++) {
            var m = c[h];
            m instanceof Element && l(m) && k.push(m);
            if (m instanceof DocumentFragment)
                for (m = m.firstChild; m; m = m.nextSibling)
                    d.push(m);
            else
                d.push(m);
        } b.apply(this, c); for (c = 0; c < k.length; c++)
            z(a, k[c]); if (l(this))
            for (c = 0; c < d.length; c++)
                k = d[c], k instanceof Element && x(a, k); }; }
        var d = Element.prototype;
        void 0 !== V && (d.before = b(V));
        void 0 !== V && (d.after = b(qa));
        void 0 !== ra &&
            r(d, "replaceWith", function (b) { for (var e = [], c = 0; c < arguments.length; ++c)
                e[c] = arguments[c]; c = []; for (var d = [], k = 0; k < e.length; k++) {
                var h = e[k];
                h instanceof Element && l(h) && d.push(h);
                if (h instanceof DocumentFragment)
                    for (h = h.firstChild; h; h = h.nextSibling)
                        c.push(h);
                else
                    c.push(h);
            } k = l(this); ra.apply(this, e); for (e = 0; e < d.length; e++)
                z(a, d[e]); if (k)
                for (z(a, this), e = 0; e < c.length; e++)
                    d = c[e], d instanceof Element && x(a, d); });
        void 0 !== sa && r(d, "remove", function () { var b = l(this); sa.call(this); b && z(a, this); });
    }
    function Ba() {
        function a(a, b) { Object.defineProperty(a, "innerHTML", { enumerable: b.enumerable, configurable: !0, get: b.get, set: function (a) { var e = this, d = void 0; l(this) && (d = [], p(this, function (a) { a !== e && d.push(a); })); b.set.call(this, a); if (d)
                for (var f = 0; f < d.length; f++) {
                    var t = d[f];
                    1 === t.__CE_state && c.disconnectedCallback(t);
                } this.ownerDocument.__CE_hasRegistry ? A(c, this) : v(c, this); return a; } }); }
        function b(a, b) { r(a, "insertAdjacentElement", function (a, e) { var d = l(e); a = b.call(this, a, e); d && z(c, e); l(a) && x(c, e); return a; }); }
        function d(a, b) {
            function e(a, b) { for (var e = []; a !== b; a = a.nextSibling)
                e.push(a); for (b = 0; b < e.length; b++)
                A(c, e[b]); }
            r(a, "insertAdjacentHTML", function (a, c) {
                a = a.toLowerCase();
                if ("beforebegin" === a) {
                    var d = this.previousSibling;
                    b.call(this, a, c);
                    e(d || this.parentNode.firstChild, this);
                }
                else if ("afterbegin" === a)
                    d = this.firstChild, b.call(this, a, c), e(this.firstChild, d);
                else if ("beforeend" === a)
                    d = this.lastChild, b.call(this, a, c), e(d || this.firstChild, null);
                else if ("afterend" === a)
                    d = this.nextSibling, b.call(this, a, c), e(this.nextSibling, d);
                else
                    throw new SyntaxError("The value provided (" + String(a) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
            });
        }
        var c = X;
        N && r(Element.prototype, "attachShadow", function (a) { a = N.call(this, a); var b = c; if (b.b && !a.__CE_patched) {
            a.__CE_patched = !0;
            for (var e = 0; e < b.c.length; e++)
                b.c[e](a);
        } return this.__CE_shadowRoot = a; });
        O && O.get ? a(Element.prototype, O) : W && W.get ? a(HTMLElement.prototype, W) : da(c, function (b) {
            a(b, { enumerable: !0, configurable: !0, get: function () { return H.call(this, !0).innerHTML; },
                set: function (a) { var b = "template" === this.localName, c = b ? this.content : this, e = G.call(document, this.namespaceURI, this.localName); for (e.innerHTML = a; 0 < c.childNodes.length;)
                    K.call(c, c.childNodes[0]); for (a = b ? e.content : e; 0 < a.childNodes.length;)
                    I.call(c, a.childNodes[0]); } });
        });
        r(Element.prototype, "setAttribute", function (a, b) { if (1 !== this.__CE_state)
            return Q.call(this, a, b); var e = P.call(this, a); Q.call(this, a, b); b = P.call(this, a); c.attributeChangedCallback(this, a, e, b, null); });
        r(Element.prototype, "setAttributeNS", function (a, b, d) { if (1 !== this.__CE_state)
            return T.call(this, a, b, d); var e = S.call(this, a, b); T.call(this, a, b, d); d = S.call(this, a, b); c.attributeChangedCallback(this, b, e, d, a); });
        r(Element.prototype, "removeAttribute", function (a) { if (1 !== this.__CE_state)
            return R.call(this, a); var b = P.call(this, a); R.call(this, a); null !== b && c.attributeChangedCallback(this, a, b, null, null); });
        r(Element.prototype, "removeAttributeNS", function (a, b) {
            if (1 !== this.__CE_state)
                return U.call(this, a, b);
            var d = S.call(this, a, b);
            U.call(this, a, b);
            var e = S.call(this, a, b);
            d !== e && c.attributeChangedCallback(this, b, d, e, a);
        });
        ua ? b(HTMLElement.prototype, ua) : ma ? b(Element.prototype, ma) : console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");
        va ? d(HTMLElement.prototype, va) : na ? d(Element.prototype, na) : console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");
        Y(c, Element.prototype, { h: oa, append: pa });
        Aa(c);
    }
    var Z = window.customElements;
    if (!Z || Z.forcePolyfill || "function" != typeof Z.define || "function" != typeof Z.get) {
        var X = new u;
        xa();
        ya();
        Y(X, DocumentFragment.prototype, { h: ka, append: la });
        za();
        Ba();
        document.__CE_hasRegistry = !0;
        var customElements = new E(X);
        Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: customElements });
    }
}).call(self);
// Polyfill document.baseURI
"string" !== typeof document.baseURI && Object.defineProperty(Document.prototype, "baseURI", { enumerable: !0, configurable: !0, get: function () { var a = document.querySelector("base"); return a && a.href ? a.href : document.URL; } });
// Polyfill CustomEvent
"function" !== typeof window.CustomEvent && (window.CustomEvent = function (c, a) { a = a || { bubbles: !1, cancelable: !1, detail: void 0 }; var b = document.createEvent("CustomEvent"); b.initCustomEvent(c, a.bubbles, a.cancelable, a.detail); return b; }, window.CustomEvent.prototype = window.Event.prototype);
// Event.composedPath
(function (b, c, d) { b.composedPath || (b.composedPath = function () { if (this.path)
    return this.path; var a = this.target; for (this.path = []; null !== a.parentNode;)
    this.path.push(a), a = a.parentNode; this.path.push(c, d); return this.path; }); })(Event.prototype, document, window);
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function (a) { "function" !== typeof a.matches && (a.matches = a.msMatchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || function (a) { a = (this.document || this.ownerDocument).querySelectorAll(a); for (var b = 0; a[b] && a[b] !== this;)
    ++b; return !!a[b]; }); "function" !== typeof a.closest && (a.closest = function (a) { for (var b = this; b && 1 === b.nodeType;) {
    if (b.matches(a))
        return b;
    b = b.parentNode;
} return null; }); })(window.Element.prototype);
/*!
Element.getRootNode()
*/
(function (c) { function d(a) { a = b(a); return a && 11 === a.nodeType ? d(a.host) : a; } function b(a) { return a && a.parentNode ? b(a.parentNode) : a; } "function" !== typeof c.getRootNode && (c.getRootNode = function (a) { return a && a.composed ? d(this) : b(this); }); })(Element.prototype);
/*!
Element.isConnected()
*/
(function (a) { "isConnected" in a || Object.defineProperty(a, "isConnected", { configurable: !0, enumerable: !0, get: function () { var a = this.getRootNode({ composed: !0 }); return a && 9 === a.nodeType; } }); })(Element.prototype);
/*!
Element.remove()
*/
(function (b) { b.forEach(function (a) { a.hasOwnProperty("remove") || Object.defineProperty(a, "remove", { configurable: !0, enumerable: !0, writable: !0, value: function () { null !== this.parentNode && this.parentNode.removeChild(this); } }); }); })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
/*!
Element.classList
*/
!function (e) { 'classList' in e || Object.defineProperty(e, "classList", { get: function () { var e = this, t = (e.getAttribute("class") || "").replace(/^\s+|\s$/g, "").split(/\s+/g); function n() { t.length > 0 ? e.setAttribute("class", t.join(" ")) : e.removeAttribute("class"); } return "" === t[0] && t.splice(0, 1), t.toggle = function (e, i) { void 0 !== i ? i ? t.add(e) : t.remove(e) : -1 !== t.indexOf(e) ? t.splice(t.indexOf(e), 1) : t.push(e), n(); }, t.add = function () { for (var e = [].slice.call(arguments), i = 0, s = e.length; i < s; i++)
        -1 === t.indexOf(e[i]) && t.push(e[i]); n(); }, t.remove = function () { for (var e = [].slice.call(arguments), i = 0, s = e.length; i < s; i++)
        -1 !== t.indexOf(e[i]) && t.splice(t.indexOf(e[i]), 1); n(); }, t.item = function (e) { return t[e]; }, t.contains = function (e) { return -1 !== t.indexOf(e); }, t.replace = function (e, i) { -1 !== t.indexOf(e) && t.splice(t.indexOf(e), 1, i), n(); }, t.value = e.getAttribute("class") || "", t; } }); }(Element.prototype);
/*!
DOMTokenList
*/
(function (b) { try {
    document.body.classList.add();
}
catch (e) {
    var c = b.add, d = b.remove;
    b.add = function () { for (var a = 0; a < arguments.length; a++)
        c.call(this, arguments[a]); };
    b.remove = function () { for (var a = 0; a < arguments.length; a++)
        d.call(this, arguments[a]); };
} })(DOMTokenList.prototype);


/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-button_2.entry.js":
/*!******************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-button_2.entry.js ***!
  \******************************************************************************/
/*! exports provided: gds_button, gds_paragraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_button", function() { return GdsButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_paragraph", function() { return GdsParagraph; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsButtonCss = ".button{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;text-align:center;outline:none;text-decoration:none;cursor:pointer;color:var(--button-color, inherit);background-color:var(--button-background-color, inherit);font-family:var(--button-font-family);font-weight:var(--button-font-weight);text-transform:var(--button-text-transform);height:56px;line-height:1em;font-size:20px;letter-spacing:var(--button-m-letter-spacing);border:none;border-radius:var(--button-border-radius);-webkit-box-shadow:var(--button-box-shadow);box-shadow:var(--button-box-shadow);padding:var(--button-m-padding)}.button:hover{background-color:var(--button-background-color-hover)}.button:disabled{background-color:var(--button-background-color-hover)}.button>*+*{margin-left:16px}.text-button{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;text-align:center;outline:none;text-decoration:none;cursor:pointer;color:var(--button-color, inherit);background-color:var(--button-background-color, inherit);font-family:var(--button-font-family);font-weight:var(--button-font-weight);text-transform:var(--button-text-transform);height:56px;line-height:1em;font-size:20px;letter-spacing:var(--button-m-letter-spacing);border:none;border-radius:var(--button-border-radius);-webkit-box-shadow:var(--button-box-shadow);box-shadow:var(--button-box-shadow);padding:var(--button-m-padding);color:inherit;background-color:inherit}.text-button:hover{background-color:var(--button-background-color-hover)}.text-button:disabled{background-color:var(--button-background-color-hover)}.text-button>*+*{margin-left:16px}.text-button:hover{background-color:inherit}.text-button:disabled{background-color:inherit}.size-s{height:48px;font-size:var(--button-s-font-size);letter-spacing:var(--button-s-letter-spacing);padding:var(--button-s-padding)}.size-m{height:56px;font-size:var(--button-m-font-size);letter-spacing:var(--button-m-letter-spacing);padding:var(--button-m-padding)}.size-l{height:56px;font-size:var(--button-l-font-size);letter-spacing:var(--button-l-letter-spacing);padding:var(--button-l-padding)}";
var GdsButton = /** @class */ (function () {
    function GdsButton(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         *
         */
        this.disabled = false;
        /**
         * Is a textual button.
         */
        this.text = false;
        /**
         * Button size.
         */
        this.size = 'm';
    }
    GdsButton.prototype.render = function () {
        var _a;
        // This ugly syntax is because of prettier. TODO: Fix this syntax.
        var rightIconStyle = this.rightIconRotate
            ? {
                transform: "rotate(" + this.rightIconRotate + "deg)",
            }
            : undefined;
        var leftIconStyle = this.leftIconRotate
            ? {
                transform: "rotate(" + this.leftIconRotate + "deg)",
            }
            : undefined;
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", { class: (_a = {
                    button: !this.text,
                    'text-button': this.text
                },
                _a["size-" + this.size] = true,
                _a), disabled: this.disabled }, this.leftIcon && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", { style: leftIconStyle }, this.leftIcon), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), this.rightIcon && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", { style: rightIconStyle }, this.rightIcon))));
    };
    return GdsButton;
}());
GdsButton.style = gdsButtonCss;
var gdsParagraphCss = ".gds-paragraph-l{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:20px;line-height:24px}.gds-paragraph-m{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:17px;line-height:27px}.gds-paragraph-s{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:15px;line-height:25px}";
var GdsParagraph = /** @class */ (function () {
    function GdsParagraph(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Size of the text.
         */
        this.size = 'm';
    }
    GdsParagraph.prototype.render = function () {
        var _a;
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("p", { class: (_a = {},
                _a["gds-paragraph-" + this.size] = true,
                _a[this.class] = !!this.class,
                _a) }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    };
    return GdsParagraph;
}());
GdsParagraph.style = gdsParagraphCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-card_2.entry.js":
/*!****************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-card_2.entry.js ***!
  \****************************************************************************/
/*! exports provided: gds_card, gds_heading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_card", function() { return GdsCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_heading", function() { return GdsHeading; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsCardCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;text-align:center;border-radius:var(--card-border-radius, 8px);background-color:white;-webkit-box-shadow:5px 5px 15px #64646426, -5px -5px 15px #ffffffcc;box-shadow:5px 5px 15px #64646426, -5px -5px 15px #ffffffcc;overflow:hidden;width:var(--card-width, 450px);-ms-flex-direction:column;flex-direction:column}";
var GdsCard = /** @class */ (function () {
    function GdsCard(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsCard.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    };
    return GdsCard;
}());
GdsCard.style = gdsCardCss;
var gdsHeadingCss = ".size-xxl{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:72px;line-height:74px}.size-xl{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:60px;line-height:60px}.size-l{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:36px;line-height:36px}.size-m{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:28px;line-height:28px}.size-s{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:20px;line-height:24px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase}";
var GdsHeading = /** @class */ (function () {
    function GdsHeading(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Size of the heading.
         */
        this.size = 'm';
    }
    GdsHeading.prototype.render = function () {
        var cls = "size-" + this.size;
        // This is a bit clumsy but I couldn't figure out a better way.
        switch (this.as) {
            case 'h1':
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h1", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
            case 'h2':
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h2", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
            case 'h3':
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h3", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
            case 'h4':
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h4", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
            case 'h5':
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h5", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
            default:
                return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: cls }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
        }
    };
    return GdsHeading;
}());
GdsHeading.style = gdsHeadingCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-label.entry.js":
/*!***************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-label.entry.js ***!
  \***************************************************************************/
/*! exports provided: gds_label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_label", function() { return GdsLabel; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLabelCss = ":host{font-family:var(--label-font-family);text-transform:uppercase}.size-l{font-size:var(--label-l-font-size);line-height:19px;letter-spacing:var(--label-l-letter-spacing);font-weight:var(--label-l-font-weight)}.size-m{font-size:var(--label-m-font-size);line-height:16px;letter-spacing:var(--label-m-letter-spacing);font-weight:var(--label-m-font-weight)}.size-s{font-size:var(--label-s-font-size);line-height:14px;letter-spacing:var(--label-s-letter-spacing);font-weight:var(--label-s-font-weight)}";
var GdsLabel = /** @class */ (function () {
    function GdsLabel(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Size of the label.
         */
        this.size = 'm';
    }
    GdsLabel.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], { style: {
                color: this.color,
            } }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", { class: "size-" + this.size }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null))));
    };
    return GdsLabel;
}());
GdsLabel.style = gdsLabelCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-link.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-link.entry.js ***!
  \**************************************************************************/
/*! exports provided: gds_link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_link", function() { return GdsLink; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLinkCss = "a{text-decoration:none;color:inherit;display:inline-block}.block{display:block}";
var GdsLink = /** @class */ (function () {
    function GdsLink(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsLink.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("a", { class: {
                block: this.block,
            }, href: this.href, target: this.target }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    };
    return GdsLink;
}());
GdsLink.style = gdsLinkCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid-item.entry.js":
/*!************************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid-item.entry.js ***!
  \************************************************************************************/
/*! exports provided: gds_logo_grid_item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_logo_grid_item", function() { return GdsLogoGridItem; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLogoGridItemCss = ":host{display:block;contain:content;}.image{display:block;position:relative;width:100%;height:100%}img{width:100%;height:100%;-o-object-fit:contain;object-fit:contain;-o-object-position:50% 50%;object-position:50% 50%}a{width:100%;height:100%}.gds-logo-grid-item-container{width:70%;height:70%;padding:15%}";
var GdsLogoGridItem = /** @class */ (function () {
    function GdsLogoGridItem(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsLogoGridItem.prototype.render = function () {
        // Main content
        var content = (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-logo-grid-item-container" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("picture", { class: "image" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("source", { srcSet: this.imageUrl }), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: this.imageUrl }))));
        // Render without a link
        if (!this.href)
            return content;
        // Render with a link
        // FIXME: Not vertically aligns now that gds-link is using shadown dom.
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", { block: true, href: this.href, target: this.target }, content));
    };
    return GdsLogoGridItem;
}());
GdsLogoGridItem.style = gdsLogoGridItemCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid.entry.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid.entry.js ***!
  \*******************************************************************************/
/*! exports provided: gds_logo_grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_logo_grid", function() { return GdsLogoGrid; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLogoGridCss = ":host{display:grid;grid-template-columns:repeat(auto-fit, 263px);grid-template-rows:repeat(auto-fill, 263px);grid-gap:0;-ms-flex-pack:center;justify-content:center;max-width:1060px}::slotted(gds-logo-grid-item){border-top:1px solid black;border-top:1px solid var(--border-color-light);border-left:1px solid var(--border-color-light)}@media (max-width: 1023px){:host{grid-template-columns:repeat(auto-fit, 180px);grid-template-rows:repeat(auto-fill, 180px)}::slotted(:first-child),::slotted(:nth-child(2)){border-top:none}::slotted(:first-child),::slotted(:nth-child(2n+1)){border-left:none}}@media (min-width: 1024px){::slotted(:first-child),::slotted(:nth-child(2)),::slotted(:nth-child(3)),::slotted(:nth-child(4)){border-top:none}::slotted(:first-child),::slotted(:nth-child(4n+1)){border-left:none}}";
var GdsLogoGrid = /** @class */ (function () {
    function GdsLogoGrid(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsLogoGrid.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
    };
    return GdsLogoGrid;
}());
GdsLogoGrid.style = gdsLogoGridCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-media-card.entry.js":
/*!********************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-media-card.entry.js ***!
  \********************************************************************************/
/*! exports provided: gds_media_card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_media_card", function() { return GdsMediaCard; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMediaCardCss = ".media-card{position:relative;display:inline-block}.media{position:relative;width:100%;height:var(--media-card-media-height, 300px)}.image{width:100%;height:var(--media-card-media-height, 300px);display:block;-o-object-fit:cover;object-fit:cover}.superimpose{width:100%;height:var(--media-card-media-height, 300px);position:absolute;z-index:1}.superimpose>.superimpose-image{position:absolute;top:0;bottom:0;left:0;right:0}.superimpose>.superimpose-image>img{display:block;position:relative;height:100%;width:100%;-o-object-fit:contain;object-fit:contain}.headline{margin-bottom:0 0 var(--spacing-xxs) 0}.description{margin:0 0 var(--spacing-s) 0}.tags{margin:0 0 var(--spacing-xxs) 0}.content{padding:var(--spacing-m) var(--spacing-xs)}";
var GdsMediaCard = /** @class */ (function () {
    function GdsMediaCard(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsMediaCard.prototype.render = function () {
        // Main card
        var card = (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-card", null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "media", style: {
                marginBottom: this.superimposeBottom && this.superimposeBottom + "px",
            } }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: this.imageUrl, class: "image" })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "content" }, this.headline && (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "headline" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-heading", { size: "s" }, this.headline))), this.description && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-paragraph", { class: "description" }, this.description), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "tags" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "tags" })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "content" }))));
        // Optional superimposed image.
        // Note: Superimpose needs to be outside of card because it has overflow hidden.
        var superimpose = this.superimposeUrl && (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "superimpose" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "superimpose-image", style: {
                top: this.superimposeTop && "-" + this.superimposeTop + "px",
                bottom: this.superimposeBottom && "-" + this.superimposeBottom + "px",
                left: this.superimposeLeft && "-" + this.superimposeLeft + "px",
                right: this.superimposeRight && "-" + this.superimposeRight + "px",
            } }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", { src: this.superimposeUrl }))));
        // Container for card and superimpose image
        var mediaCard = (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "media-card", style: {
                paddingTop: this.superimposeTop && this.superimposeTop + "px",
            } }, superimpose, card));
        // Render without a link
        if (!this.href)
            return mediaCard;
        // Render with a link
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", { href: this.href, target: this.target }, mediaCard));
    };
    return GdsMediaCard;
}());
GdsMediaCard.style = gdsMediaCardCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-menu-item.entry.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-menu-item.entry.js ***!
  \*******************************************************************************/
/*! exports provided: gds_menu_item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_menu_item", function() { return GdsMenuItem; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMenuItemCss = "li{-webkit-box-sizing:border-box;box-sizing:border-box;list-style:none}@media (max-width: 767px){.active{background-color:var(--background-color-primary)}}.content{height:var(--spacing-xxl);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;padding:0 var(--spacing-m)}@media (min-width: 1024px){.content{padding:0 var(--spacing-s)}}:host-context(.vertical) .content{padding:0 var(--spacing-m)}:host-context(.horizontal) .content{padding:0 var(--spacing-s)}.underline-container{position:relative;width:100%;height:0}@media (max-width: 1023px){.underline-container{display:none}}.underline{position:absolute;width:100%;top:4px;border-bottom:3px solid var(--navigation-color)}.divider{margin:var(--spacing-m) 0;border-top:2px solid var(--background-color-primary)}";
var GdsMenuItem = /** @class */ (function () {
    function GdsMenuItem(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsMenuItem.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("li", { class: {
                item: true,
                active: this.active,
            } }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "content" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-label", { size: "l" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), this.active && (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "underline-container" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "underline" }))))));
    };
    return GdsMenuItem;
}());
GdsMenuItem.style = gdsMenuItemCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-menu.entry.js":
/*!**************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-menu.entry.js ***!
  \**************************************************************************/
/*! exports provided: gds_menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_menu", function() { return GdsMenu; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMenuCss = "ul{padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}@media (min-width: 1024px){ul{-ms-flex-direction:row;flex-direction:row}}.vertical{-ms-flex-direction:column;flex-direction:column}.horizontal{-ms-flex-direction:row;flex-direction:row}::slotted(a){color:unset;text-decoration:none}";
var GdsMenu = /** @class */ (function () {
    function GdsMenu(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsMenu.prototype.render = function () {
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ul", { class: this.direction }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "item" })));
    };
    return GdsMenu;
}());
GdsMenu.style = gdsMenuCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-navigation.entry.js":
/*!********************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-navigation.entry.js ***!
  \********************************************************************************/
/*! exports provided: gds_navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_navigation", function() { return GdsNavigation; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsNavigationCss = "header.gds-navigation-header{background-color:var(--navigation-background-color)}.gds-navigation-container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding-right:var(--spacing-xs);height:var(--navigation-mobile-height)}@media (min-width: 1024px){.gds-navigation-container{height:var(--navigation-desktop-height)}}.gds-navigation-container a{color:var(--navigation-color)}.gds-navigation-content{display:-ms-flexbox;display:flex}@media (max-width: 1023px){.gds-navigation-content{display:none;position:absolute;background-color:white;top:var(--navigation-mobile-height);left:0;right:0;border-top:2px solid var(--body-background-color);z-index:100}}.gds-navigation-mobile-extensions{display:block;border-top:2px solid var(--body-background-color);padding:var(--spacing-l) 0}@media (min-width: 1024px){.gds-navigation-mobile-extensions{display:none}}.gds-navigation-desktop-extensions{min-width:100px}@media (max-width: 1023px){.gds-navigation-desktop-extensions{display:none}}@media (max-width: 1023px){nav.gds-navigation-nav{margin:var(--spacing-l) 0}}.gds-navigation-hamburger{--button-l-font-size:30px;--button-l-padding:16px}@media (min-width: 1024px){.gds-navigation-hamburger{display:none}}.gds-navigation-logo{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding-left:var(--spacing-l);height:var(--navigation-mobile-height)}.gds-navigation-logo img{height:32px}@media (min-width: 1024px){.gds-navigation-logo{height:var(--navigation-desktop-height)}.gds-navigation-logo img{height:48px}}";
var GdsNavigation = /** @class */ (function () {
    function GdsNavigation(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Mobile menu icon.
         */
        this.menuIcon = '☰';
    }
    GdsNavigation.prototype.render = function () {
        var _this = this;
        // Toggle manu open (mobile only).
        var onHamburgerClick = function () {
            var style = window.getComputedStyle(_this.content);
            if (style.display === 'none') {
                _this.content.style.display = 'block';
                _this.menuIcon = '✕';
                _this.open = true;
            }
            else {
                _this.content.style.display = 'none';
                _this.menuIcon = '☰';
                _this.open = false;
            }
        };
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("header", { class: "gds-navigation-header" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-container" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-logo" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "logo" })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-content", ref: function (el) { return (_this.content = el); } }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("nav", { class: "gds-navigation-nav" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "menu" })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-mobile-extensions" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "mobile-extensions" }))), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-desktop-extensions" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", { name: "desktop-extensions" })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-navigation-hamburger" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-button", { size: "l", text: true, onClick: onHamburgerClick }, this.menuIcon))))));
    };
    return GdsNavigation;
}());
GdsNavigation.style = gdsNavigationCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/gds-tag.entry.js":
/*!*************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/gds-tag.entry.js ***!
  \*************************************************************************/
/*! exports provided: gds_tag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_tag", function() { return GdsTag; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsTagCss = ".gds-tag{display:inline-block;color:var(--tag-color, white);background-color:var(--tag-background-color, black);padding:4px 12px 6px 12px;border-radius:10px;border:1px solid var(--tag-border-color, transparent)}";
var GdsTag = /** @class */ (function () {
    function GdsTag(hostRef) {
        Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    }
    GdsTag.prototype.render = function () {
        // Main content
        var tag = (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", { class: "gds-tag" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-label", { color: "inherit", size: "s" }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null))));
        // Render without a link
        if (!this.href)
            return tag;
        // Render with a link
        return (Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", { href: this.href, target: this.target }, tag));
    };
    return GdsTag;
}());
GdsTag.style = gdsTagCss;



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js":
/*!**************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js ***!
  \**************************************************************************/
/*! exports provided: H, a, b, h, p, r */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return Host; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return patchEsm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return bootstrapLazy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return patchBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return registerInstance; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var NAMESPACE = 'gds';
var scopeId;
var contentRef;
var hostTagName;
var useNativeShadowDom = false;
var checkSlotFallbackVisibility = false;
var checkSlotRelocate = false;
var isSvgMode = false;
var queuePending = false;
var win = typeof window !== 'undefined' ? window : {};
var CSS = win.CSS;
var doc = win.document || { head: {} };
var plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: function (h) { return h(); },
    raf: function (h) { return requestAnimationFrame(h); },
    ael: function (el, eventName, listener, opts) { return el.addEventListener(eventName, listener, opts); },
    rel: function (el, eventName, listener, opts) { return el.removeEventListener(eventName, listener, opts); },
};
var supportsShadow = /*@__PURE__*/ (function () { return (doc.head.attachShadow + '').indexOf('[native') > -1; })();
var promiseResolve = function (v) { return Promise.resolve(v); };
var supportsConstructibleStylesheets = /*@__PURE__*/ (function () {
    try {
        new CSSStyleSheet();
        return true;
    }
    catch (e) { }
    return false;
})();
var HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
var createTime = function (fnName, tagName) {
    if (tagName === void 0) { tagName = ''; }
    {
        return function () {
            return;
        };
    }
};
var uniqueTime = function (key, measureText) {
    {
        return function () {
            return;
        };
    }
};
var rootAppliedStyles = new WeakMap();
var registerStyle = function (scopeId, cssText, allowCS) {
    var style = styles.get(scopeId);
    if (supportsConstructibleStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        style.replace(cssText);
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
var addStyle = function (styleContainerNode, cmpMeta, mode, hostElm) {
    var scopeId = getScopeId(cmpMeta.$tagName$);
    var style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            var appliedStyles = rootAppliedStyles.get(styleContainerNode);
            var styleElm = void 0;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    if (plt.$cssShim$) {
                        styleElm = plt.$cssShim$.createHostStyle(hostElm, scopeId, style, !!(cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */));
                        var newScopeId = styleElm['s-sc'];
                        if (newScopeId) {
                            scopeId = newScopeId;
                            // we don't want to add this styleID to the appliedStyles Set
                            // since the cssVarShim might need to apply several different
                            // stylesheets for the same component
                            appliedStyles = null;
                        }
                    }
                    else {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = __spreadArrays(styleContainerNode.adoptedStyleSheets, [style]);
        }
    }
    return scopeId;
};
var attachStyles = function (hostRef) {
    var cmpMeta = hostRef.$cmpMeta$;
    var elm = hostRef.$hostElement$;
    var flags = cmpMeta.$flags$;
    var endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    var scopeId = addStyle(supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$, elm);
    if (flags & 10 /* needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
var getScopeId = function (tagName, mode) { return 'sc-' + (tagName); };
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
var EMPTY_OBJ = {};
var isDef = function (v) { return v != null; };
var isComplexType = function (o) {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
var getDynamicImportFunction = function (namespace) { return "__sc_import_" + namespace.replace(/\s|-/g, '_'); };
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// const stack: any[] = [];
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
var h = function (nodeName, vnodeData) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var child = null;
    var slotName = null;
    var simple = false;
    var lastSimple = false;
    var vNodeChildren = [];
    var walk = function (c) {
        for (var i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        if (vnodeData.name) {
            slotName = vnodeData.name;
        }
        {
            var classData_1 = vnodeData.className || vnodeData.class;
            if (classData_1) {
                vnodeData.class =
                    typeof classData_1 !== 'object'
                        ? classData_1
                        : Object.keys(classData_1)
                            .filter(function (k) { return classData_1[k]; })
                            .join(' ');
            }
        }
    }
    var vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
var newVNode = function (tag, text) {
    var vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$name$ = null;
    }
    return vnode;
};
var Host = {};
var isHost = function (node) { return node && node.$tag$ === Host; };
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
var setAccessor = function (elm, memberName, oldValue, newValue, isSvg, flags) {
    if (oldValue !== newValue) {
        var isProp = isMemberInElement(elm, memberName);
        var ln = memberName.toLowerCase();
        if (memberName === 'class') {
            var classList = elm.classList;
            var oldClasses_1 = parseClassList(oldValue);
            var newClasses_1 = parseClassList(newValue);
            classList.remove.apply(classList, oldClasses_1.filter(function (c) { return c && !newClasses_1.includes(c); }));
            classList.add.apply(classList, newClasses_1.filter(function (c) { return c && !oldClasses_1.includes(c); }));
        }
        else if (memberName === 'style') {
            // update style attribute, css properties and values
            {
                for (var prop in oldValue) {
                    if (!newValue || newValue[prop] == null) {
                        if (prop.includes('-')) {
                            elm.style.removeProperty(prop);
                        }
                        else {
                            elm.style[prop] = '';
                        }
                    }
                }
            }
            for (var prop in newValue) {
                if (!oldValue || newValue[prop] !== oldValue[prop]) {
                    if (prop.includes('-')) {
                        elm.style.setProperty(prop, newValue[prop]);
                    }
                    else {
                        elm.style[prop] = newValue[prop];
                    }
                }
            }
        }
        else if (memberName === 'ref') {
            // minifier will clean this up
            if (newValue) {
                newValue(elm);
            }
        }
        else if ((!isProp) && memberName[0] === 'o' && memberName[1] === 'n') {
            // Event Handlers
            // so if the member name starts with "on" and the 3rd characters is
            // a capital letter, and it's not already a member on the element,
            // then we're assuming it's an event listener
            if (memberName[2] === '-') {
                // on- prefixed events
                // allows to be explicit about the dom event to listen without any magic
                // under the hood:
                // <my-cmp on-click> // listens for "click"
                // <my-cmp on-Click> // listens for "Click"
                // <my-cmp on-ionChange> // listens for "ionChange"
                // <my-cmp on-EVENTS> // listens for "EVENTS"
                memberName = memberName.slice(3);
            }
            else if (isMemberInElement(win, ln)) {
                // standard event
                // the JSX attribute could have been "onMouseOver" and the
                // member name "onmouseover" is on the window's prototype
                // so let's add the listener "mouseover", which is all lowercased
                memberName = ln.slice(2);
            }
            else {
                // custom event
                // the JSX attribute could have been "onMyCustomEvent"
                // so let's trim off the "on" prefix and lowercase the first character
                // and add the listener "myCustomEvent"
                // except for the first character, we keep the event name case
                memberName = ln[2] + memberName.slice(3);
            }
            if (oldValue) {
                plt.rel(elm, memberName, oldValue, false);
            }
            if (newValue) {
                plt.ael(elm, memberName, newValue, false);
            }
        }
        else {
            // Set property if it exists and it's not a SVG
            var isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        var n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                            // tslint:disable-next-line: triple-equals
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            if (newValue == null || newValue === false) {
                {
                    elm.removeAttribute(memberName);
                }
            }
            else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
var parseClassListRegex = /\s/;
var parseClassList = function (value) { return (!value ? [] : value.split(parseClassListRegex)); };
var updateElement = function (oldVnode, newVnode, isSvgMode, memberName) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    var elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
    var oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    var newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
var createElm = function (oldParentVNode, newParentVNode, childIndex, parentElm) {
    // tslint:disable-next-line: prefer-const
    var newVNode = newParentVNode.$children$[childIndex];
    var i = 0;
    var elm;
    var childNode;
    var oldVNode;
    if (!useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if (newVNode.$tag$ === 'slot') {
            if (scopeId) {
                // scoped css needs to add its scoped id to the parent element
                parentElm.classList.add(scopeId + '-s');
            }
            newVNode.$flags$ |= newVNode.$children$
                ? // slot element has fallback content
                    2 /* isSlotFallback */
                : // slot element does not have fallback content
                    1 /* isSlotReference */;
        }
    }
    if (newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if (newVNode.$flags$ & 1 /* isSlotReference */) {
        // create a slot reference node
        elm = newVNode.$elm$ = doc.createTextNode('');
    }
    else {
        // create element
        elm = newVNode.$elm$ = (doc.createElement(newVNode.$flags$ & 2 /* isSlotFallback */ ? 'slot-fb' : newVNode.$tag$));
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i, elm);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
    }
    {
        elm['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
            // remember the content reference comment
            elm['s-sr'] = true;
            // remember the content reference comment
            elm['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            elm['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return elm;
};
var putBackInOriginalLocation = function (parentElm, recursive) {
    plt.$flags$ |= 1 /* isTmpDisconnected */;
    var oldSlotChildNodes = parentElm.childNodes;
    for (var i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        var childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
            // // this child node in the old element is from another component
            // // remove this node from the old slot's parent
            // childNode.remove();
            // and relocate it back to it's original location
            parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
            // remove the old original location comment entirely
            // later on the patch function will know what to do
            // and move this to the correct spot in need be
            childNode['s-ol'].remove();
            childNode['s-ol'] = undefined;
            checkSlotRelocate = true;
        }
        if (recursive) {
            putBackInOriginalLocation(childNode, recursive);
        }
    }
    plt.$flags$ &= ~1 /* isTmpDisconnected */;
};
var addVnodes = function (parentElm, before, parentVNode, vnodes, startIdx, endIdx) {
    var containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    var childNode;
    if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, referenceNode(before));
            }
        }
    }
};
var removeVnodes = function (vnodes, startIdx, endIdx, vnode, elm) {
    for (; startIdx <= endIdx; ++startIdx) {
        if ((vnode = vnodes[startIdx])) {
            elm = vnode.$elm$;
            callNodeRefs(vnode);
            {
                // we're removing this element
                // so it's possible we need to show slot fallback content now
                checkSlotFallbackVisibility = true;
                if (elm['s-ol']) {
                    // remove the original location comment
                    elm['s-ol'].remove();
                }
                else {
                    // it's possible that child nodes of the node
                    // that's being removed are slot nodes
                    putBackInOriginalLocation(elm, true);
                }
            }
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
var updateChildren = function (parentElm, oldCh, newVNode, newCh) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var node;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // Vnode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
            }
            patch(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            {
                // new element
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                {
                    parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
var isSameVnode = function (vnode1, vnode2) {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (vnode1.$tag$ === vnode2.$tag$) {
        if (vnode1.$tag$ === 'slot') {
            return vnode1.$name$ === vnode2.$name$;
        }
        return true;
    }
    return false;
};
var referenceNode = function (node) {
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return (node && node['s-ol']) || node;
};
var parentReferenceNode = function (node) { return (node['s-ol'] ? node['s-ol'] : node).parentNode; };
var patch = function (oldVNode, newVNode) {
    var elm = (newVNode.$elm$ = oldVNode.$elm$);
    var oldChildren = oldVNode.$children$;
    var newChildren = newVNode.$children$;
    var tag = newVNode.$tag$;
    var text = newVNode.$text$;
    var defaultHolder;
    if (text === null) {
        // element node
        {
            if (tag === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if (oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
    else if ((defaultHolder = elm['s-cr'])) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = text;
    }
    else if (oldVNode.$text$ !== text) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = text;
    }
};
var updateFallbackSlotVisibility = function (elm) {
    // tslint:disable-next-line: prefer-const
    var childNodes = elm.childNodes;
    var childNode;
    var i;
    var ilen;
    var j;
    var slotNameAttr;
    var nodeType;
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === 1 /* ElementNode */) {
            if (childNode['s-sr']) {
                // this is a slot fallback node
                // get the slot name for this slot reference node
                slotNameAttr = childNode['s-sn'];
                // by default always show a fallback slot node
                // then hide it if there are other slots in the light dom
                childNode.hidden = false;
                for (j = 0; j < ilen; j++) {
                    if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                        // this sibling node is from a different component
                        nodeType = childNodes[j].nodeType;
                        if (slotNameAttr !== '') {
                            // this is a named fallback slot node
                            if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                        else {
                            // this is a default fallback slot node
                            // any element or text node (with content)
                            // should hide the default fallback slot node
                            if (nodeType === 1 /* ElementNode */ || (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                    }
                }
            }
            // keep drilling down
            updateFallbackSlotVisibility(childNode);
        }
    }
};
var relocateNodes = [];
var relocateSlotContent = function (elm) {
    // tslint:disable-next-line: prefer-const
    var childNode;
    var node;
    var hostContentNodes;
    var slotNameAttr;
    var relocateNodeData;
    var j;
    var i = 0;
    var childNodes = elm.childNodes;
    var ilen = childNodes.length;
    for (; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
            // first got the content reference comment node
            // then we got it's parent, which is where all the host content is in now
            hostContentNodes = node.parentNode.childNodes;
            slotNameAttr = childNode['s-sn'];
            for (j = hostContentNodes.length - 1; j >= 0; j--) {
                node = hostContentNodes[j];
                if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                    // let's do some relocating to its new home
                    // but never relocate a content reference node
                    // that is suppose to always represent the original content location
                    if (isNodeLocatedInSlot(node, slotNameAttr)) {
                        // it's possible we've already decided to relocate this node
                        relocateNodeData = relocateNodes.find(function (r) { return r.$nodeToRelocate$ === node; });
                        // made some changes to slots
                        // let's make sure we also double check
                        // fallbacks are correctly hidden or shown
                        checkSlotFallbackVisibility = true;
                        node['s-sn'] = node['s-sn'] || slotNameAttr;
                        if (relocateNodeData) {
                            // previously we never found a slot home for this node
                            // but turns out we did, so let's remember it now
                            relocateNodeData.$slotRefNode$ = childNode;
                        }
                        else {
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                $slotRefNode$: childNode,
                                $nodeToRelocate$: node,
                            });
                        }
                        if (node['s-sr']) {
                            relocateNodes.map(function (relocateNode) {
                                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                    relocateNodeData = relocateNodes.find(function (r) { return r.$nodeToRelocate$ === node; });
                                    if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                        relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                    }
                                }
                            });
                        }
                    }
                    else if (!relocateNodes.some(function (r) { return r.$nodeToRelocate$ === node; })) {
                        // so far this element does not have a slot home, not setting slotRefNode on purpose
                        // if we never find a home for this element then we'll need to hide it
                        relocateNodes.push({
                            $nodeToRelocate$: node,
                        });
                    }
                }
            }
        }
        if (childNode.nodeType === 1 /* ElementNode */) {
            relocateSlotContent(childNode);
        }
    }
};
var isNodeLocatedInSlot = function (nodeToRelocate, slotNameAttr) {
    if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
        if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
            return true;
        }
        if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
            return true;
        }
        return false;
    }
    if (nodeToRelocate['s-sn'] === slotNameAttr) {
        return true;
    }
    return slotNameAttr === '';
};
var callNodeRefs = function (vNode) {
    {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.map(callNodeRefs);
    }
};
var renderVdom = function (hostRef, renderFnResults) {
    var hostElm = hostRef.$hostElement$;
    var cmpMeta = hostRef.$cmpMeta$;
    var oldVNode = hostRef.$vnode$ || newVNode(null, null);
    var rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if (cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(function (_a) {
            var propName = _a[0], attribute = _a[1];
            return (rootVnode.$attrs$[attribute] = hostElm[propName]);
        });
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm);
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
        // always reset
        checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
    {
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
        plt.$flags$ |= 1 /* isTmpDisconnected */;
        if (checkSlotRelocate) {
            relocateSlotContent(rootVnode.$elm$);
            var relocateData = void 0;
            var nodeToRelocate = void 0;
            var orgLocationNode = void 0;
            var parentNodeRef = void 0;
            var insertBeforeNode = void 0;
            var refNode = void 0;
            var i = 0;
            for (; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (!nodeToRelocate['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    orgLocationNode = doc.createTextNode('');
                    orgLocationNode['s-nr'] = nodeToRelocate;
                    nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                }
            }
            for (i = 0; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (relocateData.$slotRefNode$) {
                    // by default we're just going to insert it directly
                    // after the slot reference node
                    parentNodeRef = relocateData.$slotRefNode$.parentNode;
                    insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                    orgLocationNode = nodeToRelocate['s-ol'];
                    while ((orgLocationNode = orgLocationNode.previousSibling)) {
                        refNode = orgLocationNode['s-nr'];
                        if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                            refNode = refNode.nextSibling;
                            if (!refNode || !refNode['s-nr']) {
                                insertBeforeNode = refNode;
                                break;
                            }
                        }
                    }
                    if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) || nodeToRelocate.nextSibling !== insertBeforeNode) {
                        // we've checked that it's worth while to relocate
                        // since that the node to relocate
                        // has a different next sibling or parent relocated
                        if (nodeToRelocate !== insertBeforeNode) {
                            if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                // probably a component in the index.html that doesn't have it's hostname set
                                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                            }
                            // add it back to the dom but in its new home
                            parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                        }
                    }
                }
                else {
                    // this node doesn't have a slot home to go to, so let's hide it
                    if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                        nodeToRelocate.hidden = true;
                    }
                }
            }
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        // done moving nodes around
        // allow the disconnect callback to work again
        plt.$flags$ &= ~1 /* isTmpDisconnected */;
        // always reset
        relocateNodes.length = 0;
    }
};
var emitEvent = function (elm, name, opts) {
    var ev = new (CustomEvent)(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
var attachToAncestor = function (hostRef, ancestorComponent) {
    if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
        ancestorComponent['s-p'].push(new Promise(function (r) { return (hostRef.$onRenderResolve$ = r); }));
    }
};
var scheduleUpdate = function (hostRef, isInitialLoad) {
    {
        hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
    }
    if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* needsRerender */;
        return;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestorc omponent or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    var dispatch = function () { return dispatchHooks(hostRef, isInitialLoad); };
    return writeTask(dispatch);
};
var dispatchHooks = function (hostRef, isInitialLoad) {
    var endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    var instance = hostRef.$lazyInstance$;
    var promise;
    endSchedule();
    return then(promise, function () { return (updateComponent(hostRef, instance, isInitialLoad)); });
};
var updateComponent = function (hostRef, instance, isInitialLoad) {
    // updateComponent
    var elm = hostRef.$hostElement$;
    var endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    var rc = elm['s-rc'];
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    var endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        {
            // looks like we've got child nodes to render into this host element
            // or we need to update the css class/attrs on the host element
            // DOM WRITE!
            renderVdom(hostRef, callRender(instance));
        }
    }
    if (plt.$cssShim$) {
        plt.$cssShim$.updateHost(elm);
    }
    {
        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
        hostRef.$flags$ |= 2 /* hasRendered */;
    }
    if (rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.map(function (cb) { return cb(); });
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        var childrenPromises = elm['s-p'];
        var postUpdate = function () { return postUpdateComponent(hostRef); };
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
var callRender = function (instance) {
    try {
        instance = instance.render();
    }
    catch (e) {
        consoleError(e);
    }
    return instance;
};
var postUpdateComponent = function (hostRef) {
    var tagName = hostRef.$cmpMeta$.$tagName$;
    var elm = hostRef.$hostElement$;
    var endPostUpdate = createTime('postUpdate', tagName);
    var ancestorComponent = hostRef.$ancestorComponent$;
    if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* hasLoadedComponent */;
        {
            // DOM WRITE!
            addHydratedFlag(elm);
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        endPostUpdate();
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* needsRerender */) {
            nextTick(function () { return scheduleUpdate(hostRef, false); });
        }
        hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
var forceUpdate = function (ref) {
    {
        var hostRef = getHostRef(ref);
        var isConnected = hostRef.$hostElement$.isConnected;
        if (isConnected && (hostRef.$flags$ & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
            scheduleUpdate(hostRef, false);
        }
        // Returns "true" when the forced update was successfully scheduled
        return isConnected;
    }
};
var appDidLoad = function (who) {
    // on appload
    // we have finish the first big initial render
    {
        addHydratedFlag(doc.documentElement);
    }
    nextTick(function () { return emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }); });
};
var then = function (promise, thenFn) {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
var addHydratedFlag = function (elm) { return (elm.classList.add('hydrated')); };
var parsePropertyValue = function (propValue, propType) {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if (propType & 4 /* Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if (propType & 2 /* Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if (propType & 1 /* String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
var getValue = function (ref, propName) { return getHostRef(ref).$instanceValues$.get(propName); };
var setValue = function (ref, propName, newVal, cmpMeta) {
    // check our new property value against our internal value
    var hostRef = getHostRef(ref);
    var oldVal = hostRef.$instanceValues$.get(propName);
    var flags = hostRef.$flags$;
    var instance = hostRef.$lazyInstance$;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    if ((!(flags & 8 /* isConstructingInstance */) || oldVal === undefined) && newVal !== oldVal) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if (instance) {
            if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
var proxyComponent = function (Cstr, cmpMeta, flags) {
    if (cmpMeta.$members$) {
        // It's better to have a const than two Object.entries()
        var members = Object.entries(cmpMeta.$members$);
        var prototype_1 = Cstr.prototype;
        members.map(function (_a) {
            var memberName = _a[0], memberFlags = _a[1][0];
            if ((memberFlags & 31 /* Prop */ || ((flags & 2 /* proxyState */) && memberFlags & 32 /* State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype_1, memberName, {
                    get: function () {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set: function (newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
        });
        if ((flags & 1 /* isElementConstructor */)) {
            var attrNameToPropName_1 = new Map();
            prototype_1.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                var _this = this;
                plt.jmp(function () {
                    var propName = attrNameToPropName_1.get(attrName);
                    _this[propName] = newValue === null && typeof _this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(function (_a) {
                var _ = _a[0], m = _a[1];
                return m[0] & 15;
            } /* HasAttribute */) // filter to only keep props that should match attributes
                .map(function (_a) {
                var propName = _a[0], m = _a[1];
                var attrName = m[1] || propName;
                attrNameToPropName_1.set(attrName, propName);
                if (m[0] & 512 /* ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
var initializeComponent = function (elm, hostRef, cmpMeta, hmrVersionId, Cstr) { return __awaiter(void 0, void 0, void 0, function () {
    var endLoad, endNewInstance, scopeId_1, endRegisterStyles, style_1, ancestorComponent, schedule;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0)) return [3 /*break*/, 5];
                // we haven't initialized this element yet
                hostRef.$flags$ |= 32 /* hasInitializedComponent */;
                // lazy loaded components
                // request the component's implementation to be
                // wired up with the host element
                Cstr = loadModule(cmpMeta);
                if (!Cstr.then) return [3 /*break*/, 2];
                endLoad = uniqueTime();
                return [4 /*yield*/, Cstr];
            case 1:
                Cstr = _a.sent();
                endLoad();
                _a.label = 2;
            case 2:
                if (!Cstr.isProxied) {
                    proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                    Cstr.isProxied = true;
                }
                endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
                // ok, time to construct the instance
                // but let's keep track of when we start and stop
                // so that the getters/setters don't incorrectly step on data
                {
                    hostRef.$flags$ |= 8 /* isConstructingInstance */;
                }
                // construct the lazy-loaded component implementation
                // passing the hostRef is very important during
                // construction in order to directly wire together the
                // host element and the lazy-loaded instance
                try {
                    new Cstr(hostRef);
                }
                catch (e) {
                    consoleError(e);
                }
                {
                    hostRef.$flags$ &= ~8 /* isConstructingInstance */;
                }
                endNewInstance();
                scopeId_1 = getScopeId(cmpMeta.$tagName$);
                if (!(!styles.has(scopeId_1) && Cstr.style)) return [3 /*break*/, 5];
                endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                style_1 = Cstr.style;
                if (!(cmpMeta.$flags$ & 8) /* needsShadowDomShim */) return [3 /*break*/, 4]; /* needsShadowDomShim */
                return [4 /*yield*/, __webpack_require__.e(/*! import() */ "/scripts/vendor").then(__webpack_require__.bind(null, /*! ./shadow-css-b85eee6e.js */ "./node_modules/genero-design-system/dist/esm-es5/shadow-css-b85eee6e.js")).then(function (m) { return m.scopeCss(style_1, scopeId_1, false); })];
            case 3:
                style_1 = _a.sent();
                _a.label = 4;
            case 4:
                registerStyle(scopeId_1, style_1, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
                endRegisterStyles();
                _a.label = 5;
            case 5:
                ancestorComponent = hostRef.$ancestorComponent$;
                schedule = function () { return scheduleUpdate(hostRef, true); };
                if (ancestorComponent && ancestorComponent['s-rc']) {
                    // this is the intial load and this component it has an ancestor component
                    // but the ancestor component has NOT fired its will update lifecycle yet
                    // so let's just cool our jets and wait for the ancestor to continue first
                    // this will get fired off when the ancestor component
                    // finally gets around to rendering its lazy self
                    // fire off the initial update
                    ancestorComponent['s-rc'].push(schedule);
                }
                else {
                    schedule();
                }
                return [2 /*return*/];
        }
    });
}); };
var connectedCallback = function (elm) {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        var hostRef_1 = getHostRef(elm);
        var cmpMeta_1 = hostRef_1.$cmpMeta$;
        var endConnected = createTime('connectedCallback', cmpMeta_1.$tagName$);
        if (!(hostRef_1.$flags$ & 1 /* hasConnected */)) {
            // first time this component has connected
            hostRef_1.$flags$ |= 1 /* hasConnected */;
            {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                if ((cmpMeta_1.$flags$ & (4 /* hasSlotRelocation */ | 8 /* needsShadowDomShim */))) {
                    setContentReference(elm);
                }
            }
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                var ancestorComponent = elm;
                while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if (ancestorComponent['s-p']) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef_1, (hostRef_1.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta_1.$members$) {
                Object.entries(cmpMeta_1.$members$).map(function (_a) {
                    var memberName = _a[0], memberFlags = _a[1][0];
                    if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
                        var value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                // connectedCallback, taskQueue, initialLoad
                // angular sets attribute AFTER connectCallback
                // https://github.com/angular/angular/issues/18909
                // https://github.com/angular/angular/issues/19940
                nextTick(function () { return initializeComponent(elm, hostRef_1, cmpMeta_1); });
            }
        }
        endConnected();
    }
};
var setContentReference = function (elm) {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    var contentRefElm = (elm['s-cr'] = doc.createComment(''));
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};
var disconnectedCallback = function (elm) {
    if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
        var hostRef = getHostRef(elm);
        // clear CSS var-shim tracking
        if (plt.$cssShim$) {
            plt.$cssShim$.removeHost(elm);
        }
    }
};
var bootstrapLazy = function (lazyBundles, options) {
    if (options === void 0) { options = {}; }
    var endBootstrap = createTime();
    var cmpTags = [];
    var exclude = options.exclude || [];
    var customElements = win.customElements;
    var head = doc.head;
    var metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]');
    var visibilityStyle = /*@__PURE__*/ doc.createElement('style');
    var deferredConnectedCallbacks = [];
    var appLoadFallback;
    var isBootstrapping = true;
    Object.assign(plt, options);
    plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
    lazyBundles.map(function (lazyBundle) { return lazyBundle[1].map(function (compactMeta) {
        var cmpMeta = {
            $flags$: compactMeta[0],
            $tagName$: compactMeta[1],
            $members$: compactMeta[2],
            $listeners$: compactMeta[3],
        };
        {
            cmpMeta.$members$ = compactMeta[2];
        }
        {
            cmpMeta.$attrsToReflect$ = [];
        }
        if (!supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
        }
        var tagName = cmpMeta.$tagName$;
        var HostElement = /** @class */ (function (_super) {
            __extends(HostElement, _super);
            // StencilLazyHost
            function HostElement(self) {
                var _this = 
                // @ts-ignore
                _super.call(this, self) || this;
                self = _this;
                registerHost(self, cmpMeta);
                if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                    // this component is using shadow dom
                    // and this browser supports shadow dom
                    // add the read-only property "shadowRoot" to the host element
                    // adding the shadow root build conditionals to minimize runtime
                    if (supportsShadow) {
                        {
                            self.attachShadow({ mode: 'open' });
                        }
                    }
                    else if (!('shadowRoot' in self)) {
                        self.shadowRoot = self;
                    }
                }
                return _this;
            }
            HostElement.prototype.connectedCallback = function () {
                var _this = this;
                if (appLoadFallback) {
                    clearTimeout(appLoadFallback);
                    appLoadFallback = null;
                }
                if (isBootstrapping) {
                    // connectedCallback will be processed once all components have been registered
                    deferredConnectedCallbacks.push(this);
                }
                else {
                    plt.jmp(function () { return connectedCallback(_this); });
                }
            };
            HostElement.prototype.disconnectedCallback = function () {
                var _this = this;
                plt.jmp(function () { return disconnectedCallback(_this); });
            };
            HostElement.prototype.forceUpdate = function () {
                forceUpdate(this);
            };
            HostElement.prototype.componentOnReady = function () {
                return getHostRef(this).$onReadyPromise$;
            };
            return HostElement;
        }(HTMLElement));
        cmpMeta.$lazyBundleIds$ = lazyBundle[0];
        if (!exclude.includes(tagName) && !customElements.get(tagName)) {
            cmpTags.push(tagName);
            customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */));
        }
    }); });
    {
        visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
        visibilityStyle.setAttribute('data-styles', '');
        head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
    // Process deferred connectedCallbacks now all components have been registered
    isBootstrapping = false;
    if (deferredConnectedCallbacks.length) {
        deferredConnectedCallbacks.map(function (host) { return host.connectedCallback(); });
    }
    else {
        {
            plt.jmp(function () { return (appLoadFallback = setTimeout(appDidLoad, 30)); });
        }
    }
    // Fallback appLoad event
    endBootstrap();
};
var hostRefs = new WeakMap();
var getHostRef = function (ref) { return hostRefs.get(ref); };
var registerInstance = function (lazyInstance, hostRef) { return hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef); };
var registerHost = function (elm, cmpMeta) {
    var hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    {
        hostRef.$onReadyPromise$ = new Promise(function (r) { return (hostRef.$onReadyResolve$ = r); });
        elm['s-p'] = [];
        elm['s-rc'] = [];
    }
    return hostRefs.set(elm, hostRef);
};
var isMemberInElement = function (elm, memberName) { return memberName in elm; };
var consoleError = function (e) { return console.error(e); };
var cmpModules = /*@__PURE__*/ new Map();
var loadModule = function (cmpMeta, hostRef, hmrVersionId) {
    // loadModuleImport
    var exportName = cmpMeta.$tagName$.replace(/-/g, '_');
    var bundleId = (cmpMeta.$lazyBundleIds$);
    var module = cmpModules.get(bundleId);
    if (module) {
        return module[exportName];
    }
    return __webpack_require__("./node_modules/genero-design-system/dist/esm-es5 lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$")("./" + bundleId + ".entry.js").then(function (importedModule) {
        {
            cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
    }, consoleError);
};
var styles = new Map();
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = function (queue, write) { return function (cb) {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
}; };
var consume = function (queue) {
    for (var i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
var flush = function () {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
var nextTick = /*@__PURE__*/ function (cb) { return promiseResolve().then(cb); };
var writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);
var patchEsm = function () {
    // @ts-ignore
    if (!(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return __webpack_require__.e(/*! import() | polyfills-css-shim */ "/scripts/vendor").then(__webpack_require__.t.bind(null, /*! ./css-shim-3333ed1f.js */ "./node_modules/genero-design-system/dist/esm-es5/css-shim-3333ed1f.js", 7)).then(function () {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};
var patchBrowser = function () {
    {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    // @ts-ignore
    var scriptElm = Array.from(doc.querySelectorAll('script')).find(function (s) { return new RegExp("/" + NAMESPACE + "(\\.esm)?\\.js($|\\?|#)").test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE; });
    var opts = scriptElm['data-opts'] || {};
    if ('onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then: function () {
                /* promise noop */
            },
        };
    }
    {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (!win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return __webpack_require__.e(/*! import() | polyfills-dom */ "/scripts/vendor").then(__webpack_require__.t.bind(null, /*! ./dom-f87898ff.js */ "./node_modules/genero-design-system/dist/esm-es5/dom-f87898ff.js", 7)).then(function () { return opts; });
        }
    }
    return promiseResolve(opts);
};
var patchDynamicImport = function (base, orgScriptElm) {
    var importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', "return import(w);//" + Math.random());
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        var moduleMap_1 = new Map();
        win[importFunctionName] = function (src) {
            var url = new URL(src, base).href;
            var mod = moduleMap_1.get(url);
            if (!mod) {
                var script_1 = doc.createElement('script');
                script_1.type = 'module';
                script_1.crossOrigin = orgScriptElm.crossOrigin;
                script_1.src = URL.createObjectURL(new Blob(["import * as m from '" + url + "'; window." + importFunctionName + ".m = m;"], { type: 'application/javascript' }));
                mod = new Promise(function (resolve) {
                    script_1.onload = function () {
                        resolve(win[importFunctionName].m);
                        script_1.remove();
                    };
                });
                moduleMap_1.set(url, mod);
                doc.head.appendChild(script_1);
            }
            return mod;
        };
    }
};



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/loader.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/loader.mjs ***!
  \*******************************************************************/
/*! exports provided: defineCustomElements */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineCustomElements", function() { return defineCustomElements; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "./node_modules/genero-design-system/dist/esm-es5/index-ae5ae664.js");

var defineCustomElements = function (win, options) {
    if (typeof window === 'undefined')
        return Promise.resolve();
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["a"])().then(function () {
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["b"])([["gds-media-card", [[1, "gds-media-card", { "href": [1], "target": [1], "headline": [1], "imageUrl": [1, "image-url"], "superimposeUrl": [1, "superimpose-url"], "superimposeTop": [1, "superimpose-top"], "superimposeBottom": [1, "superimpose-bottom"], "superimposeLeft": [1, "superimpose-left"], "superimposeRight": [1, "superimpose-right"], "description": [1] }]]], ["gds-tag", [[4, "gds-tag", { "href": [1], "target": [1] }]]], ["gds-logo-grid-item", [[1, "gds-logo-grid-item", { "href": [1], "target": [1], "imageUrl": [1, "image-url"] }]]], ["gds-menu-item", [[1, "gds-menu-item", { "active": [516] }]]], ["gds-navigation", [[4, "gds-navigation", { "menuIcon": [32], "open": [32] }]]], ["gds-logo-grid", [[1, "gds-logo-grid"]]], ["gds-menu", [[1, "gds-menu", { "direction": [1] }]]], ["gds-button_2", [[1, "gds-button", { "disabled": [516], "text": [4], "size": [1], "leftIcon": [1, "left-icon"], "rightIcon": [1, "right-icon"], "rightIconRotate": [2, "right-icon-rotate"], "leftIconRotate": [2, "left-icon-rotate"] }], [1, "gds-paragraph", { "size": [1], "class": [1] }]]], ["gds-card_2", [[1, "gds-card"], [4, "gds-heading", { "size": [1], "as": [1] }]]], ["gds-label", [[1, "gds-label", { "size": [1], "color": [1] }]]], ["gds-link", [[4, "gds-link", { "href": [513], "target": [1], "block": [4] }]]]], options);
    });
};



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm-es5/shadow-css-b85eee6e.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5/shadow-css-b85eee6e.js ***!
  \*******************************************************************************/
/*! exports provided: scopeCss */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scopeCss", function() { return scopeCss; });
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/*
 Stencil Client Platform v1.13.0 | MIT Licensed | https://stenciljs.com
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
 * https://github.com/angular/angular/blob/master/packages/compiler/src/shadow_css.ts
 */
var safeSelector = function (selector) {
    var placeholders = [];
    var index = 0;
    var content;
    // Replaces attribute selectors with placeholders.
    // The WS in [attr="va lue"] would otherwise be interpreted as a selector separator.
    selector = selector.replace(/(\[[^\]]*\])/g, function (_, keep) {
        var replaceBy = "__ph-" + index + "__";
        placeholders.push(keep);
        index++;
        return replaceBy;
    });
    // Replaces the expression in `:nth-child(2n + 1)` with a placeholder.
    // WS and "+" would otherwise be interpreted as selector separators.
    content = selector.replace(/(:nth-[-\w]+)(\([^)]+\))/g, function (_, pseudo, exp) {
        var replaceBy = "__ph-" + index + "__";
        placeholders.push(exp);
        index++;
        return pseudo + replaceBy;
    });
    var ss = {
        content: content,
        placeholders: placeholders,
    };
    return ss;
};
var restoreSafeSelector = function (placeholders, content) {
    return content.replace(/__ph-(\d+)__/g, function (_, index) { return placeholders[+index]; });
};
var _polyfillHost = '-shadowcsshost';
var _polyfillSlotted = '-shadowcssslotted';
// note: :host-context pre-processed to -shadowcsshostcontext.
var _polyfillHostContext = '-shadowcsscontext';
var _parenSuffix = ')(?:\\((' + '(?:\\([^)(]*\\)|[^)(]*)+?' + ')\\))?([^,{]*)';
var _cssColonHostRe = new RegExp('(' + _polyfillHost + _parenSuffix, 'gim');
var _cssColonHostContextRe = new RegExp('(' + _polyfillHostContext + _parenSuffix, 'gim');
var _cssColonSlottedRe = new RegExp('(' + _polyfillSlotted + _parenSuffix, 'gim');
var _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
var _polyfillHostNoCombinatorRe = /-shadowcsshost-no-combinator([^\s]*)/;
var _shadowDOMSelectorsRe = [/::shadow/g, /::content/g];
var _selectorReSuffix = '([>\\s~+[.,{:][\\s\\S]*)?$';
var _polyfillHostRe = /-shadowcsshost/gim;
var _colonHostRe = /:host/gim;
var _colonSlottedRe = /::slotted/gim;
var _colonHostContextRe = /:host-context/gim;
var _commentRe = /\/\*\s*[\s\S]*?\*\//g;
var stripComments = function (input) {
    return input.replace(_commentRe, '');
};
var _commentWithHashRe = /\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g;
var extractCommentsWithHash = function (input) {
    return input.match(_commentWithHashRe) || [];
};
var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
var _curlyRe = /([{}])/g;
var OPEN_CURLY = '{';
var CLOSE_CURLY = '}';
var BLOCK_PLACEHOLDER = '%BLOCK%';
var processRules = function (input, ruleCallback) {
    var inputWithEscapedBlocks = escapeBlocks(input);
    var nextBlockIndex = 0;
    return inputWithEscapedBlocks.escapedString.replace(_ruleRe, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        var selector = m[2];
        var content = '';
        var suffix = m[4];
        var contentPrefix = '';
        if (suffix && suffix.startsWith('{' + BLOCK_PLACEHOLDER)) {
            content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
            suffix = suffix.substring(BLOCK_PLACEHOLDER.length + 1);
            contentPrefix = '{';
        }
        var cssRule = {
            selector: selector,
            content: content,
        };
        var rule = ruleCallback(cssRule);
        return "" + m[1] + rule.selector + m[3] + contentPrefix + rule.content + suffix;
    });
};
var escapeBlocks = function (input) {
    var inputParts = input.split(_curlyRe);
    var resultParts = [];
    var escapedBlocks = [];
    var bracketCount = 0;
    var currentBlockParts = [];
    for (var partIndex = 0; partIndex < inputParts.length; partIndex++) {
        var part = inputParts[partIndex];
        if (part === CLOSE_CURLY) {
            bracketCount--;
        }
        if (bracketCount > 0) {
            currentBlockParts.push(part);
        }
        else {
            if (currentBlockParts.length > 0) {
                escapedBlocks.push(currentBlockParts.join(''));
                resultParts.push(BLOCK_PLACEHOLDER);
                currentBlockParts = [];
            }
            resultParts.push(part);
        }
        if (part === OPEN_CURLY) {
            bracketCount++;
        }
    }
    if (currentBlockParts.length > 0) {
        escapedBlocks.push(currentBlockParts.join(''));
        resultParts.push(BLOCK_PLACEHOLDER);
    }
    var strEscapedBlocks = {
        escapedString: resultParts.join(''),
        blocks: escapedBlocks,
    };
    return strEscapedBlocks;
};
var insertPolyfillHostInCssText = function (selector) {
    selector = selector
        .replace(_colonHostContextRe, _polyfillHostContext)
        .replace(_colonHostRe, _polyfillHost)
        .replace(_colonSlottedRe, _polyfillSlotted);
    return selector;
};
var convertColonRule = function (cssText, regExp, partReplacer) {
    // m[1] = :host(-context), m[2] = contents of (), m[3] rest of rule
    return cssText.replace(regExp, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        if (m[2]) {
            var parts = m[2].split(',');
            var r = [];
            for (var i = 0; i < parts.length; i++) {
                var p = parts[i].trim();
                if (!p)
                    break;
                r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
            }
            return r.join(',');
        }
        else {
            return _polyfillHostNoCombinator + m[3];
        }
    });
};
var colonHostPartReplacer = function (host, part, suffix) {
    return host + part.replace(_polyfillHost, '') + suffix;
};
var convertColonHost = function (cssText) {
    return convertColonRule(cssText, _cssColonHostRe, colonHostPartReplacer);
};
var colonHostContextPartReplacer = function (host, part, suffix) {
    if (part.indexOf(_polyfillHost) > -1) {
        return colonHostPartReplacer(host, part, suffix);
    }
    else {
        return host + part + suffix + ', ' + part + ' ' + host + suffix;
    }
};
var convertColonSlotted = function (cssText, slotScopeId) {
    var slotClass = '.' + slotScopeId + ' > ';
    var selectors = [];
    cssText = cssText.replace(_cssColonSlottedRe, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i] = arguments[_i];
        }
        if (m[2]) {
            var compound = m[2].trim();
            var suffix = m[3];
            var slottedSelector = slotClass + compound + suffix;
            var prefixSelector = '';
            for (var i = m[4] - 1; i >= 0; i--) {
                var char = m[5][i];
                if (char === '}' || char === ',') {
                    break;
                }
                prefixSelector = char + prefixSelector;
            }
            var orgSelector = prefixSelector + slottedSelector;
            var addedSelector = "" + prefixSelector.trimRight() + slottedSelector.trim();
            if (orgSelector.trim() !== addedSelector.trim()) {
                var updatedSelector = addedSelector + ", " + orgSelector;
                selectors.push({
                    orgSelector: orgSelector,
                    updatedSelector: updatedSelector,
                });
            }
            return slottedSelector;
        }
        else {
            return _polyfillHostNoCombinator + m[3];
        }
    });
    return {
        selectors: selectors,
        cssText: cssText,
    };
};
var convertColonHostContext = function (cssText) {
    return convertColonRule(cssText, _cssColonHostContextRe, colonHostContextPartReplacer);
};
var convertShadowDOMSelectors = function (cssText) {
    return _shadowDOMSelectorsRe.reduce(function (result, pattern) { return result.replace(pattern, ' '); }, cssText);
};
var makeScopeMatcher = function (scopeSelector) {
    var lre = /\[/g;
    var rre = /\]/g;
    scopeSelector = scopeSelector.replace(lre, '\\[').replace(rre, '\\]');
    return new RegExp('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
};
var selectorNeedsScoping = function (selector, scopeSelector) {
    var re = makeScopeMatcher(scopeSelector);
    return !re.test(selector);
};
var applySimpleSelectorScope = function (selector, scopeSelector, hostSelector) {
    // In Android browser, the lastIndex is not reset when the regex is used in String.replace()
    _polyfillHostRe.lastIndex = 0;
    if (_polyfillHostRe.test(selector)) {
        var replaceBy_1 = "." + hostSelector;
        return selector
            .replace(_polyfillHostNoCombinatorRe, function (_, selector) {
            return selector.replace(/([^:]*)(:*)(.*)/, function (_, before, colon, after) {
                return before + replaceBy_1 + colon + after;
            });
        })
            .replace(_polyfillHostRe, replaceBy_1 + ' ');
    }
    return scopeSelector + ' ' + selector;
};
var applyStrictSelectorScope = function (selector, scopeSelector, hostSelector) {
    var isRe = /\[is=([^\]]*)\]/g;
    scopeSelector = scopeSelector.replace(isRe, function (_) {
        var parts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parts[_i - 1] = arguments[_i];
        }
        return parts[0];
    });
    var className = '.' + scopeSelector;
    var _scopeSelectorPart = function (p) {
        var scopedP = p.trim();
        if (!scopedP) {
            return '';
        }
        if (p.indexOf(_polyfillHostNoCombinator) > -1) {
            scopedP = applySimpleSelectorScope(p, scopeSelector, hostSelector);
        }
        else {
            // remove :host since it should be unnecessary
            var t = p.replace(_polyfillHostRe, '');
            if (t.length > 0) {
                var matches = t.match(/([^:]*)(:*)(.*)/);
                if (matches) {
                    scopedP = matches[1] + className + matches[2] + matches[3];
                }
            }
        }
        return scopedP;
    };
    var safeContent = safeSelector(selector);
    selector = safeContent.content;
    var scopedSelector = '';
    var startIndex = 0;
    var res;
    var sep = /( |>|\+|~(?!=))\s*/g;
    // If a selector appears before :host it should not be shimmed as it
    // matches on ancestor elements and not on elements in the host's shadow
    // `:host-context(div)` is transformed to
    // `-shadowcsshost-no-combinatordiv, div -shadowcsshost-no-combinator`
    // the `div` is not part of the component in the 2nd selectors and should not be scoped.
    // Historically `component-tag:host` was matching the component so we also want to preserve
    // this behavior to avoid breaking legacy apps (it should not match).
    // The behavior should be:
    // - `tag:host` -> `tag[h]` (this is to avoid breaking legacy apps, should not match anything)
    // - `tag :host` -> `tag [h]` (`tag` is not scoped because it's considered part of a
    //   `:host-context(tag)`)
    var hasHost = selector.indexOf(_polyfillHostNoCombinator) > -1;
    // Only scope parts after the first `-shadowcsshost-no-combinator` when it is present
    var shouldScope = !hasHost;
    while ((res = sep.exec(selector)) !== null) {
        var separator = res[1];
        var part_1 = selector.slice(startIndex, res.index).trim();
        shouldScope = shouldScope || part_1.indexOf(_polyfillHostNoCombinator) > -1;
        var scopedPart = shouldScope ? _scopeSelectorPart(part_1) : part_1;
        scopedSelector += scopedPart + " " + separator + " ";
        startIndex = sep.lastIndex;
    }
    var part = selector.substring(startIndex);
    shouldScope = shouldScope || part.indexOf(_polyfillHostNoCombinator) > -1;
    scopedSelector += shouldScope ? _scopeSelectorPart(part) : part;
    // replace the placeholders with their original values
    return restoreSafeSelector(safeContent.placeholders, scopedSelector);
};
var scopeSelector = function (selector, scopeSelectorText, hostSelector, slotSelector) {
    return selector
        .split(',')
        .map(function (shallowPart) {
        if (slotSelector && shallowPart.indexOf('.' + slotSelector) > -1) {
            return shallowPart.trim();
        }
        if (selectorNeedsScoping(shallowPart, scopeSelectorText)) {
            return applyStrictSelectorScope(shallowPart, scopeSelectorText, hostSelector).trim();
        }
        else {
            return shallowPart.trim();
        }
    })
        .join(', ');
};
var scopeSelectors = function (cssText, scopeSelectorText, hostSelector, slotSelector, commentOriginalSelector) {
    return processRules(cssText, function (rule) {
        var selector = rule.selector;
        var content = rule.content;
        if (rule.selector[0] !== '@') {
            selector = scopeSelector(rule.selector, scopeSelectorText, hostSelector, slotSelector);
        }
        else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') || rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
            content = scopeSelectors(rule.content, scopeSelectorText, hostSelector, slotSelector);
        }
        var cssRule = {
            selector: selector.replace(/\s{2,}/g, ' ').trim(),
            content: content,
        };
        return cssRule;
    });
};
var scopeCssText = function (cssText, scopeId, hostScopeId, slotScopeId, commentOriginalSelector) {
    cssText = insertPolyfillHostInCssText(cssText);
    cssText = convertColonHost(cssText);
    cssText = convertColonHostContext(cssText);
    var slotted = convertColonSlotted(cssText, slotScopeId);
    cssText = slotted.cssText;
    cssText = convertShadowDOMSelectors(cssText);
    if (scopeId) {
        cssText = scopeSelectors(cssText, scopeId, hostScopeId, slotScopeId);
    }
    cssText = cssText.replace(/-shadowcsshost-no-combinator/g, "." + hostScopeId);
    cssText = cssText.replace(/>\s*\*\s+([^{, ]+)/gm, ' $1 ');
    return {
        cssText: cssText.trim(),
        slottedSelectors: slotted.selectors,
    };
};
var scopeCss = function (cssText, scopeId, commentOriginalSelector) {
    var hostScopeId = scopeId + '-h';
    var slotScopeId = scopeId + '-s';
    var commentsWithHash = extractCommentsWithHash(cssText);
    cssText = stripComments(cssText);
    var orgSelectors = [];
    if (commentOriginalSelector) {
        var processCommentedSelector_1 = function (rule) {
            var placeholder = "/*!@___" + orgSelectors.length + "___*/";
            var comment = "/*!@" + rule.selector + "*/";
            orgSelectors.push({ placeholder: placeholder, comment: comment });
            rule.selector = placeholder + rule.selector;
            return rule;
        };
        cssText = processRules(cssText, function (rule) {
            if (rule.selector[0] !== '@') {
                return processCommentedSelector_1(rule);
            }
            else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports') || rule.selector.startsWith('@page') || rule.selector.startsWith('@document')) {
                rule.content = processRules(rule.content, processCommentedSelector_1);
                return rule;
            }
            return rule;
        });
    }
    var scoped = scopeCssText(cssText, scopeId, hostScopeId, slotScopeId);
    cssText = __spreadArrays([scoped.cssText], commentsWithHash).join('\n');
    if (commentOriginalSelector) {
        orgSelectors.forEach(function (_a) {
            var placeholder = _a.placeholder, comment = _a.comment;
            cssText = cssText.replace(placeholder, comment);
        });
    }
    scoped.slottedSelectors.forEach(function (slottedSelector) {
        cssText = cssText.replace(slottedSelector.orgSelector, slottedSelector.updatedSelector);
    });
    return cssText;
};



/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm/polyfills/core-js.js":
/*!*************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm/polyfills/core-js.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * core-js 3.2.0
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2019 Denis Pushkarev (zloirock.ru)
 */
!function (undefined) { 'use strict'; !function(t){var r={};function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:e})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,r){if(1&r&&(t=n(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(n.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var o in t)n.d(e,o,function(r){return t[r]}.bind(null,o));return e},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},n.p="",n(n.s=106)}([function(t,r,n){var e=n(4),o=n(20).f,i=n(16),u=n(15),a=n(60),c=n(108),s=n(44);t.exports=function(t,r){var n,f,l,h,p,v=t.target,g=t.global,d=t.stat;if(n=g?e:d?e[v]||a(v,{}):(e[v]||{}).prototype)for(f in r){if(h=r[f],l=t.noTargetGet?(p=o(n,f))&&p.value:n[f],!s(g?f:v+(d?".":"#")+f,t.forced)&&void 0!==l){if(typeof h==typeof l)continue;c(h,l)}(t.sham||l&&l.sham)&&i(h,"sham",!0),u(n,f,h,t)}}},function(t,r){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,r){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,r,n){var e=n(4),o=n(40),i=n(62),u=n(110),a=e.Symbol,c=o("wks");t.exports=function(t){return c[t]||(c[t]=u&&a[t]||(u?a:i)("Symbol."+t))}},function(t,r){var n="object",e=function(t){return t&&t.Math==Math&&t};t.exports=e(typeof globalThis==n&&globalThis)||e(typeof window==n&&window)||e(typeof self==n&&self)||e(typeof global==n&&global)||Function("return this")()},function(t,r,n){var e=n(1);t.exports=!e(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,r,n){var e=n(18),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,r,n){var e=n(2);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},function(t,r,n){var e=n(9);t.exports=function(t){return Object(e(t))}},function(t,r){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,r,n){var e=n(5),o=n(75),i=n(7),u=n(24),a=Object.defineProperty;r.f=e?a:function(t,r,n){if(i(t),r=u(r,!0),i(n),o)try{return a(t,r,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[r]=n.value),t}},function(t,r){var n={}.hasOwnProperty;t.exports=function(t,r){return n.call(t,r)}},function(t,r,n){var e=n(9),o=/"/g;t.exports=function(t,r,n,i){var u=String(e(t)),a="<"+r;return""!==n&&(a+=" "+n+'="'+String(i).replace(o,"&quot;")+'"'),a+">"+u+"</"+r+">"}},function(t,r,n){var e=n(1);t.exports=function(t){return e(function(){var r=""[t]('"');return r!==r.toLowerCase()||r.split('"').length>3})}},function(t,r,n){var e=n(39),o=n(9);t.exports=function(t){return e(o(t))}},function(t,r,n){var e=n(4),o=n(40),i=n(16),u=n(11),a=n(60),c=n(77),s=n(17),f=s.get,l=s.enforce,h=String(c).split("toString");o("inspectSource",function(t){return c.call(t)}),(t.exports=function(t,r,n,o){var c=!!o&&!!o.unsafe,s=!!o&&!!o.enumerable,f=!!o&&!!o.noTargetGet;"function"==typeof n&&("string"!=typeof r||u(n,"name")||i(n,"name",r),l(n).source=h.join("string"==typeof r?r:"")),t!==e?(c?!f&&t[r]&&(s=!0):delete t[r],s?t[r]=n:i(t,r,n)):s?t[r]=n:a(r,n)})(Function.prototype,"toString",function(){return"function"==typeof this&&f(this).source||c.call(this)})},function(t,r,n){var e=n(5),o=n(10),i=n(38);t.exports=e?function(t,r,n){return o.f(t,r,i(1,n))}:function(t,r,n){return t[r]=n,t}},function(t,r,n){var e,o,i,u=n(78),a=n(4),c=n(2),s=n(16),f=n(11),l=n(61),h=n(41),p=a.WeakMap;if(u){var v=new p,g=v.get,d=v.has,y=v.set;e=function(t,r){return y.call(v,t,r),r},o=function(t){return g.call(v,t)||{}},i=function(t){return d.call(v,t)}}else{var x=l("state");h[x]=!0,e=function(t,r){return s(t,x,r),r},o=function(t){return f(t,x)?t[x]:{}},i=function(t){return f(t,x)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(r){var n;if(!c(r)||(n=o(r)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return n}}}},function(t,r){var n=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:n)(t)}},function(t,r,n){var e=n(3),o=n(46),i=n(16),u=e("unscopables"),a=Array.prototype;null==a[u]&&i(a,u,o(null)),t.exports=function(t){a[u][t]=!0}},function(t,r,n){var e=n(5),o=n(59),i=n(38),u=n(14),a=n(24),c=n(11),s=n(75),f=Object.getOwnPropertyDescriptor;r.f=e?f:function(t,r){if(t=u(t),r=a(r,!0),s)try{return f(t,r)}catch(t){}if(c(t,r))return i(!o.f.call(t,r),t[r])}},function(t,r){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,r,n){"use strict";var e=n(24),o=n(10),i=n(38);t.exports=function(t,r,n){var u=e(r);u in t?o.f(t,u,i(0,n)):t[u]=n}},function(t,r,n){var e=n(41),o=n(2),i=n(11),u=n(10).f,a=n(62),c=n(50),s=a("meta"),f=0,l=Object.isExtensible||function(){return!0},h=function(t){u(t,s,{value:{objectID:"O"+ ++f,weakData:{}}})},p=t.exports={REQUIRED:!1,fastKey:function(t,r){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,s)){if(!l(t))return"F";if(!r)return"E";h(t)}return t[s].objectID},getWeakData:function(t,r){if(!i(t,s)){if(!l(t))return!0;if(!r)return!1;h(t)}return t[s].weakData},onFreeze:function(t){return c&&p.REQUIRED&&l(t)&&!i(t,s)&&h(t),t}};e[s]=!0},function(t,r,n){var e=n(2);t.exports=function(t,r){if(!e(t))return t;var n,o;if(r&&"function"==typeof(n=t.toString)&&!e(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!e(o=n.call(t)))return o;if(!r&&"function"==typeof(n=t.toString)&&!e(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,r){t.exports=!1},function(t,r,n){var e=n(18),o=Math.max,i=Math.min;t.exports=function(t,r){var n=e(t);return n<0?o(n+r,0):i(n,r)}},function(t,r,n){var e=n(28),o=n(39),i=n(8),u=n(6),a=n(33),c=[].push,s=function(t){var r=1==t,n=2==t,s=3==t,f=4==t,l=6==t,h=5==t||l;return function(p,v,g,d){for(var y,x,m=i(p),b=o(m),S=e(v,g,3),w=u(b.length),E=0,O=d||a,A=r?O(p,w):n?O(p,0):void 0;w>E;E++)if((h||E in b)&&(x=S(y=b[E],E,m),t))if(r)A[E]=x;else if(x)switch(t){case 3:return!0;case 5:return y;case 6:return E;case 2:c.call(A,y)}else if(f)return!1;return l?-1:s||f?f:A}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},function(t,r,n){var e=n(29);t.exports=function(t,r,n){if(e(t),void 0===r)return t;switch(n){case 0:return function(){return t.call(r)};case 1:return function(n){return t.call(r,n)};case 2:return function(n,e){return t.call(r,n,e)};case 3:return function(n,e,o){return t.call(r,n,e,o)}}return function(){return t.apply(r,arguments)}}},function(t,r){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,r,n){var e=n(11),o=n(8),i=n(61),u=n(91),a=i("IE_PROTO"),c=Object.prototype;t.exports=u?Object.getPrototypeOf:function(t){return t=o(t),e(t,a)?t[a]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,r,n){var e=n(10).f,o=n(11),i=n(3)("toStringTag");t.exports=function(t,r,n){t&&!o(t=n?t:t.prototype,i)&&e(t,i,{configurable:!0,value:r})}},function(t,r,n){var e=n(9),o="["+n(53)+"]",i=RegExp("^"+o+o+"*"),u=RegExp(o+o+"*$"),a=function(t){return function(r){var n=String(e(r));return 1&t&&(n=n.replace(i,"")),2&t&&(n=n.replace(u,"")),n}};t.exports={start:a(1),end:a(2),trim:a(3)}},function(t,r,n){var e=n(2),o=n(45),i=n(3)("species");t.exports=function(t,r){var n;return o(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!o(n.prototype)?e(n)&&null===(n=n[i])&&(n=void 0):n=void 0),new(void 0===n?Array:n)(0===r?0:r)}},function(t,r,n){var e=n(1),o=n(3)("species");t.exports=function(t){return!e(function(){var r=[];return(r.constructor={})[o]=function(){return{foo:1}},1!==r[t](Boolean).foo})}},function(t,r){t.exports={}},function(t,r){t.exports=function(t,r,n){if(!(t instanceof r))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,r,n){"use strict";var e=n(7);t.exports=function(){var t=e(this),r="";return t.global&&(r+="g"),t.ignoreCase&&(r+="i"),t.multiline&&(r+="m"),t.dotAll&&(r+="s"),t.unicode&&(r+="u"),t.sticky&&(r+="y"),r}},function(t,r){t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},function(t,r,n){var e=n(1),o=n(21),i="".split;t.exports=e(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,r,n){var e=n(4),o=n(60),i=n(25),u=e["__core-js_shared__"]||o("__core-js_shared__",{});(t.exports=function(t,r){return u[t]||(u[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.2.0",mode:i?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,r){t.exports={}},function(t,r,n){var e=n(109),o=n(4),i=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,r){return arguments.length<2?i(e[t])||i(o[t]):e[t]&&e[t][r]||o[t]&&o[t][r]}},function(t,r,n){var e=n(80),o=n(63).concat("length","prototype");r.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},function(t,r,n){var e=n(1),o=/#|\.prototype\./,i=function(t,r){var n=a[u(t)];return n==s||n!=c&&("function"==typeof r?e(r):!!r)},u=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},a=i.data={},c=i.NATIVE="N",s=i.POLYFILL="P";t.exports=i},function(t,r,n){var e=n(21);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,r,n){var e=n(7),o=n(83),i=n(63),u=n(41),a=n(113),c=n(76),s=n(61)("IE_PROTO"),f=function(){},l=function(){var t,r=c("iframe"),n=i.length;for(r.style.display="none",a.appendChild(r),r.src=String("javascript:"),(t=r.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),l=t.F;n--;)delete l.prototype[i[n]];return l()};t.exports=Object.create||function(t,r){var n;return null!==t?(f.prototype=e(t),n=new f,f.prototype=null,n[s]=t):n=l(),void 0===r?n:o(n,r)},u[s]=!0},function(t,r,n){var e=n(80),o=n(63);t.exports=Object.keys||function(t){return e(t,o)}},function(t,r,n){var e=n(64),o=n(35),i=n(3)("iterator");t.exports=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[e(t)]}},function(t,r,n){"use strict";var e=n(0),o=n(4),i=n(44),u=n(15),a=n(23),c=n(51),s=n(36),f=n(2),l=n(1),h=n(88),p=n(31),v=n(68);t.exports=function(t,r,n,g,d){var y=o[t],x=y&&y.prototype,m=y,b=g?"set":"add",S={},w=function(t){var r=x[t];u(x,t,"add"==t?function(t){return r.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(d&&!f(t))&&r.call(this,0===t?0:t)}:"get"==t?function(t){return d&&!f(t)?void 0:r.call(this,0===t?0:t)}:"has"==t?function(t){return!(d&&!f(t))&&r.call(this,0===t?0:t)}:function(t,n){return r.call(this,0===t?0:t,n),this})};if(i(t,"function"!=typeof y||!(d||x.forEach&&!l(function(){(new y).entries().next()}))))m=n.getConstructor(r,t,g,b),a.REQUIRED=!0;else if(i(t,!0)){var E=new m,O=E[b](d?{}:-0,1)!=E,A=l(function(){E.has(1)}),I=h(function(t){new y(t)}),R=!d&&l(function(){for(var t=new y,r=5;r--;)t[b](r,r);return!t.has(-0)});I||((m=r(function(r,n){s(r,m,t);var e=v(new y,r,m);return null!=n&&c(n,e[b],e,g),e})).prototype=x,x.constructor=m),(A||R)&&(w("delete"),w("has"),g&&w("get")),(R||O)&&w(b),d&&x.clear&&delete x.clear}return S[t]=m,e({global:!0,forced:m!=y},S),p(m,t),d||n.setStrong(m,t,g),m}},function(t,r,n){var e=n(1);t.exports=!e(function(){return Object.isExtensible(Object.preventExtensions({}))})},function(t,r,n){var e=n(7),o=n(87),i=n(6),u=n(28),a=n(48),c=n(86),s=function(t,r){this.stopped=t,this.result=r};(t.exports=function(t,r,n,f,l){var h,p,v,g,d,y,x=u(r,n,f?2:1);if(l)h=t;else{if("function"!=typeof(p=a(t)))throw TypeError("Target is not iterable");if(o(p)){for(v=0,g=i(t.length);g>v;v++)if((d=f?x(e(y=t[v])[0],y[1]):x(t[v]))&&d instanceof s)return d;return new s(!1)}h=p.call(t)}for(;!(y=h.next()).done;)if((d=c(h,x,y.value,f))&&d instanceof s)return d;return new s(!1)}).stop=function(t){return new s(!0,t)}},function(t,r,n){var e=n(15);t.exports=function(t,r,n){for(var o in r)e(t,o,r[o],n);return t}},function(t,r){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},function(t,r,n){"use strict";var e=n(25),o=n(4),i=n(1);t.exports=e||!i(function(){var t=Math.random();__defineSetter__.call(null,t,function(){}),delete o[t]})},function(t,r,n){var e=n(18),o=n(9),i=function(t){return function(r,n){var i,u,a=String(o(r)),c=e(n),s=a.length;return c<0||c>=s?t?"":void 0:(i=a.charCodeAt(c))<55296||i>56319||c+1===s||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):u-56320+(i-55296<<10)+65536}};t.exports={codeAt:i(!1),charAt:i(!0)}},function(t,r,n){"use strict";var e=n(16),o=n(15),i=n(1),u=n(3),a=n(73),c=u("species"),s=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),f=!i(function(){var t=/(?:)/,r=t.exec;t.exec=function(){return r.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]});t.exports=function(t,r,n,l){var h=u(t),p=!i(function(){var r={};return r[h]=function(){return 7},7!=""[t](r)}),v=p&&!i(function(){var r=!1,n=/a/;return n.exec=function(){return r=!0,null},"split"===t&&(n.constructor={},n.constructor[c]=function(){return n}),n[h](""),!r});if(!p||!v||"replace"===t&&!s||"split"===t&&!f){var g=/./[h],d=n(h,""[t],function(t,r,n,e,o){return r.exec===a?p&&!o?{done:!0,value:g.call(r,n,e)}:{done:!0,value:t.call(n,r,e)}:{done:!1}}),y=d[0],x=d[1];o(String.prototype,t,y),o(RegExp.prototype,h,2==r?function(t,r){return x.call(t,this,r)}:function(t){return x.call(t,this)}),l&&e(RegExp.prototype[h],"sham",!0)}}},function(t,r,n){"use strict";var e=n(55).charAt;t.exports=function(t,r,n){return r+(n?e(t,r).length:1)}},function(t,r,n){var e=n(21),o=n(73);t.exports=function(t,r){var n=t.exec;if("function"==typeof n){var i=n.call(t,r);if("object"!=typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==e(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,r)}},function(t,r,n){"use strict";var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);r.f=i?function(t){var r=o(this,t);return!!r&&r.enumerable}:e},function(t,r,n){var e=n(4),o=n(16);t.exports=function(t,r){try{o(e,t,r)}catch(n){e[t]=r}return r}},function(t,r,n){var e=n(40),o=n(62),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,r){var n=0,e=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+e).toString(36)}},function(t,r){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,r,n){var e=n(21),o=n(3)("toStringTag"),i="Arguments"==e(function(){return arguments}());t.exports=function(t){var r,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,r){try{return t[r]}catch(t){}}(r=Object(t),o))?n:i?e(r):"Object"==(u=e(r))&&"function"==typeof r.callee?"Arguments":u}},function(t,r,n){"use strict";var e=n(0),o=n(66),i=n(30),u=n(92),a=n(31),c=n(16),s=n(15),f=n(3),l=n(25),h=n(35),p=n(90),v=p.IteratorPrototype,g=p.BUGGY_SAFARI_ITERATORS,d=f("iterator"),y=function(){return this};t.exports=function(t,r,n,f,p,x,m){o(n,r,f);var b,S,w,E=function(t){if(t===p&&j)return j;if(!g&&t in I)return I[t];switch(t){case"keys":case"values":case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}},O=r+" Iterator",A=!1,I=t.prototype,R=I[d]||I["@@iterator"]||p&&I[p],j=!g&&R||E(p),k="Array"==r&&I.entries||R;if(k&&(b=i(k.call(new t)),v!==Object.prototype&&b.next&&(l||i(b)===v||(u?u(b,v):"function"!=typeof b[d]&&c(b,d,y)),a(b,O,!0,!0),l&&(h[O]=y))),"values"==p&&R&&"values"!==R.name&&(A=!0,j=function(){return R.call(this)}),l&&!m||I[d]===j||c(I,d,j),h[r]=j,p)if(S={values:E("values"),keys:x?j:E("keys"),entries:E("entries")},m)for(w in S)!g&&!A&&w in I||s(I,w,S[w]);else e({target:r,proto:!0,forced:g||A},S);return S}},function(t,r,n){"use strict";var e=n(90).IteratorPrototype,o=n(46),i=n(38),u=n(31),a=n(35),c=function(){return this};t.exports=function(t,r,n){var s=r+" Iterator";return t.prototype=o(e,{next:i(1,n)}),u(t,s,!1,!0),a[s]=c,t}},function(t,r,n){"use strict";var e=n(42),o=n(10),i=n(3),u=n(5),a=i("species");t.exports=function(t){var r=e(t),n=o.f;u&&r&&!r[a]&&n(r,a,{configurable:!0,get:function(){return this}})}},function(t,r,n){var e=n(2),o=n(92);t.exports=function(t,r,n){var i,u;return o&&"function"==typeof(i=r.constructor)&&i!==n&&e(u=i.prototype)&&u!==n.prototype&&o(t,u),t}},function(t,r,n){"use strict";var e=n(18),o=n(9);t.exports="".repeat||function(t){var r=String(o(this)),n="",i=e(t);if(i<0||i==1/0)throw RangeError("Wrong number of repetitions");for(;i>0;(i>>>=1)&&(r+=r))1&i&&(n+=r);return n}},function(t,r,n){var e=n(2),o=n(21),i=n(3)("match");t.exports=function(t){var r;return e(t)&&(void 0!==(r=t[i])?!!r:"RegExp"==o(t))}},function(t,r,n){var e=n(70);t.exports=function(t){if(e(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,r,n){var e=n(3)("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(n){try{return r[e]=!1,"/./"[t](r)}catch(t){}}return!1}},function(t,r,n){"use strict";var e,o,i=n(37),u=RegExp.prototype.exec,a=String.prototype.replace,c=u,s=(e=/a/,o=/b*/g,u.call(e,"a"),u.call(o,"a"),0!==e.lastIndex||0!==o.lastIndex),f=void 0!==/()??/.exec("")[1];(s||f)&&(c=function(t){var r,n,e,o,c=this;return f&&(n=new RegExp("^"+c.source+"$(?!\\s)",i.call(c))),s&&(r=c.lastIndex),e=u.call(c,t),s&&e&&(c.lastIndex=c.global?e.index+e[0].length:r),f&&e&&e.length>1&&a.call(e[0],n,function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(e[o]=void 0)}),e}),t.exports=c},function(t,r,n){var e=n(1),o=n(53);t.exports=function(t){return e(function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t})}},function(t,r,n){var e=n(5),o=n(1),i=n(76);t.exports=!e&&!o(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},function(t,r,n){var e=n(4),o=n(2),i=e.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},function(t,r,n){var e=n(40);t.exports=e("native-function-to-string",Function.toString)},function(t,r,n){var e=n(4),o=n(77),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o.call(i))},function(t,r,n){var e=n(42),o=n(43),i=n(82),u=n(7);t.exports=e("Reflect","ownKeys")||function(t){var r=o.f(u(t)),n=i.f;return n?r.concat(n(t)):r}},function(t,r,n){var e=n(11),o=n(14),i=n(81).indexOf,u=n(41);t.exports=function(t,r){var n,a=o(t),c=0,s=[];for(n in a)!e(u,n)&&e(a,n)&&s.push(n);for(;r.length>c;)e(a,n=r[c++])&&(~i(s,n)||s.push(n));return s}},function(t,r,n){var e=n(14),o=n(6),i=n(26),u=function(t){return function(r,n,u){var a,c=e(r),s=o(c.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((a=c[f++])!=a)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}};t.exports={includes:u(!0),indexOf:u(!1)}},function(t,r){r.f=Object.getOwnPropertySymbols},function(t,r,n){var e=n(5),o=n(10),i=n(7),u=n(47);t.exports=e?Object.defineProperties:function(t,r){i(t);for(var n,e=u(r),a=e.length,c=0;a>c;)o.f(t,n=e[c++],r[n]);return t}},function(t,r,n){"use strict";var e=n(45),o=n(6),i=n(28),u=function(t,r,n,a,c,s,f,l){for(var h,p=c,v=0,g=!!f&&i(f,l,3);v<a;){if(v in n){if(h=g?g(n[v],v,r):n[v],s>0&&e(h))p=u(t,r,h,o(h.length),p,s-1)-1;else{if(p>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[p]=h}p++}v++}return p};t.exports=u},function(t,r,n){"use strict";var e=n(28),o=n(8),i=n(86),u=n(87),a=n(6),c=n(22),s=n(48);t.exports=function(t){var r,n,f,l,h=o(t),p="function"==typeof this?this:Array,v=arguments.length,g=v>1?arguments[1]:void 0,d=void 0!==g,y=0,x=s(h);if(d&&(g=e(g,v>2?arguments[2]:void 0,2)),null==x||p==Array&&u(x))for(n=new p(r=a(h.length));r>y;y++)c(n,y,d?g(h[y],y):h[y]);else for(l=x.call(h),n=new p;!(f=l.next()).done;y++)c(n,y,d?i(l,g,[f.value,y],!0):f.value);return n.length=y,n}},function(t,r,n){var e=n(7);t.exports=function(t,r,n,o){try{return o?r(e(n)[0],n[1]):r(n)}catch(r){var i=t.return;throw void 0!==i&&e(i.call(t)),r}}},function(t,r,n){var e=n(3),o=n(35),i=e("iterator"),u=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||u[i]===t)}},function(t,r,n){var e=n(3)("iterator"),o=!1;try{var i=0,u={next:function(){return{done:!!i++}},return:function(){o=!0}};u[e]=function(){return this},Array.from(u,function(){throw 2})}catch(t){}t.exports=function(t,r){if(!r&&!o)return!1;var n=!1;try{var i={};i[e]=function(){return{next:function(){return{done:n=!0}}}},t(i)}catch(t){}return n}},function(t,r,n){"use strict";var e=n(14),o=n(19),i=n(35),u=n(17),a=n(65),c=u.set,s=u.getterFor("Array Iterator");t.exports=a(Array,"Array",function(t,r){c(this,{type:"Array Iterator",target:e(t),index:0,kind:r})},function(){var t=s(this),r=t.target,n=t.kind,e=t.index++;return!r||e>=r.length?(t.target=void 0,{value:void 0,done:!0}):"keys"==n?{value:e,done:!1}:"values"==n?{value:r[e],done:!1}:{value:[e,r[e]],done:!1}},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,r,n){"use strict";var e,o,i,u=n(30),a=n(16),c=n(11),s=n(3),f=n(25),l=s("iterator"),h=!1;[].keys&&("next"in(i=[].keys())?(o=u(u(i)))!==Object.prototype&&(e=o):h=!0),null==e&&(e={}),f||c(e,l)||a(e,l,function(){return this}),t.exports={IteratorPrototype:e,BUGGY_SAFARI_ITERATORS:h}},function(t,r,n){var e=n(1);t.exports=!e(function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})},function(t,r,n){var e=n(7),o=n(123);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,n={};try{(t=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(n,[]),r=n instanceof Array}catch(t){}return function(n,i){return e(n),o(i),r?t.call(n,i):n.__proto__=i,n}}():void 0)},function(t,r,n){"use strict";var e=n(1);t.exports=function(t,r){var n=[][t];return!n||!e(function(){n.call(null,r||function(){throw 1},1)})}},function(t,r,n){"use strict";var e=n(10).f,o=n(46),i=n(52),u=n(28),a=n(36),c=n(51),s=n(65),f=n(67),l=n(5),h=n(23).fastKey,p=n(17),v=p.set,g=p.getterFor;t.exports={getConstructor:function(t,r,n,s){var f=t(function(t,e){a(t,f,r),v(t,{type:r,index:o(null),first:void 0,last:void 0,size:0}),l||(t.size=0),null!=e&&c(e,t[s],t,n)}),p=g(r),d=function(t,r,n){var e,o,i=p(t),u=y(t,r);return u?u.value=n:(i.last=u={index:o=h(r,!0),key:r,value:n,previous:e=i.last,next:void 0,removed:!1},i.first||(i.first=u),e&&(e.next=u),l?i.size++:t.size++,"F"!==o&&(i.index[o]=u)),t},y=function(t,r){var n,e=p(t),o=h(r);if("F"!==o)return e.index[o];for(n=e.first;n;n=n.next)if(n.key==r)return n};return i(f.prototype,{clear:function(){for(var t=p(this),r=t.index,n=t.first;n;)n.removed=!0,n.previous&&(n.previous=n.previous.next=void 0),delete r[n.index],n=n.next;t.first=t.last=void 0,l?t.size=0:this.size=0},delete:function(t){var r=p(this),n=y(this,t);if(n){var e=n.next,o=n.previous;delete r.index[n.index],n.removed=!0,o&&(o.next=e),e&&(e.previous=o),r.first==n&&(r.first=e),r.last==n&&(r.last=o),l?r.size--:this.size--}return!!n},forEach:function(t){for(var r,n=p(this),e=u(t,arguments.length>1?arguments[1]:void 0,3);r=r?r.next:n.first;)for(e(r.value,r.key,this);r&&r.removed;)r=r.previous},has:function(t){return!!y(this,t)}}),i(f.prototype,n?{get:function(t){var r=y(this,t);return r&&r.value},set:function(t,r){return d(this,0===t?0:t,r)}}:{add:function(t){return d(this,t=0===t?0:t,t)}}),l&&e(f.prototype,"size",{get:function(){return p(this).size}}),f},setStrong:function(t,r,n){var e=r+" Iterator",o=g(r),i=g(e);s(t,r,function(t,r){v(this,{type:e,target:t,state:o(t),kind:r,last:void 0})},function(){for(var t=i(this),r=t.kind,n=t.last;n&&n.removed;)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==r?{value:n.key,done:!1}:"values"==r?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})},n?"entries":"values",!n,!0),f(r)}}},function(t,r,n){var e=n(2),o=Math.floor;t.exports=function(t){return!e(t)&&isFinite(t)&&o(t)===t}},function(t,r,n){"use strict";var e=n(5),o=n(1),i=n(47),u=n(82),a=n(59),c=n(8),s=n(39),f=Object.assign;t.exports=!f||o(function(){var t={},r={},n=Symbol();return t[n]=7,"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),7!=f({},t)[n]||"abcdefghijklmnopqrst"!=i(f({},r)).join("")})?function(t,r){for(var n=c(t),o=arguments.length,f=1,l=u.f,h=a.f;o>f;)for(var p,v=s(arguments[f++]),g=l?i(v).concat(l(v)):i(v),d=g.length,y=0;d>y;)p=g[y++],e&&!h.call(v,p)||(n[p]=v[p]);return n}:f},function(t,r,n){var e=n(5),o=n(47),i=n(14),u=n(59).f,a=function(t){return function(r){for(var n,a=i(r),c=o(a),s=c.length,f=0,l=[];s>f;)n=c[f++],e&&!u.call(a,n)||l.push(t?[n,a[n]]:a[n]);return l}};t.exports={entries:a(!0),values:a(!1)}},function(t,r){t.exports=Object.is||function(t,r){return t===r?0!==t||1/t==1/r:t!=t&&r!=r}},function(t,r,n){"use strict";var e=n(55).charAt,o=n(17),i=n(65),u=o.set,a=o.getterFor("String Iterator");i(String,"String",function(t){u(this,{type:"String Iterator",string:String(t),index:0})},function(){var t,r=a(this),n=r.string,o=r.index;return o>=n.length?{value:void 0,done:!0}:(t=e(n,o),r.index+=t.length,{value:t,done:!1})})},function(t,r,n){var e=n(7),o=n(29),i=n(3)("species");t.exports=function(t,r){var n,u=e(t).constructor;return void 0===u||null==(n=e(u)[i])?r:o(n)}},function(t,r,n){var e=n(6),o=n(69),i=n(9),u=Math.ceil,a=function(t){return function(r,n,a){var c,s,f=String(i(r)),l=f.length,h=void 0===a?" ":String(a),p=e(n);return p<=l||""==h?f:(c=p-l,(s=o.call(h,u(c/h.length))).length>c&&(s=s.slice(0,c)),t?f+s:s+f)}};t.exports={start:a(!1),end:a(!0)}},function(t,r,n){var e=n(185);t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(e)},function(t,r,n){"use strict";var e=n(52),o=n(23).getWeakData,i=n(7),u=n(2),a=n(36),c=n(51),s=n(27),f=n(11),l=n(17),h=l.set,p=l.getterFor,v=s.find,g=s.findIndex,d=0,y=function(t){return t.frozen||(t.frozen=new x)},x=function(){this.entries=[]},m=function(t,r){return v(t.entries,function(t){return t[0]===r})};x.prototype={get:function(t){var r=m(this,t);if(r)return r[1]},has:function(t){return!!m(this,t)},set:function(t,r){var n=m(this,t);n?n[1]=r:this.entries.push([t,r])},delete:function(t){var r=g(this.entries,function(r){return r[0]===t});return~r&&this.entries.splice(r,1),!!~r}},t.exports={getConstructor:function(t,r,n,s){var l=t(function(t,e){a(t,l,r),h(t,{type:r,id:d++,frozen:void 0}),null!=e&&c(e,t[s],t,n)}),v=p(r),g=function(t,r,n){var e=v(t),u=o(i(r),!0);return!0===u?y(e).set(r,n):u[e.id]=n,t};return e(l.prototype,{delete:function(t){var r=v(this);if(!u(t))return!1;var n=o(t);return!0===n?y(r).delete(t):n&&f(n,r.id)&&delete n[r.id]},has:function(t){var r=v(this);if(!u(t))return!1;var n=o(t);return!0===n?y(r).has(t):n&&f(n,r.id)}}),e(l.prototype,n?{get:function(t){var r=v(this);if(u(t)){var n=o(t);return!0===n?y(r).get(t):n?n[r.id]:void 0}},set:function(t,r){return g(this,t,r)}}:{add:function(t){return g(this,t,!0)}}),l}}},function(t,r,n){var e=n(1),o=n(3),i=n(25),u=o("iterator");t.exports=!e(function(){var t=new URL("b?e=1","http://a"),r=t.searchParams;return t.pathname="c%20d",i&&!t.toJSON||!r.sort||"http://a/c%20d?e=1"!==t.href||"1"!==r.get("e")||"a=1"!==String(new URLSearchParams("?a=1"))||!r[u]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash})},function(t,r,n){"use strict";n(89);var e=n(0),o=n(104),i=n(15),u=n(52),a=n(31),c=n(66),s=n(17),f=n(36),l=n(11),h=n(28),p=n(7),v=n(2),g=n(216),d=n(48),y=n(3)("iterator"),x=s.set,m=s.getterFor("URLSearchParams"),b=s.getterFor("URLSearchParamsIterator"),S=/\+/g,w=Array(4),E=function(t){return w[t-1]||(w[t-1]=RegExp("((?:%[\\da-f]{2}){"+t+"})","gi"))},O=function(t){try{return decodeURIComponent(t)}catch(r){return t}},A=function(t){var r=t.replace(S," "),n=4;try{return decodeURIComponent(r)}catch(t){for(;n;)r=r.replace(E(n--),O);return r}},I=/[!'()~]|%20/g,R={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},j=function(t){return R[t]},k=function(t){return encodeURIComponent(t).replace(I,j)},L=function(t,r){if(r)for(var n,e,o=r.split("&"),i=0;i<o.length;)(n=o[i++]).length&&(e=n.split("="),t.push({key:A(e.shift()),value:A(e.join("="))}))},P=function(t){this.entries.length=0,L(this.entries,t)},_=function(t,r){if(t<r)throw TypeError("Not enough arguments")},N=c(function(t,r){x(this,{type:"URLSearchParamsIterator",iterator:g(m(t).entries),kind:r})},"Iterator",function(){var t=b(this),r=t.kind,n=t.iterator.next(),e=n.value;return n.done||(n.value="keys"===r?e.key:"values"===r?e.value:[e.key,e.value]),n}),T=function(){f(this,T,"URLSearchParams");var t,r,n,e,o,i,u,a=arguments.length>0?arguments[0]:void 0,c=this,s=[];if(x(c,{type:"URLSearchParams",entries:s,updateURL:function(){},updateSearchParams:P}),void 0!==a)if(v(a))if("function"==typeof(t=d(a)))for(r=t.call(a);!(n=r.next()).done;){if((o=(e=g(p(n.value))).next()).done||(i=e.next()).done||!e.next().done)throw TypeError("Expected sequence with length 2");s.push({key:o.value+"",value:i.value+""})}else for(u in a)l(a,u)&&s.push({key:u,value:a[u]+""});else L(s,"string"==typeof a?"?"===a.charAt(0)?a.slice(1):a:a+"")},U=T.prototype;u(U,{append:function(t,r){_(arguments.length,2);var n=m(this);n.entries.push({key:t+"",value:r+""}),n.updateURL()},delete:function(t){_(arguments.length,1);for(var r=m(this),n=r.entries,e=t+"",o=0;o<n.length;)n[o].key===e?n.splice(o,1):o++;r.updateURL()},get:function(t){_(arguments.length,1);for(var r=m(this).entries,n=t+"",e=0;e<r.length;e++)if(r[e].key===n)return r[e].value;return null},getAll:function(t){_(arguments.length,1);for(var r=m(this).entries,n=t+"",e=[],o=0;o<r.length;o++)r[o].key===n&&e.push(r[o].value);return e},has:function(t){_(arguments.length,1);for(var r=m(this).entries,n=t+"",e=0;e<r.length;)if(r[e++].key===n)return!0;return!1},set:function(t,r){_(arguments.length,1);for(var n,e=m(this),o=e.entries,i=!1,u=t+"",a=r+"",c=0;c<o.length;c++)(n=o[c]).key===u&&(i?o.splice(c--,1):(i=!0,n.value=a));i||o.push({key:u,value:a}),e.updateURL()},sort:function(){var t,r,n,e=m(this),o=e.entries,i=o.slice();for(o.length=0,n=0;n<i.length;n++){for(t=i[n],r=0;r<n;r++)if(o[r].key>t.key){o.splice(r,0,t);break}r===n&&o.push(t)}e.updateURL()},forEach:function(t){for(var r,n=m(this).entries,e=h(t,arguments.length>1?arguments[1]:void 0,3),o=0;o<n.length;)e((r=n[o++]).value,r.key,this)},keys:function(){return new N(this,"keys")},values:function(){return new N(this,"values")},entries:function(){return new N(this,"entries")}},{enumerable:!0}),i(U,y,U.entries),i(U,"toString",function(){for(var t,r=m(this).entries,n=[],e=0;e<r.length;)t=r[e++],n.push(k(t.key)+"="+k(t.value));return n.join("&")},{enumerable:!0}),a(T,"URLSearchParams"),e({global:!0,forced:!o},{URLSearchParams:T}),t.exports={URLSearchParams:T,getState:m}},function(t,r,n){n(107),n(111),n(114),n(116),n(117),n(118),n(119),n(120),n(121),n(122),n(89),n(124),n(125),n(126),n(127),n(128),n(129),n(130),n(131),n(132),n(133),n(134),n(135),n(136),n(137),n(138),n(140),n(141),n(142),n(143),n(144),n(145),n(147),n(149),n(151),n(152),n(153),n(154),n(155),n(156),n(157),n(158),n(159),n(161),n(162),n(163),n(164),n(165),n(166),n(167),n(168),n(169),n(170),n(171),n(173),n(174),n(175),n(176),n(177),n(178),n(179),n(180),n(181),n(99),n(182),n(183),n(184),n(186),n(187),n(188),n(189),n(190),n(191),n(192),n(193),n(194),n(195),n(196),n(197),n(198),n(199),n(200),n(201),n(202),n(203),n(204),n(205),n(206),n(207),n(208),n(209),n(210),n(211),n(214),n(217),t.exports=n(105)},function(t,r,n){"use strict";var e=n(0),o=n(1),i=n(45),u=n(2),a=n(8),c=n(6),s=n(22),f=n(33),l=n(34),h=n(3)("isConcatSpreadable"),p=!o(function(){var t=[];return t[h]=!1,t.concat()[0]!==t}),v=l("concat"),g=function(t){if(!u(t))return!1;var r=t[h];return void 0!==r?!!r:i(t)};e({target:"Array",proto:!0,forced:!p||!v},{concat:function(t){var r,n,e,o,i,u=a(this),l=f(u,0),h=0;for(r=-1,e=arguments.length;r<e;r++)if(i=-1===r?u:arguments[r],g(i)){if(h+(o=c(i.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(n=0;n<o;n++,h++)n in i&&s(l,h,i[n])}else{if(h>=9007199254740991)throw TypeError("Maximum allowed index exceeded");s(l,h++,i)}return l.length=h,l}})},function(t,r,n){var e=n(11),o=n(79),i=n(20),u=n(10);t.exports=function(t,r){for(var n=o(r),a=u.f,c=i.f,s=0;s<n.length;s++){var f=n[s];e(t,f)||a(t,f,c(r,f))}}},function(t,r,n){t.exports=n(4)},function(t,r,n){var e=n(1);t.exports=!!Object.getOwnPropertySymbols&&!e(function(){return!String(Symbol())})},function(t,r,n){var e=n(0),o=n(112),i=n(19);e({target:"Array",proto:!0},{copyWithin:o}),i("copyWithin")},function(t,r,n){"use strict";var e=n(8),o=n(26),i=n(6),u=Math.min;t.exports=[].copyWithin||function(t,r){var n=e(this),a=i(n.length),c=o(t,a),s=o(r,a),f=arguments.length>2?arguments[2]:void 0,l=u((void 0===f?a:o(f,a))-s,a-c),h=1;for(s<c&&c<s+l&&(h=-1,s+=l-1,c+=l-1);l-- >0;)s in n?n[c]=n[s]:delete n[c],c+=h,s+=h;return n}},function(t,r,n){var e=n(42);t.exports=e("document","documentElement")},function(t,r,n){var e=n(0),o=n(115),i=n(19);e({target:"Array",proto:!0},{fill:o}),i("fill")},function(t,r,n){"use strict";var e=n(8),o=n(26),i=n(6);t.exports=function(t){for(var r=e(this),n=i(r.length),u=arguments.length,a=o(u>1?arguments[1]:void 0,n),c=u>2?arguments[2]:void 0,s=void 0===c?n:o(c,n);s>a;)r[a++]=t;return r}},function(t,r,n){"use strict";var e=n(0),o=n(27).filter;e({target:"Array",proto:!0,forced:!n(34)("filter")},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,r,n){"use strict";var e=n(0),o=n(27).find,i=n(19),u=!0;"find"in[]&&Array(1).find(function(){u=!1}),e({target:"Array",proto:!0,forced:u},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("find")},function(t,r,n){"use strict";var e=n(0),o=n(27).findIndex,i=n(19),u=!0;"findIndex"in[]&&Array(1).findIndex(function(){u=!1}),e({target:"Array",proto:!0,forced:u},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("findIndex")},function(t,r,n){"use strict";var e=n(0),o=n(84),i=n(8),u=n(6),a=n(18),c=n(33);e({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,r=i(this),n=u(r.length),e=c(r,0);return e.length=o(e,r,r,n,0,void 0===t?1:a(t)),e}})},function(t,r,n){"use strict";var e=n(0),o=n(84),i=n(8),u=n(6),a=n(29),c=n(33);e({target:"Array",proto:!0},{flatMap:function(t){var r,n=i(this),e=u(n.length);return a(t),(r=c(n,0)).length=o(r,n,n,e,0,1,t,arguments.length>1?arguments[1]:void 0),r}})},function(t,r,n){var e=n(0),o=n(85);e({target:"Array",stat:!0,forced:!n(88)(function(t){Array.from(t)})},{from:o})},function(t,r,n){"use strict";var e=n(0),o=n(81).includes,i=n(19);e({target:"Array",proto:!0},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},function(t,r,n){var e=n(2);t.exports=function(t){if(!e(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,r,n){"use strict";var e=n(0),o=n(39),i=n(14),u=n(93),a=[].join,c=o!=Object,s=u("join",",");e({target:"Array",proto:!0,forced:c||s},{join:function(t){return a.call(i(this),void 0===t?",":t)}})},function(t,r,n){"use strict";var e=n(0),o=n(27).map;e({target:"Array",proto:!0,forced:!n(34)("map")},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,r,n){"use strict";var e=n(0),o=n(1),i=n(22);e({target:"Array",stat:!0,forced:o(function(){function t(){}return!(Array.of.call(t)instanceof t)})},{of:function(){for(var t=0,r=arguments.length,n=new("function"==typeof this?this:Array)(r);r>t;)i(n,t,arguments[t++]);return n.length=r,n}})},function(t,r,n){"use strict";var e=n(0),o=n(2),i=n(45),u=n(26),a=n(6),c=n(14),s=n(22),f=n(34),l=n(3)("species"),h=[].slice,p=Math.max;e({target:"Array",proto:!0,forced:!f("slice")},{slice:function(t,r){var n,e,f,v=c(this),g=a(v.length),d=u(t,g),y=u(void 0===r?g:r,g);if(i(v)&&("function"!=typeof(n=v.constructor)||n!==Array&&!i(n.prototype)?o(n)&&null===(n=n[l])&&(n=void 0):n=void 0,n===Array||void 0===n))return h.call(v,d,y);for(e=new(void 0===n?Array:n)(p(y-d,0)),f=0;d<y;d++,f++)d in v&&s(e,f,v[d]);return e.length=f,e}})},function(t,r,n){n(67)("Array")},function(t,r,n){"use strict";var e=n(0),o=n(26),i=n(18),u=n(6),a=n(8),c=n(33),s=n(22),f=n(34),l=Math.max,h=Math.min;e({target:"Array",proto:!0,forced:!f("splice")},{splice:function(t,r){var n,e,f,p,v,g,d=a(this),y=u(d.length),x=o(t,y),m=arguments.length;if(0===m?n=e=0:1===m?(n=0,e=y-x):(n=m-2,e=h(l(i(r),0),y-x)),y+n-e>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(f=c(d,e),p=0;p<e;p++)(v=x+p)in d&&s(f,p,d[v]);if(f.length=e,n<e){for(p=x;p<y-e;p++)g=p+n,(v=p+e)in d?d[g]=d[v]:delete d[g];for(p=y;p>y-e+n;p--)delete d[p-1]}else if(n>e)for(p=y-e;p>x;p--)g=p+n-1,(v=p+e-1)in d?d[g]=d[v]:delete d[g];for(p=0;p<n;p++)d[p+x]=arguments[p+2];return d.length=y-e+n,f}})},function(t,r,n){n(19)("flat")},function(t,r,n){n(19)("flatMap")},function(t,r,n){"use strict";var e=n(2),o=n(10),i=n(30),u=n(3)("hasInstance"),a=Function.prototype;u in a||o.f(a,u,{value:function(t){if("function"!=typeof this||!e(t))return!1;if(!e(this.prototype))return t instanceof this;for(;t=i(t);)if(this.prototype===t)return!0;return!1}})},function(t,r,n){var e=n(5),o=n(10).f,i=Function.prototype,u=i.toString,a=/^\s*function ([^ (]*)/;!e||"name"in i||o(i,"name",{configurable:!0,get:function(){try{return u.call(this).match(a)[1]}catch(t){return""}}})},function(t,r,n){var e=n(4);n(31)(e.JSON,"JSON",!0)},function(t,r,n){"use strict";var e=n(49),o=n(94);t.exports=e("Map",function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},o,!0)},function(t,r,n){"use strict";var e=n(5),o=n(4),i=n(44),u=n(15),a=n(11),c=n(21),s=n(68),f=n(24),l=n(1),h=n(46),p=n(43).f,v=n(20).f,g=n(10).f,d=n(32).trim,y=o.Number,x=y.prototype,m="Number"==c(h(x)),b=function(t){var r,n,e,o,i,u,a,c,s=f(t,!1);if("string"==typeof s&&s.length>2)if(43===(r=(s=d(s)).charCodeAt(0))||45===r){if(88===(n=s.charCodeAt(2))||120===n)return NaN}else if(48===r){switch(s.charCodeAt(1)){case 66:case 98:e=2,o=49;break;case 79:case 111:e=8,o=55;break;default:return+s}for(u=(i=s.slice(2)).length,a=0;a<u;a++)if((c=i.charCodeAt(a))<48||c>o)return NaN;return parseInt(i,e)}return+s};if(i("Number",!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var S,w=function(t){var r=arguments.length<1?0:t,n=this;return n instanceof w&&(m?l(function(){x.valueOf.call(n)}):"Number"!=c(n))?s(new y(b(r)),n,w):b(r)},E=e?p(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),O=0;E.length>O;O++)a(y,S=E[O])&&!a(w,S)&&g(w,S,v(y,S));w.prototype=x,x.constructor=w,u(o,"Number",w)}},function(t,r,n){n(0)({target:"Number",stat:!0},{EPSILON:Math.pow(2,-52)})},function(t,r,n){n(0)({target:"Number",stat:!0},{isFinite:n(139)})},function(t,r,n){var e=n(4).isFinite;t.exports=Number.isFinite||function(t){return"number"==typeof t&&e(t)}},function(t,r,n){n(0)({target:"Number",stat:!0},{isInteger:n(95)})},function(t,r,n){n(0)({target:"Number",stat:!0},{isNaN:function(t){return t!=t}})},function(t,r,n){var e=n(0),o=n(95),i=Math.abs;e({target:"Number",stat:!0},{isSafeInteger:function(t){return o(t)&&i(t)<=9007199254740991}})},function(t,r,n){n(0)({target:"Number",stat:!0},{MAX_SAFE_INTEGER:9007199254740991})},function(t,r,n){n(0)({target:"Number",stat:!0},{MIN_SAFE_INTEGER:-9007199254740991})},function(t,r,n){var e=n(0),o=n(146);e({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},function(t,r,n){var e=n(4),o=n(32).trim,i=n(53),u=e.parseFloat,a=1/u(i+"-0")!=-1/0;t.exports=a?function(t){var r=o(String(t)),n=u(r);return 0===n&&"-"==r.charAt(0)?-0:n}:u},function(t,r,n){var e=n(0),o=n(148);e({target:"Number",stat:!0,forced:Number.parseInt!=o},{parseInt:o})},function(t,r,n){var e=n(4),o=n(32).trim,i=n(53),u=e.parseInt,a=/^[+-]?0[Xx]/,c=8!==u(i+"08")||22!==u(i+"0x16");t.exports=c?function(t,r){var n=o(String(t));return u(n,r>>>0||(a.test(n)?16:10))}:u},function(t,r,n){"use strict";var e=n(0),o=n(18),i=n(150),u=n(69),a=n(1),c=1..toFixed,s=Math.floor,f=function(t,r,n){return 0===r?n:r%2==1?f(t,r-1,n*t):f(t*t,r/2,n)};e({target:"Number",proto:!0,forced:c&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!a(function(){c.call({})})},{toFixed:function(t){var r,n,e,a,c=i(this),l=o(t),h=[0,0,0,0,0,0],p="",v="0",g=function(t,r){for(var n=-1,e=r;++n<6;)e+=t*h[n],h[n]=e%1e7,e=s(e/1e7)},d=function(t){for(var r=6,n=0;--r>=0;)n+=h[r],h[r]=s(n/t),n=n%t*1e7},y=function(){for(var t=6,r="";--t>=0;)if(""!==r||0===t||0!==h[t]){var n=String(h[t]);r=""===r?n:r+u.call("0",7-n.length)+n}return r};if(l<0||l>20)throw RangeError("Incorrect fraction digits");if(c!=c)return"NaN";if(c<=-1e21||c>=1e21)return String(c);if(c<0&&(p="-",c=-c),c>1e-21)if(n=(r=function(t){for(var r=0,n=t;n>=4096;)r+=12,n/=4096;for(;n>=2;)r+=1,n/=2;return r}(c*f(2,69,1))-69)<0?c*f(2,-r,1):c/f(2,r,1),n*=4503599627370496,(r=52-r)>0){for(g(0,n),e=l;e>=7;)g(1e7,0),e-=7;for(g(f(10,e,1),0),e=r-1;e>=23;)d(1<<23),e-=23;d(1<<e),g(1,1),d(2),v=y()}else g(0,n),g(1<<-r,0),v=y()+u.call("0",l);return v=l>0?p+((a=v.length)<=l?"0."+u.call("0",l-a)+v:v.slice(0,a-l)+"."+v.slice(a-l)):p+v}})},function(t,r,n){var e=n(21);t.exports=function(t){if("number"!=typeof t&&"Number"!=e(t))throw TypeError("Incorrect invocation");return+t}},function(t,r,n){var e=n(0),o=n(96);e({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},function(t,r,n){"use strict";var e=n(0),o=n(5),i=n(54),u=n(8),a=n(29),c=n(10);o&&e({target:"Object",proto:!0,forced:i},{__defineGetter__:function(t,r){c.f(u(this),t,{get:a(r),enumerable:!0,configurable:!0})}})},function(t,r,n){"use strict";var e=n(0),o=n(5),i=n(54),u=n(8),a=n(29),c=n(10);o&&e({target:"Object",proto:!0,forced:i},{__defineSetter__:function(t,r){c.f(u(this),t,{set:a(r),enumerable:!0,configurable:!0})}})},function(t,r,n){var e=n(0),o=n(97).entries;e({target:"Object",stat:!0},{entries:function(t){return o(t)}})},function(t,r,n){var e=n(0),o=n(50),i=n(1),u=n(2),a=n(23).onFreeze,c=Object.freeze;e({target:"Object",stat:!0,forced:i(function(){c(1)}),sham:!o},{freeze:function(t){return c&&u(t)?c(a(t)):t}})},function(t,r,n){var e=n(0),o=n(51),i=n(22);e({target:"Object",stat:!0},{fromEntries:function(t){var r={};return o(t,function(t,n){i(r,t,n)},void 0,!0),r}})},function(t,r,n){var e=n(0),o=n(1),i=n(14),u=n(20).f,a=n(5),c=o(function(){u(1)});e({target:"Object",stat:!0,forced:!a||c,sham:!a},{getOwnPropertyDescriptor:function(t,r){return u(i(t),r)}})},function(t,r,n){var e=n(0),o=n(5),i=n(79),u=n(14),a=n(20),c=n(22);e({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){for(var r,n,e=u(t),o=a.f,s=i(e),f={},l=0;s.length>l;)void 0!==(n=o(e,r=s[l++]))&&c(f,r,n);return f}})},function(t,r,n){var e=n(0),o=n(1),i=n(160).f;e({target:"Object",stat:!0,forced:o(function(){return!Object.getOwnPropertyNames(1)})},{getOwnPropertyNames:i})},function(t,r,n){var e=n(14),o=n(43).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return u.slice()}}(t):o(e(t))}},function(t,r,n){var e=n(0),o=n(1),i=n(8),u=n(30),a=n(91);e({target:"Object",stat:!0,forced:o(function(){u(1)}),sham:!a},{getPrototypeOf:function(t){return u(i(t))}})},function(t,r,n){n(0)({target:"Object",stat:!0},{is:n(98)})},function(t,r,n){var e=n(0),o=n(1),i=n(2),u=Object.isExtensible;e({target:"Object",stat:!0,forced:o(function(){u(1)})},{isExtensible:function(t){return!!i(t)&&(!u||u(t))}})},function(t,r,n){var e=n(0),o=n(1),i=n(2),u=Object.isFrozen;e({target:"Object",stat:!0,forced:o(function(){u(1)})},{isFrozen:function(t){return!i(t)||!!u&&u(t)}})},function(t,r,n){var e=n(0),o=n(1),i=n(2),u=Object.isSealed;e({target:"Object",stat:!0,forced:o(function(){u(1)})},{isSealed:function(t){return!i(t)||!!u&&u(t)}})},function(t,r,n){var e=n(0),o=n(8),i=n(47);e({target:"Object",stat:!0,forced:n(1)(function(){i(1)})},{keys:function(t){return i(o(t))}})},function(t,r,n){"use strict";var e=n(0),o=n(5),i=n(54),u=n(8),a=n(24),c=n(30),s=n(20).f;o&&e({target:"Object",proto:!0,forced:i},{__lookupGetter__:function(t){var r,n=u(this),e=a(t,!0);do{if(r=s(n,e))return r.get}while(n=c(n))}})},function(t,r,n){"use strict";var e=n(0),o=n(5),i=n(54),u=n(8),a=n(24),c=n(30),s=n(20).f;o&&e({target:"Object",proto:!0,forced:i},{__lookupSetter__:function(t){var r,n=u(this),e=a(t,!0);do{if(r=s(n,e))return r.set}while(n=c(n))}})},function(t,r,n){var e=n(0),o=n(2),i=n(23).onFreeze,u=n(50),a=n(1),c=Object.preventExtensions;e({target:"Object",stat:!0,forced:a(function(){c(1)}),sham:!u},{preventExtensions:function(t){return c&&o(t)?c(i(t)):t}})},function(t,r,n){var e=n(0),o=n(2),i=n(23).onFreeze,u=n(50),a=n(1),c=Object.seal;e({target:"Object",stat:!0,forced:a(function(){c(1)}),sham:!u},{seal:function(t){return c&&o(t)?c(i(t)):t}})},function(t,r,n){var e=n(15),o=n(172),i=Object.prototype;o!==i.toString&&e(i,"toString",o,{unsafe:!0})},function(t,r,n){"use strict";var e=n(64),o={};o[n(3)("toStringTag")]="z",t.exports="[object z]"!==String(o)?function(){return"[object "+e(this)+"]"}:o.toString},function(t,r,n){var e=n(0),o=n(97).values;e({target:"Object",stat:!0},{values:function(t){return o(t)}})},function(t,r,n){var e=n(5),o=n(4),i=n(44),u=n(68),a=n(10).f,c=n(43).f,s=n(70),f=n(37),l=n(15),h=n(1),p=n(67),v=n(3)("match"),g=o.RegExp,d=g.prototype,y=/a/g,x=/a/g,m=new g(y)!==y;if(e&&i("RegExp",!m||h(function(){return x[v]=!1,g(y)!=y||g(x)==x||"/a/i"!=g(y,"i")}))){for(var b=function(t,r){var n=this instanceof b,e=s(t),o=void 0===r;return!n&&e&&t.constructor===b&&o?t:u(m?new g(e&&!o?t.source:t,r):g((e=t instanceof b)?t.source:t,e&&o?f.call(t):r),n?this:d,b)},S=function(t){t in b||a(b,t,{configurable:!0,get:function(){return g[t]},set:function(r){g[t]=r}})},w=c(g),E=0;w.length>E;)S(w[E++]);d.constructor=b,b.prototype=d,l(o,"RegExp",b)}p("RegExp")},function(t,r,n){var e=n(5),o=n(10),i=n(37);e&&"g"!=/./g.flags&&o.f(RegExp.prototype,"flags",{configurable:!0,get:i})},function(t,r,n){"use strict";var e=n(15),o=n(7),i=n(1),u=n(37),a=RegExp.prototype,c=a.toString,s=i(function(){return"/a/b"!=c.call({source:"a",flags:"b"})}),f="toString"!=c.name;(s||f)&&e(RegExp.prototype,"toString",function(){var t=o(this),r=String(t.source),n=t.flags;return"/"+r+"/"+String(void 0===n&&t instanceof RegExp&&!("flags"in a)?u.call(t):n)},{unsafe:!0})},function(t,r,n){"use strict";var e=n(49),o=n(94);t.exports=e("Set",function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},o)},function(t,r,n){"use strict";var e=n(0),o=n(55).codeAt;e({target:"String",proto:!0},{codePointAt:function(t){return o(this,t)}})},function(t,r,n){"use strict";var e=n(0),o=n(6),i=n(71),u=n(9),a=n(72),c="".endsWith,s=Math.min;e({target:"String",proto:!0,forced:!a("endsWith")},{endsWith:function(t){var r=String(u(this));i(t);var n=arguments.length>1?arguments[1]:void 0,e=o(r.length),a=void 0===n?e:s(o(n),e),f=String(t);return c?c.call(r,f,a):r.slice(a-f.length,a)===f}})},function(t,r,n){var e=n(0),o=n(26),i=String.fromCharCode,u=String.fromCodePoint;e({target:"String",stat:!0,forced:!!u&&1!=u.length},{fromCodePoint:function(t){for(var r,n=[],e=arguments.length,u=0;e>u;){if(r=+arguments[u++],o(r,1114111)!==r)throw RangeError(r+" is not a valid code point");n.push(r<65536?i(r):i(55296+((r-=65536)>>10),r%1024+56320))}return n.join("")}})},function(t,r,n){"use strict";var e=n(0),o=n(71),i=n(9);e({target:"String",proto:!0,forced:!n(72)("includes")},{includes:function(t){return!!~String(i(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})},function(t,r,n){"use strict";var e=n(56),o=n(7),i=n(6),u=n(9),a=n(57),c=n(58);e("match",1,function(t,r,n){return[function(r){var n=u(this),e=null==r?void 0:r[t];return void 0!==e?e.call(r,n):new RegExp(r)[t](String(n))},function(t){var e=n(r,t,this);if(e.done)return e.value;var u=o(t),s=String(this);if(!u.global)return c(u,s);var f=u.unicode;u.lastIndex=0;for(var l,h=[],p=0;null!==(l=c(u,s));){var v=String(l[0]);h[p]=v,""===v&&(u.lastIndex=a(s,i(u.lastIndex),f)),p++}return 0===p?null:h}]})},function(t,r,n){"use strict";var e=n(0),o=n(66),i=n(9),u=n(6),a=n(29),c=n(7),s=n(64),f=n(37),l=n(16),h=n(3),p=n(100),v=n(57),g=n(17),d=n(25),y=h("matchAll"),x=g.set,m=g.getterFor("RegExp String Iterator"),b=RegExp.prototype,S=b.exec,w=o(function(t,r,n,e){x(this,{type:"RegExp String Iterator",regexp:t,string:r,global:n,unicode:e,done:!1})},"RegExp String",function(){var t=m(this);if(t.done)return{value:void 0,done:!0};var r=t.regexp,n=t.string,e=function(t,r){var n,e=t.exec;if("function"==typeof e){if("object"!=typeof(n=e.call(t,r)))throw TypeError("Incorrect exec result");return n}return S.call(t,r)}(r,n);return null===e?{value:void 0,done:t.done=!0}:t.global?(""==String(e[0])&&(r.lastIndex=v(n,u(r.lastIndex),t.unicode)),{value:e,done:!1}):(t.done=!0,{value:e,done:!1})}),E=function(t){var r,n,e,o,i,a,s=c(this),l=String(t);return r=p(s,RegExp),void 0===(n=s.flags)&&s instanceof RegExp&&!("flags"in b)&&(n=f.call(s)),e=void 0===n?"":String(n),o=new r(r===RegExp?s.source:s,e),i=!!~e.indexOf("g"),a=!!~e.indexOf("u"),o.lastIndex=u(s.lastIndex),new w(o,l,i,a)};e({target:"String",proto:!0},{matchAll:function(t){var r,n,e,o=i(this);return null!=t&&(void 0===(n=t[y])&&d&&"RegExp"==s(t)&&(n=E),null!=n)?a(n).call(t,o):(r=String(o),e=new RegExp(t,"g"),d?E.call(e,r):e[y](r))}}),d||y in b||l(b,y,E)},function(t,r,n){"use strict";var e=n(0),o=n(101).end;e({target:"String",proto:!0,forced:n(102)},{padEnd:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,r,n){var e=n(42);t.exports=e("navigator","userAgent")||""},function(t,r,n){"use strict";var e=n(0),o=n(101).start;e({target:"String",proto:!0,forced:n(102)},{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},function(t,r,n){var e=n(0),o=n(14),i=n(6);e({target:"String",stat:!0},{raw:function(t){for(var r=o(t.raw),n=i(r.length),e=arguments.length,u=[],a=0;n>a;)u.push(String(r[a++])),a<e&&u.push(String(arguments[a]));return u.join("")}})},function(t,r,n){n(0)({target:"String",proto:!0},{repeat:n(69)})},function(t,r,n){"use strict";var e=n(56),o=n(7),i=n(8),u=n(6),a=n(18),c=n(9),s=n(57),f=n(58),l=Math.max,h=Math.min,p=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g;e("replace",2,function(t,r,n){return[function(n,e){var o=c(this),i=null==n?void 0:n[t];return void 0!==i?i.call(n,o,e):r.call(String(o),n,e)},function(t,i){var c=n(r,t,this,i);if(c.done)return c.value;var p=o(t),v=String(this),g="function"==typeof i;g||(i=String(i));var d=p.global;if(d){var y=p.unicode;p.lastIndex=0}for(var x=[];;){var m=f(p,v);if(null===m)break;if(x.push(m),!d)break;""===String(m[0])&&(p.lastIndex=s(v,u(p.lastIndex),y))}for(var b,S="",w=0,E=0;E<x.length;E++){m=x[E];for(var O=String(m[0]),A=l(h(a(m.index),v.length),0),I=[],R=1;R<m.length;R++)I.push(void 0===(b=m[R])?b:String(b));var j=m.groups;if(g){var k=[O].concat(I,A,v);void 0!==j&&k.push(j);var L=String(i.apply(void 0,k))}else L=e(O,v,A,I,j,i);A>=w&&(S+=v.slice(w,A)+L,w=A+O.length)}return S+v.slice(w)}];function e(t,n,e,o,u,a){var c=e+t.length,s=o.length,f=g;return void 0!==u&&(u=i(u),f=v),r.call(a,f,function(r,i){var a;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return n.slice(0,e);case"'":return n.slice(c);case"<":a=u[i.slice(1,-1)];break;default:var f=+i;if(0===f)return r;if(f>s){var l=p(f/10);return 0===l?r:l<=s?void 0===o[l-1]?i.charAt(1):o[l-1]+i.charAt(1):r}a=o[f-1]}return void 0===a?"":a})}})},function(t,r,n){"use strict";var e=n(56),o=n(7),i=n(9),u=n(98),a=n(58);e("search",1,function(t,r,n){return[function(r){var n=i(this),e=null==r?void 0:r[t];return void 0!==e?e.call(r,n):new RegExp(r)[t](String(n))},function(t){var e=n(r,t,this);if(e.done)return e.value;var i=o(t),c=String(this),s=i.lastIndex;u(s,0)||(i.lastIndex=0);var f=a(i,c);return u(i.lastIndex,s)||(i.lastIndex=s),null===f?-1:f.index}]})},function(t,r,n){"use strict";var e=n(56),o=n(70),i=n(7),u=n(9),a=n(100),c=n(57),s=n(6),f=n(58),l=n(73),h=n(1),p=[].push,v=Math.min,g=!h(function(){return!RegExp(4294967295,"y")});e("split",2,function(t,r,n){var e;return e="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var e=String(u(this)),i=void 0===n?4294967295:n>>>0;if(0===i)return[];if(void 0===t)return[e];if(!o(t))return r.call(e,t,i);for(var a,c,s,f=[],h=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),v=0,g=new RegExp(t.source,h+"g");(a=l.call(g,e))&&!((c=g.lastIndex)>v&&(f.push(e.slice(v,a.index)),a.length>1&&a.index<e.length&&p.apply(f,a.slice(1)),s=a[0].length,v=c,f.length>=i));)g.lastIndex===a.index&&g.lastIndex++;return v===e.length?!s&&g.test("")||f.push(""):f.push(e.slice(v)),f.length>i?f.slice(0,i):f}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:r.call(this,t,n)}:r,[function(r,n){var o=u(this),i=null==r?void 0:r[t];return void 0!==i?i.call(r,o,n):e.call(String(o),r,n)},function(t,o){var u=n(e,t,this,o,e!==r);if(u.done)return u.value;var l=i(t),h=String(this),p=a(l,RegExp),d=l.unicode,y=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(g?"y":"g"),x=new p(g?l:"^(?:"+l.source+")",y),m=void 0===o?4294967295:o>>>0;if(0===m)return[];if(0===h.length)return null===f(x,h)?[h]:[];for(var b=0,S=0,w=[];S<h.length;){x.lastIndex=g?S:0;var E,O=f(x,g?h:h.slice(S));if(null===O||(E=v(s(x.lastIndex+(g?0:S)),h.length))===b)S=c(h,S,d);else{if(w.push(h.slice(b,S)),w.length===m)return w;for(var A=1;A<=O.length-1;A++)if(w.push(O[A]),w.length===m)return w;S=b=E}}return w.push(h.slice(b)),w}]},!g)},function(t,r,n){"use strict";var e=n(0),o=n(6),i=n(71),u=n(9),a=n(72),c="".startsWith,s=Math.min;e({target:"String",proto:!0,forced:!a("startsWith")},{startsWith:function(t){var r=String(u(this));i(t);var n=o(s(arguments.length>1?arguments[1]:void 0,r.length)),e=String(t);return c?c.call(r,e,n):r.slice(n,n+e.length)===e}})},function(t,r,n){"use strict";var e=n(0),o=n(32).trim;e({target:"String",proto:!0,forced:n(74)("trim")},{trim:function(){return o(this)}})},function(t,r,n){"use strict";var e=n(0),o=n(32).end,i=n(74)("trimEnd"),u=i?function(){return o(this)}:"".trimEnd;e({target:"String",proto:!0,forced:i},{trimEnd:u,trimRight:u})},function(t,r,n){"use strict";var e=n(0),o=n(32).start,i=n(74)("trimStart"),u=i?function(){return o(this)}:"".trimStart;e({target:"String",proto:!0,forced:i},{trimStart:u,trimLeft:u})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("anchor")},{anchor:function(t){return o(this,"a","name",t)}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("big")},{big:function(){return o(this,"big","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("blink")},{blink:function(){return o(this,"blink","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("bold")},{bold:function(){return o(this,"b","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("fixed")},{fixed:function(){return o(this,"tt","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("fontcolor")},{fontcolor:function(t){return o(this,"font","color",t)}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("fontsize")},{fontsize:function(t){return o(this,"font","size",t)}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("italics")},{italics:function(){return o(this,"i","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("link")},{link:function(t){return o(this,"a","href",t)}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("small")},{small:function(){return o(this,"small","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("strike")},{strike:function(){return o(this,"strike","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("sub")},{sub:function(){return o(this,"sub","","")}})},function(t,r,n){"use strict";var e=n(0),o=n(12);e({target:"String",proto:!0,forced:n(13)("sup")},{sup:function(){return o(this,"sup","","")}})},function(t,r,n){"use strict";var e,o=n(4),i=n(52),u=n(23),a=n(49),c=n(103),s=n(2),f=n(17).enforce,l=n(78),h=!o.ActiveXObject&&"ActiveXObject"in o,p=Object.isExtensible,v=function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},g=t.exports=a("WeakMap",v,c,!0,!0);if(l&&h){e=c.getConstructor(v,"WeakMap",!0),u.REQUIRED=!0;var d=g.prototype,y=d.delete,x=d.has,m=d.get,b=d.set;i(d,{delete:function(t){if(s(t)&&!p(t)){var r=f(this);return r.frozen||(r.frozen=new e),y.call(this,t)||r.frozen.delete(t)}return y.call(this,t)},has:function(t){if(s(t)&&!p(t)){var r=f(this);return r.frozen||(r.frozen=new e),x.call(this,t)||r.frozen.has(t)}return x.call(this,t)},get:function(t){if(s(t)&&!p(t)){var r=f(this);return r.frozen||(r.frozen=new e),x.call(this,t)?m.call(this,t):r.frozen.get(t)}return m.call(this,t)},set:function(t,r){if(s(t)&&!p(t)){var n=f(this);n.frozen||(n.frozen=new e),x.call(this,t)?b.call(this,t,r):n.frozen.set(t,r)}else b.call(this,t,r);return this}})}},function(t,r,n){"use strict";n(49)("WeakSet",function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}},n(103),!1,!0)},function(t,r,n){var e=n(4),o=n(212),i=n(213),u=n(16);for(var a in o){var c=e[a],s=c&&c.prototype;if(s&&s.forEach!==i)try{u(s,"forEach",i)}catch(t){s.forEach=i}}},function(t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,r,n){"use strict";var e=n(27).forEach,o=n(93);t.exports=o("forEach")?function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},function(t,r,n){"use strict";n(99);var e,o=n(0),i=n(5),u=n(104),a=n(4),c=n(83),s=n(15),f=n(36),l=n(11),h=n(96),p=n(85),v=n(55).codeAt,g=n(215),d=n(31),y=n(105),x=n(17),m=a.URL,b=y.URLSearchParams,S=y.getState,w=x.set,E=x.getterFor("URL"),O=Math.floor,A=Math.pow,I=/[A-Za-z]/,R=/[\d+\-.A-Za-z]/,j=/\d/,k=/^(0x|0X)/,L=/^[0-7]+$/,P=/^\d+$/,_=/^[\dA-Fa-f]+$/,N=/[\u0000\u0009\u000A\u000D #%\/:?@[\\]]/,T=/[\u0000\u0009\u000A\u000D #\/:?@[\\]]/,U=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,F=/[\u0009\u000A\u000D]/g,M=function(t,r){var n,e,o;if("["==r.charAt(0)){if("]"!=r.charAt(r.length-1))return"Invalid host";if(!(n=z(r.slice(1,-1))))return"Invalid host";t.host=n}else if(X(t)){if(r=g(r),N.test(r))return"Invalid host";if(null===(n=C(r)))return"Invalid host";t.host=n}else{if(T.test(r))return"Invalid host";for(n="",e=p(r),o=0;o<e.length;o++)n+=V(e[o],B);t.host=n}},C=function(t){var r,n,e,o,i,u,a,c=t.split(".");if(c.length&&""==c[c.length-1]&&c.pop(),(r=c.length)>4)return t;for(n=[],e=0;e<r;e++){if(""==(o=c[e]))return t;if(i=10,o.length>1&&"0"==o.charAt(0)&&(i=k.test(o)?16:8,o=o.slice(8==i?1:2)),""===o)u=0;else{if(!(10==i?P:8==i?L:_).test(o))return t;u=parseInt(o,i)}n.push(u)}for(e=0;e<r;e++)if(u=n[e],e==r-1){if(u>=A(256,5-r))return null}else if(u>255)return null;for(a=n.pop(),e=0;e<n.length;e++)a+=n[e]*A(256,3-e);return a},z=function(t){var r,n,e,o,i,u,a,c=[0,0,0,0,0,0,0,0],s=0,f=null,l=0,h=function(){return t.charAt(l)};if(":"==h()){if(":"!=t.charAt(1))return;l+=2,f=++s}for(;h();){if(8==s)return;if(":"!=h()){for(r=n=0;n<4&&_.test(h());)r=16*r+parseInt(h(),16),l++,n++;if("."==h()){if(0==n)return;if(l-=n,s>6)return;for(e=0;h();){if(o=null,e>0){if(!("."==h()&&e<4))return;l++}if(!j.test(h()))return;for(;j.test(h());){if(i=parseInt(h(),10),null===o)o=i;else{if(0==o)return;o=10*o+i}if(o>255)return;l++}c[s]=256*c[s]+o,2!=++e&&4!=e||s++}if(4!=e)return;break}if(":"==h()){if(l++,!h())return}else if(h())return;c[s++]=r}else{if(null!==f)return;l++,f=++s}}if(null!==f)for(u=s-f,s=7;0!=s&&u>0;)a=c[s],c[s--]=c[f+u-1],c[f+--u]=a;else if(8!=s)return;return c},q=function(t){var r,n,e,o;if("number"==typeof t){for(r=[],n=0;n<4;n++)r.unshift(t%256),t=O(t/256);return r.join(".")}if("object"==typeof t){for(r="",e=function(t){for(var r=null,n=1,e=null,o=0,i=0;i<8;i++)0!==t[i]?(o>n&&(r=e,n=o),e=null,o=0):(null===e&&(e=i),++o);return o>n&&(r=e,n=o),r}(t),n=0;n<8;n++)o&&0===t[n]||(o&&(o=!1),e===n?(r+=n?":":"::",o=!0):(r+=t[n].toString(16),n<7&&(r+=":")));return"["+r+"]"}return t},B={},D=h({},B,{" ":1,'"':1,"<":1,">":1,"`":1}),G=h({},D,{"#":1,"?":1,"{":1,"}":1}),W=h({},G,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),V=function(t,r){var n=v(t,0);return n>32&&n<127&&!l(r,t)?t:encodeURIComponent(t)},$={ftp:21,file:null,gopher:70,http:80,https:443,ws:80,wss:443},X=function(t){return l($,t.scheme)},J=function(t){return""!=t.username||""!=t.password},Y=function(t){return!t.host||t.cannotBeABaseURL||"file"==t.scheme},H=function(t,r){var n;return 2==t.length&&I.test(t.charAt(0))&&(":"==(n=t.charAt(1))||!r&&"|"==n)},Q=function(t){var r;return t.length>1&&H(t.slice(0,2))&&(2==t.length||"/"===(r=t.charAt(2))||"\\"===r||"?"===r||"#"===r)},K=function(t){var r=t.path,n=r.length;!n||"file"==t.scheme&&1==n&&H(r[0],!0)||r.pop()},Z=function(t){return"."===t||"%2e"===t.toLowerCase()},tt={},rt={},nt={},et={},ot={},it={},ut={},at={},ct={},st={},ft={},lt={},ht={},pt={},vt={},gt={},dt={},yt={},xt={},mt={},bt={},St=function(t,r,n,o){var i,u,a,c,s,f=n||tt,h=0,v="",g=!1,d=!1,y=!1;for(n||(t.scheme="",t.username="",t.password="",t.host=null,t.port=null,t.path=[],t.query=null,t.fragment=null,t.cannotBeABaseURL=!1,r=r.replace(U,"")),r=r.replace(F,""),i=p(r);h<=i.length;){switch(u=i[h],f){case tt:if(!u||!I.test(u)){if(n)return"Invalid scheme";f=nt;continue}v+=u.toLowerCase(),f=rt;break;case rt:if(u&&(R.test(u)||"+"==u||"-"==u||"."==u))v+=u.toLowerCase();else{if(":"!=u){if(n)return"Invalid scheme";v="",f=nt,h=0;continue}if(n&&(X(t)!=l($,v)||"file"==v&&(J(t)||null!==t.port)||"file"==t.scheme&&!t.host))return;if(t.scheme=v,n)return void(X(t)&&$[t.scheme]==t.port&&(t.port=null));v="","file"==t.scheme?f=pt:X(t)&&o&&o.scheme==t.scheme?f=et:X(t)?f=at:"/"==i[h+1]?(f=ot,h++):(t.cannotBeABaseURL=!0,t.path.push(""),f=xt)}break;case nt:if(!o||o.cannotBeABaseURL&&"#"!=u)return"Invalid scheme";if(o.cannotBeABaseURL&&"#"==u){t.scheme=o.scheme,t.path=o.path.slice(),t.query=o.query,t.fragment="",t.cannotBeABaseURL=!0,f=bt;break}f="file"==o.scheme?pt:it;continue;case et:if("/"!=u||"/"!=i[h+1]){f=it;continue}f=ct,h++;break;case ot:if("/"==u){f=st;break}f=yt;continue;case it:if(t.scheme=o.scheme,u==e)t.username=o.username,t.password=o.password,t.host=o.host,t.port=o.port,t.path=o.path.slice(),t.query=o.query;else if("/"==u||"\\"==u&&X(t))f=ut;else if("?"==u)t.username=o.username,t.password=o.password,t.host=o.host,t.port=o.port,t.path=o.path.slice(),t.query="",f=mt;else{if("#"!=u){t.username=o.username,t.password=o.password,t.host=o.host,t.port=o.port,t.path=o.path.slice(),t.path.pop(),f=yt;continue}t.username=o.username,t.password=o.password,t.host=o.host,t.port=o.port,t.path=o.path.slice(),t.query=o.query,t.fragment="",f=bt}break;case ut:if(!X(t)||"/"!=u&&"\\"!=u){if("/"!=u){t.username=o.username,t.password=o.password,t.host=o.host,t.port=o.port,f=yt;continue}f=st}else f=ct;break;case at:if(f=ct,"/"!=u||"/"!=v.charAt(h+1))continue;h++;break;case ct:if("/"!=u&&"\\"!=u){f=st;continue}break;case st:if("@"==u){g&&(v="%40"+v),g=!0,a=p(v);for(var x=0;x<a.length;x++){var m=a[x];if(":"!=m||y){var b=V(m,W);y?t.password+=b:t.username+=b}else y=!0}v=""}else if(u==e||"/"==u||"?"==u||"#"==u||"\\"==u&&X(t)){if(g&&""==v)return"Invalid authority";h-=p(v).length+1,v="",f=ft}else v+=u;break;case ft:case lt:if(n&&"file"==t.scheme){f=gt;continue}if(":"!=u||d){if(u==e||"/"==u||"?"==u||"#"==u||"\\"==u&&X(t)){if(X(t)&&""==v)return"Invalid host";if(n&&""==v&&(J(t)||null!==t.port))return;if(c=M(t,v))return c;if(v="",f=dt,n)return;continue}"["==u?d=!0:"]"==u&&(d=!1),v+=u}else{if(""==v)return"Invalid host";if(c=M(t,v))return c;if(v="",f=ht,n==lt)return}break;case ht:if(!j.test(u)){if(u==e||"/"==u||"?"==u||"#"==u||"\\"==u&&X(t)||n){if(""!=v){var S=parseInt(v,10);if(S>65535)return"Invalid port";t.port=X(t)&&S===$[t.scheme]?null:S,v=""}if(n)return;f=dt;continue}return"Invalid port"}v+=u;break;case pt:if(t.scheme="file","/"==u||"\\"==u)f=vt;else{if(!o||"file"!=o.scheme){f=yt;continue}if(u==e)t.host=o.host,t.path=o.path.slice(),t.query=o.query;else if("?"==u)t.host=o.host,t.path=o.path.slice(),t.query="",f=mt;else{if("#"!=u){Q(i.slice(h).join(""))||(t.host=o.host,t.path=o.path.slice(),K(t)),f=yt;continue}t.host=o.host,t.path=o.path.slice(),t.query=o.query,t.fragment="",f=bt}}break;case vt:if("/"==u||"\\"==u){f=gt;break}o&&"file"==o.scheme&&!Q(i.slice(h).join(""))&&(H(o.path[0],!0)?t.path.push(o.path[0]):t.host=o.host),f=yt;continue;case gt:if(u==e||"/"==u||"\\"==u||"?"==u||"#"==u){if(!n&&H(v))f=yt;else if(""==v){if(t.host="",n)return;f=dt}else{if(c=M(t,v))return c;if("localhost"==t.host&&(t.host=""),n)return;v="",f=dt}continue}v+=u;break;case dt:if(X(t)){if(f=yt,"/"!=u&&"\\"!=u)continue}else if(n||"?"!=u)if(n||"#"!=u){if(u!=e&&(f=yt,"/"!=u))continue}else t.fragment="",f=bt;else t.query="",f=mt;break;case yt:if(u==e||"/"==u||"\\"==u&&X(t)||!n&&("?"==u||"#"==u)){if(".."===(s=(s=v).toLowerCase())||"%2e."===s||".%2e"===s||"%2e%2e"===s?(K(t),"/"==u||"\\"==u&&X(t)||t.path.push("")):Z(v)?"/"==u||"\\"==u&&X(t)||t.path.push(""):("file"==t.scheme&&!t.path.length&&H(v)&&(t.host&&(t.host=""),v=v.charAt(0)+":"),t.path.push(v)),v="","file"==t.scheme&&(u==e||"?"==u||"#"==u))for(;t.path.length>1&&""===t.path[0];)t.path.shift();"?"==u?(t.query="",f=mt):"#"==u&&(t.fragment="",f=bt)}else v+=V(u,G);break;case xt:"?"==u?(t.query="",f=mt):"#"==u?(t.fragment="",f=bt):u!=e&&(t.path[0]+=V(u,B));break;case mt:n||"#"!=u?u!=e&&("'"==u&&X(t)?t.query+="%27":t.query+="#"==u?"%23":V(u,B)):(t.fragment="",f=bt);break;case bt:u!=e&&(t.fragment+=V(u,D))}h++}},wt=function(t){var r,n,e=f(this,wt,"URL"),o=arguments.length>1?arguments[1]:void 0,u=String(t),a=w(e,{type:"URL"});if(void 0!==o)if(o instanceof wt)r=E(o);else if(n=St(r={},String(o)))throw TypeError(n);if(n=St(a,u,null,r))throw TypeError(n);var c=a.searchParams=new b,s=S(c);s.updateSearchParams(a.query),s.updateURL=function(){a.query=String(c)||null},i||(e.href=Ot.call(e),e.origin=At.call(e),e.protocol=It.call(e),e.username=Rt.call(e),e.password=jt.call(e),e.host=kt.call(e),e.hostname=Lt.call(e),e.port=Pt.call(e),e.pathname=_t.call(e),e.search=Nt.call(e),e.searchParams=Tt.call(e),e.hash=Ut.call(e))},Et=wt.prototype,Ot=function(){var t=E(this),r=t.scheme,n=t.username,e=t.password,o=t.host,i=t.port,u=t.path,a=t.query,c=t.fragment,s=r+":";return null!==o?(s+="//",J(t)&&(s+=n+(e?":"+e:"")+"@"),s+=q(o),null!==i&&(s+=":"+i)):"file"==r&&(s+="//"),s+=t.cannotBeABaseURL?u[0]:u.length?"/"+u.join("/"):"",null!==a&&(s+="?"+a),null!==c&&(s+="#"+c),s},At=function(){var t=E(this),r=t.scheme,n=t.port;if("blob"==r)try{return new URL(r.path[0]).origin}catch(t){return"null"}return"file"!=r&&X(t)?r+"://"+q(t.host)+(null!==n?":"+n:""):"null"},It=function(){return E(this).scheme+":"},Rt=function(){return E(this).username},jt=function(){return E(this).password},kt=function(){var t=E(this),r=t.host,n=t.port;return null===r?"":null===n?q(r):q(r)+":"+n},Lt=function(){var t=E(this).host;return null===t?"":q(t)},Pt=function(){var t=E(this).port;return null===t?"":String(t)},_t=function(){var t=E(this),r=t.path;return t.cannotBeABaseURL?r[0]:r.length?"/"+r.join("/"):""},Nt=function(){var t=E(this).query;return t?"?"+t:""},Tt=function(){return E(this).searchParams},Ut=function(){var t=E(this).fragment;return t?"#"+t:""},Ft=function(t,r){return{get:t,set:r,configurable:!0,enumerable:!0}};if(i&&c(Et,{href:Ft(Ot,function(t){var r=E(this),n=String(t),e=St(r,n);if(e)throw TypeError(e);S(r.searchParams).updateSearchParams(r.query)}),origin:Ft(At),protocol:Ft(It,function(t){var r=E(this);St(r,String(t)+":",tt)}),username:Ft(Rt,function(t){var r=E(this),n=p(String(t));if(!Y(r)){r.username="";for(var e=0;e<n.length;e++)r.username+=V(n[e],W)}}),password:Ft(jt,function(t){var r=E(this),n=p(String(t));if(!Y(r)){r.password="";for(var e=0;e<n.length;e++)r.password+=V(n[e],W)}}),host:Ft(kt,function(t){var r=E(this);r.cannotBeABaseURL||St(r,String(t),ft)}),hostname:Ft(Lt,function(t){var r=E(this);r.cannotBeABaseURL||St(r,String(t),lt)}),port:Ft(Pt,function(t){var r=E(this);Y(r)||(""==(t=String(t))?r.port=null:St(r,t,ht))}),pathname:Ft(_t,function(t){var r=E(this);r.cannotBeABaseURL||(r.path=[],St(r,t+"",dt))}),search:Ft(Nt,function(t){var r=E(this);""==(t=String(t))?r.query=null:("?"==t.charAt(0)&&(t=t.slice(1)),r.query="",St(r,t,mt)),S(r.searchParams).updateSearchParams(r.query)}),searchParams:Ft(Tt),hash:Ft(Ut,function(t){var r=E(this);""!=(t=String(t))?("#"==t.charAt(0)&&(t=t.slice(1)),r.fragment="",St(r,t,bt)):r.fragment=null})}),s(Et,"toJSON",function(){return Ot.call(this)},{enumerable:!0}),s(Et,"toString",function(){return Ot.call(this)},{enumerable:!0}),m){var Mt=m.createObjectURL,Ct=m.revokeObjectURL;Mt&&s(wt,"createObjectURL",function(t){return Mt.apply(m,arguments)}),Ct&&s(wt,"revokeObjectURL",function(t){return Ct.apply(m,arguments)})}d(wt,"URL"),o({global:!0,forced:!u,sham:!i},{URL:wt})},function(t,r,n){"use strict";var e=/[^\0-\u007E]/,o=/[.\u3002\uFF0E\uFF61]/g,i="Overflow: input needs wider integers to process",u=Math.floor,a=String.fromCharCode,c=function(t){return t+22+75*(t<26)},s=function(t,r,n){var e=0;for(t=n?u(t/700):t>>1,t+=u(t/r);t>455;e+=36)t=u(t/35);return u(e+36*t/(t+38))},f=function(t){var r,n,e=[],o=(t=function(t){for(var r=[],n=0,e=t.length;n<e;){var o=t.charCodeAt(n++);if(o>=55296&&o<=56319&&n<e){var i=t.charCodeAt(n++);56320==(64512&i)?r.push(((1023&o)<<10)+(1023&i)+65536):(r.push(o),n--)}else r.push(o)}return r}(t)).length,f=128,l=0,h=72;for(r=0;r<t.length;r++)(n=t[r])<128&&e.push(a(n));var p=e.length,v=p;for(p&&e.push("-");v<o;){var g=2147483647;for(r=0;r<t.length;r++)(n=t[r])>=f&&n<g&&(g=n);var d=v+1;if(g-f>u((2147483647-l)/d))throw RangeError(i);for(l+=(g-f)*d,f=g,r=0;r<t.length;r++){if((n=t[r])<f&&++l>2147483647)throw RangeError(i);if(n==f){for(var y=l,x=36;;x+=36){var m=x<=h?1:x>=h+26?26:x-h;if(y<m)break;var b=y-m,S=36-m;e.push(a(c(m+b%S))),y=u(b/S)}e.push(a(c(y))),h=s(l,d,v==p),l=0,++v}}++l,++f}return e.join("")};t.exports=function(t){var r,n,i=[],u=t.toLowerCase().replace(o,".").split(".");for(r=0;r<u.length;r++)n=u[r],i.push(e.test(n)?"xn--"+f(n):n);return i.join(".")}},function(t,r,n){var e=n(7),o=n(48);t.exports=function(t){var r=o(t);if("function"!=typeof r)throw TypeError(String(t)+" is not iterable");return e(r.call(t))}},function(t,r,n){"use strict";n(0)({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})}]); }();

//!fetch 3.0.0, global "this" must be replaced with "window"
!function(t,e){ true?e(exports):undefined}(window,function(t){"use strict";var e={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};if(e.arrayBuffer)var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(t){return t&&r.indexOf(Object.prototype.toString.call(t))>-1};function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!=typeof t&&(t=String(t)),t}function s(t){var r={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return e.iterable&&(r[Symbol.iterator]=function(){return r}),r}function a(t){this.map={},t instanceof a?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function h(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function f(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function u(t){var e=new FileReader,r=f(e);return e.readAsArrayBuffer(t),r}function d(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function c(){return this.bodyUsed=!1,this._initBody=function(t){var r;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:e.blob&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:e.formData&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():e.arrayBuffer&&e.blob&&(r=t)&&DataView.prototype.isPrototypeOf(r)?(this._bodyArrayBuffer=d(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):e.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(t)||o(t))?this._bodyArrayBuffer=d(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},e.blob&&(this.blob=function(){var t=h(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?h(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(u)}),this.text=function(){var t,e,r,o=h(this);if(o)return o;if(this._bodyBlob)return t=this._bodyBlob,r=f(e=new FileReader),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},e.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}a.prototype.append=function(t,e){t=n(t),e=i(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},a.prototype.delete=function(t){delete this.map[n(t)]},a.prototype.get=function(t){return t=n(t),this.has(t)?this.map[t]:null},a.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},a.prototype.set=function(t,e){this.map[n(t)]=i(e)},a.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},a.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),s(t)},a.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},a.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),s(t)},e.iterable&&(a.prototype[Symbol.iterator]=a.prototype.entries);var l=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function y(t,e){var r,o,n=(e=e||{}).body;if(t instanceof y){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new a(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,n||null==t._bodyInit||(n=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new a(e.headers)),this.method=(o=(r=e.method||this.method||"GET").toUpperCase(),l.indexOf(o)>-1?o:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&n)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(n)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function b(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new a(e.headers),this.url=e.url||"",this._initBody(t)}y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},c.call(y.prototype),c.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new a(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var m=[301,302,303,307,308];b.redirect=function(t,e){if(-1===m.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.DOMException=self.DOMException;try{new t.DOMException}catch(e){t.DOMException=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function w(r,o){return new Promise(function(n,i){var s=new y(r,o);if(s.signal&&s.signal.aborted)return i(new t.DOMException("Aborted","AbortError"));var h=new XMLHttpRequest;function f(){h.abort()}h.onload=function(){var t,e,r={status:h.status,statusText:h.statusText,headers:(t=h.getAllResponseHeaders()||"",e=new a,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e)};r.url="responseURL"in h?h.responseURL:r.headers.get("X-Request-URL");var o="response"in h?h.response:h.responseText;n(new b(o,r))},h.onerror=function(){i(new TypeError("Network request failed"))},h.ontimeout=function(){i(new TypeError("Network request failed"))},h.onabort=function(){i(new t.DOMException("Aborted","AbortError"))},h.open(s.method,s.url,!0),"include"===s.credentials?h.withCredentials=!0:"omit"===s.credentials&&(h.withCredentials=!1),"responseType"in h&&e.blob&&(h.responseType="blob"),s.headers.forEach(function(t,e){h.setRequestHeader(e,t)}),s.signal&&(s.signal.addEventListener("abort",f),h.onreadystatechange=function(){4===h.readyState&&s.signal.removeEventListener("abort",f)}),h.send(void 0===s._bodyInit?null:s._bodyInit)})}w.polyfill=!0,self.fetch||(self.fetch=w,self.Headers=a,self.Request=y,self.Response=b),t.Headers=a,t.Request=y,t.Response=b,t.fetch=w,Object.defineProperty(t,"__esModule",{value:!0})});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm/polyfills/dom.js":
/*!*********************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm/polyfills/dom.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function(){
  /*
    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
  */
  'use strict';var aa=new Set("annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" "));function g(a){var b=aa.has(a);a=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return!b&&a}function l(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||a instanceof Document))}
  function n(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}
  function p(a,b,d){d=void 0===d?new Set:d;for(var c=a;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c;b(e);var f=e.localName;if("link"===f&&"import"===e.getAttribute("rel")){c=e.import;if(c instanceof Node&&!d.has(c))for(d.add(c),c=c.firstChild;c;c=c.nextSibling)p(c,b,d);c=n(a,e);continue}else if("template"===f){c=n(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)p(e,b,d)}c=c.firstChild?c.firstChild:n(a,c)}}function r(a,b,d){a[b]=d};function u(){this.a=new Map;this.g=new Map;this.c=[];this.f=[];this.b=!1}function ba(a,b,d){a.a.set(b,d);a.g.set(d.constructorFunction,d)}function ca(a,b){a.b=!0;a.c.push(b)}function da(a,b){a.b=!0;a.f.push(b)}function v(a,b){a.b&&p(b,function(b){return w(a,b)})}function w(a,b){if(a.b&&!b.__CE_patched){b.__CE_patched=!0;for(var d=0;d<a.c.length;d++)a.c[d](b);for(d=0;d<a.f.length;d++)a.f[d](b)}}
  function x(a,b){var d=[];p(b,function(b){return d.push(b)});for(b=0;b<d.length;b++){var c=d[b];1===c.__CE_state?a.connectedCallback(c):y(a,c)}}function z(a,b){var d=[];p(b,function(b){return d.push(b)});for(b=0;b<d.length;b++){var c=d[b];1===c.__CE_state&&a.disconnectedCallback(c)}}
  function A(a,b,d){d=void 0===d?{}:d;var c=d.u||new Set,e=d.i||function(b){return y(a,b)},f=[];p(b,function(b){if("link"===b.localName&&"import"===b.getAttribute("rel")){var d=b.import;d instanceof Node&&(d.__CE_isImportDocument=!0,d.__CE_hasRegistry=!0);d&&"complete"===d.readyState?d.__CE_documentLoadHandled=!0:b.addEventListener("load",function(){var d=b.import;if(!d.__CE_documentLoadHandled){d.__CE_documentLoadHandled=!0;var f=new Set(c);f.delete(d);A(a,d,{u:f,i:e})}})}else f.push(b)},c);if(a.b)for(b=
  0;b<f.length;b++)w(a,f[b]);for(b=0;b<f.length;b++)e(f[b])}
  function y(a,b){if(void 0===b.__CE_state){var d=b.ownerDocument;if(d.defaultView||d.__CE_isImportDocument&&d.__CE_hasRegistry)if(d=a.a.get(b.localName)){d.constructionStack.push(b);var c=d.constructorFunction;try{try{if(new c!==b)throw Error("The custom element constructor did not produce the element being upgraded.");}finally{d.constructionStack.pop()}}catch(t){throw b.__CE_state=2,t;}b.__CE_state=1;b.__CE_definition=d;if(d.attributeChangedCallback)for(d=d.observedAttributes,c=0;c<d.length;c++){var e=
  d[c],f=b.getAttribute(e);null!==f&&a.attributeChangedCallback(b,e,null,f,null)}l(b)&&a.connectedCallback(b)}}}u.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};u.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};
  u.prototype.attributeChangedCallback=function(a,b,d,c,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&f.attributeChangedCallback.call(a,b,d,c,e)};function B(a){var b=document;this.c=a;this.a=b;this.b=void 0;A(this.c,this.a);"loading"===this.a.readyState&&(this.b=new MutationObserver(this.f.bind(this)),this.b.observe(this.a,{childList:!0,subtree:!0}))}function C(a){a.b&&a.b.disconnect()}B.prototype.f=function(a){var b=this.a.readyState;"interactive"!==b&&"complete"!==b||C(this);for(b=0;b<a.length;b++)for(var d=a[b].addedNodes,c=0;c<d.length;c++)A(this.c,d[c])};function ea(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function D(a){if(a.a)throw Error("Already resolved.");a.a=void 0;a.b&&a.b(void 0)};function E(a){this.c=!1;this.a=a;this.j=new Map;this.f=function(b){return b()};this.b=!1;this.g=[];this.o=new B(a)}
  E.prototype.l=function(a,b){var d=this;if(!(b instanceof Function))throw new TypeError("Custom element constructors must be functions.");if(!g(a))throw new SyntaxError("The element name '"+a+"' is not valid.");if(this.a.a.get(a))throw Error("A custom element with name '"+a+"' has already been defined.");if(this.c)throw Error("A custom element is already being defined.");this.c=!0;try{var c=function(b){var a=e[b];if(void 0!==a&&!(a instanceof Function))throw Error("The '"+b+"' callback must be a function.");
  return a},e=b.prototype;if(!(e instanceof Object))throw new TypeError("The custom element constructor's prototype is not an object.");var f=c("connectedCallback");var t=c("disconnectedCallback");var k=c("adoptedCallback");var h=c("attributeChangedCallback");var m=b.observedAttributes||[]}catch(q){return}finally{this.c=!1}b={localName:a,constructorFunction:b,connectedCallback:f,disconnectedCallback:t,adoptedCallback:k,attributeChangedCallback:h,observedAttributes:m,constructionStack:[]};ba(this.a,
  a,b);this.g.push(b);this.b||(this.b=!0,this.f(function(){return fa(d)}))};E.prototype.i=function(a){A(this.a,a)};
  function fa(a){if(!1!==a.b){a.b=!1;for(var b=a.g,d=[],c=new Map,e=0;e<b.length;e++)c.set(b[e].localName,[]);A(a.a,document,{i:function(b){if(void 0===b.__CE_state){var e=b.localName,f=c.get(e);f?f.push(b):a.a.a.get(e)&&d.push(b)}}});for(e=0;e<d.length;e++)y(a.a,d[e]);for(;0<b.length;){var f=b.shift();e=f.localName;f=c.get(f.localName);for(var t=0;t<f.length;t++)y(a.a,f[t]);(e=a.j.get(e))&&D(e)}}}E.prototype.get=function(a){if(a=this.a.a.get(a))return a.constructorFunction};
  E.prototype.m=function(a){if(!g(a))return Promise.reject(new SyntaxError("'"+a+"' is not a valid custom element name."));var b=this.j.get(a);if(b)return b.c;b=new ea;this.j.set(a,b);this.a.a.get(a)&&!this.g.some(function(b){return b.localName===a})&&D(b);return b.c};E.prototype.s=function(a){C(this.o);var b=this.f;this.f=function(d){return a(function(){return b(d)})}};window.CustomElementRegistry=E;E.prototype.define=E.prototype.l;E.prototype.upgrade=E.prototype.i;E.prototype.get=E.prototype.get;
  E.prototype.whenDefined=E.prototype.m;E.prototype.polyfillWrapFlushCallback=E.prototype.s;var F=window.Document.prototype.createElement,G=window.Document.prototype.createElementNS,ha=window.Document.prototype.importNode,ia=window.Document.prototype.prepend,ja=window.Document.prototype.append,ka=window.DocumentFragment.prototype.prepend,la=window.DocumentFragment.prototype.append,H=window.Node.prototype.cloneNode,I=window.Node.prototype.appendChild,J=window.Node.prototype.insertBefore,K=window.Node.prototype.removeChild,L=window.Node.prototype.replaceChild,M=Object.getOwnPropertyDescriptor(window.Node.prototype,
  "textContent"),N=window.Element.prototype.attachShadow,O=Object.getOwnPropertyDescriptor(window.Element.prototype,"innerHTML"),P=window.Element.prototype.getAttribute,Q=window.Element.prototype.setAttribute,R=window.Element.prototype.removeAttribute,S=window.Element.prototype.getAttributeNS,T=window.Element.prototype.setAttributeNS,U=window.Element.prototype.removeAttributeNS,ma=window.Element.prototype.insertAdjacentElement,na=window.Element.prototype.insertAdjacentHTML,oa=window.Element.prototype.prepend,
  pa=window.Element.prototype.append,V=window.Element.prototype.before,qa=window.Element.prototype.after,ra=window.Element.prototype.replaceWith,sa=window.Element.prototype.remove,ta=window.HTMLElement,W=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,"innerHTML"),ua=window.HTMLElement.prototype.insertAdjacentElement,va=window.HTMLElement.prototype.insertAdjacentHTML;var wa=new function(){};function xa(){var a=X;window.HTMLElement=function(){function b(){var b=this.constructor,c=a.g.get(b);if(!c)throw Error("The custom element being constructed was not registered with `customElements`.");var e=c.constructionStack;if(0===e.length)return e=F.call(document,c.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=c,w(a,e),e;c=e.length-1;var f=e[c];if(f===wa)throw Error("The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.");
  e[c]=wa;Object.setPrototypeOf(f,b.prototype);w(a,f);return f}b.prototype=ta.prototype;Object.defineProperty(b.prototype,"constructor",{writable:!0,configurable:!0,enumerable:!1,value:b});return b}()};function Y(a,b,d){function c(b){return function(d){for(var e=[],c=0;c<arguments.length;++c)e[c]=arguments[c];c=[];for(var f=[],m=0;m<e.length;m++){var q=e[m];q instanceof Element&&l(q)&&f.push(q);if(q instanceof DocumentFragment)for(q=q.firstChild;q;q=q.nextSibling)c.push(q);else c.push(q)}b.apply(this,e);for(e=0;e<f.length;e++)z(a,f[e]);if(l(this))for(e=0;e<c.length;e++)f=c[e],f instanceof Element&&x(a,f)}}void 0!==d.h&&(b.prepend=c(d.h));void 0!==d.append&&(b.append=c(d.append))};function ya(){var a=X;r(Document.prototype,"createElement",function(b){if(this.__CE_hasRegistry){var d=a.a.get(b);if(d)return new d.constructorFunction}b=F.call(this,b);w(a,b);return b});r(Document.prototype,"importNode",function(b,d){b=ha.call(this,b,!!d);this.__CE_hasRegistry?A(a,b):v(a,b);return b});r(Document.prototype,"createElementNS",function(b,d){if(this.__CE_hasRegistry&&(null===b||"http://www.w3.org/1999/xhtml"===b)){var c=a.a.get(d);if(c)return new c.constructorFunction}b=G.call(this,b,
  d);w(a,b);return b});Y(a,Document.prototype,{h:ia,append:ja})};function za(){function a(a,c){Object.defineProperty(a,"textContent",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(a){if(this.nodeType===Node.TEXT_NODE)c.set.call(this,a);else{var d=void 0;if(this.firstChild){var e=this.childNodes,k=e.length;if(0<k&&l(this)){d=Array(k);for(var h=0;h<k;h++)d[h]=e[h]}}c.set.call(this,a);if(d)for(a=0;a<d.length;a++)z(b,d[a])}}})}var b=X;r(Node.prototype,"insertBefore",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);
  a=J.call(this,a,c);if(l(this))for(c=0;c<e.length;c++)x(b,e[c]);return a}e=l(a);c=J.call(this,a,c);e&&z(b,a);l(this)&&x(b,a);return c});r(Node.prototype,"appendChild",function(a){if(a instanceof DocumentFragment){var c=Array.prototype.slice.apply(a.childNodes);a=I.call(this,a);if(l(this))for(var e=0;e<c.length;e++)x(b,c[e]);return a}c=l(a);e=I.call(this,a);c&&z(b,a);l(this)&&x(b,a);return e});r(Node.prototype,"cloneNode",function(a){a=H.call(this,!!a);this.ownerDocument.__CE_hasRegistry?A(b,a):v(b,
  a);return a});r(Node.prototype,"removeChild",function(a){var c=l(a),e=K.call(this,a);c&&z(b,a);return e});r(Node.prototype,"replaceChild",function(a,c){if(a instanceof DocumentFragment){var e=Array.prototype.slice.apply(a.childNodes);a=L.call(this,a,c);if(l(this))for(z(b,c),c=0;c<e.length;c++)x(b,e[c]);return a}e=l(a);var f=L.call(this,a,c),d=l(this);d&&z(b,c);e&&z(b,a);d&&x(b,a);return f});M&&M.get?a(Node.prototype,M):ca(b,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){for(var a=[],
  b=0;b<this.childNodes.length;b++){var f=this.childNodes[b];f.nodeType!==Node.COMMENT_NODE&&a.push(f.textContent)}return a.join("")},set:function(a){for(;this.firstChild;)K.call(this,this.firstChild);null!=a&&""!==a&&I.call(this,document.createTextNode(a))}})})};function Aa(a){function b(b){return function(e){for(var c=[],d=0;d<arguments.length;++d)c[d]=arguments[d];d=[];for(var k=[],h=0;h<c.length;h++){var m=c[h];m instanceof Element&&l(m)&&k.push(m);if(m instanceof DocumentFragment)for(m=m.firstChild;m;m=m.nextSibling)d.push(m);else d.push(m)}b.apply(this,c);for(c=0;c<k.length;c++)z(a,k[c]);if(l(this))for(c=0;c<d.length;c++)k=d[c],k instanceof Element&&x(a,k)}}var d=Element.prototype;void 0!==V&&(d.before=b(V));void 0!==V&&(d.after=b(qa));void 0!==ra&&
  r(d,"replaceWith",function(b){for(var e=[],c=0;c<arguments.length;++c)e[c]=arguments[c];c=[];for(var d=[],k=0;k<e.length;k++){var h=e[k];h instanceof Element&&l(h)&&d.push(h);if(h instanceof DocumentFragment)for(h=h.firstChild;h;h=h.nextSibling)c.push(h);else c.push(h)}k=l(this);ra.apply(this,e);for(e=0;e<d.length;e++)z(a,d[e]);if(k)for(z(a,this),e=0;e<c.length;e++)d=c[e],d instanceof Element&&x(a,d)});void 0!==sa&&r(d,"remove",function(){var b=l(this);sa.call(this);b&&z(a,this)})};function Ba(){function a(a,b){Object.defineProperty(a,"innerHTML",{enumerable:b.enumerable,configurable:!0,get:b.get,set:function(a){var e=this,d=void 0;l(this)&&(d=[],p(this,function(a){a!==e&&d.push(a)}));b.set.call(this,a);if(d)for(var f=0;f<d.length;f++){var t=d[f];1===t.__CE_state&&c.disconnectedCallback(t)}this.ownerDocument.__CE_hasRegistry?A(c,this):v(c,this);return a}})}function b(a,b){r(a,"insertAdjacentElement",function(a,e){var d=l(e);a=b.call(this,a,e);d&&z(c,e);l(a)&&x(c,e);return a})}
  function d(a,b){function e(a,b){for(var e=[];a!==b;a=a.nextSibling)e.push(a);for(b=0;b<e.length;b++)A(c,e[b])}r(a,"insertAdjacentHTML",function(a,c){a=a.toLowerCase();if("beforebegin"===a){var d=this.previousSibling;b.call(this,a,c);e(d||this.parentNode.firstChild,this)}else if("afterbegin"===a)d=this.firstChild,b.call(this,a,c),e(this.firstChild,d);else if("beforeend"===a)d=this.lastChild,b.call(this,a,c),e(d||this.firstChild,null);else if("afterend"===a)d=this.nextSibling,b.call(this,a,c),e(this.nextSibling,
  d);else throw new SyntaxError("The value provided ("+String(a)+") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");})}var c=X;N&&r(Element.prototype,"attachShadow",function(a){a=N.call(this,a);var b=c;if(b.b&&!a.__CE_patched){a.__CE_patched=!0;for(var e=0;e<b.c.length;e++)b.c[e](a)}return this.__CE_shadowRoot=a});O&&O.get?a(Element.prototype,O):W&&W.get?a(HTMLElement.prototype,W):da(c,function(b){a(b,{enumerable:!0,configurable:!0,get:function(){return H.call(this,!0).innerHTML},
  set:function(a){var b="template"===this.localName,c=b?this.content:this,e=G.call(document,this.namespaceURI,this.localName);for(e.innerHTML=a;0<c.childNodes.length;)K.call(c,c.childNodes[0]);for(a=b?e.content:e;0<a.childNodes.length;)I.call(c,a.childNodes[0])}})});r(Element.prototype,"setAttribute",function(a,b){if(1!==this.__CE_state)return Q.call(this,a,b);var e=P.call(this,a);Q.call(this,a,b);b=P.call(this,a);c.attributeChangedCallback(this,a,e,b,null)});r(Element.prototype,"setAttributeNS",function(a,
  b,d){if(1!==this.__CE_state)return T.call(this,a,b,d);var e=S.call(this,a,b);T.call(this,a,b,d);d=S.call(this,a,b);c.attributeChangedCallback(this,b,e,d,a)});r(Element.prototype,"removeAttribute",function(a){if(1!==this.__CE_state)return R.call(this,a);var b=P.call(this,a);R.call(this,a);null!==b&&c.attributeChangedCallback(this,a,b,null,null)});r(Element.prototype,"removeAttributeNS",function(a,b){if(1!==this.__CE_state)return U.call(this,a,b);var d=S.call(this,a,b);U.call(this,a,b);var e=S.call(this,
  a,b);d!==e&&c.attributeChangedCallback(this,b,d,e,a)});ua?b(HTMLElement.prototype,ua):ma?b(Element.prototype,ma):console.warn("Custom Elements: `Element#insertAdjacentElement` was not patched.");va?d(HTMLElement.prototype,va):na?d(Element.prototype,na):console.warn("Custom Elements: `Element#insertAdjacentHTML` was not patched.");Y(c,Element.prototype,{h:oa,append:pa});Aa(c)};var Z=window.customElements;if(!Z||Z.forcePolyfill||"function"!=typeof Z.define||"function"!=typeof Z.get){var X=new u;xa();ya();Y(X,DocumentFragment.prototype,{h:ka,append:la});za();Ba();document.__CE_hasRegistry=!0;var customElements=new E(X);Object.defineProperty(window,"customElements",{configurable:!0,enumerable:!0,value:customElements})};
}).call(self);

// Polyfill document.baseURI
"string"!==typeof document.baseURI&&Object.defineProperty(Document.prototype,"baseURI",{enumerable:!0,configurable:!0,get:function(){var a=document.querySelector("base");return a&&a.href?a.href:document.URL}});

// Polyfill CustomEvent
"function"!==typeof window.CustomEvent&&(window.CustomEvent=function(c,a){a=a||{bubbles:!1,cancelable:!1,detail:void 0};var b=document.createEvent("CustomEvent");b.initCustomEvent(c,a.bubbles,a.cancelable,a.detail);return b},window.CustomEvent.prototype=window.Event.prototype);

// Event.composedPath
(function(b,c,d){b.composedPath||(b.composedPath=function(){if(this.path)return this.path;var a=this.target;for(this.path=[];null!==a.parentNode;)this.path.push(a),a=a.parentNode;this.path.push(c,d);return this.path})})(Event.prototype,document,window);

/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);

/*!
Element.getRootNode()
*/
(function(c){function d(a){a=b(a);return a&&11===a.nodeType?d(a.host):a}function b(a){return a&&a.parentNode?b(a.parentNode):a}"function"!==typeof c.getRootNode&&(c.getRootNode=function(a){return a&&a.composed?d(this):b(this)})})(Element.prototype);

/*!
Element.isConnected()
*/
(function(a){"isConnected"in a||Object.defineProperty(a,"isConnected",{configurable:!0,enumerable:!0,get:function(){var a=this.getRootNode({composed:!0});return a&&9===a.nodeType}})})(Element.prototype);

/*!
Element.remove()
*/
(function(b){b.forEach(function(a){a.hasOwnProperty("remove")||Object.defineProperty(a,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);

/*!
Element.classList
*/
!function(e){'classList'in e||Object.defineProperty(e,"classList",{get:function(){var e=this,t=(e.getAttribute("class")||"").replace(/^\s+|\s$/g,"").split(/\s+/g);function n(){t.length>0?e.setAttribute("class",t.join(" ")):e.removeAttribute("class")}return""===t[0]&&t.splice(0,1),t.toggle=function(e,i){void 0!==i?i?t.add(e):t.remove(e):-1!==t.indexOf(e)?t.splice(t.indexOf(e),1):t.push(e),n()},t.add=function(){for(var e=[].slice.call(arguments),i=0,s=e.length;i<s;i++)-1===t.indexOf(e[i])&&t.push(e[i]);n()},t.remove=function(){for(var e=[].slice.call(arguments),i=0,s=e.length;i<s;i++)-1!==t.indexOf(e[i])&&t.splice(t.indexOf(e[i]),1);n()},t.item=function(e){return t[e]},t.contains=function(e){return-1!==t.indexOf(e)},t.replace=function(e,i){-1!==t.indexOf(e)&&t.splice(t.indexOf(e),1,i),n()},t.value=e.getAttribute("class")||"",t}})}(Element.prototype);

/*!
DOMTokenList
*/
(function(b){try{document.body.classList.add()}catch(e){var c=b.add,d=b.remove;b.add=function(){for(var a=0;a<arguments.length;a++)c.call(this,arguments[a])};b.remove=function(){for(var a=0;a<arguments.length;a++)d.call(this,arguments[a])}}})(DOMTokenList.prototype);


/***/ }),

/***/ "./node_modules/genero-design-system/dist/esm/polyfills/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm/polyfills/index.js ***!
  \***********************************************************************/
/*! exports provided: applyPolyfills */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPolyfills", function() { return applyPolyfills; });
function applyPolyfills() {
  var promises = [];
  if (typeof window !== 'undefined') {
    var win = window;

    if (!win.customElements ||
      (win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove || !win.Element.prototype.getRootNode))) {
      promises.push(__webpack_require__.e(/*! import() | polyfills-dom */ "/scripts/vendor").then(__webpack_require__.t.bind(null, /*! ./dom.js */ "./node_modules/genero-design-system/dist/esm/polyfills/dom.js", 7)));
    }

    function checkIfURLIsSupported() {
      try {
        var u = new URL('b', 'http://a');
        u.pathname = 'c%20d';
        return (u.href === 'http://a/c%20d') && u.searchParams;
      } catch (e) {
        return false;
      }
    }

    if (
      'function' !== typeof Object.assign || !Object.entries ||
      !Array.prototype.find || !Array.prototype.includes ||
      !String.prototype.startsWith || !String.prototype.endsWith ||
      (win.NodeList && !win.NodeList.prototype.forEach) ||
      !win.fetch ||
      !checkIfURLIsSupported() ||
      typeof WeakMap == 'undefined'
    ) {
      promises.push(__webpack_require__.e(/*! import() | polyfills-core-js */ "/scripts/vendor").then(__webpack_require__.t.bind(null, /*! ./core-js.js */ "./node_modules/genero-design-system/dist/esm/polyfills/core-js.js", 7)));
    }
  }
  return Promise.all(promises);
}


/***/ }),

/***/ "./node_modules/genero-design-system/loader/index.mjs":
/*!************************************************************!*\
  !*** ./node_modules/genero-design-system/loader/index.mjs ***!
  \************************************************************/
/*! exports provided: applyPolyfills, defineCustomElements */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_esm_polyfills_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/esm/polyfills/index.js */ "./node_modules/genero-design-system/dist/esm/polyfills/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyPolyfills", function() { return _dist_esm_polyfills_index_js__WEBPACK_IMPORTED_MODULE_0__["applyPolyfills"]; });

/* harmony import */ var _dist_esm_es5_loader_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dist/esm-es5/loader.mjs */ "./node_modules/genero-design-system/dist/esm-es5/loader.mjs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defineCustomElements", function() { return _dist_esm_es5_loader_mjs__WEBPACK_IMPORTED_MODULE_1__["defineCustomElements"]; });


(function(){if("undefined"!==typeof window&&void 0!==window.Reflect&&void 0!==window.customElements){var a=HTMLElement;window.HTMLElement=function(){return Reflect.construct(a,[],this.constructor)};HTMLElement.prototype=a.prototype;HTMLElement.prototype.constructor=HTMLElement;Object.setPrototypeOf(HTMLElement,a)}})();




/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=vendor.js.map