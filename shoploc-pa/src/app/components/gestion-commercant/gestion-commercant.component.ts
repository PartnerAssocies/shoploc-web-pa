import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommercantResponseBody } from 'src/app/models/html/responseBody/CommercantResponseBody.model';

@Component({
  selector: 'app-gestion-commercant',
  templateUrl: './gestion-commercant.component.html',
  styleUrls: ['./gestion-commercant.component.scss']
})
export class GestionCommercantComponent implements OnInit {

  demands : CommercantResponseBody[];

  constructor(private _location: Location) { }

  ngOnInit(): void {
    this.demands = [];
    this.demands.push(new CommercantResponseBody("Toto"));
    this.demands.push(new CommercantResponseBody("Tata"));
  }

  back(){
    this._location.back();
  }

}
