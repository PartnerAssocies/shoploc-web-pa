import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CommandeResponseBody } from 'src/app/models/http/responseBody/CommandeResponseBody.model';
import { ContenuCommandeResponseBody } from 'src/app/models/http/responseBody/ContenuCommandeResponseBody.model';
import { CommandeService } from 'src/app/services/commande.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qrcode-commande',
  templateUrl: './qrcode-commande.component.html',
  styleUrls: ['./qrcode-commande.component.scss']
})
export class QrcodeCommandeComponent implements OnInit {

  commande : CommandeResponseBody;
  contenuCommande : ContenuCommandeResponseBody;
  isReady : boolean;
  showModal : boolean;
  public qrValue : string;
  public generated : boolean;

  constructor(
    private _location : Location,
    private commandeService : CommandeService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isReady = false;
    this.showModal = false;
    this.generated = false;
    this.activateRoute.queryParams.subscribe(params => {
      this.commandeService.getCommande(Number(params['commande'])).subscribe(commandeResponse => {
        this.commande = commandeResponse;
        this.qrValue = 'COMMANDE;'.concat(this.commande.cid.toString());
        this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
          this.contenuCommande = response;
          this.isReady = true;
          this.generated =true;
        });
      });
    });
  }

  back(){
    this._location.back();
  }

  afficheDetail(){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
  }
}
