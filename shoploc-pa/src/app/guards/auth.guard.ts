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

        if(currentUser){
            if(state.url == ''){
                if(currentUser.role == 'ROLE_COMMERCANT'){
                    this.router.navigate(['commercant-home']);
                }
            } 
            if((currentUser.role == expectedRole) || ("NONE" == expectedRole) || ("ROLE_BOTH" == expectedRole)){
                return true;
            }
            this.router.navigate(['/'],{ queryParams: { returnUrl: state.url }});
        }else{
            if("NOT_LOGGED" == expectedRole){
                return true;
            }else{
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
            }
        }
        return false;
    }
}