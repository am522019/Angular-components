import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a string by extracting the first name from a full name.
 *
 * @param item - The input string representing a full name.
 * @returns The transformed value, which is the first name extracted from the input string.
 */

@Pipe({
  name: 'firstNameSlice'
})
export class FirstNameSlicePipe implements PipeTransform {
  transform(item: string) {
    return String(item).split(' ')[0];
  }
}
