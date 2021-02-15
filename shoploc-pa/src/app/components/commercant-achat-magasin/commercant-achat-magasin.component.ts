import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commercant-achat-magasin',
  templateUrl: './commercant-achat-magasin.component.html',
  styleUrls: ['./commercant-achat-magasin.component.scss']
})
export class CommercantAchatMagasinComponent implements OnInit {

  constructor(private _location : Location,
              private router : Router) { }

  ngOnInit(): void {

  }

  back(){
    this._location.back();
  }

  scanQrCode(){
    this.router.navigate(['lecteur-carte-commercant']);
  }

}
