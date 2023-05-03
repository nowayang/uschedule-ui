import {Component, OnInit} from '@angular/core';
import {ReplaySubject, skip, Subject, switchMap, take, takeUntil} from "rxjs";
import {Day} from "../plan.types";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../core/log.service";
import {DayService} from "./day.service";

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
              private dayService: DayService,
              private logService: LogService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(resolvedData => {

        this.day.next(resolvedData['day']);
        this.logService.log(resolvedData);
    });

    this.subscribeToDayListChange();
  }

  subscribeToDayListChange(): void {
    this.dayService.dayList
      .pipe(
        skip(1),
        takeUntil(this.unsubscribeAll))
      .subscribe(resolvedData => {
        this.router.navigateByUrl("/plan").then()
      });
  }

  onClickNavigateNext(): void {
    this.day
      .pipe(switchMap(d => this.dayService.getNextId(d.id)))
      .pipe(take(1))
      .subscribe(nextId => this.router.navigateByUrl(`plan/day/${nextId}`))
  }

  onClickNavigateBefore(): void {
    this.day
      .pipe(switchMap(d => this.dayService.getPrevId(d.id)))
      .pipe(take(1))
      .subscribe(prevId => this.router.navigateByUrl(`plan/day/${prevId}`))
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
