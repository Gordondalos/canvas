import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GordonEventService {

  setHeight: Subject<any> = new Subject<any>();
  setWidth: Subject<any> = new Subject<any>();
  setColor: Subject<any> = new Subject<any>();
  moveMouse: Subject<any> = new Subject<any>();
  mouseUp: Subject<any> = new Subject<any>();
  mouseDown: Subject<any> = new Subject<any>();
  removeSelected: Subject<any> = new Subject<any>();

  constructor() { }

}
