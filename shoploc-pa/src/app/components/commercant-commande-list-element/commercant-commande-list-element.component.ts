import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commercant-commande-list-element',
  templateUrl: './commercant-commande-list-element.component.html',
  styleUrls: ['./commercant-commande-list-element.component.scss']
})
export class CommercantCommandeListElementComponent implements OnInit {

  @Input()
  numeroCommande : string;
  @Input()
  nomClient : string;  
  @Input()
  date : Date;
  dateAffiche : string;
  @Input()
  etat : string;
  color : string;
  etatAffiche : string;
  clicked : boolean;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.clicked=false;
    this.dateAffiche = this.datePipe.transform(this.date,'dd/MM/yyyy HH:mm');
    switch(this.etat){
      case 'EN_ATTENTE_DE_PAIEMENT_DIRECT' : {
        this.color = '#dbd000';
        this.etatAffiche = 'En attente de paiement en direct';
        break;
      }
      case 'EN_PREPARATION' : {
        this.color = ' #f79000';
        this.etatAffiche = 'En préparation';
        break;
      }
      case 'A_RECUPERER' : {
        this.color = '#00eb4e';
        this.etatAffiche = 'A récupérer'
        break;
      }
      default : {
        this.color = 'white';
        break;
      }
    }
  }

}
