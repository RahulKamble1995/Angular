import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  Leader : Leader = new Leader();

  getLeaders() : Promise<leadertype[]>{
    return Promise.resolve(this.Leader.LEADERS);
  }

  getLeader(id: string): Promise<leadertype> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<leadertype> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
