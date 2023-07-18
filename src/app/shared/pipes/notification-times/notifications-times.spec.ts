import { NotificatonsTimesPipe } from './notifications-times.pipe';

describe('NotificatonsTimesPipe', () => {
  let dte = new Date();
  let pipe: NotificatonsTimesPipe;
  beforeAll(() => {
    pipe = new NotificatonsTimesPipe();
  });
  it('should check if a date is the same as the current date', () => {
    const date1 = dte.setDate(dte.getDate());
    expect(pipe.transform(date1)).toBe(`Today ${dte.getHours()}:${dte.getMinutes()}`);
  });
  it('should check if a date is bigger in one day than the current date', () => {
    const date2 = dte.setDate(dte.getDate() - 1);
    expect(pipe.transform(date2)).toBe('Yesterday');
  });
  it('should check if a date is bigger in more than one day than the current date', () => {
    const date2 = dte.setDate(dte.getDate() - 2);
    expect(pipe.transform(date2)).toBe('' + dte.getDate() + '/' + (dte.getMonth() + 1) + '/' + dte.getFullYear());
  });
  it('if sends undefined/not a date should return undefined', () => {
    const date1 = null;
    expect(pipe.transform(date1)).toBe(undefined);
  });
});
