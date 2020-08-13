(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-media-card.entry.js":
/*!*****************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-media-card.entry.js ***!
  \*****************************************************************************************************/
/*! exports provided: gds_media_card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_media_card", function() { return GdsMediaCard; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsMediaCardCss = ".image{width:100%;height:370px;display:block;margin-bottom:24px}.headline{margin-bottom:8px}.description{margin:0 24px}.tags{margin:20px 8px 32px 8px}";

var GdsMediaCard =
/** @class */
function () {
  function GdsMediaCard(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
  }

  GdsMediaCard.prototype.render = function () {
    // Main content
    var card = Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-card", null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("img", {
      src: this.imageUrl,
      "class": "image"
    }), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "headline"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-heading", {
      size: "s"
    }, this.headline)), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-paragraph", {
      "class": "description"
    }, this.description), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "tags"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null))); // Render without a link

    if (!this.href) return card; // Render with a link

    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-link", {
      href: this.href,
      target: this.target
    }, card);
  };

  return GdsMediaCard;
}();

GdsMediaCard.style = gdsMediaCardCss;


/***/ })

}]);
//# sourceMappingURL=6.js.map