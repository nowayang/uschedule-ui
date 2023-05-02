import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DayService} from './day.service';
import {Day} from "../plan.types";

@Injectable({
  providedIn: 'root'
})
export class DayResolver implements Resolve<Observable<Day>> {

  constructor(private dayService: DayService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Day> {
    return this.dayService.getDay(0);
  }
}
