import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  catchError,
  filter,
  first,
  map,
  Observable,
  of,
  ReplaySubject,
  startWith,
  switchMap,
  tap,
  throwError
} from 'rxjs';
import {Day, DaySelection} from '../plan.types';
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
              private logService: LogService) {}

  getDay(id: Number): Observable<Day> {
    this.logService.log('getDay(' + id + ')');
    const settings = this.planSettingsService.settings.value;
    const url = `/api/days/${id}/degree/${settings.degree}/level/${settings.level}/group/${settings.groupIndex}`
    return this.httpClient.get<Day>(url).pipe(
      catchError(error => throwError(error)),
      map(res => res as Day),
    );
  }

  loadDayList(): Observable<DaySelection[]> {
    this.logService.log("loadDayList()");
    return this.httpClient
      .post(
        '/api/days',
        {
          scheduleId: this.planService.plan.value?.id,
          degree: this.planSettingsService.settings.value?.degree,
          level: this.planSettingsService.settings.value?.level,
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

  getUpcomingDayId(date: Date = new Date()): Observable<number> {
    return this.loadDayList().pipe(
      map(list => {
        const upcomingDays = list.filter(day => new Date(day.date).getTime() > date.getTime());
        console.log(upcomingDays);
        return !!upcomingDays && upcomingDays.length > 0 ? upcomingDays[0] : list[0];
      }),
      map(day => day.id)
    )
  }
}
