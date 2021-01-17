import { Component, OnInit, Input , Output,EventEmitter} from '@angular/core';
import { ProduitResponseBody } from 'src/app/models/html/responseBody/ProduitResponseBody.model';
import {CreationCommandeClientComponent} from '../creation-commande-client/creation-commande-client.component'

@Component({
  selector: 'app-creation-commande-client-produit-element',
  templateUrl: './creation-commande-client-produit-element.component.html',
  styleUrls: ['./creation-commande-client-produit-element.component.scss']
})
export class CreationCommandeClientProduitElementComponent implements OnInit {

  @Input()
  produit : ProduitResponseBody;
  @Output("ajouterProduit") ajouterProduit : EventEmitter<{idProduct : number, quantite : number}> = new EventEmitter();

  showModal : boolean;
  quantite : number;


  constructor() { }

  ngOnInit(): void {
    this.showModal = false;
    this.quantite = 0;
  }

  openModal(){
    this.showModal = true;
  }
  
  hide(){
    this.showModal = false;
  }

  valider(){
    this.ajouterProduit.emit({idProduct : this.produit.pid,quantite : this.quantite});
    this.showModal = false;  
  }

  plus(){
    this.quantite = this.quantite + 1;
  }

  minus(){
    if(this.quantite > 0){
      this.quantite = this.quantite - 1;
    }
  }

  checkInput(){
    let value = Number((document.getElementById('quantiteInput') as HTMLInputElement).value);
    if(isNaN(value)){
      this.quantite = 0;
      (document.getElementById('quantiteInput') as HTMLInputElement).value = '0';
    }else{
      if(value < 0){
        this.quantite = 0;
        (document.getElementById('quantiteInput') as HTMLInputElement).value = '0';
      }else{
        this.quantite = value;
      }
    }
  }
}
