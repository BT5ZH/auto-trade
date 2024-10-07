// case '30m':
//   if (
//     (p_min / 30 == 0 && p_sec == 0) ||
//     (p_min / 30 == 1 && p_sec == 0)
//   ) {
//     moveToNext();
//   }
//   break;
// case '1h':
//   if (
//     (p_hours / 1 == 0 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 1 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 2 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 3 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 5 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 6 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 7 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 8 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 9 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 10 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 11 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 12 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 13 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 14 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 15 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 16 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 17 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 18 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 19 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 20 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 21 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 22 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 1 == 23 && p_min == 0 && p_sec == 0)
//   ) {
//     moveToNext();
//   }
//   break;
// case '2h':
//   if (
//     (p_hours / 2 == 0 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 1 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 2 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 3 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 5 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 6 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 7 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 8 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 9 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 10 && p_min == 0 && p_sec == 0) ||
//     (p_hours / 2 == 11 && p_min == 0 && p_sec == 0)
//   ) {
//     moveToNext();
//   }
//   break;
// case '4h':
// if (
//   (p_hours / 4 == 0 && p_min == 0 && p_sec == 0) ||
//   (p_hours / 4 == 1 && p_min == 0 && p_sec == 0) ||
//   (p_hours / 4 == 2 && p_min == 0 && p_sec == 0) ||
//   (p_hours / 4 == 3 && p_min == 0 && p_sec == 0) ||
//   (p_hours / 4 == 4 && p_min == 0 && p_sec == 0) ||
//   (p_hours / 4 == 5 && p_min == 0 && p_sec == 0)
// ) {
//   moveToNext();
// }
// break;

// case '30m':
//   if (Math.floor(min / 30) == 0) {
//     min = 0;
//     result = Date.UTC(year, month, date, hours, 0, 0, 0) / 1000;
//   } else if (Math.floor(min / 30) == 1) {
//     min = 30;
//     result = Date.UTC(year, month, date, hours, 30, 0, 0) / 1000;
//   }
//   break;
// case '1h':
//   if (Math.floor(hours / 1) == 0) {
//     hours = 0;
//     result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 1) {
//     hours = 1;
//     result = Date.UTC(year, month, date, 1, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 2) {
//     hours = 2;
//     result = Date.UTC(year, month, date, 2, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 3) {
//     hours = 3;
//     result = Date.UTC(year, month, date, 3, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 4) {
//     hours = 4;
//     result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 5) {
//     hours = 5;
//     result = Date.UTC(year, month, date, 5, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 6) {
//     hours = 6;
//     result = Date.UTC(year, month, date, 6, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 7) {
//     hours = 7;
//     result = Date.UTC(year, month, date, 7, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 8) {
//     hours = 8;
//     result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 9) {
//     hours = 9;
//     result = Date.UTC(year, month, date, 9, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 10) {
//     hours = 10;
//     result = Date.UTC(year, month, date, 10, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 11) {
//     hours = 11;
//     result = Date.UTC(year, month, date, 11, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 12) {
//     hours = 12;
//     result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 13) {
//     hours = 13;
//     result = Date.UTC(year, month, date, 13, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 14) {
//     hours = 14;
//     result = Date.UTC(year, month, date, 14, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 15) {
//     hours = 15;
//     result = Date.UTC(year, month, date, 15, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 16) {
//     hours = 16;
//     result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 17) {
//     hours = 17;
//     result = Date.UTC(year, month, date, 17, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 18) {
//     hours = 18;
//     result = Date.UTC(year, month, date, 18, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 19) {
//     hours = 19;
//     result = Date.UTC(year, month, date, 19, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 20) {
//     hours = 20;
//     result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 21) {
//     hours = 21;
//     result = Date.UTC(year, month, date, 21, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 22) {
//     hours = 22;
//     result = Date.UTC(year, month, date, 22, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 1) == 23) {
//     hours = 23;
//     result = Date.UTC(year, month, date, 23, 0, 0, 0) / 1000;
//   }
//   break;
// case '2h':
//   if (Math.floor(hours / 2) == 0) {
//     hours = 0;
//     result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 1) {
//     hours = 2;
//     result = Date.UTC(year, month, date, 2, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 2) {
//     hours = 4;
//     result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 3) {
//     hours = 6;
//     result = Date.UTC(year, month, date, 6, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 4) {
//     hours = 8;
//     result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 5) {
//     hours = 10;
//     result = Date.UTC(year, month, date, 10, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 6) {
//     hours = 12;
//     result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 7) {
//     hours = 14;
//     result = Date.UTC(year, month, date, 14, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 8) {
//     hours = 16;
//     result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 9) {
//     hours = 18;
//     result = Date.UTC(year, month, date, 18, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 10) {
//     hours = 20;
//     result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 2) == 11) {
//     hours = 22;
//     result = Date.UTC(year, month, date, 22, 0, 0, 0) / 1000;
//   }
//   break;
// case '4h':
//   if (Math.floor(hours / 4) == 0) {
//     hours = 0;
//     result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 4) == 1) {
//     hours = 4;
//     result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 4) == 2) {
//     hours = 8;
//     result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 4) == 3) {
//     hours = 12;
//     result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 4) == 4) {
//     hours = 16;
//     result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
//   } else if (Math.floor(hours / 4) == 5) {
//     hours = 20;
//     result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
//   }
//   break;

// switch (select_interval.value) {
//   case '5m':
//     if (
//       (p_min / 5 == 0 && p_sec == 0) ||
//       (p_min / 5 == 1 && p_sec == 0) ||
//       (p_min / 5 == 2 && p_sec == 0) ||
//       (p_min / 5 == 3 && p_sec == 0) ||
//       (p_min / 5 == 4 && p_sec == 0) ||
//       (p_min / 5 == 5 && p_sec == 0) ||
//       (p_min / 5 == 6 && p_sec == 0) ||
//       (p_min / 5 == 7 && p_sec == 0) ||
//       (p_min / 5 == 8 && p_sec == 0) ||
//       (p_min / 5 == 9 && p_sec == 0) ||
//       (p_min / 5 == 10 && p_sec == 0) ||
//       (p_min / 5 == 11 && p_sec == 0)
//     ) {
//       // move to next bar

//     }
//     break;
//   case '15m':
//     if (
//       (p_min / 15 == 0 && p_sec == 0) ||
//       (p_min / 15 == 1 && p_sec == 0) ||
//       (p_min / 15 == 2 && p_sec == 0) ||
//       (p_min / 15 == 3 && p_sec == 0)
//     ) {
//       // move to next bar

//     }
//     break;

//   default:
//     break;
// }

// var processTime = new Date(pl.data.E);
// let p_year = processTime.getUTCFullYear();
// let p_month = processTime.getUTCMonth() + 1;
// let p_date = processTime.getUTCDate();
//这个位置要非常小心，处理时区
// let hours = currentTime.getUTCHours();
// let p_hours = processTime.getHours();
// let p_min = processTime.getUTCMinutes();
// let p_sec = processTime.getUTCSeconds();

const nextValidateTime = (time_interval) => {
  var now = new Date().getTime();
  var currentTime = new Date(now);
  let year = currentTime.getUTCFullYear();
  let month = currentTime.getUTCMonth();
  let date = currentTime.getUTCDate();
  //这个位置要非常小心，处理时区
  // let hours = currentTime.getUTCHours();
  let hours = currentTime.getUTCHours();
  let min = currentTime.getUTCMinutes();
  let sec = currentTime.getUTCSeconds();

  console.log(
    year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec
  );
  let result;
  switch (time_interval) {
    case '5m':
      if (min / 5 == 0) {
        min = 0;
        result = Date.UTC(year, month, date, hours, 0, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 1) {
        min = 5;
        result = Date.UTC(year, month, date, hours, 5, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 2) {
        min = 10;
        result = Date.UTC(year, month, date, hours, 10, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 3) {
        min = 15;
        result = Date.UTC(year, month, date, hours, 15, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 4) {
        min = 20;
        result = Date.UTC(year, month, date, hours, 20, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 5) {
        min = 25;
        result = Date.UTC(year, month, date, hours, 25, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 6) {
        min = 30;
        result = Date.UTC(year, month, date, hours, 30, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 7) {
        min = 35;
        result = Date.UTC(year, month, date, hours, 35, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 8) {
        min = 40;
        result = Date.UTC(year, month, date, hours, 40, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 9) {
        min = 45;
        result = Date.UTC(year, month, date, hours, 45, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 10) {
        min = 50;
        result = Date.UTC(year, month, date, hours, 50, 0, 0) / 1000;
        console.log(result);
      } else if (min / 5 == 11) {
        min = 55;
        result = Date.UTC(year, month, date, hours, 55, 0, 0) / 1000;
        console.log(result);
      }
      break;
    case '15m':
      if (Math.floor(min / 15) == 0) {
        min = 0;
        result = Date.UTC(year, month, date, hours, 0, 0, 0) / 1000;
      } else if (Math.floor(min / 15) == 1) {
        min = 15;
        result = Date.UTC(year, month, date, hours, 15, 0, 0) / 1000;
      } else if (Math.floor(min / 15) == 2) {
        min = 30;
        result = Date.UTC(year, month, date, hours, 30, 0, 0) / 1000;
      } else if (Math.floor(min / 15) == 3) {
        min = 45;
        result = Date.UTC(year, month, date, hours, 45, 0, 0) / 1000;
      }
      break;
    case '30m':
      if (Math.floor(min / 30) == 0) {
        min = 0;
        result = Date.UTC(year, month, date, hours, 0, 0, 0) / 1000;
      } else if (Math.floor(min / 30) == 1) {
        min = 30;
        result = Date.UTC(year, month, date, hours, 30, 0, 0) / 1000;
      }
      break;
    case '1h':
      if (Math.floor(hours / 1) == 0) {
        hours = 0;
        result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 1) {
        hours = 1;
        result = Date.UTC(year, month, date, 1, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 2) {
        hours = 2;
        result = Date.UTC(year, month, date, 2, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 3) {
        hours = 3;
        result = Date.UTC(year, month, date, 3, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 4) {
        hours = 4;
        result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 5) {
        hours = 5;
        result = Date.UTC(year, month, date, 5, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 6) {
        hours = 6;
        result = Date.UTC(year, month, date, 6, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 7) {
        hours = 7;
        result = Date.UTC(year, month, date, 7, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 8) {
        hours = 8;
        result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 9) {
        hours = 9;
        result = Date.UTC(year, month, date, 9, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 10) {
        hours = 10;
        result = Date.UTC(year, month, date, 10, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 11) {
        hours = 11;
        result = Date.UTC(year, month, date, 11, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 12) {
        hours = 12;
        result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 13) {
        hours = 13;
        result = Date.UTC(year, month, date, 13, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 14) {
        hours = 14;
        result = Date.UTC(year, month, date, 14, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 15) {
        hours = 15;
        result = Date.UTC(year, month, date, 15, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 16) {
        hours = 16;
        result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 17) {
        hours = 17;
        result = Date.UTC(year, month, date, 17, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 18) {
        hours = 18;
        result = Date.UTC(year, month, date, 18, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 19) {
        hours = 19;
        result = Date.UTC(year, month, date, 19, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 20) {
        hours = 20;
        result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 21) {
        hours = 21;
        result = Date.UTC(year, month, date, 21, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 22) {
        hours = 22;
        result = Date.UTC(year, month, date, 22, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 1) == 23) {
        hours = 23;
        result = Date.UTC(year, month, date, 23, 0, 0, 0) / 1000;
      }
      break;
    case '2h':
      if (Math.floor(hours / 2) == 0) {
        hours = 0;
        result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 1) {
        hours = 2;
        result = Date.UTC(year, month, date, 2, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 2) {
        hours = 4;
        result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 3) {
        hours = 6;
        result = Date.UTC(year, month, date, 6, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 4) {
        hours = 8;
        result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 5) {
        hours = 10;
        result = Date.UTC(year, month, date, 10, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 6) {
        hours = 12;
        result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 7) {
        hours = 14;
        result = Date.UTC(year, month, date, 14, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 8) {
        hours = 16;
        result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 9) {
        hours = 18;
        result = Date.UTC(year, month, date, 18, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 10) {
        hours = 20;
        result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 2) == 11) {
        hours = 22;
        result = Date.UTC(year, month, date, 22, 0, 0, 0) / 1000;
      }
      break;
    case '4h':
      if (Math.floor(hours / 4) == 0) {
        hours = 0;
        result = Date.UTC(year, month, date, 0, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 4) == 1) {
        hours = 4;
        result = Date.UTC(year, month, date, 4, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 4) == 2) {
        hours = 8;
        result = Date.UTC(year, month, date, 8, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 4) == 3) {
        hours = 12;
        result = Date.UTC(year, month, date, 12, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 4) == 4) {
        hours = 16;
        result = Date.UTC(year, month, date, 16, 0, 0, 0) / 1000;
      } else if (Math.floor(hours / 4) == 5) {
        hours = 20;
        result = Date.UTC(year, month, date, 20, 0, 0, 0) / 1000;
      }
      break;

    default:
      break;
  }
  console.log(result);
  return result;
};
// const bresp = await openInterest({
//   keys: { api, sec },
//   timestamp: Date.now() - 1000,
//   symbol: 'RAYUSDT',
// });
