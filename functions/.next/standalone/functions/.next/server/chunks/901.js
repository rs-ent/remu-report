exports.id = 901;
exports.ids = [901];
exports.modules = {

/***/ 48329:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 16505, 23))

/***/ }),

/***/ 81405:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50954, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 53879));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 89038))

/***/ }),

/***/ 53879:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
// src/components/ThemeToggle.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

const ThemeToggle = ()=>{
    const [isDark, setIsDark] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const toggleTheme = ()=>{
        if (isDark) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
        setIsDark(!isDark);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        onClick: toggleTheme,
        className: "p-2 rounded-full bg-light dark:bg-dark shadow-xl transition duration-300",
        "aria-label": "Toggle Theme",
        children: isDark ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "\uD83C\uDF1E"
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            children: "\uD83C\uDF19"
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeToggle);


/***/ }),

/***/ 89038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReportProvider: () => (/* binding */ ReportProvider),
/* harmony export */   useReportContext: () => (/* binding */ useReportContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_fetchReport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11176);
// src/context/ReportContext.tsx
/* __next_internal_client_entry_do_not_use__ ReportProvider,useReportContext auto */ 


const ReportContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const ReportProvider = ({ children })=>{
    const [reports, setReports] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [report, setReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const getReports = async ()=>{
            try {
                const data = await (0,_utils_fetchReport__WEBPACK_IMPORTED_MODULE_2__/* .fetchReportData */ .U9)();
                setReports(data);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
                setError(errorMessage);
            } finally{
                setLoading(false);
            }
        };
        getReports();
    }, []);
    const getReportByArtistEng = async (artistEng)=>{
        setLoading(true);
        try {
            const foundReport = reports.find((report)=>report.artist_eng === artistEng);
            if (!foundReport) {
                setError("해당 리포트를 찾을 수 없습니다.");
                setReport(null);
            } else {
                setReport(foundReport);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
            setError(errorMessage);
        } finally{
            setLoading(false);
        }
    };
    const updateReportFieldInContext = async (field, value)=>{
        if (report) {
            const updatedReport = {
                ...report,
                [field]: value
            };
            setReport(updatedReport); // 로컬 상태 업데이트
            await (0,_utils_fetchReport__WEBPACK_IMPORTED_MODULE_2__/* .updateReportField */ .Y8)(report.artist_eng, field, value); // Firestore에 저장
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReportContext.Provider, {
        value: {
            reports,
            report,
            loading,
            error,
            getReportByArtistEng,
            updateReportFieldInContext,
            setReport
        },
        children: children
    });
};
const useReportContext = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ReportContext);
    if (!context) {
        throw new Error("useReportContext must be used within a ReportProvider");
    }
    return context;
};


/***/ }),

/***/ 8788:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   db: () => (/* binding */ db),
/* harmony export */   t: () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72856);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29904);
/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31640);



const firebaseConfig = {
    apiKey: "AIzaSyCDkyA_EzL99SjudTHAYTwdFi6P--bn5HI",
    authDomain: "redslippers.firebaseapp.com",
    projectId: "redslippers",
    storageBucket: "redslippers.appspot.com",
    messagingSenderId: "263516861210",
    appId: "1:263516861210:web:5982131662655b0c32b2a3"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__/* .initializeApp */ .ZF)(firebaseConfig);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__/* .getFirestore */ .ad)(app);
const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__/* .getStorage */ .cF)(app);



/***/ }),

/***/ 11176:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Th: () => (/* binding */ fetchReportById),
/* harmony export */   U9: () => (/* binding */ fetchReportData),
/* harmony export */   Y8: () => (/* binding */ updateReportField)
/* harmony export */ });
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29904);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8788);


const fetchReportById = async (artist_eng)=>{
    const reportCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, "Report");
    const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .getDocs */ .PL)(reportCollection);
    let report = null;
    querySnapshot.forEach((doc)=>{
        const docData = doc.data();
        if (docData.artist_eng === artist_eng) {
            report = {
                id: doc.id,
                artist_eng: docData.artist_eng,
                artist_kor: docData.artist_kor,
                title: docData.title,
                sub_title: docData.sub_title,
                image_alpha: docData.image_alpha,
                background: docData.background || null,
                gallery: docData.gallery || null,
                macro_marketGrowth_comment: docData.macro_marketGrowth_comment || null,
                macro_marketGrowthDetail_comment: docData.macro_marketGrowthDetail_comment || null,
                circlechart_target: docData.circlechart_target || null,
                melon_artist_id: docData.melon_artist_id || null,
                meso_circlechart_comment: docData.meso_circlechart_comment || null,
                micro: {
                    pastSections: docData.micro?.pastSections || []
                }
            };
        }
    });
    return report;
};
const fetchReportData = async ()=>{
    const reportCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, "Report");
    const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .getDocs */ .PL)(reportCollection);
    const data = [];
    querySnapshot.forEach((doc)=>{
        const docData = doc.data();
        data.push({
            id: doc.id,
            artist_eng: docData.artist_eng || "",
            artist_kor: docData.artist_kor || "",
            title: docData.title || "IPO REPORT",
            sub_title: docData.sub_title || "IPO 리포트",
            image_alpha: docData.image_alpha || "",
            background: docData.background || null,
            gallery: docData.gallery || null,
            macro_marketGrowth_comment: docData.macro_marketGrowth_comment || null,
            macro_marketGrowthDetail_comment: docData.macro_marketGrowthDetail_comment || null,
            circlechart_target: docData.circlechart_target || null,
            melon_artist_id: docData.melon_artist_id || null,
            meso_circlechart_comment: docData.meso_circlechart_comment || null,
            micro: {
                pastSections: docData.micro?.pastSections || []
            }
        });
    });
    return data;
};
const updateReportField = async (artist_eng, field, value)=>{
    const reportCollection = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .collection */ .hJ)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, "Report");
    const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .getDocs */ .PL)(reportCollection);
    let reportId = null;
    querySnapshot.forEach((docSnap)=>{
        const docData = docSnap.data();
        if (docData.artist_eng === artist_eng) {
            reportId = docSnap.id;
        }
    });
    if (reportId) {
        const reportRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .doc */ .JU)(_firebase__WEBPACK_IMPORTED_MODULE_1__.db, "Report", reportId);
        await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_0__/* .updateDoc */ .r7)(reportRef, {
            [field]: value
        });
    } else {
        throw new Error("Report not found");
    }
};


/***/ }),

/***/ 83357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(62947);
// EXTERNAL MODULE: ./src/styles/globals.css
var globals = __webpack_require__(54315);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(25124);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/components/ThemeToggle.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/johyeongon/Documents/RemuProject/Report/visualization/src/components/ThemeToggle.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const ThemeToggle = (__default__);
;// CONCATENATED MODULE: ./src/components/NavBar.tsx
// src/components/Navbar.tsx




const Navbar = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "navbar bg-primary text-white shadow-md",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-1",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    className: "text-gray-300",
                    children: "IPO 리포트"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex-none",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                        className: "menu menu-horizontal px-1 hidden lg:flex ",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/",
                                    className: "text-gray-300",
                                    children: "REPORTS"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: "/create",
                                    className: "text-gray-300",
                                    children: "CREATE"
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "dropdown dropdown-end lg:hidden",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                tabIndex: 0,
                                className: "btn btn-ghost",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    className: "h-5 w-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: "2",
                                        d: "M4 6h16M4 12h16M4 18h16"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                tabIndex: 0,
                                className: "menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-dark rounded-box w-52",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/",
                                            children: "REPORTS"
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: "/create",
                                            children: "CREATE"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(ThemeToggle, {})
                ]
            })
        ]
    });
};
/* harmony default export */ const NavBar = (Navbar);

;// CONCATENATED MODULE: ./src/components/Footer.tsx
// src/components/Footer.tsx


const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("footer", {
        className: "footer p-10 bg-secondary text-white",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "text-center w-full",
            children: /*#__PURE__*/ jsx_runtime_.jsx("p", {
                children: "\xa9 2024 IPO REPORT. All rights reserved."
            })
        })
    });
};
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./src/context/ReportContext.tsx

const ReportContext_proxy = (0,module_proxy.createProxy)(String.raw`/Users/johyeongon/Documents/RemuProject/Report/visualization/src/context/ReportContext.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: ReportContext_esModule, $$typeof: ReportContext_$$typeof } = ReportContext_proxy;
const ReportContext_default_ = ReportContext_proxy.default;

const e0 = ReportContext_proxy["ReportProvider"];

const e1 = ReportContext_proxy["useReportContext"];

;// CONCATENATED MODULE: ./src/app/layout.tsx
// src/app/layout.tsx



//import Link from 'next/link';
//import ThemeToggle from '../components/ThemeToggle'; // 테마 전환 컴포넌트
 // 네비게이션 바 컴포넌트
 // 푸터 컴포넌트

function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "ko",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            className: "min-h-screen bg-light dark:bg-backdrop-dark flex flex-col transition-colors duration-500",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
                /*#__PURE__*/ jsx_runtime_.jsx(e0, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("main", {
                        className: "flex-grow w-full mx-auto",
                        children: children
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
            ]
        })
    });
}


/***/ }),

/***/ 73881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 54315:
/***/ (() => {



/***/ })

};
;