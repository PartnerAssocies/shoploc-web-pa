import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';

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
     * Enregistre un nouvel utilisateur en base de données
     * @param user 
     */
    registerUser(user: User): Observable<User> {
        return this.http.post<User>(environment.shopLocApiURL.concat("/client/register"), user, this.httpOptions);
    }

}
