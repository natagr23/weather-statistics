//await response.json() graph xy

//https://observablehq.com/@d3/line-with-tooltip

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
  useEffect(() => {
    let dataSet = [
      fetch('http://fews.ideam.gov.co/colombia/jsonH/0021209920Hobs.json').then(
        (response) => response.json()
      ),
    ];

    d3.select('#pgraphs')
      .selectAll('p')
      .data(dataSet)
      .enter()
      .append('p')
      .text((dt) => dt.subject + ': ' + dt.count);

    // Bar Chart:
    const getMax = () => {
      let max = 0;
      dataSet.forEach((dt) => {
        if (dt.count > max) {
          max = dt.count;
        }
      });
      return max;
    };

    d3.select('#BarChart')
      .selectAll('div')
      .data(dataSet)
      .enter()
      .append('div')
      .classed('bar', true)
      .style('height', `${getMax()}px`);

    d3.select('#BarChart')
      .selectAll('.bar')
      .transition()
      .duration(1000)
      .style('height', (bar) => `${bar.count}px`)
      .style('width', '80px')
      .style('margin-right', '10px')
      .delay(300);

    // Line Graph
    let lineData = [dataSet];
    for (let i = 0; i < 15; i++) {
      lineData.push({ x: i + 1, y: dataSet });
    }

    let xScale = d3.scaleLinear().domain([0, 15]).range([0, 300]);
    let yScale = d3.scaleLinear().domain([0, 100]).range([300, 0]);

    let line = d3
      .line()
      .x((dt) => xScale(dt.x))
      .y((dt) => yScale(dt.y));

    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    d3.select('#LineChart')
      .selectAll('path')
      .datum(lineData)
      .attr(
        'd',
        d3
          .line()
          .x((dt) => xScale(dt.x))
          .y(yScale(0))
      )
      .attr('stroke', 'blue')
      .attr('fill', 'none');

    d3.select('#LineChart')
      .selectAll('path')
      .transition()
      .duration(1000)
      .attr('d', line);

    d3.select('#LineChart')
      .append('g')
      .attr('transform', 'translate(0, ' + 300 + ')')
      .call(xAxis);

    d3.select('#LineChart')
      .append('g')
      .attr('transform', 'translate(0, 0)')
      .call(yAxis);
  }, []);

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
