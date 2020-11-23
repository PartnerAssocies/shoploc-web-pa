import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/CurrentUser.model';
import { Injectable } from '@angular/core';
import { HashService } from './hash.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

/**
 * Service pour gérer les actions liées à l'authentification
 */
@Injectable({
	providedIn: 'root'
})
export class AuthService {

    httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

    private currentUserSubject: BehaviorSubject<CurrentUser>;
	public currentUser: Observable<CurrentUser>;

    constructor(private http: HttpClient, private hashService: HashService) {
        this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * Retourne l'utilisateur actuellement connecté
     */
    public get currentUserValue(): CurrentUser {
        return this.currentUserSubject.value;
    }

    /**
     * Tente de connecter l'utilisateur représenté par le coupe username/passwrod passé en paramètre
     * @param String username 
     * @param String passwordNotHashed 
     */
    public login(username: string, passwordNotHashed: string){
        const password = this.hashService.hashPassword(passwordNotHashed);
        const url = environment.shopLocApiURL
                    .concat("/auth/login?username=")
                    .concat(username)
                    .concat("&password=")
                    .concat(password);
        return this.http.post<CurrentUser>(url,null,this.httpOptions)
            .pipe(map(user => {
                if(user && user.accessToken && user.refreshToken && user.role){
                    localStorage.setItem("currentUser",JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    /**
     * Refresh le token de l'utilisateur connecté
     */
    public refresh(){
        const url = environment
            .shopLocApiURL
            .concat("/refresh/")
            .concat(this.currentUserValue.refreshToken);
		return this.http.post<string>(url,this.httpOptions);
    }

    /**
     * Déconnecte l'utilisatgeur
     */
    public logout(){

    }
}