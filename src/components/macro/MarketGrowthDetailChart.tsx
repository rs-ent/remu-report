// src/components/macro/MarketGrowthDetailChart.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { ProcessedData } from '../../app/report/[artist_eng]/macro/MarketGrowth';
import './MarketGrowthDetailChart.css';

interface Props {
  data: ProcessedData[];
  title: string;
}

const MarketGrowthDetailChart: React.FC<Props> = ({ data, title }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  // Resize observer를 사용하여 차트를 반응형으로 만듭니다.
  useEffect(() => {
    const handleResize = () => {
      const parent = svgRef.current?.parentElement;
      if (parent) {
        const width = parent.clientWidth > 800 ? 800 : parent.clientWidth;
        setDimensions({ width, height: 300 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 호출

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 데이터 준비
  const processedData = useMemo(() => {
    return data.map(d => ({
      date: d.date,
      musicSales: d.averageMusicSales,
      musicGrowth: d.musicSalesGrowth,
      contentsSales: d.averageContentsSales,
      contentsGrowth: d.contentsSalesGrowth,
      managementSales: d.averageManagementSales,
      managementGrowth: d.managementSalesGrowth,
    }));
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
    if (!svgRef.current || processedData.length === 0) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    const margin = { top: 40, right: 80, bottom: 45, left: 60 };

    // 색상 설정
    const colors = {
      musicSales: '#ffab00',
      contentsSales: '#00c853',
      managementSales: '#d500f9',
      musicGrowth: '#ff6b6b',
      contentsGrowth: '#00acc1',
      managementGrowth: '#8e24aa',
      grid: '#e0e0e0',
      axis: '#333333',
      tooltipBg: '#ffffff',
      tooltipText: '#333333',
    };

    // 스케일 설정
    const x = d3
      .scaleBand<string>()
      .domain(processedData.map(d => d.date))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const ySales = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(processedData, d => Math.max(d.musicSales, d.contentsSales, d.managementSales))! * 1.1,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const yGrowth = d3
      .scaleLinear()
      .domain([
        d3.min(processedData, d => Math.min(d.musicGrowth, d.contentsGrowth, d.managementGrowth))! - 5,
        d3.max(processedData, d => Math.max(d.musicGrowth, d.contentsGrowth, d.managementGrowth))! + 5,
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // 초기화
    svg.selectAll('*').remove();

    // 배경 설정
    svg
      .attr('width', width)
      .attr('height', height)
      .style('background', 'transparent');

    // 그리드 추가 (Sales)
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(ySales)
          .ticks(5)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', colors.grid);

    // X축
    const xAxis = svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    xAxis
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')
      .attr('dx', '-0.5em')
      .attr('dy', '0.1em');

    // Y축 (Sales)
    svg
      .append('g')
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(
        d3
          .axisRight(ySales)
          .ticks(5)
          .tickFormat(d => formatKoreanNumber(d as number))
      );

    // Y축 (Growth Rate)
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3
          .axisLeft(yGrowth)
          .ticks(5)
          .tickFormat(d => `${d}%`)
      );

    // 바 차트 추가 (매출)
    svg
      .selectAll('.bar-music')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar-music')
      .attr('x', d => x(d.date)!)
      .attr('width', x.bandwidth() / 3)
      .attr('y', ySales(0))
      .attr('height', 0)
      .attr('fill', colors.musicSales)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', d3.rgb(colors.musicSales).darker(1).toString());
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>음원/음반 : ${formatKoreanNumber(d.musicSales)}원`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', colors.musicSales);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('y', d => ySales(d.musicSales))
      .attr('height', d => height - margin.bottom - ySales(d.musicSales));

    svg
      .selectAll('.bar-contents')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar-contents')
      .attr('x', d => x(d.date)! + x.bandwidth() / 3)
      .attr('width', x.bandwidth() / 3)
      .attr('y', ySales(0))
      .attr('height', 0)
      .attr('fill', colors.contentsSales)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', d3.rgb(colors.contentsSales).darker(1).toString());
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>공연/콘텐츠 : ${formatKoreanNumber(d.contentsSales)}원`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', colors.contentsSales);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('y', d => ySales(d.contentsSales))
      .attr('height', d => height - margin.bottom - ySales(d.contentsSales));

    svg
      .selectAll('.bar-management')
      .data(processedData)
      .enter()
      .append('rect')
      .attr('class', 'bar-management')
      .attr('x', d => x(d.date)! + (2 * x.bandwidth()) / 3)
      .attr('width', x.bandwidth() / 3)
      .attr('y', ySales(0))
      .attr('height', 0)
      .attr('fill', colors.managementSales)
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', d3.rgb(colors.managementSales).darker(1).toString());
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>출연료/초상권 : ${formatKoreanNumber(d.managementSales)}원`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', colors.managementSales);
        tooltip.style('opacity', 0);
      })
      .transition()
      .duration(800)
      .attr('y', d => ySales(d.managementSales))
      .attr('height', d => height - margin.bottom - ySales(d.managementSales));

    // 성장률 라인 차트
    const lineMusic = d3
      .line<{ date: string; musicGrowth: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2)
      .y(d => yGrowth(d.musicGrowth))
      .curve(d3.curveMonotoneX);

    const lineContents = d3
      .line<{ date: string; contentsGrowth: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2)
      .y(d => yGrowth(d.contentsGrowth))
      .curve(d3.curveMonotoneX);

    const lineManagement = d3
      .line<{ date: string; managementGrowth: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2)
      .y(d => yGrowth(d.managementGrowth))
      .curve(d3.curveMonotoneX);

    // 음악 성장률 라인
    svg
      .append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', colors.musicGrowth)
      .attr('stroke-width', 2)
      .attr('d', lineMusic);

    // 콘텐츠 성장률 라인
    svg
      .append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', colors.contentsGrowth)
      .attr('stroke-width', 2)
      .attr('d', lineContents);

    // 관리 성장률 라인
    svg
      .append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', colors.managementGrowth)
      .attr('stroke-width', 2)
      .attr('d', lineManagement);

    // 성장률 데이터 포인트에 원(circle) 추가
    svg.selectAll('.dot-music')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('class', 'dot-music')
      .attr('cx', d => x(d.date)! + x.bandwidth() / 2)
      .attr('cy', d => yGrowth(d.musicGrowth))
      .attr('r', 4)
      .attr('fill', colors.musicGrowth)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 6);
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>음원/음반 성장률: ${d.musicGrowth.toFixed(2)}%`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        tooltip.style('opacity', 0);
      });

    svg.selectAll('.dot-contents')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('class', 'dot-contents')
      .attr('cx', d => x(d.date)! + x.bandwidth() / 2)
      .attr('cy', d => yGrowth(d.contentsGrowth))
      .attr('r', 4)
      .attr('fill', colors.contentsGrowth)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 6);
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>공연/콘텐츠 성장률: ${d.contentsGrowth.toFixed(2)}%`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        tooltip.style('opacity', 0);
      });

    svg.selectAll('.dot-management')
      .data(processedData)
      .enter()
      .append('circle')
      .attr('class', 'dot-management')
      .attr('cx', d => x(d.date)! + x.bandwidth() / 2)
      .attr('cy', d => yGrowth(d.managementGrowth))
      .attr('r', 4)
      .attr('fill', colors.managementGrowth)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('r', 6);
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${d.date}</strong><br/>출연료/초상권 성장률: ${d.managementGrowth.toFixed(2)}%`
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('r', 4);
        tooltip.style('opacity', 0);
      });

    // 툴팁 설정
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'chart-tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background', colors.tooltipBg)
      .style('color', colors.tooltipText)
      .style('padding', '8px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');

    // 클린업 함수
    return () => {
      svg.selectAll('*').remove();
      tooltip.remove();
    };
  }, [processedData, dimensions]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">{title}</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MarketGrowthDetailChart;
