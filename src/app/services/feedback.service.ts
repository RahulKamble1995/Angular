import { Injectable } from '@angular/core';
import { Feedback, ContactType } from '../shared/feedback';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback : Feedback): Observable<Feedback>{
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-type':'application/json'
      })       
    };
    return this.http.post<Feedback>(baseURL+'feedback', feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
