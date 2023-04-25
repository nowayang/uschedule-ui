import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {LogService} from "../log.service";

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {

  constructor(private authService: AuthService, private logService: LogService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.logService.log("AnonymousGuard canActivate()")
    return this.authService.loggedIn$.pipe(map(val => !val));
  }

}
