import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitData } from 'src/app/models/data/ProduitData.model';


@Component({
  selector: 'app-creation-commande-client',
  templateUrl: './creation-commande-client.component.html',
  styleUrls: ['./creation-commande-client.component.scss']
})
export class CreationCommandeClientComponent implements OnInit {

  isLoading : boolean;
  usernameCommercant : string;
  produits : ProduitData[];


  constructor(
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.initUsernameCommercant();
  }

  initUsernameCommercant() : void {
    this.activateRoute.queryParams.subscribe(params => {
      this.usernameCommercant = params['commercant'];
    })
  }

  initListeProduit() : void {
    this.produits = [];
  }

}
