import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commande-list-element',
  templateUrl: './commande-list-element.component.html',
  styleUrls: ['./commande-list-element.component.scss']
})
export class CommandeListElementComponent implements OnInit {

  @Input()
  numeroCommande : string;

  @Input()
  dateMaj : string;

  
  constructor() { }

  ngOnInit(): void {
  }

}
