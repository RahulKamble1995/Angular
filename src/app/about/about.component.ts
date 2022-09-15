import { Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { leadertype, LEADERS } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  leader : leadertype[] = LEADERS;

  constructor(private leaderService : LeaderService, @Inject('baseURL') private baseURL: any) { }

  BaseURL : any = this.baseURL;
  
  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(
      leader => this.leader = leader
    );
    console.log(this.leader);
  }

}
