import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ContentPDF } from '../model/content';

@Injectable()
export class PdfService {

    constructor() { }

    crearPDF(name: string, content: ContentPDF){
        let doc = new jsPDF();
        let padding = 150;

        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(10, 10, 190, 100, 5, 5, 'FD');
        doc.roundedRect(10, 10 + padding, 190, 100, 5, 5, 'FD');

        doc.setFontType('normal');
        doc.text(`Recibí de: ${ content.nombre_tramitante }`, 15, 60);
        doc.text(`La cantidad de: $ ${ content.cantidad }`, 15, 70);
        doc.text(`Concepto de: ${ content.tramite }`, 15, 80);
        doc.text(`En ${ content.lugar || '' } a los ${ content.fecha }`, 15, 90);
        //----------------------------------------------------------------------
        doc.text(`Recibí de: ${ content.nombre_tramitante }`, 15, 60 + padding);
        doc.text(`La cantidad de: $ ${ content.cantidad }`, 15, 70 + padding);
        doc.text(`Concepto de: ${ content.tramite }`, 15, 80 + padding);
        doc.text(`En ${ content.lugar || '' } a los ${ content.fecha }`, 15, 90 + padding);

        doc.setFont('courier')
        doc.setFontType('bold');
        doc.setFontSize(20);
        doc.text(55, 25, 'C. SERGIO ABREGO PEÑA');
        //----------------------------------------------------------------------
        doc.text(55, 25 + padding, 'C. SERGIO ABREGO PEÑA');

        doc.setFontSize(16);
        doc.setFontType('italic');
        doc.text('ASESOR - GESTOR', 75, 31);
        //----------------------------------------------------------------------
        doc.text('ASESOR - GESTOR', 75, 31 + padding);

        doc.save(name);
    }
}
