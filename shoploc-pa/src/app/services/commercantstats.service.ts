import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommercantAllStats } from '../models/data/CommercantAllStats.model';
import { CommercantCharts } from '../models/data/CommercantCharts.model';
import { CommercantStats } from '../models/data/CommercantStats.model';

@Injectable({
  providedIn: 'root'
})
export class CommercantStatsService {

  constructor(private http: HttpClient) { }

  getStatsDays(username: string): Observable<CommercantStats> {
    const params = new HttpParams().set('username', username);
    return this.http.get<CommercantStats>(`${environment.shopdataURL}/commercant/statsDuJour`, {params})
  }

  getAllStats(username: string, typeDuree: string): Observable<CommercantAllStats>{
    var params = new HttpParams().set('username', username).append('typeDuree', typeDuree);
    return this.http.get<CommercantAllStats>(`${environment.shopdataURL}/commercant/stats`, {params})
  }

  getCharts(username: string, typeDuree: string): Observable<CommercantCharts> {
    var params = new HttpParams().set('username', username).append('typeDuree', typeDuree);    
    return this.http.get<CommercantCharts>(`${environment.shopdataURL}/commercant/chartsData`, {params})
  }

}
