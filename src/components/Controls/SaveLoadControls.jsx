import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveConfiguration, loadConfiguration } from '../../store/configurationSlice';
import { Button } from '../UI/Button';
import { saveToFile, loadFromFile } from '../../services/fileManager';

const SaveLoadControls = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const currentState = useSelector(state => ({
    environment: state.environment,
    thrusters: state.thrusters
  }));

  const handleSave = async () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `dp-config-${timestamp}.json`;
    
    try {
      await saveToFile(currentState, filename);
      dispatch(saveConfiguration(currentState));
    } catch (error) {
      console.error('Error saving configuration:', error);
      // Here you would typically show an error message to the user
    }
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const configuration = await loadFromFile(file);
      dispatch(loadConfiguration(configuration));
    } catch (error) {
      console.error('Error loading configuration:', error);
      // Here you would typically show an error message to the user
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Configuration</h2>

      <div className="flex space-x-4">
        <Button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Configuration
        </Button>

        <Button
          onClick={handleLoad}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Load Configuration
        </Button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Recent Configurations</h3>
        {/* Here you could add a list of recently saved configurations */}
      </div>
    </div>
  );
};

export default SaveLoadControls;