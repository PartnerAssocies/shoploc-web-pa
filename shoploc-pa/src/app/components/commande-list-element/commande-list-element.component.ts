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
    this.dateAffiche = this.datePipe.transform(this.date,'dd/MM/yyyy HH:mm');
    switch(this.etat){
      case 'PANNIER' : {
        this.color = '#7a7a7a';
        this.etatAffiche = 'En attente de validation';
        break;
      }
      case 'EN_ATTENTE_DE_PAIEMENT' : {
        this.color = '#dbd000';
        this.etatAffiche = 'En attente de paiement';
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
      case 'RECUPEREE' : {
        this.color = '#027506';
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
