import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProduitResponseBody } from 'src/app/models/http/responseBody/ProduitResponseBody.model';

@Component({
  selector: 'app-creation-commande-client-produit-element',
  templateUrl: './creation-commande-client-produit-element.component.html',
  styleUrls: ['./creation-commande-client-produit-element.component.scss']
})
export class CreationCommandeClientProduitElementComponent implements OnInit {

  @Input()
  produit: ProduitResponseBody;
  @Output("ajouterProduit") ajouterProduit:
    EventEmitter<{ idProduct: number, quantite: number, isFidelite: boolean }> = new EventEmitter();

  showModal: boolean;
  @Input()
  quantite: number;
  hasImage: boolean;
  active: boolean;
  @Input()
  isFidelite: boolean;


  constructor() { }

  ngOnInit(): void {
    this.showModal = false;
    this.hasImage = this.produit.image != "";
    this.active = false;
  }

  openModal() {
    this.showModal = true;
    this.active = true;
  }

  hide() {
    this.showModal = false;
    this.active = false;
  }

  valider() {
    this.ajouterProduit.emit({ idProduct: this.produit.pid, quantite: this.quantite, isFidelite: this.isFidelite });
    this.showModal = false;
    this.active = false;
  }

  plus() {
    this.quantite = this.quantite + 1;
  }

  minus() {
    if (this.quantite > 0) {
      this.quantite = this.quantite - 1;
    }
  }

  checkInput() {
    let value = Number((document.getElementById('quantiteInput-' + this.produit.pid) as HTMLInputElement).value);
    if (isNaN(value)) {
      this.quantite = 0;
      (document.getElementById('quantiteInput-' + this.produit.pid) as HTMLInputElement).value = '0';
    } else {
      if (value < 0) {
        this.quantite = 0;
        (document.getElementById('quantiteInput-' + this.produit.pid) as HTMLInputElement).value = '0';
      } else {
        this.quantite = value;
      }
    }
  }
}
