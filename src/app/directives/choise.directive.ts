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
      debugger
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
        element.style.left = this.mouse.x - element.getBoundingClientRect().width * 1.5 + 'px';
        element.style.top = this.mouse.y - element.getBoundingClientRect().height + 'px';
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
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    debugger
    if (this.el.nativeElement.contains(event.target)) {
      this.removeSelected();
      this.el.nativeElement.classList.toggle('selected');
      if (this.onse) {
        this.height = this.el.nativeElement.offsetHeight;
        this.width = this.el.nativeElement.offsetWidth;
        this.onse = false;
      }
    }
  }

  updateDataInLocalStorage() {

  }


}
