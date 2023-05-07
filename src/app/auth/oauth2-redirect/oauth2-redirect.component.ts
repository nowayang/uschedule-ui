import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";
import {User} from "../../core/user/user.types";
import {LogService} from "../../core/log.service";
import {take} from "rxjs";

@Component({
  selector: 'app-oauth2-redirect',
  templateUrl: './oauth2-redirect.component.html',
  styleUrls: ['./oauth2-redirect.component.sass']
})
export class Oauth2RedirectComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute,
              private logService: LogService,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.queryParamMap;

    const token: any = paramMap.get('token');
    const redirectUrl: any = paramMap.get('redirect_url');

    this.logService.log("Oauth2RedirectComponent ngOnInit()")
    this.logService.log(token);
    this.logService.log(redirectUrl);

    if (token) {
      this.authService.accessToken = token;
      this.authService.signIn().pipe(take(1)).subscribe((user: User) => {

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          this.router.navigateByUrl('/')
        }

      });
    } else {
      this.errorMessage = this.route.snapshot.queryParamMap.get('error');
      setTimeout(() => window.location.reload(), 5000);
    }
  }
}
