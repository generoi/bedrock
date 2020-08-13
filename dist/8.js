(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-menu.entry.js":
/*!***********************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-menu.entry.js ***!
  \***********************************************************************************************/
/*! exports provided: gds_menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_menu", function() { return GdsMenu; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMenuCss = "ul{padding:0;margin:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}@media (min-width: 1024px){ul{-ms-flex-direction:row;flex-direction:row}}.vertical{-ms-flex-direction:column;flex-direction:column}.horizontal{-ms-flex-direction:row;flex-direction:row}::slotted(a){color:unset;text-decoration:none}";

var GdsMenu =
/** @class */
function () {
  function GdsMenu(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsMenu.prototype.render = function () {
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ul", {
      "class": this.direction
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
      name: "item"
    }));
  };

  return GdsMenu;
}();

GdsMenu.style = gdsMenuCss;


/***/ })

}]);
//# sourceMappingURL=8.js.map