import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScormStoreService } from 'src/app/servicios/scorm-store.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @ViewChild('burger', {static: true}) burgerRef: ElementRef;
    @ViewChild('lateral', {static: true}) lateralRef: ElementRef;
    @ViewChild('overlay', {static: true}) overlayRef: ElementRef;
    item: any;
    menu: any;
    headerClass: 'regular';
    subscripMenu: Subscription;
    unitPass = [];

    constructor(private scormStoreService: ScormStoreService) { 

    }

    ngOnInit() {
        this.subscripMenu = this.scormStoreService.state$
                                    .subscribe(
                                    (data: any) => {
                                        this.menu = data.menu.filter(elem => elem.menu === true);
                                        console.log(data.menu[data.currentPantalla].header);
                                        this.headerClass = data.menu[data.currentPantalla].header;
                                        this.item = data.menu[data.currentPantalla];
                                        let progress = data.progress;
                                        this.menu.forEach((element) => {
                                            element.learned = progress[element.page][2]  
                                        });
                                        this.unitPass = data.unitPass;
                                    },
                                    (error:any) => {console.log(error)
                                });
    }

    navTo(e) {
        this.scormStoreService.navTo(e);
        this.toggleMenu()
    }

    toggleMenu() {
        if (this.burgerRef.nativeElement.classList.value === 'burger') {
            this.burgerRef.nativeElement.classList.add('abierto')
            this.lateralRef.nativeElement.classList.add('abierto')
            this.overlayRef.nativeElement.classList.add('abierto')
        } else {
            this.burgerRef.nativeElement.classList.remove('abierto')
            this.lateralRef.nativeElement.classList.remove('abierto')
            this.overlayRef.nativeElement.classList.remove('abierto')
        }
    }

}
