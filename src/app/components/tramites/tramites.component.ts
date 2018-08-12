import { Component, OnInit } from '@angular/core';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../clases/tramite';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'tramites',
  templateUrl: './tramites.component.html'
})
export class TramitesComponent implements OnInit {

    tramites: Tramite[] = [];
    tramiteSelected: Tramite;

    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    localidad: string;
    telefono: string;
    tipo_tramite: string;
    concepto_tramite: string;
    costo_tramite: number;
    complete: boolean;

    termino_busqueda: string = "";
    loading: boolean = true;

    constructor(private tramiteService: TramiteService,
                private toastyService: ToastyService) {

    }

    ngOnInit() {
        this.getTramites();
    }

    guardarTramite(tramite: NgForm){
        this.tramiteService.guardarTramite(tramite.value)
            .then((response:any) => {
                console.log(response.status);

                if (response.status === 'success') {
                    this.showTramiteAgregadoToast();
                    this.getTramites();
                    tramite.reset();
                }
            }).catch( error => console.log(error));
    }

    getTramites(){
        this.tramiteService.obtenerTramites()
        .then(tramites => {
            if(tramites){
                this.tramites = tramites;
                this.loading = false;
            }
        }).catch(error => console.log(error));
    }

    deleteTramite(){
        if (this.tramiteSelected) {
            this.tramiteService.eliminarTramite(this.tramiteSelected.$key);
            this.showTramiteEliminadoToast();
            this.getTramites();
        }
    }

    setTramiteForDelete(tramite){
        this.tramiteSelected = tramite;
    }

    showTramiteEliminadoToast(){
        let options: ToastOptions = {
            title: 'Trámite eliminado correctamente',
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(options);
    }

    showTramiteAgregadoToast(){
        let options: ToastOptions = {
            title: 'Trámite agregado correctamente',
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(options);
    }

}
