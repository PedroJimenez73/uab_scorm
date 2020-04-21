import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comunes/header/header.component';
import { Diapo1Component } from './contenido/diapo1/diapo1.component';
import { LoadDirective } from './directivas/load.directive';
import { PantallaComponent } from './pantalla/pantalla.component';
import { FooterComponent } from './comunes/footer/footer.component';
import { Diapo2Component } from './contenido/diapo2/diapo2.component';
import { PortadaComponent } from './contenido/portada/portada.component';
import { RelojPipe } from './reloj.pipe';
import { Diapo3Component } from './contenido/diapo3/diapo3.component';
import { Diapo4Component } from './contenido/diapo4/diapo4.component';
import { Diapo5Component } from './contenido/diapo5/diapo5.component';
import { Diapo6Component } from './contenido/diapo6/diapo6.component';
import { Diapo7Component } from './contenido/diapo7/diapo7.component';
import { Diapo8Component } from './contenido/diapo8/diapo8.component';
import { Diapo10Component } from './contenido/diapo10/diapo10.component';
import { ScrollDirective } from './directivas/scroll.directive';
import { Diapo11Component } from './contenido/diapo11/diapo11.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Diapo1Component,
    LoadDirective,
    PantallaComponent,
    FooterComponent,
    Diapo2Component,
    PortadaComponent,
    RelojPipe,
    Diapo3Component,
    Diapo4Component,
    Diapo5Component,
    Diapo6Component,
    Diapo7Component,
    Diapo8Component,
    Diapo10Component,
    ScrollDirective,
    Diapo11Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ 
    PortadaComponent, 
    Diapo1Component,
    Diapo2Component,
    Diapo3Component,
    Diapo4Component,
    Diapo5Component,
    Diapo6Component,
    Diapo7Component,
    Diapo8Component,
    Diapo10Component,
    Diapo11Component,
  ]
})
export class AppModule { }
