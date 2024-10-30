export const THRUSTER_TYPES = {
    TUNNEL: 'TUNNEL',
    AZIMUTH: 'AZIMUTH',
    MAIN: 'MP+NO2+RUD',
  };
  
  export const THRUSTER_CONFIGURATIONS = {
    // Туннельные подруливающие устройства
    TUNNEL: {
      maxPowerKW: 765,
      maxThrustKN: 100,
      efficiency: 0.85,
      angles: {
        min: 90,
        max: 90,
        turnRate: 0  // фиксированное направление
      },
      power: {
        rampRate: 10, // % в секунду
        minPower: 5   // минимальная мощность в %
      }
    },
  
    // Азимутальные подруливающие устройства
    AZIMUTH: {
      maxPowerKW: 1000,
      maxThrustKN: 203,
      efficiency: 0.9,
      angles: {
        min: 0,
        max: 360,
        turnRate: 15  // градусов в секунду
      },
      power: {
        rampRate: 15,
        minPower: 5
      },
      forbidden_zones: [
        {
          startAngle: 75,
          endAngle: 105,
          description: "Thruster interaction zone"
        }
      ]
    },
  
    // Главные движители с рулями
    "MP+NO2+RUD": {
      maxPowerKW: 1520,
      maxThrustKN: 380,
      efficiency: 0.95,
      angles: {
        min: -35,
        max: 35,
        turnRate: 5   // градусов в секунду для руля
      },
      power: {
        rampRate: 20,
        minPower: 10
      }
    }
  };
  
  // Расположение движителей на судне
  export const THRUSTER_POSITIONS = {
    T01: {
      x: 68.7,
      y: 0,
      type: THRUSTER_TYPES.TUNNEL,
      description: "Bow tunnel thruster"
    },
    T02: {
      x: 32.7,
      y: 12.0,
      type: THRUSTER_TYPES.AZIMUTH,
      description: "Forward starboard azimuth"
    },
    T03: {
      x: 32.7,
      y: -12.0,
      type: THRUSTER_TYPES.AZIMUTH,
      description: "Forward port azimuth"
    },
    T04: {
      x: -45.3,
      y: 16.1,
      type: THRUSTER_TYPES.MAIN,
      description: "Aft starboard main propulsion"
    }
  };
  
  // Ограничения по взаимодействию движителей
  export const INTERACTION_RULES = {
    minDistance: 10,  // минимальное расстояние между движителями в метрах
    efficiencyLoss: { // потери эффективности при взаимодействии
      overlap: 0.15,  // 15% при перекрытии струй
      wake: 0.10,     // 10% при работе в следе
      adjacent: 0.05  // 5% при работе рядом
    }
  };
  
  // Режимы работы движителей
  export const OPERATION_MODES = {
    MANUAL: 'MANUAL',
    AUTO: 'AUTO',
    DP: 'DP'
  };
  
  // Состояния движителей
  export const THRUSTER_STATES = {
    OPERATIONAL: 'OPERATIONAL',
    DEGRADED: 'DEGRADED',
    FAILED: 'FAILED',
    MAINTENANCE: 'MAINTENANCE'
  };
  
  // Коды ошибок движителей
  export const FAULT_CODES = {
    POWER_FAILURE: 'POWER_FAILURE',
    CONTROL_FAILURE: 'CONTROL_FAILURE',
    HYDRAULIC_FAILURE: 'HYDRAULIC_FAILURE',
    MECHANICAL_FAILURE: 'MECHANICAL_FAILURE',
    COMMUNICATION_FAILURE: 'COMMUNICATION_FAILURE',
    SENSOR_FAILURE: 'SENSOR_FAILURE'
  };
  
  // Пределы работы движителей
  export const OPERATION_LIMITS = {
    maxTemperature: 85,    // максимальная температура в градусах Цельсия
    maxVibration: 10,      // максимальная вибрация в мм/с
    maxLoadDuration: 3600, // максимальное время работы на полной мощности в секундах
    minOilPressure: 2.5,   // минимальное давление масла в барах
    maxOilTemperature: 70  // максимальная температура масла в градусах Цельсия
  };