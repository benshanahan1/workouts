/**
 * Pad a number with leading zeros.
 *
 * @param num The number to pad
 * @param width Padding width, e.g. width of 5 is 00123
 * @returns Padding number
 */
export function padZeros(value: number, width: number): string {
  var output = value.toString();
  while (output.length < width) output = "0" + output;
  return output;
}
