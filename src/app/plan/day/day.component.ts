import {Component, OnInit} from '@angular/core';
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {Day} from "../plan.types";
import {ActivatedRoute} from "@angular/router";
import {LogService} from "../../core/log.service";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {
  day: ReplaySubject<Day> = new ReplaySubject<Day>(1);

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private logService: LogService) {}

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(resolvedData => {

        this.day.next(resolvedData['day']);
        this.logService.log(resolvedData);
    });
  }

  onClickNavigateNext(): void {
    //todo
  }

  onClickNavigateBefore(): void {
    //todo
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
