import {Directive, ElementRef, HostListener} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';
import {MouseModel} from '../models/mouse.model';
import * as _ from 'lodash';

@Directive({
  selector: '[gordonChoise]'
})
export class ChoiseDirective {

  height = 0;
  width = 0;
  mouse: MouseModel;
  onse = true;

  constructor(private el: ElementRef, private gordonEventService: GordonEventService) {
    this.gordonEventService.setHeight.subscribe((height) => {
      this.setHeight(height);
    });
    this.gordonEventService.setWidth.subscribe((width) => {
      this.setWidth(width);
    });
    this.gordonEventService.setColor.subscribe((color) => {
      this.setColor(color);
    });
    this.gordonEventService.mouseDown.subscribe((mouse) => {
      this.mouse = mouse;
      this.mouseDown();
    });
    this.gordonEventService.mouseUp.subscribe((mouse) => {
      this.mouse = mouse;
      this.mouseUp();
    });
    this.gordonEventService.moveMouse.subscribe((mouse) => {
      this.mouse = mouse;
      this.mouseMove();
    });
    this.gordonEventService.removeSelected.subscribe(() => {
      this.removeSelected();
    });
  }

  mouseDown() {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      element.classList.add('moving');
    }
  }

  removeSelected() {
    const selectedElemets = document.getElementsByClassName('selected');
    _.each(selectedElemets, (item) => {
      item.classList.remove('selected');
    });
  }

  mouseUp() {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      element.classList.remove('moving');
    }

  }


  mouseMove() {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      if (this.mouse.mouseDown) {
        const left = this.mouse.x - element.getBoundingClientRect().width * 1.5;
        const top = this.mouse.y - element.getBoundingClientRect().height;
        element.style.left = left + 'px';
        element.style.top = top + 'px';

        const data = JSON.parse(localStorage.getItem('myContent'));
        _.each(data, (item) => {
          if (item.key === element.id) {
            item.attributes.positionTop = top;
            item.attributes.positionLeft = left;
            return;
          }
        });
        localStorage.setItem('myContent', JSON.stringify(data));
      }
    }

  }


  setHeight(height) {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      element.style.height = this.height + height + 'px';
    }
  }

  setWidth(width) {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      element.style.width = this.width + width + 'px';
    }
  }

  setColor(color) {
    const element: any = document.getElementsByClassName('selected')[0];
    if (element) {
      element.style.backgroundColor = color;
    }
    this.setatributeLocaly(element, 'backgroundColor', 'bgColor');
  }

  setatributeLocaly(element, atributName, propName) {
    const data = JSON.parse(localStorage.getItem('myContent'));
    _.each(data, (item) => {
      if (item.key === element.id) {
        item.attributes[propName] = element.style[atributName];
        return;
      }
    });
    localStorage.setItem('myContent', JSON.stringify(data));
  }

}
