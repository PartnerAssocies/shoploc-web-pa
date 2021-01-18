import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProduitResponseBody } from 'src/app/models/html/responseBody/ProduitResponseBody.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-commercant',
  templateUrl: './produit-commercant.component.html',
  styleUrls: ['./produit-commercant.component.scss']
})
export class ProduitCommercantComponent implements OnInit {

  produits : ProduitResponseBody[];
  obsProduits: Observable<ProduitResponseBody[]>;
  username: string;

  constructor(private _location: Location,
              private router: Router,
              private produitService: ProduitService,
              private authService: AuthService) 
  { }

  ngOnInit(): void {
    this.getAllProduits();
  }

  back(){
    this._location.back();
  }

  getAllProduits(){
    this.username = this.authService.currentUserValue.username;
    this.obsProduits = this.produitService.getListProduits(this.username);    
  }

  addProduit(){
    this.router.navigate(['add-commercant-produit']);
  }

}
