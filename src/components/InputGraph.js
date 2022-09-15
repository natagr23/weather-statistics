//await response.json() graph xy

//https://observablehq.com/@d3/line-with-tooltip

//https://github.com/jgs982/react-d3js/blob/main/src/App.js
//data-canvas-sense-your-city-one-week
//react data = await d3       .json(

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';

const InputGraph = () => {
  const [gdpData, setGdpData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
      );
      const data = await response.json();
      setGdpData(data.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <BarChart
        data={gdpData}
        height={500}
        widthBar={4}
        width={gdpData.length * 4}
      />
    </div>
  );
};

function BarChart({ data, height, width, widthBar }) {
  React.useEffect(() => {
    createBarChart();
  }, [data]);

  const createBarChart = () => {
    const gdp = data.map((gdp) => gdp[1]);
    const year = data.map((year) => year[0]);
    console.log(gdp);
    console.log(year);

    const gdpMax = d3.max(gdp);
    const yScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height]);

    let yAxisScale = d3.scaleLinear().domain([0, gdpMax]).range([height, 0]);
    let yAxis = d3.axisLeft(yAxisScale);

    let tooltip = d3
      .select('.visMolder')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    d3.select('svg').selectAll('rect').data(gdp).enter().append('rect');
    d3.select('svg')
      .selectAll('rect')
      .data(gdp)
      .style('fill', 'green')
      .attr('x', (d, i) => 55 + i * widthBar)
      .attr('y', (d) => height - yScale(d))
      .attr('height', (d, i) => yScale(d))
      .attr('width', widthBar)
      .on('mouseover', (d, i) => {
        tooltip.style('opacity', 0.9);
        tooltip
          .html(
            'Year: ' +
              year[i].substring(0, 4) +
              '<br/> Month: ' +
              year[i].substring(5, 7) +
              '<br/> GDP: ' +
              d
          )
          .style('left', i * widthBar + 20 + 'px')
          .style('top', height + 'px');
      });

    d3.select('svg')
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(55,0)')
      .style('font-color', 'white');
  };

  return (
    <>
      <Box>
        <svg width={width} height={height}></svg>
      </Box>
    </>
  );
}

export default InputGraph;
