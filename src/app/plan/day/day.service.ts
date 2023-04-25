import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Day} from '../plan.types';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private httpClient: HttpClient) { }

  getDay(id: Number): Observable<any> {
    return this.httpClient.get<Day>(`/days/${id}`);
  }
}
