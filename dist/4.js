(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-logo-grid-item.entry.js":
/*!*********************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-logo-grid-item.entry.js ***!
  \*********************************************************************************************************/
/*! exports provided: gds_logo_grid_item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_logo_grid_item", function() { return GdsLogoGridItem; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLogoGridItemCss = ":host{display:block;contain:content;}.image{display:block;position:relative;width:100%;height:100%}img{width:100%;height:100%;-o-object-fit:contain;object-fit:contain;-o-object-position:50% 50%;object-position:50% 50%}a{width:100%;height:100%}.gds-logo-grid-item-container{width:70%;height:70%;padding:15%}";

var GdsLogoGridItem =
/** @class */
function () {
  function GdsLogoGridItem(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsLogoGridItem.prototype.render = function () {
    // Main content
    var content = Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "gds-logo-grid-item-container"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("picture", {
      "class": "image"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("source", {
      srcSet: this.imageUrl
    }), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
      src: this.imageUrl
    }))); // Render without a link

    if (!this.href) return content; // Render with a link
    // FIXME: Not vertically aligns now that gds-link is using shadown dom.

    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", {
      block: true,
      href: this.href,
      target: this.target
    }, content);
  };

  return GdsLogoGridItem;
}();

GdsLogoGridItem.style = gdsLogoGridItemCss;


/***/ })

}]);
//# sourceMappingURL=4.js.map