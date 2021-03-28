import { Component, OnInit } from '@angular/core';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { Location } from '@angular/common';
import { LieuData } from 'src/app/models/data/LieuData.model';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { ProduitResponseBody } from 'src/app/models/http/responseBody/ProduitResponseBody.model';


@Component({
  selector: 'app-client-map-ecran',
  templateUrl: './client-map-ecran.component.html',
  styleUrls: ['./client-map-ecran.component.scss']
})
export class ClientMapEcranComponent implements OnInit {

  public commercant: CommercantData;
  public lieuCommercant: LieuData;

  public detailCommercant: boolean;
  public infosCommercantReduit: boolean;

  public produitsCommercant: ProduitResponseBody[];

  constructor(
    private _location: Location,
    private router: Router,
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.detailCommercant = false;
    this.infosCommercantReduit = false;
    this.produitsCommercant = [];
  }

  back() {
    this._location.back();
  }

  onSelectCommercant(commercant: CommercantData) {
    if (!this.infosCommercantReduit) {
      let map = document.getElementById('map-container') as HTMLElement;
      map.classList.remove('taille90');
      map.classList.add('taille60');
      this.infosCommercantReduit = true;
    }
    this.commercant = commercant;
  }

  commander() {
    this.router.navigate(['creation-commande-client'], { queryParams: { commercant: this.commercant.username } });
  }

  detailsCommercant() {
    this.detailCommercant = true;
    this.infosCommercantReduit = false;
    this.produitService.getListProduits(this.commercant.username).subscribe(response => {
      this.produitsCommercant = [];
      for (let produit of response) {
        this.produitsCommercant.push(produit);
      }
    });
  }

  goBackToMap() {
    this.detailCommercant = false;
    this.infosCommercantReduit = false;
  }
}
