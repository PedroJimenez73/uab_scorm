import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { ScormStoreService } from 'src/app/servicios/scorm-store.service';

@Component({
  selector: 'app-diapo10',
  templateUrl: './diapo10.component.html',
  styleUrls: ['./diapo10.component.scss']
})
export class Diapo10Component implements OnInit {

    results = [];
    totalAciertos = 0;
    porcentAciertos = 0;
    doughnutChartLabels: Label[];
    doughnutChartData: MultiDataSet;
    doughnutChartType: ChartType = 'doughnut';
    doughnutChartOptions: ChartOptions = {
        responsive: true,
        legend: {
        display: false
        },
    }
    doughnutChartColors = [];
    mensaje: string;
    pass = false;
    
    constructor(private scormStoreService: ScormStoreService) { }

    ngOnInit() {
        for (let i = 0; i < 3; i ++) {
            this.results.push(this.scormStoreService.getResults()[i].result)
        }
        this.results.forEach(elem => {
            if(elem) {
                this.totalAciertos++;
            }
        });
        this.porcentAciertos = Math.round((this.totalAciertos / this.results.length) * 100);
        this.loadChartResultados();
        if (this.totalAciertos < (this.results.length * 0.5)) {
			this.mensaje = 'Lo sentimos, no has superado la unidad. Pulsa en Nuevo Intento';
		} else if (this.totalAciertos >= (this.results.length * 0.5)) {
			this.pass = true;
            this.mensaje = '¡Enhorabuena, has superado la unidad y conseguido un Golden Badge!';
		} 
    }
    
    loadChartResultados() {
        let resto = 100 - this.porcentAciertos;
        let color;
        if(this.porcentAciertos >= 50){
            color = '#008489';
        } else if (this.porcentAciertos >= 25){
            color = '#ffb822';
        } else {
            color = '#8f0404';
        }
        this.doughnutChartLabels = ['% Correctas','% Incorrectas'];
        this.doughnutChartData = [[this.porcentAciertos, resto ]];
        this.doughnutChartColors = [
            {
                backgroundColor: [ color, 'lightgrey'],
            },
        ];
    }

    reset() {
        this.scormStoreService.reset(2);
    }

    passUnit() {
        this.scormStoreService.setUnitPass(0);
    }

}
