import { SliceDotPipe } from './dot-slice.pipe';

describe('SliceDotPipe', () => {
  let pipe: SliceDotPipe;
  beforeAll(() => {
    pipe = new SliceDotPipe();
  });
  it('Should check when has 2 dots', () => {
    const item1 = 'abchkh.sun.hu';
    const item2 = '3435.55.66';
    expect(pipe.transform(item1)).toBe('abchkh');
    expect(pipe.transform(item2)).toBe('3435');
  });
  it('Should check when has 1 dots', () => {
    const item3 = 'Testing my work. No buggs';
    expect(pipe.transform(item3)).toBe('Testing my work');
  });
  it('Should check when has no dots', () => {
    const item1 = 'abchkh';
    expect(pipe.transform(item1)).toBe('abchkh');
  });
});
