import { AlertBannerService, BannerAlertType } from '../components/alert-banner/alert-banner.component';
import { AlertDetails, AlertModalService } from '../components/alert-modal/alert-modal.service';
import { SnackBarComponent } from '../snack-bar/snack-barcomponent';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {
  constructor(private alertModal: AlertModalService, private alertBanner: AlertBannerService, private snackBar: MatSnackBar) {}
  fire(alertDetails: AlertDetails) {
    return this.alertModal.fire(alertDetails);
  }
  showAlert(message: string, type: BannerAlertType = 'success', messageAsHtml?: boolean) {
    this.alertBanner.fire({
      message,
      timeout: 5000,
      offset: { top: 78, right: 78 },
      placement: { x: 'right', y: 'top' },
      type,
      messageAsHtml
    });
  }

  showSnackbar(message: string, type: any, duration: number = 5) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: duration * 1000,
      data: { message, type }
    });
  }
}
