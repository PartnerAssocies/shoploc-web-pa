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

  commande: CommandeResponseBody;
  showModal: boolean;
  contenuCommande: ContenuCommandeResponseBody;
  contenuReady: boolean;
  prixTotalCommande: number;
  prixTotalFidelite: number;
  soldeClient: number;
  soldeFidelite: number;
  assezDargent: boolean;
  assezDePointsFidelite: boolean;
  isReady: boolean;
  origineCommande: string;
  usernameClient: string;

  constructor(
    private _location: Location,
    private activateRoute: ActivatedRoute,
    private commandeService: CommandeService,
    private porteMonnaieService: PorteMonnaieService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.assezDePointsFidelite = false;
    this.isReady = false;
    this.activateRoute.queryParams.subscribe(params => {
      this.origineCommande = params['origineCommande'];
      if ("commercant" == this.origineCommande) {
        this.usernameClient = params['usernameClient'];
      } else {
        this.origineCommande = "client";
        this.usernameClient = this.authService.currentUserValue.username;
      }
      this.commandeService.getCommande(Number(params['commande'])).subscribe(commande => {
        this.commande = commande;
        this.showModal = false;
        this.contenuReady = false;
        this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
          this.contenuCommande = response;
          this.prixTotalCommande = this.commande.total;
          this.prixTotalFidelite = this.commande.totalPointsFidelite;
          this.porteMonnaieService.getSoldeClient(this.usernameClient).subscribe(mapSolde => {
            this.soldeClient = +parseFloat(mapSolde["solde"]).toFixed(2);
            this.assezDargent = mapSolde["solde"] >= this.prixTotalCommande;
            this.porteMonnaieService.getSoldeFidelite(this.usernameClient).subscribe(mapSoldeFidelite => {
              this.soldeFidelite = +parseFloat(mapSoldeFidelite["soldeFidelite"]).toFixed(2);
              this.assezDePointsFidelite = mapSoldeFidelite["soldeFidelite"] >= this.prixTotalFidelite;
              this.contenuReady = true;
              this.isReady = true;
            });
          });
        });
      });
    });
  }

  back() {
    this._location.back();
  }

  hide() {
    this.showModal = false;
  }

  afficheDetail() {
    this.showModal = true;
  }

  navigateToRechargementPorteMonnaie() {
    this.router.navigate(['client-portemonnaie']);
  }

  payerCommande() {
    if ("commercant" == this.origineCommande) {
      this.payerCommandeEnDirect();
    } else {
      this.payerCommandeClickAndCollect();
    }
  }

  payerCommandeClickAndCollect() {
    this.commandeService.payerCommande(this.usernameClient, this.commande.cid).subscribe(response => {
      this.router.navigate(['commande-list']);
    });
  }

  payerCommandeEnDirect() {
    this.commandeService.payerCommande(this.usernameClient, this.commande.cid).subscribe(response => {
      this.commandeService.passerCommandeAARecuperee(response.cid).subscribe(commandeARecuperer => {
        this.router.navigate(['detail-commande-commercant'], { queryParams: { commande: commandeARecuperer.cid } });
      });
    });
  }

  modifierCommande() {
    this.commandeService.passerCommandeAPanier(this.commande.cid).subscribe(response => {
      this.commande = response;
      this.router.navigate(['creation-commande-client'], { queryParams: { commercant: this.commande.commercant, commande: this.commande.cid } });
    })
  }
}
