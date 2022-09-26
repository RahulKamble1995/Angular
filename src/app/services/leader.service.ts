import { Injectable } from '@angular/core';
import { Leader, leadertype, LEADERS } from '../shared/leader'
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  Leader : Leader = new Leader();

  getLeaders() : Observable<leadertype[]>{
    return this.http.get<leadertype[]>(baseURL + 'leadership').pipe(catchError(this.processHTTPMsgService.handleError)); 

  }

  getLeader(id: string): Observable<leadertype> {
    return this.http.get<leadertype>(baseURL + 'leadership/' +id).pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getFeaturedLeader(): Observable<leadertype> {
    return this.http.get<leadertype[]>(baseURL + 'leadership?featured=true').pipe(map(leader => leader[0])).pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
