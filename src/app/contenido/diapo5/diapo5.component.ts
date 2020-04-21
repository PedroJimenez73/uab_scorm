import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-diapo5',
  templateUrl: './diapo5.component.html',
  styleUrls: ['./diapo5.component.scss']
})
export class Diapo5Component implements OnInit {

    constructor() { }

    ngOnInit() {
    }
      selectItem(e) {
        e--
        $(".item").removeClass("selected");
        $(".item").eq(e).toggleClass("selected");
        $(".texto").removeClass("selected");
        $(".texto").removeClass("show");
        $(".texto").eq(e).toggleClass("selected");
        setTimeout(()=>{
            $(".texto").eq(e).toggleClass("show");
        },10)
    }

}
