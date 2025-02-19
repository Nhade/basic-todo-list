"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_storageOperation_js"],{

/***/ "./src/storageOperation.js":
/*!*********************************!*\
  !*** ./src/storageOperation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addTask: () => (/* binding */ addTask),\n/* harmony export */   deleteTask: () => (/* binding */ deleteTask),\n/* harmony export */   getTasks: () => (/* binding */ getTasks),\n/* harmony export */   updateTasks: () => (/* binding */ updateTasks)\n/* harmony export */ });\n/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task.js */ \"./src/Task.js\");\n\n\nfunction getTasks() {\n  const savedTasks = localStorage.getItem(\"tasks\");\n  if (savedTasks === null) {\n    return [];\n  } else {\n    try {\n      const array = JSON.parse(savedTasks);\n      return array.map((object) => {\n        return _Task_js__WEBPACK_IMPORTED_MODULE_0__.Task.fromJSON(object);\n      });\n    } catch (error) {\n      console.log(error);\n      return [];\n    }\n  }\n}\n\nfunction updateTasks(tasksArray) {\n  localStorage.setItem(\"tasks\", JSON.stringify(tasksArray));\n}\n\nfunction deleteTask(tasksArray, nameToDelete) {\n  tasksArray.splice(tasksArray.map((e) => e.name).indexOf(nameToDelete), 1);\n}\n\nfunction addTask(tasksArray, task) {\n  tasksArray.push(task);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3RvcmFnZU9wZXJhdGlvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQzs7QUFFMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsZUFBZSwwQ0FBSTtBQUNuQixPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFTztBQUNQO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmFnZU9wZXJhdGlvbi5qcz83MDJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi9UYXNrLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXNrcygpIHtcbiAgY29uc3Qgc2F2ZWRUYXNrcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidGFza3NcIik7XG4gIGlmIChzYXZlZFRhc2tzID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhcnJheSA9IEpTT04ucGFyc2Uoc2F2ZWRUYXNrcyk7XG4gICAgICByZXR1cm4gYXJyYXkubWFwKChvYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIFRhc2suZnJvbUpTT04ob2JqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVUYXNrcyh0YXNrc0FycmF5KSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgSlNPTi5zdHJpbmdpZnkodGFza3NBcnJheSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrc0FycmF5LCBuYW1lVG9EZWxldGUpIHtcbiAgdGFza3NBcnJheS5zcGxpY2UodGFza3NBcnJheS5tYXAoKGUpID0+IGUubmFtZSkuaW5kZXhPZihuYW1lVG9EZWxldGUpLCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFRhc2sodGFza3NBcnJheSwgdGFzaykge1xuICB0YXNrc0FycmF5LnB1c2godGFzayk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/storageOperation.js\n");

/***/ })

}]);