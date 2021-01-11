import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produit-commercant',
  templateUrl: './produit-commercant.component.html',
  styleUrls: ['./produit-commercant.component.scss']
})
export class ProduitCommercantComponent implements OnInit {

  constructor(private _location: Location) 
  { }

  ngOnInit(): void {
  }

  back(){
    this._location.back();
  }

}
