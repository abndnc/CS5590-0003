import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DateUtils} from './shared/services/date.utils';
import {DateFormatPipe} from './shared/pipes/date-format.pipe';
import {TimeSpanComponent} from './shared/controls/time-span/time-span.component';
import {DigitFormatPipe} from './shared/pipes/digit-format.pipe';
import {TimeFormatPipe} from './shared/pipes/time-format.pipe';
import {DownCounterComponent} from './shared/controls/count-down/down-counter.component';

@NgModule({
  declarations: [
    AppComponent,

    DigitFormatPipe,
    TimeFormatPipe,
    DateFormatPipe,

    TimeSpanComponent,
    DownCounterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DateUtils],
  bootstrap: [AppComponent]
})
export class AppModule {
}
