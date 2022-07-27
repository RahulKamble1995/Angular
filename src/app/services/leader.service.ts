import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  Leader : Leader = new Leader();

  getLeaders() : leadertype[]{
    return this.Leader.LEADERS;
  }

  getLeader(id: string):leadertype {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeader():leadertype {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
}
