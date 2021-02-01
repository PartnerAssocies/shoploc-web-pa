import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-commercant-home',
  templateUrl: './commercant-home.component.html',
  styleUrls: ['./commercant-home.component.scss']
})
export class CommercantHomeComponent implements OnInit {

  listeCommandeEnPrepa : CommandeResponseBody[];
  listeCommandeWaitPaiement : CommandeResponseBody[];
  listeCommandeARecuperer : CommandeResponseBody[];

  isLoadingPrepa : boolean;
  isLoadingPaiement : boolean;
  isLoadingRecup : boolean;

  prepaActive : boolean;
  waitActive : boolean;
  takeActive : boolean;
  
  username : string;

  constructor(private _location : Location,
              private authService : AuthService,
              private commandeService : CommandeService,
              private router : Router) { }

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;

    this.isLoadingPrepa = true;
    this.isLoadingPaiement = true;
    this.isLoadingRecup = true;

    this.prepaActive = true;
    this.waitActive = false;
    this.takeActive = false;

    this.getEnPreparation();
    this.getWaitPaiement();
    this.getARecuperer();
    
  }

  back(){
    this._location.back();
  }

  getEnPreparation() {
    this.listeCommandeEnPrepa = [];
    this.commandeService.getCommandeByEtatAndCommercant(this.username, 'EN_PREPARATION').subscribe(res => {
      for(let commande of res){
        this.listeCommandeEnPrepa.push(commande);
      }
      this.isLoadingPrepa = false;
      this.prepaActive = true;
      this.waitActive = false;
      this.takeActive = false;
    });
  }

  getWaitPaiement() {
    this.listeCommandeWaitPaiement = [];
    this.commandeService.getCommandeByEtatAndCommercant(this.username, 'EN_ATTENTE_DE_PAIEMENT').subscribe(res => {
      for(let commande of res){
        this.listeCommandeWaitPaiement.push(commande);
      }
      this.isLoadingPaiement = false;
      this.waitActive = true;
      this.prepaActive = false;
      this.takeActive = false;
    });
  }

  getARecuperer() {
    const username = this.authService.currentUserValue.username;
    this.listeCommandeARecuperer = [];
    this.commandeService.getCommandeByEtatAndCommercant(this.username, 'A_RECUPERER').subscribe(res => {
      for(let commande of res){
        this.listeCommandeARecuperer.push(commande);
      }
      this.isLoadingRecup = false;
      this.takeActive = true;
      this.prepaActive = false;
      this.waitActive = false;
    });
  }

  getDetailCommande(commande : CommandeResponseBody){
    this.router.navigate(['detail-commande-commercant'],{queryParams: { commande : commande.cid }});
  }

}
