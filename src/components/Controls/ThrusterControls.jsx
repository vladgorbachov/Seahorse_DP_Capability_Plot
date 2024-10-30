import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  toggleThruster,
  updateThrusterPower
} from '../../store/thrustersSlice';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const ThrusterControls = () => {
  const dispatch = useDispatch();
  const thrusters = useSelector(state => state.thrusters);

  const handleThrusterToggle = (thrusterId) => {
    dispatch(toggleThruster(thrusterId));
  };

  const handlePowerChange = (thrusterId, power) => {
    dispatch(updateThrusterPower({ thrusterId, power: Number(power) }));
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Thruster Controls</h2>

      <div className="space-y-4">
        {Object.entries(thrusters).map(([id, thruster]) => (
          <div key={id} className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium">{id}</span>
              <Button
                onClick={() => handleThrusterToggle(id)}
                className={`px-4 py-2 rounded ${
                  thruster.active 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                {thruster.active ? 'Active' : 'Inactive'}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Type:</span>
                <span>{thruster.type}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Max Power (kW):</span>
                <span>{thruster.maxPower}</span>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium">Power (%)</label>
                <Input
                  type="number"
                  value={thruster.power}
                  onChange={e => handlePowerChange(id, e.target.value)}
                  min="0"
                  max="100"
                  step="1"
                  disabled={!thruster.active}
                  className="w-full"
                />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Load:</span>
                <span>{(thruster.power * thruster.maxPower / 100).toFixed(1)} kW</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThrusterControls;