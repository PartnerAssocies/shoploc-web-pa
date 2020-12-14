import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Guard qui permet de rediriger vers la mire de connexion si on a pas de user connecté
 * Le Guard permet aussi gérer les accès par rapport aux rôles
 */
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
		private router: Router,
		private authenticationService: AuthService
    ) { }
    

    /**
     * Méthode appeleé pour gérer la redirection
     * @param ActivatedRouteSnapshot route 
     * @param RouterStateSnapshot state 
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const expectedRole = route.data.expectedRole;

        console.log(state.url);

        if((currentUser && currentUser.role == expectedRole) || (currentUser && "NONE" == expectedRole) || (currentUser && "ROLE_BOTH" == expectedRole)){
            return true;
        }
        if(!currentUser){
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        }
        return false;
    }
}