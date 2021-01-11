import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommandeData } from '../models/data/CommandeData.model';

/**
 * Service pour gérer les commandes.
 */
@Injectable()
export class CommandeService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    /**
     * Retourne un observable contenant les commandes de l'utilisateur dont le username est passé en paramètre
     * @param username : string 
     */
    getCommandesOfUser(username : string) : Observable<CommandeData[]> {
        const url = environment.shopLocApiURL
            .concat('/commande/findAllUserCommande/')
            .concat(username);
        return this.http.get<CommandeData[]>(url);    
    }
}