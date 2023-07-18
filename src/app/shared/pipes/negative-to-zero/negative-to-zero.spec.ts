import { NegativeToZeroPipe } from './negative-to-zero.pipe';

describe('NegativeToZeroPipe', () => {
  let pipe: NegativeToZeroPipe;
  beforeAll(() => {
    pipe = new NegativeToZeroPipe();
  });
  it('should check if a number is negative', () => {
    const num1 = -5;
    const num2 = 0;
    expect(pipe.transform(num1)).toBe(0);
    expect(pipe.transform(num2)).toBe(0);
  });
  it('should check if a number is possitive', () => {
    const num1 = 5.4;
    const num2 = 6.1;
    expect(pipe.transform(num1)).toBe(5.4);
    expect(pipe.transform(num2)).toBe(6.1);
  });
});
