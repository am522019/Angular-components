import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  let pipe: PhoneNumberPipe;
  const beneficiary = { phoneNumber: '0508252557', countryPhoneCode: '+972' };
  beforeAll(() => {
    pipe = new PhoneNumberPipe();
  });
  it('Should check in case no phoneNumber/CountryCode is send', () => {
    const beneficiary = { role: 'Developer' };
    expect(pipe.transform(beneficiary)).toBe(null);
  });
  it('Should check in case  phoneNumber & CountryCode is send', () => {
    expect(pipe.transform(beneficiary)).toBe('+9720508252557');
  });
  it('Should check in case or  phoneNumber or  CountryCode is send', () => {
    const beneficiary = { phoneNumber: '0508252557' };
    expect(pipe.transform(beneficiary)).toBe(null);
  });
});
