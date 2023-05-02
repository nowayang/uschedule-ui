import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, ReplaySubject} from "rxjs";
import {Settings} from "../plan.types";

@Injectable({
  providedIn: 'root'
})
export class PlanSettingsService {
  private static DEFAULT_SETTINGS: Settings = {degree: 1, year: 1, group: 1};
  private settings: ReplaySubject<Settings> = new ReplaySubject<Settings>(1);

  constructor() { }

  loadSettings(): Observable<Settings> {
    //todo get from API
    return of(PlanSettingsService.DEFAULT_SETTINGS);
  }
}
