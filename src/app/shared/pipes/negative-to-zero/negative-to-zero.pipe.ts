import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a number by replacing negative values and NaN with zero.
 *
 * @param number - The input number to be transformed.
 * @returns - Either the input number itself if it is positive, or zero if the number is negative or NaN.
 */

@Pipe({
  name: 'negativeToZero'
})
export class NegativeToZeroPipe implements PipeTransform {
  transform(number: number) {
    if (number <= 0 || isNaN(number)) {
      return 0;
    }
    return number;
  }
}
