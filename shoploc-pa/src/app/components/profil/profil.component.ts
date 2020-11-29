import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: Router,
              private _location: Location) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.route.navigate(['login']);
  }

  back(){
    this._location.back();
  }

}
