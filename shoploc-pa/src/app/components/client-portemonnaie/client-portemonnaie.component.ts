import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-portemonnaie',
  templateUrl: './client-portemonnaie.component.html',
  styleUrls: ['./client-portemonnaie.component.scss']
})
export class ClientPortemonnaieComponent implements OnInit {

  showModal : boolean;
  active : boolean;

  constructor() { }

  ngOnInit(): void {
    this.showModal = false;
    this.active = false;
  }

  openModal(){
    this.showModal = true;
    this.active = true;  
  }

  hide(){
    this.showModal = false;
    this.active = false;
  }

  validate(){
    this.showModal = false;
    this.active = false;  
  }

}
