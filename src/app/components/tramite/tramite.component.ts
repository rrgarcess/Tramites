import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tramite } from '../../clases/tramite';
import { TramiteService } from '../../services/tramite.service';
import { Router } from '@angular/router';

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
                private router: Router,
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
            this.router.navigateByUrl('/tramites');
            console.log(response)
        });
    }

}
