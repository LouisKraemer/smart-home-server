export interface IYeelight {
  deviceId: string;
  room: any;
  name: string;
  power: boolean;
  bright: number;
  rgb: number;
  ct: number;
  color_mode: number;
  connected: boolean;
}

export interface IYeelightResponse {
  shouldRespond: boolean;
  payload?: any;
}
