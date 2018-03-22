/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (HTMLArray) {
    this.array = HTMLArray;
  }

  html (string) {
    if (string) {
      this.innerHTML = string;
      return this;
    } else {
      return this.innerHTML;
    }

  }

  empty () {
    this.html = "";
  }

  append (arg) {
    if (arg instanceof HTMLElement) {
      arg.outerHTML = this.innerHTML;
    } else if (arg instanceof String) {
      this.innerHTML = arg;
    } else if (arg instanceof DOMNodeCollection) {
      arg.outerHTML = this.innerHTML;
    } else {
      return undefined;
    }
  }

  attr (name, value) {
    this.setAttribute(name, value);
  }

  addClass () {

  }

  removeClass () {

  }
// traversal

  children () {

  }

  parent () {

  }

  find () {

  }

  remove () {

  }

}

module.exports = DOMNodeCollection;


/***/ }),

/***/ "./lib/entry.js":
/*!**********************!*\
  !*** ./lib/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__ (/*! ./dom_node_collection */ "./lib/dom_node_collection.js");

Window.prototype.$l = function (argument) {
  if (argument instanceof HTMLElement) {
    return new DOMNodeCollection(Array.from(argument));
  }
  
  let nodelist = document.querySelectorAll(argument);
  return new DOMNodeCollection(Array.from(nodelist));
};

module.exports = Window;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Entry = __webpack_require__(/*! ./entry.js */ "./lib/entry.js");
const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map