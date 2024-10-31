import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { ProcessedData } from '../../app/report/[artist_eng]/macro/MarketGrowth';
import './MarketGrowthChart.css';

interface GrowthRate {
  date: string;
  totalGrowth: number;
  totalSales: number;
}

interface Props {
  data: ProcessedData[];
}

const MarketGrowthChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Resize observer to make chart responsive
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      let { width } = entries[0].contentRect;
      if (width > 600) width = 600;
      setDimensions({ width, height: 400 });
    });

    if (svgRef.current && svgRef.current.parentElement) {
      resizeObserver.observe(svgRef.current.parentElement);
    }

    return () => {
      if (svgRef.current && svgRef.current.parentElement) {
        resizeObserver.unobserve(svgRef.current.parentElement);
      }
    };
  }, []);

  const growthRates: GrowthRate[] = useMemo(() => {
    if (!data || data.length === 0) return [];

    // 데이터 정렬
    const sortedData = [...data].sort((a, b) => d3.ascending(a.date, b.date));

    const growthRates: GrowthRate[] = [];

    for (let i = 1; i < sortedData.length; i++) {
      const current = sortedData[i];

      const salesGrowth = current.salesGrowth;

      growthRates.push({
        date: current.date,
        totalGrowth: salesGrowth,
        totalSales: current.averageSales,
      });
    }

    console.log("Growth Rate: ", growthRates);
    return growthRates;
  }, [data]);

  // 한국어 숫자 단위 포맷팅 함수
  const formatKoreanNumber = (value: number): string => {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(1) + '조';
    } else if (value >= 1e8) {
      return (value / 1e8).toFixed(1) + '억';
    } else if (value >= 1e7) {
      return (value / 1e7).toFixed(1) + '천만';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + '백만';
    } else if (value >= 1e5) {
      return (value / 1e5).toFixed(1) + '십만';
    } else if (value >= 1e4) {
      return (value / 1e4).toFixed(1) + '만';
    } else {
      return value.toString();
    }
  };

  useEffect(() => {
    if (!svgRef.current || growthRates.length === 0) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    const customMargin = { top: 20, right: 60, bottom: 35, left: 40 };

    // 색상 설정
    const colors = {
      background: 'transparent',
      grid: '#e0e0e0',
      growthLine: '#ff6b6b',
      salesBar: '#81afd4',
      axis: '#333333',
      tooltipBg: '#ffffff',
      tooltipText: '#333333',
    };

    // 스케일 설정
    const x = d3
      .scaleBand<string>()
      .domain(growthRates.map((d) => d.date))
      .range([customMargin.left, width - customMargin.right])
      .padding(0.1);

    const minGrowth = d3.min(growthRates, (d) => d.totalGrowth) ?? -20;
    const yGrowth = d3
      .scaleLinear()
      .domain([
        Math.min(minGrowth - 5, -30),
        d3.max(growthRates, (d) => d.totalGrowth)! + 5,
      ])
      .nice()
      .range([height - customMargin.bottom, customMargin.top]);

    const ySales = d3
      .scaleLinear()
      .domain([0, d3.max(growthRates, (d) => d.totalSales * 1.1)!])
      .nice()
      .range([height - customMargin.bottom, customMargin.top]);

    // 초기화
    svg.selectAll('*').remove();

    // 배경 설정
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', colors.background);

    // 그리드 추가
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,0)`)
      .call(
        d3
          .axisLeft(yGrowth)
          .ticks(5)
          .tickSize(-width + customMargin.left + customMargin.right)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', colors.grid)
      .attr('transform', `translate(${customMargin.left},0)`);

    // X축
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height - customMargin.bottom})`)
      .call(d3.axisBottom(x));

    xAxis
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.1em');

    // Y축 (Growth Rate)
    svg
      .append('g')
      .attr('transform', `translate(${customMargin.left},0)`)
      .call(
        d3
          .axisLeft(yGrowth)
          .ticks(5)
          .tickFormat((d) => `${d}%`)
      );

    // Y축 (Sales) - 한국어 단위 적용
    svg
      .append('g')
      .attr('transform', `translate(${width - customMargin.right},0)`)
      .call(
        d3
          .axisRight(ySales)
          .ticks(5)
          .tickFormat((d) => formatKoreanNumber(d as number))
      );

    // 바 차트 추가 (Sales)
    svg
      .selectAll('.bar')
      .data(growthRates)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.date)!)
      .attr('width', x.bandwidth())
      .attr('y', (d) => ySales(0))
      .attr('height', 0)
      .attr('fill', colors.salesBar)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', d3.rgb(colors.salesBar).darker(1).toString());
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>Sales: ${formatKoreanNumber(
              d.totalSales
            )}원<br/>Growth Rate: ${d.totalGrowth.toFixed(2)}%`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', colors.salesBar);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('y', (d) => ySales(d.totalSales))
      .attr('height', (d) => height - customMargin.bottom - ySales(d.totalSales));

    // 라인 추가 (Growth Rate)
    const line = d3
      .line<GrowthRate>()
      .x((d) => x(d.date)! + x.bandwidth() / 2)
      .y((d) => yGrowth(d.totalGrowth))
      .curve(d3.curveMonotoneX);

    svg
      .append('path')
      .datum(growthRates)
      .attr('fill', 'none')
      .attr('stroke', colors.growthLine)
      .attr('stroke-width', 3)
      .attr('d', line);

    // 점 추가 (Growth Rate)
    svg
      .selectAll('.dot')
      .data(growthRates)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => x(d.date)! + x.bandwidth() / 2)
      .attr('cy', (d) => yGrowth(d.totalGrowth))
      .attr('r', 0)
      .attr('fill', colors.growthLine)
      .on('mouseover', function (event, d) {
        d3.select(this).transition().duration(200).attr('r', 8);
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>Growth Rate: ${d.totalGrowth.toFixed(
              2
            )}%<br/>Sales: ${formatKoreanNumber(d.totalSales)}원`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).transition().duration(200).attr('r', 5);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('r', 5);

    // 툴팁 설정
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('opacity', 0);

    // 차트 제목
    /*
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', customMargin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('class', 'chart-title')
      .text('시장 성장률 및 매출 추이');*/

    // 클린업 함수
    return () => {
      svg.selectAll('*').remove();
      tooltip.remove();
    };
  }, [growthRates, dimensions]);

  return (
    <div className="chart-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MarketGrowthChart;
