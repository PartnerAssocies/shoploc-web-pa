import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  public role : string;
  public currentUser : CurrentUser;

  constructor(private authService: AuthService,
              private route: Router,
              private _location: Location) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role;
  }

  logout(){
    this.authService.logout().subscribe(response => {
      localStorage.removeItem('currentUser');
      this.authService.emptyCurrentUserValue();
      this.route.navigate(['login']);
    });
  }

  maCarte(){
    this.route.navigate(['ma-carte']);
  }

  back(){
    this._location.back();
  }

}
