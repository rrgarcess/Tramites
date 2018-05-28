import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../clases/tramite';
import { NgForm } from '@angular/forms';
import { AngularFireList, ChildEvent } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

    private tramites: Tramite[] = [];

    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    localidad: string;
    telefono: string;
    tipo_tramite: string;
    concepto_tramite: string;
    costo_tramite: number;
    complete: boolean;

    constructor(private tramiteService: TramiteService) {
        this.tramites.push(<Tramite>{
            $key: 'LDZFTki5rcfqPN6HwIJ',
            nombre: 'ruben',
            apellido_paterno: 'araus',
            apellido_materno: 'garcia',
            costo_tramite: 9000,
            concepto_tramite: 'Arrendamiento'
        });
    }

    ngOnInit() {

        this.tramiteService.obtenerTramites().snapshotChanges().toPromise().then(x=>console.log(x));
        // this.tramiteService.obtenerTramites()
        //     .snapshotChanges()
        //     .subscribe(item => {
        //         console.log(item);
        //         // item.forEach((elemento: any) => {
        //         //     let x = elemento.payload.toJSON();
        //         //     x['$key'] = elemento.key;
        //         //     this.tramites.push(x as Tramite);
        //         // });
        //     }, error => console.log(error));
    }

    guardarTramite(tramite: NgForm){
        // this.verificarCampos();

        this.tramiteService.guardarTramite(tramite.value)
            .then(status => {
                console.log(status);
            }).catch( error => console.log(error));
    }

    getTramites(){
    }

    verificarCampos(){
    }

}
