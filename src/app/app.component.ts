import { AccountService } from './_Services/account.service';
import { Component } from '@angular/core';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'SocialMediaApp';
  users: any;

  constructor(private _AccountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  // SetCurrentUser
  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this._AccountService.setCurrentUser(user);
  }
}
