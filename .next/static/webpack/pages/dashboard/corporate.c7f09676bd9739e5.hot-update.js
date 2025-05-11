/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard/corporate",{

/***/ "./components/dashboards/CorporateDashboard.tsx":
/*!******************************************************!*\
  !*** ./components/dashboards/CorporateDashboard.tsx ***!
  \******************************************************/
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

/***/ "./pages/dashboard/corporate.tsx":
/*!***************************************!*\
  !*** ./pages/dashboard/corporate.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CorporateDashboardPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/dashboards/CorporateDashboard */ \"./components/dashboards/CorporateDashboard.tsx\");\n/* harmony import */ var _components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction CorporateDashboardPage() {\n    _s();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const id = searchParams.get(\"id\");\n    const [corporate, setCorporate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!id) return;\n        const fetchData = async ()=>{\n            try {\n                const res = await fetch(\"/api/dashboard/corporate?id=\".concat(id));\n                const data = await res.json();\n                setCorporate(data);\n            } catch (err) {\n                console.error(\"Failed to fetch corporate dashboard data\", err);\n            } finally{\n                setLoading(false);\n            }\n        };\n        fetchData();\n    }, [\n        id\n    ]);\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        className: \"p-6\",\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/pages/dashboard/corporate.tsx\",\n        lineNumber: 29,\n        columnNumber: 23\n    }, this);\n    if (!corporate) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        className: \"p-6 text-red-600\",\n        children: \"No data found\"\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/pages/dashboard/corporate.tsx\",\n        lineNumber: 30,\n        columnNumber: 26\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_components_dashboards_CorporateDashboard__WEBPACK_IMPORTED_MODULE_3___default()), {\n        corporate: corporate\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/pages/dashboard/corporate.tsx\",\n        lineNumber: 32,\n        columnNumber: 10\n    }, this);\n}\n_s(CorporateDashboardPage, \"DBMhfIQ2n6J/eT7cE8lUnYwg96o=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams\n    ];\n});\n_c = CorporateDashboardPage;\nvar _c;\n$RefreshReg$(_c, \"CorporateDashboardPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kYXNoYm9hcmQvY29ycG9yYXRlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUU0QztBQUNpQjtBQUNlO0FBRTdELFNBQVNJOztJQUN0QixNQUFNQyxlQUFlSCxnRUFBZUE7SUFDcEMsTUFBTUksS0FBS0QsYUFBYUUsR0FBRyxDQUFDO0lBQzVCLE1BQU0sQ0FBQ0MsV0FBV0MsYUFBYSxHQUFHUiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNTLFNBQVNDLFdBQVcsR0FBR1YsK0NBQVFBLENBQUM7SUFFdkNELGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDTSxJQUFJO1FBQ1QsTUFBTU0sWUFBWTtZQUNoQixJQUFJO2dCQUNGLE1BQU1DLE1BQU0sTUFBTUMsTUFBTSwrQkFBa0MsT0FBSFI7Z0JBQ3ZELE1BQU1TLE9BQU8sTUFBTUYsSUFBSUcsSUFBSTtnQkFDM0JQLGFBQWFNO1lBQ2YsRUFBRSxPQUFPRSxLQUFLO2dCQUNaQyxRQUFRQyxLQUFLLENBQUMsNENBQTRDRjtZQUM1RCxTQUFVO2dCQUNSTixXQUFXO1lBQ2I7UUFDRjtRQUNBQztJQUNGLEdBQUc7UUFBQ047S0FBRztJQUVQLElBQUlJLFNBQVMscUJBQU8sOERBQUNVO1FBQUVDLFdBQVU7a0JBQU07Ozs7OztJQUN2QyxJQUFJLENBQUNiLFdBQVcscUJBQU8sOERBQUNZO1FBQUVDLFdBQVU7a0JBQW1COzs7Ozs7SUFFdkQscUJBQU8sOERBQUNsQixrRkFBa0JBO1FBQUNLLFdBQVdBOzs7Ozs7QUFDeEM7R0ExQndCSjs7UUFDREYsNERBQWVBOzs7S0FEZEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvZGFzaGJvYXJkL2NvcnBvcmF0ZS50c3g/YjAxYiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIsIHVzZVNlYXJjaFBhcmFtcyB9IGZyb20gJ25leHQvbmF2aWdhdGlvbic7XG5pbXBvcnQgQ29ycG9yYXRlRGFzaGJvYXJkIGZyb20gJ0AvY29tcG9uZW50cy9kYXNoYm9hcmRzL0NvcnBvcmF0ZURhc2hib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvcnBvcmF0ZURhc2hib2FyZFBhZ2UoKSB7XG4gIGNvbnN0IHNlYXJjaFBhcmFtcyA9IHVzZVNlYXJjaFBhcmFtcygpO1xuICBjb25zdCBpZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ2lkJyk7XG4gIGNvbnN0IFtjb3Jwb3JhdGUsIHNldENvcnBvcmF0ZV0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlkKSByZXR1cm47XG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC9hcGkvZGFzaGJvYXJkL2NvcnBvcmF0ZT9pZD0ke2lkfWApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgICAgc2V0Q29ycG9yYXRlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBjb3Jwb3JhdGUgZGFzaGJvYXJkIGRhdGEnLCBlcnIpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW2lkXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHJldHVybiA8cCBjbGFzc05hbWU9XCJwLTZcIj5Mb2FkaW5nLi4uPC9wPjtcbiAgaWYgKCFjb3Jwb3JhdGUpIHJldHVybiA8cCBjbGFzc05hbWU9XCJwLTYgdGV4dC1yZWQtNjAwXCI+Tm8gZGF0YSBmb3VuZDwvcD47XG5cbiAgcmV0dXJuIDxDb3Jwb3JhdGVEYXNoYm9hcmQgY29ycG9yYXRlPXtjb3Jwb3JhdGV9IC8+O1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwidXNlU2VhcmNoUGFyYW1zIiwiQ29ycG9yYXRlRGFzaGJvYXJkIiwiQ29ycG9yYXRlRGFzaGJvYXJkUGFnZSIsInNlYXJjaFBhcmFtcyIsImlkIiwiZ2V0IiwiY29ycG9yYXRlIiwic2V0Q29ycG9yYXRlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJmZXRjaERhdGEiLCJyZXMiLCJmZXRjaCIsImRhdGEiLCJqc29uIiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwicCIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/dashboard/corporate.tsx\n"));

/***/ })

});