import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import station_21209920 from '../data/0021209920Hobs.json';

const InputGraph = () => {
  const [data, setData] = useState(null);
  const svgRef = useRef(null);

  const margin = { top: 40, right: 30, bottom: 50, left: 80 },
    width = 800,
    height = 400;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/natagr23/weather-statistics/main/src/data/0021209920Hobs.json'
      );
      const data1 = await response.json();
      setData(data1);
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const data1 = station_21209920;
  // setData(station_21209920);

  // console.log(data);
  console.log(data);
  if (data) {
    const dataset = data.obs.data;
    console.log(dataset);
    let yearsDate = dataset.map(function (item) {
      return new Date(item[0]);
    });
    // console.log(JSON.stringify(yearsDate));
    // console.log(yearsDate);
    let maxDate = new Date(d3.max(yearsDate));
    let minDate = new Date(yearsDate[0]);
    console.log(minDate);
    console.log(maxDate);

    let xAxisScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, width]);

    let yAxisScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d[1];
        }),
      ])
      .range([height, 0]);

    const xAxis = d3.axisBottom(xAxisScale);
    const yAxis = d3.axisLeft(yAxisScale);

    const tooltip = d3
      .select('body')
      .append('div')

      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('padding', '4px')
      .style('background', '#fff')
      .style('border', '1px solid #000');

    const mouseoverHandler = (d, data) => {
      // console.log(data);
      tooltip.style('opacity', 0.8);
      tooltip

        .html(
          // "<p> Date: " + data[0] + "</p>" + "<p> Billions: $" + data[1] + "</p>"
          `<p> Date: ${data[0]}</p> <p>Levels: ${data[1]}m</p>`
        )
        .attr('data-date', data[0])
        .attr('data-levels', data[1]);

      d3.select(this).style('opacity', 0.1);
    };

    const mouseoutHandler = (d) => {
      tooltip.style('opacity', 0);
      d3.select('opacity', 1);
    };

    const mouseMoving = (d) => {
      const mouse = d3.pointer(d);
      tooltip
        .style('top', mouse[1] + 80 + 'px')
        .style('left', mouse[0] + 80 + 'px');

      d3.select(this).style('opacity', 0.8);
    };

    const svgEl = d3.select(svgRef.current);

    const svg =
      //  d3.select("#barGraph")
      svgEl
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .attr('class', 'bar-chart-svg-component')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg
      .selectAll('bar')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('data-date', function (d, i) {
        // console.log(d[0]);
        return d[0];
      })
      .attr('data-levels', (d, i) => {
        return d[1];
      })
      .attr('class', 'bar')
      .style('fill', 'darkblue')

      .attr('x', (d, i) => i * (width / dataset.length))
      .attr('y', (d) => yAxisScale(d[1]))
      .attr('width', width / dataset.length)
      .attr('height', (d) => height - yAxisScale(d[1]))
      .on('mouseover', mouseoverHandler)
      .on('mousemove', mouseMoving)
      .on('mouseout', mouseoutHandler);

    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis);

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -120)
      .attr('y', 20)
      .text('Observed level (in m)');

    svg
      .append('g')
      .attr('id', 'y-axis')
      .attr('class', 'y axis')

      .call(yAxis);
    // }, []);
  }
  return (
    <div className="bar-container">
      <h1 className="bar-title">Chart: IDEAM 2120992 Station River</h1>
      <svg
        className="bar-svg"
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height * 1.5}
      />
    </div>
  );
};
export default InputGraph;
