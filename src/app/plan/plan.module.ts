import {NgModule} from '@angular/core';
import {DayComponent} from './day/day.component';
import {PlanComponent} from './plan.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {DaySelectedGuard} from "./day/day.guard";
import {DayNavComponent} from './day-nav/day-nav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {DayResolver} from "./day/day.resolver";
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';
import {PlanResolver} from "./plan.resolver";

const routes: Routes = [
  {
    path: '',
    component: PlanComponent,
    resolve  : {
      plan    : PlanResolver,
    },
    children: [
      {
        path: '',
        component: DayComponent,
        resolve  : {
          day    : DayResolver,
        },
      },
      {
        path: 'day/:id',
        component: DayComponent,
        canActivateChild: [DaySelectedGuard],
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
    DayNavComponent,
    PlanSettingsComponent,
  ],
  exports: [],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatSidenavModule,
  ]
})
export class PlanModule { }
