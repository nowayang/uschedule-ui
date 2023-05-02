import {Component, OnDestroy, OnInit} from '@angular/core';
import {DayService} from "../day.service";
import {Subject, takeUntil} from "rxjs";
import {DaySelection} from "../../plan.types";


@Component({
  selector: 'app-day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.sass']
})
export class DayListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date', 'lessonsLength'];
  dataSource: DaySelection[] = [];

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private dayService: DayService) {
  }

  ngOnInit(): void {
    this.dayService.loadDayList()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(dayList => {
        this.dataSource = dayList;
      })
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
