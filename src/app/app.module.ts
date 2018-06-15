import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ToastModule } from 'ng2-toastr/ng2-toastr';

//services
import { TramiteService } from './services/tramite.service';

import { AppComponent } from './app.component';
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

//Routes
import { APP_ROUTES } from './app.router';

//firebase
import { environment } from '../environments/environment';
import { AbonoService } from './services/abono.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { TramiteComponent } from './components/tramite/tramite.component';
import { FolioPipe } from './pipes/folio.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TramitesComponent,
    PagosComponent,
    NavMenuComponent,
    CapitalizePipe,
    FilterPipe,
    OrderPipe,
    TramiteComponent,
    FolioPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    ToastModule.forRoot()
  ],
  providers: [TramiteService, AbonoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
