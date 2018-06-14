import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tramite } from '../../clases/tramite';
import { TramiteService } from '../../services/tramite.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html',
  styleUrls: ['./tramite.component.css']
})
export class TramiteComponent implements OnInit {

    tramite: Tramite = new Tramite();
    $key: string;
    loading: boolean = true;

    constructor(private route: ActivatedRoute,
                private tramiteService: TramiteService,
                public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);

        this.route.params
        .subscribe(params => {
            this.$key = params['key'];
        });

        this.tramiteService.obtenerTramite(this.$key)
        .then((tramite: Tramite) => {
            if (tramite) {
                this.tramite = tramite;
                console.log(this.tramite)
                this.loading = false;
            }
        });
    }

    ngOnInit() {
    }

    actualizaTramite(){
        this.tramiteService.actualizaTramite(this.$key, this.tramite)
        .then((response) => {
            this.toastr.success('Guardado', 'Se ha guardado correctamente.');
            console.log('Se ha guardado correctamente.');
            if (response.status == 'succes') {


            }
        });
    }

}
