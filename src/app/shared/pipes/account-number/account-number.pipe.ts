import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms an account number by hiding all but the last four digits.
 *
 * @param accNum - The input account number.
 * @param isTopBanner - optional argument that indicates whether the transformation is for a top banner
 * (true) or not (false).
 * @returns -  If isTopBanner is true, returns the last four digits of the account number. If isTopBanner is false or not provided, the transformed value is represented by four asterisks followed by the last four digits of the account number.
 */

@Pipe({
  name: 'accountNumber'
})
export class AccountNumberPipe implements PipeTransform {
  constructor() {}
  transform(accNum: string, isTopBanner?: boolean) {
    if (isTopBanner) {
      return accNum.slice(-4);
    }
    return '****' + accNum?.slice(-4);
  }
}
