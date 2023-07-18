import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a date into a formatted string representing the month and year.
 *
 * @param date - The input date to be transformed.
 * @param isYear - An optional boolean parameter indicating whether to include the year in the formatted string.
 * @returns The transformed value, which is a formatted string representing the month and year (e.g., "January" or "January 2023").
 */

@Pipe({
  name: 'monthAndYear'
})
export class MonthAndYearDatePipe implements PipeTransform {
  transform(date: Date, isYear?: boolean): any {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let month: any;
    const currmonth = date.getMonth() + 1;
    if (currmonth === 12) {
      month = monthNames[0];
    } else {
      month = monthNames[currmonth];
    }
    if (isYear) {
      let year: any;
      if (currmonth === 12) {
        year = date.getFullYear() + 1;
      } else {
        year = date.getFullYear();
      }
      return `${month}  ${year}`;
    } else {
      return `${month}`;
    }
  }
}
