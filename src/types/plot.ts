export interface PlotPoint {
    angle: number;             // угол в градусах
    value: number;             // значение capability
    x?: number;               // координата X для отображения
    y?: number;               // координата Y для отображения
  }
  
  export interface PlotDisplayOptions {
    showGrid: boolean;         // отображать сетку
    showLabels: boolean;       // отображать подписи
    showLegend: boolean;       // отображать легенду
    showCurrentSpeed: boolean; // отображать скорость течения
    showWindSpeed: boolean;    // отображать скорость ветра
    showWaveHeight: boolean;   // отображать высоту волн
    colorScheme: string;       // цветовая схема
    gridDensity: number;       // плотность сетки в градусах
    plotRadius: number;        // радиус графика в узлах
  }
  
  export interface PlotDimensions {
    width: number;             // ширина графика
    height: number;            // высота графика
    margin: {                  // отступы
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    center: {                  // центр графика
      x: number;
      y: number;
    };
    radius: number;            // радиус в пикселях
  }
  
  export interface PlotInteraction {
    selectedAngle: number | null;  // выбранный угол
    hoveredPoint: PlotPoint | null; // точка под курсором
    zoomLevel: number;            // уровень масштабирования
    pan: {                        // смещение графика
      x: number;
      y: number;
    };
  }
  
  export interface PlotState {
    capabilityData: PlotPoint[];
    isCalculating: boolean;
    error: string | null;
    displayOptions: PlotDisplayOptions;
    dimensions: PlotDimensions;
    interaction: PlotInteraction;
  }
  
  export interface PlotLegendItem {
    label: string;
    color: string;
    value: number | string;
    unit: string;
  }
  
  export interface PlotGridConfig {
    radialLines: number[];     // углы радиальных линий
    circles: number[];         // радиусы окружностей
    labels: {
      radial: string[];       // подписи для радиальных линий
      circular: string[];     // подписи для окружностей
    };
  }
  
  export interface PlotStyle {
    lineWidth: number;
    lineColor: string;
    fillColor: string;
    gridColor: string;
    labelColor: string;
    fontSize: number;
    fontFamily: string;
  }