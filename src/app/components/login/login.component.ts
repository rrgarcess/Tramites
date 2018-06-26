import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../model/usuario';
import { Code } from '../../clases/codes';
import { ResponseMessage } from '../../model/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService) {

    }

    ngOnInit() {
        this.agregarUsuario();
    }

    agregarUsuario(){
        let usuario: Usuario = {
            tipo_usuario: 1,
            nombre: 'Ruben',
            apellido_paterno: 'Araus',
            apellido_materno: 'García',
            correo: 'ruben.araus.g@gmail.com',
            telefono: '2731250757',
            contrasena: 'admin123',
            autorizado: true
        };

    }

}
