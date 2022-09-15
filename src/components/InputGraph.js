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

    let width = 800,
      height = 400,
      barWidth = width / 275;

    //this is the little box than comes up when you put your mouse
    let tooltip = d3
      .select('.visHolder')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    //this is the white bar that covers the blue line your are on
    let overlay = d3
      .select('.visHolder')
      .append('div')
      .attr('class', 'overlay')
      .style('opacity', 0);

    //this is the main svg container
    let svgContainer = d3
      .select('.visHolder')
      .append('svg')
      .attr('width', width + 100)
      .attr('height', height + 60);

    //here json will fetch data which it will pass into the function
    d3.json(
      'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json',
      function (data) {
        //adding the text for 'Gross Domestic Product'
        svgContainer
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -200)
          .attr('y', 80)
          .text('Gross Domestic Product');

        //adding text for more info at the bottom
        svgContainer
          .append('text')
          .attr('x', width / 2 + 120)
          .attr('y', height + 50)
          .text(
            'More Information: http://www.bea.gov/national/pdf/nipaguid.pdf'
          )
          .attr('class', 'info');

        //here item is every is each array with date and gdp
        let years = data.data.map(function (item) {
          let quarter;

          //temp is the month(there are only 4 months so 4 quaters)
          let temp = item[0].substring(5, 7);

          if (temp === '01') {
            quarter = 'Q1';
          } else if (temp === '04') {
            quarter = 'Q2';
          } else if (temp === '07') {
            quarter = 'Q3';
          } else if (temp === '10') {
            quarter = 'Q4';
          }

          // so years returns the date and the quarter
          return item[0].substring(0, 4) + ' ' + quarter;
        });

        //get eah date in the formal format
        let yearsDate = data.data.map(function (item) {
          return new Date(item[0]);
        });

        // xMax is the last date
        let xMax = new Date(d3.max(yearsDate));

        //not sure about this line adding-removing it doesnt do much
        xMax.setMonth(xMax.getMonth() + 3);

        // scaleTIme() alligns the different dates with a scale of time
        // so domain is the min year from yearsDate (above) and xMax is the maxDate(above)
        let xScale = d3
          .scaleTime()
          .domain([d3.min(yearsDate), xMax])
          .range([0, width]);

        //for the bottom xAxis scaled to x
        let xAxis = d3.axisBottom().scale(xScale);

        // appending the xAxis to the svgcontainer
        //the transform property places it in the bottom center (60 is too push a bit too right, 400 is to be a the bottom)
        svgContainer
          .append('g')
          .call(xAxis)
          .attr('id', 'x-axis')
          .attr('transform', 'translate(60, 400)');

        // gets the gdp of each array
        let GDP = data.data.map(function (item) {
          return item[1];
        });

        let scaledGDP = [];

        //max gdp
        let gdpMax = d3.max(GDP);

        //linearScale is a function which will return a gdp scaled to the height of the range. the reason why its 0 in the domain and not gdpmin is that so it the graph does not start completly flat
        let linearScale = d3
          .scaleLinear()
          .domain([0, gdpMax])
          .range([0, height]);

        //we then map the GDP into linearScale which will return the heigest gdp to height 400 and then scale each other gdp to a smaller height
        scaledGDP = GDP.map(function (item) {
          return linearScale(item);
        });

        //this is to scale the gdp on the yAxis
        let yAxisScale = d3
          .scaleLinear()
          .domain([0, gdpMax])
          .range([height, 0]);
        // scaling the d3 yaxis to the scale we just made above
        let yAxis = d3.axisLeft(yAxisScale);

        //appending the y axis to the svg (the translate 60 pushes it to the right)
        svgContainer
          .append('g')
          .call(yAxis)
          .attr('id', 'y-axis')
          .attr('transform', 'translate(60, 0)');

        //this is to add all the bars(rect) to the svg
        //(d) is the data so the number and (i) is the index
        d3.select('svg')
          .selectAll('rect')
          .data(scaledGDP) // GDP scaled to the height of 400
          .enter()
          .append('rect')
          .attr('data-date', function (d, i) {
            //sets the date as an attribute
            return data.data[i][0];
          })
          .attr('data-gdp', function (d, i) {
            // sets the gdp amount as an attribute
            return data.data[i][1];
          })
          .attr('class', 'bar')

          //pushes each rect a little bit more to the right with each change in year
          .attr('x', function (d, i) {
            return xScale(yearsDate[i]);
          })

          //as y is calculated from the top right you want to push everything down to the bottom . so that is why you put height --
          //and the -d is to stop pushing it down to much and have the  height of the data
          .attr('y', function (d) {
            return height - d;
          })
          .attr('width', barWidth) // defined on top as width / 275
          .attr('height', function (d) {
            //adding more than d here will make it grow at te bottom bc again height is calculated from the top
            return d;
          })
          .style('fill', '#33adff')
          .attr('transform', 'translate(60, 0)') //pushes graph a little right
          .on('mouseover', function (d, i) {
            overlay
              .transition()
              .duration(1) // time for white bar to appear on screen
              .style('height', d + 'px')
              .style('width', barWidth + 'px')
              .style('opacity', 0.9)
              .style('left', i * barWidth + 0 + 'px')
              .style('top', height - d + 'px')
              .style('transform', 'translateX(60px)');
            tooltip.transition().duration(200).style('opacity', 0.9);
            tooltip
              .html(
                years[i] +
                  '<br>' +
                  '$' + // toFixed rounds to 1 number after decimal
                  GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + //here the regex finds the first digit adds a comma after it then puts the other numbers and then adds billion
                  ' Billion'
              )
              .attr('data-date', data.data[i][0])
              .style('left', i * barWidth + 30 + 'px')
              .style('top', height - 100 + 'px')
              .style('transform', 'translateX(60px)');
          })
          .on('mouseout', function () {
            tooltip.transition().duration(200).style('opacity', 0);
            overlay.transition().duration(200).style('opacity', 0);
          });
      }
    );

    return (
      <>
        <Box>
          <svg width={width} height={height}></svg>
        </Box>
      </>
    );
  };
}

export default InputGraph;
