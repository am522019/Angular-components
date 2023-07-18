import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, firstValueFrom } from 'rxjs';

@Injectable()
export class ModalService {
  modalRef: ModalRef;
  modalRefs: ModalRef[] = [];
  constructor(private overlay: Overlay) {}
  open(component: any, options?: any): ModalRef {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'no-background',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    const modalRef = new ModalRef(overlayRef);
    const componentPortal = new ComponentPortal(component);
    let data;
    if (options) {
      modalRef.data = { options };
      data = { options };
    }
    const componentRef = overlayRef.attach(componentPortal);
    componentRef.instance['modalService'] = this; // Pass a reference to the ModalService
    componentRef.instance['modalRef'] = modalRef; // Pass a reference to the ModalRef
    if (data) {
      Object.assign(componentRef.instance, data);
    }
    this.modalRef = modalRef;
    this.modalRefs.push(modalRef);
    return modalRef;
  }
  close(data?: { confirmed: boolean; [key: string]: any }) {
    if (!data) {
      data = { confirmed: false };
    }
    this.modalRef.close(data);
    this.modalRefs.pop();
    this.modalRef = this.modalRefs[this.modalRefs.length - 1];
  }
}

export class ModalRef {
  data: any;
  constructor(private overlayRef: OverlayRef) {}
  private afterClosedSubject = new Subject<{
    confirmed: boolean;
    [key: string]: any;
  }>();
  afterClosed() {
    return this.afterClosedSubject.asObservable();
  }

  async afterClosedPromise() {
    return firstValueFrom(this.afterClosed());
  }

  close(result?: any) {
    this.afterClosedSubject.next(result);
    this.afterClosedSubject.complete();
    setTimeout(() => {
      // for animation
      this.overlayRef.dispose();
    }, 400);
  }
}
