import {Component, OnDestroy, OnInit} from '@angular/core';
import {DayService} from "../day/day.service";
import {DaySelection} from "../plan.types";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-day-nav',
  templateUrl: './day-nav.component.html',
  styleUrls: ['./day-nav.component.sass']
})
export class DayNavComponent implements OnInit, OnDestroy {
  dayList: DaySelection[] = []

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private dayService: DayService) {}

  ngOnInit(): void {
    this.dayService.loadDayList()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(dayList => {
        this.dayList = dayList;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
