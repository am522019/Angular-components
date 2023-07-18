import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms milliseconds into a formatted time string.
 *
 * @param milliseconds - The number of milliseconds to be transformed.
 * @returns The formatted time string in the format "HH:mm:ss".
 */

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(miliseconds?: number): string {
    if (!miliseconds) {
      return '00:00:00';
    }
    let seconds: any = Math.floor(miliseconds / 1000);
    let minutes: any = Math.floor(seconds / 60);
    let hours: any = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 100;
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (miliseconds >= 359945900) {
      return '99:59:59';
    }
    return `${hours}:${minutes}:${seconds}`;
  }
}
