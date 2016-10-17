(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vcTabs"] = factory();
	else
		root["vcTabs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(7)
module.exports = __webpack_require__(13)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(11)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./TabSet.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./TabSet.vue","-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./TabSet.vue"], function () {
var newOptions = require("-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./TabSet.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./TabSet.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 3 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 4 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(6)
module.exports = __webpack_require__(12)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(10)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tab.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tab.vue","-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Tab.vue"], function () {
var newOptions = require("-!babel!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Tab.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Tab.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-1e3df8e3&file=Tab.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Tab.vue", function() {
			var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-1e3df8e3&file=Tab.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Tab.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-5435d0a2&file=TabSet.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./TabSet.vue", function() {
			var newContent = require("!!./../../node_modules/.0.21.0@css-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-5435d0a2&file=TabSet.vue!./../../node_modules/.2.2.3@less-loader/index.js!./../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./TabSet.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".tab-content > .tab-pane {\n  display: block;\n}\n", ""]);

// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".nav-tabs {\n  margin-bottom: 15px;\n}\n.nav-tabs .remove-tab {\n  position: absolute;\n  top: -3px;\n  right: 5px;\n  font-size: 16px;\n  opacity: .5;\n  cursor: pointer;\n}\n.tabset-list-item:hover,\n.tabset-list-item:focus {\n  background-color: #fff;\n  outline: none;\n}\n.tabset-list-item a:focus,\n.tabset-list-item a:hover {\n  background-color: #fff;\n  border-color: #fff;\n  outline: none;\n}\n", ""]);

// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = "<div role=\"tabpanel\" class=\"tab-pane\"\n        :class=\"{ 'hide': !show }\"\n        v-show=\"show\"\n        :transition=\"transition\"\n    >\n        <slot></slot>\n    </div>";

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = "<div :data-name=\"name\">\n        <!-- Nav tabs -->\n        <ul v-el:header class=\"nav nav-tabs\" role=\"tablist\">\n            <li\n                v-for=\"r in renderData\"\n                :class=\"{\n                    'tabset-list-item': true,\n                    'active': (r.index == active),\n                    'disabled': r.disabled\n                }\"\n                @click.prevent=\"handleTabListClick(r.index, r)\"\n                @mouseover.prevent=\"handleTabListMouseover(r.index, r)\"\n                :disabled=\"r.disabled\"\n            >\n                <a href=\"#\">  \n                    <slot name=\"header\"> \n                        {{{ r.header }}}\n                    </slot> \n                </a>\n                <span v-if=\"r.index == active && removeable\" @click=\"remove(r)\" class=\"remove-tab\">&times;</span>\n            </li>\n        </ul>\n        <!-- Tab panes -->\n        <div class=\"tab-content\" v-el:tab-content>\n            <slot></slot>\n        </div>\n    </div>";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TabSet = __webpack_require__(2);

var _TabSet2 = _interopRequireDefault(_TabSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPONENT_NS = 'TAB'; // <template>
//     <div role="tabpanel" class="tab-pane"
//         :class="{ 'hide': !show }"
//         v-show="show"
//         :transition="transition"
//     >
//         <slot></slot>
//     </div>
// </template>

// <style>
// .tab-content > .tab-pane {
//     display: block;
// }
// </style>

// <script>


var vcTab = {
    name: 'vc-tab',
    props: {
        header: { // tab标题
            type: String
        },
        id: { // 可传入id,关闭$parent的autoIndex来用外界传入的index做tab的渲染,高级用法，一般无需使用
            type: [String, Number]
        },
        disabled: { // 不响应点击事件，达到不会切换tab的disabled效果
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            index: -1 // 初始化内部index
            // show: false // 初始不显示
        };
    },
    computed: {
        show: function show() {
            // active时才显示
            return this.$parent.active == this.index;
        },
        transition: function transition() {
            // 动画模式
            return this.$parent.effect;
        }
    },
    created: function created() {},
    ready: function ready() {
        // 内部自增index
        if (this.$parent.autoIndex) {
            this.index = this.$parent.index;
            this.$parent.index++;
        } else {
            // 强设index
            this.index = this.id;
        }

        // 给parent壮哉渲染数据
        this.$parent.renderData.push({
            index: this.index + '',
            header: this.header,
            disabled: this.disabled
        });

        var msg = {
            action: 'newTabDone',
            data: {
                val: this.header,
                id: this.id
            }
        };
        this.$dispatch(COMPONENT_NS, msg, this.$parent.name);
    },
    beforeDestroy: function beforeDestroy() {
        // 去除渲染数据，达到响应式
        this.$parent.renderData.forEach(function (item, index) {
            if (item.index == this.index) {
                this.$parent.renderData.splice(index, 1);
            }
        }.bind(this));
    },
    watch: {
        'header': function header(val) {
            if (this.$parent.autoIndex) {
                this.$parent.renderData[this.index].header = val;
            } else {
                var idx = -1;
                var data = this.$parent.renderData;
                for (var i = 0, len = data.length; i < len; i++) {
                    if (parseInt(data[i].index, 10) === parseInt(this.index, 10)) {
                        idx = i;
                    }
                }
                this.$parent.renderData[idx].header = val;
            }
            var msg = {
                action: 'headerChange',
                data: {
                    val: val,
                    id: this.id
                }
            };
            this.$dispatch(COMPONENT_NS, msg, this.$parent.name);
        }
    }
};

vcTab.vcTabset = _TabSet2.default;

exports.default = vcTab;
// </script>

/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// <template>
//     <div :data-name="name">
//         <!-- Nav tabs -->
//         <ul v-el:header class="nav nav-tabs" role="tablist">
//             <li
//                 v-for="r in renderData"
//                 :class="{
//                     'tabset-list-item': true,
//                     'active': (r.index == active),
//                     'disabled': r.disabled
//                 }"
//                 @click.prevent="handleTabListClick(r.index, r)"
//                 @mouseover.prevent="handleTabListMouseover(r.index, r)"
//                 :disabled="r.disabled"
//             >
//                 <a href="#">  
//                     <slot name="header"> 
//                         {{{ r.header }}}
//                     </slot> 
//                 </a>
//                 <span v-if="r.index == active && removeable" @click="remove(r)" class="remove-tab">&times;</span>
//             </li>
//         </ul>
//         <!-- Tab panes -->
//         <div class="tab-content" v-el:tab-content>
//             <slot></slot>
//         </div>
//     </div>
// </template>

// <style>
// .nav-tabs {
//     margin-bottom: 15px;
// }
// .nav-tabs .remove-tab {
//     position: absolute;
//     top: -3px;
//     right: 5px;
//     font-size: 16px;
//     opacity: .5;
//     cursor: pointer;
// }
// .tabset-list-item:hover,
// .tabset-list-item:focus {
//     background-color: #fff;
//     outline: none;
// }
// .tabset-list-item a:focus,
// .tabset-list-item a:hover {
//     background-color: #fff;
//     border-color: #fff;
//     outline: none;
// }
// </style>

// <script>
exports.default = {
    name: 'vc-tabSet',
    props: {
        name: String,
        removeable: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: String,
            default: 'click'
        },
        delay: {
            type: [Number, String],
            default: 120
        },
        effect: {
            type: String,
            default: 'fadein'
        },
        active: {
            type: [Number, String],
            default: 0
        },
        autoIndex: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            renderData: [],
            index: 0
        };
    },
    methods: {
        remove: function remove(tabItem) {
            this.renderData.$remove(tabItem);
        },

        handleTabListClick: function handleTabListClick(index, el) {
            if (this.trigger === 'click') {
                if (!el.disabled) this.active = index;
            }
        },
        handleTabListMouseover: function handleTabListMouseover(index, el) {
            var _this = this;

            if (this.trigger === 'hover') {
                var oldTriggerId = this.triggerId;
                clearTimeout(oldTriggerId);
                this.triggerId = setTimeout(function () {
                    if (!el.disabled) _this.active = index;
                }, this.delay);
            }
        }
    }
};
// </script>

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Tab = __webpack_require__(5);

var _Tab2 = _interopRequireDefault(_Tab);

var _TabSet = __webpack_require__(2);

var _TabSet2 = _interopRequireDefault(_TabSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Tab2.default.vcTabset = _TabSet2.default;

module.exports = _Tab2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map