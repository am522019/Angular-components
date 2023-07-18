import { TwoDigitsPipe } from './../two-digits/two-digits.pipe';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that transforms a value based on the provided column configuration.
 *
 * @param item - The input item containing the value to be transformed.
 * @param col - The column configuration object that specifies the transformation rules.
 * @returns The transformed value according to the specified column configuration.'titleCase' / 'dd/MM/yyyy'/ '1.2-2' / * '1.0-2'/'-'
 */

@Pipe({
  name: 'valuePipe'
})
export class ValuePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private twoDigitsPipe: TwoDigitsPipe,
    private decimalPipe: DecimalPipe,
    private titleCase: TitleCasePipe
  ) {}
  transform(item: any, col: any): any {
    let val: any;
    if (col) {
      val = this.getValueNew(item, col);
    } else {
      val = this.getValue(item);
    }
    if (val && val !== '-' && col.pipe) {
      switch (col.pipe) {
        case 'titleCase':
          return this.titleCase.transform(val);
        case 'date':
          return this.datePipe.transform(val, 'dd/MM/yyyy');
        case 'decimal':
          return this.decimalPipe.transform(val, '1.2-2');
        case 'number':
          return this.decimalPipe.transform(this.twoDigitsPipe.transform(val), '1.0-2');
      }
    }
    return val;
  }
  getValue(col: any) {
    if (col != null) {
      return col;
    }
    return '-';
  }
  getValueNew(item: any, col: any) {
    const dtoName = col?.dtoName;
    if (dtoName.includes('.')) {
      const splitted = dtoName.split('.');
      let res: any = item;
      for (let i = 0; i < splitted.length; i++) {
        if (res && res[splitted[i]]) {
          res = res[splitted[i]];
        } else {
          return item?.alternative || '-';
        }
      }
      return (res != null && res) || '-';
    }
    if (item[dtoName] != null) {
      return item[dtoName];
    }
  }
}
