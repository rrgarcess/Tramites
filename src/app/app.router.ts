import { Routes } from '@angular/router'
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { TramiteComponent } from './components/tramite/tramite.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SplashscreenComponent } from './components/splashscreen/splashscreen.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ApplicationComponent } from './components/application/application.component';

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'splashscreen' },
    { path: 'splashscreen', component: SplashscreenComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'app',
        component: ApplicationComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'inicio' },
            { path: 'inicio', component: InicioComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'tramites', component: TramitesComponent },
            { path: 'pagos/:key', component: PagosComponent },
            { path: 'tramite/:key', component: TramiteComponent }
        ]
    },
]
