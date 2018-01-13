import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GordonEventService} from './gordon-event.service';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient,
    private gordonEventService: GordonEventService,
  ) {
  }

  async getData() {
    const res = await this.http.get('../../assets/data.json').toPromise();
    this.gordonEventService.setNewData.next(res);
  }

}
