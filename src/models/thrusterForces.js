export class ThrusterForces {
    constructor(thrusters) {
      this.thrusters = thrusters;
    }
  
    calculateTotalForce() {
      const totalForce = {
        x: 0,
        y: 0,
        moment: 0
      };
  
      Object.entries(this.thrusters).forEach(([id, thruster]) => {
        if (thruster.active) {
          const thrusterForce = this.calculateSingleThrusterForce(thruster);
          totalForce.x += thrusterForce.x;
          totalForce.y += thrusterForce.y;
          totalForce.moment += thrusterForce.moment;
        }
      });
  
      return totalForce;
    }
  
    calculateSingleThrusterForce(thruster) {
      const force = {
        x: 0,
        y: 0,
        moment: 0
      };
  
      // Получаем максимальную тягу движителя
      const maxThrust = this.getMaxThrust(thruster);
      
      // Текущая тяга зависит от установленной мощности
      const currentThrust = maxThrust * (thruster.power / 100);
  
      // Учитываем направление тяги
      const thrustAngle = this.getThrustAngle(thruster);
      
      // Раскладываем силу по компонентам
      force.x = currentThrust * Math.cos(thrustAngle);
      force.y = currentThrust * Math.sin(thrustAngle);
  
      // Рассчитываем момент
      force.moment = this.calculateMoment(thruster, force);
  
      // Учитываем потери на взаимодействие движителей
      this.applyInteractionLosses(force, thruster);
  
      return force;
    }
  
    getMaxThrust(thruster) {
      // Получение максимальной тяги в зависимости от типа движителя
      const thrustCoefficients = {
        TUNNEL: 10,
        AZIMUTH: 20,
        MAIN: 38
      };
  
      return thrustCoefficients[thruster.type] || 0;
    }
  
    getThrustAngle(thruster) {
      // Получение угла тяги в зависимости от типа движителя
      if (thruster.type === 'TUNNEL') {
        return Math.PI / 2; // 90 градусов
      }
      return thruster.angle * Math.PI / 180;
    }
  
    calculateMoment(thruster, force) {
      // Расчет момента как векторное произведение
      const r = {
        x: thruster.position.x,
        y: thruster.position.y
      };
  
      return r.x * force.y - r.y * force.x;
    }
  
    applyInteractionLosses(force, thruster) {
      // Учет потерь на взаимодействие движителей
      const lossCoefficient = this.calculateInteractionLossCoefficient(thruster);
      
      force.x *= lossCoefficient;
      force.y *= lossCoefficient;
      force.moment *= lossCoefficient;
    }
  
    calculateInteractionLossCoefficient(thruster) {
      // Упрощенный расчет коэффициента потерь
      // В реальности зависит от многих факторов
      const baseLoss = 0.85; // 15% базовых потерь
      
      // Дополнительные потери при близком расположении движителей
      let additionalLoss = 1.0;
      
      Object.entries(this.thrusters).forEach(([id, otherThruster]) => {
        if (otherThruster.active && otherThruster !== thruster) {
          const distance = this.calculateDistance(thruster, otherThruster);
          if (distance < 10) { // если движители ближе 10 метров
            additionalLoss *= 0.95; // дополнительные 5% потерь
          }
        }
      });
  
      return baseLoss * additionalLoss;
    }
  
    calculateDistance(thruster1, thruster2) {
      const dx = thruster1.position.x - thruster2.position.x;
      const dy = thruster1.position.y - thruster2.position.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }