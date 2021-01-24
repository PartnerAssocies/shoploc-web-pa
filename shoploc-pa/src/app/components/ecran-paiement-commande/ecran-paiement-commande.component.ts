import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommandeData } from 'src/app/models/data/CommandeData.model';
import { CommandeService } from 'src/app/services/commande.service';
import { ContenuCommandeResponseBody } from 'src/app/models/html/responseBody/ContenuCommandeResponseBody.model';

@Component({
  selector: 'app-ecran-paiement-commande',
  templateUrl: './ecran-paiement-commande.component.html',
  styleUrls: ['./ecran-paiement-commande.component.scss']
})
export class EcranPaiementCommandeComponent implements OnInit {

  commande : CommandeData;
  showModal : boolean;
  contenuCommande : ContenuCommandeResponseBody;
  contenuReady : boolean;

  constructor(
    private _location : Location,
    private activateRoute: ActivatedRoute,
    private commandeService : CommandeService
  ) { }

  ngOnInit(): void {
    this.commande = history.state.commande;
    this.showModal = false;
    this.contenuReady = false;
    this.initContenuCommande();
  }

  initContenuCommande(){
    this.commandeService.getCommandeContenu(this.commande.cid).subscribe(response => {
      this.contenuCommande = response;
      this.contenuReady = true;
      console.log(this.contenuCommande);
    });
  }
  back(){
    this._location.back();
  }

  hide(){
    this.showModal = false;
  }

  afficheDetail(){
    this.showModal = true;
  }
}
