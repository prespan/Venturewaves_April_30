/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/components/ui/Layout.tsx":
/*!**************************************!*\
  !*** ./src/components/ui/Layout.tsx ***!
  \**************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_themes__WEBPACK_IMPORTED_MODULE_3__]);\nnext_themes__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\nconst menu = [\n    {\n        href: \"/\",\n        label: \"Dashboard\"\n    },\n    {\n        href: \"/studios\",\n        label: \"Studios\"\n    },\n    {\n        href: \"/corporates\",\n        label: \"Corporates\"\n    },\n    {\n        href: \"/research-orgs\",\n        label: \"Research Organizations\"\n    },\n    {\n        href: \"/governments\",\n        label: \"Governments\"\n    },\n    {\n        href: \"/investors\",\n        label: \"Investors\"\n    },\n    {\n        href: \"/challenges\",\n        label: \"Challenges\"\n    },\n    {\n        href: \"/top-deals\",\n        label: \"Top Deals\"\n    },\n    {\n        href: \"/learning\",\n        label: \"Learning\"\n    },\n    {\n        href: \"/settings\",\n        label: \"Settings\"\n    }\n];\nfunction Layout({ children }) {\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_3__.useTheme)();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setMounted(true), []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                className: \"w-64 px-6 py-8 bg-white dark:bg-gray-800 shadow-md space-y-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-2xl font-bold tracking-tight text-center mb-8\",\n                        children: \"\\uD83D\\uDE80 Venturewaves\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                        className: \"space-y-2\",\n                        children: menu.map((item)=>{\n                            const isActive = router.asPath.startsWith(item.href);\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: item.href,\n                                className: `block px-4 py-2 rounded transition ${isActive ? \"bg-blue-600 text-white font-semibold\" : \"hover:bg-gray-100 dark:hover:bg-gray-700\"}`,\n                                children: item.label\n                            }, item.href, false, {\n                                fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 15\n                            }, this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>setTheme(theme === \"dark\" ? \"light\" : \"dark\"),\n                        className: \"w-full mt-10 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:opacity-90 transition\",\n                        children: mounted ? theme === \"dark\" ? \"☀️ Light Mode\" : \"\\uD83C\\uDF19 Dark Mode\" : \"...\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900\",\n                children: children\n            }, void 0, false, {\n                fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/Venturewaves_April_30/src/components/ui/Layout.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy91aS9MYXlvdXQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVEO0FBQzFCO0FBQ1U7QUFDQztBQUV4QyxNQUFNSyxPQUFPO0lBQ1g7UUFBRUMsTUFBTTtRQUFLQyxPQUFPO0lBQVk7SUFDaEM7UUFBRUQsTUFBTTtRQUFZQyxPQUFPO0lBQVU7SUFDckM7UUFBRUQsTUFBTTtRQUFlQyxPQUFPO0lBQWE7SUFDM0M7UUFBRUQsTUFBTTtRQUFrQkMsT0FBTztJQUF5QjtJQUMxRDtRQUFFRCxNQUFNO1FBQWdCQyxPQUFPO0lBQWM7SUFDN0M7UUFBRUQsTUFBTTtRQUFjQyxPQUFPO0lBQVk7SUFDekM7UUFBRUQsTUFBTTtRQUFlQyxPQUFPO0lBQWE7SUFDM0M7UUFBRUQsTUFBTTtRQUFjQyxPQUFPO0lBQVk7SUFDekM7UUFBRUQsTUFBTTtRQUFhQyxPQUFPO0lBQVc7SUFDdkM7UUFBRUQsTUFBTTtRQUFhQyxPQUFPO0lBQVc7Q0FDeEM7QUFFYyxTQUFTQyxPQUFPLEVBQUVDLFFBQVEsRUFBMkI7SUFDbEUsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHUixxREFBUUE7SUFDcEMsTUFBTSxDQUFDUyxTQUFTQyxXQUFXLEdBQUdaLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU1hLFNBQVNWLHNEQUFTQTtJQUV4QkosZ0RBQVNBLENBQUMsSUFBTWEsV0FBVyxPQUFPLEVBQUU7SUFFcEMscUJBQ0UsOERBQUNFO1FBQUlDLFdBQVU7OzBCQUViLDhEQUFDQztnQkFBTUQsV0FBVTs7a0NBQ2YsOERBQUNEO3dCQUFJQyxXQUFVO2tDQUFxRDs7Ozs7O2tDQUVwRSw4REFBQ0U7d0JBQUlGLFdBQVU7a0NBQ1pYLEtBQUtjLEdBQUcsQ0FBQyxDQUFDQzs0QkFDVCxNQUFNQyxXQUFXUCxPQUFPUSxNQUFNLENBQUNDLFVBQVUsQ0FBQ0gsS0FBS2QsSUFBSTs0QkFDbkQscUJBQ0UsOERBQUNKLGtEQUFJQTtnQ0FFSEksTUFBTWMsS0FBS2QsSUFBSTtnQ0FDZlUsV0FBVyxDQUFDLG1DQUFtQyxFQUM3Q0ssV0FDSSx5Q0FDQSwyQ0FDTCxDQUFDOzBDQUVERCxLQUFLYixLQUFLOytCQVJOYSxLQUFLZCxJQUFJOzs7Ozt3QkFXcEI7Ozs7OztrQ0FHRiw4REFBQ2tCO3dCQUNDQyxTQUFTLElBQU1kLFNBQVNELFVBQVUsU0FBUyxVQUFVO3dCQUNyRE0sV0FBVTtrQ0FFVEosVUFBV0YsVUFBVSxTQUFTLGtCQUFrQiwyQkFBa0I7Ozs7Ozs7Ozs7OzswQkFLdkUsOERBQUNnQjtnQkFBS1YsV0FBVTswQkFDYlA7Ozs7Ozs7Ozs7OztBQUlUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmVudHVyZXdhdmVzLy4vc3JjL2NvbXBvbmVudHMvdWkvTGF5b3V0LnRzeD82OTE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlYWN0Tm9kZSwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ25leHQtdGhlbWVzJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcblxuY29uc3QgbWVudSA9IFtcbiAgeyBocmVmOiAnLycsIGxhYmVsOiAnRGFzaGJvYXJkJyB9LFxuICB7IGhyZWY6ICcvc3R1ZGlvcycsIGxhYmVsOiAnU3R1ZGlvcycgfSxcbiAgeyBocmVmOiAnL2NvcnBvcmF0ZXMnLCBsYWJlbDogJ0NvcnBvcmF0ZXMnIH0sXG4gIHsgaHJlZjogJy9yZXNlYXJjaC1vcmdzJywgbGFiZWw6ICdSZXNlYXJjaCBPcmdhbml6YXRpb25zJyB9LFxuICB7IGhyZWY6ICcvZ292ZXJubWVudHMnLCBsYWJlbDogJ0dvdmVybm1lbnRzJyB9LFxuICB7IGhyZWY6ICcvaW52ZXN0b3JzJywgbGFiZWw6ICdJbnZlc3RvcnMnIH0sXG4gIHsgaHJlZjogJy9jaGFsbGVuZ2VzJywgbGFiZWw6ICdDaGFsbGVuZ2VzJyB9LFxuICB7IGhyZWY6ICcvdG9wLWRlYWxzJywgbGFiZWw6ICdUb3AgRGVhbHMnIH0sXG4gIHsgaHJlZjogJy9sZWFybmluZycsIGxhYmVsOiAnTGVhcm5pbmcnIH0sXG4gIHsgaHJlZjogJy9zZXR0aW5ncycsIGxhYmVsOiAnU2V0dGluZ3MnIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMYXlvdXQoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdE5vZGUgfSkge1xuICBjb25zdCB7IHRoZW1lLCBzZXRUaGVtZSB9ID0gdXNlVGhlbWUoKTtcbiAgY29uc3QgW21vdW50ZWQsIHNldE1vdW50ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4gc2V0TW91bnRlZCh0cnVlKSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwIGRhcms6YmctZ3JheS05MDAgdGV4dC1ncmF5LTkwMCBkYXJrOnRleHQtZ3JheS0xMDAgZm9udC1zYW5zXCI+XG4gICAgICB7LyogU2lkZWJhciAqL31cbiAgICAgIDxhc2lkZSBjbGFzc05hbWU9XCJ3LTY0IHB4LTYgcHktOCBiZy13aGl0ZSBkYXJrOmJnLWdyYXktODAwIHNoYWRvdy1tZCBzcGFjZS15LThcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC1jZW50ZXIgbWItOFwiPvCfmoAgVmVudHVyZXdhdmVzPC9kaXY+XG5cbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICB7bWVudS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcm91dGVyLmFzUGF0aC5zdGFydHNXaXRoKGl0ZW0uaHJlZik7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgIGtleT17aXRlbS5ocmVmfVxuICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BibG9jayBweC00IHB5LTIgcm91bmRlZCB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgIDogJ2hvdmVyOmJnLWdyYXktMTAwIGRhcms6aG92ZXI6YmctZ3JheS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXRlbS5sYWJlbH1cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRoZW1lKHRoZW1lID09PSAnZGFyaycgPyAnbGlnaHQnIDogJ2RhcmsnKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtMTAgcHktMiBiZy1ncmF5LTIwMCBkYXJrOmJnLWdyYXktNzAwIHRleHQtc20gcm91bmRlZCBob3ZlcjpvcGFjaXR5LTkwIHRyYW5zaXRpb25cIlxuICAgICAgICA+XG4gICAgICAgICAge21vdW50ZWQgPyAodGhlbWUgPT09ICdkYXJrJyA/ICfimIDvuI8gTGlnaHQgTW9kZScgOiAn8J+MmSBEYXJrIE1vZGUnKSA6ICcuLi4nfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvYXNpZGU+XG5cbiAgICAgIHsvKiBNYWluIGNvbnRlbnQgKi99XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4LTEgcC04IG92ZXJmbG93LXktYXV0byBiZy1ncmF5LTUwIGRhcms6YmctZ3JheS05MDBcIj5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9tYWluPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiTGluayIsInVzZVRoZW1lIiwidXNlUm91dGVyIiwibWVudSIsImhyZWYiLCJsYWJlbCIsIkxheW91dCIsImNoaWxkcmVuIiwidGhlbWUiLCJzZXRUaGVtZSIsIm1vdW50ZWQiLCJzZXRNb3VudGVkIiwicm91dGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiYXNpZGUiLCJuYXYiLCJtYXAiLCJpdGVtIiwiaXNBY3RpdmUiLCJhc1BhdGgiLCJzdGFydHNXaXRoIiwiYnV0dG9uIiwib25DbGljayIsIm1haW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/ui/Layout.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var _components_ui_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/Layout */ \"./src/components/ui/Layout.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_themes__WEBPACK_IMPORTED_MODULE_3__, _components_ui_Layout__WEBPACK_IMPORTED_MODULE_4__]);\n([next_themes__WEBPACK_IMPORTED_MODULE_3__, _components_ui_Layout__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_3__.ThemeProvider, {\n        attribute: \"class\",\n        defaultTheme: \"system\",\n        enableSystem: true,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_Layout__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/workspaces/Venturewaves_April_30/src/pages/_app.tsx\",\n                lineNumber: 17,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/workspaces/Venturewaves_April_30/src/pages/_app.tsx\",\n            lineNumber: 16,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/src/pages/_app.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUUwQjtBQUNJO0FBRWM7QUFDQTtBQUU3QixTQUFTRyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzlELHFCQUNFLDhEQUFDSixzREFBYUE7UUFDWkssV0FBVTtRQUNWQyxjQUFhO1FBQ2JDLGNBQWM7a0JBRWQsNEVBQUNOLDZEQUFNQTtzQkFDTCw0RUFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZlbnR1cmV3YXZlcy8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnQC9zdHlsZXMvZ2xvYmFscy5jc3MnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICduZXh0LXRoZW1lcyc7XG5pbXBvcnQgTGF5b3V0IGZyb20gJ0AvY29tcG9uZW50cy91aS9MYXlvdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG4gIHJldHVybiAoXG4gICAgPFRoZW1lUHJvdmlkZXJcbiAgICAgIGF0dHJpYnV0ZT1cImNsYXNzXCJcbiAgICAgIGRlZmF1bHRUaGVtZT1cInN5c3RlbVwiXG4gICAgICBlbmFibGVTeXN0ZW09e3RydWV9XG4gICAgPlxuICAgICAgPExheW91dD5cbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgPC9MYXlvdXQ+XG4gICAgPC9UaGVtZVByb3ZpZGVyPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiVGhlbWVQcm92aWRlciIsIkxheW91dCIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiYXR0cmlidXRlIiwiZGVmYXVsdFRoZW1lIiwiZW5hYmxlU3lzdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "next-themes":
/*!******************************!*\
  !*** external "next-themes" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = import("next-themes");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_app.tsx")));
module.exports = __webpack_exports__;

})();