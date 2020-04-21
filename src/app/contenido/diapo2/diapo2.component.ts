import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-diapo2',
  templateUrl: './diapo2.component.html',
  styleUrls: ['./diapo2.component.scss']
})
export class Diapo2Component implements OnInit {

    @ViewChild('pic', {static: true}) picRef: ElementRef;

    constructor() { }

    ngOnInit() {
        
    }

    showPic() {
        this.picRef.nativeElement.classList.remove('hidden');
        this.picRef.nativeElement.classList.add('right-fade-in-slow');
    }
    
}
