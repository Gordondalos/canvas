import {Component, OnInit} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';

@Component({
  selector: 'gordon-toolbar-left',
  templateUrl: './toolbar-left.component.html',
  styleUrls: ['./toolbar-left.component.scss']
})
export class ToolbarLeftComponent implements OnInit {

  color: string;

  constructor(private gordonEventService: GordonEventService) {
  }

  ngOnInit() {
  }

  addNewColor(color) {
    this.gordonEventService.setColor.next(color.value);
  }

}
