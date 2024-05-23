import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BaseUrl = 'https://localhost:7086/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null); // as a box
  currentUser$ = this.currentUserSource.asObservable(); // as a notifications

  constructor(private _http: HttpClient) {}

  //Login
  login(model: any) {
    return this._http.post<User>(this.BaseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // Register
  register(model: any) {
    return this._http.post<User>(this.BaseUrl + 'Account/register', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
