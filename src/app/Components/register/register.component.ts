import { ToastrService } from 'ngx-toastr';
import { User } from './../../_models/User';
import { AccountService } from './../../_Services/account.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Input() userFromHomeComponent: any; // parent to child
  @Output() cancelRegister = new EventEmitter(); // child to parent

  constructor(
    private _AccountService: AccountService,
    private _toaster: ToastrService
  ) {}

  model: any = {};

  register() {
    this._AccountService.register(this.model).subscribe({
      next: () => this.cancel(),
      error: (err) => this._toaster.error(err.error.title),
    });
  }

  cancel() {
    this.cancelRegister.emit(false); // inside the emait the data you want to send it to parent (Home)
  }
}
