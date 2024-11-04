import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './PieChart.css';

interface EarningsData {
  category: string;
  amount: number;
}

interface Props {
  data: EarningsData[];
}

const PieChart: React.FC<Props> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;
    
        // SVG 초기화
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();
    
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
    
        // 색상 스케일
        const color = d3.scaleOrdinal<string>()
          .domain(data.map(d => d.category))
          .range(['#3b82f6', '#a855f7', '#f97316']);
    
        // Pie와 Arc 생성
        const pie = d3.pie<EarningsData>()
          .value(d => d.amount)
          .sort(null);
    
        const arc = d3.arc<d3.PieArcDatum<EarningsData>>()
          .innerRadius(radius * 0.5) // 도넛형 차트
          .outerRadius(radius * 0.8);
    
        const outerArc = d3.arc<d3.PieArcDatum<EarningsData>>()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);
    
        const g = svg
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
        // 차트 그리기
        const path = g.selectAll('path')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('d', arc as any)
          .attr('fill', d => color(d.data.category))
          .attr('stroke', 'white')
          .attr('stroke-width', '2px');
    
        // 애니메이션
        path.transition()
          .duration(1000)
          .attrTween('d', function (d) {
            const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function (t) {
              return arc(i(t)) as string;
            };
          });
    
        // 텍스트 라벨
        const text = g.selectAll('text')
          .data(pie(data))
          .enter()
          .append('text')
          .attr('dy', '0.35em')
          .text(d => `${d.data.category}: ${((d.data.amount / d3.sum(data, d => d.amount)) * 100).toFixed(1)}%`);
    
        function midAngle(d: d3.PieArcDatum<EarningsData>) {
          return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }
    
        text.transition()
          .duration(1000)
          .attrTween('transform', function (d) {
            const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function (t) {
              const d2 = i(t);
              const pos = outerArc.centroid(d2);
              const angle = midAngle(d2) < Math.PI ? 'start' : 'end';
              pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
              return `translate(${pos})`;
            };
          })
          .styleTween('text-anchor', function (d) {
            const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return function (t) {
              const d2 = i(t);
              return midAngle(d2) < Math.PI ? 'start' : 'end';
            };
          });
          
        // 라인 생성
        g.selectAll('polyline')
            .data(pie(data))
            .enter()
            .append('polyline')
            .attr('stroke', 'gray')
            .attr('stroke-width', 1)
            .attr('fill', 'none')
            .transition()
            .duration(1000)
            .attrTween('points', function (this: SVGPolylineElement, d: d3.PieArcDatum<EarningsData>) {
                const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return (t: number) => {
                    const d2 = i(t);
                    const pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);

                    const points = [arc.centroid(d2), outerArc.centroid(d2), pos];
                    // 좌표 배열을 문자열로 변환
                    return points.map(point => point.join(',')).join(' ');
                };
            });
    
    }, [data]);

    return (
        <div className="pie-chart-container">
          <svg ref={svgRef}></svg>
        </div>
    );
};

export default PieChart;