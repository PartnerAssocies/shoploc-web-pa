import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statut-vfp',
  templateUrl: './statut-vfp.component.html',
  styleUrls: ['./statut-vfp.component.scss']
})
export class StatutVfpComponent implements OnInit {

  statutVFP : boolean;
  bonusActivated : boolean;
  bonusName : string;

  constructor(private _location : Location,
              private router : Router) { }

  ngOnInit(): void {
    this.statutVFP = true;
    this.bonusActivated = true;
    this.bonusName = 'Place de parking';
  }

  back(){
    this._location.back();
  }

  activateVFP(){
    this.router.navigate(['bonus-vfp']);
  }

}
