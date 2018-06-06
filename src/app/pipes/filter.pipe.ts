import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterPipe implements PipeTransform {

    transform(items: any, termino: string): any {
        if(!items) return [];
        if(!termino) return items;

        termino = termino.toLowerCase();
        return items.filter(item => item.nombre.toLowerCase().includes(termino));
    }

}
