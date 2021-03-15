import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommercantAllStats } from '../models/data/CommercantAllStats.model';
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

  getAllStats(username: string, typeDuree: string): Observable<CommercantAllStats>{
    var params = new HttpParams().set('username', username).append('typeDuree', typeDuree);
    return this.http.get<CommercantAllStats>('http://172.28.100.102:8383/commercant/stats', {params})

  }

}
