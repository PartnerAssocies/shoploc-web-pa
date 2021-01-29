import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeData } from 'src/app/models/data/CommandeData.model';
import { CommandeService } from 'src/app/services/commande.service';
import { ContenuCommandeResponseBody } from 'src/app/models/html/responseBody/ContenuCommandeResponseBody.model';
import { PorteMonnaieService } from 'src/app/services/porteMonnaie.service';

@Component({
  selector: 'app-ecran-paiement-commande',
  templateUrl: './ecran-paiement-commande.component.html',
  styleUrls: ['./ecran-paiement-commande.component.scss']
})
export class EcranPaiementCommandeComponent implements OnInit {

  commande : CommandeData;
  showModal : boolean;
  contenuCommande : ContenuCommandeResponseBody;
  contenuReady : boolean;
  prixTotalCommande : number;
  soldeClient : number;
  assezDargent : boolean;
  isReady : boolean;

  constructor(
    private _location : Location,
    private activateRoute: ActivatedRoute,
    private commandeService : CommandeService,
    private porteMonnaieService : PorteMonnaieService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.isReady = false;
    this.commande = history.state.commande;
    this.showModal = false;
    this.contenuReady = false;
    this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
      console.log(response);
      this.contenuCommande = response;
      this.prixTotalCommande = 100;
      for(let produit in this.contenuCommande.produits){
        this.prixTotalCommande = this.prixTotalCommande + 0;
      }
      /*this.porteMonnaieService.getSoldeClient().subscribe(response => {
        this.soldeClient = 0;
        this.assezDargent = this.soldeClient >= this.prixTotalCommande;
        this.contenuReady = true;
        this.isReady = true;
      });*/
      this.soldeClient = 0;
      this.assezDargent = this.soldeClient >= this.prixTotalCommande;
      this.contenuReady = true;
      this.isReady = true;
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
    this.router.navigate(['']);
  }
}
