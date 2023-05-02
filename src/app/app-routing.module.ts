import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/auth/auth.guard";
import {AnonymousGuard} from "./core/auth/anonymous.guard";

const routes: Routes = [

  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AnonymousGuard]
  },
  { path: '**',  redirectTo: 'plan' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
