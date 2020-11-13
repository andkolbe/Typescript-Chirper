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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/routes/chirps.ts":
/*!*************************************!*\
  !*** ./src/server/routes/chirps.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\"); // import * as express from 'express';\r\nvar chirpstore_1 = __webpack_require__(/*! ../utils/chirpstore */ \"./src/server/utils/chirpstore.ts\"); // connecting chirpstore to our chirps route\r\nvar router = express_1.Router();\r\nrouter.get('/:id?', function (req, res) {\r\n    var id = Number(req.params.id); // req.params are always cast as strings. Write Number in front to turn it into a number // explicit coercion\r\n    var data = chirpstore_1.default.GetChirps();\r\n    var chirp = chirpstore_1.default.GetChirp(id);\r\n    var chirps = Object.keys(data).map(function (key) { return ({\r\n        // you have to convert your object of objects into an array of objects to manipulate it\r\n        id: Number(key),\r\n        name: data[key].name,\r\n        text: data[key].text // get the data of the text attached to the id: key\r\n    }); });\r\n    // const chirps = Object.keys(data).map(key => ({ id: key, ...data[key] })); // can also use this shorthand\r\n    chirps.pop(); // pops the nextid off the end of the array\r\n    if (id || id === 0) { // if you provide a parameter, return that chirp \r\n        res.json(__assign({ id: id }, chirp)); // ...chirp says take the rest of the chirp properties, spread them out, and display them\r\n    }\r\n    else { // if you don't provide a paramenter, return all chirps\r\n        res.json(chirps); // always use res.json instead of res.send. most modern servers respond with json. it's the standard\r\n    }\r\n}); // if your first chirp has the key of 0, it evaluates false, and goes to the else statement. start your array with 1, or add it to your if statement to avoid this\r\nrouter.post('/', function (req, res) {\r\n    var chirpDTO = req.body; // best practice to store in variable // req.body is all of the form data\r\n    chirpstore_1.default.CreateChirp(chirpDTO); // data layer // DTO - data transfer object. transfers data from the networking layer to the data layer\r\n    res.status(200).json({ msg: 'Chirp Added!' });\r\n}); // test out posts on postman\r\nrouter.put('/:id', function (req, res) {\r\n    var id = Number(req.params.id);\r\n    var chirpDTO = req.body;\r\n    chirpstore_1.default.UpdateChirp(id, chirpDTO);\r\n    res.status(200).json(\"chirp \" + id + \" edited\");\r\n});\r\nrouter.delete('/:id', function (req, res) {\r\n    var id = Number(req.params.id);\r\n    chirpstore_1.default.DeleteChirp(id);\r\n    res.status(200).json('You are banished to the shadow realm!');\r\n});\r\nexports.default = router; // this will be imported into index.js\r\n// each resource should be in its own route file\r\n// use Router() to create a router for each resource\r\n// index.ts in the route directory will import and add the routes to the Express app\r\n// chain get, post, put, and delete onto router\r\n\n\n//# sourceURL=webpack:///./src/server/routes/chirps.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express_1 = __webpack_require__(/*! express */ \"express\"); //  import * as express from 'express';\r\nvar chirps_1 = __webpack_require__(/*! ./chirps */ \"./src/server/routes/chirps.ts\"); // chirpsRouter can be called anything\r\nvar router = express_1.Router(); // const router = express.Router();\r\nrouter.use('/chirps', chirps_1.default);\r\nexports.default = router;\r\n// index.ts will index all other routers together\r\n\n\n//# sourceURL=webpack:///./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\r\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\"); // points to the index.ts file in the routes directory\r\nvar app = express();\r\napp.use(morgan('dev'));\r\napp.use(express.json());\r\napp.use(express.urlencoded({ extended: false }));\r\napp.use(express.static('public'));\r\napp.use('/api', routes_1.default);\r\napp.get('*', function (req, res) { return res.sendFile(path.join(__dirname, '../public/index.html')); }); // this puts the server and the website on the same location\r\nvar port = process.env.PORT || 3000; // variable?\r\napp.listen(port, function () { return console.log(\"Server listening on port: \" + port); });\r\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "./src/server/utils/chirpstore.ts":
/*!****************************************!*\
  !*** ./src/server/utils/chirpstore.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar fs = __webpack_require__(/*! fs */ \"fs\");\r\nvar chirps = { nextid: 0 };\r\nif (fs.existsSync('chirps.json')) {\r\n    chirps = JSON.parse(fs.readFileSync('chirps.json').toString());\r\n}\r\nvar getChirps = function () {\r\n    return Object.assign({}, chirps); //create a copy and return it\r\n};\r\nvar getChirp = function (id) {\r\n    return Object.assign({}, chirps[id]); //create a copy and return it\r\n};\r\nvar createChirp = function (chirp) {\r\n    chirps[chirps.nextid++] = chirp;\r\n    writeChirps();\r\n};\r\nvar updateChirp = function (id, chirp) {\r\n    chirps[id] = chirp;\r\n    writeChirps();\r\n};\r\nvar deleteChirp = function (id) {\r\n    delete chirps[id];\r\n    writeChirps();\r\n};\r\nvar writeChirps = function () {\r\n    fs.writeFileSync('chirps.json', JSON.stringify(chirps));\r\n};\r\nexports.default = {\r\n    CreateChirp: createChirp,\r\n    DeleteChirp: deleteChirp,\r\n    GetChirps: getChirps,\r\n    GetChirp: getChirp,\r\n    UpdateChirp: updateChirp\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/utils/chirpstore.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });