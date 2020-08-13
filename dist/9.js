(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "../../../../../genero-design-system/dist/esm-es5/gds-navigation.entry.js":
/*!*****************************************************************************************************!*\
  !*** /Users/taromorimoto/projects/genero/genero-design-system/dist/esm-es5/gds-navigation.entry.js ***!
  \*****************************************************************************************************/
/*! exports provided: gds_navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gds_navigation", function() { return GdsNavigation; });
/* harmony import */ var _index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ae5ae664.js */ "../../../../../genero-design-system/dist/esm-es5/index-ae5ae664.js");

var gdsNavigationCss = "header{background-color:var(--navigation-background-color)}.container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding-right:var(--spacing-xs);height:var(--navigation-mobile-height)}@media (min-width: 1024px){.container{height:var(--navigation-desktop-height)}}.content{display:-ms-flexbox;display:flex}@media (max-width: 1023px){.content{display:none;position:absolute;background-color:white;top:var(--navigation-mobile-height);left:0;right:0;border-top:2px solid var(--body-background-color)}}.mobile-extensions{display:block;border-top:2px solid var(--body-background-color);padding:var(--spacing-l) 0}@media (min-width: 1024px){.mobile-extensions{display:none}}@media (max-width: 1023px){.desktop-extensions{display:none}}@media (max-width: 1023px){nav{margin:var(--spacing-l) 0}}.hamburger{--button-l-font-size:30px;--button-l-padding:16px}@media (min-width: 1024px){.hamburger{display:none}}.logo{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding-left:var(--spacing-l);height:var(--navigation-mobile-height)}.logo img{height:32px}@media (min-width: 1024px){.logo{height:var(--navigation-desktop-height)}.logo img{height:48px}}";

var GdsNavigation =
/** @class */
function () {
  function GdsNavigation(hostRef) {
    Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
    /**
     * Mobile menu icon.
     */

    this.menuIcon = '☰';
  }

  GdsNavigation.prototype.render = function () {
    var _this = this; // Toggle manu open (mobile only).


    var onHamburgerClick = function onHamburgerClick() {
      var style = window.getComputedStyle(_this.content);

      if (style.display === 'none') {
        _this.content.style.display = 'block';
        _this.menuIcon = '✕';
        _this.open = true;
      } else {
        _this.content.style.display = 'none';
        _this.menuIcon = '☰';
        _this.open = false;
      }
    };

    return Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["H"], null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("header", null, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "container"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "logo"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
      name: "logo"
    })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "content",
      ref: function ref(el) {
        return _this.content = el;
      }
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("nav", {
      "class": "nav-primary"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
      name: "menu"
    })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "mobile-extensions"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
      name: "mobile-extensions"
    }))), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "desktop-extensions"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
      name: "desktop-extensions"
    })), Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
      "class": "hamburger"
    }, Object(_index_ae5ae664_js__WEBPACK_IMPORTED_MODULE_0__["h"])("gds-button", {
      size: "l",
      text: true,
      onClick: onHamburgerClick
    }, this.menuIcon)))));
  };

  return GdsNavigation;
}();

GdsNavigation.style = gdsNavigationCss;


/***/ })

}]);
//# sourceMappingURL=9.js.map