import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tramite } from '../../clases/tramite';
import { TramiteService } from '../../services/tramite.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-tramite',
  templateUrl: './tramite.component.html'
})
export class TramiteComponent implements OnInit {

    tramite: Tramite = new Tramite();
    $key: string;
    loading: boolean = true;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private toastyService: ToastyService,
                private tramiteService: TramiteService) {

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
            console.log('Se ha guardado correctamente.');
            this.router.navigateByUrl('/app/tramites', {skipLocationChange: true});
            this.toastyService.success('Información del trámite actualizada');
        });
    }

}
