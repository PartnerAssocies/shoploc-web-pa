import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { ProduitResponseBody } from 'src/app/models/http/responseBody/ProduitResponseBody.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';
import { PorteMonnaieService } from 'src/app/services/porteMonnaie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-creation-commande-commercant',
  templateUrl: './creation-commande-commercant.component.html',
  styleUrls: ['./creation-commande-commercant.component.scss']
})
export class CreationCommandeCommercantComponent implements OnInit {

  isLoading: boolean;
  isListeProduitEmpty: boolean;
  usernameCommercant: string;
  usernameClient: string;
  libelleCommercant: string;
  commande: CommandeResponseBody;
  commandeCreated: boolean;
  showModal: boolean;
  showError: boolean;
  produits: ProduitResponseBody[];
  produitsFidelite: ProduitResponseBody[];
  mapProduitQuantite: Map<number, number>;
  mapProduitQuantiteFidelite: Map<number, number>;
  ongletProduit: boolean;
  ongletFidelite: boolean;
  messageError: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private produitService: ProduitService,
    private _location: Location,
    private authService: AuthService,
    private commandeService: CommandeService,
    private router: Router,
    private porteMonnaieService: PorteMonnaieService
  ) { }

  ngOnInit(): void {
    this.messageError = "";
    this.commandeCreated = false;
    this.isLoading = true;
    this.ongletProduit = true;
    this.ongletFidelite = false;
    this.showError = false;
    this.mapProduitQuantite = new Map();
    this.mapProduitQuantiteFidelite = new Map();
    this.activateRoute.queryParams.subscribe(params => {
      this.usernameClient = params['client'];
      this.usernameCommercant = this.authService.currentUserValue.username;
      this.initListeProduit();
    });
    this.commande = null;
    this.showModal = false;
  }

  initListeProduit(): void {
    this.produits = [];
    this.produitsFidelite = [];
    this.produitService.getListProduits(this.usernameCommercant).subscribe(response => {

      for (let produit of response) {
        if (produit.fidelitePointsRequis > 0) {
          this.produitsFidelite.push(produit);
        }
        if (produit.prix > 0) {
          this.produits.push(produit);
        }
      }
      this.isListeProduitEmpty = this.produits.length == 0;
      if (!this.isListeProduitEmpty) {
        this.libelleCommercant = this.produits[0].cid.libelleMagasin;
      }
      this.isLoading = false;
    });
  }

  getQuantiteProduit(pid: number): number {
    if (this.mapProduitQuantite.has(pid)) {
      return this.mapProduitQuantite.get(pid);
    } else {
      return 0;
    }
  }

  getQuantiteProduitFidelite(pid: number): number {
    if (this.mapProduitQuantiteFidelite.has(pid)) {
      return this.mapProduitQuantiteFidelite.get(pid);
    } else {
      return 0;
    }
  }

  addProductToCommande(data) {
    if (this.commande == null) {
      if (data.isFidelite) {
        this.showModal = false;
        this.messageError = "Selectionner d'abord un produit pour ajouter un produit de fidélité";
        this.showError = true;
        return;
      }
      this.commandeService.createCommandeForUserAndCommercant(this.usernameClient, this.usernameCommercant).subscribe(commande => {
        this.commandeService.addProductToCommande(commande.cid, data.idProduct, data.quantite).subscribe(commandeSuite => {
          this.commande = commandeSuite;
          this.commandeCreated = true;
        });
      });
    } else {
      if (data.isFidelite) {
        this.commandeService.addFideliteProductToCommande(this.commande.cid, data.idProduct, data.quantite).subscribe(commande => {
          this.commande = commande;
        }, (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.showModal = false;
            this.messageError = "Le client n'a pas assez de points de fidélités pour cette commande, retirez des cadeaux de fidélités";
            this.showError = true;
          }
        });
      } else {
        this.commandeService.addProductToCommande(this.commande.cid, data.idProduct, data.quantite).subscribe(commande => {
          this.commande = commande;
        });
      }
    }
  }

  back() {
    this._location.back();
  }

  openModal() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  hideError() {
    this.showError = false;
  }

  validerCommandePaiementEnDirect() {
    this.commandeService.confirmCommandeDirect(this.commande.cid).subscribe(response => {
      this.showModal = false;
      this.router.navigate(['detail-commande-commercant'], { queryParams: { commande: response.cid } });
    })
  }

  validerCommandePaiementShopLoc() {
    this.porteMonnaieService.getSoldeFidelite(this.usernameClient).subscribe(mapSolde => {
      if (this.commande.totalPointsFidelite <= mapSolde["soldeFidelite"]) {
        this.commandeService.confirmCommandeShoploc(this.commande.cid).subscribe(response => {
          this.showModal = false;
          this.router.navigate(['paiement-commande-client'], { queryParams: { commande: response.cid, origineCommande : 'commercant', usernameClient: this.usernameClient } });
        }, (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.showModal = false;
            this.messageError = "La commande est vide ! ";
            this.showError = true;
          }
        });
      } else {
        this.showModal = false;
        this.messageError = "Le client n'a pas assez de points de fidélités pour cette commande, retirez des cadeaux de fidélités";
        this.showError = true;
      }
    })
  }

  activeOngletProduit() {
    this.ongletProduit = true;
    this.ongletFidelite = false;
  }

  activeOngletFidelite() {
    this.ongletFidelite = true;
    this.ongletProduit = false;
  }

}
