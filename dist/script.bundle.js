/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Board = /** @class */ (function () {\r\n    function Board(gv) {\r\n        console.log(\"Board created\");\r\n        this._gv = gv;\r\n        this.create();\r\n        // this.createSquares();\r\n    }\r\n    Board.prototype.create = function () {\r\n        var canvas = document.createElement(\"canvas\");\r\n        canvas.width = this._gv.canvasWidth;\r\n        canvas.height = this._gv.canvasHeight;\r\n        this._gv.app.append(canvas);\r\n        this._gv.canvas = canvas;\r\n        this._gv.ctx = this._gv.canvas.getContext(\"2d\");\r\n    };\r\n    // createSquares() {\r\n    // \tfor (let i: number = 0; i < 20; i++) {\r\n    // \t\tfor (let j: number = 0; j < 15; j++) {\r\n    // \t\t\tthis._gv.ctx.fillStyle = \"rgba(0, 255, 0, 1)\";\r\n    // \t\t\tthis._gv.ctx.fillRect(\r\n    // \t\t\t\ti * this._gv.fieldHeight,\r\n    // \t\t\t\tj * this._gv.fieldWidth,\r\n    // \t\t\t\tthis._gv.fieldHeight,\r\n    // \t\t\t\tthis._gv.fieldWidth\r\n    // \t\t\t);\r\n    // \t\t}\r\n    // \t}\r\n    // }\r\n    Board.prototype.animate = function () {\r\n    };\r\n    return Board;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Board.ts?");

/***/ }),

/***/ "./src/GlobalVars.ts":
/*!***************************!*\
  !*** ./src/GlobalVars.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar GlobalVars = /** @class */ (function () {\r\n    function GlobalVars() {\r\n        // HTML elements\r\n        this.app = document.getElementById(\"app\");\r\n        // Canvas variables\r\n        this.canvasWidth = 800; // Canvas height in pixels\r\n        this.canvasHeight = 600; // Canvas width in pixels\t\r\n        // Fields are squares, so both sides are even\r\n        this.fieldSize = 40; // [px]\r\n        console.log(\"global vars created\");\r\n    }\r\n    return GlobalVars;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalVars);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/GlobalVars.ts?");

/***/ }),

/***/ "./src/Keyboard.ts":
/*!*************************!*\
  !*** ./src/Keyboard.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Keyboard = /** @class */ (function () {\r\n    function Keyboard(gv, player) {\r\n        console.log(\"keyboard created\");\r\n        this._gv = gv;\r\n        this._player = player;\r\n        window.onkeydown = this.keyPressed.bind(this);\r\n    }\r\n    Keyboard.prototype.keyPressed = function (event) {\r\n        var key = event.key;\r\n        // console.log(key);\r\n        // Move player\r\n        if (event.repeat != true) {\r\n            if (key == \"a\" || key == \"ArrowLeft\") {\r\n                this._player.move(\"left\");\r\n            }\r\n            else if (key == \"d\" || key == \"ArrowRight\") {\r\n                this._player.move(\"right\");\r\n            }\r\n            else if (key == \"w\" || key == \"ArrowUp\") {\r\n                this._player.move(\"up\");\r\n            }\r\n            else if (key == \"s\" || key == \"ArrowDown\") {\r\n                this._player.move(\"down\");\r\n            }\r\n        }\r\n    };\r\n    return Keyboard;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Keyboard.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Player = /** @class */ (function () {\r\n    function Player(gv, startX, startY) {\r\n        console.log(\"Player created\");\r\n        this._gv = gv;\r\n        // Player model dimensions\r\n        this.width = this._gv.fieldSize;\r\n        this.height = this._gv.fieldSize;\r\n        this.posX = startX;\r\n        this.posY = startY;\r\n        this.draw(this.posX, this.posY);\r\n    }\r\n    Player.prototype.draw = function (posX, posY) {\r\n        // console.log(\"drawing player\")\r\n        this._gv.ctx.fillRect(posX, posY, this._gv.fieldSize, this._gv.fieldSize);\r\n        this._gv.ctx.fillStyle = \"black\";\r\n    };\r\n    Player.prototype.move = function (direction) {\r\n        // If player does not collide with unpassable entity (e.g. wall)\r\n        switch (direction) {\r\n            case 'up':\r\n                this.posY -= this._gv.fieldSize;\r\n                break;\r\n            case 'down':\r\n                this.posY += this._gv.fieldSize;\r\n                break;\r\n            case 'left':\r\n                this.posX -= this._gv.fieldSize;\r\n                break;\r\n            case 'right':\r\n                this.posX += this._gv.fieldSize;\r\n                break;\r\n            default:\r\n                console.log(\"Unknown direction\");\r\n        }\r\n    };\r\n    Player.prototype.update = function () {\r\n        this.draw(this.posX, this.posY);\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Player.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n/* harmony import */ var _GlobalVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalVars */ \"./src/GlobalVars.ts\");\n/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Keyboard */ \"./src/Keyboard.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n\r\n\r\n\r\n\r\nvar Main = /** @class */ (function () {\r\n    function Main() {\r\n        console.log(\"Main created\");\r\n        this._gv = new _GlobalVars__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this._board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._gv);\r\n        this._player = new _Player__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._gv, 80, 80);\r\n        this._keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this._gv, this._player);\r\n        // this._canvasTest = new CanvasTest();\r\n        this.animate();\r\n    }\r\n    Main.prototype.animate = function () {\r\n        // console.log(\"new frame\");\r\n        this._gv.ctx.clearRect(0, 0, this._gv.canvas.width, this._gv.canvas.height);\r\n        this._player.update();\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    };\r\n    return Main;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);\r\nnew Main();\r\n\n\n//# sourceURL=webpack://webpack_win/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;