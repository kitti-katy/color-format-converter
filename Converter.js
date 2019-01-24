/* 
  Supports formats: HSL, RGB, HEX, CMYK, HSV
  Functions: 
  1.
  HSLtoRGB
  HSLtoHEX
  HSLtoCMYK
  HSLtoHSV
  2. 
  RGBtoHSL
  RGBtoHEX
  RGBtoCMYK
  RGBtoHSV
  3.
  HEXtoHSL
  HEXtoRGB
  HEXtoCMYK
  HEXtoHSV
  4.
  CMYKtoHSL
  CMYKtoRGB
  CMYKtoHEX
  CMYKtoHSV
  5.
  HSVtoHSL
  HSVtoRGB
  HSVtoHEX
  HSVtoCMYK
  */

let HSLtoRGB = (h, s, l) => {
  let r, g, b;
  h /= 360;
  s /= 100;
  l /= 100;

  if (s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};
let HSLtoHEX = (h, s, l) => RGBtoHEX(HSLtoRGB(h, s, l));
let HSLtoCMYK = (h, s, l) => RGBtoCMYK(HSLtoRGB(h, s, l));
let HSLtoHSV = (h, s, l) => RGBtoHSV(HSLtoRGB(h, s, l));

let RGBtoHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  let hsl = {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
  hsl.h = hsl.h == 360 ? 0 : hsl.h;
  return hsl;
};

let RGBtoHEX = (r, g, b) =>
  "#" +
  numberToHex(parseInt(r)) +
  numberToHex(parseInt(g)) +
  numberToHex(parseInt(b));
let numberToHex = n => {
  let hex = n.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

let RGBtoCMYK = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  let k = 1 - Math.max(r, g, b);
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - m) / (1 - k);
  let y = (1 - b - k) / (1 - k);
  return { c, m, y, k };
};

let RGBtoHSV = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, v };
};

let HEXtoHSL = hexString => RGBtoHSL(HEXtoRGB(hexString));
let HEXtoRGB = hexString => ({
  r: extractNumberFromHex(hexString, 1, 3),
  g: extractNumberFromHex(hexString, 3, 5),
  b: extractNumberFromHex(hexString, 5, 7)
});
extractNumberFromHex = (HEXString, start, end) =>
  parseInt(HEXString.substring(start, end), 16);
let HEXtoCMYK = hexString => RGBtoCMYK(HEXtoRGB(hexString));
let HEXtoHSV = hexString => RGBtoHSV(HEXtoRGB(hexString));

let CMYKtoHSL = (c, m, y, k) => RGBtoHSL(CMYKtoRGB(c, m, y, k));
let CMYKtoRGB = (c, m, y, k) => ({
  r: 255 * (1 - c) * (1 - k),
  g: 255 * (1 - m) * (1 - k),
  b: 255 * (1 - y) * (1 - k)
});
let CMYKtoHEX = (c, m, y, k) => RGBtoHEX(CMYKtoRGB(c, m, y, k));
let CMYKtoHSV = (c, m, y, k) => RGBtoHSV(CMYKtoRGB(c, m, y, k));

let HSVtoHSL = (h, s, v) => RGBtoHSL(HSVtoRGB(h, s, v));
let HSVtoRGB = (h, s, v) => {
  let r, g, b;

  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return { r: r * 255, g: g * 255, b: b * 255 };
};
let HSVtoHEX = (h, s, v) => RGBtoHEX(HSVtoRGB(h, s, v));
let HSVtoCMYK = (h, s, v) => RGBtoCMYK(HSVtoRGB(h, s, v));

export default {
  HSLtoRGB,
  HSLtoHEX,
  HSLtoCMYK,
  HSLtoHSV,
  RGBtoHSL,
  RGBtoHEX,
  RGBtoCMYK,
  RGBtoHSV,
  HEXtoHSL,
  HEXtoRGB,
  HEXtoCMYK,
  HEXtoHSV,
  CMYKtoHSL,
  CMYKtoRGB,
  CMYKtoHEX,
  CMYKtoHSV,
  HSVtoHSL,
  HSVtoRGB,
  HSVtoHEX,
  HSVtoCMYK
};
