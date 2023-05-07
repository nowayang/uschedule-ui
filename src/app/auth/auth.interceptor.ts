import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../core/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let req = request;
    const authorizationHeader = this.authService.authorizationHeader;

    if (authorizationHeader && authorizationHeader.length > 0) {
      req = req.clone({
        headers: req.headers.set('Authorization', authorizationHeader)
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {

        // Catch "401 Unauthorized" responses
        if ( error instanceof HttpErrorResponse && error.status === 401 )
        {
          // Sign out
          this.authService.signOut();

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }
}
