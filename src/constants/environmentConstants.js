// Физические константы
export const WATER_DENSITY = 1025.0;  // кг/м³
export const AIR_DENSITY = 1.225;     // кг/м³
export const GRAVITY = 9.81;          // м/с²

// Коэффициенты безопасности
export const SAFETY_FACTOR = 0.85;    // коэффициент запаса по тяге
export const DYNAMIC_ALLOWANCE = 0.2; // запас на динамику

// Пределы параметров окружающей среды
export const ENVIRONMENT_LIMITS = {
  windSpeed: {
    min: 0,
    max: 100,    // узлы
    step: 0.1
  },
  windDirection: {
    min: 0,
    max: 360,    // градусы
    step: 1
  },
  currentSpeed: {
    min: 0,
    max: 5,      // узлы
    step: 0.1
  },
  currentDirection: {
    min: 0,
    max: 360,    // градусы
    step: 1
  },
  waveHeight: {
    min: 0,
    max: 10,     // метры
    step: 0.1
  },
  wavePeriod: {
    min: 4,
    max: 20,     // секунды
    step: 0.1
  }
};

// Параметры спектров волнения
export const WAVE_SPECTRUMS = {
  JONSWAP: {
    gamma: 3.3,  // пиковатость спектра
    alpha: 0.0081
  },
  PIERSON_MOSKOWITZ: {
    alpha: 0.0081,
    beta: 0.74
  }
};

// Корреляция скорости ветра и параметров волнения
export const WIND_WAVE_CORRELATION = [
  { windSpeed: 0, waveHeight: 0, wavePeriod: 0 },
  { windSpeed: 10, waveHeight: 0.5, wavePeriod: 4 },
  { windSpeed: 20, waveHeight: 1.5, wavePeriod: 6 },
  { windSpeed: 30, waveHeight: 3.0, wavePeriod: 8 },
  { windSpeed: 40, waveHeight: 5.0, wavePeriod: 10 },
  { windSpeed: 50, waveHeight: 7.5, wavePeriod: 12 }
];

// Профиль ветра по высоте
export const WIND_PROFILE = {
  referenceHeight: 10,     // метры
  roughnessLength: 0.0002, // для открытого моря
  powerLaw: 0.11          // показатель степени в законе профиля ветра
};

// Конфигурация расчета
export const CALCULATION_CONFIG = {
  angleStep: 10,          // шаг по углу при расчете capability
  convergenceTolerance: 0.1,  // допуск при определении предельной скорости ветра
  maxIterations: 50,      // максимальное число итераций
  timeStep: 0.1           // шаг по времени при динамическом анализе
};