import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'folio'
})
export class FolioPipe implements PipeTransform {

  transform(value: number, ceros: number): string {
      let v = value.toString();
      let result = '';

      for (let i = 1; i <= (ceros - v.length); i++) {
          result += '0';
      }

      return result + v;
  }

}
