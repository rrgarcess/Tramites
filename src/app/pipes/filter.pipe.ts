import { Pipe, PipeTransform } from '@angular/core';
import { Tramite } from '../clases/tramite';

@Pipe({
  name: 'filterByName'
})
export class FilterPipe implements PipeTransform {

    transform(items: Array<Tramite>, termino: string): any {
        if(!items) return [];
        if(!termino) return items;

        termino = termino.toLowerCase();
        // return items.filter(item => item.nombre.toLowerCase().includes(termino));
        
        return items.filter((item: Tramite) => (item.nombre) ? item.nombre.toLowerCase().includes(termino) : false );
    }

}
