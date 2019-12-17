import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    console.log(this.user.age, this.user.knownAs);
  }

}
