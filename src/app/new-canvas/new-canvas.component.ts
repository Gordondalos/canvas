import {Component,  HostListener, OnInit} from '@angular/core';
import {MouseModel} from '../models/mouse.model';
import {GordonEventService} from '../services/gordon-event.service';
import {DataService} from '../services/data.service';
import * as _ from 'lodash';


@Component({
  selector: 'gordon-generate',
  template: `
    <div gordonChoise>
      <ng-content></ng-content>
    </div>
  `,
})
export class GordonComponent implements OnInit {

  items: any;

  constructor(private gordonEventService: GordonEventService, private dataService: DataService) {
    this.gordonEventService.setNewData.subscribe((newDate) => {
      this.setNewData(newDate);
    });
  }

  setNewData(newDate) {
    // показываю что данные сюда прокидываются
    console.log(newDate);
    this.items = newDate;
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'gordon-new-canvas',
  templateUrl: './new-canvas.component.html',
  styleUrls: ['./new-canvas.component.scss']
})
export class NewCanvasComponent  {

  generateComponent: any;
  mouse: MouseModel = {
    x: 0,
    y: 0,
    mouseDown: false
  };
  data: any;
  myContent: any;
  constructor(
    private dataService: DataService,
    private gordonEventService: GordonEventService) {
    this.gordonEventService.setNewData.subscribe((newDate) => {
      this.setNewData(newDate);
    });
  }

  setNewData(myData) {
    this.myContent = [];
    this.data = myData;
    _.each(myData, (item) => {
      const element = document.createElement(item.tag);
      if (item.attributes && item.attributes.class) {
        element.classList.add(item.attributes.class);
      }
      if (item.attributes && item.attributes.width) {
        element.style.width = item.attributes.width + 'px';
      }
      if (item.attributes && item.attributes.height) {
        element.style.height = item.attributes.height + 'px';
      }
      if (item.attributes && item.attributes.positionTop) {
        element.style.top = item.attributes.positionTop + 'px';
      }
      if (item.attributes && item.attributes.positionLeft) {
        element.style.left = item.attributes.positionLeft + 'px';
      }
      if (item.attributes && item.attributes.bgColor) {
        element.style.backgroundColor = item.attributes.bgColor;
      }
      if (item.attributes && item.attributes.color) {
        element.style.color = item.attributes.color;
      }
      if (item.text) {
        element.innerText = item.text;
      }
      if (item.key ) {
        element.id = item.key;
      }

      this.myContent.push([[element]]);

    });
    localStorage.setItem('myContent', JSON.stringify(myData));
  }

  addGenerateComponent() {
    if (localStorage.getItem('myContent') && localStorage.getItem('myContent').length > 0) {
      const data = JSON.parse(localStorage.getItem('myContent'));
      this.setNewData(data);
      alert('Данные из localStorage');
    } else {
      alert('Запрос Данных');
      this.dataService.getData();
    }
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
    this.gordonEventService.removeSelected.next();
    if (event.srcElement.classList[0] === 'use') {
      event.srcElement.classList.toggle('selected');
    }
  }


}
