export interface EnvironmentalConditions {
    windSpeed: number;           // скорость ветра в узлах
    windDirection: number;       // направление ветра в градусах
    currentSpeed: number;        // скорость течения в узлах
    currentDirection: number;    // направление течения в градусах
    waveHeight: number;         // высота волны в метрах
    wavePeriod: number;         // период волны в секундах
    waveDirection: number;      // направление волн в градусах
  }
  
  export interface EnvironmentForce {
    x: number;                  // продольная составляющая силы
    y: number;                  // поперечная составляющая силы
    moment: number;             // момент силы
  }
  
  export interface WindCoefficients {
    cx: number;                 // коэффициент сопротивления по X
    cy: number;                 // коэффициент сопротивления по Y
    cmz: number;               // коэффициент момента
  }
  
  export interface WaveSpectrum {
    type: 'JONSWAP' | 'PiersonMoskowitz' | 'DoublyPeaked';
    parameters: {
      significantHeight: number;
      peakPeriod: number;
      gamma?: number;           // параметр для JONSWAP
    };
  }
  
  export type WindProfile = {
    height: number;             // высота над уровнем моря
    speed: number;             // скорость ветра
    direction: number;         // направление ветра
  };
  
  export interface EnvironmentState {
    conditions: EnvironmentalConditions;
    forces: {
      wind: EnvironmentForce;
      current: EnvironmentForce;
      wave: EnvironmentForce;
      total: EnvironmentForce;
    };
    coefficients: {
      wind: WindCoefficients;
      current: WindCoefficients;
      wave: WindCoefficients;
    };
    spectrum: WaveSpectrum;
    windProfile: WindProfile[];
  }