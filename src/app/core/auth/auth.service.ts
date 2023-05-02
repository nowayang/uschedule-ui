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
              private router: Router) { }

  get loggedUser$(): Observable<User> {
    return this.loggedUser.asObservable();
  }

  get loggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signIn(credentials: { email: string, password: string }): Observable<User> {

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

    if (!this.loggedIn.getValue()) {
      this.errorService.showError("User is not logged in.");
    }

    this.loggedIn.next(false);

    return this.loggedUser$;
  }
}
