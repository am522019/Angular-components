import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a beneficiary object into a formatted string representing the beneficiary's name or
 * business name.
 *
 * @param item - The input beneficiary object.
 * @returns The transformed value, which is a formatted string representing the beneficiary's name or business name.
 */

@Pipe({
  name: 'beneficiaryName'
})
export class BeneficiaryNamePipe implements PipeTransform {
  constructor() {}
  transform(item: any) {
    let res = '';
    let details = item;
    try {
      if (item?.details) {
        details = JSON.parse(item?.details)?.beneficiary;
      }
      if (details.beneficiary) {
        details = details?.beneficiary;
      }
    } catch (err) {}

    if (details?.fullName) {
      res += details?.fullName;
    } else if (details?.firstName) {
      res += details?.firstName + ' ' + details?.lastName;
    } else if (details?.agribusinessName) {
      res += details?.agribusinessName;
    } else if (details?.name) {
      res += details?.name;
    }
    return res || '-';
  }
}
