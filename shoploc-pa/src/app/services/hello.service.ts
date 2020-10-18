import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HelloService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
    };

  getHelloMessage() : Observable<String> {
      return this.http.get<String>(environment.shopLocApiURL.concat('/'));
  }

}