import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a phone number value by concatenating it with a country phone code.
 *
 * @param value - An object that should have the properties phoneNumber and countryPhoneCode.
 * @returns The transformed phone number value with the country phone code.
 */

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {
  transform(value: any & { phoneNumber: string; countryPhoneCode: string }): unknown {
    if (value.phoneNumber && value.countryPhoneCode) {
      return value.countryPhoneCode + value.phoneNumber;
    }
    return null;
  }
}
