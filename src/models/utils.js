// Преобразование углов
export const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
  };
  
  export const radiansToDegrees = (radians) => {
    return radians * 180 / Math.PI;
  };
  
  // Нормализация угла в диапазоне 0-360
  export const normalizeAngle = (angle) => {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  };
  
  // Расчет результирующего вектора
  export const calculateResultantVector = (vectors) => {
    return vectors.reduce((acc, vector) => ({
      x: acc.x + vector.x,
      y: acc.y + vector.y,
      moment: acc.moment + vector.moment
    }), { x: 0, y: 0, moment: 0 });
  };
  
  // Преобразование скорости из узлов в м/с
  export const knotsToMs = (knots) => {
    return knots * 0.514444;
  };
  
  // Преобразование скорости из м/с в узлы
  export const msToKnots = (ms) => {
    return ms / 0.514444;
  };
  
  // Интерполяция значений
  export const interpolate = (x, x1, x2, y1, y2) => {
    return y1 + (x - x1) * (y2 - y1) / (x2 - x1);
  };
  
  // Проверка пересечения векторов
  export const checkVectorIntersection = (v1start, v1end, v2start, v2end) => {
    const denom = ((v2end.y - v2start.y) * (v1end.x - v1start.x)) -
                  ((v2end.x - v2start.x) * (v1end.y - v1start.y));
  
    if (denom === 0) return null;
  
    const ua = (((v2end.x - v2start.x) * (v1start.y - v2start.y)) -
                ((v2end.y - v2start.y) * (v1start.x - v2start.x))) / denom;
  
    const ub = (((v1end.x - v1start.x) * (v1start.y - v2start.y)) -
                ((v1end.y - v1start.y) * (v1start.x - v2start.x))) / denom;
  
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return null;
  
    return {
      x: v1start.x + (ua * (v1end.x - v1start.x)),
      y: v1start.y + (ua * (v1end.y - v1start.y))
    };
  };
  
  // Форматирование чисел для отображения
  export const formatNumber = (number, decimals = 2) => {
    return Number(number).toFixed(decimals);
  };
  
  // Проверка валидности входных данных
  export const validateInput = (value, min, max) => {
    const num = Number(value);
    if (isNaN(num)) return false;
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  };
  
  // Расчет расстояния между точками
  export const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };