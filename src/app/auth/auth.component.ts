import {Component} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {

  constructor() {}

  async onSignInClick() {
    const env = environment;
    window.location.href = `${env.apiUrl}/oauth2/authorization/google?redirect_uri=${env.appUrl}/auth/oauth2-redirect`;
  }
}
