import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {DayService} from './day.service';
import {Day} from "../plan.types";
import {LogService} from "../../core/log.service";

@Injectable({
  providedIn: 'root'
})
export class DayResolver implements Resolve<Observable<Day | null>> {

  constructor(private dayService: DayService,
              private logService: LogService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Day | null> {
    if (!route.paramMap.has('id')) {
      return this.dayService.getUpcomingDay(new Date())
        .pipe(
          map(day => day.id),
          map(id => Number(id)),
          switchMap(id => this.dayService.getDay(id)),
          catchError(err => of(null))
        );
    }

    return of(route.paramMap.get('id'))
      .pipe(
        map(id => Number(id)),
        switchMap(id => this.dayService.getDay(id))
      )
  }
}
