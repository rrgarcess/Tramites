import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToText'
})
export class NumberToTextPipe implements PipeTransform {

    transform(number: number): any {
        // number = 10000;
        let text: string, unidad, decena, centena, millar;

        unidad = (number % 10) | 0;
        decena = ((number - unidad) % 100) | 0;
        centena = ((number - decena - unidad) % 1000) | 0;
        millar = ((number - centena - decena - unidad) % 10000) | 0;

        text = millar ? this.getThousandText(millar) + ' ' : '';
        text += centena ? this.getHundredText(centena, decena, unidad) + ' ' : '';
        text += decena ? this.getTenText(decena, unidad) + ' ': '';
        text += (decena && unidad && (decena != 20 && decena != 10)) ? ' Y ': '';
        text += unidad ? this.getUnitText(unidad, decena) + ' ': '';

        text = text.length > 25 ? text + '\nPESOS 00/100 MN)' : text + ' PESOS 00/100 MN)';

        return `${number} (${text}`;
    }

    getUnitText(unit, ten?){

        if (ten && (ten == 20 || ten == 10)) {
            return '';
        }

        switch(unit){
            case 1:
                return 'UN';
            case 2:
                return 'DOS';
            case 3:
                return 'TRES';
            case 4:
                return 'CUATRO';
            case 5:
                return 'CINCO';
            case 6:
                return 'SEIS';
            case 7:
                return 'SIETE';
            case 8:
                return 'OCHO';
            case 9:
                return 'NUEVE';
            default:
                return '';
        }
    }

    getTenText(ten, unit){

        if (ten == 10 && unit >= 1) {
            return this.getSpetialTenText(ten + unit);
        }

        switch(ten){
            case 10:
            return 'DIEZ';
            case 20:
            return unit > 0 ? 'VEINTI' + this.getUnitText(unit) : 'VEINTE';
            case 30:
            return 'TREINTA';
            case 40:
            return 'CUARENTA';
            case 50:
            return 'CINCUENTA';
            case 60:
            return 'SESENTA';
            case 70:
            return 'SETENTA';
            case 80:
            return 'OCHENTA';
            case 90:
            return 'NOVENTA';
            default:
            return '';
        }
    }

    getSpetialTenText(ten){

        switch(ten){
            case 11:
            return 'ONCE';
            case 12:
            return 'DOCE';
            case 13:
            return 'TRECE';
            case 14:
            return 'CATORCE';
            case 15:
            return 'QUINCE';
            case 16:
            return 'DIECISÉIS';
            case 17:
            return 'DIECISIETE';
            case 18:
            return 'DIECIOCHO';
            case 19:
            return 'DIECINUEVE';
            default:
            return '';
        }
    }

    getHundredText(hundred, ten?, unit?){

        switch(hundred){
            case 100:
                return (ten || unit) ? 'CIENTO' : 'CIEN';
            case 200:
                return 'DOCIENTOS';
            case 300:
                return 'TRECIENTOS';
            case 400:
                return 'CUATROCIENTOS';
            case 500:
                return 'QUINIENTOS';
            case 600:
                return 'SEISCIENTOS';
            case 700:
                return 'SETECIENTOS';
            case 800:
                return 'OCHOCIENTOS';
            case 900:
                return 'NOVECIENTOS';
            default:
                return '';
        }
    }

    getThousandText(number){
        let thousand = (number / 1000);
        let text = this.getUnitText(thousand);
        text = text + ' MIL';
        return text;
    }

}
