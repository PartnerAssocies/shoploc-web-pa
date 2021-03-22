import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartsItem } from '../models/data/ChartsItem.model';
import { ClientStats } from '../models/data/ClientStats.model';

@Injectable({
  providedIn: 'root'
})
export class ClientstatsService {

  constructor(private http: HttpClient) { }

  getAllStats(username: string): Observable<ClientStats> {
    const params = new HttpParams().set('username', username);
    return this.http.get<ClientStats>(`${environment.shopdataURL}/client/getAllFidelite`, {params});
  }

  getDataGrid(username: string, typeDuree: string): Observable<ChartsItem> {
    var params = new HttpParams().set('username', username).append('typeDuree', typeDuree);
    return this.http.get<ChartsItem>(`${environment.shopdataURL}/client/histoDuree`, {params});
  }

}
