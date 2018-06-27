import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/Usuario';
import { TipoUsuario } from '../../model/tipo_usuario';
import { AuthService } from '../../services/auth.service';
import { ResponseMessage } from '../../model/message';
import { Code } from '../../clases/codes';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ToastyService]
})
export class UsuariosComponent implements OnInit {

    usuarios: Usuario[] = [];
    usuario: Usuario = new Usuario();
    tiposUsuario: TipoUsuario[] = [];

    constructor(private auth: AuthService,
        private toastyService:ToastyService) {
        this.tiposUsuario.push({id: 1, nombre: 'Administrador', descripcion: ''});
        this.tiposUsuario.push({id: 2, nombre: 'Estandar', descripcion: ''});
        this.tiposUsuario.push({id: 3, nombre: 'Temporal', descripcion: ''});
    }

    ngOnInit() {
        this.cargarUsuarios();
    }

    cargarUsuarios(){
        this.auth.cargarUsuarios()
        .then(usuarios => {
            this.usuarios = usuarios;
        });
    }

    guardarUsuarioNuevo(){
        console.log(this.usuario);
        this.usuario.autorizado = false;

        this.auth.agregarUsuario(this.usuario)
        .then((response: ResponseMessage) => {
            if (response.status == Code.SUCCESS) {

                console.log('Usuario agregado');
                this.showToastSuccess(this.usuario.nombre);

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

    showToastSuccess(name?: string) {

        let options: ToastOptions = {
            title: 'Usuario agregado',
            msg: `El usuario ${name} fue agregado correctamente`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.success(options);
    }

    showToastError(){
        let options: ToastOptions = {
            title: 'Error agregado usuario',
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
