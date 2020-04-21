import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare var window: any;

class result  {
    answersChecked: any;
    result: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScormStoreService {

    diapos = [
        {text:"",class:"front-page", menu: false, question: false, page: null, header: 'white'},
        {text:"",class:"regular", menu: true, question: true, page: null, header: 'white'},
        {text:"Unidad 1",class:"sub", menu: true, question: false, page: null, header: 'regular'},
        {text:"Unidad 1",class:"sub", menu: false, question: false, page: null, header: 'regular'},
        {text:"Unidad 1",class:"sub", menu: true, question: false, page: null, header: 'regular'},
        {text:"Unidad 1",class:"sub", menu: true, question: false, page: null, header: 'regular'},
        {text:"Autoevaluación Unidad 1",class:"sub", menu: true, question: true, page: null, header: 'regular'},
        {text:"Autoevaluación Unidad 1",class:"sub", menu: true, question: true, page: null, header: 'regular'},
        {text:"Autoevaluación Unidad 1",class:"sub", menu: false, question: true, page: null, header: 'regular'},
        {text:"Resultados Unidad 1",class:"sub", menu: false, question: true, page: null, header: 'regular'},
        {text:"Unidad 2",class:"sub", menu: false, question: false, page: null, header: 'regular'}
    ];

    indexPantalla = 0;
    
    // To save char in cmi array have [menu, question, learned]
    progress = [];

    results = [];

    unitPass = [
        {unlocked: true, passed: false},
        {unlocked: false, passed: false},
        {unlocked: false, passed: false},
    ];

    cmiStore = {
        progress: [],
        results: []
    }

    constructor() { 
        this.diapos.forEach((element, i) => {
            this.diapos[i].page = i;
            this.progress.push([element.menu, element.question, false]);
            if(element.question === true) {
                this.results.push({answersChecked: null, result: false});
            }
        });
        setTimeout(()=> {
            if(window.ScormProcessGetValue("cmi.core.lesson_location", false)){
                this.indexPantalla = window.ScormProcessGetValue("cmi.core.lesson_location", false);
                this.navTo(this.indexPantalla);
            }
            if (window.ScormProcessGetValue("cmi.suspend_data")) {
                this.cmiStore = JSON.parse(window.ScormProcessGetValue("cmi.suspend_data"));
                this.progress = this.cmiStore.progress;
                this.results = this.cmiStore.results;
            } else {
                this.cmiStore = {
                    progress: this.progress,
                    results: this.results
                }
            }
        }, 750);
    }

    private stateIn: BehaviorSubject<any> = new BehaviorSubject<any>({menu: this.diapos, currentPantalla: this.indexPantalla, progress: this.progress, unitPass: this.unitPass});

    state$: Observable<any> = this.stateIn.asObservable();

    getInitialState() {
        return this.diapos.length;
    }

    prevPantalla() {
        this.indexPantalla--;
        this.navToPage();
    }

    nextPantalla() {
        this.indexPantalla++;
        this.progress[this.indexPantalla][2] = true;
        this.cmiStore.progress = this.progress;
        let cmiStoreStr = JSON.stringify(this.cmiStore);
        window.ScormProcessSetValue("cmi.suspend_data", cmiStoreStr);
        this.navToPage();
    }

    navTo(e) {
        this.indexPantalla = e;
        this.navToPage();
    }

    navToPage() {
        this.stateIn.next({menu: this.diapos, currentPantalla: this.indexPantalla, progress: this.progress, unitPass: this.unitPass});
        window.ScormProcessSetValue("cmi.core.lesson_location", (this.indexPantalla).toString());
        if (this.indexPantalla === (this.diapos.length - 1)){
            // reachedEnd = true;
            window.ScormProcessSetValue("cmi.core.lesson_status", "completed");
        }
    }

    getResults() {
        return this.results;
    }

    setResults(id, answersChecked, result) {
        this.results[id - 1] = {answersChecked: answersChecked, result: result};
        this.progress[this.indexPantalla][1] = false;
        this.stateIn.next({menu: this.diapos, currentPantalla: this.indexPantalla, progress: this.progress, unitPass: this.unitPass});
        this.cmiStore.results = this.results;
        let cmiStoreStr = JSON.stringify(this.cmiStore);
        window.ScormProcessSetValue("cmi.suspend_data", cmiStoreStr);
        let totalAciertos = 0;
        this.results.forEach((element) => {
            if(element.result) {
                totalAciertos++;
            }
        });
        let score = Math.round((totalAciertos / this.results.length) * 100);
        window.ScormProcessSetValue("cmi.core.score.raw", score);
        window.ScormProcessSetValue("cmi.core.score.min", "0");
        window.ScormProcessSetValue("cmi.core.score.max", "100");
        if (score >= 50){
            window.ScormProcessSetValue("cmi.core.lesson_status", "passed");
        }
        else{
            window.ScormProcessSetValue("cmi.core.lesson_status", "failed");
        }
    }

    getAswersChecked(id) {
        if(this.results[id - 1] !== null) {
            return this.results[id - 1].answersChecked;
        } else {
            return false
        }
    }

    exit() {
        window.open(window.location, '_self').close();
        window.ScormProcessSetValue("cmi.core.exit", "suspend");
    }

    reset(e) {
        this.navTo(e);
        this.results = [];
        this.progress = [];
        this.diapos.forEach(element => {
            this.progress.push([element.menu, element.question, false]);
            if(element.question === true) {
                this.results.push({answersChecked: null, result: false});
            }
        });
        this.stateIn.next({menu: this.diapos, currentPantalla: this.indexPantalla, progress: this.progress, unitPass: this.unitPass});
        this.cmiStore.results = this.results;
        this.cmiStore.progress = this.progress;
        let cmiStoreStr = JSON.stringify(this.cmiStore);
        window.ScormProcessSetValue("cmi.suspend_data", cmiStoreStr);
        let totalAciertos = 0;
        this.results.forEach((element) => {
            if(element.result) {
                totalAciertos++;
            }
        });
        let score = Math.round((totalAciertos / this.results.length) * 100);
        window.ScormProcessSetValue("cmi.core.score.raw", score);
        window.ScormProcessSetValue("cmi.core.score.min", "0");
        window.ScormProcessSetValue("cmi.core.score.max", "100");
        if (score >= 50){
            window.ScormProcessSetValue("cmi.core.lesson_status", "passed");
        }
        else{
            window.ScormProcessSetValue("cmi.core.lesson_status", "failed");
        }
    }

    setUnitPass(e) {
        this.unitPass[e].passed = true;
        this.unitPass[e + 1].unlocked = true;
        this.stateIn.next({menu: this.diapos, currentPantalla: this.indexPantalla, progress: this.progress, unitPass: this.unitPass});
        this.navTo(1);
    }

}
