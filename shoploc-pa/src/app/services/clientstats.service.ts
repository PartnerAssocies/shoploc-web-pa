import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientStats } from '../models/data/ClientStats.model';

@Injectable({
  providedIn: 'root'
})
export class ClientstatsService {

  constructor(private http: HttpClient) { }

  getAllStats(username: string): Observable<ClientStats> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ClientStats>('http://172.28.100.102:8383/client/getAllFidelite', {params})
  }

}
