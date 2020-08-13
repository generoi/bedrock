(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-button_2.entry.js":
/*!***************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-button_2.entry.js ***!
  \***************************************************************************************************/
/*! exports provided: gds_button, gds_paragraph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_button", function() { return GdsButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_paragraph", function() { return GdsParagraph; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsButtonCss = ".button{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;text-align:center;outline:none;text-decoration:none;cursor:pointer;color:inherit;background-color:inherit;font-family:var(--button-font-family);font-weight:var(--button-font-weight);text-transform:var(--button-text-transform);height:56px;line-height:1em;font-size:20px;letter-spacing:var(--button-m-letter-spacing);border:none;border-radius:var(--button-border-radius);-webkit-box-shadow:var(--button-box-shadow);box-shadow:var(--button-box-shadow);padding:var(--button-m-padding);color:var(--button-color);background-color:var(--button-background-color)}.button:hover{background-color:var(--button-background-color-hover)}.button:disabled{background-color:var(--button-background-color-hover)}.button>*+*{margin-left:16px}.text-button{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;text-align:center;outline:none;text-decoration:none;cursor:pointer;color:inherit;background-color:inherit;font-family:var(--button-font-family);font-weight:var(--button-font-weight);text-transform:var(--button-text-transform);height:56px;line-height:1em;font-size:20px;letter-spacing:var(--button-m-letter-spacing);border:none;border-radius:var(--button-border-radius);-webkit-box-shadow:var(--button-box-shadow);box-shadow:var(--button-box-shadow);padding:var(--button-m-padding)}.text-button:hover{background-color:var(--button-background-color-hover)}.text-button:disabled{background-color:var(--button-background-color-hover)}.text-button>*+*{margin-left:16px}.text-button:hover{background-color:inherit}.text-button:disabled{background-color:inherit}.size-s{height:48px;font-size:var(--button-s-font-size);letter-spacing:var(--button-s-letter-spacing);padding:var(--button-s-padding)}.size-m{height:56px;font-size:var(--button-m-font-size);letter-spacing:var(--button-m-letter-spacing);padding:var(--button-m-padding)}.size-l{height:56px;font-size:var(--button-l-font-size);letter-spacing:var(--button-l-letter-spacing);padding:var(--button-l-padding)}";

var GdsButton =
/** @class */
function () {
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
    var _a; // This ugly syntax is because of prettier. TODO: Fix this syntax.


    var rightIconStyle = this.rightIconRotate ? {
      transform: "rotate(" + this.rightIconRotate + "deg)"
    } : undefined;
    var leftIconStyle = this.leftIconRotate ? {
      transform: "rotate(" + this.leftIconRotate + "deg)"
    } : undefined;
    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("button", {
      "class": (_a = {
        button: !this.text,
        'text-button': this.text
      }, _a["size-" + this.size] = true, _a),
      disabled: this.disabled
    }, this.leftIcon && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
      style: leftIconStyle
    }, this.leftIcon), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), this.rightIcon && Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("span", {
      style: rightIconStyle
    }, this.rightIcon)));
  };

  return GdsButton;
}();

GdsButton.style = gdsButtonCss;
var gdsParagraphCss = ".gds-paragraph-l{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:20px;line-height:24px}.gds-paragraph-m{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:17px;line-height:27px}.gds-paragraph-s{display:block;color:var(--body-text-color);font-family:var(--body-font-family);font-weight:400;letter-spacing:0px;font-size:15px;line-height:25px}";

var GdsParagraph =
/** @class */
function () {
  function GdsParagraph(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    /**
     * Size of the text.
     */

    this.size = 'm';
  }

  GdsParagraph.prototype.render = function () {
    var _a;

    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("p", {
      "class": (_a = {}, _a["gds-paragraph-" + this.size] = true, _a[this["class"]] = !!this["class"], _a)
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
  };

  return GdsParagraph;
}();

GdsParagraph.style = gdsParagraphCss;


/***/ })

}]);
//# sourceMappingURL=0.js.map