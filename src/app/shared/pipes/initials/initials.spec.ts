import { InitialsPipe } from './initials.pipe';

describe('InitialsPipe', () => {
  let pipe: InitialsPipe;
  beforeAll(() => {
    pipe = new InitialsPipe();
  });
  it('Should check if it has no name', () => {
    const beneficiary = { goals: 'Enjoy life', age: 14 };
    expect(pipe.transform(beneficiary)).toBe('NA');
  });
  it('Should check if it has one name', () => {
    const beneficiary = { name: 'Avi', goals: 'Enjoy life', age: 14 };
    expect(pipe.transform(beneficiary)).toBe('A');
  });

  it('Should check if it has two names', () => {
    const beneficiary = { name: 'Avi Balloni', goals: 'Enjoy life', age: 14 };
    expect(pipe.transform(beneficiary)).toBe('AB');
  });
  it('Should check if it has more than two names', () => {
    const beneficiary = { name: 'avi balloni Tahuni', goals: 'Enjoy life', age: 14 };
    expect(pipe.transform(beneficiary)).toBe('ab');
  });
});
