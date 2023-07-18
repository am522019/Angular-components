import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a number into a two-digit decimal value.
 *
 * @param number - The number to be transformed.
 * @returns The transformed number as a two-digit decimal value.
 */

@Pipe({
  name: 'twoDigits'
})
export class TwoDigitsPipe implements PipeTransform {
  transform(number: number) {
    if (number && number.toString() && number.toString().indexOf('.') !== -1) {
      try {
        return +(number.toString().split('.')[0] + '.' + number.toString().split('.')[1].slice(0, 2));
      } catch {
        return number;
      }
    } else {
      return number;
    }
  }
}
