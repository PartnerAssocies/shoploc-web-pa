import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { ContenuCommandeResponseBody } from 'src/app/models/http/responseBody/ContenuCommandeResponseBody.model';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { PorteMonnaieService } from 'src/app/services/porteMonnaie.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-ecran-paiement-commande',
  templateUrl: './ecran-paiement-commande.component.html',
  styleUrls: ['./ecran-paiement-commande.component.scss']
})
export class EcranPaiementCommandeComponent implements OnInit {

  commande : CommandeResponseBody;
  showModal : boolean;
  contenuCommande : ContenuCommandeResponseBody;
  contenuReady : boolean;
  prixTotalCommande : number;
  prixTotalFidelite : number;
  soldeClient : number;
  soldeFidelite : number;
  assezDargent : boolean;
  isReady : boolean;

  constructor(
    private _location : Location,
    private activateRoute: ActivatedRoute,
    private commandeService : CommandeService,
    private porteMonnaieService : PorteMonnaieService,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.isReady = false;
    this.activateRoute.queryParams.subscribe(params => {
      this.commandeService.getCommande(Number(params['commande'])).subscribe(commande => {
        this.commande = commande;
        this.showModal = false;
        this.contenuReady = false;
        this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
          this.contenuCommande = response;
          this.prixTotalCommande = this.commande.total;
          this.prixTotalFidelite = this.commande.totalPointsFidelite;
          let username = this.authService.currentUserValue.username;
          this.porteMonnaieService.getSoldeClient(username).subscribe(mapSolde => {
            this.soldeClient = mapSolde["solde"];
            this.assezDargent = this.soldeClient >= this.prixTotalCommande;
            this.porteMonnaieService.getSoldeFidelite(username).subscribe(mapSoldeFidelite => {
              this.soldeFidelite = mapSoldeFidelite["soldeFidelite"];
              this.contenuReady = true;
              this.isReady = true;
            });
          });
        });
      });
    });
  }

  back(){
    this._location.back();
  }

  hide(){
    this.showModal = false;
  }

  afficheDetail(){
    this.showModal = true;
  }

  navigateToRechargementPorteMonnaie(){
    this.router.navigate(['client-portemonnaie']);
  }

  payerCommande(){
    let username = this.authService.currentUserValue.username;
    this.commandeService.payerCommande(username,this.commande.cid).subscribe(response => {
      this.router.navigate(['commande-list']);
    });
  }
}
