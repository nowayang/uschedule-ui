import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Plan} from "./plan.types";

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  plan: BehaviorSubject<Plan | undefined> = new BehaviorSubject<Plan | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }

  get plan$(): Observable<Plan> {
    return this.plan
      .asObservable()
      .pipe(map(plan => plan as Plan));
  }

  loadLatestPlan(): Observable<Plan> {
    return this.httpClient.get<Plan>("/api/schedules/latest").pipe(
      tap(plan => this.plan.next(plan))
    )
  }
}
