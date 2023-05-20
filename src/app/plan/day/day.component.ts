import {Component, OnInit} from '@angular/core';
import {filter, ReplaySubject, skip, Subject, switchMap, take, takeUntil} from "rxjs";
import {Day} from "../plan.types";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../core/log.service";
import {DayService} from "./day.service";
import {PlanSettingsService} from "../plan-settings/plan-settings.service";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {
  day: ReplaySubject<Day> = new ReplaySubject<Day>(1);

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private planSettingsService: PlanSettingsService,
              private dayService: DayService,
              private logService: LogService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(resolvedData => {

        this.day.next(resolvedData['day']);
        this.logService.log(resolvedData);
    });

    this.subscribeToPlanSettingsChange();
  }

  subscribeToPlanSettingsChange(): void {
    this.planSettingsService.settings
      .pipe(
        skip(1),
        takeUntil(this.unsubscribeAll),
        switchMap(settings => this.day.pipe(take(1))),
        filter(day => !!day),
        switchMap(day => this.dayService.getDay(day.id)))
      .subscribe(day => {
        this.day.next(day);
        this.logService.log(day);
      });
  }

  onClickNavigateNext(): void {
    this.day
      .pipe(
        take(1),
        switchMap(d => this.dayService.getNextId(d.id)))
      .subscribe(nextId => this.router.navigateByUrl(`plan/day/${nextId}`))
  }

  onClickNavigateBefore(): void {
    this.day
      .pipe(
        take(1),
        switchMap(d => this.dayService.getPrevId(d.id)))
      .subscribe(prevId => this.router.navigateByUrl(`plan/day/${prevId}`))
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
