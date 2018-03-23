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
    this.elements = HTMLArray;
  }

  html (string) {
    for (let i = 0; i < this.elements.length; i++) {
      if (string) {
        this.elements[i].innerHTML = string;
      } else {
        return this.elements[0].innerHTML;
      }
    }
  }

  empty () {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].innerHTML = "";
    }
  }

  append (...args) {
    for (var i = 0; i < this.elements.length; i++) {
      for (var j = 0; j < args.length; j++) {
        // debugger
        if (args[j] instanceof HTMLElement) {
          this.elements[i].appendChild(args[j]);
        } else if (typeof args[j] === "string") {
          let argObj = document.createElement(args[j]);
          this.elements[i].appendChild(argObj);
        } else if (args[j] instanceof DOMNodeCollection) {
          args[j].outerHTML = this.elements[i].innerHTML;
          this.elements[i].innerHTML = args[j].outerHTML;
        } else {
          return undefined;
        }
      }
    }
  }

  attr (name, value) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].setAttribute(name, value);
    }
  }

  addClass (adClass) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(adClass);
    }
  }

  removeClass (remClass) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove(remClass);
    }
  }
// traversal
// returns DNC of all children in an array
  children () {
    let children = [];
    for (let i = 0; i < this.elements.length; i++) {
      let nodelist = this.elements[i].childNodes;
      children = children.concat(Array.from(nodelist));
    }

    return new DOMNodeCollection(children);
  }

  parent () {
    let parents = [];
    for (let i = 0; i < this.elements.length; i++) {
      let parent = this.elements[i].parentNode;

      parents.push(parent);
    }

    return new DOMNodeCollection(parents);
  }



  find (attr) {
    let matched = [];

    for (let i = 0; i < this.elements.length; i++) {
      let found = Array.from(this.elements[i].querySelectorAll(attr));
      matched = matched.concat(found);
    }
    return new DOMNodeCollection(matched);
  }

  remove () {
    this.elements.forEach((el) => el.remove());
  }

  on (eventType, callback) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(eventType, callback);
      this.elements[i].setAttribute('eventScript', callback);
    }
  }

  off (eventType) {
    for (let i = 0; i < this.elements.length; i++) {
      let callback = this.elements[i].getAttribute('eventScript');
      this.elements[i].removeAttribute('eventScript');
      this.elements[i].removeEventListener(eventType, callback);
    }
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
  const queue = [];

  if (argument instanceof Function) {
    queue.push(argument);
  }
  document.addEventListener("DOMContentLoaded", runQueue);

  function runQueue () {
    queue.forEach((el) => el());
  }

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