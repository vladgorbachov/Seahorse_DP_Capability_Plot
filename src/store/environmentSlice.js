import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windSpeed: 0,
  windDirection: 0,
  currentSpeed: 0,
  currentDirection: 0,
  waveHeight: 0,
  wavePeriod: 6.0,
  waveDirection: 0
};

const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    updateWindSpeed(state, action) {
      state.windSpeed = action.payload;
    },
    updateWindDirection(state, action) {
      state.windDirection = action.payload;
    },
    updateCurrentSpeed(state, action) {
      state.currentSpeed = action.payload;
    },
    updateCurrentDirection(state, action) {
      state.currentDirection = action.payload;
    },
    updateWaveHeight(state, action) {
      state.waveHeight = action.payload;
    },
    updateWavePeriod(state, action) {
      state.wavePeriod = action.payload;
    },
    updateWaveDirection(state, action) {
      state.waveDirection = action.payload;
    },
    setEnvironmentConditions(state, action) {
      return { ...state, ...action.payload };
    },
    resetEnvironmentConditions(state) {
      return initialState;
    }
  }
});

export const {
  updateWindSpeed,
  updateWindDirection,
  updateCurrentSpeed,
  updateCurrentDirection,
  updateWaveHeight,
  updateWavePeriod,
  updateWaveDirection,
  setEnvironmentConditions,
  resetEnvironmentConditions
} = environmentSlice.actions;

export default environmentSlice.reducer;