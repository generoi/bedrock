(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-card_2.entry.js":
/*!*************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-card_2.entry.js ***!
  \*************************************************************************************************/
/*! exports provided: gds_card, gds_heading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_card", function() { return GdsCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_heading", function() { return GdsHeading; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsCardCss = ":host{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;text-align:center;border-radius:8px;background-color:white;-webkit-box-shadow:5px 5px 15px #64646426, -5px -5px 15px #ffffffcc;box-shadow:5px 5px 15px #64646426, -5px -5px 15px #ffffffcc;overflow:hidden;width:450px;-ms-flex-direction:column;flex-direction:column}";

var GdsCard =
/** @class */
function () {
  function GdsCard(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsCard.prototype.render = function () {
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
  };

  return GdsCard;
}();

GdsCard.style = gdsCardCss;
var gdsHeadingCss = ".size-xxl{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:72px;line-height:74px}.size-xl{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:60px;line-height:60px}.size-l{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:36px;line-height:36px}.size-m{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:28px;line-height:28px}.size-s{display:block;font-family:var(--heading-font-family);font-weight:600;letter-spacing:0px;font-size:20px;line-height:24px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase}";

var GdsHeading =
/** @class */
function () {
  function GdsHeading(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    /**
     * Size of the heading.
     */

    this.size = 'm';
  }

  GdsHeading.prototype.render = function () {
    var cls = "size-" + this.size; // This is a bit clumsy but I couldn't figure out a better way.

    switch (this.as) {
      case 'h1':
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h1", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));

      case 'h2':
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h2", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));

      case 'h3':
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h3", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));

      case 'h4':
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h4", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));

      case 'h5':
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("h5", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));

      default:
        return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
          "class": cls
        }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
    }
  };

  return GdsHeading;
}();

GdsHeading.style = gdsHeadingCss;


/***/ })

}]);
//# sourceMappingURL=1.js.map