import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  showError(message: String = ''): void {
    console.error(message); // todo implement
  }
}
