import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[removeWhitespace]',
  exportAs: 'removeWhitespace'
})
export class RemoveWhiteSpaceDirective {
  constructor() {}

  change(e: any) {
    if (e?.data === ' ') {
      e.preventDefault();
    }
  }
}
