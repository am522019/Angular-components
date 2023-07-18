import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a status value into its corresponding realName or color based on a provided array of StatusOptions.
 *
 * @param status - The status value to be transformed.
 * @param statuses - An array of StatusOptions containing the status mappings.
 * @param className - Optional boolean value indicating whether to return the color value as a class name.
 * @returns The realName or color value corresponding to the given status, or an empty string if no match is found.
 */

export interface StatusOptions {
  status: string;
  color: string;
  realName: string;
  default?: boolean;
}
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  constructor() {}
  transform(status: string, statuses: StatusOptions[], className?: boolean) {
    const statusOptions = statuses.find((data) => data.status === status);
    if (className) {
      return statusOptions?.color || statuses.find((data) => data.default)?.color;
    }
    return statusOptions?.realName || statuses.find((data) => data?.default)?.realName || '';
  }
}
