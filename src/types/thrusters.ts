export type ThrusterType = 'TUNNEL' | 'AZIMUTH' | 'MAIN' | 'MP+NO2+RUD';

export interface ThrusterPosition {
  x: number;                  // продольная координата
  y: number;                  // поперечная координата
}

export interface ThrusterForce {
  x: number;                  // продольная составляющая силы
  y: number;                  // поперечная составляющая силы
  moment: number;             // момент силы
}

export interface Thruster {
  id: string;
  type: ThrusterType;
  maxPower: number;          // максимальная мощность в кВт
  active: boolean;           // статус активности
  power: number;             // текущая мощность в процентах (0-100)
  position: ThrusterPosition;
  angle: number;             // угол поворота в градусах
  maxThrust: number;         // максимальная тяга в кН
  efficiency: number;        // КПД движителя
}

export interface ThrusterLimits {
  minAngle: number;          // минимальный угол поворота
  maxAngle: number;          // максимальный угол поворота
  minPower: number;          // минимальная мощность
  maxPower: number;          // максимальная мощность
  rampRate: number;          // скорость изменения мощности
  turnRate: number;          // скорость поворота
}

export interface ThrusterStatus {
  thrusterId: string;
  operational: boolean;
  faults: string[];
  warnings: string[];
  temperature: number;
  vibration: number;
  loadFactor: number;
}

export interface ThrusterConfiguration {
  id: string;
  limits: ThrusterLimits;
  forbidden: {
    zones: Array<{
      startAngle: number;
      endAngle: number;
      dependentThruster?: string;
    }>;
  };
  control: {
    mode: 'MANUAL' | 'AUTO' | 'DP';
    reference: 'SHIP' | 'GLOBAL';
    feedback: boolean;
  };
}

export interface ThrustersState {
  thrusters: Record<string, Thruster>;
  configurations: Record<string, ThrusterConfiguration>;
  status: Record<string, ThrusterStatus>;
  totalForce: ThrusterForce;
  powerConsumption: number;
  faultStatus: {
    hasFaults: boolean;
    faultCount: number;
    criticalFaults: boolean;
  };
}