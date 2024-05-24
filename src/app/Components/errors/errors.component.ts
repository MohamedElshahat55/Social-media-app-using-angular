import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.scss',
})
export class ErrorsComponent {
  constructor(private _http: HttpClient) {}

  //? Variables
  validationErrors: any = [];

  BaseUrl = 'https://localhost:7086/api/';
  get404Error() {
    this._http.get(this.BaseUrl + 'buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  get400Error() {
    this._http.get(this.BaseUrl + 'buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  get500Error() {
    this._http.get(this.BaseUrl + 'buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  get401Error() {
    this._http.get(this.BaseUrl + 'buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (err) => console.log(err),
    });
  }

  get400ValidationError() {
    this._http.post(this.BaseUrl + 'account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (err) => {
        this.validationErrors = err;
        console.log(err);
      },
    });
  }
}
