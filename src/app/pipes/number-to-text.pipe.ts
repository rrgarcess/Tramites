import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToText'
})
export class NumberToTextPipe implements PipeTransform {

    transform(number: any): any {
        let text = number + ' (QUINIENTOS PESOS 00/100 MN)';

        return text;
    }

}
