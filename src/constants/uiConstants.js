// Цветовые схемы
export const COLOR_SCHEMES = {
    default: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      background: '#FFFFFF',
      text: '#1F2937',
      grid: '#E5E7EB'
    },
    dark: {
      primary: '#60A5FA',
      secondary: '#9CA3AF',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
      background: '#1F2937',
      text: '#F9FAFB',
      grid: '#4B5563'
    }
  };
  
  // Размеры элементов интерфейса
  export const UI_SIZES = {
    plot: {
      minWidth: 600,
      minHeight: 600,
      margin: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40
      }
    },
    controls: {
      minWidth: 300,
      maxWidth: 400,
      inputHeight: 40,
      buttonHeight: 36
    }
  };
  
  // Настройки графика
  export const PLOT_CONFIG = {
    gridDensity: {
      radial: 30,    // шаг радиальных линий в градусах
      circular: 1.0  // шаг круговых линий в узлах
    },
    labels: {
      fontSize: 12,
      fontFamily: 'Arial',
      padding: 5
    },
    animation: {
      duration: 300,
      easing: 'easeInOutCubic'
    }
  };
  
  // Форматы отображения значений
  export const DISPLAY_FORMATS = {
    speed: '0.0',      // один знак после запятой для скорости
    angle: '0',        // целые градусы
    power: '0.0',      // один знак после запятой для мощности
    percentage: '0'    // целые проценты
  };
  
  // Подсказки
  export const TOOLTIPS = {
    windSpeed: 'Скорость ветра в узлах',
    windDirection: 'Направление ветра в градусах (откуда дует)',
    currentSpeed: 'Скорость течения в узлах',
    currentDirection: 'Направление течения в градусах',
    waveHeight: 'Значительная высота волн в метрах',
    thrusterPower: 'Мощность движителя в процентах от максимальной',
    thrusterAngle: 'Угол поворота движителя в градусах'
  };
  
  // Сообщения об ошибках
  export const ERROR_MESSAGES = {
    calculation: 'Ошибка при расчете capability plot',
    validation: 'Неверные входные данные',
    thrusterControl: 'Ошибка управления движителем',
    fileOperation: 'Ошибка операции с файлом',
    connection: 'Ошибка соединения'
  };
  
  // Настройки экспорта
  export const EXPORT_CONFIG = {
    pdf: {
      format: 'A4',
      orientation: 'landscape'
    },
    excel: {
      sheetNames: {
        environment: 'Environmental Conditions',
        thrusters: 'Thruster Configuration',
        results: 'Calculation Results'
      }
    }
  };
  
  // Настройки интерактивности
  export const INTERACTION_CONFIG = {
    zoom: {
      min: 0.5,
      max: 4,
      step: 0.1
    },
    pan: {
      speed: 1,
      bounds: {
        x: 100,
        y: 100
      }
    }
  };