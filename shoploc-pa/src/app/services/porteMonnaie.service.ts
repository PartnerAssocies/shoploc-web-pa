import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * Service pour gérer les opérations sur le porte monnaie client
 */
@Injectable()
export class PorteMonnaieService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    /**
     * Retourne le solde en euro d'un client
     */
    getSoldeClient() : any {
        const url = environment.shopLocApiURL
            .concat("");
        return this.http.get(url);    
    }

}
