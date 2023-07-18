import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that checks if two dates are the same.
 *
 * @param date1 - The first date to compare.
 * @param date2 - The second date to compare.
 * @returns A boolean value indicating whether the two dates are the same.
 */

@Pipe({
  name: 'sameDay'
})
export class SameDayPipe implements PipeTransform {
  transform(date1: Date, date2: Date): boolean {
    return new Date(date1).toDateString() === new Date(date2).toDateString();
  }
}
