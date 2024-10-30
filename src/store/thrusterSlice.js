import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  T01: {
    type: 'TUNNEL',
    maxPower: 765,
    active: true,
    power: 0,
    position: { x: 68.7, y: 0 },
    angle: 90
  },
  T02: {
    type: 'TUNNEL',
    maxPower: 765,
    active: true,
    power: 0,
    position: { x: 32.7, y: 12.0 },
    angle: 90
  },
  T03: {
    type: 'MP+NO2+RUD',
    maxPower: 1520,
    active: true,
    power: 0,
    position: { x: 32.7, y: -12.0 },
    angle: 90
  },
  T04: {
    type: 'MP+NO2+RUD',
    maxPower: 1520,
    active: true,
    power: 0,
    position: { x: -45.3, y: 16.1 },
    angle: 90
  }
};

const thrustersSlice = createSlice({
  name: 'thrusters',
  initialState,
  reducers: {
    toggleThruster(state, action) {
      const thrusterId = action.payload;
      if (state[thrusterId]) {
        state[thrusterId].active = !state[thrusterId].active;
        if (!state[thrusterId].active) {
          state[thrusterId].power = 0;
        }
      }
    },
    
    updateThrusterPower(state, action) {
      const { thrusterId, power } = action.payload;
      if (state[thrusterId] && state[thrusterId].active) {
        state[thrusterId].power = Math.max(0, Math.min(100, power));
      }
    },
    
    updateThrusterAngle(state, action) {
      const { thrusterId, angle } = action.payload;
      if (state[thrusterId]) {
        state[thrusterId].angle = ((angle % 360) + 360) % 360;
      }
    },
    
    setThrusterConfiguration(state, action) {
      const { thrusterId, config } = action.payload;
      if (state[thrusterId]) {
        state[thrusterId] = {
          ...state[thrusterId],
          ...config
        };
      }
    },
    
    resetThrusters(state) {
      return initialState;
    },
    
    setAllThrustersStatus(state, action) {
      const status = action.payload;
      Object.keys(state).forEach(thrusterId => {
        state[thrusterId].active = status;
        if (!status) {
          state[thrusterId].power = 0;
        }
      });
    },

    setAllThrustersPower(state, action) {
      const power = Math.max(0, Math.min(100, action.payload));
      Object.keys(state).forEach(thrusterId => {
        if (state[thrusterId].active) {
          state[thrusterId].power = power;
        }
      });
    }
  }
});

export const {
  toggleThruster,
  updateThrusterPower,
  updateThrusterAngle,
  setThrusterConfiguration,
  resetThrusters,
  setAllThrustersStatus,
  setAllThrustersPower
} = thrustersSlice.actions;

export default thrustersSlice.reducer;