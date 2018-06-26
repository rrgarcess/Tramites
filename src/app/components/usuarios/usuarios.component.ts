import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../clases/Usuario';
import { TipoUsuario } from '../../model/tipo_usuario';
import { AuthService } from '../../services/auth.service';
import { ResponseMessage } from '../../model/message';
import { Code } from '../../clases/codes';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    usuario: Usuario = new Usuario();
    tiposUsuario: TipoUsuario[] = [];

    constructor(private auth: AuthService) {
        this.tiposUsuario.push({id: 1, nombre: 'Administrador', descripcion: ''});
        this.tiposUsuario.push({id: 2, nombre: 'Estandar', descripcion: ''});
        this.tiposUsuario.push({id: 3, nombre: 'Temporal', descripcion: ''});
    }

    ngOnInit() {
    }

    guardarUsuarioNuevo(){
        console.log(this.usuario);
        this.usuario.autorizado = false;

        this.auth.agregarUsuario(this.usuario)
        .then((response: ResponseMessage) => {
            if (response.status == Code.SUCCESS) {
                console.log('Usuario agregado');
            } else if (response.status == Code.UNDEFINED) {
                console.log(response.message);
            }
        }).catch(response => {
            if (response.status == Code.ERROR) {
                console.log('ERROR', response.message);
            }
        });

        this.usuario = new Usuario();
    }

}
