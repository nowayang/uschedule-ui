import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, switchMap, tap} from 'rxjs';
import {AuthService} from './auth.service';
import {LogService} from "../log.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private logService: LogService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.logService.log("AuthGuard canActivate()")

    return this.authService.loggedIn$.pipe(tap(loggedIn => {
      if ( !loggedIn) {

        const redirectUrl = state.url;

        this.logService.log("AuthGuard redirecting to auth")
        this.router.navigate(
          ['auth'],
          {
            queryParams: {redirectUrl}
          }
        );
      }
    }));
  }
}
