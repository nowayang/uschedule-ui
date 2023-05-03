import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, map, Observable, of, ReplaySubject, take, takeUntil, tap, throwError} from 'rxjs';
import {Day, DaySelection, Lesson} from '../plan.types';
import {Page} from "../../shared/shared.types";
import {PlanService} from "../plan.service";
import {PlanSettingsService} from "../plan-settings/plan-settings.service";
import {LogService} from "../../core/log.service";


@Injectable({
  providedIn: 'root'
})
export class DayService {
  dayList: ReplaySubject<DaySelection[]> = new ReplaySubject<DaySelection[]>(1);

  constructor(private httpClient: HttpClient,
              private planService: PlanService,
              private planSettingsService: PlanSettingsService,
              private logService: LogService) {
    this.subscribeToPlanSettings();
  }

  getDay(id: Number): Observable<Day> {
    return this.httpClient.get<Day>(`/api/days/${id}/groups/${this.planSettingsService.settings.value?.group}`).pipe(
      catchError(error => throwError(error)),
      map(res => res as Day),
    );
  }

  subscribeToPlanSettings(): void {
    this.logService.log("subscribeToPlanSettings()");
    this.planSettingsService.settings.asObservable()
      .subscribe(newSettings => {
        this.logService.log(newSettings);
        this.loadDayList().pipe(take(1)).subscribe();
      });
  }

  loadDayList(): Observable<DaySelection[]> {
    this.logService.log("loadDayList()");
    return this.httpClient
      .post(
        '/api/days',
        {
          scheduleId: this.planService.plan.value?.id,
          degree: this.planSettingsService.settings.value?.degree,
          level: this.planSettingsService.settings.value?.year,
        },
        {params: {size: 1000, sort: 'date'}})
      .pipe(
        catchError(error => throwError(error)),
        map(res => res as Page<DaySelection>),
        map(res => res.content as DaySelection[]),
        tap(dayList => this.dayList.next(dayList)),
        tap(dayList => this.logService.log("day list updated"))
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
