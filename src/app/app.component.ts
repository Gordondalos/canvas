import { Component } from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'gordon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loader = true;

  constructor(
    private dataService: DataService) {
    this.dataService.getData();
  }
}
