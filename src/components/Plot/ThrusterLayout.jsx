import React from 'react';
import { useSelector } from 'react-redux';

const ThrusterLayout = () => {
  const thrusters = useSelector(state => state.thrusters);

  const vesselOutline = `M10,50 L90,50 L100,40 L100,60 L90,50`;
  
  const getThrusterColor = (thruster) => {
    if (!thruster.active) return '#ff0000';
    return thruster.power > 0 ? '#00ff00' : '#ffff00';
  };

  const getThrusterPosition = (id) => {
    const positions = {
      T01: { x: 80, y: 50 }, // Bow thruster
      T02: { x: 60, y: 40 }, // Forward thruster starboard
      T03: { x: 60, y: 60 }, // Forward thruster port
      T04: { x: 20, y: 35 }, // Aft thruster starboard
      T05: { x: 20, y: 65 }, // Aft thruster port
    };
    return positions[id];
  };

  const renderThruster = (thruster, id) => {
    const pos = getThrusterPosition(id);
    const color = getThrusterColor(thruster);

    return (
      <g key={id} transform={`translate(${pos.x},${pos.y})`}>
        <circle r="5" fill={color} stroke="black" strokeWidth="1"/>
        <text x="7" y="3" fontSize="8">{id}</text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-md">
      {/* Vessel outline */}
      <path d={vesselOutline} fill="#eee" stroke="#333" strokeWidth="1"/>
      
      {/* Thrusters */}
      {Object.entries(thrusters).map(([id, thruster]) => 
        renderThruster(thruster, id)
      )}
    </svg>
  );
};

export default ThrusterLayout;