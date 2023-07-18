import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[passedData]'
})
export class DataDirective<T> {
  @Input() passedData: T;
  constructor() {}
}
