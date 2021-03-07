import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommercantData } from 'src/app/models/data/CommercantData.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-commercant-list',
  templateUrl: './commercant-list.component.html',
  styleUrls: ['./commercant-list.component.scss']
})
export class CommercantListComponent implements OnInit {

  commercants : CommercantData[];
  isEmpty : boolean;
  isLoading : boolean;
  fromHome : boolean;

  constructor(
    private _location : Location,
    private userService : UserService,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.initCommercant();
    
  }

  /**
   * Initlialise la liste des commerçants
   */
  initCommercant() {
    this.activateRoute.queryParams.subscribe(params =>{
      if(params['fromHome']){
        this.fromHome = params['fromHome'];
      }
    });
    this.commercants = [];
    this.userService.getListCommercant().subscribe(response => {
      for(let commercant of response){
        this.commercants.push(commercant);
      }
      this.isEmpty = this.commercants.length == 0;
      this.isLoading = false;
    });
  }

  back(){
    this._location.back();
  }
}
