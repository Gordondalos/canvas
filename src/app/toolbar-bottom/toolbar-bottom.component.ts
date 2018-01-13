import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gordon-toolbar-bottom',
  templateUrl: './toolbar-bottom.component.html',
  styleUrls: ['./toolbar-bottom.component.scss']
})
export class ToolbarBottomComponent implements OnInit {

  width: number = 0;
  height: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
