import { AccountNumberPipe } from './account-number.pipe';

describe('AccountNumberPipe', () => {
  let pipe: AccountNumberPipe;
  beforeAll(() => {
    pipe = new AccountNumberPipe();
  });
  it('should transform number to asterisks and keeps only last 4 digits', () => {
    const account = '123456AAAA';
    expect(pipe.transform(account)).toEqual('****' + 'AAAA');
  });
  it('should get only the last 4 digits', () => {
    const account = '1234567890';
    expect(pipe.transform(account, true)).toEqual('7890');
  });
});
