import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssoCommercantStats } from '../models/data/AssoCommercantStats.model';

@Injectable({
  providedIn: 'root'
})
export class AssocommercestatsService {

  constructor(private http: HttpClient) { }

  getAllStats(typeDuree: string): Observable<AssoCommercantStats> {
    const params = new HttpParams().set('typeDuree', typeDuree);
    return this.http.get<AssoCommercantStats>(`${environment.shopdataURL}/assoCommercant/stats`, {params})
  }

}
