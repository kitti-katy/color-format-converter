"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HSVtoCMYK = exports.HSVtoHEX = exports.HSVtoRGB = exports.HSVtoHSL = exports.CMYKtoHSV = exports.CMYKtoHEX = exports.CMYKtoRGB = exports.CMYKtoHSL = exports.extractNumberFromHex = exports.Hex3To6Char = exports.HEXtoHSV = exports.HEXtoCMYK = exports.HEXtoRGB = exports.HEXtoHSL = exports.RGBtoHSV = exports.RGBtoCMYK = exports.numberToHex = exports.RGBtoHEX = exports.RGBtoHSL = exports.HSLtoHSV = exports.HSLtoCMYK = exports.HSLtoHEX = exports.HSLtoRGB = void 0;

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
const HSLtoRGB = function (hsl) {
  let h = hsl.hue;
  let s = hsl.sat;
  let l = hsl.light;
  let r, g, b;
  h /= 360;
  s /= 100;
  l /= 100;

  if (s == 0) {
    r = g = b = l;
  } else {
    const hue2rgb = function (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

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

exports.HSLtoRGB = HSLtoRGB;

const HSLtoHEX = function (hsl) {
  return RGBtoHEX(HSLtoRGB(hsl));
};

exports.HSLtoHEX = HSLtoHEX;

const HSLtoCMYK = function (hsl) {
  return RGBtoCMYK(HSLtoRGB(hsl));
};

exports.HSLtoCMYK = HSLtoCMYK;

const HSLtoHSV = function (hsl) {
  return RGBtoHSV(HSLtoRGB(hsl));
};

exports.HSLtoHSV = HSLtoHSV;

const RGBtoHSL = function (rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
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
    hue: Math.round(h * 360),
    sat: Math.round(s * 100),
    light: Math.round(l * 100)
  };
  hsl.h = hsl.h == 360 ? 0 : hsl.h;
  return hsl;
};

exports.RGBtoHSL = RGBtoHSL;

const RGBtoHEX = function (rgb) {
  return "#" + numberToHex(parseInt(rgb.r)) + numberToHex(parseInt(rgb.g)) + numberToHex(parseInt(rgb.b));
};

exports.RGBtoHEX = RGBtoHEX;

const numberToHex = function (n) {
  let hex = n.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

exports.numberToHex = numberToHex;

const RGBtoCMYK = function (rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  r /= 255;
  g /= 255;
  b /= 255;
  let k = 1 - Math.max(r, g, b);
  let c = (1 - r - k) / (1 - k) || 0;
  let m = (1 - g - k) / (1 - k) || 0;
  let y = (1 - b - k) / (1 - k) || 0;

  let format = function (c) {
    return c > 0.0 && c < 1.0 ? parseFloat(c.toFixed(2)) : c;
  };

  c = format(c);
  m = format(m);
  y = format(y);
  k = format(k);
  return {
    c,
    m,
    y,
    k
  };
};

exports.RGBtoCMYK = RGBtoCMYK;

const RGBtoHSV = function (rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  r /= 255;
  g /= 255;
  b /= 255;
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

  return {
    hue: Math.round(h * 360),
    sat: Math.round(s * 100),
    val: Math.round(v * 100)
  };
};

exports.RGBtoHSV = RGBtoHSV;

const HEXtoHSL = function (hexString) {
  return RGBtoHSL(HEXtoRGB(hexString));
};

exports.HEXtoHSL = HEXtoHSL;

const HEXtoRGB = function (hexString) {
  let rgb = {
    r: extractNumberFromHex(hexString, 1, 3),
    g: extractNumberFromHex(hexString, 3, 5),
    b: extractNumberFromHex(hexString, 5, 7)
  };
  return isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b) ? {
    r: NaN,
    g: NaN,
    b: NaN
  } : rgb;
};

exports.HEXtoRGB = HEXtoRGB;

const HEXtoCMYK = function (hexString) {
  return RGBtoCMYK(HEXtoRGB(hexString));
};

exports.HEXtoCMYK = HEXtoCMYK;

const HEXtoHSV = function (hexString) {
  return RGBtoHSV(HEXtoRGB(hexString));
};

exports.HEXtoHSV = HEXtoHSV;

const Hex3To6Char = function (hex) {
  return hex.length == 4 ? "#" + hex.substring(1, 2).repeat(2) + "" + hex.substring(2, 3).repeat(2) + "" + hex.substring(3, 4).repeat(2) : hex;
};

exports.Hex3To6Char = Hex3To6Char;

const extractNumberFromHex = function (HEXString, start, end) {
  HEXString = Hex3To6Char(HEXString);
  return parseInt(HEXString.substring(start, end), 16);
};

exports.extractNumberFromHex = extractNumberFromHex;

const CMYKtoHSL = function (cmyk) {
  return RGBtoHSL(CMYKtoRGB(cmyk));
};

exports.CMYKtoHSL = CMYKtoHSL;

const CMYKtoRGB = function (cmyk) {
  return {
    r: Math.round(255 * (1 - cmyk.c) * (1 - cmyk.k)),
    g: Math.round(255 * (1 - cmyk.m) * (1 - cmyk.k)),
    b: Math.round(255 * (1 - cmyk.y) * (1 - cmyk.k))
  };
};

exports.CMYKtoRGB = CMYKtoRGB;

const CMYKtoHEX = function (cmyk) {
  return RGBtoHEX(CMYKtoRGB(cmyk));
};

exports.CMYKtoHEX = CMYKtoHEX;

const CMYKtoHSV = function (cmyk) {
  return RGBtoHSV(CMYKtoRGB(cmyk));
};

exports.CMYKtoHSV = CMYKtoHSV;

const HSVtoHSL = function (hsv) {
  return RGBtoHSL(HSVtoRGB(hsv));
};

exports.HSVtoHSL = HSVtoHSL;

const HSVtoRGB = function (hsv) {
  let h = hsv.hue / 360,
      s = hsv.sat / 100,
      v = hsv.val / 100;
  let r, g, b;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      {
        r = v;
        g = t;
        b = p;
      }
      break;

    case 1:
      {
        r = q;
        g = v;
        b = p;
      }
      break;

    case 2:
      {
        r = p;
        g = v;
        b = t;
      }
      break;

    case 3:
      {
        r = p;
        g = q;
        b = v;
      }
      break;

    case 4:
      {
        r = t;
        g = p;
        b = v;
      }
      break;

    case 5:
      {
        r = v;
        g = p;
        b = q;
      }
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

exports.HSVtoRGB = HSVtoRGB;

const HSVtoHEX = function (hsv) {
  return RGBtoHEX(HSVtoRGB(hsv));
};

exports.HSVtoHEX = HSVtoHEX;

const HSVtoCMYK = function (hsv) {
  return RGBtoCMYK(HSVtoRGB(hsv));
};

exports.HSVtoCMYK = HSVtoCMYK;