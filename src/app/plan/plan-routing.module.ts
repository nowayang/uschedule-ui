import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DayComponent} from './day/day.component';
import {DayGuard} from './day/day.guard';
import {DayResolver} from './day/day.resolver';
import {PlanComponent} from './plan.component';

const routes: Routes = [

  {
    path: '',
    component: PlanComponent,
    children: [
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
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PlanRoutingModule { }
