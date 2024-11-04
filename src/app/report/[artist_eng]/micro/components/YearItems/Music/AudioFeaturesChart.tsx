import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { SongData } from '@/utils/fetchSongs';
import { FaChartLine } from 'react-icons/fa';
import './AudioFeaturesChart.css';

interface AudioFeaturesChartProps {
  songs: SongData[];
}

type AudioFeature = keyof SongData['spotify_audio_features'];

const AudioFeaturesChart: React.FC<AudioFeaturesChartProps> = ({ songs }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // 필수 audio features 선택
    const features: AudioFeature[] = [
      'danceability',
      'energy',
      'valence',
      'acousticness',
      'instrumentalness',
      'liveness',
      'speechiness',
    ];

    // 데이터 가공: 각 곡의 features 평균값 계산
    const avgFeatures: Record<AudioFeature, number> = {} as Record<AudioFeature, number>;
    features.forEach((feature) => {
      avgFeatures[feature] = d3.mean(songs, (d) => d.spotify_audio_features[feature]) || 0;
    });

    // 차트 설정
    const width = 400;
    const height = 400;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // 스케일 설정
    const scale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 1]);

    // 각도 계산
    const angleSlice = (Math.PI * 2) / features.length;

    // Radar Line Generator
    const radarLine = d3.lineRadial<number>()
      .radius((d) => scale(d))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // 데이터 배열
    const dataValues = features.map((feature) => avgFeatures[feature]);

    // 배경 원 그리기
    const levels = 5;
    for (let level = 0; level < levels; level++) {
      const r = (radius / levels) * (level + 1);
      g.append('circle')
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#CDCDCD')
        .attr('stroke-width', 0.5);
    }

    // Feature 이름 표시
    g.selectAll('.axisLabel')
      .data(features)
      .enter()
      .append('text')
      .attr('x', (d, i) => scale(1.1) * Math.cos(i * angleSlice - Math.PI / 2))
      .attr('y', (d, i) => scale(1.1) * Math.sin(i * angleSlice - Math.PI / 2))
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', '#737373')
      .text((d) => d.charAt(0).toUpperCase() + d.slice(1));

    // 레이더 차트 그리기
    g.append('path')
      .datum(dataValues)
      .attr('d', radarLine)
      .attr('fill', '#3b82f6')
      .attr('fill-opacity', 0.5)
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2);

    // 레이더 포인트 그리기
    g.selectAll('.radarCircle')
      .data(dataValues)
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 4)
      .attr('cx', (d, i) => scale(d) * Math.cos(i * angleSlice - Math.PI / 2))
      .attr('cy', (d, i) => scale(d) * Math.sin(i * angleSlice - Math.PI / 2))
      .attr('fill', '#3b82f6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .on('mouseover', function (this: SVGCircleElement, event: MouseEvent, d: number) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);
      })
      .on('mouseout', function (this: SVGCircleElement, event: MouseEvent, d: number) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 4);
      });

    // Tooltip 생성
    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip-audio-features')
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
  }, [songs]);

  return (
    <div className="mt-6">
      <h6 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
        <FaChartLine className="mr-2 text-blue-500" />
        음악적 특징
      </h6>
      <svg ref={svgRef} width="400" height="400"></svg>
    </div>
  );
};

export default AudioFeaturesChart;