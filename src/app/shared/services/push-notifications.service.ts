import { NotificationsService } from './../components/notifications/notifications.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { SdkService } from '@shared/services/sdk.service';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {
  constructor(
    private sdkService: SdkService,
    private notificationService: NotificationsService,
    private zone: NgZone,
    private router: Router,
  ) {}
  initNotifications(user?: any) {
    const catcher = (err: any) => {
      console.error('Error in push notifications');
    };
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions()
      .then((result) => {
        if (result.receive === 'granted') {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      })
      .catch(catcher);
    // // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      // console.log('Push registration success, token: ' + token?.value);
      this.sdkService
        .registerAndroidBinding({
          address: token?.value
        })
        .then((data) => {})
        .catch(catcher);
    }).catch(catcher);

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Error on registration: ' + JSON.stringify(error));
    }).catch(catcher);

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      const randomNumber = getRandomNumber(3);
      await LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title,
            body: notification.body,
            sound: 'default',
            id: randomNumber + getRandomNumber(7),
            extra: notification.data,
            iconColor: '#37BFCC'
          }
        ]
      });
      this.zone.run(async () => {
        await this.notificationService.getAllNotifications();
      });
    }).catch(catcher);
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      if (notification.actionId === 'tap') {
        this.zone.run(() => {
          const destination = notification?.notification?.extra?.destination;
          if (notification?.notification?.extra?.destination) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/home']);
          }
        });
      }
    }).catch(catcher);
    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      const randomString = getRandomString();
      this.zone.run(() => {
        const destination = notification.notification?.data?.destination;
        if (destination) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/home']);
        }
      });
    }).catch(catcher);
    function getRandomNumber(digits = 5) {
      return Math.floor(Math.random() * Math.pow(10, digits));
    }

    function getRandomString(length = 7) {
      return Math.random().toString(36).substring(2, length);
    }
  }
}
