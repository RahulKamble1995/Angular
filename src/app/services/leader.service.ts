import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  Leader : Leader = new Leader();

  getLeaders() : Observable<leadertype[]>{
    return of(this.Leader.LEADERS).pipe(delay(2000));

  }

  getLeader(id: string): Observable<leadertype> {
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));

  }

  getFeaturedLeader(): Observable<leadertype> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
