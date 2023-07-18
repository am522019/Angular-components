import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom pipe that filters an array of items based on a search term.
 *
 * @param items - The array of items to be filtered.
 * @param searchTerm - The search term used for filtering.
 * @returns The filtered array of items that match the search term.
 */

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any, searchTerm: any) {
    if (searchTerm === undefined) {
      return items;
    }

    return items.filter((item: string) => {
      const array = JSON.stringify(item);
      return array.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}
