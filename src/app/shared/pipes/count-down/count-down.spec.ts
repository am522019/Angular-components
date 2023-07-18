import { CountDownPipe } from './count-down.pipe';

describe('CountDownPipe', () => {
  let pipe: CountDownPipe;
  beforeAll(() => {
    pipe = new CountDownPipe();
  });
  it('Should check if the input is not seconds(number)', () => {
    const seconds = null;
    expect(pipe.transform(seconds)).toBe('');
  });
  it('Should check if the input is seconds (one unit) ', () => {
    const seconds = 6;
    expect(pipe.transform(seconds)).toBe('00:06');
  });
  it('Should check if the input is seconds (more than one unit)', () => {
    const seconds = 600;
    expect(pipe.transform(seconds)).toBe('10:00');
  });
});
