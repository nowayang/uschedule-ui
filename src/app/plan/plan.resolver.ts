import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PlanService} from "./plan.service";
import {Plan} from "./plan.types";

@Injectable({
  providedIn: 'root'
})
export class PlanResolver implements Resolve<Plan> {

  constructor(private planService: PlanService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan> {
    return this.planService.loadLatestPlan();
  }
}
