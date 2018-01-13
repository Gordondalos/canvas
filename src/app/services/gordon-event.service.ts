import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class GordonEventService {

  setHeight: Subject<any> = new Subject<any>();
  setWidth: Subject<any> = new Subject<any>();
  setColor: Subject<any> = new Subject<any>();

  constructor() { }

}
