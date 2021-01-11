import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {

  constructor(
    private _location : Location,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back(){
    this._location.back();
  }

  nouvelleCommande(){
    this.router.navigate(['commercant-list']);
  }
}
