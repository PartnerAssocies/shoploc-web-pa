import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role : string;

  constructor(
    private router: Router,
    private authenticationService: AuthService
    ) { }

  ngOnInit(): void {
    //this.role = this.authenticationService.currentUserValue.role;
    this.role = "CLIENT";
  }

  /**
   * En fonction du role redirige vers le menu Click&Collect associé
   * CLIENT : 
   * COMMERCANT : 
   */
  public navigateClickAndCollect(){

  }

  /**
   * Redirige vers le menu de gestion des commerçant pour le profil admin
   * Uniquement pour le role ADMIN
   */
  public navigateGestionCommercant(){

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
    
  }
  
  /**
   * Redirige vers le menu de gestion du porte monnaie
   * Uniquement pour le role CLIENT
   */
  public navigatePorteMonnaie(){

  }

  /**
   * Redirige vers le menu de gestion des produits
   * Uniquement pour le role COMMERCANT
   */
  public navigateGestionsProduits(){

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

  }
}
