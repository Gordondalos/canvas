import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SliderModule, RadioButtonModule, ColorPickerModule} from 'primeng/primeng';
import {AppComponent} from './app.component';
import { ToolbarLeftComponent } from './toolbar-left/toolbar-left.component';
import { ToolbarBottomComponent } from './toolbar-bottom/toolbar-bottom.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CanvasComponent } from './canvas/canvas.component';




@NgModule({
  declarations: [
    AppComponent,
    ToolbarLeftComponent,
    ToolbarBottomComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    SliderModule,
    FormsModule,
    RadioButtonModule,
    ColorPickerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
