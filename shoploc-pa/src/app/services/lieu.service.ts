import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lieu } from '../models/Lieu.model';
import { LieuBody } from '../models/LieuBody.model';
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
    createLieu(lieu: LieuBody): Observable<Lieu> {
        return this.http.post<Lieu>(environment.shopLocApiURL.concat("/lieu/create"), lieu, this.httpOptions);
    }

}
