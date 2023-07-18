import { BeneficiaryLettersPipe } from './beneficairy-letters.pipe';

describe('BeneficiaryLettersPipe', () => {
  let pipe: BeneficiaryLettersPipe;
  beforeAll(() => {
    pipe = new BeneficiaryLettersPipe();
  });
  it('Should check when item has name (one-word)', () => {
    const item = { name: 'Sundos' };
    expect(pipe.transform(item)).toBe('Su');
  });
  it('Should check when item has name( more than one-word)', () => {
    const item = { name: 'Sundos Gutty' };
    expect(pipe.transform(item)).toBe('SG');
  });
  it('Should check when item has fullName', () => {
    const item = { fullName: 'Sundos Gutty' };
    expect(pipe.transform(item)).toBe('Sundos Gutty');
  });
  it('Should check when item has firstName && lastName', () => {
    const item = { firstName: 'Sundos', lastName: 'Gutty' };
    expect(pipe.transform(item)).toBe('SG');
  });
  it('Should check when item is agribusinessName', () => {
    const item = { agribusinessName: 'Sundos' };
    expect(pipe.transform(item)).toBe('Sundos');
  });
  it('Should check when item has no fullName/name/firstname/agri', () => {
    const item = { age: 16 };
    expect(pipe.transform(item)).toBe('-');
  });
});
