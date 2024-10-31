"use strict";
exports.id = 969;
exports.ids = [969];
exports.modules = {

/***/ 36153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ components_DynamicSection)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/react-markdown/lib/index.js + 113 modules
var lib = __webpack_require__(12461);
// EXTERNAL MODULE: ./node_modules/remark-gfm/lib/index.js + 54 modules
var remark_gfm_lib = __webpack_require__(59554);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs + 187 modules
var proxy = __webpack_require__(88099);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.mjs + 4 modules
var fa = __webpack_require__(40858);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/TextSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/TextSection.tsx






const TextSection = ({ title, subtitle, level, content })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "mb-12 w-full max-w-6xl px-4",
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            title && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center mb-2 text-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(fa/* FaInfoCircle */.DAO, {
                        className: "text-primary mr-2 text-center"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                        className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold text-primary text-center`,
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-2xl font-semibold mb-4 text-secondary text-center",
                children: subtitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "prose dark:prose-dark max-w-none",
                children: /*#__PURE__*/ jsx_runtime_.jsx(lib/* Markdown */.U, {
                    remarkPlugins: [
                        remark_gfm_lib/* default */.Z
                    ],
                    className: "text-lg leading-relaxed text-gray-700 dark:text-gray-300",
                    children: content
                })
            })
        ]
    });
};
/* harmony default export */ const sections_TextSection = (TextSection);

// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/scroll/use-viewport-scroll.mjs + 15 modules
var use_viewport_scroll = __webpack_require__(62232);
// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/value/use-transform.mjs + 4 modules
var use_transform = __webpack_require__(61591);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/HeroSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/HeroSection.tsx







const HeroSection = ({ title, subtitle, level, content, backgroundImage, ctaText, ctaLink })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h1";
            case 2:
                return "h2";
            case 3:
                return "h3";
            default:
                return "h1";
        }
    };
    const TitleTag = getTitleTag(level);
    // 패럴랙스 효과를 위한 훅
    const { scrollY } = (0,use_viewport_scroll/* useViewportScroll */.M)();
    const y = (0,use_transform/* useTransform */.H)(scrollY, [
        0,
        300
    ], [
        0,
        -50
    ]);
    // 애니메이션 변형 정의
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0
        }
    };
    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden",
        initial: "hidden",
        animate: "visible",
        transition: {
            duration: 1
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.div, {
                className: "absolute inset-0",
                style: {
                    y
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: backgroundImage,
                        alt: "Hero Background",
                        className: "w-full h-full object-cover",
                        loading: "lazy"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "absolute inset-0 bg-black opacity-50"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "relative z-10 px-4",
                children: [
                    title && /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.div, {
                        className: "flex items-center justify-center mb-4",
                        variants: containerVariants,
                        initial: "hidden",
                        animate: "visible",
                        transition: {
                            duration: 1,
                            delay: 0.2
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                            className: `text-glow ${level === 1 ? "text-6xl" : level === 2 ? "text-5xl" : "text-4xl"} font-bold text-gray-200`,
                            children: title
                        })
                    }),
                    subtitle && /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.h2, {
                        className: "text-gray-300 text-2xl md:text-3xl font-semibold mb-6",
                        variants: itemVariants,
                        initial: "hidden",
                        animate: "visible",
                        transition: {
                            duration: 1,
                            delay: 0.4
                        },
                        children: subtitle
                    }),
                    content && /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.div, {
                        className: "prose dark:prose-dark max-w-none mb-8",
                        variants: itemVariants,
                        initial: "hidden",
                        animate: "visible",
                        transition: {
                            duration: 1,
                            delay: 0.6
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx(lib/* Markdown */.U, {
                            remarkPlugins: [
                                remark_gfm_lib/* default */.Z
                            ],
                            className: "text-gray-100 text-lg leading-relaxed",
                            children: content
                        })
                    }),
                    ctaText && ctaLink && /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.div, {
                        variants: itemVariants,
                        initial: "hidden",
                        animate: "visible",
                        transition: {
                            duration: 1,
                            delay: 0.8
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            href: ctaLink,
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                className: "inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300",
                                children: [
                                    ctaText,
                                    /*#__PURE__*/ jsx_runtime_.jsx(fa/* FaArrowRight */.Z1Y, {
                                        className: "ml-2"
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const sections_HeroSection = (HeroSection);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/CombinedSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/CombinedSection.tsx





const CombinedSection = ({ title, subtitle, level, content, photo, imageLeft = true })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "mb-12 flex flex-col md:flex-row items-center w-full max-w-6xl px-4",
        initial: {
            opacity: 0,
            scale: 0.95
        },
        whileInView: {
            opacity: 1,
            scale: 1
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            photo && imageLeft && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "relative w-full md:w-1/2 h-80 mb-6 md:mb-0 md:mr-6",
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: photo,
                    alt: title,
                    style: {
                        maxHeight: "400px",
                        maxWidth: "500px"
                    },
                    className: "object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "w-full md:w-1/2",
                children: [
                    title && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center mb-2",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                            className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold text-primary`,
                            children: title
                        })
                    }),
                    subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: "text-lg font-semibold mb-4 text-secondary",
                        children: subtitle
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "prose dark:prose-dark max-w-none",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(lib/* Markdown */.U, {
                            remarkPlugins: [
                                remark_gfm_lib/* default */.Z
                            ],
                            className: "text-sm leading-relaxed text-gray-700 dark:text-gray-300",
                            children: content
                        })
                    })
                ]
            }),
            photo && !imageLeft && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "relative w-full md:w-1/2 h-80 mt-6 md:mt-0 md:ml-6",
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    src: photo,
                    alt: title,
                    style: {
                        maxHeight: "400px",
                        maxWidth: "500px"
                    },
                    className: "object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                })
            })
        ]
    });
};
/* harmony default export */ const sections_CombinedSection = (CombinedSection);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/VideoSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/VideoSection.tsx



const VideoSection = ({ title, subtitle, level, videoUrl })=>{
    const iframeRef = (0,react_.useRef)(null);
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    const getEmbedUrl = (url)=>{
        const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
        const shortYoutubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&]+)/);
        const videoId = youtubeMatch ? youtubeMatch[1] : shortYoutubeMatch ? shortYoutubeMatch[1] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };
    const embedUrl = getEmbedUrl(videoUrl);
    (0,react_.useEffect)(()=>{
        const observer = new IntersectionObserver((entries)=>{
            const iframe = iframeRef.current;
            if (iframe) {
                entries.forEach((entry)=>{
                    if (entry.isIntersecting) {
                        // 뷰포트 안에 들어오면 동영상 재생
                        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    } else {
                        // 뷰포트 밖으로 나가면 동영상 일시정지
                        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    }
                });
            }
        }, {
            threshold: 0.7
        } // 50% 이상 보이면 재생
        );
        if (iframeRef.current) {
            observer.observe(iframeRef.current);
        }
        return ()=>{
            if (iframeRef.current) {
                observer.unobserve(iframeRef.current);
            }
        };
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "mb-12 w-full max-w-6xl px-4",
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            title && /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold mb-2 text-primary`,
                children: title
            }),
            subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-lg font-semibold mb-6 text-secondary",
                children: subtitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "relative",
                style: {
                    paddingTop: "56.25%" /* 16:9 Aspect Ratio */ 
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.iframe, {
                    ref: iframeRef,
                    src: embedUrl,
                    title: title,
                    className: "absolute top-0 left-0 w-full h-full rounded-lg shadow-lg",
                    allowFullScreen: true,
                    initial: {
                        scale: 0.95
                    },
                    whileHover: {
                        scale: 1
                    },
                    transition: {
                        duration: 0.3
                    }
                })
            })
        ]
    });
};
/* harmony default export */ const sections_VideoSection = (VideoSection);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/TableSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/TableSection.tsx




const TableSection = ({ title, subtitle, level, headers, rows })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "mb-12 w-full max-w-6xl px-4",
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            title && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center mb-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(fa/* FaTable */.WHV, {
                        className: "text-primary mr-2"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                        className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold mb-2 text-primary`,
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-base font-semibold mb-6 text-secondary",
                children: subtitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "overflow-x-auto",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                    className: "min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("thead", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                children: headers.map((header, index)=>/*#__PURE__*/ jsx_runtime_.jsx("th", {
                                        className: "py-3 px-6 bg-primary text-left text-sm font-semibold text-white uppercase",
                                        children: header
                                    }, index))
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                            children: rows.map((row, rowIndex)=>/*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                    className: "border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200",
                                    children: row.map((cell, cellIndex)=>/*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "py-4 px-6 text-sm text-gray-700 dark:text-gray-300",
                                            children: cell
                                        }, cellIndex))
                                }, rowIndex))
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const sections_TableSection = (TableSection);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/NewsSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/NewsSection.tsx



const NewsSection = ({ title, subtitle, level, newsItems, sectionHeight = "h-auto" })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: `mb-12 w-full max-w-6xl px-4 ${sectionHeight}`,
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            title && /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold mb-2 text-primary underline`,
                children: title
            }),
            subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-lg font-semibold mb-6 text-secondary",
                children: subtitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "space-y-6",
                children: newsItems.map((news, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.div, {
                        className: "w-full",
                        initial: {
                            opacity: 0,
                            x: -50
                        },
                        whileInView: {
                            opacity: 1,
                            x: 0
                        },
                        viewport: {
                            once: true
                        },
                        transition: {
                            duration: 0.3,
                            delay: index * 0.1
                        },
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                className: "text-lg font-semibold mb-2 text-secondary",
                                children: news.title
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("iframe", {
                                src: news.url,
                                title: `News Article ${index + 1}`,
                                className: "w-full h-64 border rounded-badge",
                                sandbox: "allow-same-origin allow-scripts allow-popups allow-forms"
                            })
                        ]
                    }, index))
            })
        ]
    });
};
/* harmony default export */ const sections_NewsSection = (NewsSection);

// EXTERNAL MODULE: ./node_modules/recharts/lib/index.js
var recharts_lib = __webpack_require__(48472);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/ChartSection.tsx
// src/app/report/[artist_eng]/micro/components/sections/ChartSection.tsx





const ChartSection = ({ title, subtitle, level, data, notation })=>{
    const getTitleTag = (level)=>{
        switch(level){
            case 1:
                return "h2";
            case 2:
                return "h3";
            case 3:
                return "h4";
            default:
                return "h2";
        }
    };
    const TitleTag = getTitleTag(level);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.section, {
        className: "mb-12 w-full max-w-6xl px-4",
        initial: {
            opacity: 0,
            y: 50
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            title && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center mb-2",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(fa/* FaChartLine */.Op, {
                        className: "text-primary mr-2"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(TitleTag, {
                        className: `text-${level === 1 ? "4xl" : level === 2 ? "3xl" : "2xl"} font-bold text-primary`,
                        children: title
                    })
                ]
            }),
            subtitle && /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-base font-semibold mb-6 text-secondary",
                children: subtitle
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* ResponsiveContainer */.h2, {
                width: "100%",
                height: 400,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(recharts_lib/* LineChart */.wW, {
                    data: data,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* CartesianGrid */.q3, {
                            strokeDasharray: "3 3"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* XAxis */.Kc, {
                            dataKey: "name"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* YAxis */.B2, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* Tooltip */.u, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* Legend */.De, {
                            formatter: ()=>notation
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(recharts_lib/* Line */.x1, {
                            type: "monotone",
                            dataKey: "score",
                            stroke: "#8884d8",
                            activeDot: {
                                r: 8
                            }
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const sections_ChartSection = (ChartSection);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/sections/Divider.tsx
// src/app/report/[artist_eng]/micro/components/sections/Divider.tsx




const Divider = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(proxy/* motion */.E.div, {
        className: "flex items-center my-8 w-full max-w-6xl px-4",
        initial: {
            opacity: 0
        },
        whileInView: {
            opacity: 1
        },
        viewport: {
            once: true
        },
        transition: {
            duration: 0.6
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "flex-grow border-t-2 border-gray-300 dark:border-gray-700"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(fa/* FaArrowDown */.NWQ, {
                className: "mx-4 text-gray-500 dark:text-gray-400 animate-bounce"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                className: "flex-grow border-t-2 border-gray-300 dark:border-gray-700"
            })
        ]
    });
};
/* harmony default export */ const sections_Divider = (Divider);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/components/DynamicSection.tsx
// src/app/report/[artist_eng]/micro/components/DynamicSection.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 







 // 차트 섹션 임포트
 // 구분선 섹션 임포트
const DynamicSection = ({ section })=>{
    switch(section.type){
        case "text":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_TextSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                content: section.content || ""
            });
        case "hero":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_HeroSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                content: section.content || "",
                backgroundImage: section.backgroundImage || "",
                ctaText: section.ctaText || "",
                ctaLink: section.ctaLink || ""
            });
        case "combined":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_CombinedSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                content: section.content || "",
                photo: section.photos ? section.photos[0] : undefined,
                imageLeft: section.imageLeft !== undefined ? section.imageLeft : true
            });
        case "video":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_VideoSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                videoUrl: section.videoUrl || ""
            });
        case "table":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_TableSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                headers: section.headers || [],
                rows: section.rows || []
            });
        case "news":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_NewsSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                newsItems: section.newsItems || []
            });
        case "chart":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_ChartSection, {
                title: section.title,
                subtitle: section.subtitle,
                level: section.level,
                data: section.data || [],
                notation: section.notation || ""
            });
        case "divider":
            return /*#__PURE__*/ jsx_runtime_.jsx(sections_Divider, {});
        default:
            return null;
    }
};
/* harmony default export */ const components_DynamicSection = (DynamicSection);


/***/ }),

/***/ 23969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ page)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/app/report/[artist_eng]/micro/components/DynamicSection.tsx + 8 modules
var DynamicSection = __webpack_require__(36153);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/test/PastSections.ts
// src/app/report/[artist_eng]/micro/test/PastSections.ts
const pastSections = [
    {
        type: "hero",
        title: "KNK",
        subtitle: "초기 활동 및 성장",
        level: 1,
        content: "",
        backgroundImage: "https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2017/10/11/cINmMOiDiW3E636433128356676691.jpg"
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-1. 2016년 - 데뷔",
        subtitle: "강력한 사전 프로모션",
        level: 2,
        content: `- **강력한 사전 프로모션**
      - 2016년 데뷔 당시, 빌보드에서 ‘유망주’로 소개될 정도로 큰 기대를 모으며 상당히 주목받았다. [빌보드 기사1](https://www.billboard.com/music/music-news/best-k-pop-debuts-2016-7625235/amp) [빌보드 기사2](https://www.billboard.com/music/music-news/k-pop-debuts-2016-best-so-far-7430879/amp)
      - 193cm의 박서함을 중심으로, 큰 신장을 통해 인지도를 확보하려는 모습이 돋보이며 데뷔 전부터 타 아티스트의 뮤직비디오, 드라마 출연 등 팬층 형성에 큰 노력을 기울인다.`,
        photos: [
            "https://i.ytimg.com/vi/vlIAAe4-wak/maxresdefault.jpg"
        ],
        imageLeft: true
    },
    {
        type: "news",
        title: "",
        subtitle: "",
        level: 3,
        newsItems: [
            {
                title: "크나큰, 美 빌보드 선정 '2016년 K팝 신인그룹 TOP10'",
                url: "https://pickcon.co.kr/site/data/html_dir/2016/12/22/2016122201677.html"
            }
        ]
    },
    {
        type: "text",
        title: "무리한 로드맵",
        subtitle: "",
        level: 3,
        content: `- **무리한 로드맵**
      - 데뷔 8개월 만에 EP 3개(총 19곡)를 발매하는 로드맵은 업계 평균과 유사하나 상당히 짧은 기간으로 판단된다. 이는, 사전 프로모션에 사용된 비용을 빠르게 충당하고자 하는 전략으로 해석된다. 결과론적으로, 완성도와 팬덤 확보에 어려움을 겪은 것으로 보인다.`,
        photos: [
            "/images/past3.jpg"
        ],
        imageLeft: false
    },
    {
        type: "table",
        title: "음반 발매 빈도 비교",
        subtitle: "크나큰 vs 비스트 vs 동방신기 vs 엑소 vs 에이티즈",
        level: 3,
        headers: [
            "크나큰",
            "비스트",
            "동방신기",
            "엑소",
            "에이티즈"
        ],
        rows: [
            [
                "8개월",
                "11개월",
                "9개월",
                "1년 4개월",
                "8개월"
            ],
            [
                "19곡",
                "18곡",
                "16곡",
                "23곡",
                "18곡"
            ],
            [
                "EP, 싱글, EP, EP",
                "EP, EP, 싱글, 싱글, EP",
                "싱글, 싱글, 정규",
                "EP, 정규, 리팩",
                "EP, EP, EP"
            ]
        ]
    },
    {
        type: "chart",
        title: "연도별 앨범 발매 횟수",
        subtitle: "",
        level: 3,
        data: [
            {
                name: "2016",
                score: 3
            },
            {
                name: "2017",
                score: 2
            },
            {
                name: "2018",
                score: 1
            },
            {
                name: "2019",
                score: 2
            },
            {
                name: "2020",
                score: 1
            }
        ],
        notation: "Albums"
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "레퍼런스 아티스트와의 유사성",
        subtitle: "",
        level: 2,
        content: `- **레퍼런스 아티스트와의 유사성**
      - 비스트와 동방신기의 음악적, 비주얼적 유사성이 과도하게 드러났다는 점이 지적된다. 데뷔 당시부터 비스트의 작곡가와 함께 작업하며 비스트의 음악적 스타일을 차용한 부분이 두드러졌고, 기존 비스트 팬덤 또한 부정적인 반응을 확인할 수 있다. 이러한 대중의 반응은 기존 팬덤의 반감과 유입된 신규 팬층에게 보수적인 반응을 야기할 수 있다는 점에서 부정적으로 해석된다.`,
        photos: [
            "https://i.namu.wiki/i/8Rvyye_7cg_u6zNOEoZvo4LxMkU5BXdmcqo3uwoD17-xTi00jDo3c3GALlSC3HhG5Vz54E5FyergVAdzvlKaGQ.webp"
        ],
        imageLeft: true
    },
    {
        type: "combined",
        title: "성과를 보인 전략",
        subtitle: "",
        level: 2,
        content: `- **성과를 보인 전략**
      - 그럼에도 불구하고, ‘크나큰’이 현재까지 발매했던 앨범 중 가장 팬덤 참여도가 높았던 앨범은 <AWAKE>이다.
      - 위의 언급한 프로모션과 로드맵 그리고 멤버들의 큰 키를 활용한 수트핏의 이미지 전략을 통해 팬덤 확보에 어느 정도 성공했다고 볼 수 있다.`,
        photos: [
            "https://i.ytimg.com/vi/uGArVVM1zVM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAcYIfRkCz2oiZINmUFy2w5fI9CTQ"
        ],
        imageLeft: false
    },
    {
        type: "chart",
        title: "앨범 상호작용 점수",
        subtitle: "크나큰 앨범 상호작용 점수",
        level: 3,
        data: [
            {
                name: "KNOCK",
                score: 67.84
            },
            {
                name: "요즘 넌 어때",
                score: 46.81
            },
            {
                name: "AWAKE",
                score: 97.05
            },
            {
                name: "REMAIN",
                score: 71.77
            },
            {
                name: "GRAVITY",
                score: 52.05
            },
            {
                name: "GRAVITY, Completed",
                score: 63.20
            },
            {
                name: "한 끗 차이",
                score: 31.81
            },
            {
                name: "LONELY NIGHT",
                score: 51.02
            },
            {
                name: "KNK S/S COLLECTION",
                score: 56.60
            },
            {
                name: "KNK AIRLINE",
                score: 53.26
            }
        ],
        notation: "Interaction Score"
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-2. 2017년 - 스퍼트",
        subtitle: "",
        level: 2,
        content: "",
        photos: [
            "https://i.namu.wiki/i/6Ve-5dV1SQzi7fYakfB0UtMpviEsyT4cfHbQ4ebQYhSmaBoV9oVSjHrwDYQZFKtLKn_EYHwyFQjNfRS-7Ti3EQ.webp"
        ],
        imageLeft: true
    },
    {
        type: "combined",
        title: "여전한 레퍼런스와의 유사성",
        subtitle: "",
        level: 3,
        content: `- **여전한 레퍼런스와의 유사성**
      - 2017년 활동은 이전보다 더욱 비스트의 음악과 유사해지는 경향을 보였다. 다만, 뮤직비디오 연출 면에서는 다양한 로케이션과 현대적인 감각을 더하였고, 이로 인해 <해, 달, 별> 뮤직비디오는 완성도 있는 작품으로 평가받고 있다.`,
        photos: [
            "https://i.makeagif.com/media/10-28-2024/Y2dSar.gif"
        ],
        imageLeft: false
    },
    {
        type: "video",
        title: "",
        subtitle: "크나큰 (KNK) - 해, 달, 별 (Sun, Moon, Star) MV",
        level: 3,
        videoUrl: "https://youtu.be/VtqT-rRQj2A"
    },
    {
        type: "combined",
        title: "믹스나인",
        subtitle: "",
        level: 3,
        content: `- **믹스나인**
      - 서바이벌 프로그램 *믹스나인* 출연을 통해 대중에게 인지도를 높이려는 시도를 하였고, 해당 프로그램을 통해 유입된 팬층도 확인할 수 있다. 다만, 프로그램 내부적 문제와 멤버들의 아쉬운 탈락으로 기대만큼 큰 성과를 얻지는 못했다.`,
        photos: [
            "https://pbs.twimg.com/media/DSXQW8gX4AAncey.jpg"
        ],
        imageLeft: true
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-3. 2018년 - 시련의 시기",
        subtitle: "",
        level: 2,
        content: "",
        photos: [
            "https://i.namu.wiki/i/qEHBIDetUxBBr2bVrWAVgtV00ZB9KDJQR472jR_XP-zjWJCG5dlnyCP3Qos0eiG_zQ460YqSUGFFypuyVMD7qQ.webp"
        ],
        imageLeft: false
    },
    {
        type: "text",
        title: "활동 종료",
        subtitle: "",
        level: 3,
        content: `- **활동 종료**
      - <Gravity, Completed> 활동 이후 하락세를 겪었고, 메인보컬 김유진의 탈퇴는 더욱 어려운 상황을 초래했다. 또한, 소속사 YNB엔터테인먼트가 폐업 절차를 밟으며 사실상 활동이 종료되었다.
      - YNB엔터테인먼트의 폐업 이후, 한대진 이사가 새롭게 설립한 220엔터테인먼트와 함께하게 되었다.`,
        photos: [
            "/images/past10.jpg"
        ],
        imageLeft: true
    },
    {
        type: "news",
        title: "",
        subtitle: "",
        level: 3,
        newsItems: [
            {
                title: '그룹 크나큰, 소속사와 전속 해지…"김유진은 탈퇴"',
                url: "https://www.yna.co.kr/view/AKR20180910044100005"
            }
        ]
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-4. 2019년 - 패기로운 재도약",
        subtitle: "",
        level: 2,
        content: "",
        photos: [
            "/images/past11.jpg"
        ],
        imageLeft: false
    },
    {
        type: "combined",
        title: "발전된 기획력",
        subtitle: "",
        level: 3,
        content: `- **발전된 기획력**
      - 이동원의 영입과 함께 과거보다 나아진 기획력을 바탕으로 <LONELY NIGHT>과 <KNK S/S COLLECTION>을 발매하며 진보된 음악적 스타일로 다양성을 추구하였다. 특히, 기존에 함께했던 작곡가에서 벗어나 동시대 아티스트인 SF9과 워너원을 레퍼런스로 기획된 점이 인상적이며, 이는 새로운 방향성을 찾는 데에 성공한 것으로 판단된다.`,
        photos: [
            "/images/past12.jpg"
        ],
        imageLeft: true
    },
    {
        type: "combined",
        title: "해외 팬덤 활용",
        subtitle: "",
        level: 3,
        content: `- **해외 팬덤 활용**
      - 기존에 확보한 해외 팬덤을 통해 아시아, 북미, 유럽 투어를 통해 두터운 글로벌 팬층을 확보하는 데 성공했다. <KNK S/S COLLECTION>은 발매한 앨범 중 스포티파이 인기도 1위를 기록하며 해외 팬덤을 타겟으로 한 기획 및 전략의 효용성을 입증했다고 볼 수 있다.
      - 다만, 대한민국에서는 2018 ~ 2019년도 사재기 논란으로 앨범의 정량적 가치가 훼손되었다는 부분이 아쉬움을 자아낸다.`,
        photos: [
            "/images/past13.jpg"
        ],
        imageLeft: false
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-5. 2020년 - 코로나 팬데믹",
        subtitle: "",
        level: 2,
        content: "",
        photos: [
            "/images/past14.jpg"
        ],
        imageLeft: true
    },
    {
        type: "combined",
        title: "인상적인 완성도",
        subtitle: "",
        level: 3,
        content: `- **인상적인 완성도**
      - 스케일 확장과 포멀한 파일럿 제복을 활용한 <KNK AIRLINE>은 초동 커리어하이를 달성하며 음악적 완성도와 비주얼 측면에서 성장한 모습을 보였다. 특히, 타이틀 곡인 <RIDE>는 <KNOCK>, <BACK AGAIN>을 이어 누적 조회수 3위를 기록했다. 앞서 언급한 2곡에 투입한 사전 프로모션 비용을 생각하면 <RIDE>는 성공적인 성과를 거두었다고 볼 수 있다.`,
        photos: [
            "/images/past15.jpg"
        ],
        imageLeft: false
    },
    {
        type: "combined",
        title: "악재 중 악재",
        subtitle: "",
        level: 3,
        content: `- **악재 중 악재**
      - 2020년은 전 세계적으로 코로나 팬데믹의 영향을 받으면서 크나큰 역시 활동에 커다란 제약을 받았다. 온라인 팬콘서트 ‘바닐라 스테이지’, ‘온라인 라이브’ 등을 개최하였으나 실질적인 영리 활동인 오프라인 콘서트나 팬미팅 등에서 제약을 받게 되었다. 따라서 2019년, 2020년에 발매한 앨범을 통해 유의미한 수익 회수를 할 수 없게 되었고 추후 활동이 불가능한 수준으로 치닫게 되었다.`,
        photos: [
            "/images/past16.jpg"
        ],
        imageLeft: true
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    },
    {
        type: "combined",
        title: "1-6. 결론",
        subtitle: "",
        level: 2,
        content: `- **결론**
      - 2016년 데뷔 이후 꾸준한 전략적 시도를 통해 성장해 왔으나, 초기에 무리한 기획과 레퍼런스 아티스트와의 과도한 유사성으로 크나큰만의 독자적인 색깔을 확보하는 데 시간이 필요했다.
      - 이후 해외 투어를 통한 글로벌 팬덤 확장과 음악적 다양성 추구를 통해 발전하였으나 코로나 팬데믹으로 인해 활동을 이어가지 못했다.`,
        photos: [
            "/images/past17.jpg"
        ],
        imageLeft: false
    },
    {
        type: "divider",
        title: "",
        subtitle: "",
        level: 0
    }
];
/* harmony default export */ const PastSections = (pastSections);

// EXTERNAL MODULE: ./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs + 187 modules
var proxy = __webpack_require__(88099);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/Past.tsx
// src/app/report/[artist_eng]/micro/Past.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




const Past = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(proxy/* motion */.E.div, {
        className: "flex flex-col items-center w-full",
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: 1
        },
        children: Array.isArray(PastSections) ? PastSections.map((section, index)=>/*#__PURE__*/ jsx_runtime_.jsx(DynamicSection/* default */.Z, {
                section: section
            }, index)) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
            className: "text-red-500",
            children: "과거 섹션 데이터를 불러오는 데 실패했습니다."
        })
    });
};
/* harmony default export */ const micro_Past = (Past);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/micro/page.tsx
// src/app/report/[artist_eng]/micro/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const Micro = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: " dark:bg-gray-900 min-h-screen relative",
        children: /*#__PURE__*/ jsx_runtime_.jsx(micro_Past, {})
    });
};
/* harmony default export */ const page = (Micro);


/***/ })

};
;