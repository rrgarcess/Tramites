import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToText'
})
export class DateToTextPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let d = new Date(value);

        let day = d.getDay();
        let month = d.getUTCMonth();
        let year = d.getFullYear();

        console.log(d);
        return value;
    }

}
