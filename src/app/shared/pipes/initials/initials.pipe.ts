import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a beneficiary object into their initials.
 *
 * @param beneficiary - The input beneficiary object.
 * @returns The transformed value, which is the initials extracted from the beneficiary's name.
 */

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  constructor() {}
  transform(beneficiary: any) {
    let initials = '';
    const split = beneficiary?.name?.split(' ');
    if (split?.[0]?.[0]) {
      initials += split?.[0]?.[0];
    }
    if (split?.[1]?.[0]) {
      initials += split[1][0];
    }

    return initials || 'NA';
  }
}
