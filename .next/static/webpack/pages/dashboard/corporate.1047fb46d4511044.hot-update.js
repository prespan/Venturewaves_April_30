/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard/corporate",{

/***/ "./src/components/dashboards/CorporateDashboard.tsx":
/*!**********************************************************!*\
  !*** ./src/components/dashboards/CorporateDashboard.tsx ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./src/pages/dashboard/corporate.tsx":
/*!*******************************************!*\
  !*** ./src/pages/dashboard/corporate.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CorporateDashboardPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/dashboards/CorporateDashboard */ \"./src/components/dashboards/CorporateDashboard.tsx\");\n/* harmony import */ var _components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nfunction CorporateDashboardPage() {\n    _s();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const [corporate, setCorporate] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        // Simulating fetching a corporate (replace this with actual fetching logic)\n        async function fetchCorporate() {\n            try {\n                const response = await fetch(\"/api/register/corporate\");\n                const data = await response.json();\n                setCorporate(data);\n            } catch (error) {\n                console.error(\"Failed to load corporate:\", error);\n            }\n        }\n        fetchCorporate();\n    }, []);\n    if (!corporate) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        className: \"p-6 text-red-600\",\n        children: \"No data found\"\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/src/pages/dashboard/corporate.tsx\",\n        lineNumber: 25,\n        columnNumber: 26\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3___default()), {\n        corporateId: corporate.id,\n        organizationName: corporate.name\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/src/pages/dashboard/corporate.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(CorporateDashboardPage, \"aHNO5qf7/3GCH3JZb95mCU1vgJw=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = CorporateDashboardPage;\nvar _c;\n$RefreshReg$(_c, \"CorporateDashboardPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvZGFzaGJvYXJkL2NvcnBvcmF0ZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBd0M7QUFDSTtBQUVnQztBQUU3RCxTQUFTSTs7SUFDdEIsTUFBTUMsU0FBU0wsc0RBQVNBO0lBQ3hCLE1BQU0sQ0FBQ00sV0FBV0MsYUFBYSxHQUFHTCwrQ0FBUUEsQ0FBc0M7SUFFaEZELGdEQUFTQSxDQUFDO1FBQ1IsNEVBQTRFO1FBQzVFLGVBQWVPO1lBQ2IsSUFBSTtnQkFDRixNQUFNQyxXQUFXLE1BQU1DLE1BQU07Z0JBQzdCLE1BQU1DLE9BQU8sTUFBTUYsU0FBU0csSUFBSTtnQkFDaENMLGFBQWFJO1lBQ2YsRUFBRSxPQUFPRSxPQUFPO2dCQUNkQyxRQUFRRCxLQUFLLENBQUMsNkJBQTZCQTtZQUM3QztRQUNGO1FBRUFMO0lBQ0YsR0FBRyxFQUFFO0lBRUwsSUFBSSxDQUFDRixXQUFXLHFCQUFPLDhEQUFDUztRQUFFQyxXQUFVO2tCQUFtQjs7Ozs7O0lBRXZELHFCQUNFLDhEQUFDYixrRkFBa0JBO1FBQ2pCYyxhQUFhWCxVQUFVWSxFQUFFO1FBQ3pCQyxrQkFBa0JiLFVBQVVjLElBQUk7Ozs7OztBQUd0QztHQTNCd0JoQjs7UUFDUEosa0RBQVNBOzs7S0FERkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3BhZ2VzL2Rhc2hib2FyZC9jb3Jwb3JhdGUudHN4Pzg2N2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSc7XG5pbXBvcnQgQ29ycG9yYXRlRGFzaGJvYXJkIGZyb20gJ0AvY29tcG9uZW50cy9kYXNoYm9hcmRzL0NvcnBvcmF0ZURhc2hib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvcnBvcmF0ZURhc2hib2FyZFBhZ2UoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbY29ycG9yYXRlLCBzZXRDb3Jwb3JhdGVdID0gdXNlU3RhdGU8eyBpZDogbnVtYmVyOyBuYW1lOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gU2ltdWxhdGluZyBmZXRjaGluZyBhIGNvcnBvcmF0ZSAocmVwbGFjZSB0aGlzIHdpdGggYWN0dWFsIGZldGNoaW5nIGxvZ2ljKVxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoQ29ycG9yYXRlKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9yZWdpc3Rlci9jb3Jwb3JhdGUnKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgc2V0Q29ycG9yYXRlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGxvYWQgY29ycG9yYXRlOicsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmZXRjaENvcnBvcmF0ZSgpO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFjb3Jwb3JhdGUpIHJldHVybiA8cCBjbGFzc05hbWU9XCJwLTYgdGV4dC1yZWQtNjAwXCI+Tm8gZGF0YSBmb3VuZDwvcD47XG5cbiAgcmV0dXJuIChcbiAgICA8Q29ycG9yYXRlRGFzaGJvYXJkXG4gICAgICBjb3Jwb3JhdGVJZD17Y29ycG9yYXRlLmlkfVxuICAgICAgb3JnYW5pemF0aW9uTmFtZT17Y29ycG9yYXRlLm5hbWV9XG4gICAgLz5cbiAgKTtcbn0iXSwibmFtZXMiOlsidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJDb3Jwb3JhdGVEYXNoYm9hcmQiLCJDb3Jwb3JhdGVEYXNoYm9hcmRQYWdlIiwicm91dGVyIiwiY29ycG9yYXRlIiwic2V0Q29ycG9yYXRlIiwiZmV0Y2hDb3Jwb3JhdGUiLCJyZXNwb25zZSIsImZldGNoIiwiZGF0YSIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJwIiwiY2xhc3NOYW1lIiwiY29ycG9yYXRlSWQiLCJpZCIsIm9yZ2FuaXphdGlvbk5hbWUiLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/dashboard/corporate.tsx\n"));

/***/ })

});