import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashscreenComponent implements OnInit {

    ready: boolean = false;

    constructor(private authService: AuthService,
                private zone: NgZone,
                private router: Router) {
        console.log('SplashscreenComponent')
    }

    ngOnInit() {
        console.log('ngOnInit');
        setTimeout(() => {
            localStorage.clear();
            let usuario = this.authService.obtenerUsuarioActivo();
            if (usuario) {
                console.log('user');
                this.checkUserExistent();
            } else {
                console.log('not user');
                this.authService.signOut();
                this.authService.limpiarDatos();
                this.router.navigate(['/login']);
            }
        }, 1000);
    }

    checkUserExistent(){
        this.authService.onAuthStateChanged((user) => {

            if (user) {
                console.log(user);
                this.zone.run(() => {
                    this.router.navigate(['/app/inicio']);
                });
            } else {
                this.zone.run(() => {
                    this.authService.limpiarDatos();
                    this.router.navigate(['/login']);
                })
            }

        });
    }


}
