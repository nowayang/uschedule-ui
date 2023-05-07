import {Component} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent {

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  onSignInClick(): void {
    const env = environment;
    window.location.href = `${env.apiUrl}/oauth2/authorization/google?redirect_uri=${env.appUrl}/auth/oauth2-redirect`;
  }
}
