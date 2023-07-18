import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a date into the number of days between the input date and the current date.
 *
 * @param date - The input date to calculate the difference in days.
 * @returns The transformed value, which is the number of days between the input date and the current date.
 */

@Pipe({
  name: 'diffDay'
})
export class DiffDayPipe implements PipeTransform {
  transform(date: Date): number {
    if (Math.round((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 0) return 0;
    else if (isNaN(Math.round((new Date('10, 30, 2022').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))) {
      return 0;
    } else {
      return Math.round((new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    }
  }
}
