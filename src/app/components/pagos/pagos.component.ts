import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TramiteService } from '../../services/tramite.service';
import { Tramite } from '../../clases/tramite';
import { Abono } from '../../clases/abono';
import { NgForm } from '@angular/forms';
import { AbonoService } from '../../services/abono.service';

@Component({
  selector: 'pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, OnDestroy {

     subscriber: any;
     tramiteActivo: Tramite = new Tramite();
     abonos: Abono[] = [];
     abonado: number = 0;

     fecha: any;
     cantidad_abonada: number;
     descripcion: string;
     loading: boolean = true;

    constructor(private route: ActivatedRoute,
                private tramiteService: TramiteService,
                private abonosService: AbonoService) {
    }

    ngOnInit() {
        let key;
        this.subscriber = this.route.params
        .subscribe(params => {
            key = params['key'];
        });

        this.cargarTramiteActivo(key);

        this.abonosService.obtenerAbonos()
        .then((abonos: any) => {
            this.abonos = abonos;
            this.loading = false;

            if (this.abonos) {
                for (let i = 0; i < this.abonos.length; i++) {
                    this.abonado += this.abonos[i].cantidad_abonada;
                }
            }
        });
    }

    registrarAbono(form: NgForm){
        let abono = form.value as Abono;
        this.abonos.push(abono);
        this.abonosService.agregarAbono(abono)
        .then(resultKey => {
            if (resultKey) {
                console.log('abono agregado');
                this.cargarTramiteActivo(this.tramiteActivo.$key);
            }
        });
    }

    cargarTramiteActivo(key){
        this.abonosService.obtenerTramiteRef(key)
        .then((data: Tramite) => {
            this.tramiteActivo = data;
            // console.log(this.tramiteActivo);
        });
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

}
