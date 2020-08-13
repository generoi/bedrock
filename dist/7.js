(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-menu-item.entry.js":
/*!****************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-menu-item.entry.js ***!
  \****************************************************************************************************/
/*! exports provided: gds_menu_item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_menu_item", function() { return GdsMenuItem; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMenuItemCss = "li{-webkit-box-sizing:border-box;box-sizing:border-box;list-style:none}@media (max-width: 767px){.active{background-color:var(--background-color-primary)}}.content{height:var(--spacing-xxl);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;padding:0 var(--spacing-m)}@media (min-width: 1024px){.content{padding:0 var(--spacing-s)}}:host-context(.vertical) .content{padding:0 var(--spacing-m)}:host-context(.horizontal) .content{padding:0 var(--spacing-s)}.underline-container{position:relative;width:100%;height:0}@media (max-width: 1023px){.underline-container{display:none}}.underline{position:absolute;width:100%;top:4px;border-bottom:3px solid var(--text-color-primary)}.divider{margin:var(--spacing-m) 0;border-top:2px solid var(--background-color-primary)}";

var GdsMenuItem =
/** @class */
function () {
  function GdsMenuItem(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsMenuItem.prototype.render = function () {
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("li", {
      "class": {
        item: true,
        active: this.active
      }
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "content"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-label", {
      size: "l"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), this.active && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "underline-container"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "underline"
    }))));
  };

  return GdsMenuItem;
}();

GdsMenuItem.style = gdsMenuItemCss;


/***/ })

}]);
//# sourceMappingURL=7.js.map