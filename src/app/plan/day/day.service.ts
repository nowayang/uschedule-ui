import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, tap} from 'rxjs';
import {Day, DaySelection} from '../plan.types';

const ELEMENT_DATA = [
  {
    id: 1,
    date: new Date(),
    lessonsLength: 2
  },
  {
    id: 2,
    date: new Date(),
    lessonsLength: 3
  },
  {
    id: 3,
    date: new Date(),
    lessonsLength: 3
  },
];

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private dayList: ReplaySubject<DaySelection[]> = new ReplaySubject<DaySelection[]>(1);

  constructor(private httpClient: HttpClient) { }

  getDay(id: Number): Observable<Day> {
    // return this.httpClient.get<Day>(`/days/${id}`); todo

    return of({
      date: new Date(),
      lessons: [
        {
          name: 'Architektura systemów komputerowych wykład',
          color: 'lightblue'
        },
        {
          name: 'Podstawy sieci komputerowych wykład\n' +
            'dr inż. J. Białas\n' +
            'ZDALNIE',
          color: 'lightpink'
        },
        {
          name: 'Programowanie w języku Java\n wykład mgr inż. Łukasz Gaża ZDALNIE',
          color: '#DDBDF1'
        },
      ]
    });
  }

  loadDayList(): Observable<DaySelection[]> {
    return of(ELEMENT_DATA).pipe(tap(list => this.dayList.next(list)))
  }
}
