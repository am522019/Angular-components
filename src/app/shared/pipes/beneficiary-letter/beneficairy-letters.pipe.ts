import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a beneficiary object into a formatted string representing the beneficiary's name or
 * business name.
 *
 * @param item - The input beneficiary object.
 * @returns The transformed value, which is a formatted string representing the beneficiary's name or business
 * name.
 */

@Pipe({
  name: 'beneficiaryLetters'
})
export class BeneficiaryLettersPipe implements PipeTransform {
  constructor() {}
  transform(item: any) {
    let res = '';
    let details = item;
    try {
      if (item.details) {
        details = JSON.parse(item.details).beneficiary;
      }
      if (details.beneficiary) {
        details = details.beneficiary;
      }
    } catch (err) {}
    if (details?.fullName) {
      res += details.fullName;
    } else if (details?.firstName) {
      res += details.firstName.slice(0, 1) + details.lastName.slice(0, 1);
    } else if (details?.agribusinessName) {
      res += details?.agribusinessName;
    } else if (details?.personalInformation) {
      res += details?.personalInformation.firstName.slice(0, 1) + details?.personalInformation.lastName.slice(0, 1);
    } else if (details?.name) {
      if (details?.name?.indexOf(' ') >= 0) {
        res += details.name.slice(0, 1) + details.name.substr(details.name.indexOf(' ') + 1).slice(0, 1);
      } else {
        res += details?.name.slice(0, 2);
      }
    } else if (details?.businessName) {
      if (details?.businessName?.indexOf(' ') >= 0) {
        res += details.businessName.slice(0, 1) + details.businessName.substr(details.businessName.indexOf(' ') + 1).slice(0, 1);
      } else {
        res += details?.businessName.slice(0, 2);
      }
    }
    return res || '-';
  }
}
