import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import { ContentPDF } from '../model/content';

@Injectable()
export class PdfService {

    constructor() { }

    crearPDF(name: string, content: ContentPDF){
        let doc = new jsPDF();
        let padding = 150;
        let renglon = content.tramite.length > 27 ? 85 : 80;

        doc.setDrawColor(0);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(10, 10, 190, 100, 5, 5, 'FD');
        doc.roundedRect(10, 10 + padding, 190, 100, 5, 5, 'FD');

        doc.setFontType('normal');
        doc.text(`Recibí de: ${ content.nombre_tramitante }`, 15, 50);
        doc.text(`La cantidad de: $ ${ content.cantidad }`, 15, 60);
        doc.text(`Concepto de: ${ content.tramite }`, 15, 70);
        doc.text(`En ${ content.lugar || '' } a los ${ content.fecha }`, 15, renglon);
        //----------------------------------------------------------------------
        doc.text(`Recibí de: ${ content.nombre_tramitante }`, 15, 50 + padding);
        doc.text(`La cantidad de: $ ${ content.cantidad }`, 15, 60 + padding);
        doc.text(`Concepto de: ${ content.tramite }`, 15, 70 + padding);
        doc.text(`En ${ content.lugar || '' } a los ${ content.fecha }`, 15, renglon + padding);

        doc.setFont('courier')
        doc.setFontType('bold');
        doc.setFontSize(20);
        doc.text(55, 25, 'C. SERGIO ABREGO PEÑA');
        //----------------------------------------------------------------------
        doc.text(55, 25 + padding, 'C. SERGIO ABREGO PEÑA');

        doc.setFontSize(16);
        doc.setFontType('italic');
        doc.text('DESPACHO DE ASESORÍA DE GESTIÓN LEGAL Y AGRARIA', 25, 31);
        //----------------------------------------------------------------------
        doc.text('DESPACHO DE ASESORÍA DE GESTIÓN LEGAL Y AGRARIA', 25, 31 + padding);

        doc.save(name);
    }
}
