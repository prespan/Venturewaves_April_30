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

/***/ "./components/ui/Layout.tsx":
/*!**********************************!*\
  !*** ./components/ui/Layout.tsx ***!
  \**********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_themes__WEBPACK_IMPORTED_MODULE_3__]);\nnext_themes__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\nconst menu = [\n    {\n        href: \"/\",\n        label: \"Dashboard\"\n    },\n    {\n        href: \"/studios\",\n        label: \"Studios\"\n    },\n    {\n        href: \"/corporates\",\n        label: \"Corporates\"\n    },\n    {\n        href: \"/research-orgs\",\n        label: \"Research Organizations\"\n    },\n    {\n        href: \"/governments\",\n        label: \"Governments\"\n    },\n    {\n        href: \"/investors\",\n        label: \"Investors\"\n    },\n    {\n        href: \"/challenges\",\n        label: \"Challenges\"\n    },\n    {\n        href: \"/top-deals\",\n        label: \"Top Deals\"\n    },\n    {\n        href: \"/learning\",\n        label: \"Learning\"\n    },\n    {\n        href: \"/settings\",\n        label: \"Settings\"\n    }\n];\nfunction Layout({ children }) {\n    const { theme, setTheme } = (0,next_themes__WEBPACK_IMPORTED_MODULE_3__.useTheme)();\n    const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>setMounted(true), []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"aside\", {\n                className: \"w-64 px-6 py-8 bg-white dark:bg-gray-800 shadow-md space-y-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"text-2xl font-bold tracking-tight text-center mb-8\",\n                        children: \"\\uD83D\\uDE80 Venturewaves\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                        lineNumber: 30,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                        className: \"space-y-2\",\n                        children: menu.map((item)=>{\n                            const isActive = router.pathname === item.href;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                href: item.href,\n                                className: `block px-4 py-2 rounded transition ${isActive ? \"bg-blue-600 text-white font-semibold\" : \"hover:bg-gray-100 dark:hover:bg-gray-700\"}`,\n                                children: item.label\n                            }, item.href, false, {\n                                fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                                lineNumber: 36,\n                                columnNumber: 15\n                            }, this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                        lineNumber: 32,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>setTheme(theme === \"dark\" ? \"light\" : \"dark\"),\n                        className: \"w-full mt-10 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded hover:opacity-90 transition\",\n                        children: mounted ? theme === \"dark\" ? \"☀️ Light Mode\" : \"\\uD83C\\uDF19 Dark Mode\" : \"...\"\n                    }, void 0, false, {\n                        fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900\",\n                children: children\n            }, void 0, false, {\n                fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n                lineNumber: 60,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/workspaces/Venturewaves_April_30/components/ui/Layout.tsx\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL3VpL0xheW91dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBdUQ7QUFDMUI7QUFDVTtBQUNDO0FBRXhDLE1BQU1LLE9BQU87SUFDWDtRQUFFQyxNQUFNO1FBQUtDLE9BQU87SUFBWTtJQUNoQztRQUFFRCxNQUFNO1FBQVlDLE9BQU87SUFBVTtJQUNyQztRQUFFRCxNQUFNO1FBQWVDLE9BQU87SUFBYTtJQUMzQztRQUFFRCxNQUFNO1FBQWtCQyxPQUFPO0lBQXlCO0lBQzFEO1FBQUVELE1BQU07UUFBZ0JDLE9BQU87SUFBYztJQUM3QztRQUFFRCxNQUFNO1FBQWNDLE9BQU87SUFBWTtJQUN6QztRQUFFRCxNQUFNO1FBQWVDLE9BQU87SUFBYTtJQUMzQztRQUFFRCxNQUFNO1FBQWNDLE9BQU87SUFBWTtJQUN6QztRQUFFRCxNQUFNO1FBQWFDLE9BQU87SUFBVztJQUN2QztRQUFFRCxNQUFNO1FBQWFDLE9BQU87SUFBVztDQUN4QztBQUVjLFNBQVNDLE9BQU8sRUFBRUMsUUFBUSxFQUEyQjtJQUNsRSxNQUFNLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFLEdBQUdSLHFEQUFRQTtJQUNwQyxNQUFNLENBQUNTLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQUM7SUFDdkMsTUFBTWEsU0FBU1Ysc0RBQVNBO0lBRXhCSixnREFBU0EsQ0FBQyxJQUFNYSxXQUFXLE9BQU8sRUFBRTtJQUVwQyxxQkFDRSw4REFBQ0U7UUFBSUMsV0FBVTs7MEJBRWIsOERBQUNDO2dCQUFNRCxXQUFVOztrQ0FDZiw4REFBQ0Q7d0JBQUlDLFdBQVU7a0NBQXFEOzs7Ozs7a0NBRXBFLDhEQUFDRTt3QkFBSUYsV0FBVTtrQ0FDWlgsS0FBS2MsR0FBRyxDQUFDLENBQUNDOzRCQUNULE1BQU1DLFdBQVdQLE9BQU9RLFFBQVEsS0FBS0YsS0FBS2QsSUFBSTs0QkFDOUMscUJBQ0UsOERBQUNKLGtEQUFJQTtnQ0FFSEksTUFBTWMsS0FBS2QsSUFBSTtnQ0FDZlUsV0FBVyxDQUFDLG1DQUFtQyxFQUM3Q0ssV0FDSSx5Q0FDQSwyQ0FDTCxDQUFDOzBDQUVERCxLQUFLYixLQUFLOytCQVJOYSxLQUFLZCxJQUFJOzs7Ozt3QkFXcEI7Ozs7OztrQ0FHRiw4REFBQ2lCO3dCQUNDQyxTQUFTLElBQU1iLFNBQVNELFVBQVUsU0FBUyxVQUFVO3dCQUNyRE0sV0FBVTtrQ0FFVEosVUFBV0YsVUFBVSxTQUFTLGtCQUFrQiwyQkFBa0I7Ozs7Ozs7Ozs7OzswQkFLdkUsOERBQUNlO2dCQUFLVCxXQUFVOzBCQUNiUDs7Ozs7Ozs7Ozs7O0FBSVQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92ZW50dXJld2F2ZXMvLi9jb21wb25lbnRzL3VpL0xheW91dC50c3g/NWYxZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFjdE5vZGUsIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICduZXh0LXRoZW1lcyc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbmNvbnN0IG1lbnUgPSBbXG4gIHsgaHJlZjogJy8nLCBsYWJlbDogJ0Rhc2hib2FyZCcgfSxcbiAgeyBocmVmOiAnL3N0dWRpb3MnLCBsYWJlbDogJ1N0dWRpb3MnIH0sXG4gIHsgaHJlZjogJy9jb3Jwb3JhdGVzJywgbGFiZWw6ICdDb3Jwb3JhdGVzJyB9LFxuICB7IGhyZWY6ICcvcmVzZWFyY2gtb3JncycsIGxhYmVsOiAnUmVzZWFyY2ggT3JnYW5pemF0aW9ucycgfSxcbiAgeyBocmVmOiAnL2dvdmVybm1lbnRzJywgbGFiZWw6ICdHb3Zlcm5tZW50cycgfSxcbiAgeyBocmVmOiAnL2ludmVzdG9ycycsIGxhYmVsOiAnSW52ZXN0b3JzJyB9LFxuICB7IGhyZWY6ICcvY2hhbGxlbmdlcycsIGxhYmVsOiAnQ2hhbGxlbmdlcycgfSxcbiAgeyBocmVmOiAnL3RvcC1kZWFscycsIGxhYmVsOiAnVG9wIERlYWxzJyB9LFxuICB7IGhyZWY6ICcvbGVhcm5pbmcnLCBsYWJlbDogJ0xlYXJuaW5nJyB9LFxuICB7IGhyZWY6ICcvc2V0dGluZ3MnLCBsYWJlbDogJ1NldHRpbmdzJyB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGF5b3V0KHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3ROb2RlIH0pIHtcbiAgY29uc3QgeyB0aGVtZSwgc2V0VGhlbWUgfSA9IHVzZVRoZW1lKCk7XG4gIGNvbnN0IFttb3VudGVkLCBzZXRNb3VudGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHNldE1vdW50ZWQodHJ1ZSksIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4taC1zY3JlZW4gYmctZ3JheS01MCBkYXJrOmJnLWdyYXktOTAwIHRleHQtZ3JheS05MDAgZGFyazp0ZXh0LWdyYXktMTAwIGZvbnQtc2Fuc1wiPlxuICAgICAgey8qIFNpZGViYXIgKi99XG4gICAgICA8YXNpZGUgY2xhc3NOYW1lPVwidy02NCBweC02IHB5LTggYmctd2hpdGUgZGFyazpiZy1ncmF5LTgwMCBzaGFkb3ctbWQgc3BhY2UteS04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IHRleHQtY2VudGVyIG1iLThcIj7wn5qAIFZlbnR1cmV3YXZlczwvZGl2PlxuXG4gICAgICAgIDxuYXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAge21lbnUubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHJvdXRlci5wYXRobmFtZSA9PT0gaXRlbS5ocmVmO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYmxvY2sgcHgtNCBweS0yIHJvdW5kZWQgdHJhbnNpdGlvbiAke1xuICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctYmx1ZS02MDAgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICA6ICdob3ZlcjpiZy1ncmF5LTEwMCBkYXJrOmhvdmVyOmJnLWdyYXktNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvbmF2PlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaGVtZSh0aGVtZSA9PT0gJ2RhcmsnID8gJ2xpZ2h0JyA6ICdkYXJrJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG10LTEwIHB5LTIgYmctZ3JheS0yMDAgZGFyazpiZy1ncmF5LTcwMCB0ZXh0LXNtIHJvdW5kZWQgaG92ZXI6b3BhY2l0eS05MCB0cmFuc2l0aW9uXCJcbiAgICAgICAgPlxuICAgICAgICAgIHttb3VudGVkID8gKHRoZW1lID09PSAnZGFyaycgPyAn4piA77iPIExpZ2h0IE1vZGUnIDogJ/CfjJkgRGFyayBNb2RlJykgOiAnLi4uJ31cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2FzaWRlPlxuXG4gICAgICB7LyogTWFpbiBjb250ZW50ICovfVxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC0xIHAtOCBvdmVyZmxvdy15LWF1dG8gYmctZ3JheS01MCBkYXJrOmJnLWdyYXktOTAwXCI+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkxpbmsiLCJ1c2VUaGVtZSIsInVzZVJvdXRlciIsIm1lbnUiLCJocmVmIiwibGFiZWwiLCJMYXlvdXQiLCJjaGlsZHJlbiIsInRoZW1lIiwic2V0VGhlbWUiLCJtb3VudGVkIiwic2V0TW91bnRlZCIsInJvdXRlciIsImRpdiIsImNsYXNzTmFtZSIsImFzaWRlIiwibmF2IiwibWFwIiwiaXRlbSIsImlzQWN0aXZlIiwicGF0aG5hbWUiLCJidXR0b24iLCJvbkNsaWNrIiwibWFpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/ui/Layout.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-themes */ \"next-themes\");\n/* harmony import */ var _components_ui_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/Layout */ \"./components/ui/Layout.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_themes__WEBPACK_IMPORTED_MODULE_2__, _components_ui_Layout__WEBPACK_IMPORTED_MODULE_3__]);\n([next_themes__WEBPACK_IMPORTED_MODULE_2__, _components_ui_Layout__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_themes__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        attribute: \"class\",\n        defaultTheme: \"system\" // Switches between light/dark based on OS setting\n        ,\n        enableSystem: true,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_Layout__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/workspaces/Venturewaves_April_30/pages/_app.tsx\",\n                lineNumber: 14,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/workspaces/Venturewaves_April_30/pages/_app.tsx\",\n            lineNumber: 13,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/workspaces/Venturewaves_April_30/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUVjO0FBQ0E7QUFFN0IsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBWTtJQUM5RCxxQkFDRSw4REFBQ0osc0RBQWFBO1FBQ1pLLFdBQVU7UUFDVkMsY0FBYSxTQUFTLGtEQUFrRDs7UUFDeEVDLGNBQWM7a0JBRWQsNEVBQUNOLDZEQUFNQTtzQkFDTCw0RUFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQUloQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZlbnR1cmV3YXZlcy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ25leHQtdGhlbWVzJztcbmltcG9ydCBMYXlvdXQgZnJvbSAnQC9jb21wb25lbnRzL3VpL0xheW91dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8VGhlbWVQcm92aWRlclxuICAgICAgYXR0cmlidXRlPVwiY2xhc3NcIlxuICAgICAgZGVmYXVsdFRoZW1lPVwic3lzdGVtXCIgLy8gU3dpdGNoZXMgYmV0d2VlbiBsaWdodC9kYXJrIGJhc2VkIG9uIE9TIHNldHRpbmdcbiAgICAgIGVuYWJsZVN5c3RlbT17dHJ1ZX0gICAvLyBFbnN1cmVzIHN5c3RlbSB0aGVtZSBwcmVmZXJlbmNlIGlzIHJlc3BlY3RlZFxuICAgID5cbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvTGF5b3V0PlxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJUaGVtZVByb3ZpZGVyIiwiTGF5b3V0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJhdHRyaWJ1dGUiLCJkZWZhdWx0VGhlbWUiLCJlbmFibGVTeXN0ZW0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();