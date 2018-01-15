import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SliderModule, RadioButtonModule, ColorPickerModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {ToolbarLeftComponent} from './toolbar-left/toolbar-left.component';
import {ToolbarBottomComponent} from './toolbar-bottom/toolbar-bottom.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GordonEventService} from './services/gordon-event.service';
import {DataService} from './services/data.service';
import {HttpClientModule} from '@angular/common/http';
import {ChoiseDirective} from './directives/choise.directive';
import {GordonComponent, NewCanvasComponent} from './new-canvas/new-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarLeftComponent,
    ToolbarBottomComponent,
    ChoiseDirective,
    NewCanvasComponent,
    GordonComponent,
    ],
  imports: [
    BrowserModule,
    SliderModule,
    FormsModule,
    RadioButtonModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  entryComponents: [GordonComponent],
  providers: [GordonEventService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
