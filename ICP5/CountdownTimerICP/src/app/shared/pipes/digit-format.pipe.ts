import {Pipe, PipeTransform} from '@angular/core';
import {DateUtils} from '../services/date.utils';

@Pipe({name: 'digitFormat'})
export class DigitFormatPipe implements PipeTransform {

    transform(n: number) {

        if (n < 0) {
            return '00';
        }

        return DateUtils.formatDigits(n);
    }
}
