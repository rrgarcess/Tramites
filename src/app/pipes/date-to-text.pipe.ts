import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToText'
})
export class DateToTextPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let d = new Date(value);

        let day = d.getUTCDate();
        let month = d.getUTCMonth();
        let year = d.getFullYear();

        value = this.getTextDay(day) + this.getTextMonth(month) + this.getTextYear(year);
        console.log(value);
        return value;
    }

    private getTextDay(day: number){
        return day + ' días';
    }

    private getTextMonth(month){
        let text = ' del mes de ';
        switch(month){
            case 0:
                text += 'Enero';
                break;
            case 1:
                text += 'Febrero';
                break;
            case 2:
                text += 'Marzo';
                break;
            case 3:
                text += 'Abril';
                break;
            case 4:
                text += 'Mayo';
                break;
            case 5:
                text += 'Junio';
                break;
            case 6:
                text += 'Julio';
                break;
            default:
                text += 'Enero';
                break;
        }
        return text;
    }

    private getTextYear(year){
        return ' del ' + year;
    }

}
