import { NotificationBadgePipe } from './notification-badge.pipe';

describe('notificationBadge', () => {
  let pipe: NotificationBadgePipe;
  const notificationNumber1Digit = Math.floor(Math.random() * 10);
  const notificationNumber2Digit = Math.floor(Math.random() * 100);
  beforeEach(() => {
    pipe = new NotificationBadgePipe();
  });
  it('Should check in case notification number bigger then 9', () => {
    expect(pipe.transform(notificationNumber2Digit)).toBe(9 + '+');
  });
  it('Should check in case notification number smaller then 9', () => {
    expect(pipe.transform(notificationNumber1Digit)).toBe(notificationNumber1Digit);
  });
});
