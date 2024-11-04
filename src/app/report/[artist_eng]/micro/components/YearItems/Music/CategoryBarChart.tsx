// src/components/CategoryBarChart.tsx

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { FaChartBar } from 'react-icons/fa';
import './CategoryBarChart.css';

interface CategoryBarChartProps {
  data: { category: string; count: number }[];
}

const CategoryBarChart: React.FC<CategoryBarChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 20, bottom: 50, left: 60 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // X축 스케일
    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([0, width])
      .padding(0.2);

    // Y축 스케일
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)!])
      .nice()
      .range([height, 0]);

    // X축 추가
    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'rotate(-40)')
      .style('text-anchor', 'end');

    // Y축 추가
    g.append('g')
      .call(d3.axisLeft(y));

    // 바 추가
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.category)!)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.count))
      .attr('fill', '#3b82f6')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#2563eb');
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(`<strong>${d.category}</strong><br/>빈도: ${d.count}`)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', '#3b82f6');
        tooltip.transition().duration(500).style('opacity', 0);
      });

    // Tooltip 생성
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip-bar-chart')
      .style('position', 'absolute')
      .style('background', '#fff')
      .style('padding', '5px 10px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    // Cleanup 함수
    return () => {
      tooltip.remove();
    };
  }, [data]);

  return (
    <div className="mt-6">
      <h6 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
        <FaChartBar className="mr-2 text-blue-500" />
        카테고리별 키워드 빈도
      </h6>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CategoryBarChart;