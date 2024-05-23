import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  registerMode: Boolean = false;
  users: any;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  // GetUsers
  getUsers() {
    this._http.get(`https://localhost:7086/api/users`).subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Request has Completed'),
    });
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // this fn responsable to recive the data from child (Register)
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
