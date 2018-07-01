import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

    isAdmin: boolean;

    constructor(private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
        let usuario = this.authService.obtenerUsuarioActivo();
        this.isAdmin = usuario.tipo_usuario == 1 ? true: false;
    }

    signOut(){
        this.authService.signOut()
        .then(response => {
            this.authService.limpiarDatos();
            this.router.navigate(['/splashscreen']);

        })
        .catch(error => {
            console.log(error);
        });
    }

}
