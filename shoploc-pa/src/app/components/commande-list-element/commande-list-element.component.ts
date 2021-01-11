import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-commande-list-element',
  templateUrl: './commande-list-element.component.html',
  styleUrls: ['./commande-list-element.component.scss']
})
export class CommandeListElementComponent implements OnInit {

  @Input()
  numeroCommande : string;
  @Input()
  nomCommercant : string;  
  @Input()
  date : Date;
  dateAffiche : string;
  @Input()
  etat : string;
  color : string;
  etatAffiche : string;
  clicked : boolean;

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.clicked=false;
    this.dateAffiche = this.datePipe.transform(this.date,'dd/MM/yyyy hh:mm');
    switch(this.etat){
      case 'PANNIER' : {
        this.color = 'yellow';
        this.etatAffiche = 'En attente de validation';
        break;
      }
      case 'EN_ATTENTE_DE_PAIEMENT' : {
        this.color = 'orange';
        this.etatAffiche = 'En attente de paiement';
        break;
      }
      case 'EN_PREPARATION' : {
        this.color = 'orange';
        this.etatAffiche = 'En préparation';
        break;
      }
      case 'A_RECUPERER' : {
        this.color = 'green';
        this.etatAffiche = 'A récupérer'
        break;
      }
      case 'RECUPEREE' : {
        this.color = 'white';
        this.etatAffiche = 'Récupérée'
        break;
      }

      default : {
        this.color = 'white';
        break;
      }
    }
  }

}
