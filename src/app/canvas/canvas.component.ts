import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {NgModule, NgModuleFactory, Compiler} from '@angular/core';
import {GordonEventService} from '../services/gordon-event.service';
import {MouseModel} from '../models/mouse.model';
import * as _ from 'lodash';
import {EscapeHtmlPipe} from '../pipes/keephtml.pipe';

@Component({
  selector: 'gordon-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  dynamicComponent;
  dynamicModule: NgModuleFactory<any>;

  mouse: MouseModel = {
    x: 0,
    y: 0,
    mouseDown: false
  };

  el: HTMLElement;
  data: any;


  constructor(private compiler: Compiler,
              elementRef: ElementRef,
              private gordonEventService: GordonEventService) {
    this.el = elementRef.nativeElement;
    this.gordonEventService.setNewData.subscribe((data) => {
      this.addData(data);
    });
  }

  addData(data) {
    this.dynamicComponent = this.createNewComponent(JSON.stringify(data), this.gordonEventService);
    this.dynamicModule = this.compiler.compileModuleSync(this.createComponentModule(this.dynamicComponent));
  }

  protected createNewComponent(data: any, gordonEventService) {
    @Component({
      selector: 'gordon-dynamic-component',
      template: '<div [innerHtml]="text|keepHtml"></div>',
    })

    class DynamicComponent implements OnInit {
      text: any;
      gordonEventService: any;

      mouse: MouseModel = {
        x: 0,
        y: 0,
        mouseDown: false
      };

      el: HTMLElement;
      data: any;

      ngOnInit() {
        this.gordonEventService = gordonEventService;
        const div =  this.addData(JSON.parse(data)).outerHTML;
        this.text = div;
        console.log(this.text);
      }

      addData(data) {
        this.data = data;
        const div = document.createElement('div');
        _.each(data, (item) => {
          const element = document.createElement(item.tag);
          element.setAttribute('gordonChoise', '');
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
            element.innerHtml = item.text;
          }
          div.appendChild(element);
        });
        return div;
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
      onMousedown(event) {
        this.mouse.mouseDown = true;
        this.gordonEventService.mouseDown.next(this.mouse);
      }

    }

    return DynamicComponent;
  }

  protected createComponentModule(componentType: any) {
    @NgModule({
      imports: [],
      declarations: [
        componentType,
        EscapeHtmlPipe
      ],
      entryComponents: [componentType]
    })
    class RuntimeComponentModule {
    }

    return RuntimeComponentModule;
  }


  ngOnInit() {
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
  onMousedown(event) {
    this.mouse.mouseDown = true;
    this.gordonEventService.mouseDown.next(this.mouse);
  }


}
