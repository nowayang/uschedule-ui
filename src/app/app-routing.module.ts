import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/auth/auth.guard";
import {AnonymousGuard} from "./core/auth/anonymous.guard";

const routes: Routes = [

  {
    path: 'plan',
    loadChildren: () => import('./plan/plan-routing.module').then(m => m.PlanRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),
    canActivate: [AnonymousGuard]
  },
  { path: '**',  redirectTo: 'plan' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
