import { Location } from '@angular/common';
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

  constructor(private _location : Location,
              private router : Router,
              private userService : UserService,
              private authService : AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;
    this.checkStatutVfp();
    this.bonusName = 'Place de parking';
  }

  checkStatutVfp(){
    this.userService.estVfp(this.username).subscribe(res => {
      this.vfpDays = res['nbJoursRestant'];
      if(this.vfpDays > 0){
        this.statutVFP = false;
        this.bonusActivated = false;
      } else {
        this.statutVFP = true;
        this.bonusActivated = false;
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
