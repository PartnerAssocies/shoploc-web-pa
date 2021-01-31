import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


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
    getSoldeClient(username : string) : Observable<Map<string,number>> {
        const url = environment.shopLocApiURL
            .concat("/client/")
            .concat(username)
            .concat("/solde");
        return this.http.get<Map<string,number>>(url);    
    }

    changeMoney(username: string, money: number) : Observable<ClientData>{
        const url = environment.shopLocApiURL
            .concat("/client/")
            .concat(username)
            .concat("/changeMoney/")
            .concat(money+"");
        return this.http.post<ClientData>(url, null);
    }

}
