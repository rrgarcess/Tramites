import { Routes } from '@angular/router'
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'tramites', pathMatch: 'full' },
    { path: 'tramites', component: TramitesComponent },
    { path: 'pagos/:key', component: PagosComponent }
]
