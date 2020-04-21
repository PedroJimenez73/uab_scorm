import { Injectable } from '@angular/core';
import { Pantalla } from '../modelos/pantalla.models';
import { PortadaComponent } from '../contenido/portada/portada.component';
import { Diapo1Component } from '../contenido/diapo1/diapo1.component';
import { Diapo2Component } from '../contenido/diapo2/diapo2.component';
import { Diapo3Component } from '../contenido/diapo3/diapo3.component';
import { Diapo4Component } from '../contenido/diapo4/diapo4.component';
import { Diapo6Component } from '../contenido/diapo6/diapo6.component';
import { Diapo5Component } from '../contenido/diapo5/diapo5.component';
import { Diapo7Component } from '../contenido/diapo7/diapo7.component';
import { Diapo8Component } from '../contenido/diapo8/diapo8.component';
import { Diapo10Component } from '../contenido/diapo10/diapo10.component';
import { Diapo11Component } from '../contenido/diapo11/diapo11.component';

@Injectable({
  providedIn: 'root'
})

export class PantallasService {

    pantallas = [
        new Pantalla(PortadaComponent, {}),
        new Pantalla(Diapo1Component, {}),
        new Pantalla(Diapo2Component, {}),
        new Pantalla(Diapo3Component, {}),
        new Pantalla(Diapo4Component, {}),
        new Pantalla(Diapo5Component, {}),
        new Pantalla(Diapo6Component, {}),
        new Pantalla(Diapo7Component, {}),
        new Pantalla(Diapo8Component, {}),
        new Pantalla(Diapo10Component, {}),
        new Pantalla(Diapo11Component, {}),
    ];

    constructor() { }

    getPantallas() {
        return this.pantallas;
    }

}
