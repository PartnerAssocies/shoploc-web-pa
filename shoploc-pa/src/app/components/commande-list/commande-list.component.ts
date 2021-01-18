import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';
import { AuthService } from 'src/app/services/auth.service';
import { CommandeData } from 'src/app/models/data/CommandeData.model';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {

  isLoading : boolean;
  listeCommande : CommandeData[];
  isEmpty : boolean;
  active : boolean;

  constructor(
    private _location : Location,
    private router: Router,
    private userService : CommandeService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.active = false;
    this.isLoading = false;
    this.initListCommande();
  }

  initListCommande() {
    const username = this.authService.currentUserValue.username;
    this.listeCommande = [];
    this.userService.getCommandesOfUser(username).subscribe(response => {
      for(let commande of response){
        this.listeCommande.push(commande);
      }
      this.isEmpty = this.listeCommande.length == 0;
      this.isLoading = false;
    });
  }

  back(){
    this._location.back();
  }

  nouvelleCommande(){
    this.active = true;
    this.router.navigate(['commercant-list']);
  }
}
