import {

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
  } from './Converter';

const red = {hsl: {hue:0, sat:100, light:50}, rgb: {r:255,g:0, b:0}, hex: '#ff0000', hsv:{hue:0,sat:100, val:100}, cmyk:{c:0, m:1, y:1, k:0}}
const green = {hsl: {hue:120, sat:100, light:50}, rgb: {r:0,g:255, b:0}, hex: '#00ff00', hsv:{hue:120,sat:100, val:100}, cmyk:{c:1, m:0, y:1, k:0}}
const blue = {hsl: {hue:240, sat:100, light:50}, rgb: {r:0,g:0, b:255}, hex: '#0000ff', hsv:{hue:240,sat:100, val:100}, cmyk:{c:1, m:1, y:0, k:0}}
const white = {hsl: {hue:0, sat:0,light:100}, rgb: {r:255,g:255, b:255}, hex: '#ffffff', hsv:{hue:0,sat:0, val:100}, cmyk:{c:0, m:0, y:0, k:0}}
const black = {hsl: {hue:0, sat:0,light:0}, rgb: {r:0,g:0, b:0}, hex: '#000000', hsv:{hue:0,sat:0, val:0}, cmyk:{c:0, m:0, y:0, k:1}}
const colorNaN = {hsl: {hue:NaN, sat:NaN,light:NaN}, rgb: {r:NaN,g:NaN, b:NaN}, hex: '#NaNNaNNaN', hsv:{hue:NaN,sat:NaN, val:NaN}, cmyk:{c:0, m:0, y:0, k:NaN}}


// test cases white, black, red, green, blue, NaN
const testColors = [red, green, blue, white, black, colorNaN]


// HSL set
test('HSL to RGB', () => {
    testColors.forEach(color => expect(HSLtoRGB(color.hsl)).toEqual(color.rgb))
  });
test('HSL to HEX', () => {
    testColors.forEach(color => expect(HSLtoHEX(color.hsl)).toEqual(color.hex))
  });
test('HSL to CMYK', () => {
    testColors.forEach(color => expect(HSLtoCMYK(color.hsl)).toEqual(color.cmyk))
  });
test('HSL to HSV', () => {
    testColors.forEach(color => expect(HSLtoHSV(color.hsl)).toEqual(color.hsv))
  });

// RGB set
test('RGB to HSL', () => {
    testColors.forEach(color => expect(RGBtoHSL(color.rgb)).toEqual(color.hsl))
  });
test('RGB to HEX', () => {
    testColors.forEach(color => expect(RGBtoHEX(color.rgb)).toEqual(color.hex))
  });
test('RGB to CMYK', () => {
    testColors.forEach(color => expect(RGBtoCMYK(color.rgb)).toEqual(color.cmyk))
  });
test('RGB to HSV', () => {
    testColors.forEach(color => expect(RGBtoHSV(color.rgb)).toEqual(color.hsv))
  });

// HEX set
test('HEX to RGB', () => {
    testColors.forEach(color => expect(HEXtoRGB(color.hex)).toEqual(color.rgb))
  });
test('HEX to HSL', () => {
    testColors.forEach(color => expect(HEXtoHSL(color.hex)).toEqual(color.hsl))
  });
test('HEX to CMYK', () => {
    testColors.forEach(color => expect(HEXtoCMYK(color.hex)).toEqual(color.cmyk))
  });
test('HEX to HSV', () => {
    testColors.forEach(color => expect(HEXtoHSV(color.hex)).toEqual(color.hsv))
  });


// CMYK set
test('CMYK to RGB', () => {
    testColors.forEach(color => expect(CMYKtoRGB(color.cmyk)).toEqual(color.rgb))
  });
test('CMYK to HSL', () => {
    testColors.forEach(color => expect(CMYKtoHSL(color.cmyk)).toEqual(color.hsl))
  });
test('CMYK to HEX', () => {
    testColors.forEach(color => expect(CMYKtoHEX(color.cmyk)).toEqual(color.hex))
  });
test('CMYK to HSV', () => {
    testColors.forEach(color => expect(CMYKtoHSV(color.cmyk)).toEqual(color.hsv))
  });

// HSV set
test('HSV to RGB', () => {
    testColors.forEach(color => expect(HSVtoRGB(color.hsv)).toEqual(color.rgb))
  });
test('HSV to HSL', () => {
    testColors.forEach(color => expect(HSVtoHSL(color.hsv)).toEqual(color.hsl))
  });
test('HSV to HEX', () => {
    testColors.forEach(color => expect(HSVtoHEX(color.hsv)).toEqual(color.hex))
  });
test('HSV to CMYK', () => {
    testColors.forEach(color => expect(HSVtoCMYK(color.hsv)).toEqual(color.cmyk))
  });
