import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSmartlook]'
})
export class SmartlookDirective {
  constructor(private el: ElementRef) {

    const observer = new MutationObserver((mutations) => {
      const all = document.querySelectorAll('ion-input, ion-searchbar, input, radio, ion-radio, ion-select, ng-select, ion-checkbox, checkbox').forEach((data) => {
        data.classList.add('smartlook-show');
      });
    });

    observer.observe(this.el.nativeElement, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }
}
