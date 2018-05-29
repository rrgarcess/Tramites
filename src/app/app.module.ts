import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'

//services
import { TramiteService } from './services/tramite.service';

import { AppComponent } from './app.component';
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

//Routes
import { APP_ROUTES } from './app.router';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AbonoService } from './services/abono.service';


@NgModule({
  declarations: [
    AppComponent,
    TramitesComponent,
    PagosComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [TramiteService, AbonoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
