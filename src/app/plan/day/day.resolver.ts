import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {DayService} from './day.service';
import {Day} from "../plan.types";
import {LogService} from "../../core/log.service";

@Injectable({
  providedIn: 'root'
})
export class DayResolver implements Resolve<Observable<Day | null>> {

  constructor(private dayService: DayService,
              private logService: LogService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Day | null> {
    if (!route.paramMap.has('id')) {
      return of(null);
    }

    return of(route.paramMap.get('id'))
      .pipe(
        map(id => Number(id)),
        switchMap(id => this.dayService.getDay(id))
      )
  }
}
