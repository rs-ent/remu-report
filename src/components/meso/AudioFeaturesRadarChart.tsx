// src/components/meso/AudioFeaturesRadarChart.tsx

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface RadarChartData {
    label: string;
    values: { [key: string]: number };
}

interface AudioFeaturesRadarChartProps {
    data: RadarChartData[];
    features: string[];
    width: number;
    height: number;
}

const AudioFeaturesRadarChart: React.FC<AudioFeaturesRadarChartProps> = ({ data, features, width, height }) => {
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
        const margin = { top: 50, right: 100, bottom: 50, left: 100 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const radius = Math.min(innerWidth, innerHeight) / 2;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left + innerWidth / 2},${margin.top + innerHeight / 2})`);

        const angleSlice = (2 * Math.PI) / features.length;

        // Scale for the radius
        const rScale = d3.scaleLinear()
            .domain([0, 1]) // Assuming features are normalized between 0 and 1
            .range([0, radius]);

        // Draw grid circles
        const translatedFeatures = features.map(feature => translateFeature(feature))
        const levels = 5;
        for (let level = 1; level <= levels; level++) {
            const levelFactor = radius / levels * level;
            g.selectAll('.levels')
                .data(translatedFeatures)
                .enter()
                .append('line')
                .attr('x1', (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2))
                .attr('y1', (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2))
                .attr('x2', (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2))
                .attr('y2', (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2))
                .attr('class', 'line')
                .style('stroke', 'gray')
                .style('stroke-opacity', '0.75')
                .style('stroke-width', '0.3px')
                .attr('transform', `rotate(0)`);
        }

        // Draw axis lines
        const axis = g.selectAll('.axis')
            .data(translatedFeatures)
            .enter()
            .append('g')
            .attr('class', 'axis');

        axis.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => rScale(1.1) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y2', (d, i) => rScale(1.1) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr('class', 'line')
            .style('stroke', 'gray')
            .style('stroke-width', '1px');

        // Add labels
        axis.append('text')
            .attr('x', (d, i) => (rScale(1.25)) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y', (d, i) => (rScale(1.25)) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr('class', 'legend')
            .style('font-size', '12px')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .text(d => d.charAt(0).toUpperCase() + d.slice(1));

        // Line generator
        const radarLine = d3.line<any>()
            .x(d => rScale(d.value) * Math.cos(angleSlice * d.index - Math.PI / 2))
            .y(d => rScale(d.value) * Math.sin(angleSlice * d.index - Math.PI / 2))
            .curve(d3.curveLinearClosed);

        // Draw the radar areas
        data.forEach((series, idx) => {
            const points = features.map((feature, i) => ({
                value: series.values[feature],
                index: i,
            }));

            g.append('path')
                .datum(points)
                .attr('d', radarLine as any)
                .style('stroke-width', '2px')
                .style('stroke', idx === 0 ? '#ff7300' : '#8884d8')
                .style('fill', idx === 0 ? '#ff7300' : '#8884d8')
                .style('fill-opacity', 0.1)
                .on('mouseover', function () {
                    d3.select(this)
                        .style('fill-opacity', 0.3);
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .style('fill-opacity', 0.1);
                });
        });

        // Add legend
        const legend = svg.append('g')
            .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

        data.forEach((series, idx) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${idx * 20})`);

            legendRow.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', idx === 0 ? '#ff7300' : '#8884d8');

            legendRow.append('text')
                .attr('x', 15)
                .attr('y', 10)
                .attr('text-anchor', 'start')
                .style('font-size', '12px')
                .text(series.label);
        });
    }, [data, features, width, height]);

    return (
        <div className="w-full overflow-x-auto">
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default AudioFeaturesRadarChart;
