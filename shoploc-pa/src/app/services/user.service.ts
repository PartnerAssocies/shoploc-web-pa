import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';
import { CommercantRequestBody } from '../models/CommercantRequestBody.model';

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
    registerCommercant(user : CommercantRequestBody): Observable<CommercantRequestBody>{
        const url = environment.shopLocApiURL
            .concat("/commercant/register");
        return this.http.post<CommercantRequestBody>(url,user,this.httpOptions);
    }

}
