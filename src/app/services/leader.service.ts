import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient) { }

  Leader : Leader = new Leader();

  getLeaders() : Observable<leadertype[]>{
    return this.http.get<leadertype[]>(baseURL + 'leadership'); //of(this.Leader.LEADERS).pipe(delay(2000));

  }

  getLeader(id: string): Observable<leadertype> {
    return this.http.get<leadertype>(baseURL + 'leadership/' +id);//of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));

  }

  getFeaturedLeader(): Observable<leadertype> {
    return this.http.get<leadertype[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0]));//of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}
