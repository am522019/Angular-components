import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a string value based on a specified pattern using the DecimalPipe.
 *
 * @param value - The input string value to be transformed.
 * @param pattern - The pattern string used for formatting the value.
 * @returns The transformed string value formatted according to the specified pattern.
 */

@Pipe({
  name: 'problemNumber'
})
export class ProblemNumberPipe implements PipeTransform {
  constructor(private pipe: DecimalPipe) {}
  transform(value: string, pattern: string): string {
    try {
      if (value.indexOf('.') !== -1) {
        throw 'error';
      }
      return this.pipe.transform(value, pattern);
    } catch {
      if (value?.indexOf('.')) {
        return this.pipe.transform(value.split('.')[0]) + '.' + value.split('.')[1];
      }
    }
    return undefined;
  }
}
