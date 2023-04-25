import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { PlanComponent } from './plan.component';
import { LessonComponent } from './lesson/lesson.component';



@NgModule({
  declarations: [
    PlanComponent,    
    DayComponent,
    LessonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlanModule { }
