import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LieuResponseBody } from '../models/html/responseBody/LieuResponseBody.model';
import { LieuRequestBody } from '../models/html/requestBody/LieuRequestBody.model';
import { environment } from 'src/environments/environment';

/**
 * Service pour gérer les actions liées à l'entité Lieu
 */
@Injectable()
export class LieuService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    /**
     * Envoi un objet LieuBody au serveur, qui va crée une entité Lieu avec un id généré automatiquement
     * @param lieu 
     * @returns l'entité Lieu créée
     */
    createLieu(lieu: LieuRequestBody): Observable<LieuResponseBody> {
        return this.http.post<LieuResponseBody>(environment.shopLocApiURL.concat("/lieu/create"), lieu, this.httpOptions);
    }

}
