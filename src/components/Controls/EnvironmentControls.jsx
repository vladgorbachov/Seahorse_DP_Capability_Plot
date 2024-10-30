import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateWindSpeed,
  updateWindDirection,
  updateCurrentSpeed,
  updateCurrentDirection,
  updateWaveHeight
} from '../../store/environmentSlice';
import { Input } from '../UI/Input';
import { Slider } from '../UI/Slider';

const EnvironmentControls = () => {
  const dispatch = useDispatch();
  const environment = useSelector(state => state.environment);

  const handleWindSpeedChange = (value) => {
    dispatch(updateWindSpeed(Number(value)));
  };

  const handleWindDirectionChange = (value) => {
    dispatch(updateWindDirection(Number(value)));
  };

  const handleCurrentSpeedChange = (value) => {
    dispatch(updateCurrentSpeed(Number(value)));
  };

  const handleCurrentDirectionChange = (value) => {
    dispatch(updateCurrentDirection(Number(value)));
  };

  const handleWaveHeightChange = (value) => {
    dispatch(updateWaveHeight(Number(value)));
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Environmental Conditions</h2>

      {/* Wind Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Wind</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Speed (kts)</label>
          <Input
            type="number"
            value={environment.windSpeed}
            onChange={e => handleWindSpeedChange(e.target.value)}
            min="0"
            max="100"
            step="0.1"
          />
          <Slider
            value={environment.windSpeed}
            onChange={handleWindSpeedChange}
            min={0}
            max={100}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Direction (deg)</label>
          <Input
            type="number"
            value={environment.windDirection}
            onChange={e => handleWindDirectionChange(e.target.value)}
            min="0"
            max="360"
            step="1"
          />
          <Slider
            value={environment.windDirection}
            onChange={handleWindDirectionChange}
            min={0}
            max={360}
            step={1}
          />
        </div>
      </div>

      {/* Current Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Speed (kts)</label>
          <Input
            type="number"
            value={environment.currentSpeed}
            onChange={e => handleCurrentSpeedChange(e.target.value)}
            min="0"
            max="5"
            step="0.1"
          />
          <Slider
            value={environment.currentSpeed}
            onChange={handleCurrentSpeedChange}
            min={0}
            max={5}
            step={0.1}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Direction (deg)</label>
          <Input
            type="number"
            value={environment.currentDirection}
            onChange={e => handleCurrentDirectionChange(e.target.value)}
            min="0"
            max="360"
            step="1"
          />
          <Slider
            value={environment.currentDirection}
            onChange={handleCurrentDirectionChange}
            min={0}
            max={360}
            step={1}
          />
        </div>
      </div>

      {/* Wave Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Waves</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Height (m)</label>
          <Input
            type="number"
            value={environment.waveHeight}
            onChange={e => handleWaveHeightChange(e.target.value)}
            min="0"
            max="10"
            step="0.1"
          />
          <Slider
            value={environment.waveHeight}
            onChange={handleWaveHeightChange}
            min={0}
            max={10}
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentControls;