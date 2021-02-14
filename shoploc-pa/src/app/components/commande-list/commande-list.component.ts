import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {

  isLoading : boolean;
  listeCommande : CommandeResponseBody[];
  isEmpty : boolean;
  active : boolean;

  constructor(
    private _location : Location,
    private router: Router,
    private userService : CommandeService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.active = false;
    this.isLoading = false;
    this.initListCommande();
  }

  initListCommande() {
    const username = this.authService.currentUserValue.username;
    this.listeCommande = [];
    this.userService.getCommandesOfUser(username).subscribe(response => {
      for(let commande of response){
        this.listeCommande.push(commande);
      }
      this.isEmpty = this.listeCommande.length == 0;
      this.isLoading = false;
    });
  }

  back(){
    this._location.back();
  }

  nouvelleCommande(){
    this.active = true;
    this.router.navigate(['commercant-list']);
  }

  goToCommande(commande : CommandeResponseBody){
    if(commande.etat == 'PANNIER'){
      this.router.navigate(['creation-commande-client'],{queryParams: { commercant: commande.commercant, commande : commande.cid }});
    }
    if(commande.etat == 'EN_ATTENTE_DE_PAIEMENT'){
      this.router.navigate(['paiement-commande-client'],{queryParams: { commande : commande.cid }});
    }
    if(commande.etat == 'EN_PREPARATION' || commande.etat == 'A_RECUPERER'){
      this.router.navigate(['qrcode-commande'],{queryParams: { commande : commande.cid }});
    }
  }
  
}
