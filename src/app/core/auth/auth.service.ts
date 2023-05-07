import {Injectable} from '@angular/core';
import {User} from "../user/user.types";
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {ErrorService} from "../error/error.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedUser: ReplaySubject<User> = new ReplaySubject<User>(1);
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private errorService: ErrorService,
              private router: Router) {

    const auth = this.authorizationHeader;
    this.loggedIn.next(!!auth && auth.length > 0)
  }

  get loggedUser$(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  get loggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  set authorizationHeader(token: string) {
    localStorage.setItem('auth', token);
  }

  get authorizationHeader(): string {
    return localStorage.getItem('auth') ?? '';
  }

  signIn(): Observable<User> {

    if (this.loggedIn.getValue()) {
      this.errorService.showError("User is already logged in.");
    }

    //todo implement
    const user: User = {
      id: 1,
      firstName: "Kamil"
    };

    this.loggedUser.next(user);
    this.loggedIn.next(true)

    return this.loggedUser$;
  }

  signOut(): Observable<any> {
    this.authorizationHeader = '';
    this.loggedIn.next(false);

    return this.loggedIn$;
  }
}
