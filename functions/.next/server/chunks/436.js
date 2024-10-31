exports.id = 436;
exports.ids = [436];
exports.modules = {

/***/ 66436:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./node_modules/d3/src/index.js + 159 modules
var src = __webpack_require__(18707);
// EXTERNAL MODULE: ./src/components/macro/MarketGrowthChart.css
var MarketGrowthChart = __webpack_require__(39323);
;// CONCATENATED MODULE: ./src/components/macro/MarketGrowthChart.tsx




const MarketGrowthChart_MarketGrowthChart = ({ data })=>{
    const svgRef = (0,react_.useRef)(null);
    const [dimensions, setDimensions] = (0,react_.useState)({
        width: 0,
        height: 0
    });
    // Resize observer to make chart responsive
    (0,react_.useEffect)(()=>{
        const resizeObserver = new ResizeObserver((entries)=>{
            if (!entries || entries.length === 0) return;
            let { width } = entries[0].contentRect;
            if (width > 600) width = 600;
            setDimensions({
                width,
                height: 400
            });
        });
        if (svgRef.current && svgRef.current.parentElement) {
            resizeObserver.observe(svgRef.current.parentElement);
        }
        return ()=>{
            if (svgRef.current && svgRef.current.parentElement) {
                resizeObserver.unobserve(svgRef.current.parentElement);
            }
        };
    }, []);
    const growthRates = (0,react_.useMemo)(()=>{
        if (!data || data.length === 0) return [];
        // 데이터 정렬
        const sortedData = [
            ...data
        ].sort((a, b)=>src/* ascending */.j2p(a.date, b.date));
        const growthRates = [];
        for(let i = 1; i < sortedData.length; i++){
            const current = sortedData[i];
            const salesGrowth = current.salesGrowth;
            growthRates.push({
                date: current.date,
                totalGrowth: salesGrowth,
                totalSales: current.averageSales
            });
        }
        console.log("Growth Rate: ", growthRates);
        return growthRates;
    }, [
        data
    ]);
    // 한국어 숫자 단위 포맷팅 함수
    const formatKoreanNumber = (value)=>{
        if (value >= 1e12) {
            return (value / 1e12).toFixed(1) + "조";
        } else if (value >= 1e8) {
            return (value / 1e8).toFixed(1) + "억";
        } else if (value >= 1e7) {
            return (value / 1e7).toFixed(1) + "천만";
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + "백만";
        } else if (value >= 1e5) {
            return (value / 1e5).toFixed(1) + "십만";
        } else if (value >= 1e4) {
            return (value / 1e4).toFixed(1) + "만";
        } else {
            return value.toString();
        }
    };
    (0,react_.useEffect)(()=>{
        if (!svgRef.current || growthRates.length === 0) return;
        const svg = src/* select */.Ys(svgRef.current);
        const { width, height } = dimensions;
        if (width === 0 || height === 0) return;
        const customMargin = {
            top: 20,
            right: 60,
            bottom: 35,
            left: 40
        };
        // 색상 설정
        const colors = {
            background: "transparent",
            grid: "#e0e0e0",
            growthLine: "#ff6b6b",
            salesBar: "#81afd4",
            axis: "#333333",
            tooltipBg: "#ffffff",
            tooltipText: "#333333"
        };
        // 스케일 설정
        const x = src/* scaleBand */.tiA().domain(growthRates.map((d)=>d.date)).range([
            customMargin.left,
            width - customMargin.right
        ]).padding(0.1);
        const minGrowth = src/* min */.VV$(growthRates, (d)=>d.totalGrowth) ?? -20;
        const yGrowth = src/* scaleLinear */.BYU().domain([
            Math.min(minGrowth - 5, -30),
            src/* max */.Fp7(growthRates, (d)=>d.totalGrowth) + 5
        ]).nice().range([
            height - customMargin.bottom,
            customMargin.top
        ]);
        const ySales = src/* scaleLinear */.BYU().domain([
            0,
            src/* max */.Fp7(growthRates, (d)=>d.totalSales * 1.1)
        ]).nice().range([
            height - customMargin.bottom,
            customMargin.top
        ]);
        // 초기화
        svg.selectAll("*").remove();
        // 배경 설정
        svg.attr("width", width).attr("height", height).style("background", colors.background);
        // 그리드 추가
        svg.append("g").attr("class", "grid").attr("transform", `translate(0,0)`).call(src/* axisLeft */.y4O(yGrowth).ticks(5).tickSize(-width + customMargin.left + customMargin.right).tickFormat(()=>"")).selectAll("line").attr("stroke", colors.grid).attr("transform", `translate(${customMargin.left},0)`);
        // X축
        const xAxis = svg.append("g").attr("transform", `translate(0,${height - customMargin.bottom})`).call(src/* axisBottom */.LLu(x));
        xAxis.selectAll("text").attr("transform", "rotate(-45)").style("text-anchor", "end").attr("dx", "-0.5em").attr("dy", "0.1em");
        // Y축 (Growth Rate)
        svg.append("g").attr("transform", `translate(${customMargin.left},0)`).call(src/* axisLeft */.y4O(yGrowth).ticks(5).tickFormat((d)=>`${d}%`));
        // Y축 (Sales) - 한국어 단위 적용
        svg.append("g").attr("transform", `translate(${width - customMargin.right},0)`).call(src/* axisRight */.Khx(ySales).ticks(5).tickFormat((d)=>formatKoreanNumber(d)));
        // 바 차트 추가 (Sales)
        svg.selectAll(".bar").data(growthRates).enter().append("rect").attr("class", "bar").attr("x", (d)=>x(d.date)).attr("width", x.bandwidth()).attr("y", (d)=>ySales(0)).attr("height", 0).attr("fill", colors.salesBar).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("fill", src/* rgb */.B8C(colors.salesBar).darker(1).toString());
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>Sales: ${formatKoreanNumber(d.totalSales)}원<br/>Growth Rate: ${d.totalGrowth.toFixed(2)}%`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("fill", colors.salesBar);
            tooltip.style("opacity", 0);
        }).transition().duration(800).attr("y", (d)=>ySales(d.totalSales)).attr("height", (d)=>height - customMargin.bottom - ySales(d.totalSales));
        // 라인 추가 (Growth Rate)
        const line = src/* line */.jvg().x((d)=>x(d.date) + x.bandwidth() / 2).y((d)=>yGrowth(d.totalGrowth)).curve(src/* curveMonotoneX */.FdL);
        svg.append("path").datum(growthRates).attr("fill", "none").attr("stroke", colors.growthLine).attr("stroke-width", 3).attr("d", line);
        // 점 추가 (Growth Rate)
        svg.selectAll(".dot").data(growthRates).enter().append("circle").attr("class", "dot").attr("cx", (d)=>x(d.date) + x.bandwidth() / 2).attr("cy", (d)=>yGrowth(d.totalGrowth)).attr("r", 0).attr("fill", colors.growthLine).on("mouseover", function(event, d) {
            src/* select */.Ys(this).transition().duration(200).attr("r", 8);
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>Growth Rate: ${d.totalGrowth.toFixed(2)}%<br/>Sales: ${formatKoreanNumber(d.totalSales)}원`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).transition().duration(200).attr("r", 5);
            tooltip.style("opacity", 0);
        }).transition().duration(800).attr("r", 5);
        // 툴팁 설정
        const tooltip = src/* select */.Ys("body").append("div").attr("class", "chart-tooltip").style("opacity", 0);
        // 차트 제목
        /*
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', customMargin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('class', 'chart-title')
      .text('시장 성장률 및 매출 추이');*/ // 클린업 함수
        return ()=>{
            svg.selectAll("*").remove();
            tooltip.remove();
        };
    }, [
        growthRates,
        dimensions
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "chart-container",
        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
            ref: svgRef
        })
    });
};
/* harmony default export */ const macro_MarketGrowthChart = (MarketGrowthChart_MarketGrowthChart);

// EXTERNAL MODULE: ./node_modules/firebase/firestore/dist/index.mjs + 2 modules
var dist = __webpack_require__(29904);
// EXTERNAL MODULE: ./src/firebase.ts
var firebase = __webpack_require__(8788);
;// CONCATENATED MODULE: ./src/utils/fetchMarketGrowth.ts


const fetchMarketGrowthData = async ()=>{
    const marketGrowthCollection = (0,dist/* collection */.hJ)(firebase.db, "MarketGrowth");
    const querySnapshot = await (0,dist/* getDocs */.PL)(marketGrowthCollection);
    const data = [];
    querySnapshot.forEach((doc)=>{
        const docData = doc.data();
        data.push({
            id: doc.id,
            company: docData.company,
            date: docData.date.toString(),
            sales: docData.sales,
            sales_contents: docData.sales_contents,
            sales_music: docData.sales_music,
            sales_management: docData.sales_management
        });
    });
    return data;
};

;// CONCATENATED MODULE: ./src/utils/fetchAutoComments.ts


const fetchAutoComments = async ()=>{
    const autoCommentsCollection = (0,dist/* collection */.hJ)(firebase.db, "AutoComments");
    try {
        const autoCommentsSnapshot = await (0,dist/* getDocs */.PL)((0,dist/* query */.IO)(autoCommentsCollection, (0,dist/* orderBy */.Xo)("timestamp", "desc"), (0,dist/* limit */.b9)(1)));
        // 최신 AutoComment가 있을 경우 데이터를 반환
        if (!autoCommentsSnapshot.empty) {
            const latestCommentDoc = autoCommentsSnapshot.docs[0];
            const commentData = latestCommentDoc.data().comments;
            return {
                comment_openai: commentData.comment_openai,
                detail_comment_openai: commentData.detail_comment_openai
            };
        } else {
            console.warn("No AutoComments found.");
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch the latest AutoComment:", error);
        return null;
    }
};

// EXTERNAL MODULE: ./src/components/Spinner.tsx
var Spinner = __webpack_require__(57040);
// EXTERNAL MODULE: ./src/components/AnalystComment.tsx
var AnalystComment = __webpack_require__(14921);
// EXTERNAL MODULE: ./src/components/macro/MarketGrowthDetailChart.css
var MarketGrowthDetailChart = __webpack_require__(39481);
;// CONCATENATED MODULE: ./src/components/macro/MarketGrowthDetailChart.tsx
// src/components/macro/MarketGrowthDetailChart.tsx




const MarketGrowthDetailChart_MarketGrowthDetailChart = ({ data, title })=>{
    const svgRef = (0,react_.useRef)(null);
    const [dimensions, setDimensions] = (0,react_.useState)({
        width: 600,
        height: 400
    });
    // Resize observer를 사용하여 차트를 반응형으로 만듭니다.
    (0,react_.useEffect)(()=>{
        const handleResize = ()=>{
            const parent = svgRef.current?.parentElement;
            if (parent) {
                const width = parent.clientWidth > 800 ? 800 : parent.clientWidth;
                setDimensions({
                    width,
                    height: 300
                });
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // 초기 호출
        return ()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    // 데이터 준비
    const processedData = (0,react_.useMemo)(()=>{
        return data.map((d)=>({
                date: d.date,
                musicSales: d.averageMusicSales,
                musicGrowth: d.musicSalesGrowth,
                contentsSales: d.averageContentsSales,
                contentsGrowth: d.contentsSalesGrowth,
                managementSales: d.averageManagementSales,
                managementGrowth: d.managementSalesGrowth
            }));
    }, [
        data
    ]);
    // 한국어 숫자 단위 포맷팅 함수
    const formatKoreanNumber = (value)=>{
        if (value >= 1e12) {
            return (value / 1e12).toFixed(1) + "조";
        } else if (value >= 1e8) {
            return (value / 1e8).toFixed(1) + "억";
        } else if (value >= 1e7) {
            return (value / 1e7).toFixed(1) + "천만";
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + "백만";
        } else if (value >= 1e5) {
            return (value / 1e5).toFixed(1) + "십만";
        } else if (value >= 1e4) {
            return (value / 1e4).toFixed(1) + "만";
        } else {
            return value.toString();
        }
    };
    (0,react_.useEffect)(()=>{
        if (!svgRef.current || processedData.length === 0) return;
        const svg = src/* select */.Ys(svgRef.current);
        const { width, height } = dimensions;
        const margin = {
            top: 40,
            right: 80,
            bottom: 45,
            left: 60
        };
        // 색상 설정
        const colors = {
            musicSales: "#ffab00",
            contentsSales: "#00c853",
            managementSales: "#d500f9",
            musicGrowth: "#ff6b6b",
            contentsGrowth: "#00acc1",
            managementGrowth: "#8e24aa",
            grid: "#e0e0e0",
            axis: "#333333",
            tooltipBg: "#ffffff",
            tooltipText: "#333333"
        };
        // 스케일 설정
        const x = src/* scaleBand */.tiA().domain(processedData.map((d)=>d.date)).range([
            margin.left,
            width - margin.right
        ]).padding(0.2);
        const ySales = src/* scaleLinear */.BYU().domain([
            0,
            src/* max */.Fp7(processedData, (d)=>Math.max(d.musicSales, d.contentsSales, d.managementSales)) * 1.1
        ]).nice().range([
            height - margin.bottom,
            margin.top
        ]);
        const yGrowth = src/* scaleLinear */.BYU().domain([
            src/* min */.VV$(processedData, (d)=>Math.min(d.musicGrowth, d.contentsGrowth, d.managementGrowth)) - 5,
            src/* max */.Fp7(processedData, (d)=>Math.max(d.musicGrowth, d.contentsGrowth, d.managementGrowth)) + 5
        ]).nice().range([
            height - margin.bottom,
            margin.top
        ]);
        // 초기화
        svg.selectAll("*").remove();
        // 배경 설정
        svg.attr("width", width).attr("height", height).style("background", "transparent");
        // 그리드 추가 (Sales)
        svg.append("g").attr("class", "grid").attr("transform", `translate(${margin.left},0)`).call(src/* axisLeft */.y4O(ySales).ticks(5).tickSize(-width + margin.left + margin.right).tickFormat(()=>"")).selectAll("line").attr("stroke", colors.grid);
        // X축
        const xAxis = svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(src/* axisBottom */.LLu(x));
        xAxis.selectAll("text").attr("transform", "rotate(-45)").style("text-anchor", "end").attr("dx", "-0.5em").attr("dy", "0.1em");
        // Y축 (Sales)
        svg.append("g").attr("transform", `translate(${width - margin.right},0)`).call(src/* axisRight */.Khx(ySales).ticks(5).tickFormat((d)=>formatKoreanNumber(d)));
        // Y축 (Growth Rate)
        svg.append("g").attr("transform", `translate(${margin.left},0)`).call(src/* axisLeft */.y4O(yGrowth).ticks(5).tickFormat((d)=>`${d}%`));
        // 바 차트 추가 (매출)
        svg.selectAll(".bar-music").data(processedData).enter().append("rect").attr("class", "bar-music").attr("x", (d)=>x(d.date)).attr("width", x.bandwidth() / 3).attr("y", ySales(0)).attr("height", 0).attr("fill", colors.musicSales).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("fill", src/* rgb */.B8C(colors.musicSales).darker(1).toString());
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>음원/음반 : ${formatKoreanNumber(d.musicSales)}원`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("fill", colors.musicSales);
            tooltip.style("opacity", 0);
        }).transition().duration(800).attr("y", (d)=>ySales(d.musicSales)).attr("height", (d)=>height - margin.bottom - ySales(d.musicSales));
        svg.selectAll(".bar-contents").data(processedData).enter().append("rect").attr("class", "bar-contents").attr("x", (d)=>x(d.date) + x.bandwidth() / 3).attr("width", x.bandwidth() / 3).attr("y", ySales(0)).attr("height", 0).attr("fill", colors.contentsSales).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("fill", src/* rgb */.B8C(colors.contentsSales).darker(1).toString());
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>공연/콘텐츠 : ${formatKoreanNumber(d.contentsSales)}원`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("fill", colors.contentsSales);
            tooltip.style("opacity", 0);
        }).transition().duration(800).attr("y", (d)=>ySales(d.contentsSales)).attr("height", (d)=>height - margin.bottom - ySales(d.contentsSales));
        svg.selectAll(".bar-management").data(processedData).enter().append("rect").attr("class", "bar-management").attr("x", (d)=>x(d.date) + 2 * x.bandwidth() / 3).attr("width", x.bandwidth() / 3).attr("y", ySales(0)).attr("height", 0).attr("fill", colors.managementSales).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("fill", src/* rgb */.B8C(colors.managementSales).darker(1).toString());
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>출연료/초상권 : ${formatKoreanNumber(d.managementSales)}원`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("fill", colors.managementSales);
            tooltip.style("opacity", 0);
        }).transition().duration(800).attr("y", (d)=>ySales(d.managementSales)).attr("height", (d)=>height - margin.bottom - ySales(d.managementSales));
        // 성장률 라인 차트
        const lineMusic = src/* line */.jvg().x((d)=>x(d.date) + x.bandwidth() / 2).y((d)=>yGrowth(d.musicGrowth)).curve(src/* curveMonotoneX */.FdL);
        const lineContents = src/* line */.jvg().x((d)=>x(d.date) + x.bandwidth() / 2).y((d)=>yGrowth(d.contentsGrowth)).curve(src/* curveMonotoneX */.FdL);
        const lineManagement = src/* line */.jvg().x((d)=>x(d.date) + x.bandwidth() / 2).y((d)=>yGrowth(d.managementGrowth)).curve(src/* curveMonotoneX */.FdL);
        // 음악 성장률 라인
        svg.append("path").datum(processedData).attr("fill", "none").attr("stroke", colors.musicGrowth).attr("stroke-width", 2).attr("d", lineMusic);
        // 콘텐츠 성장률 라인
        svg.append("path").datum(processedData).attr("fill", "none").attr("stroke", colors.contentsGrowth).attr("stroke-width", 2).attr("d", lineContents);
        // 관리 성장률 라인
        svg.append("path").datum(processedData).attr("fill", "none").attr("stroke", colors.managementGrowth).attr("stroke-width", 2).attr("d", lineManagement);
        // 성장률 데이터 포인트에 원(circle) 추가
        svg.selectAll(".dot-music").data(processedData).enter().append("circle").attr("class", "dot-music").attr("cx", (d)=>x(d.date) + x.bandwidth() / 2).attr("cy", (d)=>yGrowth(d.musicGrowth)).attr("r", 4).attr("fill", colors.musicGrowth).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("r", 6);
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>음원/음반 성장률: ${d.musicGrowth.toFixed(2)}%`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("r", 4);
            tooltip.style("opacity", 0);
        });
        svg.selectAll(".dot-contents").data(processedData).enter().append("circle").attr("class", "dot-contents").attr("cx", (d)=>x(d.date) + x.bandwidth() / 2).attr("cy", (d)=>yGrowth(d.contentsGrowth)).attr("r", 4).attr("fill", colors.contentsGrowth).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("r", 6);
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>공연/콘텐츠 성장률: ${d.contentsGrowth.toFixed(2)}%`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("r", 4);
            tooltip.style("opacity", 0);
        });
        svg.selectAll(".dot-management").data(processedData).enter().append("circle").attr("class", "dot-management").attr("cx", (d)=>x(d.date) + x.bandwidth() / 2).attr("cy", (d)=>yGrowth(d.managementGrowth)).attr("r", 4).attr("fill", colors.managementGrowth).on("mouseover", function(event, d) {
            src/* select */.Ys(this).attr("r", 6);
            tooltip.style("opacity", 1).html(`<strong>${d.date}</strong><br/>출연료/초상권 성장률: ${d.managementGrowth.toFixed(2)}%`).style("left", event.pageX + 10 + "px").style("top", event.pageY - 28 + "px");
        }).on("mouseout", function() {
            src/* select */.Ys(this).attr("r", 4);
            tooltip.style("opacity", 0);
        });
        // 툴팁 설정
        const tooltip = src/* select */.Ys("body").append("div").attr("class", "chart-tooltip").style("opacity", 0).style("position", "absolute").style("background", colors.tooltipBg).style("color", colors.tooltipText).style("padding", "8px").style("border", "1px solid #ccc").style("border-radius", "4px").style("pointer-events", "none");
        // 클린업 함수
        return ()=>{
            svg.selectAll("*").remove();
            tooltip.remove();
        };
    }, [
        processedData,
        dimensions
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "chart-container",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "chart-title",
                children: title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                ref: svgRef
            })
        ]
    });
};
/* harmony default export */ const macro_MarketGrowthDetailChart = (MarketGrowthDetailChart_MarketGrowthDetailChart);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/macro/MarketGrowthDetail.tsx
// src/app/report/[artist_eng]/macro/MarketGrowthDetail.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



const MarketGrowthDetail = ({ auto_comment, data })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-full flex flex-col items-center mt-8 space-y-8",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-full max-w-2xl text-center",
                children: /*#__PURE__*/ jsx_runtime_.jsx(macro_MarketGrowthDetailChart, {
                    data: data,
                    title: "세부 매출 및 성장률 현황"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "mt-1 w-full max-w-xl relative",
                    children: [
                        auto_comment && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            className: "text-xs text-gray-400 mb-2 text-center font-extralight",
                            children: auto_comment
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(AnalystComment/* default */.Z, {
                            commentKey: "macro_marketGrowthDetail_comment"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const macro_MarketGrowthDetail = (MarketGrowthDetail);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/macro/MarketGrowth.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 







const Macro = ()=>{
    const [marketData, setMarketData] = (0,react_.useState)([]);
    const [loading, setLoading] = (0,react_.useState)(true);
    const [error, setError] = (0,react_.useState)(null);
    const [autoComments, setAutoComments] = (0,react_.useState)(null);
    (0,react_.useEffect)(()=>{
        const getData = async ()=>{
            try {
                const data = await fetchMarketGrowthData();
                const averageSalesData = calculateAverageAndGrowthByYear(data);
                console.log("Average Sales Data : ", averageSalesData);
                setMarketData(averageSalesData);
                const autoComments = await fetchAutoComments();
                console.log("Auto Comments : ", autoComments);
                setAutoComments(autoComments);
            } catch (err) {
                setError("데이터를 불러오는 데 실패했습니다.");
            } finally{
                setLoading(false);
            }
        };
        getData();
    }, []);
    // 연도별 평균 및 성장률 계산 함수
    const calculateAverageAndGrowthByYear = (data)=>{
        const groupedByYear = data.reduce((acc, cur)=>{
            if (!acc[cur.date]) {
                acc[cur.date] = [];
            }
            acc[cur.date].push(cur);
            return acc;
        }, {});
        const sortedYears = Object.keys(groupedByYear).sort();
        const averageSalesByYear = sortedYears.map((year, idx)=>{
            const yearData = groupedByYear[year];
            // 총 매출 계산
            const totalSales = yearData.reduce((acc, cur)=>acc + cur.sales, 0);
            const averageSales = totalSales / yearData.length;
            const totalMusicSales = yearData.reduce((acc, cur)=>acc + (cur.sales_music || 0), 0);
            const averageMusicSales = totalMusicSales / yearData.length;
            const totalContentsSales = yearData.reduce((acc, cur)=>acc + (cur.sales_contents || 0), 0);
            const averageContentsSales = totalContentsSales / yearData.length;
            const totalManagementSales = yearData.reduce((acc, cur)=>acc + (cur.sales_management || 0), 0);
            const averageManagementSales = totalManagementSales / yearData.length;
            // 성장률 계산
            let salesGrowth = 0;
            let musicSalesGrowth = 0;
            let contentsSalesGrowth = 0;
            let managementSalesGrowth = 0;
            if (idx > 0) {
                const previousYear = sortedYears[idx - 1];
                const previousYearData = groupedByYear[previousYear];
                const previousAverageSales = previousYearData.reduce((acc, cur)=>acc + cur.sales, 0) / previousYearData.length;
                salesGrowth = (averageSales - previousAverageSales) / previousAverageSales * 100;
                const previousAverageMusicSales = previousYearData.reduce((acc, cur)=>acc + (cur.sales_music || 0), 0) / previousYearData.length;
                musicSalesGrowth = (averageMusicSales - previousAverageMusicSales) / previousAverageMusicSales * 100;
                const previousAverageContentsSales = previousYearData.reduce((acc, cur)=>acc + (cur.sales_contents || 0), 0) / previousYearData.length;
                contentsSalesGrowth = (averageContentsSales - previousAverageContentsSales) / previousAverageContentsSales * 100;
                const previousAverageManagementSales = previousYearData.reduce((acc, cur)=>acc + (cur.sales_management || 0), 0) / previousYearData.length;
                managementSalesGrowth = (averageManagementSales - previousAverageManagementSales) / previousAverageManagementSales * 100;
            }
            return {
                id: year,
                company: "any",
                date: year,
                sales: totalSales,
                sales_music: totalMusicSales,
                sales_contents: totalContentsSales,
                sales_management: totalManagementSales,
                averageSales,
                salesGrowth,
                averageMusicSales,
                musicSalesGrowth,
                averageContentsSales,
                contentsSalesGrowth,
                averageManagementSales,
                managementSalesGrowth
            };
        });
        return averageSalesByYear;
    };
    if (loading) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex justify-center items-center h-64",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Spinner/* default */.Z, {}),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "ml-4 text-gray-500",
                    children: "데이터를 불러오는 중입니다..."
                })
            ]
        });
    }
    if (error) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "text-center text-red-500",
            children: [
                error,
                " ",
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    onClick: ()=>window.location.reload(),
                    className: "ml-2 text-blue-500",
                    children: "재시도"
                })
            ]
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "w-full flex flex-col items-center",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: "text-2xl font-bold mb-1 text-primary",
                children: "시장 성장률"
            }),
            marketData.length > 0 ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "w-full max-w-xl",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(macro_MarketGrowthChart, {
                                data: marketData
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "mt-2 w-full max-w-xl relative",
                                children: [
                                    autoComments && /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "text-xs text-gray-400 mb-2 text-center font-extralight",
                                        children: autoComments.comment_openai
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx(AnalystComment/* default */.Z, {
                                        commentKey: "macro_marketGrowth_comment"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(macro_MarketGrowthDetail, {
                        auto_comment: autoComments?.detail_comment_openai,
                        data: marketData
                    })
                ]
            }) : /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: "text-center text-gray-500",
                children: "시장 성장 데이터가 없습니다."
            })
        ]
    });
};
/* harmony default export */ const MarketGrowth = (Macro);

;// CONCATENATED MODULE: ./src/app/report/[artist_eng]/macro/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



const MacroPage = ()=>{
    const { artist_eng } = (0,navigation.useParams)();
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "w-full flex flex-col items-center",
        children: /*#__PURE__*/ jsx_runtime_.jsx(MarketGrowth, {})
    });
};
/* harmony default export */ const page = (MacroPage);


/***/ }),

/***/ 39323:
/***/ (() => {



/***/ }),

/***/ 39481:
/***/ (() => {



/***/ })

};
;