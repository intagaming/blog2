/* eslint-disable import/prefer-default-export */
// https://stackoverflow.com/a/2587398
// parse a date in yyyy-mm-dd format
export function parseDate(input: string) {
  const parts = input.split("-");
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10)
  ); // Note: months are 0-based
}
