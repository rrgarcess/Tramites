import { Pipe, PipeTransform } from '@angular/core';
import { Abono } from '../clases/abono';

@Pipe({
  name: 'orderByDate'
})
export class OrderPipe implements PipeTransform {

    transform(abonos: Abono[], order?: any): any {
        return abonos.sort((a: Abono, b: Abono) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    }

}
