import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { ProduitResponseBody } from 'src/app/models/http/responseBody/ProduitResponseBody.model';
import { Location } from '@angular/common';
import { ProduitService } from 'src/app/services/produit.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeService } from 'src/app/services/commande.service';



@Component({
  selector: 'app-creation-commande-client',
  templateUrl: './creation-commande-client.component.html',
  styleUrls: ['./creation-commande-client.component.scss']
})
export class CreationCommandeClientComponent implements OnInit {

  isLoading : boolean;
  isListeProduitEmpty : boolean;
  usernameCommercant : string;
  produits : ProduitResponseBody[];
  libelleCommercant : string;
  commande : CommandeResponseBody;
  commandeCreated : boolean;
  showModal : boolean;
  mapProduitQuantite : Map<number,number>;

  constructor(
    private activateRoute: ActivatedRoute,
    private produitService : ProduitService,
    private _location: Location,
    private authService : AuthService,
    private commandeService : CommandeService,
    private router: Router,
    
    ) { }

  ngOnInit(): void {
    this.commandeCreated = false;
    this.isLoading = true;
    this.mapProduitQuantite = new Map();
    this.activateRoute.queryParams.subscribe(params => {
      if(params['commande']){
        this.commandeService.getCommande(Number(params['commande'])).subscribe(response => {
          this.commande = response;
          this.usernameCommercant = response.commercant;
          this.commandeService.getCommandeContenu(this.commande.cid).subscribe(contenu => {
            for(let produit of contenu.produits){
              this.mapProduitQuantite.set(produit.pid,produit.quantite);
            }
            this.initListeProduit();
          });
          this.commandeCreated = true;
        });
      }else{
        this.usernameCommercant = params['commercant'];
        this.initListeProduit();
      }
    });    
    this.commande = null;
    this.showModal = false;
  }

  initListeProduit() : void {
      this.produits = [];
      this.produitService.getListProduits(this.usernameCommercant).subscribe(response => {
     
      for(let produit of response){
        this.produits.push(produit);
      }
      this.isListeProduitEmpty = this.produits.length == 0;
      if(!this.isListeProduitEmpty){
        this.libelleCommercant = this.produits[0].cid.libelleMagasin;
      }
      this.isLoading = false;
    });
  }

  getQuantiteProduit(pid : number) : number {
    if(this.mapProduitQuantite.has(pid)){
      return this.mapProduitQuantite.get(pid);
    }else{
      return 0;
    }
  }

  addProductToCommande(data){
    if(this.commande == null){
      let usernameClient = this.authService.currentUserValue.username;
      this.commandeService.createCommandeForUserAndCommercant(usernameClient, this.usernameCommercant).subscribe(commande => {
        this.commandeService.addProductToCommande(commande.cid, data.idProduct, data.quantite).subscribe(commandeSuite => {
          this.commande = commandeSuite;
          this.commandeCreated = true;
        });
      });
    }else{
      this.commandeService.addProductToCommande(this.commande.cid, data.idProduct, data.quantite).subscribe(commande => {
        this.commande = commande;
      });
    }
  }

  etapeSuivante(){
    this.router.navigate(['commande-list']);
  }

  back(){
    this._location.back();
  }

  openModal(){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
  }

  validerCommandePaiementEnDirect(){
    this.commandeService.confirmCommande(this.commande.cid).subscribe(response => {
      this.showModal = false;
      this.router.navigate(['commande-list']);
    })
  }

  validerCommandePaiementShopLoc(){
    this.commandeService.confirmCommande(this.commande.cid).subscribe(response => {
      this.showModal = false;
      this.router.navigate(['paiement-commande-client'],{queryParams: { commande : response.cid }});
    });
  }
}
