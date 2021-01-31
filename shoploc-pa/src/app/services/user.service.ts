import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { CommercantRequestBody } from '../models/http/requestBody/CommercantRequestBody.model';
import { CommercantResponseBody } from '../models/http/responseBody/CommercantResponseBody.model';
import { CommercantData } from '../models/data/CommercantData.model';

/**
 * Service qui gère les actions liées aux User
 */
@Injectable()
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){ }

    /**
     * Enregistre un nouveau Client en base de données
     * @param user 
     */
    registerClient(user: User): Observable<User> {
        return this.http.post<User>(environment.shopLocApiURL.concat("/client/register"), user, this.httpOptions);
    }

    /**
     * Enregistre un nouveau Commerçant en base de données
     * @param user l'utilisateur à enregistrer
     */
    registerCommercant(user : CommercantRequestBody): Observable<CommercantResponseBody>{
        const url = environment.shopLocApiURL
            .concat("/commercant/register");
        return this.http.post<CommercantResponseBody>(url,user,this.httpOptions);
    }

    /**
     * Récupère tous les commerçant "En_ATTENTE"
     * C'est à dire tous les commerçants dont l'inscription n'a pas encore été validé
     */
    getCommercantEnAttente() : Observable<CommercantData[]>{
        const url = environment.shopLocApiURL
            .concat("/commercant/listAllInValidation");
            return this.http.get<CommercantData[]>(url);
    }

    /**
     * Valid l'inscription d'un commercant
     * @param username : string, le username du commercant
     */
    acceptCommercant(username : string) : Observable<CommercantData>{
        return this.sendConfirmationCommercant(username,'true');
    }

    /**
     * Refuse l'inscription d'un commercant
     * @param username  : string, le username du commercant
     */
    refuseCommercant(username : string) : Observable<CommercantData>{
       return this.sendConfirmationCommercant(username,'false');
    }

    /**
     * Envoie la requête de confirmation ou le refu d'un commerçant
     * @param username : string, le username du commercant
     * @param accept : true si il est accepté sinon false
     */
    private sendConfirmationCommercant(username : string, accept : string) : Observable<CommercantData> {
        const url = environment.shopLocApiURL
            .concat("/commercant/authorizeCommercant/")
            .concat(username);
        let params = new HttpParams().append('accept',accept);
        console.log(accept);
        return this.http.post<CommercantData>(url,params);
    }
    /*
     * Récupère la liste de tous les commerçants
     */
    getListCommercant(): Observable<CommercantData[]>{
        const url = environment.shopLocApiURL
            .concat("/commercant/listall");
        return this.http.get<CommercantData[]>(url);
    }

}
