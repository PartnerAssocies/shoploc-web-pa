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
    this.initCommercant();
  }

  /**
   * Initlialise la liste des commerçants
   */
  initCommercant(){
    this.commercants = [];
    this.userService.getListCommercant().subscribe(response => {
      for(let commercant of response){
        commercant.image = 'assets/commerce/'.concat(commercant.image);
        this.commercants.push(commercant);
      }
    });
  }

  back(){
    this._location.back();
  }
}
