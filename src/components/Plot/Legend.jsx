import React from 'react';
import { useSelector } from 'react-redux';

const Legend = () => {
  const environmentalConditions = useSelector(state => state.environment);
  const thrusters = useSelector(state => state.thrusters);

  return (
    <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Legend</h3>
      
      {/* Environmental conditions */}
      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-700">Environmental Conditions</h4>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>Wind Speed:</span>
            <span>{environmentalConditions.windSpeed} kts</span>
          </div>
          <div className="flex justify-between">
            <span>Current Speed:</span>
            <span>{environmentalConditions.currentSpeed} kts</span>
          </div>
          <div className="flex justify-between">
            <span>Wave Height:</span>
            <span>{environmentalConditions.waveHeight} m</span>
          </div>
        </div>
      </div>

      {/* Thruster status */}
      <div>
        <h4 className="font-medium text-sm text-gray-700">Thruster Status</h4>
        <div className="space-y-1">
          {Object.entries(thrusters).map(([id, thruster]) => (
            <div key={id} className="flex justify-between">
              <span>{id}:</span>
              <span className={`font-medium ${
                thruster.active ? 'text-green-600' : 'text-red-600'
              }`}>
                {thruster.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Plot lines explanation */}
      <div className="mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-sm">Capability Limit</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 border border-dashed border-gray-400"></div>
          <span className="text-sm">Grid Lines</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;