import { EnvironmentForces } from './environmentForces';
import { ThrusterForces } from './thrusterForces';
import { SAFETY_FACTOR } from '../constants/environmentConstants';

export class CapabilityCalculator {
  constructor(environmentalConditions, thrusters) {
    this.environmentForces = new EnvironmentForces(environmentalConditions);
    this.thrusterForces = new ThrusterForces(thrusters);
  }

  calculateCapabilityCurve() {
    const points = [];
    // Расчет для всех направлений с шагом 10 градусов
    for (let angle = 0; angle < 360; angle += 10) {
      const capability = this.calculateCapabilityAtAngle(angle);
      points.push({
        angle,
        value: capability
      });
    }
    return points;
  }

  calculateCapabilityAtAngle(angle) {
    // Увеличиваем ветер постепенно, пока система может удерживать позицию
    let minWindSpeed = 0;
    let maxWindSpeed = 100;
    let currentWindSpeed = 50;
    
    while (Math.abs(maxWindSpeed - minWindSpeed) > 0.1) {
      // Устанавливаем текущую скорость ветра
      const conditions = {
        ...this.environmentForces.conditions,
        windSpeed: currentWindSpeed,
        windDirection: angle
      };

      // Проверяем, может ли система удержать позицию
      const canHoldPosition = this.checkPositionHolding(conditions);

      if (canHoldPosition) {
        minWindSpeed = currentWindSpeed;
      } else {
        maxWindSpeed = currentWindSpeed;
      }

      currentWindSpeed = (minWindSpeed + maxWindSpeed) / 2;
    }

    return currentWindSpeed;
  }

  checkPositionHolding(conditions) {
    // Рассчитываем силы окружающей среды
    const environmentForces = new EnvironmentForces(conditions);
    const envForce = {
      x: 0,
      y: 0,
      moment: 0
    };

    // Суммируем все силы окружающей среды
    const windForce = environmentForces.calculateWindForce();
    const currentForce = environmentForces.calculateCurrentForce();
    const waveForce = environmentForces.calculateWaveForce();

    envForce.x = windForce.x + currentForce.x + waveForce.x;
    envForce.y = windForce.y + currentForce.y + waveForce.y;
    envForce.moment = windForce.moment + currentForce.moment + waveForce.moment;

    // Рассчитываем максимальные силы от движителей
    const maxThrusterForce = this.thrusterForces.calculateTotalForce();

    // Проверяем возможность удержания позиции с учетом запаса
    return (
      Math.abs(envForce.x) <= Math.abs(maxThrusterForce.x) * SAFETY_FACTOR &&
      Math.abs(envForce.y) <= Math.abs(maxThrusterForce.y) * SAFETY_FACTOR &&
      Math.abs(envForce.moment) <= Math.abs(maxThrusterForce.moment) * SAFETY_FACTOR
    );
  }

  calculatePowerConsumption() {
    // Расчет потребляемой мощности всеми активными движителями
    let totalPower = 0;
    Object.values(this.thrusterForces.thrusters).forEach(thruster => {
      if (thruster.active) {
        totalPower += (thruster.power / 100) * thruster.maxPower;
      }
    });
    return totalPower;
  }

  getSystemStatus() {
    // Получение статуса системы
    const powerConsumption = this.calculatePowerConsumption();
    const maxThrusterForce = this.thrusterForces.calculateTotalForce();
    const envForces = {
      wind: this.environmentForces.calculateWindForce(),
      current: this.environmentForces.calculateCurrentForce(),
      wave: this.environmentForces.calculateWaveForce()
    };

    return {
      powerConsumption,
      maxThrusterForce,
      environmentalForces: envForces,
      safetyMargin: this.calculateSafetyMargin(maxThrusterForce, envForces)
    };
  }

  calculateSafetyMargin(thrusterForce, envForces) {
    // Расчет запаса по тяге
    const totalEnvForce = {
      x: envForces.wind.x + envForces.current.x + envForces.wave.x,
      y: envForces.wind.y + envForces.current.y + envForces.wave.y,
      moment: envForces.wind.moment + envForces.current.moment + envForces.wave.moment
    };

    return {
      x: (Math.abs(thrusterForce.x) - Math.abs(totalEnvForce.x)) / Math.abs(thrusterForce.x),
      y: (Math.abs(thrusterForce.y) - Math.abs(totalEnvForce.y)) / Math.abs(thrusterForce.y),
      moment: (Math.abs(thrusterForce.moment) - Math.abs(totalEnvForce.moment)) / Math.abs(thrusterForce.moment)
    };
  }
}