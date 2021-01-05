import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { LieuData } from 'src/app/models/data/LieuData.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-commercant-list',
  templateUrl: './commercant-list.component.html',
  styleUrls: ['./commercant-list.component.scss']
})
export class CommercantListComponent implements OnInit {

  commercants : CommercantData[];

  constructor(
    private _location : Location,
    private userService : UserService,
    ) { }

  ngOnInit(): void {
    this.commercants = [];
    /*const lieu = new LieuData(1,"42 rue National","Lille",1.0,2.3);
    this.commercants.push(new CommercantData("david@mail.com","secret","ROLE_COMMERCANT",lieu,"magasin 1","assets/commerce/marche1.jpg","magasin de david","01234567891023"));
    this.commercants.push(new CommercantData("etienne@mail.com","secret","ROLE_COMMERCANT",lieu,"magasin 2","assets/commerce/marche2.jpg","magasin de etienne","98745612345678"));
    this.commercants.push(new CommercantData("paul@mail.com","secret","ROLE_COMMERCANT",lieu,"magasin 3","assets/commerce/marche3.jpg","magasin de paul","98745612345678"));*/
  }

  /**
   * Initlialise la liste des commerçants
   */
  initCommercant(){
    this.userService.getListCommercant().subscribe(response => {
      for(let commercant of response){
        this.commercants.push(commercant);
      }
    });
  }

  back(){
    this._location.back();
  }
}
