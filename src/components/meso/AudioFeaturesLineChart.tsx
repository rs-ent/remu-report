// src/components/InteractiveLineChart.tsx

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface InteractiveLineChartProps {
    data: any[];
    features: string[];
    xKey: string;
    width: number;
    height: number;
}

const AudioFeaturesLineChart: React.FC<InteractiveLineChartProps> = ({ data, features, xKey, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const translateFeature = (feature: string): string => {
        const translations: { [key: string]: string } = {
            acousticness: '자연음향',
            danceability: '리듬감',
            energy: '강렬함',
            liveness: '현장감',
            speechiness: '음성비중',
            valence: '감성적온도',
        };
        return translations[feature] || feature;
    };

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions and margins
        const margin = { top: 50, right: 100, bottom: 50, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'bg-card dark:bg-card-dark rounded-lg shadow-md');

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X scale
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xKey]) as [number, number])
            .range([0, innerWidth]);

        // Y scale
        const yScale = d3.scaleLinear()
            .domain([0, 1]) // 오디오 특징은 0~1 사이로 가정
            .range([innerHeight, 0]);

        // Color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10).domain(features);

        // Create axes
        const xAxis = d3.axisBottom(xScale).ticks(6).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(yScale);

        // Append X axis
        g.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .append('text')
            .attr('x', innerWidth / 2)
            .attr('y', 40)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'middle')
            .text(`${xKey.charAt(0).toUpperCase() + xKey.slice(1)} (년)`);

        // Append Y axis
        g.append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'middle')
            .text('음악적 특성');

        // Line generator
        const line = d3.line<any>()
            .x(d => xScale(d[xKey]))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Prepare data
        const featureData = features.map(feature => ({
            name: feature,
            values: data.map(d => ({ x: d[xKey], value: d[feature] })),
        }));

        // Draw lines
        featureData.forEach(feature => {
            g.append('path')
                .datum(feature.values)
                .attr('d', line as any)
                .style('stroke', color(feature.name) as string)
                .style('stroke-width', '2px')
                .style('fill', 'none')
                .style('opacity', 0.7)
                .on('mouseover', function () {
                    d3.select(this)
                        .style('stroke-width', '4px')
                        .style('opacity', 1);
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .style('stroke-width', '2px')
                        .style('opacity', 0.7);
                });
        });

        // Add tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'absolute bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm shadow-lg pointer-events-none opacity-0 transition-opacity duration-300')
            .style('z-index', '10');

        // Add circles and interactivity
        featureData.forEach(feature => {
            g.selectAll(`.circle-${translateFeature(feature.name)}`)
                .data(feature.values)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.value))
                .attr('r', 4)
                .attr('fill', color(translateFeature(feature.name)) as string)
                .attr('opacity', 0.7)
                .on('mouseover', (event, d) => {
                    tooltip
                        .style('opacity', 1)
                        .html(`<strong>${translateFeature(feature.name)}</strong><br/>${xKey}: ${d.x}년<br/>값: ${d.value.toFixed(2)}`)
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 28}px`);
                })
                .on('mouseout', () => {
                    tooltip.style('opacity', 0);
                });
        });

        // Cleanup tooltip on unmount
        return () => {
            tooltip.remove();
        };
    }, [data, features, xKey, width, height]);

    return (
        <div className="w-full overflow-x-auto">
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default AudioFeaturesLineChart;