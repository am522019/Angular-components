import { DiffDayPipe } from './diff-day.pipe';

describe('DiffDayPipe', () => {
  let pipe: DiffDayPipe;
  beforeAll(() => {
    pipe = new DiffDayPipe();
  });
  it('should check if a date is bigger that the current date', () => {
    const date1 = new Date('6, 11, 2022');
    const date3 = new Date('10, 30, 2022');
    expect(pipe.transform(date1)).toBe(1);
    expect(pipe.transform(date3)).toBe(142);
  });
  it('should check if a date is smaller that the current date', () => {
    const randomDate = new Date();
    const date2 = new Date('5, 12, 2001');
    expect(pipe.transform(randomDate)).toBe(0);
    expect(pipe.transform(date2)).toBe(0);
  });
  it('if sends undefined/not a date should return 0', () => {
    const date2 = null;
    expect(pipe.transform(date2)).toBe(0);
  });
});
