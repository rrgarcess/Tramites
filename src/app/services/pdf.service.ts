import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';

@Injectable()
export class PdfService {

    constructor() { }

    __createPDF(nativeContent){
        let doc = new jsPDF();

        let handler = {
            '#editor': (element, renderer) => {
                return true;
            }
        }

        let content = nativeContent.nativeElement;

        doc.addHTML(content, () => {
            console.log('saved')
        });
        // doc.fromHTML(content.innerHTML, 10, 10, {
        //     'width': 190,
        //     'elementHandlers': handler
        // });
        // doc.save(name);
    }

    createPDF(nativeContent, name){
        let doc = new jsPDF();

        let handler = {
            '#editor': (element, renderer) => {
                return true;
            }
        }

        let content = nativeContent.nativeElement;
        doc.fromHTML(content.innerHTML, 10, 10, {
            'width': 190,
            'elementHandlers': handler
        });

        doc.fromHTML(content.innerHTML, 10, 10, {
            'width': 190,
            'elementHandlers': handler
        });
        
        doc.save(name);
    }

    _createPDF(){
        return xepOnline.Formatter.Format('printable', {
            render: 'download'
        });
    }
}
