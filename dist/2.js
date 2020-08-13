(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-label.entry.js":
/*!************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-label.entry.js ***!
  \************************************************************************************************/
/*! exports provided: gds_label */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_label", function() { return GdsLabel; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsLabelCss = ":host{font-family:var(--label-font-family);text-transform:uppercase}.size-l{font-size:var(--label-l-font-size);line-height:19px;letter-spacing:var(--label-l-letter-spacing);font-weight:var(--label-l-font-weight)}.size-m{font-size:var(--label-m-font-size);line-height:16px;letter-spacing:var(--label-m-letter-spacing);font-weight:var(--label-m-font-weight)}.size-s{font-size:var(--label-s-font-size);line-height:14px;letter-spacing:var(--label-s-letter-spacing);font-weight:var(--label-s-font-weight)}";

var GdsLabel =
/** @class */
function () {
  function GdsLabel(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    /**
     * Size of the label.
     */

    this.size = 'm';
  }

  GdsLabel.prototype.render = function () {
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
      style: {
        color: this.color
      }
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
      "class": "size-" + this.size
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
  };

  return GdsLabel;
}();

GdsLabel.style = gdsLabelCss;


/***/ })

}]);
//# sourceMappingURL=2.js.map