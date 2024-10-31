"use strict";
exports.id = 116;
exports.ids = [116];
exports.modules = {

/***/ 43116:
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
// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/index.mjs + 2 modules
var dist = __webpack_require__(29904);
// EXTERNAL MODULE: ./src/firebase.ts
var firebase = __webpack_require__(8788);
;// CONCATENATED MODULE: ./src/utils/fetchCircleCharts.ts


const fixAlbumImgUrl = (url)=>{
    if (url.startsWith("https://circlechart.kr/uploadDir/")) return url;
    const split_url = url.split("thumb/");
    return `https://circlechart.kr/uploadDir/albumImg/thumb/${split_url[1]}`;
};
const fetchCircleChartsData = async (target)=>{
    const circleChartsCollection = (0,dist/* collection */.hJ)(firebase.db, "CircleCharts");
    const q = (0,dist/* query */.IO)(circleChartsCollection, (0,dist/* where */.ar)("target", "==", target));
    const querySnapshot = await (0,dist/* getDocs */.PL)(q);
    const doc = querySnapshot.docs[0];
    if (!doc) return null;
    const docData = doc.data();
    return {
        id: doc.id,
        target: docData.target,
        timestamp: docData.timestamp,
        global_chart: docData.global.map((album)=>({
                album: album.album,
                album_img: fixAlbumImgUrl(album.album_img),
                artist: album.artist,
                distribution: album.distribution,
                melon_album_id: album.melon_album_id,
                melon_album_url: album.melon_album_url,
                production: album.production,
                rank: album.rank,
                rank_status: album.rank_status,
                seq_mom: album.seq_mom,
                title: album.title
            })),
        streaming_chart: docData.streaming.map((album)=>({
                album: album.album,
                album_img: fixAlbumImgUrl(album.album_img),
                artist: album.artist,
                distribution: album.distribution,
                melon_album_id: album.melon_album_id,
                melon_album_url: album.melon_album_url,
                production: album.production,
                rank: album.rank,
                rank_status: album.rank_status,
                seq_mom: album.seq_mom,
                title: album.title
            })),
        retail_chart: docData.retail.map((album)=>({
                album: album.album,
                album_img: fixAlbumImgUrl(album.album_img),
                artist: album.artist,
                distribution: album.distribution,
                melon_album_id: album.melon_album_id,
                melon_album_url: album.melon_album_url,
                production: album.production,
                rank: album.rank,
                rank_status: album.rank_status,
                seq_mom: album.seq_mom,
                title: album.title
            }))
    };
};

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/meso/CircleCharts.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

const CircleCharts = ({ target, global, streaming, retail })=>{
    const [selectedAlbum, setSelectedAlbum] = (0,react_.useState)(null);
    const handleAlbumClick = (album)=>{
        setSelectedAlbum(album);
    };
    const renderArtists = (artists)=>{
        return Array.isArray(artists) ? artists.join(", ") : artists;
    };
    const renderChart = (chart, chartTitle, bgColor, isRetail = false)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "w-full lg:w-1/3 px-4",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "mb-4",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                        className: `text-lg font-semibold ${bgColor} p-2 rounded-md text-white text-center`,
                        children: chartTitle
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "max-h-80 overflow-y-auto",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("table", {
                        className: "w-full table-fixed",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                            children: chart.sort((a, b)=>a.rank - b.rank).slice(0, 100).map((album, index)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                    className: "cursor-pointer hover:bg-gray-200 transition-colors duration-200",
                                    onClick: ()=>handleAlbumClick(album),
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-1 py-2 w-8 text-center",
                                            children: album.rank
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-1 py-2 w-16",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                src: album.album_img,
                                                alt: album.album,
                                                className: "w-10 h-10 object-cover rounded-md"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-1 py-2 truncate",
                                            children: isRetail ? album.album : album.title
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            className: "px-1 py-2 text-xs text-gray-500 truncate",
                                            children: renderArtists(album.artist)
                                        })
                                    ]
                                }, index))
                        })
                    })
                })
            ]
        });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: "text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center",
                children: "Circle Charts Data"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "text-sm text-gray-500 dark:text-gray-400 mb-6 text-center",
                children: [
                    "※ 써클차트 데이터 (",
                    target.slice(0, 4),
                    ".",
                    target.slice(4),
                    ")"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-1",
                children: [
                    renderChart(global, "Global Chart", "bg-gray-800"),
                    renderChart(streaming, "Streaming Chart", "bg-blue-500"),
                    renderChart(retail, "Retail Chart", "bg-green-500", true)
                ]
            }),
            selectedAlbum && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300",
                onClick: ()=>setSelectedAlbum(null),
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl p-8 w-96 relative transform transition-transform duration-300 scale-105 hover:scale-100",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            className: "absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200",
                            onClick: ()=>setSelectedAlbum(null),
                            children: "✕"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "text-center mb-6",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-sm text-gray-500 dark:text-gray-400 mb-2",
                                    children: [
                                        "Rank: ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-bold",
                                            children: selectedAlbum.rank
                                        }),
                                        " (",
                                        selectedAlbum.rank_status,
                                        ")"
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: selectedAlbum.album_img,
                                    alt: selectedAlbum.album,
                                    className: "w-32 h-32 object-cover rounded-lg mx-auto shadow-md transform transition-transform duration-300 hover:scale-105"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                            className: "text-2xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100",
                            children: selectedAlbum.title
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex flex-col items-center text-gray-700 dark:text-gray-300 space-y-2",
                            children: [
                                selectedAlbum.album && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-sm",
                                    children: [
                                        "Album: ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-semibold",
                                            children: selectedAlbum.album
                                        })
                                    ]
                                }),
                                selectedAlbum.artist && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-sm",
                                    children: [
                                        "Artists: ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-semibold",
                                            children: renderArtists(selectedAlbum.artist)
                                        })
                                    ]
                                }),
                                selectedAlbum.production && selectedAlbum.production.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-sm",
                                    children: [
                                        "Production: ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-semibold",
                                            children: selectedAlbum.production.join(", ")
                                        })
                                    ]
                                }),
                                selectedAlbum.distribution && selectedAlbum.distribution.length > 0 && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                    className: "text-sm",
                                    children: [
                                        "Distribution: ",
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "font-semibold",
                                            children: selectedAlbum.distribution.join(", ")
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const meso_CircleCharts = (CircleCharts);

;// CONCATENATED MODULE: ./src/utils/fetchSongs.ts


const fetchSongsData_ArtistID = async (artistId)=>{
    const songsCollection = (0,dist/* collection */.hJ)(firebase.db, "songs");
    const q = (0,dist/* query */.IO)(songsCollection, (0,dist/* where */.ar)("artist_id", "==", artistId));
    const querySnapshot = await (0,dist/* getDocs */.PL)(q);
    return querySnapshot.docs.map((doc)=>{
        const data = doc.data();
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp
        };
    });
};
const fetchSongsData_SongID = async (songId)=>{
    const songsCollection = collection(db, "songs");
    const q = query(songsCollection, where("song_id", "==", songId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc)=>{
        const data = doc.data();
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp
        };
    });
};
const fetchSongsData_AlbumID = async (albumId)=>{
    const songsCollection = (0,dist/* collection */.hJ)(firebase.db, "songs");
    const q = (0,dist/* query */.IO)(songsCollection, (0,dist/* where */.ar)("album_id", "==", albumId));
    const querySnapshot = await (0,dist/* getDocs */.PL)(q);
    return querySnapshot.docs.map((doc)=>{
        const data = doc.data();
        return {
            album: data.album,
            album_id: data.album_id,
            album_title: data.album_title,
            artist_id: data.artist_id,
            artist_name: data.artist_name,
            creators: data.creators,
            flac_info: data.flac_info,
            genre: data.genre,
            hearts: data.hearts,
            listeners: data.listeners,
            lyrics: data.lyrics,
            related_videos: data.related_videos,
            release_date: data.release_date,
            released_date: data.released_date,
            song_id: data.song_id,
            song_title: data.song_title,
            spotify_album_image_url: data.spotify_album_image_url,
            spotify_album_name: data.spotify_album_name,
            spotify_album_release_date: data.spotify_album_release_date,
            spotify_album_total_tracks: data.spotify_album_total_tracks,
            spotify_album_url: data.spotify_album_url,
            spotify_artists: data.spotify_artists,
            spotify_audio_features: data.spotify_audio_features,
            spotify_id: data.spotify_id,
            spotify_isrc: data.spotify_isrc,
            spotify_popularity: data.spotify_popularity,
            spotify_preview_url: data.spotify_preview_url,
            spotify_track_duration_ms: data.spotify_track_duration_ms,
            spotify_track_name: data.spotify_track_name,
            spotify_track_number: data.spotify_track_number,
            spotify_track_url: data.spotify_track_url,
            streams: data.streams,
            timestamp: data.timestamp
        };
    });
};

// EXTERNAL MODULE: ./node_modules/d3/src/index.js + 159 modules
var src = __webpack_require__(18707);
;// CONCATENATED MODULE: ./src/components/meso/AudioFeaturesRadarChart.tsx
// src/components/meso/AudioFeaturesRadarChart.tsx



const AudioFeaturesRadarChart = ({ data, features, width, height })=>{
    const svgRef = (0,react_.useRef)(null);
    const translateFeature = (feature)=>{
        const translations = {
            acousticness: "자연음향",
            danceability: "리듬감",
            energy: "강렬함",
            liveness: "현장감",
            speechiness: "음성비중",
            valence: "감성적온도"
        };
        return translations[feature] || feature;
    };
    (0,react_.useEffect)(()=>{
        if (!data || data.length === 0) return;
        // Clear previous SVG content
        src/* select */.Ys(svgRef.current).selectAll("*").remove();
        // Set up dimensions and margins
        const margin = {
            top: 50,
            right: 100,
            bottom: 50,
            left: 100
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;
        const svg = src/* select */.Ys(svgRef.current).attr("width", width).attr("height", height);
        const g = svg.append("g").attr("transform", `translate(${margin.left + innerWidth / 2},${margin.top + innerHeight / 2})`);
        const angleSlice = 2 * Math.PI / features.length;
        // Scale for the radius
        const rScale = src/* scaleLinear */.BYU().domain([
            0,
            1
        ]) // Assuming features are normalized between 0 and 1
        .range([
            0,
            radius
        ]);
        // Draw grid circles
        const translatedFeatures = features.map((feature)=>translateFeature(feature));
        const levels = 5;
        for(let level = 1; level <= levels; level++){
            const levelFactor = radius / levels * level;
            g.selectAll(".levels").data(translatedFeatures).enter().append("line").attr("x1", (d, i)=>levelFactor * Math.cos(angleSlice * i - Math.PI / 2)).attr("y1", (d, i)=>levelFactor * Math.sin(angleSlice * i - Math.PI / 2)).attr("x2", (d, i)=>levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2)).attr("y2", (d, i)=>levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2)).attr("class", "line").style("stroke", "gray").style("stroke-opacity", "0.75").style("stroke-width", "0.3px").attr("transform", `rotate(0)`);
        }
        // Draw axis lines
        const axis = g.selectAll(".axis").data(translatedFeatures).enter().append("g").attr("class", "axis");
        axis.append("line").attr("x1", 0).attr("y1", 0).attr("x2", (d, i)=>rScale(1.1) * Math.cos(angleSlice * i - Math.PI / 2)).attr("y2", (d, i)=>rScale(1.1) * Math.sin(angleSlice * i - Math.PI / 2)).attr("class", "line").style("stroke", "gray").style("stroke-width", "1px");
        // Add labels
        axis.append("text").attr("x", (d, i)=>rScale(1.25) * Math.cos(angleSlice * i - Math.PI / 2)).attr("y", (d, i)=>rScale(1.25) * Math.sin(angleSlice * i - Math.PI / 2)).attr("class", "legend").style("font-size", "12px").attr("text-anchor", "middle").attr("dy", "0.35em").text((d)=>d.charAt(0).toUpperCase() + d.slice(1));
        // Line generator
        const radarLine = src/* line */.jvg().x((d)=>rScale(d.value) * Math.cos(angleSlice * d.index - Math.PI / 2)).y((d)=>rScale(d.value) * Math.sin(angleSlice * d.index - Math.PI / 2)).curve(src/* curveLinearClosed */.fxm);
        // Draw the radar areas
        data.forEach((series, idx)=>{
            const points = features.map((feature, i)=>({
                    value: series.values[feature],
                    index: i
                }));
            g.append("path").datum(points).attr("d", radarLine).style("stroke-width", "2px").style("stroke", idx === 0 ? "#ff7300" : "#8884d8").style("fill", idx === 0 ? "#ff7300" : "#8884d8").style("fill-opacity", 0.1).on("mouseover", function() {
                src/* select */.Ys(this).style("fill-opacity", 0.3);
            }).on("mouseout", function() {
                src/* select */.Ys(this).style("fill-opacity", 0.1);
            });
        });
        // Add legend
        const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20}, ${margin.top})`);
        data.forEach((series, idx)=>{
            const legendRow = legend.append("g").attr("transform", `translate(0, ${idx * 20})`);
            legendRow.append("rect").attr("width", 10).attr("height", 10).attr("fill", idx === 0 ? "#ff7300" : "#8884d8");
            legendRow.append("text").attr("x", 15).attr("y", 10).attr("text-anchor", "start").style("font-size", "12px").text(series.label);
        });
    }, [
        data,
        features,
        width,
        height
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "w-full overflow-x-auto",
        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
            ref: svgRef
        })
    });
};
/* harmony default export */ const meso_AudioFeaturesRadarChart = (AudioFeaturesRadarChart);

// EXTERNAL MODULE: ./src/components/Spinner.tsx
var Spinner = __webpack_require__(57040);
// EXTERNAL MODULE: ./src/components/ErrorMessage.tsx
var ErrorMessage = __webpack_require__(8915);
;// CONCATENATED MODULE: ./src/components/meso/AudioFeaturesScatterPlot.tsx
// AudioFeaturesScatterPlot.tsx



const features = [
    "acousticness",
    "danceability",
    "energy",
    "liveness",
    "speechiness",
    "valence"
];
const AudioFeaturesScatterPlot = ({ data, yKey, width, height })=>{
    const svgRef = (0,react_.useRef)(null);
    const [selectedFeature, setSelectedFeature] = (0,react_.useState)("energy");
    const autoCycleInterval = 10000; // 10초
    // 타이머를 관리하는 ref
    const timerRef = (0,react_.useRef)(null);
    // 자동으로 특징을 전환하는 함수
    const startAutoCycle = (0,react_.useCallback)(()=>{
        timerRef.current = setInterval(()=>{
            setSelectedFeature((prevFeature)=>{
                const currentIndex = features.indexOf(prevFeature);
                const nextIndex = (currentIndex + 1) % features.length;
                return features[nextIndex];
            });
        }, autoCycleInterval);
    }, []);
    // 자동 전환 시작
    (0,react_.useEffect)(()=>{
        startAutoCycle();
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [
        startAutoCycle
    ]);
    // 사용자가 선택했을 때 타이머를 리셋
    const handleFeatureSelect = (feature)=>{
        setSelectedFeature(feature);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        startAutoCycle();
    };
    (0,react_.useEffect)(()=>{
        if (!data || data.length === 0) return;
        // 스트리밍 횟수에 로그 변환을 적용 (log10)
        const transformedData = data.map((d)=>({
                ...d,
                log_streaming_count: d.streaming_count > 0 ? Math.log10(d.streaming_count) : 0
            }));
        // 정규화된 스트리밍 횟수를 추가
        const maxLogStreaming = src/* max */.Fp7(transformedData, (d)=>d.log_streaming_count) || 1;
        const minLogStreaming = src/* min */.VV$(transformedData, (d)=>d.log_streaming_count) || 0;
        const normalizedData = transformedData.map((d)=>({
                ...d,
                normalized_streaming_count: (d.log_streaming_count - minLogStreaming) / (maxLogStreaming - minLogStreaming)
            }));
        // Clear previous SVG content
        const svg = src/* select */.Ys(svgRef.current).attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");
        svg.selectAll("*").remove();
        // Set up dimensions and margins
        const margin = {
            top: 20,
            right: 70,
            bottom: 20,
            left: 70
        };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        // Append group element
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
        // X scale
        const xScale = src/* scaleLinear */.BYU().domain([
            0,
            src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature]) * 1.1
        ]).range([
            0,
            innerWidth
        ]);
        // Y scale using Min-Max 정규화
        const yScale = src/* scaleLinear */.BYU().domain([
            0,
            1
        ]) // 정규화된 스트리밍 횟수는 0에서 1 사이
        .range([
            innerHeight,
            0
        ]);
        // Color scale
        const color = src/* scaleSequential */.cJy(src/* interpolateBlues */.sY$).domain([
            0,
            src/* max */.Fp7(normalizedData, (d)=>d.normalized_streaming_count)
        ]);
        // Opacity scale based on streaming_count
        const opacityScale = src/* scaleLinear */.BYU().domain([
            src/* min */.VV$(normalizedData, (d)=>d.normalized_streaming_count) || 0,
            src/* max */.Fp7(normalizedData, (d)=>d.normalized_streaming_count) || 1
        ]).range([
            0.2,
            0.7
        ]);
        // Create axes
        const xAxis = src/* axisBottom */.LLu(xScale).ticks(6).tickSizeOuter(0);
        const yAxis = src/* axisLeft */.y4O(yScale).ticks(6).tickSizeOuter(0).tickFormat(src/* format */.WUZ(".0%")); // 퍼센트 형식
        // Append X axis with label
        const xAxisG = g.append("g").attr("transform", `translate(0, ${innerHeight})`).call(xAxis);
        xAxisG.append("text").attr("x", innerWidth / 2).attr("y", 35) // y 위치 조정
        .attr("fill", "currentColor").attr("text-anchor", "middle").attr("font-size", "12px").text(`${translateFeature(selectedFeature)}`);
        // Append Y axis with label
        const yAxisG = g.append("g").call(yAxis);
        yAxisG.append("text").attr("transform", "rotate(-90)").attr("x", -innerHeight / 2).attr("y", -50) // y 위치 조정
        .attr("fill", "currentColor").attr("text-anchor", "middle").attr("font-size", "12px").text("스트리밍 횟수 (정규화)");
        // Add tooltip
        const tooltip = src/* select */.Ys("body").append("div").attr("class", "tooltip") // CSS 클래스명 변경
        .style("position", "absolute").style("background", "white").style("border", "1px solid #ccc").style("border-radius", "4px").style("padding", "8px").style("pointer-events", "none").style("opacity", 0).style("box-shadow", "0px 0px 10px rgba(0,0,0,0.1)");
        // Draw circles with transitions
        const circles = g.selectAll("circle").data(normalizedData).enter().append("circle").attr("cx", (d)=>xScale(d[selectedFeature])).attr("cy", (d)=>yScale(d.normalized_streaming_count)).attr("r", 0) // 초기 반지름 설정
        .attr("fill", (d)=>src/* interpolateBlues */.sY$(d.normalized_streaming_count)).attr("opacity", (d)=>d.normalized_streaming_count).on("mouseover", (event, d)=>{
            tooltip.style("opacity", 1).html(`
                        ${d.artist} - ${d.song}<br/>
                        ${translateFeature(selectedFeature)}: ${d[selectedFeature].toFixed(2)}<br/>
                        스트리밍 횟수: ${d.streaming_count.toLocaleString()}회
                    `).style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 28}px`);
        }).on("mouseout", ()=>{
            tooltip.style("opacity", 0);
        });
        circles.transition().duration(500) // 트랜지션 지속 시간을 500ms로 단축
        .attr("r", 8); // 반지름을 5로 증가
        // Add regression line with transition
        const lr = linearRegression(normalizedData.map((d)=>d[selectedFeature]), normalizedData.map((d)=>d.normalized_streaming_count));
        const lineData = [
            {
                x: src/* min */.VV$(normalizedData, (d)=>d[selectedFeature]),
                y: lr.intercept + lr.slope * src/* min */.VV$(normalizedData, (d)=>d[selectedFeature])
            },
            {
                x: src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature]),
                y: lr.intercept + lr.slope * src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature])
            }
        ];
        const line = src/* line */.jvg().x((d)=>xScale(d.x)).y((d)=>yScale(d.y));
        // Append regression line initially
        g.append("path").datum(lineData).attr("class", "regression-line") // 클래스 추가
        .attr("d", line).style("stroke", "#7c848e").style("stroke-width", "1px").style("fill", "none").attr("stroke-dasharray", "5,5") // 초기 대시 배열
        .transition().duration(1000).style("stroke-width", "3px").attr("stroke-dasharray", null); // 대시 배열 제거하여 실선으로 변경
        // Display correlation coefficient with transition
        const correlation = calculatePearsonCorrelation(normalizedData.map((d)=>d[selectedFeature]), normalizedData.map((d)=>d.normalized_streaming_count));
        g.append("text").enter().attr("class", "correlation-text") // 클래스 추가
        .attr("x", innerWidth - 10).attr("y", innerHeight - 10).attr("text-anchor", "end").attr("fill", "black").attr("font-size", "8px").text(`상관계수: ${correlation.toFixed(2)}`).style("opacity", 0).transition().duration(1000).style("opacity", 1);
        // Update elements on feature change with transitions
        // Update scales
        xScale.domain([
            0,
            src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature]) * 1.1
        ]);
        // yScale는 이미 0~1로 고정되어 있으므로 변경하지 않음
        // Update axes with transitions
        xAxisG.transition().duration(1000).call(xAxis);
        yAxisG.transition().duration(1000).call(yAxis);
        // Update X axis label with transition
        xAxisG.select("text").transition().duration(1000).text(`${translateFeature(selectedFeature)}`);
        // Update color and opacity scales
        color.domain([
            0,
            src/* max */.Fp7(normalizedData, (d)=>d.streaming_count)
        ]);
        opacityScale.domain([
            minLogStreaming,
            maxLogStreaming
        ]);
        // Update circles
        g.selectAll("circle").data(normalizedData).transition().duration(800) // 트랜지션 지속 시간을 300ms로 단축
        .attr("cx", (d)=>xScale(d[selectedFeature])).attr("cy", (d)=>yScale(d.normalized_streaming_count)).attr("fill", (d)=>src/* interpolateBlues */.sY$(d.normalized_streaming_count)).attr("opacity", (d)=>d.normalized_streaming_count).attr("r", 6); // 반지름을 10으로 설정
        // Update regression line
        const updatedLR = linearRegression(normalizedData.map((d)=>d[selectedFeature]), normalizedData.map((d)=>d.normalized_streaming_count));
        const updatedLineData = [
            {
                x: src/* min */.VV$(normalizedData, (d)=>d[selectedFeature]),
                y: updatedLR.intercept + updatedLR.slope * src/* min */.VV$(normalizedData, (d)=>d[selectedFeature])
            },
            {
                x: src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature]),
                y: updatedLR.intercept + updatedLR.slope * src/* max */.Fp7(normalizedData, (d)=>d[selectedFeature])
            }
        ];
        g.selectAll(".regression-line").datum(updatedLineData).transition().duration(1000).attr("d", line);
        // Update correlation coefficient
        const updatedCorrelation = calculatePearsonCorrelation(normalizedData.map((d)=>d[selectedFeature]), normalizedData.map((d)=>d.normalized_streaming_count));
        console.log("Updated Correlation:", updatedCorrelation);
        g.selectAll(".correlation-text").text(`상관계수: ${updatedCorrelation.toFixed(2)}`);
        // Cleanup tooltip on unmount
        return ()=>{
            tooltip.remove();
        };
    }, [
        data,
        selectedFeature,
        yKey,
        width,
        height
    ]);
    // 선형 회귀 함수
    const linearRegression = (x, y)=>{
        const n = x.length;
        const sum_x = src/* sum */.Smz(x);
        const sum_y = src/* sum */.Smz(y);
        const sum_xy = src/* sum */.Smz(x.map((d, i)=>d * y[i]));
        const sum_xx = src/* sum */.Smz(x.map((d)=>d * d));
        const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        const intercept = (sum_y - slope * sum_x) / n;
        return {
            slope,
            intercept
        };
    };
    // 피어슨 상관계수 계산 함수
    const calculatePearsonCorrelation = (x, y)=>{
        const n = x.length;
        const sum_x = src/* sum */.Smz(x);
        const sum_y = src/* sum */.Smz(y);
        const sum_xy = src/* sum */.Smz(x.map((d, i)=>d * y[i]));
        const sum_xx = src/* sum */.Smz(x.map((d)=>d * d));
        const sum_yy = src/* sum */.Smz(y.map((d)=>d * d));
        const numerator = n * sum_xy - sum_x * sum_y;
        const denominator = Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y));
        return denominator !== 0 ? numerator / denominator : 0;
    };
    // 오디오 특징 한국어 번역 함수
    const translateFeature = (feature)=>{
        const translations = {
            acousticness: "자연음향",
            danceability: "리듬감",
            energy: "강렬함",
            liveness: "현장감",
            speechiness: "음성비중",
            valence: "감성적 온도"
        };
        return translations[feature] || feature;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-full flex flex-col items-center relative",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                ref: svgRef,
                width: width,
                height: height
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex justify-center mt-4 space-x-2",
                children: features.map((feature)=>/*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: ()=>handleFeatureSelect(feature),
                        className: `w-4 h-4 rounded-full border-2 ${selectedFeature === feature ? "bg-gray-500" : "bg-gray-100"} focus:outline-none`,
                        "aria-label": translateFeature(feature)
                    }, feature))
            })
        ]
    });
};
/* harmony default export */ const meso_AudioFeaturesScatterPlot = (AudioFeaturesScatterPlot);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/meso/AudioFeaturesComparison.tsx
// src/components/AudioFeaturesComparison.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






const AudioFeaturesComparison = ({ melon_artist_id, circlechart_data })=>{
    const [targetArtistSongs, setTargetArtistSongs] = (0,react_.useState)([]);
    const [similarGenreSongs, setSimilarGenreSongs] = (0,react_.useState)([]);
    const [features] = (0,react_.useState)([
        "acousticness",
        "danceability",
        "energy",
        "liveness",
        "speechiness",
        "valence"
    ]);
    const [radarData, setRadarData] = (0,react_.useState)([]);
    const [scatterData, setScatterData] = (0,react_.useState)([]);
    const [loading, setLoading] = (0,react_.useState)(true);
    const [error, setError] = (0,react_.useState)(null);
    // Memoize songIds to prevent recalculations unless circlechart_data changes
    const songIds = (0,react_.useMemo)(()=>{
        return [
            ...circlechart_data.global_chart,
            ...circlechart_data.streaming_chart,
            ...circlechart_data.retail_chart
        ].filter((song)=>song.melon_album_id).map((song)=>song.melon_album_id);
    }, [
        circlechart_data
    ]);
    const translateFeature = (feature)=>{
        const translations = {
            acousticness: "자연음향",
            danceability: "리듬감",
            energy: "강렬함",
            liveness: "현장감",
            speechiness: "음성비중",
            valence: "감성적온도"
        };
        return translations[feature] || feature;
    };
    (0,react_.useEffect)(()=>{
        const fetchData = async ()=>{
            try {
                setLoading(true);
                setError(null);
                // 타겟 아티스트 곡 데이터 가져오기
                const targetSongs = await fetchSongsData_ArtistID(melon_artist_id);
                setTargetArtistSongs(targetSongs);
                const targetGenres = new Set();
                targetSongs.forEach((song)=>{
                    song.genre.forEach((g)=>targetGenres.add(g));
                });
                // songIds로 fetchSongs 호출하여 유사 장르 곡 가져오기
                const allSongs = await Promise.all(songIds.map((id)=>fetchSongsData_AlbumID(id)));
                const flatSongs = allSongs.flat(); // 중첩 배열 평탄화
                const filteredSongs = flatSongs.filter((song)=>song.genre.some((genre)=>targetGenres.has(genre)));
                console.log("targetGenres", targetGenres);
                console.log("filteredSongs : ", filteredSongs);
                setSimilarGenreSongs(filteredSongs);
            } catch (err) {
                console.error("데이터를 가져오는 중 오류 발생:", err);
                setError("데이터를 가져오는 중 오류가 발생했습니다.");
            } finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [
        melon_artist_id,
        songIds
    ]);
    // 오디오 특징 평균 계산 함수
    const calculateAverageFeatures = (songs)=>{
        const featureSums = {};
        features.forEach((feature)=>{
            featureSums[feature] = 0;
        });
        songs.forEach((song)=>{
            features.forEach((feature)=>{
                const value = song.spotify_audio_features?.[feature];
                featureSums[feature] += typeof value === "number" ? value : 0;
            });
        });
        const featureAverages = {};
        features.forEach((feature)=>{
            featureAverages[feature] = songs.length > 0 ? featureSums[feature] / songs.length : 0;
        });
        return featureAverages;
    };
    (0,react_.useEffect)(()=>{
        if (targetArtistSongs.length > 0 && similarGenreSongs.length > 0) {
            const targetAverageFeatures = calculateAverageFeatures(targetArtistSongs);
            const similarAverageFeatures = calculateAverageFeatures(similarGenreSongs);
            const radarData = [
                {
                    label: targetArtistSongs[0].artist_name,
                    values: targetAverageFeatures
                },
                {
                    label: "장르 평균",
                    values: similarAverageFeatures
                }
            ];
            setRadarData(radarData);
        } else {
            setRadarData([]);
        }
    }, [
        targetArtistSongs,
        similarGenreSongs,
        features
    ]);
    // 스트리밍 수와 오디오 특징의 상관관계 데이터 준비
    (0,react_.useEffect)(()=>{
        if (similarGenreSongs.length > 0) {
            const data = similarGenreSongs.map((song)=>({
                    energy: song.spotify_audio_features.energy,
                    danceability: song.spotify_audio_features.danceability,
                    acousticness: song.spotify_audio_features.acousticness,
                    liveness: song.spotify_audio_features.liveness,
                    speechiness: song.spotify_audio_features.speechiness,
                    valence: song.spotify_audio_features.valence,
                    streaming_count: song.streams,
                    artist: song.artist_name,
                    song: song.song_title
                })).filter((song)=>song.streaming_count !== undefined && song.streaming_count !== null);
            setScatterData(data);
        } else {
            setScatterData([]);
        }
    }, [
        similarGenreSongs
    ]);
    if (loading) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner/* default */.Z, {})
        });
    }
    if (error) {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage/* default */.Z, {
                message: error
            })
        });
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "audio-features-comparison p-1 space-y-12 max-w-7xl mx-auto",
        children: /*#__PURE__*/ jsx_runtime_.jsx("section", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-y-0 lg:space-x-0 mx-auto",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "w-full lg:w-1/2 p-1 rounded-lg",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(meso_AudioFeaturesRadarChart, {
                            data: radarData,
                            features: features,
                            width: 500,
                            height: 400
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "w-full lg:w-1/2 p-1 rounded-lg",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(meso_AudioFeaturesScatterPlot, {
                            data: scatterData,
                            yKey: "streaming_count",
                            width: 500,
                            height: 400
                        }, "energy")
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const meso_AudioFeaturesComparison = (AudioFeaturesComparison);

// EXTERNAL MODULE: ./src/components/Divider.tsx
var Divider = __webpack_require__(46280);
// EXTERNAL MODULE: ./src/components/AnalystComment.tsx
var AnalystComment = __webpack_require__(14921);
// EXTERNAL MODULE: ./src/context/ReportContext.tsx
var ReportContext = __webpack_require__(89038);
// EXTERNAL MODULE: ./src/utils/fetchReport.ts
var fetchReport = __webpack_require__(11176);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/meso/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 











const Meso = ()=>{
    const [circleChartData, setCircleChartData] = (0,react_.useState)(null);
    const [loading, setLoading] = (0,react_.useState)(true);
    const [circlechart_target, set_circlechart_target] = (0,react_.useState)(undefined);
    const [melon_artist_id, set_melon_artist_id] = (0,react_.useState)(undefined);
    const params = (0,navigation.useParams)();
    const router = (0,navigation.useRouter)();
    const { report, error, getReportByArtistEng, setReport } = (0,ReportContext.useReportContext)();
    const artistEngParam = params.artist_eng;
    const artist_eng = typeof artistEngParam === "string" ? artistEngParam : undefined;
    (0,react_.useEffect)(()=>{
        console.log(artist_eng);
        if (!artist_eng) {
            router.push("/404");
            return;
        }
        const fetchData = async ()=>{
            if (!report) {
                try {
                    const newReport = await (0,fetchReport/* fetchReportById */.Th)(artist_eng);
                    if (newReport) {
                        setReport(newReport); // 직접 setReport를 호출하여 context의 report 업데이트
                        set_circlechart_target(newReport.circlechart_target || undefined);
                        set_melon_artist_id(newReport.melon_artist_id || undefined);
                    } else {
                        router.push("/404"); // 해당 데이터를 찾을 수 없는 경우 404로 리다이렉트
                    }
                } catch (error) {
                    console.error("Failed to fetch report:", error);
                }
            } else {
                getReportByArtistEng(artist_eng); // 기존 reports 데이터가 있으면 이 함수 사용
                set_circlechart_target(report.circlechart_target || undefined);
                set_melon_artist_id(report.melon_artist_id || undefined);
            }
        };
        fetchData();
    }, [
        artist_eng,
        report,
        getReportByArtistEng,
        router,
        setReport
    ]);
    (0,react_.useEffect)(()=>{
        const getData = async ()=>{
            if (!circlechart_target) return;
            setLoading(true);
            const fetchedData = await fetchCircleChartsData(circlechart_target);
            setCircleChartData(fetchedData);
            setLoading(false);
        };
        getData();
    }, [
        circlechart_target
    ]);
    if (loading) return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex items-center justify-center h-screen",
        children: /*#__PURE__*/ jsx_runtime_.jsx(Spinner/* default */.Z, {})
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "p-6",
        children: circleChartData && circlechart_target && melon_artist_id ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(meso_CircleCharts, {
                    target: circlechart_target,
                    global: circleChartData.global_chart,
                    streaming: circleChartData.streaming_chart,
                    retail: circleChartData.retail_chart
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Divider/* default */.Z, {
                    opacity: 0.5,
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    color: "blue-500"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(meso_AudioFeaturesComparison, {
                    melon_artist_id: melon_artist_id,
                    circlechart_data: circleChartData
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(AnalystComment/* default */.Z, {
                    commentKey: "meso_circlechart_comment"
                })
            ]
        }) : /*#__PURE__*/ jsx_runtime_.jsx(ErrorMessage/* default */.Z, {
            message: "CircleChart 데이터를 찾을 수 없습니다."
        })
    });
};
/* harmony default export */ const page = (Meso);


/***/ }),

/***/ 46280:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Divider = ({ opacity = 1, marginTop = "1rem", marginBottom = "1rem", color = "gray-300" })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {
        style: {
            opacity,
            marginTop,
            marginBottom
        },
        className: `border-t border-${color}`
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Divider);


/***/ }),

/***/ 8915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const ErrorMessage = ({ message })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "flex items-center space-x-2 text-red-600",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            children: message
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorMessage);


/***/ })

};
;