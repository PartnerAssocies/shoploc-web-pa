import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

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
        return this.http.post<User>('http://172.28.100.2:8080/client/register', user, this.httpOptions);
    }

}
