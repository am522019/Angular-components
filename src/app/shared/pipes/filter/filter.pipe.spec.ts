import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;
  let items = ['France', 'Uk', 'Germany', 'Vietnam', 'Hawai', 'Cambodia', 'UAE', 'Egypt', 'Spain', 'Italy'];
  beforeAll(() => {
    pipe = new FilterPipe();
  });
  it('Should check when search word is undefined', () => {
    expect(pipe.transform(items, undefined)).toBe(items);
  });
  it('Should check when there is no items including the search word', () => {
    expect(pipe.transform(items, 'Argentina')).toEqual([]);
  });
  it('Should check when there are items including the search word (lowecase)', () => {
    expect(pipe.transform(items, 'sp')).toContain('Spain');
  });
  it('Should check when there are items including the search word (uppercase)', () => {
    expect(pipe.transform(items, 'SP')).toContain('Spain');
  });
});
