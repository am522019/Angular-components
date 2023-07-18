import { StatusPipe, StatusOptions } from './status.pipe';

describe('Statuses pipe', () => {
  let pipe: StatusPipe;
  const statuses: StatusOptions[] = [
    {
      status: 'draft',
      color: 'purple',
      realName: 'Draft',
      default: true
    },
    {
      status: 'processing',
      color: 'orange',
      realName: 'In progress'
    },
    {
      status: 'approved',
      color: 'green',
      realName: 'Approved'
    }
  ];
  beforeAll(() => {
    pipe = new StatusPipe();
  });
  it('should take a status and return the realName', () => {
    expect(pipe.transform('draft', statuses)).toEqual('Draft');
    expect(pipe.transform('processing', statuses)).toEqual('In progress');
    expect(pipe.transform('approved', statuses)).toEqual('Approved');
  });
  it('should take a status and return the color', () => {
    expect(pipe.transform('draft', statuses, true)).toEqual('purple');
    expect(pipe.transform('processing', statuses, true)).toEqual('orange');
    expect(pipe.transform('approved', statuses, true)).toEqual('green');
  });
  it('should take a status and return the realName if no match is found', () => {
    expect(pipe.transform('', statuses)).toEqual('Draft');
    expect(pipe.transform('', statuses, true)).toEqual('purple');
  });
});
