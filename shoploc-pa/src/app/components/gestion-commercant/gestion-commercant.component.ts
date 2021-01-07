import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommercantData } from 'src/app/models/data/CommercantData.model';

@Component({
  selector: 'app-gestion-commercant',
  templateUrl: './gestion-commercant.component.html',
  styleUrls: ['./gestion-commercant.component.scss']
})
export class GestionCommercantComponent implements OnInit {

  demands : CommercantData[];

  constructor(
    private _location: Location,
    private userService :  UserService
  ) { }

  ngOnInit(): void {
    this.initDemands();
  }

  back(){
    this._location.back();
  }

  initDemands(){
    this.demands = [];
    this.userService.getCommercantEnAttente().subscribe(response => {
      for(let commercant of response){
        this.demands.push(commercant);
      }
    });
  }

}
