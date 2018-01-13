import {Component, OnInit} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';

@Component({
  selector: 'gordon-toolbar-bottom',
  templateUrl: './toolbar-bottom.component.html',
  styleUrls: ['./toolbar-bottom.component.scss']
})
export class ToolbarBottomComponent implements OnInit {

  width = 0;
  height = 0;

  constructor(private gordonEventService: GordonEventService) {
  }

  ngOnInit() {
  }

  heightChange(size) {
    this.gordonEventService.setHeight.next(size);
  }

  widthChange(size) {
    this.gordonEventService.setWidth.next(size);
  }

}
