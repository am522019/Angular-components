import { ColFilterPipe } from './col-filter.pipe';

describe('ColFilterPipe', () => {
  let pipe: ColFilterPipe;
  let items = [
    { name: 'Dor' },
    { name: 'Block' },
    { name: 'Barni' },
    { name: 'Elephant' },
    { name: 'Andrew' },
    { name: 'Sleep' },
    { name: 'Far' }
  ];
  beforeAll(() => {
    pipe = new ColFilterPipe();
  });
  it('create an instance', () => {
    expect(pipe.transform(items, ['Block'])).toEqual([{ name: 'Block' }]);
  });
  it('If does not include searchterm ', () => {
    expect(pipe.transform(items, ['LALA'])).toEqual([]);
  });
  it('If  searchterm is undefined', () => {
    expect(pipe.transform(items, undefined)).toEqual(items);
  });
});
