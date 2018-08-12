import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { TramiteService } from '../../services/tramite.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

    usuarioActivo: Usuario;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    localidad: string;
    telefono: string;
    tipo_tramite: string;
    concepto_tramite: string;
    costo_tramite: number;

    constructor(private toastyService: ToastyService,
                private tramiteService: TramiteService,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.usuarioActivo = this.authService.obtenerUsuarioActivo();
        if (this.usuarioActivo == null) {
            this.router.navigate(['/splashscreen'])
        }
    }

    salir(){
        this.authService.signOut()
        .then(response => {
            this.router.navigate(['/splashscreen']);

        })
        .catch(error => {
            console.log(error);
        });
    }

    guardarTramite(tramite: NgForm){
        this.tramiteService.guardarTramite(tramite.value)
            .then((response:any) => {
                let key = response.key;

                if (response.status === 'success') {
                    this.showTramiteAgregadoToast();
                    tramite.reset();
                    this.router.navigate(['/app/pagos', key]);
                }
            }).catch( error => console.log(error));
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
