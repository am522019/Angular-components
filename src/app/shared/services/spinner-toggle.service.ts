import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface SpinnerMessage {
  title: string;
  subtitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerToggle = new BehaviorSubject<boolean>(false);
  spinnerStatus = this.spinnerToggle.asObservable();
  spinnerMessage = new BehaviorSubject<SpinnerMessage>(null);
  $spinnerMessage = this.spinnerMessage.asObservable();
  constructor() {}

  public showSpinner() {
    this.spinnerToggle.next(true);
  }

  public hideSpinner() {
    this.spinnerToggle.next(false);
    this.spinnerMessage.next(null);
  }
  public setMessage(message: SpinnerMessage) {
    this.spinnerMessage.next(message);
  }
  public getMessage() {
    return this.spinnerMessage;
  }
}
