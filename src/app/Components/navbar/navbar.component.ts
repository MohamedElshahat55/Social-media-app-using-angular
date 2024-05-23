import { AccountService } from './../../_Services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private _AccountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  // variables
  model: any = {};
  loggedIn: boolean = false;

  // this fn always to check the user is exist in local storage or not
  getCurrentUser() {
    this._AccountService.currentUser$.subscribe({
      next: (user) => (this.loggedIn = !!user), //if the user variable is truthy (not null or false) and to false otherwise.
      error: (err) => console.log(err),
    });
  }

  login() {
    this._AccountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },

      error: (err) => console.log(err),
    });
  }

  logOut() {
    this.loggedIn = false;
    this._AccountService.logout();
  }
}
