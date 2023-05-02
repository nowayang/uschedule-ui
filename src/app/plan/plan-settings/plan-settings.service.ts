import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Settings} from "../plan.types";

@Injectable({
  providedIn: 'root'
})
export class PlanSettingsService {
  private static DEFAULT_SETTINGS: Settings = {degree: 1, year: 1, group: 1};

  settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(PlanSettingsService.DEFAULT_SETTINGS);

  constructor() { }

  loadSettings(): Observable<Settings> {
    //todo get from API
    return of(PlanSettingsService.DEFAULT_SETTINGS);
  }
}
