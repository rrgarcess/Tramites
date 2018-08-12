import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/Usuario';
import { TipoUsuario } from '../../model/tipo_usuario';
import { AuthService } from '../../services/auth.service';
import { ResponseMessage } from '../../model/message';
import { Code } from '../../clases/codes';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

    loading: boolean = true;
    usuarios: Usuario[] = [];
    usuario: Usuario = new Usuario();
    tiposUsuario: TipoUsuario[] = [];
    password2: string;

    constructor(private auth: AuthService,
        private toastyService: ToastyService) {
        this.tiposUsuario.push({id: 1, nombre: 'Administrador', descripcion: ''});
        this.tiposUsuario.push({id: 2, nombre: 'Estandar', descripcion: ''});
        // this.tiposUsuario.push({id: 3, nombre: 'Temporal', descripcion: ''});
    }

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios(){
        this.auth.cargarUsuarios()
        .then(usuarios => {
            this.loading = false;
            this.usuarios = usuarios;
        });
    }

    toggleAutorizacion(usuario){
        this.auth.toggleAutorizacion(usuario)
        .then(response => {
            if (response.status == Code.SUCCESS) {
                this.showPremisosToast(response.body);
            }
        });
    }

    guardarUsuarioNuevo(){
        console.log(this.usuario);
        this.usuario.autorizado = false;

        this.auth.agregarUsuario(this.usuario)
        .then((response: ResponseMessage) => {
            if (response.status == Code.SUCCESS) {

                this.cargarUsuarios();
                this.showToastSuccess();

            } else if (response.status == Code.UNDEFINED) {
                console.log(response.message);
                this.showToastWarning();
            }
        }).catch(response => {
            if (response.status == Code.ERROR) {
                console.log('ERROR', response.message);
                this.showToastError();
            }
        });

        this.usuario = new Usuario();
    }

    showToastSuccess() {

        let options: ToastOptions = {
            title: 'Usuario agregado',
            msg: `El usuario fue agregado correctamente`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(options);
    }

    showPremisosToast(activo){
        let options: ToastOptions = {
            title: `Usuario ${ activo ? 'activado': 'desactivado' }`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(options);
    }

    showToastError(){
        let options: ToastOptions = {
            title: 'Error al agregar usuario',
            msg: `El usuario o correo ya fue registrado`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.error(options);
    }

    showToastWarning(){
        let options: ToastOptions = {
            title: 'Usuario no agregado',
            msg: `El usuario no pudo ser agregado`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.warning(options);
    }

}
