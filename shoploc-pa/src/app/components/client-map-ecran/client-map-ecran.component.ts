import { Component, OnInit } from '@angular/core';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { Location } from '@angular/common';
import { LieuData } from 'src/app/models/data/LieuData.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-map-ecran',
  templateUrl: './client-map-ecran.component.html',
  styleUrls: ['./client-map-ecran.component.scss']
})
export class ClientMapEcranComponent implements OnInit {

  public commercant: CommercantData;
  public lieuCommercant: LieuData;

  constructor(
    private _location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  back() {
    this._location.back();
  }

  onSelectCommercant(commercant: CommercantData) {
    if (!this.commercant) {
      let map = document.getElementById('map-container') as HTMLElement;
      map.classList.remove('taille90');
      map.classList.add('taille60');
    }
    this.commercant = commercant;
  }

  commander() {
    this.router.navigate(['creation-commande-client'], { queryParams: { commercant: this.commercant.username } });
  }
}
