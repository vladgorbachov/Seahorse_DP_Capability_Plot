import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  capabilityData: [],
  isCalculating: false,
  error: null,
  displayOptions: {
    showGrid: true,
    showLabels: true,
    showLegend: true,
    showCurrentSpeed: true,
    showWindSpeed: true,
    showWaveHeight: true,
    colorScheme: 'blue',
    gridDensity: 30, // degrees between grid lines
    plotRadius: 4.0 // maximum speed in knots
  },
  selectedAngle: null,
  hoveredPoint: null,
  zoomLevel: 1,
  pan: { x: 0, y: 0 }
};

const plotSlice = createSlice({
  name: 'plot',
  initialState,
  reducers: {
    setCapabilityData(state, action) {
      state.capabilityData = action.payload;
    },
    
    setCalculatingStatus(state, action) {
      state.isCalculating = action.payload;
    },
    
    setError(state, action) {
      state.error = action.payload;
    },
    
    updateDisplayOptions(state, action) {
      state.displayOptions = {
        ...state.displayOptions,
        ...action.payload
      };
    },
    
    setSelectedAngle(state, action) {
      state.selectedAngle = action.payload;
    },
    
    setHoveredPoint(state, action) {
      state.hoveredPoint = action.payload;
    },
    
    setZoomLevel(state, action) {
      state.zoomLevel = Math.max(0.5, Math.min(4, action.payload));
    },
    
    setPan(state, action) {
      state.pan = action.payload;
    },
    
    resetPlot(state) {
      state.capabilityData = [];
      state.selectedAngle = null;
      state.hoveredPoint = null;
      state.zoomLevel = 1;
      state.pan = { x: 0, y: 0 };
    },
    
    resetDisplayOptions(state) {
      state.displayOptions = initialState.displayOptions;
    }
  }
});

export const {
  setCapabilityData,
  setCalculatingStatus,
  setError,
  updateDisplayOptions,
  setSelectedAngle,
  setHoveredPoint,
  setZoomLevel,
  setPan,
  resetPlot,
  resetDisplayOptions
} = plotSlice.actions;

export default plotSlice.reducer;