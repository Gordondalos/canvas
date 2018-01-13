import {Directive, ElementRef, HostListener} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';

@Directive({
  selector: '[gordonChoise]'
})
export class ChoiseDirective {


  height = 0;
  width = 0;

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
    if (this.el.nativeElement.contains(event.target)) {
      this.el.nativeElement.classList.toggle('selected');
      this.height = this.el.nativeElement.offsetHeight;
      this.width = this.el.nativeElement.offsetWidth;
    }
  }
}
