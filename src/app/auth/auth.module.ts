import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import { Oauth2RedirectComponent } from './oauth2-redirect/oauth2-redirect.component';
import {AnonymousGuard} from "../core/auth/anonymous.guard";


const routes: Routes = [

  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'oauth2-redirect',
    component: Oauth2RedirectComponent,
  },
];

@NgModule({
  declarations: [
    AuthComponent,
    Oauth2RedirectComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    SharedModule,
  ],
})
export class AuthModule { }
