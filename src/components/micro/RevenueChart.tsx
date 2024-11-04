import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './RevenueChart.css';

interface YearlyData {
    year: number;
    earnings: number;
}

interface Props {
    data: YearlyData[];
    selectedYear: number | null;
    onYearSelect: (year: number) => void;
}

// Define NumberValue if not available from D3
type NumberValue = number | { valueOf(): number };

const RevenueChart: React.FC<Props> = ({ data, selectedYear, onYearSelect }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Chart dimensions
        const margin = { top: 50, right: 30, bottom: 50, left: 100 };
        const width = svgRef.current.clientWidth - margin.left - margin.right;
        const height = svgRef.current.clientHeight - margin.top - margin.bottom;

        // Clear existing SVG content
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Define gradient for area
        const defs = svg.append('defs');
        defs
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '100%') // Start at the bottom
            .attr('x2', '0%')
            .attr('y2', '0%') // End at the top
            .selectAll('stop')
            .data([
                { offset: '0%', color: '#ADD8E6' }, // Pastel Sky Blue at the bottom
                { offset: '100%', color: '#F08080' }, // Pastel Coral at the top
            ])
            .enter()
            .append('stop')
            .attr('offset', (d) => d.offset)
            .attr('stop-color', (d) => d.color);

        // Create chart group
        const chart = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X scale
        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(data, (d) => d.year) as [number, number])
            .range([0, width]);

        // Y scale with 10% padding
        const yMax = d3.max(data, (d) => d.earnings) || 0;
        const yScale = d3
            .scaleLinear()
            .domain([0, yMax * 1.1]) // Adding 10% padding
            .range([height, 0]);

        // Determine the minimum and maximum earnings for color scaling
        const earningsValues = data.map(d => d.earnings);
        const minEarning = d3.min(earningsValues) || 0;
        const maxEarning = d3.max(earningsValues) || 0;

        // Define a color scale from pastel sky blue to pastel coral
        const colorScale = d3.scaleLinear<string>()
            .domain([minEarning, maxEarning])
            .range(['#ADD8E6', '#F08080']) // Pastel Sky Blue to Pastel Coral
            .interpolate(d3.interpolateRgb);

        // Y-axis label formatter
        const formatYAxis = (d: NumberValue, index: number): string => {
            // Convert NumberValue to number if it's an object
            let value: number;
            if (typeof d === 'object' && 'valueOf' in d) {
                value = d.valueOf();
            } else {
                value = d;
            }

            if (value >= 100000000) return `${value / 100000000}억`;
            if (value >= 10000000) return `${value / 10000000}천만`;
            if (value >= 1000000) return `${value / 1000000}백만`;
            return value.toString();
        };

        // Y axis with custom formatter
        const yAxis = d3.axisLeft(yScale).ticks(6).tickFormat(formatYAxis);

        // Append Y axis
        chart
            .append('g')
            .call(yAxis)
            .selectAll('text')
            .style('fill', '#666')
            .style('font-size', '12px');

        // X axis with integer ticks
        const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.format('d'));
        chart
            .append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis)
            .selectAll('text')
            .style('fill', '#666')
            .style('font-size', '12px');

        // Line generator
        const line = d3
            .line<YearlyData>()
            .x((d) => xScale(d.year))
            .y((d) => yScale(d.earnings))
            .curve(d3.curveMonotoneX);

        // Area generator
        const area = d3
            .area<YearlyData>()
            .x((d) => xScale(d.year))
            .y0(height)
            .y1((d) => yScale(d.earnings))
            .curve(d3.curveMonotoneX);

        // Append area with dynamic gradient
        chart
            .append('path')
            .datum(data)
            .attr('fill', 'url(#gradient)')
            .attr('d', area);

        // Append animated line
        const linePath = chart
            .append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#FF6347') // You can change this if desired
            .attr('stroke-width', 1)
            .attr('d', line)
            .attr('stroke-dasharray', function () {
                const totalLength = this.getTotalLength();
                return `${totalLength} ${totalLength}`;
            })
            .attr('stroke-dashoffset', function () {
                return this.getTotalLength();
            })
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        // Append data points with dynamic colors
        chart
            .selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', (d) => xScale(d.year))
            .attr('cy', (d) => yScale(d.earnings))
            .attr('r', 5)
            .attr('fill', (d) => colorScale(d.earnings))
            .attr('stroke', '#fff') // Optional: Add a white stroke for better visibility
            .attr('stroke-width', 1);

        // Tooltip setup
        const tooltip = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // Vertical line
        const focus = chart.append('g').style('display', 'none');

        focus.append('line')
            .attr('class', 'vertical-line')
            .attr('y1', 0)
            .attr('y2', height)
            .attr('stroke', '#FF6347')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3');

        // Mouse overlay for interactivity
        chart
            .append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseover', () => {
                focus.style('display', null);
                tooltip.style('opacity', 0.9);
            })
            .on('mouseout', () => {
                focus.style('display', 'none');
                tooltip.transition().duration(500).style('opacity', 0);
            })
            .on('mousemove', function (event) {
                const [mouseX, mouseY] = d3.pointer(event);
                const x0 = xScale.invert(mouseX);
                const bisect = d3.bisector<YearlyData, number>((d) => d.year).left;
                const index = bisect(data, x0);
                const d0 = data[index - 1];
                const d1 = data[index];
                let closestData: YearlyData | null = null;
                if (d0 && d1) {
                    closestData = x0 - d0.year > d1.year - x0 ? d1 : d0;
                } else {
                    closestData = d0 || d1 || null;
                }
                if (closestData) {
                    const cx = xScale(closestData.year);
                    const cy = yScale(closestData.earnings);
                    focus.select('.vertical-line').attr('x1', cx).attr('x2', cx);
                    tooltip
                        .html(`${closestData.year}년<br/>₩${closestData.earnings.toLocaleString()}원`)
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 28}px`);
                }
            })
            .on('click', function (event) {
                const [mouseX] = d3.pointer(event);
                const x0 = xScale.invert(mouseX);
                const bisect = d3.bisector<YearlyData, number>((d) => d.year).left;
                const index = bisect(data, x0);
                const d0 = data[index - 1];
                const d1 = data[index];
                let closestData: YearlyData | null = null;
                if (d0 && d1) {
                    closestData = x0 - d0.year > d1.year - x0 ? d1 : d0;
                } else {
                    closestData = d0 || d1 || null;
                }
                if (closestData) {
                    onYearSelect(closestData.year);
                }
            });

        // Highlight selected data point
        chart.selectAll('.selected-dot').remove();
        if (selectedYear !== null) {
            const dataPoint = data.find(d => d.year === selectedYear);
            if (dataPoint) {
                chart
                    .append('circle')
                    .attr('class', 'selected-dot')
                    .attr('cx', xScale(dataPoint.year))
                    .attr('cy', yScale(dataPoint.earnings))
                    .attr('r', 8)
                    .attr('fill', '#FF6347') // Tomato color for selection
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .transition()
                    .duration(300)
                    .attr('r', 10);
            }
        }

        // Optional: Add a color legend
        // Define legend dimensions
        const legendWidth = 200;
        const legendHeight = 10;

        // Create a group for the legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${margin.left}, ${margin.top - 30})`);

        // Define a gradient for the legend
        const legendDefs = legend.append('defs');
        const legendGradient = legendDefs.append('linearGradient')
            .attr('id', 'legend-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%'); // Horizontal gradient

        legendGradient.selectAll('stop')
            .data([
                { offset: '0%', color: '#ADD8E6' }, // Pastel Sky Blue
                { offset: '100%', color: '#F08080' }, // Pastel Coral
            ])
            .enter()
            .append('stop')
            .attr('offset', (d) => d.offset)
            .attr('stop-color', (d) => d.color);

        // Append a rectangle and fill it with the gradient
        legend.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#legend-gradient)');

        // Define the scale for the legend
        const legendScale = d3.scaleLinear()
            .domain([minEarning, maxEarning])
            .range([0, legendWidth]);

        // Define the axis for the legend
        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5)
            .tickFormat(d3.format('~s')); // Format ticks appropriately

        // Append the axis to the legend
        legend.append('g')
            .attr('transform', `translate(0, ${legendHeight})`)
            .call(legendAxis)
            .selectAll('text')
            .style('fill', '#666')
            .style('font-size', '10px');

        // Tooltip cleanup on unmount
        return () => {
            tooltip.remove();
        };
    }, [data, selectedYear, onYearSelect]);

    return <svg ref={svgRef} width="100%" height="500"></svg>;
};

export default RevenueChart;