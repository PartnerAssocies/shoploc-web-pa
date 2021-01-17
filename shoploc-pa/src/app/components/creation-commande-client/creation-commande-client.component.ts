import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeData } from 'src/app/models/data/CommandeData.model';
import { ProduitResponseBody } from 'src/app/models/html/responseBody/ProduitResponseBody.model';
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
  commande : CommandeData;
  commandeCreated : boolean;


  constructor(
    private activateRoute: ActivatedRoute,
    private produitService : ProduitService,
    private _location: Location,
    private authService : AuthService,
    private commandeService : CommandeService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.initUsernameCommercant();
    this.initListeProduit();
    this.commande = null;
    this.commandeCreated = false;
  }

  initUsernameCommercant() : void {
    this.activateRoute.queryParams.subscribe(params => {
      this.usernameCommercant = params['commercant'];
    })
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
}
