import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that checks if a given array of permissions includes a needed permission.
 *
 * @param perm - The input array of permissions to check against.
 * @param neededPermissions - The needed permission to check if it is included in the perm array.
 * @returns A boolean value indicating whether the needed permission is included in the perm array.
 */

@Pipe({
  name: 'perm'
})
export class PermPipe implements PipeTransform {
  constructor() {}
  transform(perm: string[], neededPermissions: string): boolean {
    return perm?.includes(neededPermissions);
  }
}
