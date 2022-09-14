//await response.json() graph xy

//https://observablehq.com/@d3/line-with-tooltip

//https://github.com/jgs982/react-d3js/blob/main/src/App.js

import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InputGraph = () => {
  var data;
  var newData = [];
  const width = 600,
    height = 250,
    margin = { top: 20, bottom: 40, right: 20, left: 40 };
  const onXaxis = 'timestamp',
    onYaxis = 'temperature';
  const circleRadius = 3;

  const loadData = async () => {
    data = await d3
      .csv(
        'https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv'
      )
      //https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv
      //https://vizhub.com/curran/datasets/data-canvas-sense-your-city-one-week.csv
      .then((res) => res);
    data.map((item, index) => index < 15 && newData.push(item));
    newData?.length && constructChart();
  };

  loadData();

  function constructChart() {
    let xAxisItems = data.map((items) => new Date(items[onXaxis]));
    let yAxisItems = data.map((items) => parseInt(items[onYaxis]));
    // scaling
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(yAxisItems).sort((a, b) => b - a))
      .range([0, height - margin.bottom]);

    const xScale = d3
      .scaleTime()
      .domain([d3.min(xAxisItems), d3.max(xAxisItems)])
      .range([0, width - margin.left - margin.right])
      .nice();

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${margin.left},${margin.top})`);

    g.append('circle')
      .attr('cx', (d) => xScale(new Date(d[onXaxis])))
      .attr('cy', (d) => yScale(d[onYaxis]))
      .classed('circle', true)
      .transition()
      .attr('r', circleRadius)
      .duration(1000);

    const line = d3
      .line()
      .x((d) => xScale(new Date(d[onXaxis])))
      .y((d) => yScale(d[onYaxis]));
    g.append('path').attr('d', line(data)).classed('line-path', true);

    //axis
    svg
      .append('g')
      .call(d3.axisLeft(yScale).tickSize(-width))
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('g')
      .call(d3.axisBottom(xScale).tickSize(-height))
      .attr(
        'transform',
        `translate(${margin.left},${height + margin.top - margin.bottom})`
      );
  }

  //   const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function Levels() {
    let response;
    let responseJson;
    try {
      response = await fetch(
        'http://fews.ideam.gov.co/colombia/jsonH/0021209920Hobs.json'
      );
      responseJson = await response.json();
      //   setData(responseJson.data.split(','));
    } catch (error) {
      console.error(error);
    }
    console.log(responseJson);
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Button
        onClick={() => {
          Levels();
        }}
      >
        view data
      </Button>
      <Box>
        <svg id="LineChart" width={700} height={700}></svg>
      </Box>
      <Box id="pgraphs"></Box>
      <Box id="BarChart"></Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default InputGraph;
