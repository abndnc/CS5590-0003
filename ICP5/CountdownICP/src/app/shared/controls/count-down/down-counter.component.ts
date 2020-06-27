import {Component, OnInit, OnChanges, Input, OnDestroy} from '@angular/core';
import {Subscription, timer} from 'rxjs';
import {DateTimeModel} from "../../models/date-time.model";
import {DateUtils} from "../../services/date.utils";

@Component({
    selector: 'down-counter',
    templateUrl: './down-counter.component.html',
    styleUrls: ['./down-counter.component.scss']
})
export class DownCounterComponent implements OnInit, OnChanges, OnDestroy {
    @Input() time: number = 0;
    dateFormat: DateTimeModel;
    subscription: Subscription;

    constructor() {
        this.dateFormat = new DateTimeModel();
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

        this.dateFormat = DateUtils.dateModel(time);

        this.subscription = timer(0, 1000).subscribe(() => {
            time = time - 1;

            this.dateFormat = DateUtils.dateModel(time);
        });

    }

    ngOnDestroy(): void {

        if (this.subscription) {
            this.subscription.unsubscribe();
        }

    }
}
