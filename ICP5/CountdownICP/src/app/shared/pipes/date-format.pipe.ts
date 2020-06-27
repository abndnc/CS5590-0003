import {Pipe, PipeTransform} from '@angular/core';
import {DateUtils} from '../services/date.utils';

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {

    transform(n: number) {

        if (n < 0) {
            return '00:00:00:00';
        }

        let format = DateUtils.formatDate(n);

        return format;
    }
}
