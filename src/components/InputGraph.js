//await response.json() graph xy

//https://observablehq.com/@d3/line-with-tooltip

//https://github.com/jgs982/react-d3js/blob/main/src/App.js
//data-canvas-sense-your-city-one-week
//react data = await d3       .json(

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';

const InputGraph = () => {
  const [data, setData] = React.useState([]);

  const width = 800;
  const height = 400;
  const padding = 80;
  const barWidth = width / 275;

  React.useEffect(() => {
    try {
      fetch(
        'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result.data);
          //console.log("running");
          console.log(result.data);
        });
    } catch (e) {
      //console.log("error");
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    //console.log("data");
    if (data !== null) {
      creatingBarChart();
    }
  }, [data]);

  const creatingBarChart = () => {
    var svgArea = d3
      .select('#bar-chart')
      .append('svg')
      .attr('height', height + padding)
      .attr('width', width + padding);

    svgArea
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -200)
      .attr('y', 60)
      .text('Gross Domestic Product');

    var yearsDate = data.map((item) => new Date(item[0]));

    var xMax = new Date(d3.max(yearsDate));
    //xMax.setMonth(xMax.getMonth() + 3);

    //defining a scale for x axis
    var xScale = d3
      .scaleTime()
      .domain([d3.min(yearsDate), xMax])
      .range([0, width]);

    var xAxis = d3.axisBottom().scale(xScale);

    svgArea
      .append('g')
      .call(xAxis) //.call(xAxis.ticks(d3.timeYear))
      .attr(
        'transform',
        'translate(' + padding / 2 + ',' + (height + padding / 2) + ')'
      )
      .attr('id', 'x-axis');

    let yMax = d3.max(data, (d) => d[1]);

    let yScale = d3.scaleLinear().domain([0, yMax]).range([0, height]);

    let yAxisScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    let yAxis = d3.axisLeft().scale(yAxisScale);

    svgArea
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding / 2 + ', ' + padding / 2 + ')');

    let svgData = svgArea
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return i * barWidth + padding / 2;
      })
      .attr('y', (d) => {
        return height + padding / 2 - yScale(d[1]);
      })
      .attr('width', barWidth)
      .attr('height', (d) => {
        return yScale(d[1]) + 'px';
      })
      .attr('class', 'bar')
      .attr('data-date', (d) => {
        return d[0];
      })
      .attr('data-gdp', (d) => {
        return d[1];
      });

    var tooltip = d3
      .select('#bar-chart')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    const mouseover = (event, d) => {
      tooltip.style('opacity', 0.8);
      tooltip.html(d[0] + '<br>' + '$' + d[1] + ' Billion');

      var i;

      data.forEach((item, index) => {
        if (item === d) {
          i = index;
        }
      });

      tooltip
        .style('left', padding + i * barWidth + 'px')
        .style('top', height - 100 + 'px')
        .attr('data-date', d[0]);
    };

    const mouseout = () => {
      tooltip.style('opacity', 0);
    };

    svgData.on('mouseover', mouseover).on('mouseout', mouseout);

    return (
      <>
        <div>
          <div id="main">
            <div id="container">
              <div id="title">United State GDP</div>
              <div id="bar-chart"></div>
            </div>
          </div>
        </div>
      </>
    );
  };
};

export default InputGraph;
