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

    correo: string;
    password: string;

    constructor(private authService: AuthService) {

    }

    ngOnInit() {}

    async login(){
        let autorizado = await this.authService.obtenerStatusAuth(this.correo);

        if(autorizado){
            console.log('login');
        }else {
            console.log('error');
        }
    }
}
