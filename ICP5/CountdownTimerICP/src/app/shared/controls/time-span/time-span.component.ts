import {Component, OnInit, OnChanges, Input, OnDestroy} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {TimeSpanModel} from "../../models/time-span.model";
import {DateUtils} from "../../services/date.utils";

@Component({
    selector: 'time-span',
    templateUrl: './time-span.component.html',
    styleUrls: ['./time-span.component.scss']
})
export class TimeSpanComponent implements OnInit, OnChanges, OnDestroy {
    @Input() time: number = 0;
    timeFormat: TimeSpanModel;
    subscription: Subscription;

    constructor() {
        this.timeFormat = new TimeSpanModel();
    }

    ngOnInit() {
        this.changeModel(this.time);
    }

    ngOnChanges() {

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.changeModel(this.time);
    }

    changeModel(time: number) {

        this.subscription = timer(0, 1000).subscribe(() => {
            time = time - 1;

            this.timeFormat = DateUtils.timeModel(time);
        });

    }

    ngOnDestroy(): void {

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

    }
}
