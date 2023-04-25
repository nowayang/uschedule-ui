import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { LessonComponent } from './day/lesson/lesson.component';



@NgModule({
  declarations: [
    DayComponent,
    LessonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlanModule { }
