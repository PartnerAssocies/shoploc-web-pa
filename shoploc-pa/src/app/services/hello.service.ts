import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HelloService {
    
  constructor(private http: HttpClient) { }

  getHelloMessage(){

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : '*'
    });

    return this.http.get(environment.shopLocApiURL.concat('/'),{headers, responseType: 'text'});
  }

}