import { Routes } from '@angular/router'
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { TramiteComponent } from './components/tramite/tramite.component';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'tramites', pathMatch: 'full' },
    { path: 'tramites', component: TramitesComponent },
    { path: 'pagos/:key', component: PagosComponent },
    { path: 'tramite/:key', component: TramiteComponent }
]
