import { Component } from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

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

    //todo implement
    this.authService.signIn(
      {
        email: '',
        password: ''
      }
    );

    let redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

    // Navigate to the redirect url
    this.router.navigateByUrl(redirectURL);
  }
}
