import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ContentPDF } from '../model/content';

@Injectable()
export class PdfService {

    constructor() { }

    crearPDF(name: string, content: ContentPDF){
        let doc = new jsPDF();

        doc.rect(10, 10, 190, 100)

        doc.text(`Recibí de: ${ content.nombre_tramitante }`, 15, 60);
        doc.text(`La cantidad de: $ ${ content.cantidad } (DOS MIL QUINIENTO PESOS 00/100 MN)`, 15, 70);
        doc.text(`Concepto de: ${ content.tramite }`, 15, 80);
        doc.text(`En: ${ content.lugar || '' } a los ${ content.fecha }`, 15, 90);
        // doc.text(`Concepto de: ADOPCIÓN DE DOMINIO PLENO INDIVIDUAL (EXPEDICION DE
        // TITULO DE PROPIEDAD) VÍA RÁPIDA`, 15, 80);

        doc.setFont('courier')
        doc.setFontType('bolditalic');
        doc.setFontSize(20);
        doc.text(55, 25, 'C. SERGIO ABREGO PEÑA');

        doc.setFontSize(16);
        doc.setFontType('italic');
        doc.text('ASESOR - GESTOR', 75, 31);




        doc.save(name);
    }

    __createPDF(nativeContent){
        // let doc = new jsPDF();
        //
        // let handler = {
        //     '#editor': (element, renderer) => {
        //         return true;
        //     }
        // }
        //
        // let content = nativeContent.nativeElement;
        //
        // doc.addHTML(content, () => {
        //     console.log('saved')
        // });
    }

    createPDF(nativeContent, name){
    }

    _createPDF(){
        // return xepOnline.Formatter.Format('printable', {
        //     render: 'download'
        // });
    }
}
