import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms an array into a string by joining its elements with a comma separator.
 *
 * @param array - The input array to be transformed.
 * @returns A string representation of the array with its elements joined by commas.
 */

@Pipe({
  name: 'splitArrayPipe'
})
export class SplitArrayPipe implements PipeTransform {
  transform(array: any): string {
    return array.join(', ');
  }
}
