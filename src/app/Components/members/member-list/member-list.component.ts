import { Member } from '../../../_models/member';
import { MemberService } from './../../../_Services/member.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  constructor(private _memberService: MemberService) {}

  //? Variables
  members: Member[] = [];

  ngOnInit(): void {
    this.loagAllMembers();
  }

  loagAllMembers() {
    this._memberService.getAllMember().subscribe({
      next: (response) => {
        this.members = response;
        console.log(response);
      },
      error: (err) => console.log(err),
    });
  }
}
