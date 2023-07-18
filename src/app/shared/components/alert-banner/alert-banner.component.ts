import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  Injectable,
  Injector,
  Input,
  Output
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
let nextUniqueId = 0;
const height = 70;
@Component({
  selector: 'av-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss'],
  animations: [
    trigger('state', [
      state('void, hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('* => visible', animate('400ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('400ms cubic-bezier(0.4, 0.0, 1, 1)'))
    ])
  ]
})
export class AlertBannerComponent implements AfterViewInit {
  public uniqueId = `${++nextUniqueId}`;
  @Output() confirm = new EventEmitter<{ confirmed: boolean }>();
  @Output() ref = new EventEmitter<any>();
  @Input() alert: BannerAlertDetails;
  componentRefs: any[];
  visibility = 'visible';
  constructor() {}

  ngAfterViewInit(): void {
    this.adjustOffset();
    this.ref.subscribe((i) => {
      for (i; i < this.componentRefs.length; i++) {
        const item = this.componentRefs[i];
        const id = this.componentRefs[i].instance.uniqueId;
        const element = document.getElementById(`av-alert-${id}`) as HTMLElement;
        element.style.setProperty('top', `${element.offsetTop - height}px`);
      }
    });
  }
  adjustOffset() {
    const container = document.getElementById(`av-alert-${this.uniqueId}`) as HTMLElement;
    const len = this.componentRefs.length - 1;
    if (this.alert.offset?.top) {
      this.alert.offset.top += len * height;
    } else this.alert.offset!.top = len * height;
    if (this.alert?.offset) {
      Object.keys(this.alert.offset).forEach((position) => {
        if (position) {
          container.style.setProperty(position, this.alert.offset?.[position] + 'px');
        }
      });
    }
  }
}
export type BannerAlertType = 'success' | 'danger' | 'warning';
export interface BannerAlertDetails {
  /**
   * @param message self explanatory
   */
  message: string;
  /**
   * @param messageAsHtml if true then the message will be treated as html 
   */
   messageAsHtml?: boolean;
  /**
   * @param type type of alert e.g danger success
   */
  type: BannerAlertType;
  /**
   * @param timeout time in miliseconds that the alert stays for
   */
  timeout?: number;
  /**
   * @param placement where to place the banner {y:top|bottom} {x:left|right}
   */
  placement: {
    y: 'top' | 'bottom';
    x: 'left' | 'right';
  };
  /**
   * @param offset move the alert in pixels
   */
  offset?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };
}

@Injectable()
export class AlertBannerService {
  resolve: (val: { confirmed: boolean }) => void;
  alertSubject = new BehaviorSubject<BannerAlertDetails>({} as BannerAlertDetails);
  alertData = this.alertSubject.asObservable();
  showAlert = new BehaviorSubject<boolean>(false);
  show = this.showAlert.asObservable();
  componentRefs: ComponentRef<AlertBannerComponent>[] = [];
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}
  fire(data: BannerAlertDetails) {
    this.appendComponentToBody(data);
  }

  private appendComponentToBody(data: BannerAlertDetails) {
    // Create a component reference from the component
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(AlertBannerComponent).create(this.injector);
    componentRef.instance.alert = data;
    this.componentRefs.push(componentRef);
    let subscribers: any = {};
    subscribers = { confirm: componentRef.instance.confirm };

    componentRef.instance.componentRefs = this.componentRefs;
    subscribers.confirm.subscribe(() => {
      componentRef.instance.visibility = 'hidden';
      setTimeout(() => {
        this.destroy(componentRef, subscribers);
      }, 300);
    });
    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    this.document.body.appendChild(domElem);

    setTimeout(() => {
      componentRef.instance.visibility = 'hidden';
      setTimeout(() => {
        this.destroy(componentRef, subscribers);
      }, 300);
    }, data.timeout || 3000);
  }

  private destroy(componentRef: ComponentRef<AlertBannerComponent>, subscribers: any) {
    const index = this.componentRefs.indexOf(componentRef);
    if (index !== -1) {
      Object.keys(subscribers).forEach((data) => {
        subscribers[data].unsubscribe();
      });
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.componentRefs.splice(index, 1);
      componentRef.instance.ref.emit(index);
    }
  }
}
