export const COLOR_BLACK = '#151716';
export const COLOR_SECOND_BLACK = '#202528';
export const COLOR_WHITE = '#FEFEFF';
export const COLOR_BACKGROUND_WHITE = '#F9F9FF';
export const COLOR_BACKGROUND_TYPES = '#F3F4F8';
export const COLOR_BACKGROUND_TOSS = '#F2F3F5';
export const COLOR_ERROR = '#FF6B6B';
export const COLOR_SUCCESS = '#81C784';
export const COLOR_SEPARATOR = '#EEEEEE';
export const COLOR_SECOND_SEPARATOR = '#dddddd';
export const COLOR_GRAY = '#888888';

export const COLOR_PRIMARY_TEXT = '#F0FFFF';

export const textColor = COLOR_BLACK;
// export const backgroundColor = COLOR_BACKGROUND_WHITE;

let prim = '';
let sec = '';
let primOutline = '';
let bg = '';

async function setColor(color) {
  prim = color;
  const segments = [];

  for (var i = 1; i < color.length; i += 2) {
    segments.push(color.slice(i, i + 2));
  }

  let temp1 = parseInt(segments[0], 16);
  let temp2 = parseInt(segments[1], 16);
  let temp3 = parseInt(segments[2], 16);

  const N1 = 176;
  const N2 = 20;
  const N3 = 193;

  sec =
    '#' +
    Math.min(temp1 + N1, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp2 + N1, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp3 + N1, 0xff)
      .toString(16)
      .padStart(2, '0');
  primOutline =
    '#' +
    Math.min(temp1 + N2, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp2 + N2, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp3 + N2, 0xff)
      .toString(16)
      .padStart(2, '0');
  bg =
    '#' +
    Math.min(temp1 + N3, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp2 + N3, 0xff)
      .toString(16)
      .padStart(2, '0') +
    Math.min(temp3 + N3, 0xff)
      .toString(16)
      .padStart(2, '0');
}

setColor('#36A4FD');

export const COLOR_PRIMARY = prim;
export const COLOR_SECONDARY = sec;
export const COLOR_PRIMARY_OUTLINE = primOutline;
export const backgroundColor = bg;

// export const COLOR_PRIMARY = '#36A4FD';
// export const COLOR_SECONDARY = '#ECFCFC';
// export const COLOR_PRIMARY_OUTLINE = '#4AB8FF';
// export const backgroundColor = COLOR_BACKGROUND_WHITE;
