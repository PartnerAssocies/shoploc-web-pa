import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-statut-vfp',
  templateUrl: './statut-vfp.component.html',
  styleUrls: ['./statut-vfp.component.scss']
})
export class StatutVfpComponent implements OnInit {

  statutVFP : boolean;
  bonusActivated : boolean;
  bonusName : string;
  username : string;
  vfpDays : number;
  beginDate : Date;
  endDate : Date;
  endDays : number;

  constructor(private _location : Location,
              private router : Router,
              private userService : UserService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;
    this.checkStatutVfp();
  }

  checkStatutVfp(){
    this.userService.estVfp(this.username).subscribe(res => {
      console.log(res);
      this.vfpDays = res['nbDaysBefore'];
      if(this.vfpDays > 0){
        this.statutVFP = false;
        this.bonusActivated = false;
      } else {
        this.statutVFP = true;

        this.userService.getUserAdvantage(this.username).subscribe(result => {
          console.log(result);
          if(result.length > 0){
            this.bonusActivated = true;
            this.bonusName = result[result.length-1];
            this.beginDate = new Date(res.beginDate);
            this.endDate = new Date(res.endDate);
            this.endDays = Math.ceil((this.endDate.valueOf() - this.beginDate.valueOf()) / (1000*3600*24));
          } else {
            this.bonusActivated = false;
          }
        }, (err : HttpErrorResponse) => {
          console.log(err);
        });

      }
    });
  }

  back(){
    this._location.back();
  }

  activateVFP(){
    this.router.navigate(['bonus-vfp']);
  }

}
