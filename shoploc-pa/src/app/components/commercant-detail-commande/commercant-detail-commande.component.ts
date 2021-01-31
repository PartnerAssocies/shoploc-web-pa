import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { Location } from '@angular/common';
import { ContenuCommandeResponseBody } from 'src/app/models/http/responseBody/ContenuCommandeResponseBody.model';

@Component({
  selector: 'app-commercant-detail-commande',
  templateUrl: './commercant-detail-commande.component.html',
  styleUrls: ['./commercant-detail-commande.component.scss']
})
export class CommercantDetailCommandeComponent implements OnInit {

  commande : CommandeResponseBody;
  contenuCommande : ContenuCommandeResponseBody;
  isReady : boolean;

  constructor(
    private _location : Location,
    private activateRoute: ActivatedRoute,
    private commandeService : CommandeService
  ) { }

  ngOnInit(): void {
    this.isReady = false;
    this.activateRoute.queryParams.subscribe(params => { 
      this.commandeService.getCommande(Number(params['commande'])).subscribe(commande => {
        this.commande = commande;
        this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
          this.contenuCommande = response;
          this.isReady = true;
        });
      });
    });
  }

  laCommandeEstPrete(){

  }

  laCommandeEstRecuperee(){
    
  }

  back(){
    this._location.back();
  }

}
