import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that modifies a deal item title by replacing it with a loan title.
 *
 * @param itemTitle - The input itemTitle to be transformed.
 * @returns The transformed value, which is either the modified loan title or the original item title.
 */

@Pipe({
  name: 'modifyItem'
})
export class ModifyDealPipe implements PipeTransform {
  transform(itemTitle?: string): string {
    if (itemTitle.toLowerCase().includes('deal')) {
      let Dealnum = itemTitle.slice(4, 6);
      return 'Loan' + Dealnum;
    } else return itemTitle;
  }
}
