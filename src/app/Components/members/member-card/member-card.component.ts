import { Component, Input } from '@angular/core';
import { Member } from '../../../_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}
