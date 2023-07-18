import { FirstNameSlicePipe } from './first-name.pipe';

describe('FirstNameSlicePipe', () => {
  let pipe: FirstNameSlicePipe;
  beforeAll(() => {
    pipe = new FirstNameSlicePipe();
  });
  it('Check if there is more than one white space ', () => {
    const name1 = 'Avi Balloni Tahuni';
    expect(pipe.transform(name1)).toBe('Avi');
  });
  it('Check if there is one white space', () => {
    const name1 = 'Avi Balloni';
    expect(pipe.transform(name1)).toBe('Avi');
  });
  it('Check if thereno white space', () => {
    const name1 = 'AviBalloni';
    expect(pipe.transform(name1)).toBe('AviBalloni');
  });
});
