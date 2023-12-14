export const COLOR_BLACK = '#151716';
export const COLOR_SECOND_BLACK = '#202528';
export const COLOR_WHITE = '#FEFEFF';
export const COLOR_BACKGROUND_WHITE = '#F9F9FF';
export const COLOR_BACKGROUND_TYPES = '#F3F4F8';
export const COLOR_BACKGROUND_TOSS = '#F2F3F5';
export const COLOR_ERROR = '#FF6B6B';
export const COLOR_SUCCESS = '#81C784';
export const COLOR_SEPARATOR = '#dddddd';
export const COLOR_SECOND_SEPARATOR = '#dddddd';
export const COLOR_GRAY = '#888888';

export const COLOR_PRIMARY_TEXT = '#F0FFFF';

export const textColor = COLOR_BLACK;
// export const backgroundColor = COLOR_BACKGROUND_WHITE;
export const backgroundColor = '#F5F3F6';

// let prim = '';
// let sec = '';
// let primOutline = '';
// let bg = '';

// async function setColor({color, sec_2, primOutline_2, bg_2}) {
//   let color2 = color;
//   if (color.length === 7) {
//     color2 = color.slice(1);
//   }
//   prim = '#' + color2;

//   if (typeof sec_2 === 'string') {
//     if (sec_2.length === 7) {
//       sec = sec_2;
//     } else {
//       sec = '#' + sec_2;
//     }
//     if (primOutline_2.length === 7) {
//       primOutline = primOutline_2;
//     } else {
//       primOutline = '#' + primOutline_2;
//     }
//     if (bg_2.length === 7) {
//       bg = bg_2;
//     } else {
//       bg = '#' + bg_2;
//     }
//   } else {
//     const segments = [];

//     for (let i = 0; i < color2.length; i += 2) {
//       segments.push(color2.slice(i, i + 2));
//     }
//     let temp1 = parseInt(segments[0], 16);
//     let temp2 = parseInt(segments[1], 16);
//     let temp3 = parseInt(segments[2], 16);

//     const N1 = sec_2;
//     const N2 = primOutline_2;
//     const N3 = bg_2;

//     sec =
//       '#' +
//       Math.min(temp1 + N1, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp2 + N1, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp3 + N1, 0xff)
//         .toString(16)
//         .padStart(2, '0');
//     primOutline =
//       '#' +
//       Math.min(temp1 + N2, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp2 + N2, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp3 + N2, 0xff)
//         .toString(16)
//         .padStart(2, '0');
//     bg =
//       '#' +
//       Math.min(temp1 + N3, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp2 + N3, 0xff)
//         .toString(16)
//         .padStart(2, '0') +
//       Math.min(temp3 + N3, 0xff)
//         .toString(16)
//         .padStart(2, '0');
//   }
//   // return {temp1, temp2, temp3, prim, sec, primOutline, bg};
// }

// setColor({
//   color: '#6462E7',
//   primOutline_2: '#6462E7r',
//   sec_2: '#E6E4F2',
//   bg_2: '#F2F2F2',
//   });

// export const COLOR_PRIMARY = prim;
// export const COLOR_SECONDARY = sec;
// export const COLOR_PRIMARY_OUTLINE = primOutline;
// export const backgroundColor = bg;

export const COLOR_PRIMARY = '#6462E7';
export const COLOR_SECONDARY = '#E6E4F2';
export const COLOR_PRIMARY_OUTLINE = '#6462C7';
