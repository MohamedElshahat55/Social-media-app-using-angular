import { Router } from '@angular/router';
import { AccountService } from './../../_Services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../../_models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private _AccountService: AccountService,
    private _router: Router,
    private _toaster: ToastrService
  ) {}
  // Observables
  currentUser$: Observable<User | null> = of(null);

  ngOnInit(): void {
    this.currentUser$ = this._AccountService.currentUser$;
  }

  // variables
  model: any = {};
  user: string | undefined = '';

  // Login
  login() {
    this._AccountService.login(this.model).subscribe({
      next: (_) => this._router.navigateByUrl('/members'),
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Logout
  logOut() {
    this._AccountService.logout();
    this._router.navigateByUrl('/');
  }
}
