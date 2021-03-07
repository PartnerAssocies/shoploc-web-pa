import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercantStats } from '../models/data/CommercantStats.model';

@Injectable({
  providedIn: 'root'
})
export class CommercantStatsService {

  constructor(private http: HttpClient) { }

  getStatsDays(username: string): Observable<CommercantStats> {
    const params = new HttpParams().set('username', username);
    return this.http.get<CommercantStats>('http://172.28.100.102:8383/commercant/statsDuJour', {params})
  }

}
