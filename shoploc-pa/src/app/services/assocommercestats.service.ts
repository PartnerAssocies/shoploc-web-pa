import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssoCommercantStats } from '../models/data/AssoCommercantStats.model';

@Injectable({
  providedIn: 'root'
})
export class AssocommercestatsService {

  constructor(private http: HttpClient) { }

  getAllStats(typeDuree: string): Observable<AssoCommercantStats> {
    const params = new HttpParams().set('typeDuree', typeDuree);
    return this.http.get<AssoCommercantStats>('http://172.28.100.102:8383/assoCommercant/stats', {params})
  }

}
