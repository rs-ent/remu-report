// AudioFeaturesScatterPlot.tsx

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';

interface ScatterData {
    energy: number;
    danceability: number;
    acousticness: number;
    liveness: number;
    speechiness: number;
    valence: number;
    streaming_count: number;
    artist: string;
    song: string;
    normalized_streaming_count?: number; // 정규화된 스트리밍 횟수
    log_streaming_count?: number; // 로그 변환된 스트리밍 횟수
}

const features = ['acousticness', 'danceability', 'energy', 'liveness', 'speechiness', 'valence'] as const;
type Feature = typeof features[number];

interface InteractiveScatterPlotProps {
    data: ScatterData[];
    yKey: string;
    width: number;
    height: number;
}

const AudioFeaturesScatterPlot: React.FC<InteractiveScatterPlotProps> = ({ data, yKey, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [selectedFeature, setSelectedFeature] = useState<Feature>('energy');
    const autoCycleInterval = 10000; // 10초

    // 타이머를 관리하는 ref
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 자동으로 특징을 전환하는 함수
    const startAutoCycle = useCallback(() => {
        timerRef.current = setInterval(() => {
            setSelectedFeature(prevFeature => {
                const currentIndex = features.indexOf(prevFeature);
                const nextIndex = (currentIndex + 1) % features.length;
                return features[nextIndex];
            });
        }, autoCycleInterval);
    }, []);

    // 자동 전환 시작
    useEffect(() => {
        startAutoCycle();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [startAutoCycle]);

    // 사용자가 선택했을 때 타이머를 리셋
    const handleFeatureSelect = (feature: Feature) => {
        setSelectedFeature(feature);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        startAutoCycle();
    };

    useEffect(() => {
        if (!data || data.length === 0) return;

        // 스트리밍 횟수에 로그 변환을 적용 (log10)
        const transformedData = data.map(d => ({
            ...d,
            log_streaming_count: d.streaming_count > 0 ? Math.log10(d.streaming_count) : 0, // 스트리밍 횟수가 0보다 클 때만 로그 변환
        }));

        // 정규화된 스트리밍 횟수를 추가
        const maxLogStreaming = d3.max(transformedData, d => d.log_streaming_count) || 1;
        const minLogStreaming = d3.min(transformedData, d => d.log_streaming_count) || 0;
        const normalizedData = transformedData.map(d => ({
            ...d,
            normalized_streaming_count: (d.log_streaming_count - minLogStreaming) / (maxLogStreaming - minLogStreaming)
        }));

        // Clear previous SVG content
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');
        svg.selectAll('*').remove();

        // Set up dimensions and margins
        const margin = { top: 20, right: 70, bottom: 20, left: 70 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Append group element
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X scale
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(normalizedData, d => d[selectedFeature])! * 1.1])
            .range([0, innerWidth]);

        // Y scale using Min-Max 정규화
        const yScale = d3.scaleLinear()
            .domain([0, 1]) // 정규화된 스트리밍 횟수는 0에서 1 사이
            .range([innerHeight, 0]);

        // Color scale
        const color = d3.scaleSequential(d3.interpolateBlues)
            .domain([0, d3.max(normalizedData, d => d.normalized_streaming_count)!]);

        // Opacity scale based on streaming_count
        const opacityScale = d3.scaleLinear()
            .domain([d3.min(normalizedData, d => d.normalized_streaming_count) || 0, d3.max(normalizedData, d => d.normalized_streaming_count) || 1])
            .range([0.2, 0.7]);

        // Create axes
        const xAxis = d3.axisBottom(xScale).ticks(6).tickSizeOuter(0);
        const yAxis = d3.axisLeft(yScale).ticks(6).tickSizeOuter(0).tickFormat(d3.format(".0%")); // 퍼센트 형식

        // Append X axis with label
        const xAxisG = g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis);

        xAxisG.append('text')
            .attr('x', innerWidth / 2)
            .attr('y', 35) // y 위치 조정
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .text(`${translateFeature(selectedFeature)}`);

        // Append Y axis with label
        const yAxisG = g.append('g')
            .call(yAxis);

        yAxisG.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50) // y 위치 조정
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .text('스트리밍 횟수 (정규화)');

        // Add tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip') // CSS 클래스명 변경
            .style('position', 'absolute')
            .style('background', 'white')
            .style('border', '1px solid #ccc')
            .style('border-radius', '4px')
            .style('padding', '8px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('box-shadow', '0px 0px 10px rgba(0,0,0,0.1)');

        // Draw circles with transitions
        const circles = g.selectAll('circle')
            .data(normalizedData)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d[selectedFeature]))
            .attr('cy', d => yScale(d.normalized_streaming_count!))
            .attr('r', 0) // 초기 반지름 설정
            .attr('fill', d => d3.interpolateBlues(d.normalized_streaming_count!))
            .attr('opacity', d => d.normalized_streaming_count!)
            .on('mouseover', (event, d) => {
                tooltip
                    .style('opacity', 1)
                    .html(`
                        ${d.artist} - ${d.song}<br/>
                        ${translateFeature(selectedFeature)}: ${d[selectedFeature].toFixed(2)}<br/>
                        스트리밍 횟수: ${d.streaming_count.toLocaleString()}회
                    `)
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 28}px`);
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0);
            });

        circles.transition()
            .duration(500) // 트랜지션 지속 시간을 500ms로 단축
            .attr('r', 8); // 반지름을 5로 증가

        // Add regression line with transition
        const lr = linearRegression(normalizedData.map(d => d[selectedFeature]), normalizedData.map(d => d.normalized_streaming_count!));
        const lineData = [
            { x: d3.min(normalizedData, d => d[selectedFeature])!, y: lr.intercept + lr.slope * d3.min(normalizedData, d => d[selectedFeature])! },
            { x: d3.max(normalizedData, d => d[selectedFeature])!, y: lr.intercept + lr.slope * d3.max(normalizedData, d => d[selectedFeature])! },
        ];

        const line = d3.line<any>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        // Append regression line initially
        g.append('path')
            .datum(lineData)
            .attr('class', 'regression-line') // 클래스 추가
            .attr('d', line as any)
            .style('stroke', '#7c848e')
            .style('stroke-width', '1px')
            .style('fill', 'none')
            .attr('stroke-dasharray', '5,5') // 초기 대시 배열
            .transition()
            .duration(1000)
            .style('stroke-width', '3px')
            .attr('stroke-dasharray', null); // 대시 배열 제거하여 실선으로 변경

        // Display correlation coefficient with transition
        const correlation = calculatePearsonCorrelation(normalizedData.map(d => d[selectedFeature]), normalizedData.map(d => d.normalized_streaming_count!));
        g.append('text')
            .enter()
            .attr('class', 'correlation-text') // 클래스 추가
            .attr('x', innerWidth - 10)
            .attr('y', innerHeight - 10)
            .attr('text-anchor', 'end')
            .attr('fill', 'black')
            .attr('font-size', '8px')
            .text(`상관계수: ${correlation.toFixed(2)}`)
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .style('opacity', 1);

        // Update elements on feature change with transitions
        // Update scales
        xScale.domain([0, d3.max(normalizedData, d => d[selectedFeature])! * 1.1]);
        // yScale는 이미 0~1로 고정되어 있으므로 변경하지 않음

        // Update axes with transitions
        xAxisG.transition().duration(1000).call(xAxis);
        yAxisG.transition().duration(1000).call(yAxis);

        // Update X axis label with transition
        xAxisG.select('text')
            .transition()
            .duration(1000)
            .text(`${translateFeature(selectedFeature)}`);

        // Update color and opacity scales
        color.domain([0, d3.max(normalizedData, d => d.streaming_count)!]);
        opacityScale.domain([minLogStreaming, maxLogStreaming]);

        // Update circles
        g.selectAll('circle')
            .data(normalizedData)
            .transition()
            .duration(800) // 트랜지션 지속 시간을 300ms로 단축
            .attr('cx', d => xScale(d[selectedFeature]))
            .attr('cy', d => yScale(d.normalized_streaming_count!))
            .attr('fill', d => d3.interpolateBlues(d.normalized_streaming_count!))
            .attr('opacity', d => d.normalized_streaming_count!)
            .attr('r', 6); // 반지름을 10으로 설정

        // Update regression line
        const updatedLR = linearRegression(normalizedData.map(d => d[selectedFeature]), normalizedData.map(d => d.normalized_streaming_count!));
        const updatedLineData = [
            { x: d3.min(normalizedData, d => d[selectedFeature])!, y: updatedLR.intercept + updatedLR.slope * d3.min(normalizedData, d => d[selectedFeature])! },
            { x: d3.max(normalizedData, d => d[selectedFeature])!, y: updatedLR.intercept + updatedLR.slope * d3.max(normalizedData, d => d[selectedFeature])! },
        ];

        g.selectAll('.regression-line')
            .datum(updatedLineData)
            .transition()
            .duration(1000)
            .attr('d', line);

        // Update correlation coefficient
        const updatedCorrelation = calculatePearsonCorrelation(normalizedData.map(d => d[selectedFeature]), normalizedData.map(d => d.normalized_streaming_count!));
        console.log("Updated Correlation:", updatedCorrelation);
        g.selectAll('.correlation-text')
            .text(`상관계수: ${updatedCorrelation.toFixed(2)}`);

        // Cleanup tooltip on unmount
        return () => {
            tooltip.remove();
        };
    }, [data, selectedFeature, yKey, width, height]);

    // 선형 회귀 함수
    const linearRegression = (x: number[], y: number[]) => {
        const n = x.length;
        const sum_x = d3.sum(x);
        const sum_y = d3.sum(y);
        const sum_xy = d3.sum(x.map((d, i) => d * y[i]));
        const sum_xx = d3.sum(x.map(d => d * d));
        const slope = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
        const intercept = (sum_y - slope * sum_x) / n;
        return { slope, intercept };
    };

    // 피어슨 상관계수 계산 함수
    const calculatePearsonCorrelation = (x: number[], y: number[]): number => {
        const n = x.length;
        const sum_x = d3.sum(x);
        const sum_y = d3.sum(y);
        const sum_xy = d3.sum(x.map((d, i) => d * y[i]));
        const sum_xx = d3.sum(x.map(d => d * d));
        const sum_yy = d3.sum(y.map(d => d * d));

        const numerator = (n * sum_xy) - (sum_x * sum_y);
        const denominator = Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y));

        return denominator !== 0 ? numerator / denominator : 0;
    };

    // 오디오 특징 한국어 번역 함수
    const translateFeature = (feature: string): string => {
        const translations: { [key: string]: string } = {
            acousticness: '자연음향',
            danceability: '리듬감',
            energy: '강렬함',
            liveness: '현장감',
            speechiness: '음성비중',
            valence: '감성적 온도',
        };
        return translations[feature] || feature;
    };

    return (
        <div className="w-full flex flex-col items-center relative">
            <svg ref={svgRef} width={width} height={height}></svg>
            {/* 특징 선택 도트 */}
            <div className="flex justify-center mt-4 space-x-2">
                {features.map(feature => (
                    <button
                        key={feature}
                        onClick={() => handleFeatureSelect(feature)}
                        className={`w-4 h-4 rounded-full border-2 ${
                            selectedFeature === feature
                                ? 'bg-gray-500'
                                : 'bg-gray-100'
                        } focus:outline-none`}
                        aria-label={translateFeature(feature)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default AudioFeaturesScatterPlot;
