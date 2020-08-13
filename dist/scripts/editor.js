(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/scripts/editor"],{

/***/ "./node_modules/genero-design-system/dist/esm-es5 lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/genero-design-system/dist/esm-es5 lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./gds-button_2.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-button_2.entry.js",
		"/scripts/vendor"
	],
	"./gds-card_2.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-card_2.entry.js",
		"/scripts/vendor"
	],
	"./gds-label.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-label.entry.js",
		"/scripts/vendor"
	],
	"./gds-link.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-link.entry.js",
		"/scripts/vendor"
	],
	"./gds-logo-grid-item.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid-item.entry.js",
		"/scripts/vendor"
	],
	"./gds-logo-grid.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-logo-grid.entry.js",
		"/scripts/vendor"
	],
	"./gds-media-card.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-media-card.entry.js",
		"/scripts/vendor"
	],
	"./gds-menu-item.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-menu-item.entry.js",
		"/scripts/vendor"
	],
	"./gds-menu.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-menu.entry.js",
		"/scripts/vendor"
	],
	"./gds-navigation.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-navigation.entry.js",
		"/scripts/vendor"
	],
	"./gds-tag.entry.js": [
		"./node_modules/genero-design-system/dist/esm-es5/gds-tag.entry.js",
		"/scripts/vendor"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./node_modules/genero-design-system/dist/esm-es5 lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./resources/assets/scripts/editor.js":
/*!********************************************!*\
  !*** ./resources/assets/scripts/editor.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var genero_design_system_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! genero-design-system/loader */ "./node_modules/genero-design-system/loader/index.mjs");
/* harmony import */ var _editor_blocks_gds_media_card_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./editor/blocks/gds-media-card/index */ "./resources/assets/scripts/editor/blocks/gds-media-card/index.js");








Object(genero_design_system_loader__WEBPACK_IMPORTED_MODULE_6__["applyPolyfills"])().then(function () {
  Object(genero_design_system_loader__WEBPACK_IMPORTED_MODULE_6__["defineCustomElements"])();
});
Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockCollection"])('gds', {
  title: 'Genero Design System'
});
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(function () {
  Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockStyle"])('core/media-text', {
    name: 'default',
    label: 'Default',
    isDefault: true
  });
  Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockStyle"])('core/media-text', {
    name: 'hero',
    label: 'Hero'
  });
  Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockStyle"])('core/media-text', {
    name: 'two-thirds',
    label: 'Two Thirds Content'
  });
  Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__["registerBlockStyle"])('core/heading', {
    name: 'floating',
    label: 'Floating'
  });
  Object(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__["addFilter"])('editor.BlockListBlock', 'sage/group-default-background', Object(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__["createHigherOrderComponent"])(function (BlockListBlock) {
    return function (props) {
      if (props.name === 'core/group' && !props.attributes.backgroundColor) {
        props.attributes.backgroundColor = 'light-blue';
      }

      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockListBlock, props);
    };
  }));
});

/***/ }),

/***/ "./resources/assets/scripts/editor/blocks/gds-media-card/block.json":
/*!**************************************************************************!*\
  !*** ./resources/assets/scripts/editor/blocks/gds-media-card/block.json ***!
  \**************************************************************************/
/*! exports provided: name, category, attributes, supports, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"gds/media-card\",\"category\":\"layout\",\"attributes\":{\"mediaType\":{\"type\":\"string\"},\"mediaId\":{\"type\":\"number\"},\"mediaUrl\":{\"type\":\"string\"},\"mediaAlt\":{\"type\":\"string\"},\"mediaHeight\":{\"type\":\"string\"},\"focalPoint\":{\"type\":\"object\"},\"backgroundColor\":{\"type\":\"string\"},\"textColor\":{\"type\":\"string\"},\"customBackgroundColor\":{\"type\":\"string\"},\"customTextColor\":{\"type\":\"string\"}},\"supports\":{\"html\":false,\"lightBlockWrapper\":true}}");

/***/ }),

/***/ "./resources/assets/scripts/editor/blocks/gds-media-card/edit.js":
/*!***********************************************************************!*\
  !*** ./resources/assets/scripts/editor/blocks/gds-media-card/edit.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils */ "./resources/assets/scripts/editor/utils.js");




/** @wordpress */





var ALLOWED_MEDIA_TYPES = ['image', 'video'];
var INNER_BLOCKS_TEMPLATE = [['core/heading', {
  placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Write heading…'),
  level: 3
}], ['core/paragraph', {
  placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Description…')
}], ['core/buttons', {}, [['core/button', {
  placeholder: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Read more…')
}]]]];

function PlaceholderContainer(_ref) {
  var className = _ref.className,
      noticeOperations = _ref.noticeOperations,
      noticeUI = _ref.noticeUI,
      onSelectMedia = _ref.onSelectMedia;

  var onUploadError = function onUploadError(message) {
    noticeOperations.removeAllNotices();
    noticeOperations.createErrorNotice(message);
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["MediaPlaceholder"], {
    labels: {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Media'),
      instructions: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Upload an image or video file, or pick one from your media library.')
    },
    className: className,
    onSelect: onSelectMedia,
    accept: "image/*,video/*",
    allowedTypes: ALLOWED_MEDIA_TYPES,
    notices: noticeUI,
    onError: onUploadError
  });
}

function MediaRenderer(_ref2) {
  var mediaType = _ref2.mediaType,
      mediaUrl = _ref2.mediaUrl,
      mediaAlt = _ref2.mediaAlt,
      focalPoint = _ref2.focalPoint;
  var style = {
    objectPosition: focalPoint ? "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%") : '50% 50%'
  };
  var mediaTypeRenderers = {
    image: function image() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("img", {
        src: mediaUrl,
        alt: mediaAlt,
        style: style
      });
    },
    video: function video() {
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("video", {
        autoPlay: true,
        muted: true,
        loop: true,
        src: mediaUrl,
        style: style
      });
    }
  };
  return mediaTypeRenderers[mediaType]();
}

function BlockEdit(props) {
  var _classnames;

  var attributes = props.attributes,
      setAttributes = props.setAttributes,
      backgroundColor = props.backgroundColor,
      textColor = props.textColor,
      setBackgroundColor = props.setBackgroundColor,
      setTextColor = props.setTextColor;
  var focalPoint = attributes.focalPoint,
      mediaId = attributes.mediaId,
      mediaType = attributes.mediaType,
      mediaUrl = attributes.mediaUrl,
      mediaAlt = attributes.mediaAlt;
  var onSelectMedia = Object(_utils__WEBPACK_IMPORTED_MODULE_7__["attributesFromMedia"])(setAttributes);
  var hasMedia = mediaType && mediaUrl;
  var controls = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["BlockControls"], null, hasMedia && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["MediaReplaceFlow"], {
    mediaId: mediaId,
    mediaURL: mediaUrl,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    accept: "image/*,video/*",
    onSelect: onSelectMedia
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["InspectorControls"], null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["PanelBody"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Media settings')
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__["FocalPointPicker"], {
    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Focal point picker'),
    url: mediaUrl,
    value: focalPoint,
    onChange: function onChange(value) {
      return setAttributes({
        focalPoint: value
      });
    }
  })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["__experimentalPanelColorGradientSettings"], {
    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Background & Text Color'),
    settings: [{
      colorValue: textColor.color,
      onColorChange: setTextColor,
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Text color')
    }, {
      colorValue: backgroundColor.color,
      onColorChange: setBackgroundColor,
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__["__"])('Background')
    }]
  })));
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, controls, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["__experimentalBlock"].div, {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()((_classnames = {
      'has-background': backgroundColor.color
    }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classnames, backgroundColor["class"], backgroundColor["class"]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classnames, 'has-text-color', textColor.color), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_classnames, textColor["class"], textColor["class"]), _classnames))
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])("figure", {
    className: "wp-block-gds-media-card__media"
  }, hasMedia && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(MediaRenderer, {
    mediaType: mediaType,
    mediaUrl: mediaUrl,
    mediaAlt: mediaAlt,
    focalPoint: focalPoint
  }) || Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(PlaceholderContainer, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({
    onSelectMedia: onSelectMedia
  }, props))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["InnerBlocks"], {
    template: INNER_BLOCKS_TEMPLATE,
    __experimentalTagName: "div",
    __experimentalPassedProps: {
      className: 'wp-block-gds-media-card__content'
    }
  })));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__["withColors"])('backgroundColor', {
  textColor: 'color'
})(BlockEdit));

/***/ }),

/***/ "./resources/assets/scripts/editor/blocks/gds-media-card/index.js":
/*!************************************************************************!*\
  !*** ./resources/assets/scripts/editor/blocks/gds-media-card/index.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./edit */ "./resources/assets/scripts/editor/blocks/gds-media-card/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./resources/assets/scripts/editor/blocks/gds-media-card/block.json");
var _block_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./block.json */ "./resources/assets/scripts/editor/blocks/gds-media-card/block.json", 1);

/** @wordpress */




/** course-summary components */



Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__["registerBlockType"])(_block_json__WEBPACK_IMPORTED_MODULE_5__["name"], {
  title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Media Card'),
  description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__["__"])('Display a card with media and text'),
  category: _block_json__WEBPACK_IMPORTED_MODULE_5__["category"],
  supports: _block_json__WEBPACK_IMPORTED_MODULE_5__["supports"],
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_5__["attributes"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_4__["default"],
  save: function save() {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__["InnerBlocks"].Content, null);
  }
});

/***/ }),

/***/ "./resources/assets/scripts/editor/utils.js":
/*!**************************************************!*\
  !*** ./resources/assets/scripts/editor/utils.js ***!
  \**************************************************/
/*! exports provided: attributesFromMedia */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "attributesFromMedia", function() { return attributesFromMedia; });
function attributesFromMedia(setAttributes) {
  return function (media) {
    if (!media || !media.url) {
      setAttributes({
        url: undefined,
        id: undefined
      });
      return;
    }

    var mediaType; // for media selections originated from a file upload.

    if (media.media_type) {
      if (media.media_type === 'image') {
        mediaType = 'image';
      } else {
        // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
        // video contain the media type of 'file' in the object returned from the rest api.
        mediaType = 'video';
      }
    } else {
      // for media selections originated from existing files in the media library.
      mediaType = media.type;
    }

    setAttributes({
      mediaAlt: media.alt,
      mediaId: media.id,
      mediaUrl: media.url,
      mediaType: mediaType,
      focalPoint: undefined
    });
  };
}

/***/ }),

/***/ 1:
/*!**************************************************!*\
  !*** multi ./resources/assets/scripts/editor.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/taromorimoto/projects/genero/generogrowth/web/app/themes/gds/resources/assets/scripts/editor.js */"./resources/assets/scripts/editor.js");


/***/ }),

/***/ "@wordpress/block-editor":
/*!**********************************************!*\
  !*** external {"this":["wp","blockEditor"]} ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blockEditor"]; }());

/***/ }),

/***/ "@wordpress/blocks":
/*!*****************************************!*\
  !*** external {"this":["wp","blocks"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blocks"]; }());

/***/ }),

/***/ "@wordpress/components":
/*!*********************************************!*\
  !*** external {"this":["wp","components"]} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["components"]; }());

/***/ }),

/***/ "@wordpress/compose":
/*!******************************************!*\
  !*** external {"this":["wp","compose"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["compose"]; }());

/***/ }),

/***/ "@wordpress/dom-ready":
/*!*******************************************!*\
  !*** external {"this":["wp","domReady"]} ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["domReady"]; }());

/***/ }),

/***/ "@wordpress/edit-post":
/*!*******************************************!*\
  !*** external {"this":["wp","editPost"]} ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["editPost"]; }());

/***/ }),

/***/ "@wordpress/element":
/*!******************************************!*\
  !*** external {"this":["wp","element"]} ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["element"]; }());

/***/ }),

/***/ "@wordpress/hooks":
/*!****************************************!*\
  !*** external {"this":["wp","hooks"]} ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["hooks"]; }());

/***/ }),

/***/ "@wordpress/i18n":
/*!***************************************!*\
  !*** external {"this":["wp","i18n"]} ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["i18n"]; }());

/***/ })

},[[1,"/scripts/manifest","/scripts/vendor"]]]);
//# sourceMappingURL=editor.js.map