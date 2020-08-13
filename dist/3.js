(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-link.entry.js":
/*!***********************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-link.entry.js ***!
  \***********************************************************************************************/
/*! exports provided: gds_link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_link", function() { return GdsLink; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLinkCss = "a{text-decoration:none;color:inherit;display:inline-block}.block{display:block}";

var GdsLink =
/** @class */
function () {
  function GdsLink(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsLink.prototype.render = function () {
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("a", {
      "class": {
        block: this.block
      },
      href: this.href,
      target: this.target
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
  };

  return GdsLink;
}();

GdsLink.style = gdsLinkCss;


/***/ })

}]);
//# sourceMappingURL=3.js.map