import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/models/CurrentUser.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role : string;
  public currentUser : CurrentUser;

  constructor(
    private router: Router,
    private authenticationService: AuthService
    ) { }

  ngOnInit(): void {
    //this.role = this.authenticationService.currentUserValue.role;
    this.role = this.authenticationService.currentUserValue.role;
  }

  /**
   * En fonction du role redirige vers le menu Click&Collect associé
   * CLIENT : 
   * COMMERCANT : 
   */
  public navigateClickAndCollect(){
    if(this.role == 'ROLE_CLIENT'){
      this.router.navigate(['commande-list']);
    } else {
      this.router.navigate(['commercant-achat-magasin']);
    }
  }

  /**
   * Redirige vers le menu de gestion des commerçant pour le profil admin
   * Uniquement pour le role ADMIN
   */
  public navigateGestionCommercant(){
    this.router.navigate(['gestionCommercant']);
  }

  /**
   * Redirige vers le menu de gestion des statistique
   * COMMERCANT : 
   * ADMIN : 
   */
  public navigateStats(){

  }

  /**
   * Redirige vers le menu de gestion VFP Client
   * Uniquement pour le role CLIENT
   */
  public navigateVFP(){

  }

  /**
   * Redirige vers la mire d'accueil
   * Pour tous les users
   */
  public navigateHome(){
    if(this.role == 'ROLE_COMMERCANT'){
      this.router.navigate(['commercant-home']);
    } else if(this.role == 'ROLE_CLIENT'){
      this.router.navigate(['commercant-list']);
    } else {
      this.router.navigate(['']);

    }
  }
  
  /**
   * Redirige vers le menu de gestion du porte monnaie
   * Uniquement pour le role CLIENT
   */
  public navigatePorteMonnaie(){
    this.router.navigate(['client-portemonnaie']);
  }

  /**
   * Redirige vers le menu de gestion des produits
   * Uniquement pour le role COMMERCANT
   */
  public navigateGestionsProduits(){
    this.router.navigate(['commercant-produit']);
  }

  /**
   * Redirige vers le menu de création de notifications
   * Uniquement pour le role ADMIN
   */
  public navigateMenuNotification(){

  }

  /**
   * Redirige vers le profile
   * Pour tous les users
   */
  public navigateMenuProfile(){
    this.router.navigate(['profil']);
  }
}
