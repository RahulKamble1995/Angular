import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  Leader : Leader = new Leader();

  getLeaders() : Promise<leadertype[]>{
    return new Promise(resolve => {
      setTimeout(() => resolve(this.Leader.LEADERS), 2000)
    });
  }

  getLeader(id: string): Promise<leadertype> {
    return new Promise(resolve => {
      setTimeout(() =>resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000)
    });
  }

  getFeaturedLeader(): Promise<leadertype> {
    return new Promise(resolve =>{
      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000)
    });
  }
}
