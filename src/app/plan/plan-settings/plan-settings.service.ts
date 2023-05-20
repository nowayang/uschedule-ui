import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Observable, of, switchMap, tap} from "rxjs";
import {Plan, Settings} from "../plan.types";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../core/auth/auth.service";
import {LogService} from "../../core/log.service";

@Injectable({
  providedIn: 'root'
})
export class PlanSettingsService {
  private static DEFAULT_SETTINGS: Settings = {enableNotification: false, degree: 1, level: 1, groupIndex: 1};

  settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(PlanSettingsService.DEFAULT_SETTINGS);

  constructor(private httpClient: HttpClient,
              private logService: LogService) {
  }

  patchSettings(settings: Settings): Observable<Settings> {
    this.logService.log("patchSettings()")
    return this.httpClient.patch<Settings>("/api/account/settings", settings).pipe(
      tap(settings => this.settings.next(settings))
    );
  }

  loadSettings(): Observable<Settings> {
    this.logService.log("loadSettings()")
    return this.httpClient.get<Settings>("/api/account/settings").pipe(
      tap(settings => this.settings.next(settings))
    );
  }
}
