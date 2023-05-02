import {NgModule} from '@angular/core';
import {DayComponent} from './day/day.component';
import {PlanComponent} from './plan.component';
import {LessonComponent} from './lesson/lesson.component';
import {SharedModule} from "../shared/shared.module";
import {DayListComponent} from "./day/day-list/day-list.component";
import {RouterModule, Routes} from "@angular/router";
import {DayGuard} from "./day/day.guard";
import {DayResolver} from "./day/day.resolver";

const routes: Routes = [

  {
    path: '',
    component: PlanComponent,
    children: [
      {
        path: '',
        component: DayListComponent,
      },
      {
        path: 'day',
        component: DayComponent,
        canActivateChild: [DayGuard],
        resolve  : {
          day    : DayResolver,
        },
      },
    ]
  },
];

@NgModule({
  declarations: [
    PlanComponent,
    DayComponent,
    LessonComponent,
    DayListComponent
  ],
  exports: [],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PlanModule { }
