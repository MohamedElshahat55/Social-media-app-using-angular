import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  registerMode: Boolean = false;
  users: any;

  constructor() {}

  ngOnInit(): void {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  // this fn responsable to recive the data from child (Register)
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
