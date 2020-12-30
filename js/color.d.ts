// Generate by [js2dts@0.3.3](https://github.com/whxaxes/js2dts#readme)

declare class Color {
  /**
   * This class creates a color
   * @param {number} p1 - param 1
   * @param {number} p2 - param 2
   * @param {number} p3 - param 3
   * @param {string} type - the type
   */
  constructor(p1: number, p2: number, p3: number, type: "hsl" | "rgb" | "hsv");
  html(): string;
  /**
   * this method return an array with the three params
   * @returns { Array } - [p1, p2, p3]
   */
  array(): [number, number, number];
  /**
   * this methods use the params in the function on order "func(p1, p2, p3)"
   * @param {function} func - pas the three params to the function
   */
  fn(func: (p1: number, p2: number, p3: number, ...args: any[]) => any): any;

  /**
   * Convert to RGB color
   */
  rgb: () => RGB;

  /**
   * Convert to HSL color
   */
  hsl: () => HSL;

  /**
   * Convert to HSV color
   */
  hsv: () => HSV;
}

declare class RGB extends Color {
  red: number;
  green: number;
  blue: number;
  setRed: (red: number) => RGB;
  setGreen: (green: number) => RGB;
  setBlue: (blue: number) => RGB;
  r: number;
  g: number;
  b: number;
  constructor(red: number, green: number, blue: number);
  fn(func: (red: number, green: number, blue: number, ...args: any[]) => any): any;
}
declare function rgb(red: number, green: number, blue: number): RGB;
declare function rgb(htmlcolor: string): RGB;
declare class HSL extends Color {
  hue: number;
  saturation: number;
  light: number;
  setHue: (hue: number) => HSL;
  setSaturation: (saturation: number) => HSL;
  setLight: (light: number) => HSL;
  h: number;
  s: number;
  l: number;
  constructor(hue: number, saturation: number, light: number);
  fn(func: (hue: number, saturation: number, light: number, ...args: any[]) => any): any;
}
declare function hsl(hue: number, saturation: number, light: number): HSL;
declare class HSV extends Color {
  hue: number;
  saturation: number;
  value: number;
  setHue: (hue: number) => HSV;
  setSaturation: (saturation: number) => HSV;
  setValue: (value: number) => HSV;
  h: number;
  s: number;
  v: number;
  constructor(hue: number, saturation: number, value: number);
  fn(func: (hue: number, saturation: number, value: number, ...args: any[]) => any): any;
}
declare function hsv(hue: number, saturation: number, value: number): HSV;
