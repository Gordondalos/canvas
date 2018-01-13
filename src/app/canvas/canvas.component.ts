import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';
import {MouseModel} from '../models/mouse.model';

@Component({
  selector: 'gordon-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  mouse: MouseModel = {
    x: 0,
    y: 0,
    mouseDown: false
  };

  constructor(elementRef: ElementRef,
              private gordonEventService: GordonEventService) {

  }


  ngOnInit() {
  }

  @ViewChild('canvas') canvas: ElementRef;

  @HostListener('dblclick')
  ondblclick() {
    this.gordonEventService.removeSelected.next()
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
  onMousedown(event) {
    this.mouse.mouseDown = true;
    this.gordonEventService.mouseDown.next(this.mouse);
  }


}
