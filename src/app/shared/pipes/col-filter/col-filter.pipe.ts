import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'colFilter' })
export class ColFilterPipe implements PipeTransform {
  transform(items: any, colFilter: string[]) {
    if (colFilter === undefined) {
      return items;
    }
    return items.filter((data: any, index: number) => {
      return colFilter.includes(this.fixString(data.name));
    });
  }
  fixString(str: string) {
    return str.replace(/ /g, '');
  }
}
