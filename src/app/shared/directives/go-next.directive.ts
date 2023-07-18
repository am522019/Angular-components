import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: '[goNext]'
})
export class GoNextDirective implements AfterViewInit {
  @Input() goNext?: any;

  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    const all = this.el.nativeElement.querySelectorAll('app-base-form-template ion-input, app-base-form-template textarea');
    for (let i = 0; i < all.length; i++) {
      const element = all[i];
      // for ionic inputs
      element.addEventListener('ionFocus', () => {
        scrollFocus(element);
      });
      // for html inputs
      element.addEventListener('focus', () => {
        scrollFocus(element);
      });
      if (i === all.length - 1) {
        if (this.goNext) {
          element.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              if (this.goNext.el) {
                this.goNext.el.click();
              }
              this.goNext?.click?.();
            }
          });
        }
        continue;
      }
      element.addEventListener('keyup', (event: KeyboardEvent) => {
        //if enter
        if (event.key === 'Enter') {
          const next = all[i + 1];
          if (next) {
            if (next?.setFocus) {
              next.setFocus();
            }
            next?.focus();
          }
        }
      });
    }

    function scrollFocus(element: any) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }
}
