import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DayComponent} from './day/day.component';
import {PlanComponent} from './plan.component';
import {LessonComponent} from './lesson/lesson.component';
import {SharedModule} from "../shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {DayListComponent} from "./day/day-list/day-list.component";


@NgModule({
  declarations: [
    PlanComponent,
    DayComponent,
    LessonComponent,
    DayListComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterOutlet,
  ]
})
export class PlanModule { }
