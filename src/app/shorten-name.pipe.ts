import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortenName',
})
export class ShortenNamePipe implements PipeTransform {

  transform(value: string, limit: number = 10): any {
    if (value.length > limit) {
      return value.substring(0, limit) + ' ...';
    }
    return value;
  }

}
