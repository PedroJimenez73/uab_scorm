import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reloj'
})
export class RelojPipe implements PipeTransform {

  transform(value: any): any {
        let seconds: any;
        let minutes: any;
        let hours: any;
        seconds = value / 1000;
        hours = ('0' + Math.floor(seconds / 3600)).slice(-2);
        seconds = seconds % 3600;
        minutes = ('0' + Math.floor(seconds / 60)).slice(-2);
        seconds = ('0' + seconds%60).slice(-2);
        if (hours === '00') {
            return minutes+":"+seconds;
        }
        return hours+":"+minutes+":"+seconds;
  }

}
