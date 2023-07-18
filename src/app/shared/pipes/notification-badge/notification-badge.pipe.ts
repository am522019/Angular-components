import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a notification number into a formatted string for displaying a notification badge.
 *
 * @param notificationNum - The input notification number to be transformed.
 * @returns The transformed value, which is a formatted string representing the notification number.
 */

@Pipe({
  name: 'notificationBadge'
})
export class NotificationBadgePipe implements PipeTransform {
  transform(notificationNum: number) {
    if (notificationNum && notificationNum > 9) {
      return 9 + '+';
    }
    return notificationNum;
  }
}
