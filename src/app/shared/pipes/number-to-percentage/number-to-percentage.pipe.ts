import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a number into a formatted string representing a percentage or performs calculations based on the provided type.
 *
 * @param value - The input number to be transformed or used in calculations.
 * @param type - A string indicating the type of transformation or calculation to perform.
 * @param total - An optional parameter representing the total value used in calculations.
 * @returns The transformed value, which can be a formatted percentage string or a calculated value based on the provided type.
 */

@Pipe({
  name: 'numToPercentage'
})
export class NumToPercentagePipe implements PipeTransform {
  constructor() {}
  transform(value: number, type: string, total?: number): string | number {
    if (type === 'topercent') {
      return value * 100 + '%';
    } else if (type === 'restpercent') {
      return 100 - value * 100 + '%';
    } else if (type === 'avAmount') {
      return total * value;
    } else if (type === 'cusAmount') {
      return (1 - value) * total;
    }
  }
}
