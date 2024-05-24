import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BaseUrl = 'https://localhost:7086/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null); // as a box hold initial value
  //=====================================================================================
  //The asObservable() => method allows other components to subscribe and receive updates.
  //=====================================================================================
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

//map() => Transforming Data Streams
//In RxJS, the map operator is a powerful tool for transforming values emitted by an Observable. It allows you to apply a function to each value in the stream, producing a new stream with the modified value

//1) Data Transformation: => map is particularly useful when working with asynchronous data in Angular, such as data fetched from APIs. You can use it to manipulate the data before displaying it in your templates.

//2) Flexibility: =>  You can chain multiple map operators together to perform multiple transformations on the data stream.

//3) Improved Readability:  => By applying transformations in a dedicated map function, you keep your code clean and easy to understand, especially when dealing with complex data structures.
