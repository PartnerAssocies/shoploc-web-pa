import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-produit-commercant',
  templateUrl: './single-produit-commercant.component.html',
  styleUrls: ['./single-produit-commercant.component.scss']
})
export class SingleProduitCommercantComponent implements OnInit {

  @Input()
  libelle : string;

  @Input()
  prix : number;

  @Input()
  stock : number;

  @Input()
  fidelitePointsRequis : number;

  @Input()
  image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
