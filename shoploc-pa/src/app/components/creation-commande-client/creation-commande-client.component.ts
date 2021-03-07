import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { ProduitResponseBody } from 'src/app/models/http/responseBody/ProduitResponseBody.model';
import { Location } from '@angular/common';
import { ProduitService } from 'src/app/services/produit.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';
import { PorteMonnaieService } from 'src/app/services/porteMonnaie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { isObservable } from 'rxjs';

@Component({
  selector: 'app-creation-commande-client',
  templateUrl: './creation-commande-client.component.html',
  styleUrls: ['./creation-commande-client.component.scss']
})
export class CreationCommandeClientComponent implements OnInit {

  isLoading: boolean;
  isListeProduitEmpty: boolean;
  usernameCommercant: string;
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
  isCommandeEnDirect: boolean;
  usernameClient: string;

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

      this.isCommandeEnDirect = params['commandeendirect'];
      if (this.isCommandeEnDirect) {
        this.usernameClient = params['usernameClient'];
      } else {
        this.usernameClient = this.authService.currentUserValue.username;
      }

      if (params['commande']) {
        this.commandeService.getCommande(Number(params['commande'])).subscribe(response => {
          this.commande = response;
          this.usernameCommercant = response.commercant;
          this.commandeService.getCommandeContenu(this.commande.cid).subscribe(contenu => {
            for (let produit of contenu.produits) {
              this.mapProduitQuantite.set(produit.pid, produit.nbProduitsNormaux);
              this.mapProduitQuantiteFidelite.set(produit.pid, produit.nbProduitsEnFidelite);
            }
            this.initListeProduit();
          });
          this.commandeCreated = true;
        });
      } else {
        if (this.isCommandeEnDirect) {
          this.usernameCommercant = this.authService.currentUserValue.username;
        } else {
          this.usernameCommercant = params['commercant'];
        }

        this.initListeProduit();
      }
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
    if (data.isFidelite) {
      this.addProductFidelite(data.idProduct, data.quantite);
    } else {
      this.addProductClassiq(data.idProduct, data.quantite);
    }
  }

  addProductClassiq(idProduct: number, quantite: number) {
    if (this.commande == null) {
      this.commandeService.createCommandeForUserAndCommercant(this.usernameClient, this.usernameCommercant).subscribe(commande => {
        this.commandeService.addProductToCommande(commande.cid, idProduct, quantite).subscribe(commandeSuite => {
          this.commande = commandeSuite;
          this.commandeCreated = true;
          this.mapProduitQuantite.set(idProduct, quantite);
        }, (err : HttpErrorResponse) => {
          if(err.status === 404){
            this.showModal = false;
            this.messageError = "La quantité demandé pour ce produit est supérieur à la quantité disponible en stock.";
            this.showError = true;
          }
        });
      });
    } else {
      this.commandeService.addProductToCommande(this.commande.cid, idProduct, quantite).subscribe(commande => {
        this.commande = commande;
        let nb = Number(this.mapProduitQuantiteFidelite[idProduct]);
        if (!nb) { nb = 0; }
        this.mapProduitQuantite.set(idProduct, nb + Number(quantite));
      }, (err : HttpErrorResponse) => {
        if(err.status === 404){
          this.showModal = false;
          this.messageError = "La quantité demandé pour ce produit est supérieur à la quantité disponible en stock. ";
          this.showError = true;
        }
      });
    }
  }

  addProductFidelite(idProduct: number, quantite: number) {
    if (this.commande == null) {
      this.showModal = false;
      this.messageError = "Selectionner d'abord un produit pour ajouter un produit de fidélité";
      this.showError = true;
    } else {
      this.commandeService.addFideliteProductToCommande(this.commande.cid, idProduct, quantite).subscribe(commande => {
        this.commande = commande;
        let nb = Number(this.mapProduitQuantiteFidelite[idProduct]);
        if (!nb) { nb = 0; }
        this.mapProduitQuantiteFidelite.set(idProduct, nb + Number(quantite));
      }, (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.showModal = false;
          this.messageError = "Vous n'avez plus assez de points de fidélités pour cette commande, retirez des cadeaux de fidélités";
          this.showError = true;
        }
      });
    }
  }

  etapeSuivante() {
    this.router.navigate(['commande-list']);
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
      if (this.isCommandeEnDirect) {
        this.router.navigate(['detail-commande-commercant'], { queryParams: { commande: response.cid } });
      } else {
        this.router.navigate(['commande-list']);
      }
    });
  }

  validerCommandePaiementShopLoc() {
    this.porteMonnaieService.getSoldeFidelite(this.usernameClient).subscribe(mapSolde => {
      if (this.commande.totalPointsFidelite <= mapSolde["soldeFidelite"]) {
        this.commandeService.confirmCommandeShoploc(this.commande.cid).subscribe(response => {
          this.showModal = false;
          if (this.isCommandeEnDirect) {
            this.router.navigate(['paiement-commande-client'], { queryParams: { commande: response.cid, origineCommande: 'commercant', usernameClient: this.usernameClient } });
          } else {
            this.router.navigate(['paiement-commande-client'], { queryParams: { commande: response.cid } });
          }
        }, (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.showModal = false;
            this.messageError = "Votre commande est vide ! ";
            this.showError = true;
          }
        });
      } else {
        this.showModal = false;
        this.messageError = "Vous n'avez plus assez de points de fidélités pour cette commande, retirez des cadeaux de fidélités";
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
