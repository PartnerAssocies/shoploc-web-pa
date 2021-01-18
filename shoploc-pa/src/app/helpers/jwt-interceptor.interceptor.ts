
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/operators';
import { filter } from 'rxjs/internal/operators/filter';

/**
 * Interceptor qui va gérer les requêtes HTTP.
 * Pour chaque requêtes sortantes on vas rajouter le token de sécurité à la requête.
 * Celà permet de ne pas avoir à le gérer à chaque création de requête vers l'API. 
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any>;
    private authorizedPath: string[];

    constructor(private authService: AuthService) { 
        this.authorizedPath = [
            "/login",
            "/register",
            "/refresh"
        ];
        this.refreshTokenSubject = new BehaviorSubject<any>(null);
    }

    /**
     * Vérifie si une requête à besoin de l'authentification à partir de son url.
     * @param String url 
     */
    private needAuthentication(url : string) : boolean{
        const suburl = url.substring(url.indexOf('/'),url.lastIndexOf("/"));
        console.log(suburl);
        var i;
        for(i = 0; i < this.authorizedPath.length; i++){
            if(suburl.includes(this.authorizedPath[i])){
                return false;
            }
        } 
        return true;
    }

    /**
     * Ajoute le token à la requête passé en paramètre
     * @param HttpRequest<any> request 
     * @param String token 
     */    
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
			setHeaders: {
				'Authorization': `Bearer ${token}`
			}
		});
    }
    
    /**
     * Gère les erreurs 403
     * @param request 
     * @param next 
     */
    private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
        console.log('refreshing : ' + this.isRefreshing);
        if (!this.isRefreshing) {
            console.log('refreshing : on passe là ? ');
            this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

            return this.authService.refresh().pipe(
				switchMap((token : string) => {
                    console.log('refreshing : on passe ici ? ');
                    this.authService.currentUserValue.accessToken=token
					localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue));
					this.isRefreshing = false;
					this.refreshTokenSubject.next(token);
					return next.handle(this.addToken(request, token));
				}));

		} else {
			return this.refreshTokenSubject.pipe(
				filter(jwt => jwt != null),
				take(1),
				switchMap(jwt => {
					return next.handle(this.addToken(request, jwt));
                }));
		}
    }

    /**
     * Méthode qui permet d'intercepter les requêtes Http et de lé gérer
     * @param HttpRequest<any> request 
     * @param HttpHandler next 
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request.url);
        if(!this.needAuthentication(request.url)){
            return next.handle(request);
        }

        const currentUser = this.authService.currentUserValue;
        if(currentUser && currentUser.accessToken){
            request = this.addToken(request, currentUser.accessToken);
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
                return this.handle403Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }
}