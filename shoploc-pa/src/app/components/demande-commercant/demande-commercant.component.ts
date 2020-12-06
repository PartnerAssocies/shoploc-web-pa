import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande-commercant',
  templateUrl: './demande-commercant.component.html',
  styleUrls: ['./demande-commercant.component.scss']
})
export class DemandeCommercantComponent implements OnInit {

  @Input()
  username: string;

  constructor() { }

  ngOnInit(): void {
  }

}
