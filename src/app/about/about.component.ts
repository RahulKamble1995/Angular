import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { leadertype, LEADERS } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leader : leadertype[] = LEADERS;

  constructor(private leaderService : LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders()
    .subscribe(
      leader => this.leader = leader
    );
    console.log(this.leader);
  }

}
