import {Component, ContentChild, HostListener, Input, OnInit} from '@angular/core';
import {MouseModel} from '../models/mouse.model';
import {GordonEventService} from '../services/gordon-event.service';
import {DataService} from '../services/data.service';


@Component({
  selector: 'gordon-generate',
  template: `
    <div gordonChoise *ngFor="let item of items">
      <ng-content></ng-content>
    </div>
    <p>{{mydata | json}}</p>
  `,
})
export class GordonComponent implements OnInit {

  @ContentChild('mydata') mydata;
  items;

  constructor(private gordonEventService: GordonEventService, private dataService: DataService) {
    this.gordonEventService.setNewData.subscribe((newDate) => {
      this.setNewData(newDate);
    });

  }

  setNewData(newDate) {
    console.log(newDate);
    this.items = newDate;
  }

  ngOnInit() {
    this.dataService.getData();

  }
}

@Component({
  selector: 'gordon-new-canvas',
  templateUrl: './new-canvas.component.html',
  styleUrls: ['./new-canvas.component.scss']
})
export class NewCanvasComponent implements OnInit {

  generateComponent: any;

  mouse: MouseModel = {
    x: 0,
    y: 0,
    mouseDown: false
  };

  el: any;
  data: any;


  myContent = [];

  constructor(private gordonEventService: GordonEventService) {
  }

  ngOnInit() {
    const myDiv = document.createElement('div');
    myDiv.classList.add('use');
    myDiv.style.width = '100px';
    myDiv.style.height = '100px';

    this.myContent = [[myDiv],[myDiv]];

    this.addDenerateComponent();
  }

  addDenerateComponent() {
    this.generateComponent = GordonComponent;
  }


  @HostListener('dblclick')
  ondblclick() {
    this.gordonEventService.removeSelected.next();
  }

  @HostListener('mouseup')
  onMouseup() {
    this.mouse.mouseDown = false;
    this.gordonEventService.mouseUp.next(this.mouse);
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this.mouse.x = event.pageX;
    this.mouse.y = event.pageY;
    this.gordonEventService.moveMouse.next(this.mouse);
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.mouse.mouseDown = true;
    this.gordonEventService.mouseDown.next(this.mouse);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.srcElement.classList[0] === 'use') {
      event.srcElement.classList.toggle('selected');
    }
  }

}
