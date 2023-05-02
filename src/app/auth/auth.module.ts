import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [

  {
    path: '',
    component: AuthComponent
  },
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    SharedModule,
  ],
})
export class AuthModule { }
