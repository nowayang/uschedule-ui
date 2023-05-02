import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, map, Observable, of, ReplaySubject, take, tap, throwError} from 'rxjs';
import {Day, DaySelection, Lesson} from '../plan.types';
import {Page} from "../../shared/shared.types";
import {PlanService} from "../plan.service";
import {PlanSettingsService} from "../plan-settings/plan-settings.service";


@Injectable({
  providedIn: 'root'
})
export class DayService {
  private dayList: ReplaySubject<DaySelection[]> = new ReplaySubject<DaySelection[]>(1);

  constructor(private httpClient: HttpClient,
              private planService: PlanService,
              private planSettingsService: PlanSettingsService) { }

  getDay(id: Number): Observable<Day> {
    return this.httpClient.get<Day>(`/api/days/${id}`).pipe(
      catchError(error => throwError(error)),
      map(res => res as Day),
    );
  }

  loadDayList(): Observable<DaySelection[]> {
    return this.httpClient
      .post(
        '/api/days',
        {
          scheduleId: this.planService.plan.value?.id,
          degree: this.planSettingsService.settings.value?.degree,
          level: this.planSettingsService.settings.value?.year,
          group: this.planSettingsService.settings.value?.group,
        },
        {params: {size: 1000, sort: 'date'}})
      .pipe(
        catchError(error => throwError(error)),
        map(res => res as Page<DaySelection>),
        map(res => res.content as DaySelection[]),
        tap(dayList => this.dayList.next(dayList))
      );
  }

  getNextId(currId: number): Observable<number> {
    return this.dayList.pipe(
        map(dayList => {
          const listIndex = dayList.findIndex(day => day.id === currId);
          return dayList[listIndex + 1];
        }),
        filter(nextDay => !!nextDay),
        map(nextDay => nextDay.id)
      );
  }

  getPrevId(currId: number): Observable<number> {
    return this.dayList.pipe(
      map(dayList => {
        const listIndex = dayList.findIndex(day => day.id === currId);
        return dayList[listIndex - 1];
      }),
      filter(prevDay => !!prevDay),
      map(prevDay => prevDay.id)
    );
  }
}
