import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HelloService {

    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) { }

  getHelloMessage(){
    return this.http.get(environment.shopLocApiURL.concat('/'), {responseType: 'text'});
  }

}