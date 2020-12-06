import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommercantResponseBody } from 'src/app/models/html/responseBody/CommercantResponseBody.model';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { Observable } from 'rxjs';

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
    this.demands = [];
    this.demands.push(new CommercantData("david@mail.com","secret","ROLE_EN_ATTENTE",1,"magasin 1","","magasin de david","01234567891023"));
    this.demands.push(new CommercantData("etienne@mail.com","secret","ROLE_EN_ATTENTE",1,"magasin 2","","magasin de etienne","98745612345678"));
  }

  back(){
    this._location.back();
  }

  initDemands(){
    this.userService.getCommercantEnAttente().subscribe(response => {
      for(let commercant of response){
        this.demands.push(commercant);
      }
    });
  }

}
