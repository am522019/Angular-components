import { catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  InjectionToken
} from '@angular/core';

import { BehaviorSubject, EMPTY } from 'rxjs';
import { DOCUMENT } from '@angular/common';
let nextUniqueId = 0;

export interface AlertDetails {
  /**
   * @param title  the main title of the alert
   */
  title: string;
  /**
   * @param iconName name of the icon you want to display e.g success
   */
  iconName?: string;
  /**
   * @param subtitle the text shown in the body of the alert
   */
  subtitle?: string;
  /**
   * @param cancelButton should the cancel button be shown?
   */
  cancelButton?: boolean;
  /**
   * @param cancelButtonText
   *  text of the cancel button.
   *
   * default is "Cancel"
   */
  cancelButtonText?: string;
  /**
   * @param cancelButtonText
   *  text of the confirm button.
   *
   * default is "Confirm"
   */
  confirmButtonText?: string;
  /**
   * @param customClass
   * a class that wraps the whole alert.
   */
  customClass?: string;
  /**
   * @param iconColor
   * color of the icon should be hex or rgb/a
   */
  iconColor?: string;

  /**
   * @param input
   * if it includes form input
   */
  input?: boolean;

  /**
   * @param formControl
   * formControl
   */
  formControl?: FormControl;

  /**
   * @param errorMessages
   * errorMessages
   */
  errorMessages?: any;

  /**
   * @param label
   * label
   */
  labelName?: any;
  requestBody?: any;
  mixpanel?: any;
  spinner?: any;
  http?: any;
  env?: any;
}

@Injectable()
export class AlertModalService {
  private resolve: (val: { confirmed: boolean }) => void;
  private alertSubject = new BehaviorSubject<AlertDetails>({} as AlertDetails);
  alertData = this.alertSubject.asObservable();
  private showAlert = new BehaviorSubject<boolean>(false);
  private show = this.showAlert.asObservable();
  private componentRef: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}
  fire(data: AlertDetails) {
    this.appendComponentToBody(data);
    const promise = new Promise<{ confirmed: boolean; closed?: boolean; canceled?: boolean; attempts?: number; val?: any }>((res) => {
      this.saveAlertData(data);
      this.resolve = res;
    });
    return promise;
  }
  private saveAlertData(data: AlertDetails) {
    this.alertSubject.next(data);
    this.saveShow(true);
  }
  private saveShow(show: boolean) {
    this.showAlert.next(show);
    if (!show) {
      this.componentRef.instance.visibility = 'hidden';
    }
  }
  private appendComponentToBody(data: AlertDetails) {
    // Create a component reference from the component
    // tslint:disable no-use-before-declare
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(AlertModalComponent).create(this.injector);
    componentRef.instance.alert = data;
    componentRef.instance.faForm = data.formControl;
    componentRef.instance.errorMessages = data.errorMessages;

    this.componentRef = componentRef;
    componentRef.instance.end.subscribe(() => {
      this.destroy();
    });
    componentRef.instance.confirm.subscribe((data) => {
      this.resolve(data);
    });
    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    this.document.body.appendChild(domElem);
  }
  private destroy() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }
}

@Component({
  templateUrl: '../alert-modal/alert-modal.component.html',
  styleUrls: ['../alert-modal/alert-modal.component.scss'],
  animations: [
    trigger('state', [
      state('void, hidden', style({ top: '-100%' })),
      state('visible', style({ top: '0' })),
      transition('* => visible', animate('400ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('400ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ])
  ]
})
export class AlertModalComponent implements OnInit {
  uniqueId = `alert-modal-${++nextUniqueId}`;
  alert: AlertDetails;
  visibility = 'visible';
  faForm: FormControl;
  errorMessages: any;
  attempts = 0;
  @Output() end = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<{ confirmed: boolean; closed?: boolean; canceled?: boolean; attempts?: number; val?: any }>();
  constructor(private alertModalService: AlertModalService) {}

  ngOnInit() {
    this.alertModalService.alertData.subscribe((data) => {
      this.alert = data;
    });
  }
  close() {
    this.visibility = 'hidden';
    setTimeout(() => {
      this.confirm.emit({ confirmed: false, closed: true });
    }, 300);
  }
  onCancel() {
    this.visibility = 'hidden';
    setTimeout(() => {
      this.confirm.emit({ confirmed: false, canceled: true });
    }, 300);
  }
  animationDone(e: any) {
    if (e.toState === 'hidden') {
      this.end.emit(true);
    }
  }
  onConfirm() {
    if (!this.faForm) {
      this.closeConfirm();
    }
    this.attempts++;
    if (!this.faForm?.valid) {
      this.faForm.markAsTouched();
      return;
    } else {
      this.alert.spinner.showSpinner();
      this.alert.http
        .post(`${this.alert.env.new_api_url}/api/notification/2fa/generic/validate/${this.faForm.value}`, this.alert.requestBody, {
          headers: {
            'dont-add-token': 'yes'
          }
        })
        .pipe(
          catchError((err) => {
            this.alert.spinner.hideSpinner();
            this.alert.mixpanel.track('Qualification 2FA Error', { error: err?.error?.message });
            this.faForm.setErrors({ invalid: true });
            return EMPTY.pipe();
          })
        )
        .subscribe((data) => {
          this.alert.spinner.hideSpinner();
          this.closeConfirm();
        });
    }
  }
  closeConfirm() {
    this.visibility = 'hidden';
    setTimeout(() => {
      this.confirm.emit({ confirmed: true, attempts: this.attempts, val: this.faForm?.value });
    }, 300);
  }
  get errorMessage() {
    if (this.faForm?.touched && this.faForm?.errors) {
      const error = Object.keys(this.faForm.errors)?.[0];
      const errorr = this.errorMessages.find((item) => {
        return item.type === error;
      });
      return errorr?.message;
    }
    return '';
  }
}
