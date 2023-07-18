import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a string by removing everything after the first dot ('.') character.
 *
 * @param item - The input string to be transformed.
 * @returns The transformed value, which is the input string without anything after the first dot ('.') character.
 */

@Pipe({
  name: 'dotSlice'
})
export class SliceDotPipe implements PipeTransform {
  phoneUtil: any;

  transform(item: string) {
    return String(item).split('.')[0];
  }
}
