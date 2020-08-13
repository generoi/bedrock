(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-tag.entry.js":
/*!**********************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-tag.entry.js ***!
  \**********************************************************************************************/
/*! exports provided: gds_tag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_tag", function() { return GdsTag; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsTagCss = ".tag{display:inline-block;background-color:black;padding:4px 12px 6px 12px;border-radius:10px}";

var GdsTag =
/** @class */
function () {
  function GdsTag(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    /**
     * Color for the tag text.
     * TODO: Implement the color custom variable scheme.
     */

    this.color = 'white';
  }

  GdsTag.prototype.render = function () {
    // Main content
    var tag = Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "tag",
      style: {
        backgroundColor: this.backgroundColor,
        color: this.color
      }
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-label", {
      color: this.color,
      size: "s"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null))); // Render without a link

    if (!this.href) return tag; // Render with a link

    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", {
      href: this.href,
      target: this.target
    }, tag);
  };

  return GdsTag;
}();

GdsTag.style = gdsTagCss;


/***/ })

}]);
//# sourceMappingURL=10.js.map