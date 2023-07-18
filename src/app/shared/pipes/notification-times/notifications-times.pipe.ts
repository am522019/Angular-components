import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a date or timestamp value into a formatted string representing the notification time.
 *
 * @param value - The input date or timestamp value to be transformed.
 * @returns The transformed value, which is a formatted string representing the notification time.
 */

@Pipe({
  name: 'NotificatonsTimesPipe'
})
export class NotificatonsTimesPipe implements PipeTransform {
  transform(value: Date | number | string): string {
    if (!value) return undefined;
    const modifiedDate = new Date(value);
    const hours = modifiedDate.getHours();
    const minutes = modifiedDate.getMinutes();
    const calc = 1000 * 60 * 60 * 24;

    if ((new Date().getTime() - modifiedDate.getTime()) / calc < 1) {
      return `Today ${hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    } else if ((new Date().getTime() - modifiedDate.getTime()) / calc < 2) {
      return `Yesterday`;
    } else return '' + modifiedDate.getDate() + '/' + (modifiedDate.getMonth() + 1) + '/' + modifiedDate.getFullYear();
  }
}
