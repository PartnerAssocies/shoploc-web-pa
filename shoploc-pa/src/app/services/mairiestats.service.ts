import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MairieStats } from '../models/data/MairieStats.model';

@Injectable({
  providedIn: 'root'
})
export class MairiestatsService {

  constructor(private http: HttpClient) { }

  getStatsDays(typeDuree: string): Observable<MairieStats> {
    const params = new HttpParams().set('typeDuree', typeDuree);
    return this.http.get<MairieStats>('http://172.28.100.102:8383/mairie/stats', {params})
  }

}
