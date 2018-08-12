import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

// services
import { TramiteService } from './services/tramite.service';
import { AuthService } from './services/auth.service';
import { AppComponent } from './app.component';
import { TramitesComponent } from './components/tramites/tramites.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

// Routes
import { APP_ROUTES } from './app.router';

// firebase
import { environment } from '../environments/environment';
import { AbonoService } from './services/abono.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { TramiteComponent } from './components/tramite/tramite.component';
import { FolioPipe } from './pipes/folio.pipe';
import { PdfService } from './services/pdf.service';
import { DateToTextPipe } from './pipes/date-to-text.pipe';
import { NumberToTextPipe } from './pipes/number-to-text.pipe';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ToastService } from './services/toast.service';
import { CommonModule } from '@angular/common';
import { SplashscreenComponent } from './components/splashscreen/splashscreen.component';
import { ApplicationComponent } from './components/application/application.component';


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
    FolioPipe,
    DateToTextPipe,
    NumberToTextPipe,
    LoginComponent,
    InicioComponent,
    UsuariosComponent,
    SplashscreenComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
      TramiteService,
      AbonoService,
      AuthService,
      ToastyModule,
      ToastService,
      PdfService
    ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
