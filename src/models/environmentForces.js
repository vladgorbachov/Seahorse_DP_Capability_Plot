import { WATER_DENSITY, AIR_DENSITY } from '../constants/environmentConstants';

export class EnvironmentForces {
  constructor(environmentalConditions) {
    this.conditions = environmentalConditions;
  }

  calculateWindForce() {
    const { windSpeed, windDirection } = this.conditions;
    
    // Расчет силы ветра по формуле: F = 0.5 * ρ * v² * A * C
    const windSpeedMs = windSpeed * 0.514444; // Convert knots to m/s
    const force = {
      x: 0,
      y: 0,
      moment: 0
    };

    // Коэффициенты для разных направлений ветра
    const coefficients = this.getWindCoefficients(windDirection);
    
    // Площадь парусности (должна быть определена в константах)
    const { lateralArea, frontalArea } = this.getWindAreas();

    // Расчет компонентов силы
    force.x = 0.5 * AIR_DENSITY * Math.pow(windSpeedMs, 2) * frontalArea * coefficients.cx;
    force.y = 0.5 * AIR_DENSITY * Math.pow(windSpeedMs, 2) * lateralArea * coefficients.cy;
    force.moment = 0.5 * AIR_DENSITY * Math.pow(windSpeedMs, 2) * lateralArea * coefficients.cmz;

    return force;
  }

  calculateCurrentForce() {
    const { currentSpeed, currentDirection } = this.conditions;
    
    // Расчет силы течения
    const currentSpeedMs = currentSpeed * 0.514444; // Convert knots to m/s
    const force = {
      x: 0,
      y: 0,
      moment: 0
    };

    // Коэффициенты для разных направлений течения
    const coefficients = this.getCurrentCoefficients(currentDirection);
    
    // Площадь подводной части (должна быть определена в константах)
    const { underwaterLateralArea, underwaterFrontalArea } = this.getUnderwaterAreas();

    // Расчет компонентов силы
    force.x = 0.5 * WATER_DENSITY * Math.pow(currentSpeedMs, 2) * underwaterFrontalArea * coefficients.cx;
    force.y = 0.5 * WATER_DENSITY * Math.pow(currentSpeedMs, 2) * underwaterLateralArea * coefficients.cy;
    force.moment = 0.5 * WATER_DENSITY * Math.pow(currentSpeedMs, 2) * underwaterLateralArea * coefficients.cmz;

    return force;
  }

  calculateWaveForce() {
    const { waveHeight, wavePeriod, waveDirection } = this.conditions;
    
    // Расчет силы волнения
    const force = {
      x: 0,
      y: 0,
      moment: 0
    };

    // Упрощенный расчет силы волнения
    // В реальности требуется более сложная модель
    const waveCoefficients = this.getWaveCoefficients(waveDirection);
    const waveForce = Math.pow(waveHeight, 2) * wavePeriod;

    force.x = waveForce * waveCoefficients.cx;
    force.y = waveForce * waveCoefficients.cy;
    force.moment = waveForce * waveCoefficients.cmz;

    return force;
  }

  // Вспомогательные методы для получения коэффициентов
  getWindCoefficients(direction) {
    // Реализация получения коэффициентов в зависимости от направления
    return {
      cx: Math.cos(direction * Math.PI / 180),
      cy: Math.sin(direction * Math.PI / 180),
      cmz: Math.sin(2 * direction * Math.PI / 180) * 0.1
    };
  }

  getCurrentCoefficients(direction) {
    // Аналогично для течения
    return {
      cx: Math.cos(direction * Math.PI / 180) * 1.2,
      cy: Math.sin(direction * Math.PI / 180) * 1.5,
      cmz: Math.sin(2 * direction * Math.PI / 180) * 0.15
    };
  }

  getWaveCoefficients(direction) {
    // Аналогично для волнения
    return {
      cx: Math.cos(direction * Math.PI / 180) * 0.8,
      cy: Math.sin(direction * Math.PI / 180) * 0.9,
      cmz: Math.sin(2 * direction * Math.PI / 180) * 0.05
    };
  }
}