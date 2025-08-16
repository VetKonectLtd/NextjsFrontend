"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/copy-anything";
exports.ids = ["vendor-chunks/copy-anything"];
exports.modules = {

/***/ "(ssr)/./node_modules/copy-anything/dist/cjs/index.cjs":
/*!*******************************************************!*\
  !*** ./node_modules/copy-anything/dist/cjs/index.cjs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nconst isWhat = __webpack_require__(/*! is-what */ \"(ssr)/./node_modules/is-what/dist/cjs/index.cjs\");\n\nfunction assignProp(carry, key, newVal, originalObject, includeNonenumerable) {\n  const propType = {}.propertyIsEnumerable.call(originalObject, key) ? \"enumerable\" : \"nonenumerable\";\n  if (propType === \"enumerable\")\n    carry[key] = newVal;\n  if (includeNonenumerable && propType === \"nonenumerable\") {\n    Object.defineProperty(carry, key, {\n      value: newVal,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    });\n  }\n}\nfunction copy(target, options = {}) {\n  if (isWhat.isArray(target)) {\n    return target.map((item) => copy(item, options));\n  }\n  if (!isWhat.isPlainObject(target)) {\n    return target;\n  }\n  const props = Object.getOwnPropertyNames(target);\n  const symbols = Object.getOwnPropertySymbols(target);\n  return [...props, ...symbols].reduce((carry, key) => {\n    if (isWhat.isArray(options.props) && !options.props.includes(key)) {\n      return carry;\n    }\n    const val = target[key];\n    const newVal = copy(val, options);\n    assignProp(carry, key, newVal, target, options.nonenumerable);\n    return carry;\n  }, {});\n}\n\nexports.copy = copy;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY29weS1hbnl0aGluZy9kaXN0L2Nqcy9pbmRleC5janMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWIsZUFBZSxtQkFBTyxDQUFDLGdFQUFTOztBQUVoQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLElBQUk7QUFDUDs7QUFFQSxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmV0a29ubmVjdC8uL25vZGVfbW9kdWxlcy9jb3B5LWFueXRoaW5nL2Rpc3QvY2pzL2luZGV4LmNqcz85ZjQ5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgaXNXaGF0ID0gcmVxdWlyZSgnaXMtd2hhdCcpO1xuXG5mdW5jdGlvbiBhc3NpZ25Qcm9wKGNhcnJ5LCBrZXksIG5ld1ZhbCwgb3JpZ2luYWxPYmplY3QsIGluY2x1ZGVOb25lbnVtZXJhYmxlKSB7XG4gIGNvbnN0IHByb3BUeXBlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvcmlnaW5hbE9iamVjdCwga2V5KSA/IFwiZW51bWVyYWJsZVwiIDogXCJub25lbnVtZXJhYmxlXCI7XG4gIGlmIChwcm9wVHlwZSA9PT0gXCJlbnVtZXJhYmxlXCIpXG4gICAgY2Fycnlba2V5XSA9IG5ld1ZhbDtcbiAgaWYgKGluY2x1ZGVOb25lbnVtZXJhYmxlICYmIHByb3BUeXBlID09PSBcIm5vbmVudW1lcmFibGVcIikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjYXJyeSwga2V5LCB7XG4gICAgICB2YWx1ZTogbmV3VmFsLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG59XG5mdW5jdGlvbiBjb3B5KHRhcmdldCwgb3B0aW9ucyA9IHt9KSB7XG4gIGlmIChpc1doYXQuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIHRhcmdldC5tYXAoKGl0ZW0pID0+IGNvcHkoaXRlbSwgb3B0aW9ucykpO1xuICB9XG4gIGlmICghaXNXaGF0LmlzUGxhaW5PYmplY3QodGFyZ2V0KSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgY29uc3QgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICBjb25zdCBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpO1xuICByZXR1cm4gWy4uLnByb3BzLCAuLi5zeW1ib2xzXS5yZWR1Y2UoKGNhcnJ5LCBrZXkpID0+IHtcbiAgICBpZiAoaXNXaGF0LmlzQXJyYXkob3B0aW9ucy5wcm9wcykgJiYgIW9wdGlvbnMucHJvcHMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgcmV0dXJuIGNhcnJ5O1xuICAgIH1cbiAgICBjb25zdCB2YWwgPSB0YXJnZXRba2V5XTtcbiAgICBjb25zdCBuZXdWYWwgPSBjb3B5KHZhbCwgb3B0aW9ucyk7XG4gICAgYXNzaWduUHJvcChjYXJyeSwga2V5LCBuZXdWYWwsIHRhcmdldCwgb3B0aW9ucy5ub25lbnVtZXJhYmxlKTtcbiAgICByZXR1cm4gY2Fycnk7XG4gIH0sIHt9KTtcbn1cblxuZXhwb3J0cy5jb3B5ID0gY29weTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/copy-anything/dist/cjs/index.cjs\n");

/***/ })

};
;