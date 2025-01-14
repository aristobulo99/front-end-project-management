import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string | undefined, format: string = 'DD-MM-YYYY'): string {
    if (!value) return '';

    let date: Date;
    if (typeof value === 'string') {
      date = new Date(value);
    } else {
      date = value;
    }

  
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const hour = date.getHours();
    const minutes = date.getMinutes()

    switch (format) {
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`;
      case 'MM-DD-YYYY':
        return `${month}-${day}-${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'DD/MM/YYYY, HH:MM':
        return `${day}/${month}/${year}, ${hour}:${minutes}`;
      default:
        return `${day}-${month}-${year}`;
    }
  }

}
