import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a duration in seconds into a formatted countdown string.
 *
 * @param seconds - The input duration in seconds.
 * @returns The transformed value, which is a formatted string representing the countdown in minutes and seconds (MM:SS).
 */

@Pipe({
  name: 'countDown'
})
export class CountDownPipe implements PipeTransform {
  transform(seconds: number): string {
    if (seconds) {
      const minutes = Math.floor(seconds / 60);
      const secondsFormatted = Math.floor(seconds % 60);
      return `${minutes < 10 ? '0' + minutes : minutes}:${secondsFormatted < 10 ? '0' + secondsFormatted : secondsFormatted}`;
    }
    return '';
  }
}
