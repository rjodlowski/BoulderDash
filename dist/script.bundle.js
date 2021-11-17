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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _entities_BorderWall__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities/BorderWall */ \"./src/entities/BorderWall.ts\");\n/* harmony import */ var _entities_Dirt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entities/Dirt */ \"./src/entities/Dirt.ts\");\n/* harmony import */ var _entities_InnerWall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities/InnerWall */ \"./src/entities/InnerWall.ts\");\n/* harmony import */ var _levels_Levels__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./levels/Levels */ \"./src/levels/Levels.ts\");\n\r\n\r\n\r\n\r\nvar Board = /** @class */ (function () {\r\n    function Board(gv) {\r\n        // All level elements\r\n        this.scenePart = [[]];\r\n        this._gv = gv;\r\n        this.allElements = {\r\n            borderWalls: [],\r\n            innerWalls: [],\r\n            dirt: [],\r\n        };\r\n        this.level = _levels_Levels__WEBPACK_IMPORTED_MODULE_3__[\"default\"][this._gv.currLevel];\r\n        // console.log(this.level1);\r\n        this.createCanvas();\r\n        this.getPartOfScene();\r\n        this.displayScene();\r\n        // this.createOuterWalls();\r\n    }\r\n    Board.prototype.createCanvas = function () {\r\n        var canvas = document.createElement(\"canvas\");\r\n        canvas.width = this._gv.canvasWidth;\r\n        canvas.height = this._gv.canvasHeight;\r\n        this._gv.app.append(canvas);\r\n        this._gv.canvas = canvas;\r\n        this._gv.ctx = this._gv.canvas.getContext(\"2d\");\r\n    };\r\n    // Gets the part of the scene to display\r\n    Board.prototype.getPartOfScene = function () {\r\n        var _this = this;\r\n        var partOfScene = new Array(this._gv.fieldsPerHeight).fill(0).map(function () { return new Array(_this._gv.fieldsPerWidth).fill(\"JD\"); });\r\n        for (var y = 0; y < this._gv.fieldsPerHeight; y++) {\r\n            for (var x = 0; x < this._gv.fieldsPerWidth; x++) {\r\n                if (y + this._gv.displayY < this.level.length &&\r\n                    x + this._gv.displayX < this.level[0].length) {\r\n                    partOfScene[y][x] = this.level[y + this._gv.displayY][x + this._gv.displayX];\r\n                }\r\n            }\r\n        }\r\n        this.scenePart = partOfScene;\r\n        // console.log(this.scenePart);\r\n    };\r\n    // Move the part of the scene in the given direction\r\n    Board.prototype.movePartOfScene = function (direction) {\r\n    };\r\n    /**\r\n     * Displays a part of the scene\r\n     */\r\n    Board.prototype.displayScene = function () {\r\n        var _loop_1 = function (y) {\r\n            var _loop_2 = function (x) {\r\n                var entityNumber = this_1.scenePart[y][x];\r\n                // console.log(entityNumber);\r\n                switch (entityNumber) {\r\n                    case 0: // Empty field\r\n                        // Do nothing\r\n                        break;\r\n                    case 1: // Border wall\r\n                        // find if el exists\r\n                        var borderFound = this_1.allElements.borderWalls.filter(function (el) { return el.x == x && el.y == y; });\r\n                        // console.log(borderFound);\r\n                        if (borderFound.length == 0) {\r\n                            this_1.allElements.borderWalls.push(new _entities_BorderWall__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this_1._gv, \"black\", x * this_1._gv.fieldSize, y * this_1._gv.fieldSize));\r\n                        }\r\n                        else {\r\n                            // Sth can break here tho\r\n                            console.log(\"border wall exists\");\r\n                        }\r\n                        break;\r\n                    case 2: // Inner wall\r\n                        var innerFound = this_1.allElements.innerWalls.filter(function (el) { return el.x == x && el.y == y; });\r\n                        // console.log(innerFound);\r\n                        if (innerFound.length == 0) {\r\n                            this_1.allElements.innerWalls.push(new _entities_InnerWall__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this_1._gv, \"gray\", x * this_1._gv.fieldSize, y * this_1._gv.fieldSize));\r\n                        }\r\n                        else {\r\n                            console.log(\"Inner wall exists\");\r\n                        }\r\n                        break;\r\n                    case 3: // \r\n                        var dirtFound = this_1.allElements.dirt.filter(function (el) { return el.x == x && el.y == y; });\r\n                        if (dirtFound.length == 0) {\r\n                            this_1.allElements.dirt.push(new _entities_Dirt__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this_1._gv, \"brown\", x * this_1._gv.fieldSize, y * this_1._gv.fieldSize));\r\n                        }\r\n                        else {\r\n                            console.log(\"dirt exists\");\r\n                        }\r\n                        break;\r\n                    case 4:\r\n                        break;\r\n                    default:\r\n                        console.log(\"Unknown entity type\");\r\n                        break;\r\n                }\r\n            };\r\n            for (var x = 0; x < this_1.scenePart[0].length; x++) {\r\n                _loop_2(x);\r\n            }\r\n        };\r\n        var this_1 = this;\r\n        // Save a part of the scene to the variable\r\n        for (var y = 0; y < this.scenePart.length; y++) {\r\n            _loop_1(y);\r\n        }\r\n    };\r\n    Board.prototype.update = function () {\r\n        // update all static elements on the board\r\n        // Border walls\r\n        for (var i = 0; i < this.allElements.borderWalls.length; i++) {\r\n            this.allElements.borderWalls[i].update();\r\n        }\r\n        // Inner walls\r\n        for (var i = 0; i < this.allElements.innerWalls.length; i++) {\r\n            this.allElements.innerWalls[i].update();\r\n        }\r\n        // Dirt\r\n        for (var i = 0; i < this.allElements.dirt.length; i++) {\r\n            this.allElements.dirt[i].update();\r\n        }\r\n    };\r\n    return Board;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Board.ts?");

/***/ }),

/***/ "./src/GlobalVars.ts":
/*!***************************!*\
  !*** ./src/GlobalVars.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar GlobalVars = /** @class */ (function () {\r\n    function GlobalVars() {\r\n        // HTML elements\r\n        this.app = document.getElementById(\"app\");\r\n        this.currLevel = 0; //number of the current level;\r\n        // Canvas variables\r\n        this.fieldSize = 40; // [px] - Fields are squares, so both sides are even\r\n        this.fieldsPerWidth = 24;\r\n        this.fieldsPerHeight = 16;\r\n        this.canvasWidth = this.fieldsPerWidth * this.fieldSize; // Canvas height in pixels\r\n        this.canvasHeight = this.fieldsPerHeight * this.fieldSize; // Canvas width in pixels\t\r\n        // Board display variables\r\n        this.displayX = 0; // x of the top left field of a displayed background\r\n        this.displayY = 0; // y\r\n        // Player variables\r\n        this.innerBorder = 2; // fields limiting the inner area of player movement\r\n    }\r\n    return GlobalVars;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalVars);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/GlobalVars.ts?");

/***/ }),

/***/ "./src/Keyboard.ts":
/*!*************************!*\
  !*** ./src/Keyboard.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Keyboard = /** @class */ (function () {\r\n    function Keyboard(gv, player) {\r\n        this._gv = gv;\r\n        this._player = player;\r\n        window.onkeydown = this.keyPressed.bind(this);\r\n    }\r\n    Keyboard.prototype.keyPressed = function (event) {\r\n        var key = event.key;\r\n        // console.log(key);\r\n        // Move player\r\n        if (event.repeat != true) {\r\n            if (key == \"a\" || key == \"ArrowLeft\") {\r\n                this._player.move(\"left\");\r\n            }\r\n            else if (key == \"d\" || key == \"ArrowRight\") {\r\n                this._player.move(\"right\");\r\n            }\r\n            else if (key == \"w\" || key == \"ArrowUp\") {\r\n                this._player.move(\"up\");\r\n            }\r\n            else if (key == \"s\" || key == \"ArrowDown\") {\r\n                this._player.move(\"down\");\r\n            }\r\n        }\r\n    };\r\n    return Keyboard;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyboard);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Keyboard.ts?");

/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Player = /** @class */ (function () {\r\n    function Player(gv, color, startX, startY) {\r\n        this._gv = gv;\r\n        // Player model dimensions\r\n        this.width = this._gv.fieldSize;\r\n        this.height = this._gv.fieldSize;\r\n        this.color = color;\r\n        this.posX = startX;\r\n        this.posY = startY;\r\n        this.draw(this.posX, this.posY);\r\n    }\r\n    Player.prototype.draw = function (posX, posY) {\r\n        // console.log(\"drawing player\")\r\n        this._gv.ctx.fillStyle = this.color;\r\n        this._gv.ctx.fillRect(posX, posY, this._gv.fieldSize, this._gv.fieldSize);\r\n    };\r\n    Player.prototype.move = function (direction) {\r\n        // If player does not collide with unpassable entity (e.g. wall)\r\n        switch (direction) {\r\n            case 'up':\r\n                if (this.posY > this._gv.fieldSize * this._gv.innerBorder) {\r\n                    this.posY -= this._gv.fieldSize;\r\n                }\r\n                else {\r\n                    console.log(\"Shift border top\");\r\n                }\r\n                break;\r\n            case 'down':\r\n                if (this.posY < this._gv.canvasHeight - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {\r\n                    this.posY += this._gv.fieldSize;\r\n                }\r\n                else {\r\n                    console.log(\"Shift border bottom\");\r\n                }\r\n                break;\r\n            case 'left':\r\n                if (this.posX > this._gv.fieldSize * this._gv.innerBorder) {\r\n                    this.posX -= this._gv.fieldSize;\r\n                }\r\n                else {\r\n                    console.log(\"Shift border left\");\r\n                }\r\n                break;\r\n            case 'right':\r\n                if (this.posX < this._gv.canvasWidth - ((this._gv.innerBorder + 1) * this._gv.fieldSize)) {\r\n                    this.posX += this._gv.fieldSize;\r\n                }\r\n                else {\r\n                    console.log(\"Shift border right\");\r\n                }\r\n                break;\r\n            default:\r\n                console.log(\"Unknown direction\");\r\n        }\r\n    };\r\n    Player.prototype.update = function () {\r\n        this.draw(this.posX, this.posY);\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/Player.ts?");

/***/ }),

/***/ "./src/entities/BorderWall.ts":
/*!************************************!*\
  !*** ./src/entities/BorderWall.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Example object on the canvas, not the part of final project\r\nvar BorderWall = /** @class */ (function () {\r\n    function BorderWall(gv, color, x, y) {\r\n        this._gv = gv;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.color = color;\r\n        this.draw(this.x, this.y);\r\n    }\r\n    BorderWall.prototype.draw = function (posX, posY) {\r\n        this._gv.ctx.fillStyle = this.color;\r\n        this._gv.ctx.fillRect(posX, posY, this._gv.fieldSize, this._gv.fieldSize);\r\n    };\r\n    BorderWall.prototype.update = function () {\r\n        this.draw(this.x, this.y);\r\n    };\r\n    return BorderWall;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BorderWall);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/entities/BorderWall.ts?");

/***/ }),

/***/ "./src/entities/Dirt.ts":
/*!******************************!*\
  !*** ./src/entities/Dirt.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Example object on the canvas, not the part of final project\r\nvar Dirt = /** @class */ (function () {\r\n    function Dirt(gv, color, x, y) {\r\n        this._gv = gv;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.color = color;\r\n        this.draw(this.x, this.y);\r\n    }\r\n    Dirt.prototype.draw = function (posX, posY) {\r\n        this._gv.ctx.fillStyle = this.color;\r\n        this._gv.ctx.fillRect(posX, posY, this._gv.fieldSize, this._gv.fieldSize);\r\n    };\r\n    Dirt.prototype.update = function () {\r\n        this.draw(this.x, this.y);\r\n    };\r\n    return Dirt;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dirt);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/entities/Dirt.ts?");

/***/ }),

/***/ "./src/entities/InnerWall.ts":
/*!***********************************!*\
  !*** ./src/entities/InnerWall.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Example object on the canvas, not the part of final project\r\nvar InnerWall = /** @class */ (function () {\r\n    function InnerWall(gv, color, x, y) {\r\n        this._gv = gv;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.color = color;\r\n        this.draw(this.x, this.y);\r\n    }\r\n    InnerWall.prototype.draw = function (posX, posY) {\r\n        this._gv.ctx.fillStyle = this.color;\r\n        this._gv.ctx.fillRect(posX, posY, this._gv.fieldSize, this._gv.fieldSize);\r\n    };\r\n    InnerWall.prototype.update = function () {\r\n        this.draw(this.x, this.y);\r\n    };\r\n    return InnerWall;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InnerWall);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/entities/InnerWall.ts?");

/***/ }),

/***/ "./src/levels/Levels.ts":
/*!******************************!*\
  !*** ./src/levels/Levels.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Static fields\r\n// 0 - Empty field\r\n// 1 - B0rder wall\r\n// 2 - Inner wall\r\n// 3 - Dirt\r\n// Dynamic entities\r\n// 4 - Rock\r\n// 5 - Diamond\r\n// 6 - Crawler\r\n// 7 - Butterfly\r\nvar levels = [\r\n    [\r\n        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n        [1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],\r\n        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],\r\n    ],\r\n];\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (levels);\r\n\n\n//# sourceURL=webpack://webpack_win/./src/levels/Levels.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.ts\");\n/* harmony import */ var _GlobalVars__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GlobalVars */ \"./src/GlobalVars.ts\");\n/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Keyboard */ \"./src/Keyboard.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ \"./src/Player.ts\");\n\r\n\r\n\r\n\r\nvar Main = /** @class */ (function () {\r\n    function Main() {\r\n        this._gv = new _GlobalVars__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n        this._board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._gv);\r\n        this._player = new _Player__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._gv, \"red\", 80, 80);\r\n        this._keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this._gv, this._player);\r\n        // this._canvasTest = new CanvasTest();\r\n        this.animate();\r\n    }\r\n    Main.prototype.animate = function () {\r\n        this._gv.ctx.clearRect(0, 0, this._gv.canvas.width, this._gv.canvas.height);\r\n        this._board.update();\r\n        this._player.update();\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    };\r\n    return Main;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Main);\r\nnew Main();\r\n\n\n//# sourceURL=webpack://webpack_win/./src/main.ts?");

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