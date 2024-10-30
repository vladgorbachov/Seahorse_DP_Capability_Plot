import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { CapabilityCalculator } from '../../models/capabilityCalculator';


const PolarPlot = () => {
  const svgRef = useRef();
  const environmentalConditions = useSelector(state => state.environment);
  const thrusters = useSelector(state => state.thrusters);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 800;
    const margin = 50;
    const radius = Math.min(width, height) / 2 - margin;

    // Clear previous content
    svg.selectAll("*").remove();

    // Create main group
    const g = svg
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create scales
    const angleScale = d3.scaleLinear()
        .domain([0, 360])
        .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
        .domain([0, 4])
        .range([0, radius]);

    // Draw circular grid
    const gridCircles = [1, 2, 3, 4];
    gridCircles.forEach(value => {
      g.append('circle')
          .attr('r', radiusScale(value))
          .attr('fill', 'none')
          .attr('stroke', '#ddd')
          .attr('stroke-dasharray', '2,2');
    });

    // Draw radial grid lines
    const angles = d3.range(0, 360, 30);
    angles.forEach(angle => {
      const angleRad = angleScale(angle);
      g.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', radius * Math.cos(angleRad - Math.PI / 2))
          .attr('y2', radius * Math.sin(angleRad - Math.PI / 2))
          .attr('stroke', '#ddd')
          .attr('stroke-dasharray', '2,2');
    });

    // Calculate and draw capability curve
    const calculator = new CapabilityCalculator(environmentalConditions, thrusters);
    const capabilityData = calculator.calculateCapabilityCurve();
    const line = d3.lineRadial()
        .angle(d => angleScale(d.angle) - Math.PI / 2)
        .radius(d => radiusScale(d.value))
        .curve(d3.curveLinearClosed);

    g.append('path')
        .datum(capabilityData)
        .attr('d', line)
        .attr('fill', 'rgba(0, 120, 255, 0.1)')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2);

  }, [environmentalConditions, thrusters]);


  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default PolarPlot;