import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../model/usuario';
import { Code } from '../../clases/codes';
import { ResponseMessage } from '../../model/message';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    typeSelected: string = 'password';
    usuarioActivo: any;
    correo: string;
    password: string;

    constructor(private authService: AuthService,
                private toastyService: ToastyService,
                private router: Router) {
        console.log('LoginComponent');
    }

    ngOnInit() {
    }

    async login(){
        let response = await this.authService.obtenerStatusAuth(this.correo);

        switch (response.message){
            case Code.AUTHORIZED:
                this.signIn(response.body);
                break;
            case Code.NON_EXISTENT:
                this.showNonExistentToast();
                break;
            case Code.UNAUTHORIZED:
                this.showUnauthorizedToast();
                break;
            default:

                break;
        }
    }

    signIn(usuario){
        this.authService.signInWithEmailAndPassword(this.correo, this.password)
        .then(response => {
            this.authService.guardarUsuarioActivo(usuario);
            this.router.navigate(['/app/inicio']);
        }).catch(error => {
            console.log('error');
            console.log(error);
            this.showPasswordOrEmailToast();
        });

    }

    showPasswordOrEmailToast(){
        let options: ToastOptions = {
            title: 'Contraseña incorrecta',
            msg: `Verifique sus datos`,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        this.toastyService.error(options);
    }

    showUnauthorizedToast(){
        let options: ToastOptions = {
            title: 'No tiene permiso para ingresar',
            msg: `Contacte a su administrador para que le otorgue permisos`,
            showClose: true,
            timeout: 7000,
            theme: 'bootstrap'
        };

        this.toastyService.warning(options);
    }

    showNonExistentToast(){
        let options: ToastOptions = {
            title: 'Correo inexistente',
            msg: `Cree una cuenta o verifique sus datos`,
            showClose: true,
            timeout: 7000,
            theme: 'bootstrap'
        };

        this.toastyService.error(options);
    }

    togglePassword(checked){
        if (checked) {
            this.typeSelected = 'text';
        } else {
            this.typeSelected = 'password';
        }
    }
}
