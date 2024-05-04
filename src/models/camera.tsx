export enum Iso {
  iso000 = 0,
  iso100 = 100,
  iso200 = 200,
  iso320 = 320,
  iso400 = 400,
  iso500 = 500,
  iso640 = 640,
  iso800 = 800,
}

export enum ExpMode {
  auto = "auto",
  off = "off",
  night = "night",
  nightpreview = "nightpreview",
  backlight = "backlight",
  spotlight = "spotlight",
  sports = "sports",
  snow = "snow",
  beach = "beach",
  verylong = "verylong",
  fixedfps = "fixedfps",
  antishake = "antishake",
  fireworks = "fireworks",
}

export enum DRC {
  off = "off",
  low = "low",
  medium = "medium",
  high = "high",
}

export interface ExposureModel {
  iso: Iso;
  analog_gain: number;
  digital_gain: number;
  exposure_speed: number;
  shutter_speed: number;
  compensation: number;
  mode: ExpMode;
  drc_strength: DRC;
}

export enum AWBMode {
  off = "off",
  auto = "auto",
  sunlight = "sunlight",
  cloudy = "cloudy",
  shade = "shade",
  tungsten = "tungsten",
  fluorescent = "fluorescent",
  incandescent = "incandescent",
  flash = "flash",
  horizon = "horizon",
}

export interface AutoWhiteBalanceModel {
  r_gain: number;
  b_gain: number;
  mode: AWBMode;
}

export interface Zoom {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Resolution {
  width: number;
  height: number;
}

export enum MeterMode {
  average = "average",
  spot = "spot",
  backlit = "backlit",
  matrix = "matrix",
}
