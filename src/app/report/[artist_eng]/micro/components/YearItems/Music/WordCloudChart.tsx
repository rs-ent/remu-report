import React, { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import cloud, { Word as CloudWord } from 'd3-cloud';
import { FaCloud } from 'react-icons/fa';
import './WordCloudChart.css';

interface Word {
  text: string;
  value: number;
}

interface WordCloudChartProps {
  words: Word[];
}

// 'CustomCloudWord' 인터페이스 정의
interface CustomCloudWord extends Omit<CloudWord, 'text'> {
  text: string; // 'text'를 필수로 재정의
  size: number; // 'size'를 필수로 정의
}

const WordCloudChart: React.FC<WordCloudChartProps> = ({ words }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  /**
   * 단어 데이터를 필터링하고 상위 N개의 단어를 선택하는 함수
   * @param rawData 단어 데이터 배열
   * @param topN 상위 N개의 단어 수
   * @returns 필터링되고 정렬된 단어 배열
   */
  const aggregateAndFilterWords = (
    rawData: Word[],
    topN: number
  ): Word[] => {
    return rawData
      .sort((a, b) => b.value - a.value) // 빈도수 내림차순 정렬
      .slice(0, topN); // 상위 N개 단어 선택
  };

  /**
   * useMemo를 사용하여 단어 데이터를 필터링하고 메모이제이션
   */
  const topWords = useMemo(() => {
    return aggregateAndFilterWords(words, 200); // 상위 200개 단어 선택
  }, [words]);

  useEffect(() => {
    if (!svgRef.current) return;

    // SVG 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 800;

    // 폰트 크기 스케일 정의
    const fontSizeScale = d3.scaleLinear()
      .domain([
        d3.min(topWords, d => d.value) || 1,
        d3.max(topWords, d => d.value) || 100
      ])
      .range([10, 100]); // 필요에 따라 범위 조정

    // 랜덤 색상 생성 함수
    const getRandomColor = (): string => {
      const scheme = d3.schemeCategory10;
      const randomIndex = Math.floor(Math.random() * scheme.length);
      return scheme[randomIndex] ?? '#000'; // '??'를 사용하여 'undefined'인 경우 '#000' 반환
    };

    /**
     * 워드클라우드 렌더링 함수
     * @param words 레이아웃 계산이 완료된 단어 배열
     */
    const draw = (words: CustomCloudWord[]) => {
      svg
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet') // 반응형 설정
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        .selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-size', d => `${d.size}px`)
        .style('font-family', 'Impact')
        .style('fill', () => getRandomColor()) // 항상 string을 반환
        .each(function () {
          const currentColor = d3.select(this).style('fill');
          d3.select(this).attr('data-original-color', currentColor);
        })
        .attr('text-anchor', 'middle')
        .attr('transform', d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text(d => d.text || "") // 'text'가 undefined일 경우 빈 문자열 반환
        .on('mouseover', function () {
          d3.select(this).style('fill', 'red');
        })
        .on('mouseout', function () {
          const originalColor = d3.select(this).attr('data-original-color');
          d3.select(this).style('fill', originalColor);
        });
    };

    // 단어를 'CustomCloudWord'로 매핑
    const mappedWords: CustomCloudWord[] = topWords.map(d => ({
      text: d.text, // 'text'는 항상 string이어야 함
      size: fontSizeScale(d.value), // 'size'는 number로 정의
    })) as CustomCloudWord[];

    const layout = cloud<CustomCloudWord>()
      .size([width, height])
      .words(mappedWords)
      .padding(5)
      .rotate(() => (Math.floor(Math.random() * 6) - 3) * 15) // -45도에서 +45도 사이로 회전
      .font('Impact')
      .fontSize((d: CustomCloudWord) => d.size) // 'size'는 항상 number
      .on('end', draw);

    layout.start();

  }, [topWords]);

  return (
    <div className="mt-6 word-cloud-container">
      <h6 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
        <FaCloud className="mr-2 text-blue-500" />
        사용자 평가 워드클라우드
      </h6>
      <svg ref={svgRef} aria-label="Word Cloud">
        <title>Word Cloud Visualization</title>
        <desc>A word cloud representing user evaluations.</desc>
      </svg>
    </div>
  );
};

export default WordCloudChart;