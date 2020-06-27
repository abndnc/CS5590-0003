import {DateTimeModel} from '../models/date-time.model';
import {TimeSpanModel} from '../models/time-span.model';

export class DateUtils {

    static formatTime(n: number): string {

        let model = this.timeModel(n);

        return this.formatDigits(model.hours) + ':' +
            this.formatDigits(model.minutes) + ':' +
            this.formatDigits(model.seconds);
    }

    static formatDate(n: number): string {

        let model = this.dateModel(n);

        return this.formatDigits(model.days) + ':' +
            this.formatDigits(model.hours) + ':' +
            this.formatDigits(model.minutes) + ':' +
            this.formatDigits(model.seconds);
    }

    static formatDigits(n: number): string {
        return n < 10 ? '0' + n : '' + n;
    }

    static dateModel(n: number): DateTimeModel {

        //convert to milliseconds
        let time = n * 1000;
        let model = new DateTimeModel();

        model.days = Math.floor(time / (1000 * 60 * 60 * 24));
        model.hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        model.minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        model.seconds = Math.floor((time % (1000 * 60)) / 1000);

        return model;
    }

    static timeModel(n: number): TimeSpanModel {

        //convert to milliseconds
        let time = n * 1000;

        let model = new TimeSpanModel();

        model.hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        model.minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        model.seconds = Math.floor((time % (1000 * 60)) / 1000);

        return model;
    }

}
