import { BeneficiaryNamePipe } from './beneficiary-name.pipe';

describe('BeneficiaryNamePipe', () => {
  let pipe: BeneficiaryNamePipe;
  beforeAll(() => {
    pipe = new BeneficiaryNamePipe();
  });
  it('Should check when item has name', () => {
    const item = { name: 'Sundos' };
    expect(pipe.transform(item)).toBe('Sundos');
  });
  it('Should check when item has fullName', () => {
    const item = { fullName: 'Sundos' };
    expect(pipe.transform(item)).toBe('Sundos');
  });
  it('Should check when item has firstName && lastName', () => {
    const item = { firstName: 'Sundos', lastName: 'Gutty' };
    expect(pipe.transform(item)).toBe('Sundos Gutty');
  });
  it('Should check when item has firstName/lastName', () => {
    const item = { firstName: 'Sundos' };
    expect(pipe.transform(item)).toBe('Sundos undefined');
  });
  it('Should check when item is agribusinessName', () => {
    const item = { agribusinessName: 'Sundos' };
    expect(pipe.transform(item)).toBe('Sundos');
  });
  it('Should check when item has no fullName/name/firstname/agri', () => {
    const item = undefined;
    expect(pipe.transform(item)).toBe('-');
  });
});
